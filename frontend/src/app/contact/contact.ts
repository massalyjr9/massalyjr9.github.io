import { ChangeDetectionStrategy, Component, ElementRef, afterNextRender, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PROFILE } from '../content/profile';
import { RevealDirective } from '../shared/reveal.directive';
import { ContactApi, ContactError } from './contact-api';

type Status = 'idle' | 'sending' | 'sent' | ContactError;

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private readonly api = inject(ContactApi);
  protected readonly profile = PROFILE;
  protected readonly status = signal<Status>('idle');

  protected readonly form = inject(NonNullableFormBuilder).group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
    company: ['', Validators.maxLength(100)],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(5000)]],
    website: [''],
  });

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    afterNextRender(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.api.warmUp();
            observer.disconnect();
          }
        },
        { rootMargin: '600px 0px' },
      );
      observer.observe(host);
    });
  }

  protected showError(field: 'name' | 'email' | 'message'): boolean {
    const control = this.form.controls[field];
    return control.invalid && control.touched;
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.status.set('sending');
    this.api.send(this.form.getRawValue()).subscribe({
      next: () => {
        this.status.set('sent');
        this.form.reset();
      },
      error: (error: ContactError) => this.status.set(error),
    });
  }
}

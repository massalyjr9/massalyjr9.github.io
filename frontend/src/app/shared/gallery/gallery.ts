import { ChangeDetectionStrategy, Component, ElementRef, input, signal, viewChild } from '@angular/core';

/**
 * Carrousel d'images (slides au format portrait).
 * Basé sur le défilement natif + scroll-snap : il reste utilisable sans JavaScript
 * (HTML pré-rendu) et au doigt sur mobile. Les boutons et points ne font que piloter le défilement.
 */
@Component({
  selector: 'app-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery {
  readonly images = input.required<string[]>();
  readonly label = input.required<string>();

  protected readonly current = signal(0);
  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');

  protected go(index: number): void {
    const el = this.track().nativeElement;
    const count = this.images().length;
    const target = (index + count) % count;
    el.scrollTo({ left: target * el.clientWidth, behavior: 'smooth' });
    this.current.set(target);
  }

  protected onScroll(): void {
    const el = this.track().nativeElement;
    if (!el.clientWidth) return;
    this.current.set(Math.round(el.scrollLeft / el.clientWidth));
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.go(this.current() + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.go(this.current() - 1);
    }
  }
}

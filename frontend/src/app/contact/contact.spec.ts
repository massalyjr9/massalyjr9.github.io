import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Contact } from './contact';
import { ContactApi } from './contact-api';

describe('Contact', () => {
  const api = { send: vi.fn(), warmUp: vi.fn() };

  beforeEach(() => {
    api.send.mockReset();
    TestBed.configureTestingModule({
      imports: [Contact],
      providers: [{ provide: ContactApi, useValue: api }],
    });
  });

  function fill(el: HTMLElement, values: Record<string, string>) {
    for (const [id, value] of Object.entries(values)) {
      const input = el.querySelector<HTMLInputElement>(`#cf-${id}`)!;
      input.value = value;
      input.dispatchEvent(new Event('input'));
    }
  }

  it("n'envoie rien et affiche les erreurs si le formulaire est vide", async () => {
    const fixture = TestBed.createComponent(Contact);
    await fixture.whenStable();

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    await fixture.whenStable();

    expect(api.send).not.toHaveBeenCalled();
    expect(fixture.nativeElement.querySelectorAll('.err').length).toBe(3);
  });

  it('envoie le message et confirme', async () => {
    api.send.mockReturnValue(of(undefined));
    const fixture = TestBed.createComponent(Contact);
    await fixture.whenStable();

    fill(fixture.nativeElement, { name: 'Jeanne', email: 'jeanne@acme.fr', message: 'Bonjour, parlons d’un poste.' });
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    await fixture.whenStable();

    expect(api.send).toHaveBeenCalledWith(expect.objectContaining({ name: 'Jeanne', website: '' }));
    expect(fixture.nativeElement.querySelector('[role=status]').textContent).toContain('Message envoyé');
  });

  it('propose LinkedIn si l’API est indisponible', async () => {
    api.send.mockReturnValue(throwError(() => 'unavailable'));
    const fixture = TestBed.createComponent(Contact);
    await fixture.whenStable();

    fill(fixture.nativeElement, { name: 'Jeanne', email: 'jeanne@acme.fr', message: 'Bonjour, parlons d’un poste.' });
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('[role=status] a').textContent).toContain('LinkedIn');
  });
});

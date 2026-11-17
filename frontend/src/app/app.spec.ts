import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  it('affiche le nom, le lien CV et les sections clés', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('h1')?.textContent).toContain('Idrissa');
    expect(el.querySelector('a[download]')?.getAttribute('href')).toBe('cv-idrissa-massaly.pdf');
    for (const id of ['projets', 'parcours', 'competences', 'contact']) {
      expect(el.querySelector(`#${id}`)).not.toBeNull();
    }
  });

  it('affiche le type de contrat de chaque mission', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const badges = [...fixture.nativeElement.querySelectorAll('.badge')].map((b: Element) => b.textContent?.trim());

    expect(badges).toEqual(['Freelance', 'Alternance', 'Stage', 'Stage']);
  });
});

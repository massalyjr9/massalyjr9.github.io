import { Component } from '@angular/core';
import { PROFILE } from './content/profile';
import { Hero } from './sections/hero/hero';
import { Projects } from './sections/projects/projects';
import { ExperienceTimeline } from './sections/experience/experience';
import { Skills } from './sections/skills/skills';
import { Contact } from './contact/contact';

@Component({
  selector: 'app-root',
  imports: [Hero, Projects, ExperienceTimeline, Skills, Contact],
  template: `
    <a class="skip-link" href="#contenu">Aller au contenu</a>

    <header class="site-header">
      <a class="mark" href="#top" aria-label="Accueil">I<span>·</span>M</a>
      <nav aria-label="Navigation principale">
        <ul>
          <li><a href="#projets">Projets</a></li>
          <li><a href="#parcours">Parcours</a></li>
          <li><a href="#competences">Compétences</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <a class="header-cv" [href]="profile.cvUrl" download>CV <span aria-hidden="true">↓</span></a>
    </header>

    <main id="contenu">
      <app-hero />
      <app-projects />
      <app-experience />
      <app-skills />
      <app-contact />
    </main>

    <footer class="site-footer">
      <p>© {{ year }} {{ profile.name }}</p>
      <p>
        Angular + Spring Boot ·
        <a [href]="profile.githubUrl + '/massalyjr9.github.io'" target="_blank" rel="noopener">code source</a>
      </p>
    </footer>
  `,
  styles: `
    .site-header {
      position: fixed;
      inset: 0 0 auto;
      z-index: 50;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      padding: 18px var(--gutter);
      background: linear-gradient(to bottom, rgba(13, 12, 10, 0.92), rgba(13, 12, 10, 0));
      backdrop-filter: blur(6px);
    }
    .mark {
      font-family: var(--display);
      font-size: 22px;
      letter-spacing: 0.18em;
      text-decoration: none;
    }
    .mark span { color: var(--gold-pale); }
    nav ul {
      list-style: none;
      display: flex;
      gap: clamp(16px, 3vw, 40px);
      font-family: var(--sans);
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }
    nav a {
      text-decoration: none;
      padding: 6px 0;
      border-bottom: 1px solid transparent;
      transition: border-color 0.3s;
    }
    nav a:hover { border-bottom-color: var(--gold-pale); }
    .header-cv {
      font-family: var(--sans);
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      text-decoration: none;
      color: var(--ink);
      background: var(--gold);
      padding: 10px 16px;
      white-space: nowrap;
    }
    .header-cv:hover { background: var(--gold-pale); }
    .site-footer {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      padding: 32px var(--gutter);
      border-top: 1px solid var(--rule);
      font-family: var(--sans);
      font-size: 13px;
      color: var(--mute);
    }
    @media (max-width: 720px) {
      .site-header { padding: 14px 16px; }
      nav { display: none; }
    }
  `,
})
export class App {
  protected readonly profile = PROFILE;
  protected readonly year = new Date().getFullYear();
}

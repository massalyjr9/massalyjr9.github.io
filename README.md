# Portfolio — Idrissa Massaly

Portfolio de développeur Full Stack Java / Angular, construit avec la stack qu'il présente.

| Dossier | Contenu |
|---|---|
| [frontend/](frontend/) | Angular 21 (composants standalone, signals), pré-rendu statique pour le SEO et les aperçus de partage. Déployé sur GitHub Pages. |
| [backend/](backend/) | API Spring Boot 4 / Java 21 pour le formulaire de contact : validation, anti-spam (honeypot + limite par IP), envoi SMTP, erreurs RFC 9457. Image Docker. |

Le site fonctionne sans l'API : seul le formulaire de contact en dépend, et il renvoie vers LinkedIn si l'API ne répond pas.

## Modifier le contenu

Tout le texte (missions, projets, compétences, formation) est dans
[frontend/src/app/content/profile.ts](frontend/src/app/content/profile.ts).
La durée d'expérience affichée est calculée à partir des dates des missions.

Pour ajouter une capture d'écran à un projet : placer un fichier WebP (1200×750) dans `frontend/public/projects/`
et renseigner `image: 'projects/nom.webp'`.

## Lancer en local

```bash
# API (Java 21) — sans SMTP configuré, l'envoi répond 502 et le front affiche le repli LinkedIn
cd backend && ./mvnw spring-boot:run

# Front — http://localhost:4200
cd frontend && npm install && npm start
```

## Tests

```bash
cd backend && ./mvnw verify               # JUnit 5, Mockito, MockMvc
cd frontend && npx ng test --watch=false  # Vitest
```

La CI GitHub Actions ([.github/workflows/ci.yml](.github/workflows/ci.yml)) lance les deux à chaque push.

## Déploiement

**Front** : [deploy.yml](.github/workflows/deploy.yml) publie `frontend/dist/frontend/browser` sur GitHub Pages
à chaque push sur `main`. Dans les réglages du dépôt, *Settings → Pages → Source* doit être sur **GitHub Actions**.

**API** : n'importe quel hébergeur Docker. Avec Render, le [render.yaml](render.yaml) crée le service ;
il reste à saisir les secrets SMTP. Variables attendues :

| Variable | Rôle |
|---|---|
| `CORS_ALLOWED_ORIGINS` | URL du front, ex. `https://massalyjr9.github.io` |
| `CONTACT_RECIPIENT` | Adresse qui reçoit les messages |
| `CONTACT_SENDER` | Expéditeur vérifié chez le fournisseur SMTP |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD` | Accès SMTP (Brevo, Gmail avec mot de passe d'application…) |

Une fois l'API en ligne, reporter son URL dans
[frontend/src/environments/environment.prod.ts](frontend/src/environments/environment.prod.ts).

Si le site passe sur un nom de domaine, mettre à jour l'URL canonique et les balises Open Graph dans
[frontend/src/index.html](frontend/src/index.html), ainsi que `robots.txt` et `sitemap.xml`.

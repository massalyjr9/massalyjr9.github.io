/**
 * Tout le contenu du portfolio est ici : modifier ce fichier suffit pour mettre le site à jour.
 *
 * Règle d'or : chaque phrase doit pouvoir être vérifiée par un recruteur (LinkedIn, dépôt GitHub, démo).
 * Quand tu as un chiffre réel (couverture de tests, nombre d'utilisateurs, temps gagné, taille d'équipe),
 * ajoute-le dans `results` : c'est ce qui distingue une tâche d'une réalisation.
 */

export type ContractType = 'Freelance' | 'CDI' | 'CDD' | 'Alternance' | 'Stage';

export interface Experience {
  role: string;
  contract: ContractType;
  company: string;
  place: string;
  /** Mois inclus, au format AAAA-MM. */
  start: string;
  end: string;
  context: string;
  stack: string[];
  achievements: string[];
  /** Résultats mesurables ou vérifiables. */
  results: string[];
}

export interface Project {
  name: string;
  year?: number;
  tagline: string;
  description: string;
  highlights: string[];
  stack: string[];
  repoUrl?: string;
  /** Dépôt privé : on l'indique plutôt que de cacher le projet. */
  repoPrivate?: boolean;
  demoUrl?: string;
  /** Capture d'écran dans `public/projects/` (WebP, 1200×750 conseillé). */
  image?: string;
  /** Diaporama (slides portrait 4:5, WebP 864×1080) : remplace `image` dans la carte. */
  gallery?: string[];
  featured: boolean;
  /** Mettre à `false` tant que les liens et la description ne sont pas prêts. */
  visible: boolean;
}

export interface SkillTier {
  level: string;
  hint: string;
  skills: string[];
}

export const PROFILE = {
  name: 'Idrissa Massaly',
  title: 'Développeur Full Stack Java / Angular',
  city: 'Lyon, France',
  seeking: 'CDI · Full Stack',
  available: true,
  cvUrl: 'cv-idrissa-massaly.pdf',
  githubUrl: 'https://github.com/massalyjr9',
  linkedinUrl: 'https://www.linkedin.com/in/idrissa-massaly-154b8022b/',
  summary:
    "Je conçois des applications web métier de bout en bout : API REST en Spring Boot, persistance JPA, " +
    "interfaces Angular, tests JUnit / Mockito et intégration continue. J'ai travaillé pour le secteur public, " +
    'la mobilité, la livraison et le retail, en freelance, en alternance et en stage.',
};

export const EXPERIENCES: Experience[] = [
  {
    role: 'Développeur Full Stack Java / Angular',
    contract: 'Freelance',
    company: "Direction de l'Administration Pénitentiaire du Sénégal",
    place: 'Dakar',
    start: '2025-01',
    end: '2025-08',
    context: 'Digitalisation de la gestion des dossiers de détenus, auparavant suivis hors application.',
    stack: ['Java 21', 'Spring Boot', 'Angular', 'SQL Server', 'GitLab CI'],
    achievements: [
      'Recueil des besoins auprès des équipes métier et rédaction des spécifications fonctionnelles et techniques.',
      "Conception de l'architecture REST et modélisation de la base SQL Server.",
      'Tests unitaires JUnit / Mockito sur les composants critiques, pipelines CI/CD GitLab.',
    ],
    results: ['Application utilisée au quotidien par les agents pour le suivi des dossiers.'],
  },
  {
    role: 'Développeur Full Stack Java / Angular',
    contract: 'Alternance',
    company: 'MetropoliTan (Porte du Jura)',
    place: 'Montbéliard',
    start: '2023-09',
    end: '2024-09',
    context: "Plateforme de mobilité multimodale (covoiturage et transports publics) à l'échelle de l'agglomération.",
    stack: ['Spring Boot', 'Hibernate / JPA', 'Angular', 'RxJS', 'SQL'],
    achievements: [
      'Développement de fonctionnalités de bout en bout : API Spring Boot, écrans Angular (RxJS).',
      'Persistance Hibernate (JPA) et participation à la modélisation du schéma de données.',
      'Livraisons en sprints Scrum de 2 semaines, revues de code croisées systématiques.',
    ],
    results: ["Service en production, utilisé par les habitants de l'agglomération."],
  },
  {
    role: 'Développeur Full Stack Java / Angular',
    contract: 'Stage',
    company: 'Yassir',
    place: 'Dakar',
    start: '2023-05',
    end: '2023-08',
    context: 'Start-up de livraison en forte croissance.',
    stack: ['Spring Boot', 'Angular', 'API REST', 'SQL'],
    achievements: [
      'Module de commande de repas en temps réel : API REST Spring Boot et interface Angular.',
      'Intégration des flux de données de commande et persistance SQL.',
      'Tests unitaires et fonctionnels avant chaque mise en production.',
    ],
    results: [],
  },
  {
    role: 'Développeur Full Stack Java / Angular',
    contract: 'Stage',
    company: 'LG Future Store',
    place: 'Dakar',
    start: '2022-05',
    end: '2022-10',
    context: 'Commerce de détail : le suivi des stocks se faisait à la main.',
    stack: ['Java', 'Spring Security', 'Angular'],
    achievements: [
      'Application de gestion de stocks complète (Java / Angular) remplaçant le suivi manuel.',
      "Gestion des rôles et des droits d'accès avec Spring Security.",
      'Tests unitaires et documentation technique.',
    ],
    results: [],
  },
];

export const PROJECTS: Project[] = [
  {
    name: "LET'S GO DRIVE",
    year: 2026,
    tagline: 'Location de voitures à Dakar, réservation et acompte en ligne.',
    description:
      "Site en production pour une agence de location. Les clients filtrent le catalogue, réservent en ligne " +
      "et paient l'acompte par Wave ou Orange Money. L'agence gère tout depuis son espace.",
    highlights: [
      'Vérification des disponibilités (pas de chevauchement de dates), prix calculé selon la durée et les options.',
      "L'acompte n'est validé que par le webhook du paiement, avec vérification de la signature HMAC. " +
        "Les dates sont bloquées 30 minutes puis libérées si le paiement n'arrive pas.",
      'Espace agence avec comptes nominatifs, historique des réservations et gestion de la flotte.',
      'Déployé sur un VPS avec Docker Compose (PostgreSQL, API, SSR Angular) derrière Caddy pour le HTTPS.',
    ],
    stack: ['Java 17', 'Spring Boot 3.5', 'Spring Security', 'JPA', 'PostgreSQL', 'Angular 21', 'Docker', 'Caddy'],
    repoPrivate: true,
    demoUrl: 'https://letsgodrive.store',
    image: 'projects/letsgodrive.webp',
    featured: true,
    visible: true,
  },
  {
    name: 'MIDYK Wellness',
    year: 2026,
    tagline: "Boutique en ligne d'une marque sénégalaise que j'ai cofondée.",
    description:
      'E-commerce de serviettes hygiéniques lavables avec vitrine, boutique, compte client et back-office. ' +
      'Je suis cofondateur de la marque, en charge du digital.',
    highlights: [
      'Authentification JWT avec refresh token en cookie HttpOnly (Spring Boot 4, Java 21).',
      "Schéma PostgreSQL versionné avec Flyway, tests d'intégration avec Testcontainers.",
      'Front React + Vite + Tailwind, testé avec Vitest.',
      'Front sur Vercel, API sur Render, base PostgreSQL sur Neon.',
    ],
    stack: ['Java 21', 'Spring Boot 4', 'Spring Security', 'PostgreSQL', 'Flyway', 'React', 'Docker'],
    repoPrivate: true,
    demoUrl: 'https://www.midyk-store.com',
    image: 'projects/midyk.webp',
    featured: true,
    visible: true,
  },
  {
    name: 'SenLudo',
    year: 2026,
    tagline: 'Le Ludo aux règles sénégalaises, sur mobile et en ligne.',
    description:
      "Jeu mobile Android / iOS. On peut jouer contre l'ordi, entre amis sur le même téléphone ou en ligne. " +
      'Toutes les règles locales (prison, blocages, capture dans la maison adverse) sont gérées par le même moteur.',
    highlights: [
      "Moteur de règles en TypeScript partagé entre l'application et le serveur, qui valide chaque coup.",
      'Application Ionic + Angular + Capacitor pour Android et iOS.',
      'Parties en ligne en temps réel avec Node.js et Socket.IO.',
    ],
    stack: ['TypeScript', 'Angular', 'Ionic', 'Capacitor', 'Node.js', 'Socket.IO'],
    repoPrivate: true,
    demoUrl: 'https://senludo.onrender.com/accueil',
    image: 'projects/senludo.webp',
    gallery: [1, 2, 3, 4, 5, 6].map((n) => `projects/senludo/slide-${n}.webp`),
    featured: true,
    visible: true,
  },
  {
    name: 'Gestion de stocks',
    year: 2026,
    tagline: 'Application full stack avec gestion des rôles.',
    description:
      'Gestion de produits avec rôles ADMIN / USER et détection automatique du stock bas.',
    highlights: [
      'Tout utilisateur connecté peut consulter, seuls les ADMIN peuvent modifier (Spring Security).',
      'Angular 21 en composants standalone et signals, formulaires réactifs validés.',
      'Docker Compose (API, front, MongoDB) et intégration continue GitHub Actions.',
      'Tests unitaires du service et du contrôleur (JUnit 5, Mockito) et du front.',
    ],
    stack: ['Java 21', 'Spring Boot 4', 'Spring Security', 'MongoDB', 'Angular 21', 'Docker', 'GitHub Actions'],
    repoUrl: 'https://github.com/massalyjr9/gestion-de-stocks',
    featured: true,
    visible: true,
  },
  {
    name: 'Ce portfolio',
    year: 2026,
    tagline: 'Le site sur lequel vous êtes.',
    description:
      'Front Angular pré-rendu (SEO, partage LinkedIn) et API Spring Boot pour le formulaire de contact.',
    highlights: [
      'API de contact avec Bean Validation, anti-spam (honeypot et limite par IP) et erreurs au format RFC 9457.',
      'Tests JUnit 5 / Mockito / MockMvc côté API, Vitest côté Angular.',
      'Image Docker multi-étapes et CI GitHub Actions sur les deux applications.',
    ],
    stack: ['Spring Boot 4', 'Angular 21', 'Three.js', 'Docker', 'GitHub Actions'],
    repoUrl: 'https://github.com/massalyjr9/massalyjr9.github.io',
    featured: false,
    visible: true,
  },
  {
    name: 'Gestion des escales de navires',
    tagline: 'Application métier JEE multicouche.',
    description: 'Suivi des escales portuaires : arrivée, accostage, déchargement, départ.',
    highlights: ['Servlets / JSP, persistance Hibernate, modélisation relationnelle SQL.'],
    stack: ['Java EE', 'Servlets / JSP', 'Hibernate', 'SQL'],
    repoUrl: 'https://github.com/massalyjr9/gestion-escales-navires',
    demoUrl: 'https://gestion-escales-navires.vercel.app',
    featured: false,
    visible: true,
  },
  {
    // TODO : décrire le projet, puis passer `visible` à true
    name: 'KAMYA.co',
    year: 2026,
    tagline: 'Monorepo Spring Boot + Next.js avec paiement en ligne.',
    description: '',
    highlights: [],
    stack: ['Spring Boot', 'Next.js'],
    featured: true,
    visible: false,
  },
  {
    // TODO : décrire le projet, puis passer `visible` à true
    name: 'Naby Traiteur',
    year: 2026,
    tagline: '',
    description: '',
    highlights: [],
    stack: [],
    featured: false,
    visible: false,
  },
];

export const SKILL_TIERS: SkillTier[] = [
  {
    level: 'Au quotidien',
    hint: 'Utilisé en mission et dans mes projets récents',
    skills: [
      'Java 21',
      'Spring Boot',
      'Spring Data JPA / Hibernate',
      'API REST',
      'Angular (signals, RxJS)',
      'TypeScript',
      'PostgreSQL',
      'SQL Server',
      'JUnit 5 / Mockito',
      'Git / Gitflow',
    ],
  },
  {
    level: 'Déjà pratiqué',
    hint: 'Mis en œuvre sur au moins un projet livré',
    skills: [
      'Spring Security',
      'MongoDB',
      'Docker / Docker Compose',
      'Flyway',
      'JWT',
      'Testcontainers',
      'React (Vite)',
      'Déploiement VPS (Caddy)',
      'GitLab CI',
      'GitHub Actions',
      'Jenkins',
      'Maven',
      'Ionic / Capacitor',
      'Node.js / Socket.IO',
    ],
  },
  {
    level: 'Notions',
    hint: 'Étudié, pas encore en production',
    skills: ['Architecture microservices', 'Domain-Driven Design', 'Vue.js'],
  },
];

export const WAYS_OF_WORKING = ['Scrum', 'Revues de code', 'Tests avant mise en production', 'Documentation technique'];

export const EDUCATION = [
  {
    year: 2025,
    degree: 'Master Informatique, Systèmes embarqués (spécialité IoT)',
    school: 'Université Marie et Louis Pasteur, Montbéliard',
  },
  {
    year: 2023,
    degree: "Licence Génie Logiciel et Systèmes d'Information",
    school: 'École Supérieure Polytechnique (UCAD), Dakar',
  },
];

export const LANGUAGES = ['Français (langue maternelle)', 'Anglais courant (C1)'];

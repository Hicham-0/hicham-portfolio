import type { Lang, ProjectBase, SectionId } from "./portfolio-data";

export type { Lang } from "./portfolio-data";

type KV = { k: string; v: string };
type TwoLines = [string, string];

export type ProjectCopy = {
  subtitle: string;
  client: string;
  role: string;
  highlight: string;
  summary: string;
  brief: string;
  composition: string;
  outcomes: { value: string; label: string }[];
};

export type Content = {
  nav: Record<SectionId, string>;
  header: {
    home: string;
    tagline: string;
    primaryNav: string;
    menu: string;
    close: string;
    drawerLabel: string;
    langGroup: string;
    english: string;
    french: string;
  };
  hero: {
    kicker: string;
    role: string;
    note: TwoLines;
    particulars: KV[];
    title: TwoLines;
    ctaKicker: string;
    cta: string;
  };
  approach: {
    note: string;
    /** Words wrapped in *asterisks* are set in italic cobalt. */
    statement: string;
    tenets: { title: string; text: string; spec: string }[];
  };
  projects: {
    note: string;
    title: TwoLines;
    open: string;
    next: { title: string; text: string; cta: string };
    schematic: string;
    copy: Record<ProjectBase["id"], ProjectCopy>;
  };
  modal: {
    back: string;
    counter: string;
    close: string;
    closeAria: string;
    figure: string;
    figureNote: string;
    details: { client: string; role: string; cloud: string; year: string; stack: string };
    challenge: string;
    solution: string;
    outcome: string;
    otherAria: string;
    previous: string;
    next: string;
    all: string;
  };
  schematicAria: string;
  passage: {
    aria: string;
    /** [plain, emphasis, plain, emphasis] */
    quote: [string, string, string, string];
  };
  stack: {
    note: string;
    title: TwoLines;
    tabsAria: string;
    items: { id: string; label: string; word: string; text: string; items: string[] }[];
  };
  experience: {
    note: string;
    title: TwoLines;
    certifications: string;
    timeline: {
      no: string;
      years: string;
      role: string;
      company: string;
      place: string;
      text: string;
      medium: string;
    }[];
    credentials: string[];
  };
  contact: {
    note: string;
    title: TwoLines;
    copy: string;
    copied: string;
    linkedinKicker: string;
    linkedinHandle: string;
    linkedinAria: string;
    particulars: KV[];
    rights: string;
    place: string;
    top: string;
  };
};

const en: Content = {
  nav: {
    approach: "Approach",
    projects: "Projects",
    stack: "Stack",
    experience: "Experience",
    contact: "Contact",
  },
  header: {
    home: "Hicham El Hanafi — back to top",
    tagline: "Cloud & DevOps Engineer · Rabat",
    primaryNav: "Primary",
    menu: "Index",
    close: "Close",
    drawerLabel: "Site navigation",
    langGroup: "Language",
    english: "English",
    french: "Français",
  },
  hero: {
    kicker: "Portfolio · 2026",
    role: "Cloud & DevOps Engineer",
    note: [
      "Fig. 0 — A movement, keeping time.",
      "Infrastructure should do the same, without supervision.",
    ],
    particulars: [
      { k: "Discipline", v: "Cloud infrastructure & DevOps" },
      { k: "Stack", v: "AWS · Terraform · Docker" },
      { k: "Based", v: "Rabat, Morocco" },
    ],
    title: ["Infrastructure,", "considered."],
    ctaKicker: "Projects 01 — 02",
    cta: "Explore the architecture",
  },
  approach: {
    note: "Core principles",
    statement:
      "The best systems are the ones you *never* *notice.* Complex beneath the surface, automatic in motion, and built to *last.*",
    tenets: [
      {
        title: "Resilience",
        text: "Multi-zone architecture with zero single points of failure.",
        spec: "Multi-AZ · Blast-radius isolation",
      },
      {
        title: "Automation",
        text: "Every network rule and delivery pipeline declared in code.",
        spec: "Terraform · CodePipeline · CodeBuild",
      },
      {
        title: "Continuity",
        text: "Blue/Green releases that shift live traffic without downtime.",
        spec: "Blue/Green · ECS Fargate",
      },
      {
        title: "Isolation",
        text: "Private subnets and strict least-privilege access by default.",
        spec: "VPC · Security Groups · Segmentation",
      },
    ],
  },
  projects: {
    note: "Selected work",
    title: ["Two works of", "quiet architecture."],
    open: "View project",
    next: {
      title: "Next",
      text: "Available for a 6-month end-of-studies internship (PFE).",
      cta: "Get in touch",
    },
    schematic: "Schematic",
    copy: {
      slipstream: {
        subtitle: "Zero-downtime delivery on AWS",
        client: "Smartovate LTD",
        role: "Cloud & DevOps Intern",
        highlight: "Zero-downtime releases",
        summary:
          "Multi-AZ container infrastructure on AWS with automated Blue/Green releases.",
        brief:
          "Make production releases uneventful: a fault-tolerant AWS network with zero single points of failure and zero-downtime deployments.",
        composition:
          "Declared in Terraform across Multi-AZ subnets. CodePipeline and CodeBuild package commits into Docker images, shifting live traffic across ECS Fargate via Blue/Green target groups.",
        outcomes: [
          { value: "Multi-AZ", label: "No single point of failure" },
          { value: "Blue/Green", label: "Releases without downtime" },
          { value: "Fargate", label: "Serverless container compute" },
        ],
      },
      aperture: {
        subtitle: "Event-driven serverless image processing",
        client: "Independent project",
        role: "Designer and builder",
        highlight: "Scale-to-zero compute",
        summary:
          "An event-driven serverless backend that processes media on upload and scales to zero at rest.",
        brief:
          "Process high-resolution images the instant they land in storage—without idle servers or public bucket exposure.",
        composition:
          "Direct S3 uploads trigger asynchronous AWS Lambda functions. Optimized assets are stored privately and served worldwide through CloudFront edge caching.",
        outcomes: [
          { value: "Event-driven", label: "Triggered on S3 upload" },
          { value: "Serverless", label: "Zero idle compute cost" },
          { value: "Edge-cached", label: "Global CloudFront delivery" },
        ],
      },
    },
  },
  modal: {
    back: "Back to projects",
    counter: "Project",
    close: "Close",
    closeAria: "Close project view",
    figure: "architecture schematic",
    figureNote: "Simplified view",
    details: {
      client: "Client",
      role: "Role",
      cloud: "Cloud",
      year: "Year",
      stack: "Stack",
    },
    challenge: "Challenge",
    solution: "Solution",
    outcome: "Outcome",
    otherAria: "Other projects",
    previous: "Previous",
    next: "Next",
    all: "All projects",
  },
  schematicAria: "architecture schematic",
  passage: {
    aria: "From Rabat to the global cloud",
    quote: [
      "From Rabat, building",
      "the quiet systems",
      "that let ideas travel",
      "without borders.",
    ],
  },
  stack: {
    note: "Five domains",
    title: ["The tools,", "in daily use."],
    tabsAria: "Domains",
    items: [
      {
        id: "compute",
        label: "Compute",
        word: "Compute",
        text: "Elastic instances, stateless containers, and event-driven functions.",
        items: ["EC2", "Auto Scaling", "ECS", "Fargate", "Lambda"],
      },
      {
        id: "data",
        label: "Data and storage",
        word: "Data",
        text: "Event-driven object storage, NoSQL state, and global edge caching.",
        items: ["S3", "DynamoDB", "CloudFront"],
      },
      {
        id: "delivery",
        label: "Delivery",
        word: "Delivery",
        text: "Infrastructure as Code and automated Blue/Green container pipelines.",
        items: ["Terraform", "Docker", "GitLab CI", "CodePipeline", "CodeBuild", "Blue/Green"],
      },
      {
        id: "network",
        label: "Network and security",
        word: "Network",
        text: "Segmented VPCs, private subnets, and narrow stateful rules.",
        items: ["VPC", "Security Groups", "NAT gateways", "VPN", "Segmentation", "Firewalls", "TCP/IP", "DNS", "DHCP"],
      },
      {
        id: "linux",
        label: "Linux",
        word: "Linux",
        text: "Red Hat Enterprise Linux administration and Zabbix host telemetry.",
        items: ["RHEL", "Services", "Packages", "Zabbix"],
      },
    ],
  },
  experience: {
    note: "Experience & education",
    title: ["The making", "of an engineer."],
    certifications: "Certifications",
    timeline: [
      {
        no: "03",
        years: "Jul — Sep 2026",
        role: "Cloud & DevOps Intern",
        company: "Smartovate LTD",
        place: "Remote, London",
        text: "Architected Multi-AZ AWS infrastructure in Terraform and automated Blue/Green deployments on ECS Fargate.",
        medium: "Terraform · CodePipeline · Fargate",
      },
      {
        no: "02",
        years: "Jun — Aug 2025",
        role: "DevOps Intern",
        company: "Navimar Systems",
        place: "Rabat, Morocco",
        text: "Built distributed Linux infrastructure monitoring and proactive alerting pipelines with Zabbix.",
        medium: "Zabbix · Linux",
      },
      {
        no: "01",
        years: "2022 — 2027 (expected)",
        role: "Engineering student",
        company: "EMSI",
        place: "Rabat, Morocco",
        text: "State Engineer’s Degree in Computer Engineering — Cyber Security & Networks.",
        medium: "Networks · Security · Linux",
      },
    ],
    credentials: [
      "AWS Certified Solutions Architect Associate",
      "Fundamentals of Red Hat Enterprise Linux — Red Hat",
    ],
  },
  contact: {
    note: "Open to a 6-month internship (PFE)",
    title: ["Have a role in mind?", "Let’s talk."],
    copy: "Copy email address",
    copied: "Address copied",
    linkedinKicker: "Connect on LinkedIn",
    linkedinHandle: "in/hicham-elhanafi",
    linkedinAria: "Open Hicham El Hanafi’s LinkedIn profile (new tab)",
    particulars: [
      { k: "Availability", v: "6-month PFE internship · 2027" },
      { k: "Based", v: "Rabat, Morocco" },
      { k: "Languages", v: "English · Français · العربية" },
    ],
    rights: "© 2026 Hicham El Hanafi",
    place: "Rabat, Morocco",
    top: "Return to top ↑",
  },
};

const fr: Content = {
  nav: {
    approach: "Approche",
    projects: "Projets",
    stack: "Stack",
    experience: "Parcours",
    contact: "Contact",
  },
  header: {
    home: "Hicham El Hanafi — retour en haut",
    tagline: "Ingénieur Cloud & DevOps · Rabat",
    primaryNav: "Navigation principale",
    menu: "Index",
    close: "Fermer",
    drawerLabel: "Navigation du site",
    langGroup: "Langue",
    english: "English",
    french: "Français",
  },
  hero: {
    kicker: "Portfolio · 2026",
    role: "Ingénieur Cloud & DevOps",
    note: [
      "Fig. 0 — Un mouvement qui garde l’heure.",
      "L’infrastructure devrait faire de même, sans surveillance.",
    ],
    particulars: [
      { k: "Discipline", v: "Infrastructure cloud & DevOps" },
      { k: "Stack", v: "AWS · Terraform · Docker" },
      { k: "Basé à", v: "Rabat, Maroc" },
    ],
    title: ["L’infrastructure,", "pensée."],
    ctaKicker: "Projets 01 — 02",
    cta: "Explorer l’architecture",
  },
  approach: {
    note: "Principes",
    statement:
      "Les meilleurs systèmes sont ceux qu’on ne *remarque* *jamais.* Complexes en profondeur, automatiques en mouvement, et faits pour *durer.*",
    tenets: [
      {
        title: "Résilience",
        text: "Une architecture multi-zones, sans point de défaillance unique.",
        spec: "Multi-AZ · Isolation des pannes",
      },
      {
        title: "Automatisation",
        text: "Chaque règle réseau et chaque pipeline de livraison, déclarés en code.",
        spec: "Terraform · CodePipeline · CodeBuild",
      },
      {
        title: "Continuité",
        text: "Des déploiements Blue/Green qui basculent le trafic sans interruption.",
        spec: "Blue/Green · ECS Fargate",
      },
      {
        title: "Isolation",
        text: "Sous-réseaux privés et moindre privilège strict, par défaut.",
        spec: "VPC · Security Groups · Segmentation",
      },
    ],
  },
  projects: {
    note: "Sélection",
    title: ["Deux projets", "d’architecture discrète."],
    open: "Voir le projet",
    next: {
      title: "La suite",
      text: "Disponible pour un stage de fin d’études (PFE) de 6 mois.",
      cta: "Me contacter",
    },
    schematic: "Schéma",
    copy: {
      slipstream: {
        subtitle: "Livraison sans interruption sur AWS",
        client: "Smartovate LTD",
        role: "Stagiaire Cloud & DevOps",
        highlight: "Déploiements sans coupure",
        summary:
          "Infrastructure de conteneurs multi-AZ sur AWS, avec déploiements Blue/Green automatisés.",
        brief:
          "Rendre les mises en production banales : un réseau AWS tolérant aux pannes, sans point de défaillance unique, et des déploiements sans interruption.",
        composition:
          "Déclarée en Terraform sur des sous-réseaux multi-AZ. CodePipeline et CodeBuild transforment chaque commit en image Docker, puis basculent le trafic sur ECS Fargate via des target groups Blue/Green.",
        outcomes: [
          { value: "Multi-AZ", label: "Aucun point de défaillance unique" },
          { value: "Blue/Green", label: "Déploiements sans interruption" },
          { value: "Fargate", label: "Conteneurs serverless" },
        ],
      },
      aperture: {
        subtitle: "Traitement d’images serverless et événementiel",
        client: "Projet personnel",
        role: "Conception et réalisation",
        highlight: "Zéro calcul au repos",
        summary:
          "Un backend serverless événementiel qui traite les médias dès l’upload et ne consomme rien au repos.",
        brief:
          "Traiter des images haute résolution dès leur arrivée dans le stockage — sans serveur inactif ni bucket public.",
        composition:
          "Les uploads directs vers S3 déclenchent des fonctions AWS Lambda asynchrones. Les images optimisées sont stockées en privé et diffusées dans le monde entier via le cache edge de CloudFront.",
        outcomes: [
          { value: "Événementiel", label: "Déclenché à l’upload S3" },
          { value: "Serverless", label: "Aucun coût de calcul inactif" },
          { value: "Cache edge", label: "Diffusion mondiale CloudFront" },
        ],
      },
    },
  },
  modal: {
    back: "Retour aux projets",
    counter: "Projet",
    close: "Fermer",
    closeAria: "Fermer le projet",
    figure: "schéma d’architecture",
    figureNote: "Vue simplifiée",
    details: {
      client: "Client",
      role: "Rôle",
      cloud: "Cloud",
      year: "Année",
      stack: "Stack",
    },
    challenge: "Enjeu",
    solution: "Solution",
    outcome: "Résultat",
    otherAria: "Autres projets",
    previous: "Précédent",
    next: "Suivant",
    all: "Tous les projets",
  },
  schematicAria: "schéma d’architecture",
  passage: {
    aria: "De Rabat au cloud mondial",
    quote: [
      "Depuis Rabat, je construis",
      "des systèmes discrets",
      "qui laissent les idées voyager",
      "sans frontières.",
    ],
  },
  stack: {
    note: "Cinq domaines",
    title: ["Les outils,", "au quotidien."],
    tabsAria: "Domaines",
    items: [
      {
        id: "compute",
        label: "Calcul",
        word: "Calcul",
        text: "Instances élastiques, conteneurs sans état et fonctions événementielles.",
        items: ["EC2", "Auto Scaling", "ECS", "Fargate", "Lambda"],
      },
      {
        id: "data",
        label: "Données et stockage",
        word: "Données",
        text: "Stockage objet événementiel, état NoSQL et cache edge mondial.",
        items: ["S3", "DynamoDB", "CloudFront"],
      },
      {
        id: "delivery",
        label: "Livraison",
        word: "Livraison",
        text: "Infrastructure as Code et pipelines de conteneurs Blue/Green automatisés.",
        items: ["Terraform", "Docker", "GitLab CI", "CodePipeline", "CodeBuild", "Blue/Green"],
      },
      {
        id: "network",
        label: "Réseau et sécurité",
        word: "Réseau",
        text: "VPC segmentés, sous-réseaux privés et règles stateful restreintes.",
        items: ["VPC", "Security Groups", "Passerelles NAT", "VPN", "Segmentation", "Pare-feu", "TCP/IP", "DNS", "DHCP"],
      },
      {
        id: "linux",
        label: "Linux",
        word: "Linux",
        text: "Administration de Red Hat Enterprise Linux et supervision des hôtes avec Zabbix.",
        items: ["RHEL", "Services", "Paquets", "Zabbix"],
      },
    ],
  },
  experience: {
    note: "Expérience & formation",
    title: ["Le parcours", "d’un ingénieur."],
    certifications: "Certifications",
    timeline: [
      {
        no: "03",
        years: "Juil. — Sept. 2026",
        role: "Stagiaire Cloud & DevOps",
        company: "Smartovate LTD",
        place: "Londres, à distance",
        text: "Conception d’une infrastructure AWS multi-AZ en Terraform et automatisation des déploiements Blue/Green sur ECS Fargate.",
        medium: "Terraform · CodePipeline · Fargate",
      },
      {
        no: "02",
        years: "Juin — Août 2025",
        role: "Stagiaire DevOps",
        company: "Navimar Systems",
        place: "Rabat, Maroc",
        text: "Mise en place d’une supervision d’infrastructure Linux distribuée et d’alertes proactives avec Zabbix.",
        medium: "Zabbix · Linux",
      },
      {
        no: "01",
        years: "2022 — 2027 (prévu)",
        role: "Élève ingénieur",
        company: "EMSI",
        place: "Rabat, Maroc",
        text: "Diplôme d’ingénieur d’État en informatique — Cybersécurité & Réseaux.",
        medium: "Réseaux · Sécurité · Linux",
      },
    ],
    credentials: [
      "AWS Certified Solutions Architect Associate",
      "Fundamentals of Red Hat Enterprise Linux — Red Hat",
    ],
  },
  contact: {
    note: "Disponible pour un stage PFE de 6 mois",
    title: ["Un poste en vue ?", "Parlons-en."],
    copy: "Copier l’adresse",
    copied: "Adresse copiée",
    linkedinKicker: "Retrouvez-moi sur LinkedIn",
    linkedinHandle: "in/hicham-elhanafi",
    linkedinAria: "Ouvrir le profil LinkedIn de Hicham El Hanafi (nouvel onglet)",
    particulars: [
      { k: "Disponibilité", v: "Stage PFE de 6 mois · 2027" },
      { k: "Basé à", v: "Rabat, Maroc" },
      { k: "Langues", v: "English · Français · العربية" },
    ],
    rights: "© 2026 Hicham El Hanafi",
    place: "Rabat, Maroc",
    top: "Retour en haut ↑",
  },
};

export const content: Record<Lang, Content> = { en, fr };

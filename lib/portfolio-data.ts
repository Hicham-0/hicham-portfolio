export type Lang = "en" | "fr";

/** A string that is either language-neutral or has one value per language. */
export type Text = string | Record<Lang, string>;

export const tx = (text: Text, lang: Lang) =>
  typeof text === "string" ? text : text[lang];

export type DiagramNode = {
  id: string;
  label: Text;
  sub?: Text;
  x: number;
  y: number;
  accent?: boolean;
};

export type DiagramGroup = {
  label: Text;
  x: number;
  y: number;
  w: number;
  h: number;
};

export type Diagram = {
  nodes: DiagramNode[];
  edges: [string, string][];
  groups: DiagramGroup[];
};

/** Language-neutral project facts. Copy lives in `lib/content.ts`. */
export type ProjectBase = {
  id: "slipstream" | "aperture";
  index: string;
  title: string;
  year: string;
  cloud: string;
  stack: string[];
  diagram: Diagram;
};

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const projects: ProjectBase[] = [
  {
    id: "slipstream",
    index: "01",
    title: "Slipstream",
    year: "2026",
    cloud: "AWS",
    stack: ["Terraform", "CodePipeline", "CodeBuild", "ECS Fargate", "Docker", "ALB"],
    diagram: {
      groups: [
        { label: "ecs fargate · multi-az", x: 365, y: 40, w: 235, h: 320 },
      ],
      nodes: [
        { id: "pipe", label: "CodePipeline", sub: { en: "orchestrate", fr: "orchestration" }, x: 20, y: 90, accent: true },
        { id: "build", label: "CodeBuild", sub: { en: "image build", fr: "build d’image" }, x: 20, y: 270 },
        { id: "alb", label: { en: "Load balancer", fr: "Répartiteur" }, sub: "alb", x: 215, y: 180, accent: true },
        { id: "blue", label: "Blue", sub: { en: "live version", fr: "version active" }, x: 395, y: 100 },
        { id: "green", label: "Green", sub: { en: "new version", fr: "nouvelle version" }, x: 395, y: 260, accent: true },
      ],
      edges: [
        ["pipe", "build"],
        ["build", "green"],
        ["alb", "blue"],
        ["alb", "green"],
      ],
    },
  },
  {
    id: "aperture",
    index: "02",
    title: "Aperture",
    year: "2026",
    cloud: "AWS",
    stack: ["S3", "Lambda", "CloudFront", "DynamoDB"],
    diagram: {
      groups: [
        { label: { en: "event-driven", fr: "événementiel" }, x: 180, y: 130, w: 275, h: 140 },
      ],
      nodes: [
        { id: "s3in", label: "S3", sub: "upload", x: 20, y: 200, accent: true },
        { id: "fn", label: "Lambda", sub: { en: "process", fr: "traitement" }, x: 200, y: 200 },
        { id: "s3out", label: "S3", sub: { en: "result", fr: "résultat" }, x: 335, y: 200 },
        { id: "site", label: { en: "Static site", fr: "Site statique" }, sub: { en: "s3 hosting", fr: "hébergé sur s3" }, x: 335, y: 340 },
        { id: "cdn", label: "CloudFront", sub: { en: "edge cache", fr: "cache edge" }, x: 500, y: 270, accent: true },
      ],
      edges: [
        ["s3in", "fn"],
        ["fn", "s3out"],
        ["s3out", "cdn"],
        ["site", "cdn"],
      ],
    },
  },
];

/** Section anchors, in page order. Labels come from `content[lang].nav`. */
export const sectionIds = [
  "approach",
  "projects",
  "stack",
  "experience",
  "contact",
] as const;
export type SectionId = (typeof sectionIds)[number];

export const EMAIL = "mlyhichamelhanafi@gmail.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/hicham-elhanafi/";

export type DiagramNode = {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
  accent?: boolean;
};

export type DiagramGroup = {
  label: string;
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

export type Project = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  year: string;
  cloud: string;
  client: string;
  role: string;
  estimate: string;
  summary: string;
  brief: string;
  composition: string;
  outcomes: { value: string; label: string }[];
  stack: string[];
  diagram: Diagram;
};

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const projects: Project[] = [
  {
    id: "slipstream",
    index: "01",
    title: "Slipstream",
    subtitle: "Zero-downtime delivery on AWS",
    year: "2026",
    cloud: "AWS",
    client: "Smartovate LTD",
    role: "Cloud & DevOps Intern",
    estimate: "Zero-downtime releases",
    summary:
      "A delivery pipeline where a new version arrives beside the old one, and traffic moves only when it is ready.",
    brief:
      "The task was to make releases uneventful: infrastructure with no single point of failure, and a pipeline that could ship an update without taking the service down.",
    composition:
      "The network is declared once in Terraform, as a multi-AZ VPC with load balancers and NAT gateways. CodePipeline and CodeBuild take a commit to a Docker image, and Blue/Green deployments bring the new version up on ECS Fargate beside the live one before traffic is shifted.",
    outcomes: [
      { value: "Multi-AZ", label: "No single point of failure" },
      { value: "Blue/Green", label: "Releases without downtime" },
      { value: "Fargate", label: "No servers to manage" },
    ],
    stack: [
      "Terraform",
      "CodePipeline",
      "CodeBuild",
      "ECS Fargate",
      "Docker",
      "ALB",
    ],
    diagram: {
      groups: [
        { label: "ecs fargate · multi-az", x: 365, y: 40, w: 235, h: 320 },
      ],
      nodes: [
        { id: "pipe", label: "CodePipeline", sub: "orchestrate", x: 20, y: 90, accent: true },
        { id: "build", label: "CodeBuild", sub: "image build", x: 20, y: 270 },
        { id: "alb", label: "Load balancer", sub: "alb", x: 215, y: 180, accent: true },
        { id: "blue", label: "Blue", sub: "live version", x: 395, y: 100 },
        { id: "green", label: "Green", sub: "new version", x: 395, y: 260, accent: true },
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
    subtitle: "Event-driven serverless image processing",
    year: "2026",
    cloud: "AWS",
    client: "Independent project",
    role: "Designer and builder",
    estimate: "No servers to manage",
    summary:
      "A backend that wakes only when an image arrives, and rests the rest of the time.",
    brief:
      "Images should be processed the moment they arrive, without a server waiting for them. The goal was a fully serverless backend, with a frontend that loads quickly from anywhere.",
    composition:
      "An upload to S3 raises an event that triggers a Lambda function, which processes the image asynchronously. The frontend is a static site on S3, served through CloudFront edge caching for low latency worldwide.",
    outcomes: [
      { value: "Event-driven", label: "Triggered the instant a file lands" },
      { value: "Serverless", label: "Nothing to patch or scale" },
      { value: "Edge-cached", label: "Fast from anywhere" },
    ],
    stack: ["S3", "Lambda", "CloudFront", "DynamoDB"],
    diagram: {
      groups: [{ label: "event-driven", x: 180, y: 130, w: 275, h: 140 }],
      nodes: [
        { id: "s3in", label: "S3", sub: "upload", x: 20, y: 200, accent: true },
        { id: "fn", label: "Lambda", sub: "process", x: 200, y: 200 },
        { id: "s3out", label: "S3", sub: "result", x: 335, y: 200 },
        { id: "site", label: "Static site", sub: "s3 hosting", x: 335, y: 340 },
        { id: "cdn", label: "CloudFront", sub: "edge cache", x: 500, y: 270, accent: true },
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

export const tenets = [
  {
    numeral: "I",
    title: "Resilience",
    text: "Design so that no single failure takes the service down: more than one zone, more than one path.",
    spec: "Multi-AZ · No single point of failure",
  },
  {
    numeral: "II",
    title: "Automation",
    text: "If it can be written down, it can be reproduced. Infrastructure and delivery live in code, not in memory.",
    spec: "Terraform · CodePipeline · CodeBuild",
  },
  {
    numeral: "III",
    title: "Continuity",
    text: "Release without ceremony. A new version arrives beside the old, and traffic moves only when it is ready.",
    spec: "Blue/Green · Zero-downtime releases",
  },
  {
    numeral: "IV",
    title: "Isolation",
    text: "Keep private things private: public and private subnets, narrow rules, nothing open by default.",
    spec: "VPC · Security Groups · Segmentation",
  },
];

export const inventory = [
  {
    id: "compute",
    label: "Compute",
    word: "Compute",
    text: "Virtual machines, containers and functions: where the work actually runs.",
    items: ["EC2", "Auto Scaling", "ECS", "Fargate", "Lambda"],
  },
  {
    id: "data",
    label: "Data and storage",
    word: "Data",
    text: "Object storage that starts events, and a managed table for state.",
    items: ["S3", "DynamoDB", "CloudFront"],
  },
  {
    id: "delivery",
    label: "Delivery",
    word: "Delivery",
    text: "From commit to running container, written in code and released Blue/Green.",
    items: [
      "Terraform",
      "Docker",
      "GitLab CI",
      "CodePipeline",
      "CodeBuild",
      "Blue/Green",
    ],
  },
  {
    id: "network",
    label: "Network and security",
    word: "Network",
    text: "Public and private subnets, narrow rules, nothing open by default.",
    items: [
      "VPC",
      "Security Groups",
      "NAT gateways",
      "VPN",
      "Segmentation",
      "Firewalls",
      "TCP/IP",
      "DNS",
      "DHCP",
    ],
  },
  {
    id: "linux",
    label: "Linux",
    word: "Linux",
    text: "The ground beneath it all: Red Hat Enterprise Linux, services, packages, and monitoring across hosts.",
    items: ["RHEL", "Services", "Packages", "Zabbix"],
  },
];

export const timeline = [
  {
    no: "No. 03",
    years: "Jul — Sep 2026",
    role: "Cloud & DevOps Intern",
    company: "Smartovate LTD",
    place: "Remote, London",
    text: "Designed fault-tolerant, multi-AZ AWS infrastructure with Terraform, and automated delivery with CodePipeline and CodeBuild using Blue/Green deployments. Containerized the app with Docker on ECS Fargate.",
    medium: "Terraform · CodePipeline · Fargate",
  },
  {
    no: "No. 02",
    years: "Jun — Aug 2025",
    role: "DevOps Intern",
    company: "Navimar Systems",
    place: "Rabat, Morocco",
    text: "Built an infrastructure monitoring framework across distributed Linux hosts with Zabbix, and tuned alert thresholds so problems surface earlier.",
    medium: "Zabbix · Linux",
  },
  {
    no: "No. 01",
    years: "2022 — 2027 (expected)",
    role: "Engineering student",
    company: "EMSI",
    place: "Rabat, Morocco",
    text: "State Engineer’s Degree in Computer Engineering, Cyber Security & Networks.",
    medium: "Networks · Security · Linux",
  },
];

export const credentials = [
  "AWS Certified Solutions Architect Associate",
  "Fundamentals of Red Hat Enterprise Linux — Red Hat",
];

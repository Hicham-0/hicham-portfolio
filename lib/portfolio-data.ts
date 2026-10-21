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
    estimate: "Scale-to-zero compute",
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
    text: "Multi-zone architecture with zero single points of failure.",
    spec: "Multi-AZ · Blast-radius isolation",
  },
  {
    numeral: "II",
    title: "Automation",
    text: "Every network rule and delivery pipeline declared in code.",
    spec: "Terraform · CodePipeline · CodeBuild",
  },
  {
    numeral: "III",
    title: "Continuity",
    text: "Blue/Green releases that shift live traffic without downtime.",
    spec: "Blue/Green · ECS Fargate",
  },
  {
    numeral: "IV",
    title: "Isolation",
    text: "Private subnets and strict least-privilege access by default.",
    spec: "VPC · Security Groups · Segmentation",
  },
];

export const inventory = [
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
    text: "Segmented VPCs, private subnets, and narrow stateful rules.",
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
    text: "Red Hat Enterprise Linux administration and Zabbix host telemetry.",
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
    text: "Architected Multi-AZ AWS infrastructure in Terraform and automated Blue/Green deployments on ECS Fargate.",
    medium: "Terraform · CodePipeline · Fargate",
  },
  {
    no: "No. 02",
    years: "Jun — Aug 2025",
    role: "DevOps Intern",
    company: "Navimar Systems",
    place: "Rabat, Morocco",
    text: "Built distributed Linux infrastructure monitoring and proactive alerting pipelines with Zabbix.",
    medium: "Zabbix · Linux",
  },
  {
    no: "No. 01",
    years: "2022 — 2027 (expected)",
    role: "Engineering student",
    company: "EMSI",
    place: "Rabat, Morocco",
    text: "State Engineer’s Degree in Computer Engineering — Cyber Security & Networks.",
    medium: "Networks · Security · Linux",
  },
];

export const credentials = [
  "AWS Certified Solutions Architect Associate",
  "Fundamentals of Red Hat Enterprise Linux — Red Hat",
];

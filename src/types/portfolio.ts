export interface FlagshipMetric {
  label: string;
  value: string;
}

export interface FlagshipCaseStudy {
  problem: string;
  decision: string;
  architectureKey: 'machinewise' | 'mqtt-go' | 'ctq-extraction';
  results: string[];
}

export interface Flagship {
  slug: string;
  title: string;
  badge: string;
  tagline: string;
  stack: string[];
  metrics: FlagshipMetric[];
  caseStudy: FlagshipCaseStudy;
  repoUrl?: string;
}

export interface WorkshopCard {
  repo: string;
  title: string;
  tagline: string;
  tags: string[];
  stack: string[];
  demoUrl?: string;
  description?: string;
}

export interface Metric {
  value: string;
  label: string;
  source: string;
  highlight?: boolean;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location?: string;
  period: string;
  bullets: string[];
  tags?: string[];
}

export interface TalkItem {
  title: string;
  event: string;
  year: string;
  description: string;
  tags?: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  grade?: string;
}

export interface SkillItem {
  name: string;
  highlight?: boolean;
}

export interface SkillGroup {
  title: string;
  skills: SkillItem[];
}

export interface Profile {
  name: string;
  legalName: string;
  title: string;
  location: string;
  positioning: string;
  bio: string[];
  links: Record<string, string>;
  todos: string[];
}

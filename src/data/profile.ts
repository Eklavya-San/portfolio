import type { Profile } from '../types/portfolio';

export const profileLinks = {
  github: 'https://github.com/Eklavya-San',
  x: 'https://x.com/eghodake',
  linkedin: 'https://linkedin.com/in/eklavya-ghodake-0bb604197',
  email: 'mailto:eklavyaghodake@gmail.com',
  youtube: 'https://youtube.com/@developer_by_choice',
};

export const profile: Profile = {
  name: 'Eklavya Ghodake',
  legalName: 'Eklavya Shivaji Ghodake',
  title: 'Software R&D Lead / Manager | Full-Stack & Distributed Systems',
  location: 'Pune / Maharashtra, India',
  positioning:
    'I build software for the factory floor: real-time telemetry, distributed streaming pipelines, and AI that reads engineering drawings.',
  bio: [
    'Software R&D Lead / Manager at Yantramedhavi India, architecting event-driven telemetry microservices, zero-loss disaster recovery, and edge services for industrial manufacturing.',
    'Creator of open-source developer tools including MQTT-GO (concurrent Go client) and CTQ-Extraction (AI drawing extraction skill).',
  ],
  links: profileLinks,
  todos: [
    'TODO(eklavya): confirm YouTube channel @developer_by_choice is live; otherwise drop the community section',
    'TODO(eklavya): confirm you are comfortable publishing 99.9%+ platform uptime metric',
    'TODO(eklavya): confirm industrial protocol experience (Fanuc FOCAS) beyond driver fork',
    'TODO(eklavya): consolidate document_rag / RAG repos and add README',
    'TODO(eklavya): provide description and screenshot for ai-vision-annotator before listing',
    'TODO(eklavya): provide description and screenshot for ai-procurement-auditor before listing',
    'TODO(eklavya): provide merged PR links for open-source contributions',
  ],
};

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
  title: 'Senior Software Engineer | Full-Stack & Distributed Systems',
  location: 'Pune / Maharashtra, India',
  positioning:
    'Full-Stack Software Engineer building high-throughput distributed systems, real-time event streaming pipelines, and applied AI developer tooling.',
  bio: [
    'Senior Software Engineer with hands-on expertise building event-driven microservices, real-time streaming architectures, and high-performance web platforms.',
    'Proven track record slashing cloud database storage by 70%, architecting zero-data-loss disaster recovery, and developing open-source agentic developer tools.',
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

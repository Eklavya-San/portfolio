import type { Profile } from '../types/portfolio';

export const profileLinks = {
  github: 'https://github.com/Eklavya-San',
  x: 'https://x.com/eghodake',
  linkedin: 'https://linkedin.com/in/eklavya-san',
  email: 'mailto:eklavyaghodake@gmail.com',
  youtube: 'https://youtube.com/@developer_by_choice',
};

export const profile: Profile = {
  name: 'Eklavya Ghodake',
  legalName: 'Eklavya Shivaji Ghodake',
  title: 'TODO(eklavya): choose one — Software R&D Lead or Senior Software Engineer',
  location: 'Pune / Maharashtra, India',
  positioning: 'I build software for the factory floor: real-time telemetry, and AI that reads engineering drawings.',
  bio: [
    'Software R&D Lead specializing in high-throughput industrial telemetry, distributed systems, and real-time factory floor dashboards.',
    'Builder of open-source agentic developer tools, local RAG architectures, and multimodal AI systems parsing engineering drawings.',
  ],
  links: profileLinks,
  todos: [
    "TODO(eklavya): choose one title between 'Software R&D Lead' and 'Senior Software Engineer' for consistent use across site, resume and LinkedIn",
    'TODO(eklavya): confirm LinkedIn URL from resume',
    'TODO(eklavya): confirm YouTube channel @developer_by_choice is live; otherwise drop the community section',
    'TODO(eklavya): confirm you are comfortable publishing 99.9%+ platform uptime metric',
    'TODO(eklavya): confirm industrial protocol experience (Fanuc FOCAS) beyond driver fork',
    'TODO(eklavya): consolidate document_rag / RAG repos and add README',
    'TODO(eklavya): provide description and screenshot for ai-vision-annotator before listing',
    'TODO(eklavya): provide description and screenshot for ai-procurement-auditor before listing',
    'TODO(eklavya): provide merged PR links for open-source contributions',
  ],
};

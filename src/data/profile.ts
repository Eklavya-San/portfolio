import type { Profile } from '../types/portfolio';

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
  links: {
    github: 'https://github.com/Eklavya-San',
    x: 'https://x.com/eghodake',
    linkedin: 'TODO(eklavya): confirm LinkedIn URL from resume',
    email: 'mailto:eklavyaghodake@gmail.com',
    youtube: 'https://youtube.com/@developer_by_choice',
  },
  todos: [
    "TODO(eklavya): choose one title between 'Software R&D Lead' and 'Senior Software Engineer' for consistent use across site, resume and LinkedIn",
    'TODO(eklavya): confirm LinkedIn URL from resume',
    'TODO(eklavya): confirm YouTube channel @developer_by_choice is live; otherwise drop the community section',
    'TODO(eklavya): confirm you are comfortable publishing 99.9%+ platform uptime metric',
  ],
};

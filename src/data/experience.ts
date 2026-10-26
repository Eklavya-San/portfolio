import type { ExperienceItem, TalkItem, EducationItem } from '../types/portfolio';

export const experience: ExperienceItem[] = [
  {
    role: 'Software R&D Lead / Senior Software Engineer',
    company: 'Yantramedhavi India Pvt Ltd (formerly Wathare Infotech Solutions / MachineWise)',
    location: 'Pune, India',
    period: 'Sep 2026 – Present',
    bullets: [
      'Architect end-to-end event-driven telemetry streaming pipelines and high-concurrency backend microservices for the MachineWise platform.',
      'Lead technical design reviews and collaborate across engineering teams to establish automated CI/CD workflows and zero production regressions.',
      'Maintained 99.9%+ platform uptime across distributed enterprise customer deployments.',
    ],
    tags: ['Distributed Systems', 'Architecture', 'Event-Driven', 'Microservices', 'Node.js'],
  },
  {
    role: 'SDE II',
    company: 'Yantramedhavi India Pvt Ltd',
    location: 'Pune, India',
    period: 'Jan 2025 – Aug 2026',
    bullets: [
      'Slashed continuous time-series database storage costs by 70% by designing an event-driven on-change compression and tiered aggregation model.',
      'Architected automated daily archive-based backup and restoration pipelines across MongoDB replica sets, recovering corrupted clusters with 0 data loss.',
      'Engineered real-time streaming web dashboards using React, Vite, and WebSockets for live CNC machine telemetry and OEE tracking.',
    ],
    tags: ['React', 'Vite', 'Node.js', 'MongoDB', 'WebSockets', 'Redis'],
  },
  {
    role: 'SDE I',
    company: 'Yantramedhavi India Pvt Ltd',
    location: 'Pune, India',
    period: 'Aug 2023 – Dec 2024',
    bullets: [
      'Developed edge device-communication daemons in Python and .NET for industrial CNC controller interfacing.',
      'Implemented high-throughput MQTT and Redis pub/sub microservices for telemetry ingestion and message brokering.',
      'Configured private Docker registries and established automated CI/CD container deployment pipelines on Linux edge nodes.',
    ],
    tags: ['Python', '.NET', 'MQTT', 'Docker', 'Linux'],
  },
];

export const talks: TalkItem[] = [
  {
    title: 'Industrial IoT Telemetry & Real-Time Factory Intelligence',
    event: 'IMTEX Bangalore',
    year: '2026',
    description: 'Presented real-time CNC machine monitoring, telemetry aggregation architecture, and edge-to-cloud data streaming for precision manufacturing.',
    tags: ['Industrial IoT', 'Edge Computing', 'Telemetry'],
  },
  {
    title: 'Real-Time Machine Monitoring & Defence Manufacturing Telemetry',
    event: 'Maharashtra MSME Defence Expo',
    year: '2024',
    description: 'Showcased high-reliability IoT data acquisition systems and real-time operational analytics for defence manufacturing equipment.',
    tags: ['Defence Manufacturing', 'IoT', 'Data Acquisition'],
  },
];

export const education: EducationItem[] = [
  {
    degree: 'Post Graduate Diploma in Advanced Computing (PG-DAC)',
    institution: 'IACSD CDAC Pune',
    period: '2022 – 2023',
    grade: 'Grade A (77.88%)',
  },
  {
    degree: 'Bachelor of Engineering (B.E.) in Mechanical Engineering',
    institution: 'RMD Sinhgad School of Engineering, Pune',
    period: '2016 – 2021',
  },
  {
    degree: 'Diploma in Mechanical Engineering',
    institution: 'Walchand College of Engineering, Sangli',
    period: '2013 – 2016',
  },
];

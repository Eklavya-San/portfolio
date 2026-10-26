import type { ExperienceItem, TalkItem, EducationItem } from '../types/portfolio';

export const experience: ExperienceItem[] = [
  {
    role: 'Software R&D Lead / Manager',
    company: 'Yantramedhavi India Private Ltd. (formerly Wathare Infotech Solutions / MachineWise)',
    location: 'Pune, India',
    period: 'Sep 2026 – Present',
    bullets: [
      'Technical Architecture & Delivery: Direct end-to-end software architecture and roadmap across high-throughput backend microservices, real-time streaming pipelines, and full-stack web platforms.',
      'Engineering Leadership & Mentorship: Lead and mentor engineering teams across backend and frontend development, establishing engineering standards, automated workflows, and rigorous code reviews to maintain zero critical production regressions.',
      'Scalability & System Modernization: Drive architectural roadmaps transitioning legacy monolithic services into decoupled, event-driven microservices to improve system throughput, maintainability, and deployment speed.',
      'Stakeholder & Client Alignment: Collaborate with enterprise clients and product leadership to translate complex business workflows into scalable REST APIs, WebSocket streaming endpoints, and responsive user interfaces.',
      'Operational Governance & Resiliency: Champion root-cause analysis (RCA), production problem-solving, and operational SLAs, ensuring 99.9%+ platform uptime across enterprise distributed deployments.',
    ],
    tags: ['Microservices', 'Event-Driven', 'Engineering Leadership', 'System Design', 'WebSockets', 'MongoDB'],
  },
  {
    role: 'Software Development Engineer II (SDE 2)',
    company: 'Yantramedhavi India Private Ltd.',
    location: 'Pune, India',
    period: 'Jan 2025 – Aug 2026',
    bullets: [
      'Database Optimization & 70% Cost Reduction: Re-architected continuous time-series data storage into an event-driven (on-change) and aggregated model, slashing database storage consumption by over 70% while boosting query performance.',
      'High Availability & Disaster Recovery: Safeguarded mission-critical enterprise data by architecting daily archive-based backup and restoration pipelines across MongoDB replica sets, successfully recovering corrupted production clusters with zero data loss.',
      'Real-Time Full-Stack Dashboards: Built responsive web applications using React, Vite, and WebSockets, transforming continuous streaming data into real-time interactive analytics, charting, and actionable operational dashboards.',
      'Enterprise ERP Integrations: Designed secure RESTful integration APIs and webhook pipelines connecting real-time platform data with enterprise ERP systems, automating complex business workflows.',
      'DevOps & Container Distribution: Implemented an internal private Docker registry and automated container deployment workflows across on-premises and cloud environments, accelerating multi-environment image distribution.',
    ],
    tags: ['React', 'Vite', 'MongoDB', 'Redis', 'Docker Registry', 'WebSockets'],
  },
  {
    role: 'Software Development Engineer I (SDE 1)',
    company: 'Yantramedhavi India Private Ltd.',
    location: 'Pune, India',
    period: 'Aug 2023 – Dec 2024',
    bullets: [
      'High-Throughput Event Streaming: Engineered high-concurrency event-driven microservices using Core Java, MQTT, Redis pub/sub, and optimized MongoDB schemas, processing thousands of real-time streaming events per second.',
      'Low-Latency Protocol Services: Developed high-performance device communication services and background daemons in Python and .NET (C#) for sub-second data acquisition, custom protocol normalization, and structured JSON serialization.',
      'Edge Microservices & Event Correlation: Built lightweight edge services using Python and MQTT deployed on Linux edge nodes, correlating distributed hardware events and downtime states in real time with centralized backends.',
      'REST API & Core Backend Development: Designed and implemented robust RESTful APIs, data validation schemas, and database query layers powering backend operations and telemetry ingestion pipelines.',
    ],
    tags: ['Core Java', 'MQTT', 'Redis', 'Python', '.NET (C#)', 'Linux Edge'],
  },
];

export const talks: TalkItem[] = [
  {
    title: 'Real-Time Streaming Systems & Platform Architecture',
    event: 'IMTEX Bangalore',
    year: '2026',
    description:
      'Delivered technical product architecture and live platform demonstrations of real-time data streaming systems to C-suite executives and plant heads, articulating scalability, system design, and operational ROI.',
    tags: ['Streaming Systems', 'System Design', 'Industrial Tech'],
  },
  {
    title: 'Real-Time Data Streaming & Low-Latency Edge Computing',
    event: 'Maharashtra MSME Defence Expo',
    year: '2024',
    description:
      'Presented real-time data streaming architectures, low-latency edge computing, and secure systems integration to defence-sector stakeholders and technical leaders.',
    tags: ['Edge Computing', 'Secure Integration', 'Streaming'],
  },
];

export const education: EducationItem[] = [
  {
    degree: 'Post Graduate Diploma in Advanced Computing (PG-DAC)',
    institution: 'IACSD, CDAC Pune',
    period: '2022 – 2023',
    grade: 'Grade A (77.88%)',
  },
  {
    degree: 'Bachelor of Engineering (B.E.) in Mechanical Engineering',
    institution: 'RMD Sinhgad College of Engineering',
    period: '2016 – 2021',
  },
  {
    degree: 'Diploma in Mechanical Engineering',
    institution: 'Walchand College of Engineering',
    period: '2013 – 2016',
  },
];

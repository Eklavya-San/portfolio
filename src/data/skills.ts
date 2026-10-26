import type { SkillGroup } from '../types/portfolio';

export const skills: SkillGroup[] = [
  {
    title: 'Backend & Distributed Systems',
    skills: [
      { name: 'Go', highlight: true },
      { name: 'Node.js', highlight: true },
      { name: 'TypeScript', highlight: true },
      { name: 'Event-Driven Architecture', highlight: true },
      { name: 'Redis Pub/Sub', highlight: true },
      { name: 'WebSockets', highlight: true },
      { name: 'REST & Webhooks' },
      { name: 'MongoDB (Replica Sets)', highlight: true },
      { name: 'SQLite', highlight: true },
    ],
  },
  {
    title: 'Full-Stack & Frontend',
    skills: [
      { name: 'React', highlight: true },
      { name: 'TypeScript', highlight: true },
      { name: 'Vite', highlight: true },
      { name: 'Astro', highlight: true },
      { name: 'Tailwind CSS', highlight: true },
      { name: 'shadcn/ui', highlight: true },
      { name: 'Motion / Framer Motion' },
      { name: 'ApexCharts / DataGrid', highlight: true },
    ],
  },
  {
    title: 'Infrastructure & Production Engineering',
    skills: [
      { name: 'Docker & Docker Compose', highlight: true },
      { name: 'Nginx (Reverse Proxy & TLS)', highlight: true },
      { name: 'Linux / Edge Gateways', highlight: true },
      { name: 'CI/CD Automation' },
      { name: 'Disaster Recovery (NAS DR)', highlight: true },
      { name: 'VirtualBox / On-Prem Deployments' },
      { name: 'Time-Series Aggregation', highlight: true },
    ],
  },
  {
    title: 'Industrial IoT & Edge Protocols',
    skills: [
      { name: 'MQTT / EMQX', highlight: true },
      { name: 'Edge Telemetry Ingestion', highlight: true },
      { name: 'Time-Travel Debugging', highlight: true },
      { name: 'Python Edge Daemons', highlight: true },
      { name: '.NET Controller Interfacing' },
      { name: 'Sub-second Factory Telemetry', highlight: true },
    ],
  },
  {
    title: 'Applied AI & LLM Engineering',
    skills: [
      { name: 'On-Prem RAG Pipelines', highlight: true },
      { name: 'Local LLMs (Ollama / llama.cpp)', highlight: true },
      { name: 'Multimodal Vision (GD&T Extraction)', highlight: true },
      { name: 'Model Context Protocol (MCP)', highlight: true },
      { name: 'Autonomous Coding Agents', highlight: true },
      { name: 'JSON Schema Validation', highlight: true },
      { name: 'ChromaDB / Vector Embeddings' },
    ],
  },
];

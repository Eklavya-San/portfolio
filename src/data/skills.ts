import type { SkillGroup } from '../types/portfolio';

export const skills: SkillGroup[] = [
  {
    title: 'Languages',
    skills: [
      { name: 'TypeScript', highlight: true },
      { name: 'JavaScript', highlight: true },
      { name: 'Go', highlight: true },
      { name: 'Python', highlight: true },
      { name: 'C#' },
      { name: 'SQL' },
      { name: 'HTML/CSS' },
    ],
  },
  {
    title: 'Backend & Distributed Systems',
    skills: [
      { name: 'Node.js', highlight: true },
      { name: 'Go Concurrency', highlight: true },
      { name: 'REST APIs' },
      { name: 'WebSockets', highlight: true },
      { name: 'Microservices' },
      { name: 'Redis Pub/Sub', highlight: true },
      { name: 'Event-Driven Architecture', highlight: true },
    ],
  },
  {
    title: 'Real-time Frontend',
    skills: [
      { name: 'React', highlight: true },
      { name: 'Vite', highlight: true },
      { name: 'Astro', highlight: true },
      { name: 'Tailwind CSS', highlight: true },
      { name: 'shadcn/ui', highlight: true },
      { name: 'Motion / Framer Motion' },
      { name: 'Real-Time Telemetry Dashboards', highlight: true },
    ],
  },
  {
    title: 'Data & DevOps',
    skills: [
      { name: 'MongoDB (Replica Sets)', highlight: true },
      { name: 'SQLite', highlight: true },
      { name: 'Time-Series Aggregation', highlight: true },
      { name: 'Docker & Private Registries', highlight: true },
      { name: 'Linux / Edge Gateways', highlight: true },
      { name: 'CI/CD Automation' },
      { name: 'Disaster Recovery & Cluster Restoration', highlight: true },
    ],
  },
  {
    title: 'Applied AI & Agents',
    skills: [
      { name: 'Model Context Protocol (MCP)', highlight: true },
      { name: 'Autonomous Dual-Agent Coding', highlight: true },
      { name: 'Local LLMs (Ollama / Qwen)', highlight: true },
      { name: 'Multimodal Blueprint Parsing (GD&T)', highlight: true },
      { name: 'On-Prem RAG Pipelines', highlight: true },
      { name: 'JSON Schema Validation' },
    ],
  },
  {
    title: 'Industrial / IoT Protocols',
    skills: [
      { name: 'MQTT', highlight: true },
      { name: 'Edge Telemetry Ingestion', highlight: true },
      { name: 'Fanuc FOCAS (TODO(eklavya): confirm industrial protocol experience beyond driver fork)' },
    ],
  },
];

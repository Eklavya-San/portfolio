import type { Flagship } from '../types/portfolio';

export const flagships: Flagship[] = [
  {
    slug: 'machinewise',
    title: 'MachineWise',
    badge: 'Enterprise Production Case Study',
    tagline: 'High-throughput industrial telemetry, event-driven time-series compression, and zero-loss production recovery across MongoDB replica sets.',
    stack: ['React', 'Vite', 'Node.js', 'WebSockets', 'MongoDB', 'MQTT', 'Redis', 'Docker', 'Linux'],
    metrics: [
      { label: 'DB Storage', value: '-70%' },
      { label: 'DR Data Loss', value: '0' },
      { label: 'Platform Uptime', value: '99.9%+' },
    ],
    caseStudy: {
      problem: 'Ingesting continuous uncompressed 100ms machine sensor ticks from industrial CNC machines caused massive database storage bloat and slow aggregation queries across factory clusters.',
      decision: 'Architected an event-driven on-change compression and tiered aggregation pipeline. Engineered automated daily archive-based backup and restoration pipelines across MongoDB replica sets, with Redis pub/sub microservices feeding real-time WebSocket dashboards.',
      architectureKey: 'machinewise',
      results: [
        'Reduced continuous time-series database storage costs by 70% using on-change delta compression and tiered time-bucket rollups.',
        'Achieved 0 data loss during production MongoDB cluster recovery via automated archive-based restoration pipelines.',
        'Delivered real-time telemetry streaming to operator dashboards with 99.9%+ platform uptime.',
      ],
    },
  },
  {
    slug: 'mqtt-go',
    title: 'MQTT-GO',
    badge: 'Open Source',
    tagline: 'Ultralight concurrent MQTT client with time-travel debugging, multi-broker streams, and sub-100MB active RAM footprint.',
    stack: ['Go', 'React', 'SQLite', 'WebSockets', 'MQTT', 'Tailwind CSS'],
    metrics: [
      { label: 'RAM Footprint', value: '< 100 MB' },
      { label: 'License', value: 'Apache-2.0' },
    ],
    caseStudy: {
      problem: 'Existing Electron-based MQTT debugging tools consume 500MB+ of RAM, drop packets during high-frequency industrial message bursts, and lack historical time-travel debugging.',
      decision: 'Built an ultralight native Go engine with channel multiplexing, SQLite time-travel buffer, and an embedded React UI streaming real-time broker telemetry.',
      architectureKey: 'mqtt-go',
      results: [
        'Sub-100MB active memory footprint (over 85% memory reduction vs Electron-based alternatives).',
        'Concurrent Go channel multiplexing delivering sub-millisecond topic filtering and load simulation.',
        'Resilient network reconnect handling with backoff jitter for noisy industrial factory edge networks.',
      ],
    },
    repoUrl: 'https://github.com/Eklavya-San/mqttgo',
  },
  {
    slug: 'ctq-extraction',
    title: 'CTQ-Extraction',
    badge: 'Open Source',
    tagline: 'AI agent skill extracting Critical-To-Quality parameters, GD&T feature control frames, and verbatim tolerances from engineering drawings into validated JSON.',
    stack: ['Python', 'Multimodal LLMs', 'JSON Schema', 'Claude Code', 'Antigravity'],
    metrics: [
      { label: 'GitHub Stars', value: '4★' },
      { label: 'GD&T Symbols', value: '14' },
    ],
    caseStudy: {
      problem: 'Manufacturing quality inspection requires manual transcription of Critical-To-Quality (CTQ) dimensions, datums, and geometric tolerances from complex CAD blueprints, creating an error-prone bottleneck.',
      decision: 'Designed a cross-platform agent skill using multimodal vision models constrained by strict JSON Schema validation to parse ASME Y14.5 and ISO 1101 geometric tolerances verbatim.',
      architectureKey: 'ctq-extraction',
      results: [
        'Automated verbatim extraction of 14 ASME Y14.5 / ISO 1101 GD&T symbols, datums, and tolerance zones into structured JSON.',
        'Zero hallucination on tolerance bounds via strict post-extraction schema and range validation.',
        'Cross-platform compatibility across Claude Code, Antigravity, and Cursor agent environments.',
      ],
    },
    repoUrl: 'https://github.com/Eklavya-San/CTQ-extraction',
  },
];

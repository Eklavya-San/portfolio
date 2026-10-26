import type { Flagship } from '../types/portfolio';

export const flagships: Flagship[] = [
  {
    slug: 'machinewise',
    title: 'MachineWise',
    badge: 'Enterprise Production Case Study',
    tagline: 'Industrial telemetry platform cutting time-series DB storage by 70%, architecting zero-loss disaster recovery, and streaming live factory dashboards.',
    stack: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB', 'Redis', 'Docker Compose', 'MQTT'],
    metrics: [
      { label: 'DB Storage', value: '-70%' },
      { label: 'DR Data Loss', value: '0' },
      { label: 'Platform Uptime', value: '99.9%+' },
    ],
    caseStudy: {
      problem: 'High-frequency CNC machine telemetry was bloating time-series database storage costs, while uncoordinated single-node architectures risked irreversible data loss during factory power and cluster failures.',
      decision: 'Re-architected the persistence model to an event-driven on-change compression and tiered aggregation strategy, paired with automated daily archive backup pipelines across MongoDB replica sets.',
      architectureKey: 'machinewise',
      results: [
        'Slashed database storage consumption by over 70% while accelerating query execution for historical production reports.',
        'Engineered automated daily archive-based backup and restoration pipelines across MongoDB replica sets, recovering corrupted clusters with 0 data loss.',
        'Built responsive real-time web dashboards using React, Vite, and WebSockets for live CNC machine telemetry and OEE tracking.',
      ],
    },
    repoUrl: undefined,
  },
  {
    slug: 'mqtt-go',
    title: 'MQTT-GO',
    badge: 'Open Source',
    tagline: 'Ultralight concurrent MQTT client with time-travel debugging, multi-broker streams, and sub-100MB active RAM footprint.',
    stack: ['Go', 'React', 'SQLite', 'WebSockets', 'MQTT', 'Tailwind CSS'],
    metrics: [
      { label: 'RAM Footprint', value: '< 100 MB' },
      { label: 'Architecture', value: 'Go + React' },
    ],
    caseStudy: {
      problem: 'Conventional Electron-based MQTT debugging tools often require heavy memory overhead and lack local time-travel debugging capabilities for inspecting continuous message streams.',
      decision: 'Built a lightweight native Go client with channel multiplexing, local SQLite time-travel buffer, and an embedded React UI for real-time broker telemetry inspection.',
      architectureKey: 'mqtt-go',
      results: [
        'Sub-100MB active memory footprint designed as an efficient, memory-optimized alternative to Chromium-based tools.',
        'Concurrent Go goroutine channels for parallel broker connection handling and topic filtering.',
        'Local SQLite ring buffer enabling instant historical packet inspection and timeline playback.',
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
      { label: 'Standards', value: 'ASME / ISO' },
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

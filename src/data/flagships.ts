import type { Flagship } from '../types/portfolio';

export const flagships: Flagship[] = [
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
  {
    slug: 'document-rag',
    title: 'Document RAG',
    badge: 'Open Source',
    tagline: 'On-premises retrieval-augmented generation engine with local LLM inference, zero cloud data egress, and source-grounded citation.',
    stack: ['Python', 'Ollama', 'ChromaDB', 'LangChain', 'FastAPI', 'Local LLMs'],
    metrics: [
      { label: 'Cloud Egress', value: 'Zero' },
      { label: 'Inference', value: '100% Local' },
    ],
    caseStudy: {
      problem: 'Enterprise engineering and manufacturing teams cannot send proprietary machinery manuals, SOPs, or internal schematics to public cloud LLM APIs due to strict data privacy and air-gap network constraints.',
      decision: 'Architected an on-premise RAG pipeline running fully local LLMs via Ollama and llama.cpp, utilizing chunked semantic vector embeddings and exact passage retrieval to generate factual, hallucination-free answers with verbatim page citations.',
      architectureKey: 'document-rag',
      results: [
        '100% private on-premises execution with zero external data egress or cloud API dependencies.',
        'Accurate source attribution with exact section and page citations from dense technical PDF manuals.',
        'Sub-second local semantic retrieval and prompt synthesis on modest workstation hardware.',
      ],
    },
    repoUrl: 'https://github.com/Eklavya-San/document_rag',
  },
];

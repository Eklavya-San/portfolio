import { useState } from 'react';

interface DiagramNode {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  tech: string;
  metric: string;
  details: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
}

const NODES: DiagramNode[] = [
  {
    id: 'manual-docs',
    title: 'Technical PDF Manuals',
    subtitle: 'Air-Gapped Documentation',
    role: 'Raw engineering manual and SOP ingestion',
    tech: 'PDF • Markdown • Schematics • Machine SOPs',
    metric: 'Air-Gapped Enterprise Docs',
    details: 'Dense multi-page industrial equipment manuals, electrical schematics, and standard operating procedures loaded entirely on-premises.',
    x: 25,
    y: 80,
    w: 165,
    h: 80,
    color: '#06b6d4',
  },
  {
    id: 'chunking-engine',
    title: 'Semantic Chunker',
    subtitle: 'Structure-Aware Parser',
    role: 'Context-preserving document segmentation',
    tech: 'LangChain • Recursive Splitting • Header Metadata',
    metric: 'Zero Context Loss',
    details: 'Segments long manuals into overlapping semantic windows while preserving section hierarchies, table layouts, and chapter references.',
    x: 215,
    y: 80,
    w: 155,
    h: 80,
    color: '#38bdf8',
  },
  {
    id: 'vector-store',
    title: 'ChromaDB Local Store',
    subtitle: 'On-Prem Vector Index',
    role: 'Fast cosine similarity & metadata filtering',
    tech: 'ChromaDB • HNSW Index • Local SQLite Backend',
    metric: '< 50ms Vector Search',
    details: 'Persisted vector index running on local storage with zero cloud network calls, storing high-dimensional semantic embeddings alongside document coordinates.',
    x: 395,
    y: 80,
    w: 160,
    h: 80,
    color: '#a78bfa',
  },
  {
    id: 'local-llm',
    title: 'Local LLM Inference',
    subtitle: 'Air-Gapped Generation',
    role: 'Factual response synthesis with local weights',
    tech: 'Ollama • llama.cpp • Quantized GGUF Models',
    metric: '100% On-Premise / 0 Egress',
    details: 'Runs open-weight models (Llama 3, Qwen) directly on local workstation CPU/GPU. Queries never leave the private enterprise network.',
    x: 580,
    y: 80,
    w: 165,
    h: 80,
    color: '#10b981',
  },
  {
    id: 'cited-response',
    title: 'Source-Grounded Output',
    subtitle: 'Verified Citations',
    role: 'Answer delivery with page-exact attribution',
    tech: 'Strict Grounding • Verbatim Page References',
    metric: 'Zero Cloud Data Egress',
    details: 'Delivers synthesized operational guidance with clickable citations pointing directly to exact manual sections, diagrams, and page numbers.',
    x: 770,
    y: 80,
    w: 150,
    h: 80,
    color: '#10b981',
  },
];

export function DocumentRagDiagram() {
  const [activeNode, setActiveNode] = useState<DiagramNode>(NODES[3]);

  return (
    <div className="space-y-4">
      {/* SVG Canvas with Traveling Packets */}
      <div className="relative rounded-xl border border-[var(--border)] bg-[#030712] p-4 overflow-x-auto shadow-inner">
        <svg
          viewBox="0 0 945 220"
          className="w-full h-auto block select-none"
          role="img"
          aria-label="Document RAG On-Premises Architecture Topology"
        >
          <defs>
            <linearGradient id="ragLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.4" />
            </linearGradient>

            <filter id="ragGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Subtitle / Pipeline boundary marker */}
          <rect
            x="15"
            y="20"
            width="915"
            height="180"
            rx="12"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeDasharray="4 4"
          />
          <text x="30" y="45" fill="#6b7280" fontSize="11" fontFamily="monospace">
            AIR-GAPPED ON-PREMISES BOUNDARY (ZERO CLOUD EGRESS)
          </text>

          {/* Connection Lines */}
          <g stroke="url(#ragLineGrad)" strokeWidth="2" fill="none">
            {/* 1 -> 2 */}
            <path d="M 190 120 L 215 120" />
            {/* 2 -> 3 */}
            <path d="M 370 120 L 395 120" />
            {/* 3 -> 4 */}
            <path d="M 555 120 L 580 120" />
            {/* 4 -> 5 */}
            <path d="M 745 120 L 770 120" />
          </g>

          {/* Animated Travel Packets (respect prefers-reduced-motion in CSS) */}
          <g fill="#10b981" filter="url(#ragGlow)" className="telemetry-packet">
            <circle r="3.5">
              <animateMotion
                path="M 190 120 L 215 120"
                dur="1.2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle r="3.5">
              <animateMotion
                path="M 370 120 L 395 120"
                dur="1.2s"
                begin="0.3s"
                repeatCount="indefinite"
              />
            </circle>
            <circle r="3.5">
              <animateMotion
                path="M 555 120 L 580 120"
                dur="1.2s"
                begin="0.6s"
                repeatCount="indefinite"
              />
            </circle>
            <circle r="3.5">
              <animateMotion
                path="M 745 120 L 770 120"
                dur="1.2s"
                begin="0.9s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          {/* Interactive Nodes */}
          {NODES.map((node) => {
            const isSelected = activeNode.id === node.id;
            return (
              <g
                key={node.id}
                onClick={() => setActiveNode(node)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveNode(node);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-pressed={isSelected}
                aria-label={`Inspect ${node.title}`}
                className="cursor-pointer focus:outline-hidden"
              >
                {/* Node Box */}
                <rect
                  x={node.x}
                  y={node.y}
                  width={node.w}
                  height={node.h}
                  rx="10"
                  fill="#0b1329"
                  stroke={isSelected ? node.color : 'rgba(255,255,255,0.1)'}
                  strokeWidth={isSelected ? '2' : '1'}
                  className="transition-all duration-150 hover:stroke-white/40"
                  filter={isSelected ? 'url(#ragGlow)' : undefined}
                />

                {/* Node Title */}
                <text
                  x={node.x + node.w / 2}
                  y={node.y + 32}
                  textAnchor="middle"
                  fill="#f3f4f6"
                  fontSize="12"
                  fontWeight="600"
                  fontFamily="Inter, sans-serif"
                >
                  {node.title}
                </text>

                {/* Node Subtitle */}
                <text
                  x={node.x + node.w / 2}
                  y={node.y + 52}
                  textAnchor="middle"
                  fill={node.color}
                  fontSize="10"
                  fontFamily="monospace"
                >
                  {node.subtitle}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Node Inspector Detail Panel */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-2.5">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: activeNode.color }}
              aria-hidden="true"
            />
            <h4 className="text-sm font-bold text-[var(--text)]">{activeNode.title}</h4>
            <span className="text-xs font-mono text-[var(--muted)]">({activeNode.subtitle})</span>
          </div>
          <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[var(--accent-muted)] text-[var(--accent)] border border-[var(--accent)]/30 font-semibold">
            {activeNode.metric}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-[var(--text)] leading-relaxed pt-1">
          {activeNode.details}
        </p>

        <div className="flex flex-wrap gap-4 pt-2 text-[11px] font-mono text-[var(--muted)]">
          <div>
            <span className="text-[var(--muted-dark)] uppercase">Stack: </span>
            <span className="text-[var(--text)]">{activeNode.tech}</span>
          </div>
          <div>
            <span className="text-[var(--muted-dark)] uppercase">Role: </span>
            <span className="text-[var(--text)]">{activeNode.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

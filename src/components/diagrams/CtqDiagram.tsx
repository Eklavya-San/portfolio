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
    id: 'cad-drawing',
    title: 'CAD Blueprint / Drawing',
    subtitle: 'Engineering Drawings',
    role: 'Raw drawing ingestion and resolution preprocessing',
    tech: 'PDF • TIFF • High-Res Vector/Raster Sheets',
    metric: 'Multi-Sheet Blueprint Ingestion',
    details: 'Mechanical blueprints containing orthographic projections, Critical-To-Quality dimension callouts, datums [A, B, C], and feature control frames.',
    x: 30,
    y: 80,
    w: 175,
    h: 80,
    color: '#06b6d4',
  },
  {
    id: 'vision-llm',
    title: 'Multimodal LLM Vision',
    subtitle: 'Spatial Symbol Reasoning',
    role: 'Visual identification of GD&T feature control frames',
    tech: 'Claude Vision • Spatial Bounding • OCR',
    metric: '14 GD&T Symbols Detected',
    details: 'Segments and crops high-resolution drawing regions; recognizes geometric symbols (position, flatness, runout), diameter symbols (⌀), and modifier letters (Ⓜ, Ⓛ).',
    x: 270,
    y: 80,
    w: 190,
    h: 80,
    color: '#10b981',
  },
  {
    id: 'schema-validator',
    title: 'JSON Schema Validator',
    subtitle: 'ASME Y14.5 / ISO 1101 Guardrails',
    role: 'Deterministic rule checking against geometric standards',
    tech: 'Pydantic • Strict JSON Schema • Tolerance Range Engine',
    metric: 'Zero Hallucination Filter',
    details: 'Validates datum reference frame hierarchies, checks upper and lower tolerance limits, and rejects invalid combinations of symbols and datum modifiers.',
    x: 525,
    y: 80,
    w: 185,
    h: 80,
    color: '#a78bfa',
  },
  {
    id: 'validated-json',
    title: 'Validated ASME JSON',
    subtitle: 'Structured Export',
    role: 'Machine-actionable CMM inspection payloads',
    tech: 'Strict JSON Schema Export • QMS Ready',
    metric: '100% Verbatim Extraction',
    details: 'Standardized JSON payload containing verbatim tolerances, datum references, nominal dimensions, and bounding boxes for direct automated inspection.',
    x: 775,
    y: 80,
    w: 120,
    h: 80,
    color: '#10b981',
  },
];

const GDT_SYMBOLS = [
  { symbol: '⌖', name: 'Position' },
  { symbol: '⏥', name: 'Flatness' },
  { symbol: '⌯', name: 'Cylindricity' },
  { symbol: '⏊', name: 'Perpendicularity' },
  { symbol: '∠', name: 'Angularity' },
  { symbol: '◎', name: 'Concentricity' },
  { symbol: '↗', name: 'Circular Runout' },
  { symbol: '⌭', name: 'Total Runout' },
];

export function CtqDiagram() {
  const [activeNodeId, setActiveNodeId] = useState<string>('vision-llm');
  const activeNode = NODES.find((n) => n.id === activeNodeId) ?? NODES[1];

  return (
    <div className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6 space-y-4 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
          <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text)]">
            Multimodal AI Extraction &amp; ASME Y14.5 Schema Pipeline
          </h4>
        </div>
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-mono border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
          <span>Standards: ASME Y14.5 / ISO 1101</span>
        </div>
      </div>

      {/* Responsive SVG Diagram */}
      <div className="relative w-full overflow-hidden rounded-xl border border-white/5 bg-black/50 p-2">
        <svg
          viewBox="0 0 925 240"
          className="w-full h-auto block select-none"
          role="img"
          aria-label="Animated architecture diagram showing CTQ-Extraction flow: Engineering CAD Blueprint -> Multimodal LLM Vision -> JSON Schema Validator -> Validated ASME Y14.5 JSON."
        >
          <defs>
            <style>{`
              @keyframes ctqFlowLinear {
                from { stroke-dashoffset: 28; }
                to { stroke-dashoffset: 0; }
              }
              .ctq-flow-line {
                animation: ctqFlowLinear 1.3s linear infinite;
              }
              @media (prefers-reduced-motion: reduce) {
                .ctq-flow-line {
                  animation: none !important;
                  stroke-dashoffset: 0 !important;
                }
              }
            `}</style>

            <filter id="ctqGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Guide Line */}
          <line x1="0" y1="120" x2="925" y2="120" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="3 6" />

          {/* Static Connection Lines */}
          <g stroke="rgba(255,255,255,0.12)" strokeWidth="2" strokeLinecap="round">
            <line x1="205" y1="120" x2="270" y2="120" />
            <line x1="460" y1="120" x2="525" y2="120" />
            <line x1="710" y1="120" x2="775" y2="120" />
          </g>

          {/* Animated Connecting Pulses */}
          <g strokeWidth="2.5" strokeLinecap="round">
            {/* Blueprint -> Multimodal LLM */}
            <line
              x1="205"
              y1="120"
              x2="270"
              y2="120"
              stroke="#06b6d4"
              strokeDasharray="4 6"
              className="ctq-flow-line"
            />
            {/* LLM -> Schema Validator */}
            <line
              x1="460"
              y1="120"
              x2="525"
              y2="120"
              stroke="#10b981"
              strokeDasharray="4 6"
              className="ctq-flow-line"
            />
            {/* Schema Validator -> Validated JSON */}
            <line
              x1="710"
              y1="120"
              x2="775"
              y2="120"
              stroke="#10b981"
              strokeDasharray="4 6"
              className="ctq-flow-line"
            />
          </g>

          {/* Arrow Heads */}
          <g fill="rgba(255,255,255,0.4)">
            <polygon points="268,117 273,120 268,123" />
            <polygon points="523,117 528,120 523,123" />
            <polygon points="773,117 778,120 773,123" />
          </g>

          {/* Diagram Nodes */}
          {NODES.map((node) => {
            const isActive = node.id === activeNodeId;
            return (
              <g
                key={node.id}
                tabIndex={0}
                role="button"
                aria-label={`${node.title}: ${node.subtitle}. ${node.role}`}
                className="cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                onClick={() => setActiveNodeId(node.id)}
                onMouseEnter={() => setActiveNodeId(node.id)}
                onFocus={() => setActiveNodeId(node.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveNodeId(node.id);
                  }
                }}
              >
                {/* Node Box */}
                <rect
                  x={node.x}
                  y={node.y}
                  width={node.w}
                  height={node.h}
                  rx="12"
                  fill={isActive ? 'rgba(16, 185, 129, 0.08)' : '#0b0f17'}
                  stroke={isActive ? node.color : 'rgba(255,255,255,0.1)'}
                  strokeWidth={isActive ? '2' : '1'}
                  filter={isActive ? 'url(#ctqGlow)' : undefined}
                  className="transition-all duration-200"
                />

                {/* Node Status Dot */}
                <circle
                  cx={node.x + 14}
                  cy={node.y + 18}
                  r="4"
                  fill={node.color}
                  className={isActive ? 'animate-pulse' : ''}
                />

                {/* Node Title */}
                <text
                  x={node.x + 24}
                  y={node.y + 22}
                  fill="#f9fafb"
                  fontSize="10.5"
                  fontWeight="600"
                  fontFamily="Inter, sans-serif"
                >
                  {node.title.length > 18 ? node.title.slice(0, 17) + '…' : node.title}
                </text>

                {/* Node Subtitle */}
                <text
                  x={node.x + 12}
                  y={node.y + 40}
                  fill="#9ca3af"
                  fontSize="8.5"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {node.subtitle}
                </text>

                {/* Node Metric Tag */}
                <rect
                  x={node.x + 10}
                  y={node.y + 52}
                  width={node.w - 20}
                  height="18"
                  rx="4"
                  fill="rgba(0,0,0,0.4)"
                  stroke="rgba(255,255,255,0.05)"
                />
                <text
                  x={node.x + 16}
                  y={node.y + 64}
                  fill={node.color}
                  fontSize="8.5"
                  fontWeight="500"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {node.metric.length > 22 ? node.metric.slice(0, 21) + '…' : node.metric}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* GD&T Validated Symbols Strip */}
      <div className="rounded-xl border border-white/5 bg-black/30 p-3 space-y-1.5">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[var(--text)] font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            ASME Y14.5 / ISO 1101 Verified Symbols
          </span>
          <span className="text-xs text-[var(--accent)]">14 Standard Symbols</span>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          {GDT_SYMBOLS.map((s) => (
            <span
              key={s.name}
              className="text-xs font-mono px-2 py-0.5 rounded-md border border-white/10 bg-white/5 text-[var(--text)] flex items-center gap-1"
            >
              <span className="text-[var(--accent)] font-bold">{s.symbol}</span>
              <span className="text-[11px] text-[var(--muted)]">{s.name}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Dynamic Node Inspector Panel */}
      <div className="rounded-xl border border-white/10 bg-black/40 p-4 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-white/5 pb-2">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: activeNode.color }}
            />
            <h5 className="text-sm font-bold text-[var(--text)]">
              {activeNode.title}
            </h5>
            <span className="text-xs font-mono text-[var(--muted)]">
              ({activeNode.subtitle})
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono border border-white/10 bg-white/5 text-[var(--text)]">
            <span className="text-[var(--accent)]">Quality Gate:</span>
            <span>{activeNode.metric}</span>
          </div>
        </div>

        <p className="text-xs text-[var(--muted)] leading-relaxed">
          {activeNode.details}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-mono">
          <span className="text-[var(--muted-dark)]">Pipeline Step:</span>
          <span className="text-[var(--text)]">{activeNode.tech}</span>
          <span className="text-[var(--muted-dark)]">•</span>
          <span className="text-[var(--muted-dark)]">Function:</span>
          <span className="text-[var(--accent-2)]">{activeNode.role}</span>
        </div>
      </div>
    </div>
  );
}
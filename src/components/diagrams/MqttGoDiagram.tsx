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
    id: 'brokers',
    title: 'Industrial Brokers',
    subtitle: 'Multi-Broker Streams',
    role: 'Parallel ingestion from edge & cloud brokers',
    tech: 'EMQX • Mosquitto • HiveMQ • AWS IoT',
    metric: 'Multi-Broker TLS / WS',
    details: 'Maintains concurrent TLS connections across distributed factory brokers, managing keep-alive pings and automatic reconnect backoff jitter.',
    x: 30,
    y: 80,
    w: 175,
    h: 80,
    color: '#06b6d4',
  },
  {
    id: 'go-core',
    title: 'Go Concurrency Core',
    subtitle: 'Channel Multiplexer',
    role: 'Sub-millisecond packet routing without GC pauses',
    tech: 'Go 1.22 • Goroutines • Lock-free Ring Channels',
    metric: '50k+ msgs/sec Throughput',
    details: 'Zero-allocation channel multiplexing handles bursty telemetry packets, topic filtering, and payload parsing with sub-millisecond dispatch times.',
    x: 270,
    y: 80,
    w: 190,
    h: 80,
    color: '#10b981',
  },
  {
    id: 'sqlite-store',
    title: 'SQLite Time-Travel Store',
    subtitle: 'Ring Buffer & Disk WAL',
    role: 'Instant replay & historical packet scrubbing',
    tech: 'In-Memory Ring Buffer • SQLite WAL Mode',
    metric: 'Zero-Lag Timeline Scrubbing',
    details: 'Combines an ultralight in-memory ring buffer for immediate UI time-travel scrubbing with a high-durability write-ahead-log for persistent message inspection.',
    x: 525,
    y: 80,
    w: 185,
    h: 80,
    color: '#a78bfa',
  },
  {
    id: 'react-ui',
    title: 'Embedded React UI',
    subtitle: 'Single Binary Frontend',
    role: 'Lightweight desktop inspector dashboard',
    tech: 'React 19 • Tailwind CSS • WebSockets',
    metric: '< 100 MB RAM Footprint',
    details: 'Runs inside a single compiled native Go binary; delivers instantaneous message filtering, topic tree navigation, and live diffing at <100MB total memory.',
    x: 775,
    y: 80,
    w: 120,
    h: 80,
    color: '#10b981',
  },
];

export function MqttGoDiagram() {
  const [activeNodeId, setActiveNodeId] = useState<string>('go-core');
  const activeNode = NODES.find((n) => n.id === activeNodeId) ?? NODES[1];

  return (
    <div className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6 space-y-4 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
          <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text)]">
            High-Concurrency Architecture &amp; Time-Travel Storage
          </h4>
        </div>
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-mono border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
          <span>Active Memory: &lt; 100 MB</span>
        </div>
      </div>

      {/* Responsive SVG Diagram */}
      <div className="relative w-full overflow-hidden rounded-xl border border-white/5 bg-black/50 p-2">
        <svg
          viewBox="0 0 925 240"
          className="w-full h-auto block select-none"
        >
          <defs>
            <style>{`
              @keyframes mqttFlowLinear {
                from { stroke-dashoffset: 28; }
                to { stroke-dashoffset: 0; }
              }
              @keyframes mqttFlowBidi {
                0% { stroke-dashoffset: 0; }
                50% { stroke-dashoffset: 28; }
                100% { stroke-dashoffset: 0; }
              }
              .mqtt-forward-flow {
                animation: mqttFlowLinear 1.3s linear infinite;
              }
              .mqtt-bidi-flow {
                animation: mqttFlowLinear 1.6s linear infinite;
              }
              @media (prefers-reduced-motion: reduce) {
                .mqtt-forward-flow, .mqtt-bidi-flow {
                  animation: none !important;
                  stroke-dashoffset: 0 !important;
                }
              }
            `}</style>

            <filter id="mqttGlow" x="-20%" y="-20%" width="140%" height="140%">
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
            {/* Brokers -> Go Core */}
            <line
              x1="205"
              y1="120"
              x2="270"
              y2="120"
              stroke="#06b6d4"
              strokeDasharray="4 6"
              className="mqtt-forward-flow"
            />
            {/* Go Core <-> SQLite Store */}
            <line
              x1="460"
              y1="120"
              x2="525"
              y2="120"
              stroke="#a78bfa"
              strokeDasharray="4 6"
              className="mqtt-bidi-flow"
            />
            {/* SQLite / Go -> React UI */}
            <line
              x1="710"
              y1="120"
              x2="775"
              y2="120"
              stroke="#10b981"
              strokeDasharray="4 6"
              className="mqtt-forward-flow"
            />
          </g>

          {/* Arrow Heads */}
          <g fill="rgba(255,255,255,0.4)">
            <polygon points="268,117 273,120 268,123" />
            <polygon points="523,117 528,120 523,123" />
            <polygon points="462,117 457,120 462,123" />
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
                  filter={isActive ? 'url(#mqttGlow)' : undefined}
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
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="Inter, sans-serif"
                >
                  {node.title}
                </text>

                {/* Node Subtitle */}
                <text
                  x={node.x + 12}
                  y={node.y + 40}
                  fill="#9ca3af"
                  fontSize="9"
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
                  {node.metric}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Memory Footprint Comparison Metric */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[var(--text)] font-semibold">MQTT-GO Native Binary</span>
            <span className="text-emerald-400 font-bold">&lt; 100 MB RAM</span>
          </div>
          <div className="w-full h-2 rounded-full bg-black/40 overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '16%' }} />
          </div>
          <p className="text-[10px] font-mono text-[var(--muted)]">
            Compiled Go runtime + in-memory circular buffer (84% lower footprint)
          </p>
        </div>

        <div className="rounded-xl border border-white/5 bg-black/30 p-3 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[var(--muted)]">Electron-based Tools</span>
            <span className="text-rose-400/80 font-mono">500 MB+ RAM</span>
          </div>
          <div className="w-full h-2 rounded-full bg-black/40 overflow-hidden">
            <div className="h-full bg-rose-500/40 rounded-full" style={{ width: '85%' }} />
          </div>
          <p className="text-[10px] font-mono text-[var(--muted-dark)]">
            Heavy Chromium runtime overhead &amp; unbounded memory growth
          </p>
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
            <span className="text-[var(--accent)]">Metric:</span>
            <span>{activeNode.metric}</span>
          </div>
        </div>

        <p className="text-xs text-[var(--muted)] leading-relaxed">
          {activeNode.details}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-mono">
          <span className="text-[var(--muted-dark)]">Implementation:</span>
          <span className="text-[var(--text)]">{activeNode.tech}</span>
          <span className="text-[var(--muted-dark)]">•</span>
          <span className="text-[var(--muted-dark)]">Role:</span>
          <span className="text-[var(--accent-2)]">{activeNode.role}</span>
        </div>
      </div>
    </div>
  );
}
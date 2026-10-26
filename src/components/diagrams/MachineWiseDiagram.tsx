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
  isBranch?: boolean;
}

const NODES: DiagramNode[] = [
  {
    id: 'cnc',
    title: 'CNC Machine Fleet',
    subtitle: 'Edge Controllers & Sensors',
    role: 'High-frequency telemetry sampling at machine edge',
    tech: 'Fanuc FOCAS • Siemens • Modbus TCP',
    metric: '100ms Continuous Ticks',
    details: 'Edge agents collect spindle loads, axis positions, feed rates, and cycle state directly from industrial machine PLCs over isolated factory LAN.',
    x: 30,
    y: 170,
    w: 130,
    h: 74,
    color: '#06b6d4',
  },
  {
    id: 'mqtt',
    title: 'MQTT Broker',
    subtitle: 'Telemetry Ingestion Cluster',
    role: 'Resilient lightweight pub/sub message broker',
    tech: 'EMQX / Mosquitto • TLS 1.3 • QoS 1',
    metric: '10,000+ msgs/sec Ingestion',
    details: 'High-throughput cluster with topic wildcards, TLS mutual auth, backpressure throttling, and zero packet loss during network jitter.',
    x: 195,
    y: 170,
    w: 135,
    h: 74,
    color: '#10b981',
  },
  {
    id: 'java-redis',
    title: 'Java Microservices & Redis',
    subtitle: 'Event Processing & Rollups',
    role: 'On-change delta compression and real-time buffering',
    tech: 'Java 17 • Spring Boot • Redis Pub/Sub',
    metric: '-70% Database Storage Bloat',
    details: 'Filters static steady-state sensor values; compresses continuous time-series on change; maintains rolling window aggregations in Redis.',
    x: 365,
    y: 170,
    w: 155,
    h: 74,
    color: '#10b981',
  },
  {
    id: 'erp',
    title: 'ERP Webhooks',
    subtitle: 'Enterprise Work Order Sync',
    role: 'Asynchronous event synchronization with enterprise systems',
    tech: 'HTTPS Webhooks • REST • SAP / MES Integration',
    metric: 'Zero-Queue Event Dropping',
    details: 'Dispatches verified cycle completions, part scrap counts, and downtime alarms directly into enterprise ERP/MES platforms without blocking the ingestion path.',
    x: 365,
    y: 35,
    w: 155,
    h: 65,
    color: '#a78bfa',
    isBranch: true,
  },
  {
    id: 'mongodb',
    title: 'MongoDB Replica Set',
    subtitle: 'Time-Series & State Store',
    role: 'Segmented persistent storage for aggregated metrics',
    tech: 'MongoDB 3-Node Replica Set • WiredTiger',
    metric: '99.99% Write Availability',
    details: 'Tiered collections with automatic TTL expiration, compound time indexes, and read-secondary distribution for heavy analytical reporting queries.',
    x: 555,
    y: 170,
    w: 155,
    h: 74,
    color: '#10b981',
  },
  {
    id: 'archive-dr',
    title: 'Archive DR Pipeline',
    subtitle: 'Automated Backup & Restore',
    role: 'Automated point-in-time disaster recovery pipelines',
    tech: 'Daily Compressed S3 Dump • Checksum Audit',
    metric: '0 Data Loss on Recovery',
    details: 'Automated point-in-time extraction of time-series buckets with SHA-256 checksum verification and automated rehearsal scripts for zero-loss recovery.',
    x: 555,
    y: 305,
    w: 155,
    h: 65,
    color: '#f59e0b',
    isBranch: true,
  },
  {
    id: 'websockets',
    title: 'WebSocket Gateway',
    subtitle: 'Real-Time Fan-Out Hub',
    role: 'Push streaming to active operator sessions',
    tech: 'Netty / WebSocket • STOMP Protocol',
    metric: '< 50ms Push Latency',
    details: 'Low-overhead multiplexed bi-directional channels delivering live status and instantaneous machine alarms to hundreds of concurrent shop-floor screens.',
    x: 745,
    y: 170,
    w: 125,
    h: 74,
    color: '#06b6d4',
  },
  {
    id: 'dashboard',
    title: 'React Dashboard',
    subtitle: 'Shop-Floor Operator UI',
    role: 'Interactive real-time machine telemetry interface',
    tech: 'React • Vite • Tailwind CSS • Canvas Sparklines',
    metric: '99.9%+ Platform Uptime',
    details: 'High-density operational views showing live OEE, spindle rpm, temperature sparklines, and active alerts across entire factory clusters.',
    x: 900,
    y: 170,
    w: 110,
    h: 74,
    color: '#10b981',
  },
];

export function MachineWiseDiagram() {
  const [activeNodeId, setActiveNodeId] = useState<string>('java-redis');
  const activeNode = NODES.find((n) => n.id === activeNodeId) ?? NODES[2];

  return (
    <div className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6 space-y-4 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
          <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text)]">
            Generic Industrial Telemetry Architecture
          </h4>
        </div>
        <div className="text-[11px] font-mono text-[var(--muted)] flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-0.5 bg-[var(--accent)]" /> Core Pipeline
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-0.5 bg-[#a78bfa]" /> ERP Webhook
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-0.5 bg-[#f59e0b]" /> Archive / DR
          </span>
        </div>
      </div>

      {/* Responsive SVG Diagram */}
      <div className="relative w-full overflow-hidden rounded-xl border border-white/5 bg-black/50 p-2">
        <svg
          viewBox="0 0 1025 410"
          className="w-full h-auto block select-none"
          role="img"
          aria-label="Generic animated architecture diagram showing industrial telemetry flow from CNC machines through MQTT, Java microservices, Redis, MongoDB replica set, and WebSockets to React dashboard, with branches to ERP webhooks and Archive DR."
        >
          <defs>
            <style>{`
              @keyframes mwFlowLinear {
                from { stroke-dashoffset: 28; }
                to { stroke-dashoffset: 0; }
              }
              @keyframes mwFlowVerticalUp {
                from { stroke-dashoffset: 28; }
                to { stroke-dashoffset: 0; }
              }
              @keyframes mwFlowVerticalDown {
                from { stroke-dashoffset: 0; }
                to { stroke-dashoffset: 28; }
              }
              .mw-core-flow {
                animation: mwFlowLinear 1.4s linear infinite;
              }
              .mw-erp-flow {
                animation: mwFlowVerticalUp 1.6s linear infinite;
              }
              .mw-dr-flow {
                animation: mwFlowVerticalDown 1.6s linear infinite;
              }
              @media (prefers-reduced-motion: reduce) {
                .mw-core-flow, .mw-erp-flow, .mw-dr-flow {
                  animation: none !important;
                  stroke-dashoffset: 0 !important;
                }
              }
            `}</style>

            <linearGradient id="coreLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
            </linearGradient>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Guide Grid */}
          <g stroke="rgba(255,255,255,0.03)" strokeWidth="1">
            <line x1="0" y1="207" x2="1025" y2="207" strokeDasharray="3 6" />
            <line x1="442" y1="0" x2="442" y2="410" strokeDasharray="3 6" />
            <line x1="632" y1="0" x2="632" y2="410" strokeDasharray="3 6" />
          </g>

          {/* Static Background Connection Paths */}
          <g stroke="rgba(255,255,255,0.12)" strokeWidth="2" strokeLinecap="round">
            {/* Core horizontal line */}
            <line x1="160" y1="207" x2="195" y2="207" />
            <line x1="330" y1="207" x2="365" y2="207" />
            <line x1="520" y1="207" x2="555" y2="207" />
            <line x1="710" y1="207" x2="745" y2="207" />
            <line x1="870" y1="207" x2="900" y2="207" />

            {/* Branch 1: Java Microservices -> ERP Webhook (Upwards) */}
            <line x1="442" y1="170" x2="442" y2="100" />

            {/* Branch 2: MongoDB Replica Set -> Archive DR (Downwards) */}
            <line x1="632" y1="244" x2="632" y2="305" />
          </g>

          {/* Animated Flow Pulse Paths */}
          <g strokeWidth="2.5" strokeLinecap="round">
            {/* CNC -> MQTT */}
            <line
              x1="160"
              y1="207"
              x2="195"
              y2="207"
              stroke="#06b6d4"
              strokeDasharray="4 6"
              className="mw-core-flow"
            />
            {/* MQTT -> Java & Redis */}
            <line
              x1="330"
              y1="207"
              x2="365"
              y2="207"
              stroke="#10b981"
              strokeDasharray="4 6"
              className="mw-core-flow"
            />
            {/* Java -> MongoDB */}
            <line
              x1="520"
              y1="207"
              x2="555"
              y2="207"
              stroke="#10b981"
              strokeDasharray="4 6"
              className="mw-core-flow"
            />
            {/* MongoDB -> WebSockets */}
            <line
              x1="710"
              y1="207"
              x2="745"
              y2="207"
              stroke="#06b6d4"
              strokeDasharray="4 6"
              className="mw-core-flow"
            />
            {/* WebSockets -> Dashboard */}
            <line
              x1="870"
              y1="207"
              x2="900"
              y2="207"
              stroke="#10b981"
              strokeDasharray="4 6"
              className="mw-core-flow"
            />

            {/* Branch Up: Java -> ERP Webhook */}
            <line
              x1="442"
              y1="170"
              x2="442"
              y2="100"
              stroke="#a78bfa"
              strokeDasharray="4 6"
              className="mw-erp-flow"
            />

            {/* Branch Down: MongoDB -> Archive DR */}
            <line
              x1="632"
              y1="244"
              x2="632"
              y2="305"
              stroke="#f59e0b"
              strokeDasharray="4 6"
              className="mw-dr-flow"
            />
          </g>

          {/* Arrow heads */}
          <g fill="rgba(255,255,255,0.4)">
            <polygon points="193,204 198,207 193,210" />
            <polygon points="363,204 368,207 363,210" />
            <polygon points="553,204 558,207 553,210" />
            <polygon points="743,204 748,207 743,210" />
            <polygon points="898,204 903,207 898,210" />
            <polygon points="439,102 442,97 445,102" />
            <polygon points="629,303 632,308 635,303" />
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
                  filter={isActive ? 'url(#glow)' : undefined}
                  className="transition-all duration-200"
                />

                {/* Node Status Dot */}
                <circle
                  cx={node.x + 14}
                  cy={node.y + 16}
                  r="4"
                  fill={node.color}
                  className={isActive ? 'animate-pulse' : ''}
                />

                {/* Node Title */}
                <text
                  x={node.x + 24}
                  y={node.y + 20}
                  fill="#f9fafb"
                  fontSize="10.5"
                  fontWeight="600"
                  fontFamily="Inter, sans-serif"
                >
                  {node.title.length > 17 ? node.title.slice(0, 16) + '…' : node.title}
                </text>

                {/* Node Subtitle */}
                <text
                  x={node.x + 12}
                  y={node.y + 38}
                  fill="#9ca3af"
                  fontSize="8.5"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {node.subtitle.length > 22 ? node.subtitle.slice(0, 21) + '…' : node.subtitle}
                </text>

                {/* Node Metric / Tag */}
                <rect
                  x={node.x + 10}
                  y={node.y + 48}
                  width={node.w - 20}
                  height="16"
                  rx="4"
                  fill="rgba(0,0,0,0.4)"
                  stroke="rgba(255,255,255,0.05)"
                />
                <text
                  x={node.x + 16}
                  y={node.y + 59}
                  fill={node.color}
                  fontSize="8"
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
            <span className="text-[var(--accent)]">Key SLA:</span>
            <span>{activeNode.metric}</span>
          </div>
        </div>

        <p className="text-xs text-[var(--muted)] leading-relaxed">
          {activeNode.details}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-mono">
          <span className="text-[var(--muted-dark)]">Tech Stack:</span>
          <span className="text-[var(--text)]">{activeNode.tech}</span>
          <span className="text-[var(--muted-dark)]">•</span>
          <span className="text-[var(--muted-dark)]">Role:</span>
          <span className="text-[var(--accent-2)]">{activeNode.role}</span>
        </div>
      </div>
    </div>
  );
}
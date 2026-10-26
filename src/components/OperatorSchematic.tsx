export function OperatorSchematic() {
  return (
    <div className="brk rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-[var(--accent)]/50">
      {/* Background blueprint grid watermark */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, var(--accent) 0 1px, transparent 1px 32px), repeating-linear-gradient(90deg, var(--accent) 0 1px, transparent 1px 32px)',
        }}
        aria-hidden="true"
      />

      {/* Engineering Drawing SVG */}
      <svg
        viewBox="0 0 400 470"
        role="img"
        aria-label="Engineering-drawing style schematic portrait of Eklavya Ghodake"
        className="w-full h-auto text-[var(--accent)]"
      >
        <defs>
          <marker
            id="blueprint-arrow"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 z" fill="var(--accent)" />
          </marker>
        </defs>

        {/* Outer and Inner Technical Borders */}
        <rect
          x="8"
          y="8"
          width="384"
          height="454"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.25"
        />
        <rect
          x="16"
          y="16"
          width="368"
          height="438"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.12"
        />

        {/* Crosshairs & Centerlines */}
        <line
          x1="200"
          y1="40"
          x2="200"
          y2="300"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeDasharray="4 6"
        />
        <line
          x1="70"
          y1="150"
          x2="330"
          y2="150"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeDasharray="4 6"
        />

        {/* Head Contours */}
        <circle
          cx="200"
          cy="150"
          r="72"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle
          cx="200"
          cy="150"
          r="58"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeDasharray="3 5"
        />

        {/* Technical Coordinate Eye/Face Marks */}
        <circle cx="176" cy="138" r="3.5" fill="currentColor" />
        <circle cx="224" cy="138" r="3.5" fill="currentColor" />
        <path
          d="M178 176 Q200 192 222 176"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />

        {/* Shoulders & Baseline */}
        <path
          d="M104 320 Q118 244 200 238 Q282 244 296 320"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <line
          x1="96"
          y1="320"
          x2="304"
          y2="320"
          stroke="currentColor"
          strokeWidth="1.6"
        />

        {/* Diameter Dimension & Extension Lines */}
        <line
          x1="128"
          y1="62"
          x2="272"
          y2="62"
          stroke="var(--accent-2)"
          markerStart="url(#blueprint-arrow)"
          markerEnd="url(#blueprint-arrow)"
        />
        <line
          x1="128"
          y1="70"
          x2="128"
          y2="54"
          stroke="var(--accent-2)"
          strokeOpacity="0.5"
        />
        <line
          x1="272"
          y1="70"
          x2="272"
          y2="54"
          stroke="var(--accent-2)"
          strokeOpacity="0.5"
        />
        <text
          x="200"
          y="52"
          fill="var(--accent-2)"
          fontFamily="ui-monospace, monospace"
          fontSize="11"
          fontWeight="600"
          textAnchor="middle"
        >
          Ø ~3 YRS EXP
        </text>

        {/* Radius Leader Callout: R&D Lead */}
        <line
          x1="252"
          y1="100"
          x2="316"
          y2="72"
          stroke="currentColor"
          strokeOpacity="0.5"
        />
        <text
          x="320"
          y="70"
          fill="var(--muted)"
          fontFamily="ui-monospace, monospace"
          fontSize="10"
        >
          R&amp;D LEAD
        </text>

        {/* Tolerance Callout: Zero Data Loss */}
        <line
          x1="296"
          y1="300"
          x2="342"
          y2="330"
          stroke="currentColor"
          strokeOpacity="0.5"
        />
        <text
          x="290"
          y="348"
          fill="var(--muted)"
          fontFamily="ui-monospace, monospace"
          fontSize="10"
        >
          ± ZERO DATA LOSS
        </text>

        {/* ASME Y14.5 / ISO 1101 GD&T Feature Control Frame: [Position | 0.1 | Datum A] */}
        <g transform="translate(46, 236)">
          <rect
            x="0"
            y="0"
            width="66"
            height="20"
            fill="var(--surface)"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <line x1="22" y1="0" x2="22" y2="20" stroke="currentColor" strokeWidth="1.2" />
          <line x1="44" y1="0" x2="44" y2="20" stroke="currentColor" strokeWidth="1.2" />
          <text
            x="11"
            y="15"
            fill="currentColor"
            fontSize="12"
            textAnchor="middle"
          >
            ⌖
          </text>
          <text
            x="33"
            y="14"
            fill="currentColor"
            fontSize="9"
            fontFamily="ui-monospace, monospace"
            textAnchor="middle"
          >
            0.1
          </text>
          <text
            x="55"
            y="14"
            fill="currentColor"
            fontSize="9"
            fontFamily="ui-monospace, monospace"
            textAnchor="middle"
          >
            A
          </text>
        </g>

        {/* Technical Title Block */}
        <g fontFamily="ui-monospace, monospace" fontSize="9" fill="var(--muted)">
          <rect
            x="16"
            y="376"
            width="368"
            height="78"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.3"
          />
          <line
            x1="16"
            y1="402"
            x2="384"
            y2="402"
            stroke="currentColor"
            strokeOpacity="0.3"
          />
          <line
            x1="16"
            y1="428"
            x2="384"
            y2="428"
            stroke="currentColor"
            strokeOpacity="0.3"
          />
          <line
            x1="250"
            y1="376"
            x2="250"
            y2="454"
            stroke="currentColor"
            strokeOpacity="0.3"
          />
          <text x="26" y="394">
            DWG NO: EGH-2026-DISTRIBUTED
          </text>
          <text x="260" y="394">
            SCALE 1:1
          </text>
          <text x="26" y="420">
            DRAWN: E. GHODAKE · MAHARASHTRA, IN
          </text>
          <text x="260" y="420">
            REV: C
          </text>
          <text x="26" y="446" fill="var(--accent)" fontWeight="600">
            SPEC: HIGH-THROUGHPUT · EVENT-DRIVEN
          </text>
          <text x="260" y="446">
            SHEET 1/1
          </text>
        </g>
      </svg>

      {/* Blueprint Caption */}
      <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)] font-mono text-[11px] text-[var(--muted)]">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          <span>FIG.01 — OPERATOR SCHEMATIC</span>
        </span>
        <span className="text-[var(--accent)] font-semibold">APPROVED ⌖</span>
      </div>
    </div>
  );
}

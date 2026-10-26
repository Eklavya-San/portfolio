import { useState, useEffect } from 'react';
import { TelemetryHero } from './TelemetryHero';

export function SystemMapCard() {
  const [view, setView] = useState<'map' | 'telemetry'>('map');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mq.matches) {
        setView('telemetry');
      }
      const handler = (e: MediaQueryListEvent) => {
        if (e.matches) {
          setView('telemetry');
        }
      };
      mq.addEventListener?.('change', handler);
      return () => mq.removeEventListener?.('change', handler);
    }
  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto overflow-hidden sm:overflow-visible">
      {/* View Switcher Capsule Tabs */}
      <div className="flex items-center justify-end gap-2 mb-3">
        <div className="inline-flex items-center p-1 rounded-full border border-[var(--border)] bg-[var(--surface)] text-xs font-mono">
          <button
            type="button"
            onClick={() => setView('map')}
            className={`px-3 py-1 rounded-full transition-all ${
              view === 'map'
                ? 'bg-[#14221f] text-[#c8f169] font-bold shadow-xs'
                : 'text-[var(--muted)] hover:text-[var(--text)]'
            }`}
          >
            System Map
          </button>
          <button
            type="button"
            onClick={() => setView('telemetry')}
            className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 ${
              view === 'telemetry'
                ? 'bg-[#14221f] text-[#c8f169] font-bold shadow-xs'
                : 'text-[var(--muted)] hover:text-[var(--text)]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8f169] animate-pulse" />
            <span>Telemetry Bus</span>
          </button>
        </div>
      </div>

      {view === 'map' ? (
        <div className="relative">
          {/* Main Visual Card */}
          <div className="relative rounded-3xl p-6 sm:p-7 bg-[#14221f] text-[#edf4ec] border border-[var(--border)] shadow-2xl overflow-hidden isolation-auto">
            {/* Subtle background radial dot pattern */}
            <div
              className="pointer-events-none absolute inset-0 opacity-20 -z-10"
              style={{
                backgroundImage: 'radial-gradient(rgba(200,241,105,0.35) 0.8px, transparent 0.8px)',
                backgroundSize: '18px 18px',
                maskImage: 'linear-gradient(140deg, black, transparent 85%)',
              }}
              aria-hidden="true"
            />

            {/* Header: Label & Status */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-[11px]">
              <span className="text-[#9aac9e] uppercase tracking-wider">System map / 001</span>
              <span className="inline-flex items-center gap-2 text-[#c8f169] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8f169] animate-pulse shadow-[0_0_8px_#c8f169]" />
                <span>Connected thinking</span>
              </span>
            </div>

            {/* Flow Diagram */}
            <div className="relative my-6 space-y-4">
              {/* Connecting Dashed Line */}
              <div
                className="absolute left-[26px] top-6 bottom-6 w-px border-l border-dashed border-[#c8f169]/50 -z-1"
                aria-hidden="true"
              />

              {/* Step 1: Edge & devices */}
              <div className="relative flex items-center gap-3.5 group">
                <div className="w-[52px] h-[52px] rounded-2xl border border-[#c8f169]/30 bg-[#20332d] text-[#c8f169] flex items-center justify-center shrink-0 shadow-md group-hover:border-[#c8f169] transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <path d="M7 8h4M7 12h10M7 16h7" />
                    <circle cx="17" cy="8" r="1" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <strong className="block text-sm text-white font-semibold tracking-tight">Edge &amp; devices</strong>
                  <small className="block text-xs text-[#9aac9e]">Real-world factory telemetry &amp; signals</small>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-[#c8f169]/10 text-[#c8e6ab] font-mono text-[10px] font-bold shrink-0">
                  INPUT
                </span>
              </div>

              {/* Step 2: Events & services */}
              <div className="relative flex items-center gap-3.5 group">
                <div className="w-[52px] h-[52px] rounded-2xl border border-[#c8f169]/30 bg-[#20332d] text-[#c8f169] flex items-center justify-center shrink-0 shadow-md group-hover:border-[#c8f169] transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="5" cy="12" r="2" />
                    <circle cx="19" cy="5" r="2" />
                    <circle cx="19" cy="19" r="2" />
                    <path d="m7 11 10-5M7 13l10 5" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <strong className="block text-sm text-white font-semibold tracking-tight">Events &amp; services</strong>
                  <small className="block text-xs text-[#9aac9e]">MQTT, Redis streams, Spring Boot microservices</small>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-[#c8f169]/10 text-[#c8e6ab] font-mono text-[10px] font-bold shrink-0">
                  PROCESS
                </span>
              </div>

              {/* Step 3: Data & retrieval */}
              <div className="relative flex items-center gap-3.5 group">
                <div className="w-[52px] h-[52px] rounded-2xl border border-[#c8f169]/30 bg-[#20332d] text-[#c8f169] flex items-center justify-center shrink-0 shadow-md group-hover:border-[#c8f169] transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="12" cy="5" rx="8" ry="3" />
                    <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <strong className="block text-sm text-white font-semibold tracking-tight">Data &amp; retrieval</strong>
                  <small className="block text-xs text-[#9aac9e]">MongoDB time-series, on-change aggregation (−70%)</small>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-[#c8f169]/10 text-[#c8e6ab] font-mono text-[10px] font-bold shrink-0">
                  CONTEXT
                </span>
              </div>

              {/* Step 4: Apps & AI */}
              <div className="relative flex items-center gap-3.5 group">
                <div className="w-[52px] h-[52px] rounded-2xl border border-[#c8f169]/30 bg-[#20332d] text-[#c8f169] flex items-center justify-center shrink-0 shadow-md group-hover:border-[#c8f169] transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3 4 7v5c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V7l-8-4Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <strong className="block text-sm text-white font-semibold tracking-tight">Apps &amp; AI</strong>
                  <small className="block text-xs text-[#9aac9e]">React dashboards, local RAG &amp; CTQ extraction</small>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-[#c8f169]/10 text-[#c8e6ab] font-mono text-[10px] font-bold shrink-0">
                  OUTPUT
                </span>
              </div>
            </div>

            {/* Footer Row */}
            <div className="flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[10px] text-[#8fa39a]">
              <span>DESIGN FOR THE REAL WORLD</span>
              <strong className="text-[#c8f169] font-bold">Build · Connect · Reason</strong>
            </div>
          </div>

          {/* Rotating Orbit Stamp */}
          <div className="orbit-stamp hidden sm:grid" aria-hidden="true">
            HUMAN<br />PROBLEMS<br />FIRST ↗
          </div>
        </div>
      ) : (
        <TelemetryHero />
      )}
    </div>
  );
}

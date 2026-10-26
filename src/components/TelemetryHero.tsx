import { useEffect, useState, useRef, useMemo } from 'react';
import { Activity, Radio, Cpu, AlertCircle } from 'lucide-react';

const INITIAL_POINTS: number[] = [
  48.2, 51.5, 49.8, 54.2, 58.0, 56.4, 62.1, 65.8, 63.4, 61.2,
  59.0, 64.3, 68.7, 72.1, 69.4, 66.8, 63.5, 61.9, 64.0, 67.2,
  65.4, 63.8, 62.1, 64.6,
];

export function TelemetryHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [points, setPoints] = useState<number[]>(INITIAL_POINTS);
  const [cycleCount, setCycleCount] = useState<number>(1428);
  const [vibrationRms, setVibrationRms] = useState<number>(1.34);
  const [latestLoad, setLatestLoad] = useState<number>(64.6);
  const [peakLoad, setPeakLoad] = useState<number>(74.8);
  const [lastUpdated, setLastUpdated] = useState<string>('00:00:00');
  const tickCountRef = useRef(0);

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // IntersectionObserver to pause off-screen
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Live simulation tick interval
  useEffect(() => {
    // If not visible or reduced motion, pause simulation
    if (!isVisible || reducedMotion) return;

    const timer = setInterval(() => {
      tickCountRef.current += 1;
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0] ?? '12:00:00';
      setLastUpdated(timeStr);

      setPoints((prev) => {
        const last = prev[prev.length - 1] ?? 60;
        // Random walk noise between -3.5 and +3.5
        const delta = (Math.random() - 0.48) * 7;
        let next = Math.round((last + delta) * 10) / 10;
        // Clamp between 42% and 88%
        if (next < 42) next = 42 + Math.random() * 5;
        if (next > 88) next = 88 - Math.random() * 5;

        setLatestLoad(next);
        setPeakLoad((currPeak) => Math.max(currPeak, next));

        return [...prev.slice(1), next];
      });

      // Update vibration RMS with subtle oscillation
      const nextVibe = Math.round((1.25 + Math.random() * 0.28) * 100) / 100;
      setVibrationRms(nextVibe);

      // Increment cycle count occasionally (every 8 ticks ~ 8-10 seconds)
      if (tickCountRef.current % 8 === 0) {
        setCycleCount((c) => c + 1);
      }
    }, 1100);

    return () => clearInterval(timer);
  }, [isVisible, reducedMotion]);

  // Compute SVG Sparkline path
  const { pathD, areaD, lastX, lastY } = useMemo(() => {
    const width = 280;
    const height = 56;
    const minVal = 35;
    const maxVal = 95;
    const len = points.length;

    const coords = points.map((val, idx) => {
      const x = (idx / (len - 1)) * width;
      const norm = (val - minVal) / (maxVal - minVal);
      const clampedNorm = Math.max(0, Math.min(1, norm));
      const y = height - clampedNorm * (height - 8) - 4;
      return { x, y };
    });

    const d = coords.reduce(
      (acc, curr, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${curr.x.toFixed(1)},${curr.y.toFixed(1)}`,
      ''
    );
    const last = coords[coords.length - 1] ?? { x: width, y: height / 2 };
    const area = `${d} L ${width},${height} L 0,${height} Z`;

    return { pathD: d, areaD: area, lastX: last.x, lastY: last.y };
  }, [points]);

  // Status Badge Logic
  const statusState = useMemo(() => {
    if (reducedMotion) {
      return {
        label: 'STATIC (REDUCED MOTION)',
        dotClass: 'bg-[var(--muted)]',
        badgeClass: 'text-[var(--muted)] border-white/10 bg-white/5',
      };
    }
    if (!isVisible) {
      return {
        label: 'PAUSED (OFF-SCREEN)',
        dotClass: 'bg-amber-400',
        badgeClass: 'text-amber-400 border-amber-500/20 bg-amber-500/10',
      };
    }
    return {
      label: 'STREAMING (MQTT)',
      dotClass: 'bg-[var(--accent)] animate-pulse shadow-[0_0_8px_var(--accent)]',
      badgeClass: 'text-[var(--accent)] border-[var(--accent)]/30 bg-[var(--accent-muted)]',
    };
  }, [reducedMotion, isVisible]);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-2xl relative overflow-hidden font-sans group hover:border-[var(--border-focus)] transition-all duration-300"
      aria-label="Simulated Factory Telemetry Widget"
    >
      {/* Background industrial grid overlay */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Header bar */}
      <div className="flex items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3 mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-black/40 border border-white/5">
            <Radio className="w-3.5 h-3.5 text-[var(--accent-2)]" aria-hidden="true" />
          </div>
          <div>
            <div className="font-mono text-[11px] font-semibold text-[var(--text)] tracking-wider">
              CNC-04 // CELL-A3
            </div>
            <div className="font-mono text-[10px] text-[var(--accent-2)] truncate max-w-[170px] sm:max-w-[210px]">
              plant/cnc-04/spindle_load
            </div>
          </div>
        </div>

        {/* Live Status Pill */}
        <div
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono border font-medium ${statusState.badgeClass}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${statusState.dotClass}`} aria-hidden="true" />
          <span>{statusState.label}</span>
        </div>
      </div>

      {/* Primary Telemetry: Spindle Load */}
      <div className="space-y-2 relative z-10">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-mono text-[var(--muted)] uppercase tracking-wider">
            Spindle Load
          </span>
          <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--muted-dark)]">
            <span>PEAK {peakLoad.toFixed(1)}%</span>
            <span>•</span>
            <span className="text-emerald-400 font-medium">NOMINAL</span>
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="font-mono text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text)]">
            {latestLoad.toFixed(1)}
          </span>
          <span className="font-mono text-xl text-[var(--accent)] font-semibold">%</span>
        </div>

        {/* SVG Sparkline Stream */}
        <div className="pt-2 pb-1 relative">
          <svg
            viewBox="0 0 280 56"
            className="w-full h-14 overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="telemetry-spark-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Reference dashed gridlines */}
            <line
              x1="0"
              y1="14"
              x2="280"
              y2="14"
              stroke="rgba(255,255,255,0.06)"
              strokeDasharray="2,3"
            />
            <line
              x1="0"
              y1="42"
              x2="280"
              y2="42"
              stroke="rgba(255,255,255,0.06)"
              strokeDasharray="2,3"
            />

            {/* Sparkline Area */}
            <path d={areaD} fill="url(#telemetry-spark-grad)" />

            {/* Sparkline Stroke */}
            <path
              d={pathD}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Pulsing Dot at current tip */}
            {!reducedMotion && isVisible && (
              <>
                <circle
                  cx={lastX}
                  cy={lastY}
                  r="5"
                  fill="var(--accent)"
                  opacity="0.4"
                  className="animate-ping"
                />
                <circle
                  cx={lastX}
                  cy={lastY}
                  r="3"
                  fill="var(--accent)"
                  stroke="var(--bg)"
                  strokeWidth="1.5"
                />
              </>
            )}
          </svg>
        </div>
      </div>

      {/* Secondary Metrics Sub-Grid */}
      <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-[var(--border-subtle)] relative z-10">
        {/* Metric 1: Cycle count */}
        <div className="p-2.5 rounded-xl bg-black/30 border border-white/5 space-y-1">
          <div className="text-[10px] font-mono text-[var(--muted)] flex items-center justify-between">
            <span>cycle_count</span>
            <Activity className="w-3 h-3 text-[var(--accent)] opacity-70" />
          </div>
          <div className="flex items-baseline gap-1 font-mono">
            <span className="text-base font-bold text-[var(--text)]">
              {cycleCount.toLocaleString()}
            </span>
            <span className="text-[10px] text-[var(--muted-dark)]">pts</span>
          </div>
        </div>

        {/* Metric 2: Vibration RMS */}
        <div className="p-2.5 rounded-xl bg-black/30 border border-white/5 space-y-1">
          <div className="text-[10px] font-mono text-[var(--muted)] flex items-center justify-between">
            <span>vibration_rms</span>
            <Cpu className="w-3 h-3 text-[var(--accent-2)] opacity-70" />
          </div>
          <div className="flex items-baseline gap-1 font-mono">
            <span className="text-base font-bold text-[var(--text)]">
              {vibrationRms.toFixed(2)}
            </span>
            <span className="text-[10px] text-[var(--muted-dark)]">mm/s</span>
          </div>
        </div>
      </div>

      {/* Footer Caption: Explicit Simulation Notice */}
      <div className="mt-3 pt-2.5 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px] font-mono text-[var(--muted-dark)] relative z-10">
        <div className="flex items-center gap-1.5 text-[var(--muted)]">
          <AlertCircle className="w-3 h-3 text-[var(--accent-2)] shrink-0" aria-hidden="true" />
          <span>Simulated factory telemetry</span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          {lastUpdated !== '00:00:00' && (
            <>
              <span>{lastUpdated}</span>
              <span>•</span>
            </>
          )}
          <span>QoS 1</span>
          <span>•</span>
          <span>1.0 Hz</span>
        </div>
      </div>
    </div>
  );
}

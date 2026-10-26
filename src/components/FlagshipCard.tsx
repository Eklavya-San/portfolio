import type { Flagship } from '../types/portfolio';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

interface FlagshipCardProps {
  flagship: Flagship;
  onOpenOverlay?: (slug: string, triggerEl: HTMLElement) => void;
}

export function FlagshipCard({ flagship, onOpenOverlay }: FlagshipCardProps) {
  const isEnterprise = flagship.slug === 'machinewise';
  const badgeLabel = isEnterprise ? 'Enterprise Case Study' : 'Open Source';
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      id={`flagship-card-${flagship.slug}`}
      layoutId={shouldReduceMotion ? undefined : `flagship-card-${flagship.slug}`}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { type: 'spring', stiffness: 350, damping: 30 }
      }
      className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7 flex flex-col justify-between hover:border-[var(--accent)]/50 hover:bg-[var(--surface-hover)] transition-colors duration-300 shadow-xl relative overflow-hidden"
    >
      {/* Subtle Accent Glow Corner */}
      <div
        className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity ${
          isEnterprise ? 'bg-emerald-500' : 'bg-cyan-500'
        }`}
      />

      <div className="space-y-4">
        {/* Header Badge */}
        <div className="flex items-center justify-between">
          <span
            className={`px-3 py-1 rounded-full text-xs font-mono font-medium border ${
              isEnterprise
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                : 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400'
            }`}
          >
            {badgeLabel}
          </span>
          <span className="text-[11px] font-mono text-[var(--muted-dark)]">
            // 0{flagship.slug === 'machinewise' ? '1' : flagship.slug === 'mqtt-go' ? '2' : '3'}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
          {flagship.title}
        </h3>

        {/* Tagline */}
        <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed line-clamp-3">
          {flagship.tagline}
        </p>

        {/* 2 Key Metrics */}
        <div className="grid grid-cols-2 gap-2.5 pt-2">
          {flagship.metrics.slice(0, 2).map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-white/5 bg-black/40 p-3 space-y-0.5"
            >
              <div className="text-base sm:text-lg font-mono font-bold text-[var(--accent)]">
                {m.value}
              </div>
              <div className="text-[10px] font-mono text-[var(--muted)] truncate">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-4 pt-4 border-t border-white/5">
        {/* Stack Pills */}
        <div className="flex flex-wrap gap-1.5">
          {flagship.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/30 border border-white/5 text-[var(--muted)]"
            >
              {tech}
            </span>
          ))}
          {flagship.stack.length > 4 && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 text-[var(--muted-dark)]">
              +{flagship.stack.length - 4}
            </span>
          )}
        </div>

        {/* Capsule Action Button / Link */}
        <a
          href={`/work/${flagship.slug}`}
          onClick={(e) => {
            if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
              e.preventDefault();
              onOpenOverlay?.(flagship.slug, e.currentTarget);
            }
          }}
          className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-full text-xs font-mono font-semibold border border-white/10 bg-white/5 text-[var(--text)] group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          <span>Read case study</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
}
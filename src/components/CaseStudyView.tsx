import type { Flagship } from '../types/portfolio';
import { MachineWiseDiagram } from './diagrams/MachineWiseDiagram';
import { MqttGoDiagram } from './diagrams/MqttGoDiagram';
import { CtqDiagram } from './diagrams/CtqDiagram';
import { DocumentRagDiagram } from './diagrams/DocumentRagDiagram';
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Layers,
  X,
} from 'lucide-react';

interface CaseStudyViewProps {
  flagship: Flagship;
  isStandalone?: boolean;
  onClose?: () => void;
}

export function CaseStudyView({
  flagship,
  isStandalone = false,
  onClose,
}: CaseStudyViewProps) {
  const isEnterprise = flagship.slug === 'machinewise';

  return (
    <article className="w-full space-y-10 sm:space-y-12">
      {/* Top Bar for Standalone / Modal */}
      <div className="flex items-center justify-between gap-4">
        {isStandalone ? (
          <a
            href="/#work"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-white hover:border-[var(--accent)] transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to All Projects</span>
          </a>
        ) : (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border border-white/10 bg-white/5 text-[var(--accent)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            <span>CASE STUDY OVERLAY</span>
          </div>
        )}

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study dialog"
            className="p-2 rounded-full border border-white/10 bg-[var(--surface)] text-[var(--muted)] hover:text-white hover:border-white/20 transition-colors focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Case Study Header */}
      <header className="space-y-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={`px-3 py-1 rounded-full text-xs font-mono border ${
                isEnterprise
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-semibold'
                  : 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-semibold'
              }`}
            >
              {isEnterprise ? 'Enterprise Case Study' : 'Open Source'}
            </span>
            <span className="text-xs font-mono text-[var(--muted-dark)]">
              // {flagship.slug.toUpperCase()}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text)]">
            {flagship.title}
          </h1>

          <p className="text-base sm:text-lg text-[var(--muted)] max-w-3xl leading-relaxed">
            {flagship.tagline}
          </p>
        </div>

        {/* Stack Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {flagship.stack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono px-3 py-1 rounded-full border border-white/10 bg-black/40 text-[var(--text)]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          {flagship.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5 space-y-1"
            >
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[var(--accent)] tracking-tight">
                {metric.value}
              </div>
              <div className="text-xs font-mono text-[var(--muted)]">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* Section 1: The Problem */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--accent)]">
          <AlertCircle className="w-4 h-4 text-rose-400" />
          <span>The Problem &amp; Operational Context</span>
        </div>
        <p className="text-sm sm:text-base text-[var(--text)] leading-relaxed">
          {flagship.caseStudy.problem}
        </p>
      </section>

      {/* Section 2: Key Architectural Decisions */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--accent-2)]">
          <Cpu className="w-4 h-4 text-[var(--accent-2)]" />
          <span>Key Architectural Decisions</span>
        </div>
        <p className="text-sm sm:text-base text-[var(--text)] leading-relaxed">
          {flagship.caseStudy.decision}
        </p>
      </section>

      {/* Section 3: Animated Architecture Diagram */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text)]">
            <Layers className="w-4 h-4 text-[var(--accent)]" />
            <span>Interactive Architecture Topology</span>
          </div>
          <span className="text-[11px] font-mono text-[var(--muted-dark)] hidden sm:inline">
            Click or focus nodes to inspect details
          </span>
        </div>

        {flagship.caseStudy.architectureKey === 'machinewise' && <MachineWiseDiagram />}
        {flagship.caseStudy.architectureKey === 'mqtt-go' && <MqttGoDiagram />}
        {flagship.caseStudy.architectureKey === 'ctq-extraction' && <CtqDiagram />}
        {flagship.caseStudy.architectureKey === 'document-rag' && <DocumentRagDiagram />}
      </section>

      {/* Section 4: Key Architecture & Capabilities */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--accent)]">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Key Architecture &amp; Capabilities</span>
        </div>

        <ul className="space-y-3.5">
          {flagship.caseStudy.results.map((result, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[var(--text)] leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2 shrink-0" />
              <span>{result}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 5: Code Repository Link (Open Source ONLY) */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-subtle)]">
        {flagship.repoUrl && !isEnterprise ? (
          <a
            href={flagship.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-[var(--accent)] text-black hover:bg-[var(--accent-hover)] transition-colors shadow-lg"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>View Source on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : (
          <div className="text-xs font-mono text-[var(--muted)] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Proprietary Industrial IP • Architecture patterns shared with permission</span>
          </div>
        )}

        {isStandalone && (
          <a
            href="/#work"
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--muted)] hover:text-white transition-colors"
          >
            <span>← Return to portfolio home</span>
          </a>
        )}
      </div>
    </article>
  );
}
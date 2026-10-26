import { useEffect, useRef, useState } from 'react';
import {
  Calendar,
  MapPin,
  CheckCircle2,
  Award,
} from 'lucide-react';
import { experience, talks, education } from '../data/experience';

export function Experience() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setScrollProgress(1);
      return;
    }

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start filling when container enters middle-lower viewport
      const startOffset = windowHeight * 0.8;
      const endOffset = windowHeight * 0.2;
      const totalSpan = rect.height;
      const currentPos = startOffset - rect.top;

      const progress = Math.min(Math.max(currentPos / (totalSpan + (startOffset - endOffset)), 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="space-y-8 relative">
      {/* Interactive Timeline Container */}
      <div className="relative pl-6 sm:pl-8 space-y-10">
        {/* Background Vertical Spine */}
        <div
          className="absolute left-2.5 sm:left-3.5 top-3 bottom-3 w-0.5 bg-[var(--border)]"
          aria-hidden="true"
        />

        {/* Scroll-Linked Progress Fill Line */}
        <div
          className="absolute left-2.5 sm:left-3.5 top-3 w-0.5 bg-gradient-to-b from-[var(--accent)] via-[var(--accent-2)] to-[var(--accent)] origin-top transition-all duration-75 ease-out shadow-[0_0_8px_var(--accent)]"
          style={{
            height: `${Math.round(scrollProgress * 100)}%`,
          }}
          aria-hidden="true"
        />

        {/* 1. Engineering Career Roles */}
        <div className="space-y-8">
          <div className="flex items-center gap-2 pt-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-semibold">
              Engineering Leadership &amp; Core Roles
            </span>
          </div>

          {experience.map((exp, idx) => (
            <div key={idx} className="relative group">
              {/* Milestone Node on Spine */}
              <div
                className="absolute -left-[1.375rem] sm:-left-[1.625rem] top-1.5 w-4 h-4 rounded-full border-2 border-[var(--bg)] bg-[var(--surface-hover)] group-hover:scale-125 transition-transform duration-200 flex items-center justify-center shadow-xs"
                aria-hidden="true"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] group-hover:animate-ping" />
              </div>

              {/* Role Card */}
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 space-y-4 hover:border-[var(--border-focus)] transition-all duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-[var(--text)] group-hover:text-white transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[var(--muted)]">
                      <span className="text-[var(--text)] font-medium">{exp.company}</span>
                      {exp.location && (
                        <>
                          <span className="text-[var(--muted-dark)]">•</span>
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[var(--muted-dark)]" aria-hidden="true" />
                            <span>{exp.location}</span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-black/40 border border-white/5 text-[var(--accent)] shrink-0 self-start sm:self-center">
                    <Calendar className="w-3 h-3 text-[var(--accent)]" aria-hidden="true" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Resume-backed bullets */}
                <ul className="space-y-2 pt-1 text-xs sm:text-sm text-[var(--muted)]">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Technology Tags */}
                {exp.tags && exp.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--border-subtle)]">
                    {exp.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] px-2.5 py-0.5 rounded-full font-mono bg-white/5 border border-white/5 text-[var(--muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 2. Industry Talks */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center gap-2 pt-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-2)]" />
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-2)] font-semibold">
              Industry Exposure &amp; Technical Presentations
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {talks.map((talk, idx) => {
              const stampText = talk.event.includes('IMTEX')
                ? 'LIVE\nDEMO\n⌖'
                : 'DEFENCE\nSECTOR\n⏥';

              return (
                <div
                  key={idx}
                  className="brk rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6 space-y-3 relative group hover:border-[var(--accent)]/50 transition-all duration-300 overflow-hidden"
                >
                  {/* Rotating Technical Stamp */}
                  <div
                    className="stamp absolute right-3 top-3 hidden sm:grid"
                    aria-hidden="true"
                  >
                    <span className="whitespace-pre-line leading-tight">{stampText}</span>
                  </div>

                  <div className="flex items-start justify-between gap-3 pr-0 sm:pr-16">
                    <div className="space-y-1">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[var(--accent-2-muted)] text-[var(--accent-2)] border border-[var(--accent-2)]/30 font-medium">
                        {talk.event}
                      </span>
                      <h4 className="text-sm font-bold text-[var(--text)] group-hover:text-white transition-colors">
                        {talk.title}
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-[var(--muted-dark)] shrink-0 px-2 py-0.5 rounded bg-black/40 border border-white/5 sm:hidden">
                      {talk.year}
                    </span>
                  </div>

                  <p className="text-xs text-[var(--muted)] leading-relaxed">
                    {talk.description}
                  </p>

                  {talk.tags && talk.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {talk.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-black/40 border border-white/5 text-[var(--muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Education & Foundations */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2 pt-2">
            <span className="w-2 h-2 rounded-full bg-white/40" />
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--muted)] font-semibold">
              Education &amp; Domain Foundation
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-2.5 flex flex-col justify-between hover:border-[var(--border-focus)] transition-colors"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-[var(--muted-dark)]">
                    <span>{edu.period}</span>
                    {edu.grade && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-[var(--accent)] font-semibold bg-[var(--accent-muted)] px-2 py-0.5 rounded-full border border-[var(--accent)]/30">
                        <Award className="w-3 h-3" aria-hidden="true" />
                        <span>{edu.grade}</span>
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-[var(--text)]">
                    {edu.degree}
                  </h4>
                </div>
                <p className="text-xs font-mono text-[var(--muted)] pt-1">
                  {edu.institution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

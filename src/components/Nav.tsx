import { useEffect, useState } from 'react';
import { Search, FileText, ArrowRight } from 'lucide-react';

interface NavProps {
  resumeUrl?: string;
}

const NAV_LINKS = [
  { id: 'work', label: 'Work', href: '/#work' },
  { id: 'experience', label: 'Experience', href: '/#experience' },
  { id: 'skills', label: 'Skills', href: '/#skills' },
  { id: 'contact', label: 'Contact', href: '/#contact' },
] as const;

export function Nav({ resumeUrl = '/Eklavya_Ghodake_Resume.pdf' }: NavProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Scrollspy calculation
      const sectionIds = ['work', 'experience', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 200;

      // Check sections from bottom up
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(id);
          return;
        }
      }

      if (window.scrollY < 200) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openCommandPalette = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  return (
    <>
      {/* Desktop Floating Capsule Nav */}
      <header
        className="fixed top-4 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center transition-all duration-200"
        aria-label="Primary Navigation"
      >
        <nav
          className={`flex items-center gap-1.5 sm:gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-md shadow-lg shadow-black/40 transition-all duration-200 ${
            isScrolled ? 'px-3 py-1.5 border-[var(--border-focus)]' : 'px-4 py-2'
          }`}
        >
          {/* Brand */}
          <a
            href="/"
            className="flex items-center gap-2 pl-2 pr-3 py-1 text-xs font-mono font-medium tracking-wider text-[var(--text)] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-full"
            aria-label="claudya.in home"
          >
            <span
              className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_8px_var(--accent)]"
              aria-hidden="true"
            />
            <span className="font-semibold">claudya.in</span>
          </a>

          <span className="w-px h-4 bg-[var(--border)] mx-0.5" aria-hidden="true" />

          {/* Section Links */}
          <div className="flex items-center gap-1" role="menubar">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  role="menuitem"
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3 py-1 rounded-full text-xs transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                    isActive
                      ? 'bg-white/10 text-white font-medium shadow-xs'
                      : 'text-[var(--muted)] hover:text-[var(--text)] hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <span className="w-px h-4 bg-[var(--border)] mx-0.5" aria-hidden="true" />

          {/* Cmd+K Quick Search Trigger */}
          <button
            type="button"
            onClick={openCommandPalette}
            aria-label="Open Command Palette (Cmd + K)"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs text-[var(--muted)] hover:text-[var(--text)] bg-[var(--surface-hover)] border border-[var(--border-subtle)] hover:border-[var(--border)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-[var(--muted)]" aria-hidden="true" />
            <span className="sr-only sm:not-sr-only text-[11px] font-mono text-[var(--muted-dark)]">Cmd+K</span>
            <kbd className="hidden font-mono text-[10px] px-1 py-0.2 rounded bg-black/50 text-[var(--muted)] border border-white/10">
              ⌘K
            </kbd>
          </button>

          {/* Résumé Link */}
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-[var(--muted)] hover:text-[var(--text)] hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            aria-label="Download Résumé (opens in new tab)"
          >
            <FileText className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Résumé</span>
          </a>

          {/* Primary CTA */}
          <a
            href="/#contact"
            className="flex items-center gap-1 px-3.5 py-1 rounded-full text-xs font-semibold bg-[var(--accent)] text-black hover:bg-[var(--accent-hover)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-xs ml-1"
          >
            <span>Let's talk</span>
            <ArrowRight className="w-3 h-3" aria-hidden="true" />
          </a>
        </nav>
      </header>

      {/* Mobile Bottom Capsule Nav */}
      <nav
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex md:hidden items-center justify-between w-[calc(100%-1.5rem)] max-w-sm px-3 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-lg shadow-2xl shadow-black/80 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))]"
        aria-label="Mobile Navigation"
      >
        {NAV_LINKS.map((link) => {
          const isActive = activeSection === link.id;
          return (
            <a
              key={link.id}
              href={link.href}
              className={`px-2.5 py-1.5 rounded-full text-xs font-medium transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
                isActive
                  ? 'bg-white/15 text-white font-semibold'
                  : 'text-[var(--muted)] hover:text-[var(--text)]'
              }`}
            >
              {link.label}
            </a>
          );
        })}

        {/* Cmd+K trigger on mobile */}
        <button
          type="button"
          onClick={openCommandPalette}
          aria-label="Open command palette"
          className="p-2 rounded-full text-[var(--muted)] hover:text-[var(--text)] hover:bg-white/5 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
        >
          <Search className="w-4 h-4" aria-hidden="true" />
        </button>

        {/* Résumé button on mobile */}
        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download résumé"
          className="p-2 rounded-full text-[var(--accent)] hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <FileText className="w-4 h-4" aria-hidden="true" />
        </a>
      </nav>
    </>
  );
}

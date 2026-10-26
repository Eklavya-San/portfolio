import { useEffect, useState } from 'react';
import { Search, FileText, ArrowRight } from 'lucide-react';

interface NavProps {
  resumeUrl?: string;
}

const NAV_LINKS = [
  { id: 'work', label: 'Work', href: '/#work' },
  { id: 'workshop', label: 'Workshop', href: '/#workshop' },
  { id: 'experience', label: 'Experience', href: '/#experience' },
  { id: 'skills', label: 'Skills', href: '/#skills' },
] as const;

export function Nav({ resumeUrl = '/Eklavya_Ghodake_Resume.pdf' }: NavProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMac, setIsMac] = useState<boolean>(true);

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform || navigator.userAgent));
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Scrollspy calculation
      const sectionIds = ['work', 'workshop', 'experience', 'skills', 'contact'];
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
      {/* Desktop & Tablet Top Nav */}
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 w-[calc(100%-2rem)] max-w-4xl ${
          isScrolled ? 'top-3' : 'top-5'
        }`}
      >
        <nav
          aria-label="Main Navigation"
          className="flex items-center justify-between px-3.5 sm:px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-md shadow-lg shadow-black/30 transition-all duration-200"
        >
          {/* Brand Identity / Home Link */}
          <a
            href="/"
            className="flex items-center gap-2 group px-2 py-1 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            aria-label="claudya.in Home"
          >
            <span
              className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] group-hover:scale-125 transition-transform duration-200 shadow-[0_0_8px_var(--accent)]"
              aria-hidden="true"
            />
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-tight text-[var(--text)] group-hover:text-white transition-colors">
              claudya.in
            </span>
          </a>

          {/* Center Navigation Links (Hidden on small mobile) */}
          <div className="hidden md:flex items-center gap-1" role="menubar">
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
            aria-label={`${isMac ? 'Cmd+K' : 'Ctrl+K'}: Open Command Palette`}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs text-[var(--muted)] hover:text-[var(--text)] bg-[var(--surface-hover)] border border-[var(--border-subtle)] hover:border-[var(--border)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-[var(--muted)]" aria-hidden="true" />
            <span className="sr-only sm:not-sr-only text-[11px] font-mono text-[var(--muted-dark)]">
              {isMac ? 'Cmd+K' : 'Ctrl+K'}
            </span>
            <kbd aria-hidden="true" className="hidden font-mono text-[10px] px-1 py-0.2 rounded bg-black/50 text-[var(--muted)] border border-white/10">
              {isMac ? '⌘K' : 'Ctrl+K'}
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

        {/* Résumé button on mobile with accessible text */}
        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download résumé"
          className="p-2 rounded-full text-[var(--accent)] hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <FileText className="w-4 h-4" aria-hidden="true" />
          <span className="sr-only">Résumé</span>
        </a>
      </nav>
    </>
  );
}

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { getInitialTheme, toggleTheme, type Theme } from '../lib/theme';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const [theme, setLocalTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setLocalTheme(getInitialTheme());
    setMounted(true);

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ theme: Theme }>;
      if (customEvent.detail?.theme) {
        setLocalTheme(customEvent.detail.theme);
      } else {
        setLocalTheme(getInitialTheme());
      }
    };

    window.addEventListener('theme-change', handleThemeChange);
    return () => window.removeEventListener('theme-change', handleThemeChange);
  }, []);

  const handleToggle = () => {
    const next = toggleTheme();
    setLocalTheme(next);
  };

  const isLight = mounted && theme === 'light';
  const label = isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode';

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center gap-1.5 p-2 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-hover)] hover:border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer ${className}`}
    >
      {isLight ? (
        <Moon className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20 transition-transform duration-200" aria-hidden="true" />
      ) : (
        <Sun className="w-3.5 h-3.5 text-amber-400 transition-transform duration-200" aria-hidden="true" />
      )}
      {showLabel && (
        <span className="text-xs font-mono text-[var(--muted)]">
          {isLight ? 'Dark' : 'Light'}
        </span>
      )}
      <span className="sr-only">{label}</span>
    </button>
  );
}

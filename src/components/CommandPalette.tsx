import { useEffect, useState, useMemo, useRef, type ReactNode, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  Search,
  FileText,
  Briefcase,
  Layers,
  Cpu,
  Mail,
  Copy,
  Check,
  ExternalLink,
  X,
  Command,
} from 'lucide-react';
import { profileLinks } from '../data/profile';

interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Actions' | 'Social';
  description?: string;
  icon: ReactNode;
  keywords?: string[];
  action: () => void;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Close palette and optionally navigate
  const handleSelect = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  const copyEmail = async () => {
    const email = 'eklavyaghodake@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
      }, 900);
    } catch {
      // Fallback
      window.location.href = `mailto:${email}`;
      setIsOpen(false);
    }
  };

  const items: CommandItem[] = useMemo(
    () => [
      {
        id: 'nav-work',
        title: 'Work & Flagships',
        category: 'Navigation',
        description: 'MachineWise, MQTT-GO, and CTQ Extraction',
        keywords: ['flagship', 'projects', 'cases', 'machinewise', 'mqttgo', 'ctq'],
        icon: <Layers className="w-4 h-4 text-[var(--accent)]" />,
        action: () => {
          window.location.hash = '#work';
        },
      },
      {
        id: 'nav-experience',
        title: 'Experience & Talks',
        category: 'Navigation',
        description: 'Career history at Yantramedhavi & industry conferences',
        keywords: ['jobs', 'history', 'lead', 'sde', 'talks', 'imtex'],
        icon: <Briefcase className="w-4 h-4 text-[var(--accent-2)]" />,
        action: () => {
          window.location.hash = '#experience';
        },
      },
      {
        id: 'nav-skills',
        title: 'Technical Skills',
        category: 'Navigation',
        description: 'Languages, distributed systems, IoT, and AI tooling',
        keywords: ['technologies', 'stack', 'languages', 'go', 'python', 'mqtt'],
        icon: <Cpu className="w-4 h-4 text-emerald-400" />,
        action: () => {
          window.location.hash = '#skills';
        },
      },
      {
        id: 'nav-contact',
        title: 'Contact',
        category: 'Navigation',
        description: 'Send a message or get in touch directly',
        keywords: ['email', 'reach', 'message', 'touch'],
        icon: <Mail className="w-4 h-4 text-cyan-400" />,
        action: () => {
          window.location.hash = '#contact';
        },
      },
      {
        id: 'action-resume',
        title: 'Open Résumé (PDF)',
        category: 'Actions',
        description: 'Download or view verified curriculum vitae',
        keywords: ['cv', 'resume', 'pdf', 'hire', 'bio'],
        icon: <FileText className="w-4 h-4 text-[var(--text)]" />,
        action: () => {
          window.open('/Eklavya_Ghodake_Resume.pdf', '_blank', 'noopener,noreferrer');
        },
      },
      {
        id: 'action-email',
        title: copied ? 'Email Copied!' : 'Copy Email Address',
        category: 'Actions',
        description: 'eklavyaghodake@gmail.com',
        keywords: ['copy', 'email', 'clipboard', 'address'],
        icon: copied ? (
          <Check className="w-4 h-4 text-[var(--accent)]" />
        ) : (
          <Copy className="w-4 h-4 text-[var(--muted)]" />
        ),
        action: copyEmail,
      },
      {
        id: 'social-github',
        title: 'GitHub Profile',
        category: 'Social',
        description: 'Eklavya-San (repositories & open-source work)',
        keywords: ['code', 'repo', 'git', 'profile', 'oss'],
        icon: <ExternalLink className="w-4 h-4 text-[var(--muted)]" />,
        action: () => {
          window.open(profileLinks.github, '_blank', 'noopener,noreferrer');
        },
      },
      {
        id: 'social-linkedin',
        title: 'LinkedIn Profile',
        category: 'Social',
        description: 'Connect on professional network',
        keywords: ['connect', 'network', 'linkedin'],
        icon: <ExternalLink className="w-4 h-4 text-[var(--muted)]" />,
        action: () => {
          const url = profileLinks.linkedin.startsWith('http')
            ? profileLinks.linkedin
            : 'https://www.linkedin.com/search/results/all/?keywords=Eklavya%20Ghodake';
          window.open(url, '_blank', 'noopener,noreferrer');
        },
      },
      {
        id: 'social-x',
        title: 'X / Twitter Profile',
        category: 'Social',
        description: '@eghodake',
        keywords: ['twitter', 'x', 'social', 'updates'],
        icon: <ExternalLink className="w-4 h-4 text-[var(--muted)]" />,
        action: () => {
          window.open(profileLinks.x, '_blank', 'noopener,noreferrer');
        },
      },
    ],
    [copied]
  );

  // Filter items by search query
  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase().trim();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.keywords?.some((k) => k.toLowerCase().includes(q))
    );
  }, [items, query]);

  // Keep selectedIndex in bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Handle global shortcuts & custom events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, []);

  // Keyboard navigation inside palette
  const handleInputKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (filteredItems.length ? (prev + 1) % filteredItems.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        filteredItems.length ? (prev - 1 + filteredItems.length) % filteredItems.length : 0
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex].action);
      }
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector<HTMLElement>('[data-selected="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 animate-in fade-in duration-150" />
        <Dialog.Content
          className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] shadow-2xl z-50 overflow-hidden outline-none animate-in fade-in zoom-in-95 duration-150"
          aria-describedby="palette-description"
        >
          <Dialog.Title className="sr-only">Command Palette Navigation</Dialog.Title>
          <Dialog.Description id="palette-description" className="sr-only">
            Search commands, jump to sections, or open external profiles
          </Dialog.Description>

          {/* Search Header */}
          <div className="flex items-center px-4 py-3.5 border-b border-[var(--border)] bg-[var(--surface)]">
            <Search className="w-4 h-4 text-[var(--muted)] shrink-0 mr-3" aria-hidden="true" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Type a command or search sections..."
              className="w-full bg-transparent text-sm text-[var(--text)] placeholder-[var(--muted)] outline-none"
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1 rounded text-[var(--muted)] hover:text-white"
                aria-label="Clear search query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono bg-black/40 text-[var(--muted)] border border-white/5 ml-2">
              ESC
            </kbd>
          </div>

          {/* List of items */}
          <ul
            ref={listRef}
            role="listbox"
            aria-label="Commands"
            className="max-h-72 overflow-y-auto p-2 space-y-1 outline-none"
          >
            {filteredItems.length === 0 ? (
              <li className="px-4 py-8 text-center text-xs text-[var(--muted)]">
                No commands matching &ldquo;{query}&rdquo;
              </li>
            ) : (
              filteredItems.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <li
                    key={item.id}
                    id={item.id}
                    role="option"
                    aria-selected={isSelected}
                    data-selected={isSelected}
                    onClick={() => handleSelect(item.action)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-white/10 text-white'
                        : 'text-[var(--text)] hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`p-1.5 rounded-lg border ${
                          isSelected
                            ? 'bg-white/10 border-white/20'
                            : 'bg-black/30 border-[var(--border-subtle)]'
                        }`}
                      >
                        {item.icon}
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-medium truncate flex items-center gap-2">
                          <span>{item.title}</span>
                          {item.category === 'Navigation' && (
                            <span className="text-[10px] font-mono text-[var(--muted-dark)] uppercase">
                              Jump
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <div className="text-[11px] text-[var(--muted)] truncate">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </div>
                    {isSelected && (
                      <kbd className="text-[10px] font-mono text-[var(--muted)] hidden sm:block">
                        ↵ Enter
                      </kbd>
                    )}
                  </li>
                );
              })
            )}
          </ul>

          {/* Footer Shortcuts */}
          <div className="px-4 py-2 border-t border-[var(--border-subtle)] bg-black/40 flex items-center justify-between text-[11px] font-mono text-[var(--muted)]">
            <div className="flex items-center gap-3">
              <span>
                <kbd className="px-1 py-0.5 rounded bg-white/5 border border-white/10">↑</kbd>{' '}
                <kbd className="px-1 py-0.5 rounded bg-white/5 border border-white/10">↓</kbd>{' '}
                navigate
              </span>
              <span>
                <kbd className="px-1 py-0.5 rounded bg-white/5 border border-white/10">↵</kbd> select
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Command className="w-3 h-3 text-[var(--accent)]" />
              <span>claudya.in</span>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

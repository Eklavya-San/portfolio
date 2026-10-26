import { useState, useEffect, useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import type { Flagship } from '../types/portfolio';
import { FlagshipCard } from './FlagshipCard';
import { CaseStudyView } from './CaseStudyView';

interface FlagshipSectionProps {
  flagships: Flagship[];
}

export function FlagshipSection({ flagships }: FlagshipSectionProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openedFromHome, setOpenedFromHome] = useState<boolean>(false);
  const lastTriggerRef = useRef<HTMLElement | null>(null);
  const defaultTitleRef = useRef<string>('');

  useEffect(() => {
    defaultTitleRef.current = document.title || 'Eklavya Ghodake | Software R&D Lead — claudya.in';

    // Handle initial load if user entered via a path (e.g. client router or hydration)
    const checkCurrentRoute = () => {
      const path = window.location.pathname;
      const match = path.match(/^\/work\/([a-z0-9-]+)\/?$/);
      if (match) {
        const slug = match[1];
        const matchItem = flagships.find((f) => f.slug === slug);
        if (matchItem) {
          setActiveSlug(slug);
          setIsOpen(true);
          setOpenedFromHome(false);
          document.title = `${matchItem.title} — Case Study | Eklavya Ghodake`;
        }
      }
    };

    checkCurrentRoute();

    // Listen for browser Back/Forward navigation
    const handlePopState = () => {
      const path = window.location.pathname;
      const match = path.match(/^\/work\/([a-z0-9-]+)\/?$/);

      if (match) {
        const slug = match[1];
        const matchItem = flagships.find((f) => f.slug === slug);
        if (matchItem) {
          setActiveSlug(slug);
          setIsOpen(true);
          document.title = `${matchItem.title} — Case Study | Eklavya Ghodake`;
          return;
        }
      }

      // If user navigated away from /work/* (e.g. back to /), close overlay
      setIsOpen(false);
      setActiveSlug(null);
      if (defaultTitleRef.current) {
        document.title = defaultTitleRef.current;
      }

      // Restore focus to last active card trigger
      if (lastTriggerRef.current) {
        lastTriggerRef.current.focus();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [flagships]);

  const handleOpenOverlay = (slug: string, triggerEl: HTMLElement) => {
    lastTriggerRef.current = triggerEl;
    setActiveSlug(slug);
    setIsOpen(true);
    setOpenedFromHome(true);

    const project = flagships.find((f) => f.slug === slug);
    if (project) {
      document.title = `${project.title} — Case Study | Eklavya Ghodake`;
    }

    // Push new history state
    window.history.pushState({ modal: slug }, '', `/work/${slug}`);
  };

  const handleCloseOverlay = () => {
    if (openedFromHome && window.location.pathname.startsWith('/work/')) {
      // Trigger history.back() which will cleanly popstate back to /
      window.history.back();
    } else {
      setIsOpen(false);
      setActiveSlug(null);
      if (window.location.pathname.startsWith('/work/')) {
        window.history.pushState(null, '', '/#work');
      }
      if (defaultTitleRef.current) {
        document.title = defaultTitleRef.current;
      }
      if (lastTriggerRef.current) {
        lastTriggerRef.current.focus();
      }
    }
  };

  const activeFlagship = flagships.find((f) => f.slug === activeSlug);

  return (
    <div className="space-y-6">
      {/* 3 Flagship Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {flagships.map((project) => (
          <FlagshipCard
            key={project.slug}
            flagship={project}
            onOpenOverlay={handleOpenOverlay}
          />
        ))}
      </div>

      {/* Accessible Radix Dialog Modal */}
      <Dialog.Root
        open={isOpen && !!activeFlagship}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseOverlay();
          }
        }}
      >
        <Dialog.Portal>
          {/* Backdrop with Obsidian Blur */}
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md transition-all duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

          {/* Modal Container with Scroll Lock & Focus Trap */}
          <Dialog.Content
            className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex items-start justify-center outline-none"
            aria-describedby="case-study-description"
          >
            {activeFlagship && (
              <div className="w-full max-w-4xl my-auto rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 md:p-10 shadow-2xl transition-all duration-300 relative focus:outline-none">
                <Dialog.Title className="sr-only">
                  {activeFlagship.title} Case Study
                </Dialog.Title>
                <Dialog.Description id="case-study-description" className="sr-only">
                  {activeFlagship.tagline}
                </Dialog.Description>

                <CaseStudyView
                  flagship={activeFlagship}
                  isStandalone={false}
                  onClose={handleCloseOverlay}
                />
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
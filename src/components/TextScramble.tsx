import { useEffect, useState, useRef, useCallback } from 'react';

interface TextScrambleProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div' | 'p';
  hoverTrigger?: boolean;
  delay?: number;
  glyphs?: string;
}

const DEFAULT_GLYPHS = '01<>/\\|#*+=~⌖⏥';

export function TextScramble({
  text,
  className = '',
  as: Component = 'span',
  hoverTrigger = true,
  delay = 0,
  glyphs = DEFAULT_GLYPHS,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState<string>(text);
  const isReducedMotion = useRef<boolean>(false);
  const animFrameRef = useRef<number | null>(null);
  const isAnimatingRef = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      isReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  }, []);

  const scramble = useCallback(() => {
    if (isReducedMotion.current) {
      setDisplayText(text);
      return;
    }

    if (isAnimatingRef.current && animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    isAnimatingRef.current = true;
    let frame = 0;
    const totalFrames = Math.max(16, text.length * 2.2);

    const step = () => {
      const revealCount = Math.floor((frame / totalFrames) * text.length);
      let output = '';

      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === ' ') {
          output += ' ';
        } else if (i < revealCount) {
          output += char;
        } else {
          output += glyphs[Math.floor(Math.random() * glyphs.length)];
        }
      }

      setDisplayText(output);

      if (frame < totalFrames) {
        frame += 1;
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setDisplayText(text);
        isAnimatingRef.current = false;
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  }, [text, glyphs]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (delay > 0) {
      timer = setTimeout(() => {
        scramble();
      }, delay);
    } else {
      scramble();
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [scramble, delay]);

  const handleMouseEnter = () => {
    if (hoverTrigger && !isAnimatingRef.current) {
      scramble();
    }
  };

  return (
    <Component
      className={className}
      onMouseEnter={handleMouseEnter}
      aria-label={text}
      data-text={text}
    >
      {displayText}
    </Component>
  );
}

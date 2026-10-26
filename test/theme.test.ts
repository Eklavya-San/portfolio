import { describe, it, expect, beforeEach, beforeAll, afterAll } from 'vitest';
import { getInitialTheme, setTheme, toggleTheme } from '../src/lib/theme';

describe('Theme State and Toggle Invariants', () => {
  let mockStorage: Record<string, string> = {};
  const mockClassList = new Set<string>();

  const originalWindow = globalThis.window;
  const originalDocument = globalThis.document;
  const originalLocalStorage = globalThis.localStorage;

  beforeAll(() => {
    // @ts-ignore
    globalThis.localStorage = {
      getItem: (key: string) => mockStorage[key] || null,
      setItem: (key: string, val: string) => {
        mockStorage[key] = val;
      },
      removeItem: (key: string) => {
        delete mockStorage[key];
      },
      clear: () => {
        mockStorage = {};
      },
    };

    // @ts-ignore
    globalThis.document = {
      documentElement: {
        classList: {
          contains: (cls: string) => mockClassList.has(cls),
          add: (cls: string) => mockClassList.add(cls),
          remove: (cls: string) => mockClassList.delete(cls),
        } as unknown as DOMTokenList,
      } as unknown as HTMLElement,
    } as unknown as Document;

    // @ts-ignore
    globalThis.window = {
      dispatchEvent: () => true,
      addEventListener: () => {},
      removeEventListener: () => {},
    };
  });

  afterAll(() => {
    globalThis.window = originalWindow;
    globalThis.document = originalDocument;
    globalThis.localStorage = originalLocalStorage;
  });

  beforeEach(() => {
    mockStorage = {};
    mockClassList.clear();
  });

  it('defaults to dark mode when no preference is stored', () => {
    const theme = getInitialTheme();
    expect(theme).toBe('dark');
  });

  it('sets light theme and updates document classes and storage', () => {
    setTheme('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
    expect(getInitialTheme()).toBe('light');
  });

  it('sets dark theme and updates document classes and storage', () => {
    setTheme('light');
    setTheme('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.classList.contains('light')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(getInitialTheme()).toBe('dark');
  });

  it('toggles seamlessly between dark and light modes', () => {
    expect(getInitialTheme()).toBe('dark');
    const firstToggle = toggleTheme();
    expect(firstToggle).toBe('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);

    const secondToggle = toggleTheme();
    expect(secondToggle).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});

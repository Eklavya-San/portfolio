import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  mergeWorkshopRepos,
  fetchGitHubRepos,
  getWorkshopProjects,
  type GitHubRepo,
} from '../src/lib/github';
import type { WorkshopOverride } from '../src/types/portfolio';

describe('mergeWorkshopRepos', () => {
  const sampleGitHubRepos: GitHubRepo[] = [
    {
      name: 'repo-alpha',
      full_name: 'Eklavya-San/repo-alpha',
      html_url: 'https://github.com/Eklavya-San/repo-alpha',
      description: 'GitHub description for alpha',
      fork: false,
      private: false,
      language: 'TypeScript',
      topics: ['ai', 'agents'],
      pushed_at: '2026-10-20T10:00:00Z',
      stargazers_count: 12,
      homepage: 'https://alpha.example.com',
    },
    {
      name: 'repo-beta',
      full_name: 'Eklavya-San/repo-beta',
      html_url: 'https://github.com/Eklavya-San/repo-beta',
      description: 'GitHub description for beta',
      fork: false,
      private: false,
      language: 'Go',
      topics: ['iot', 'mqtt'],
      pushed_at: '2026-10-22T14:30:00Z',
      stargazers_count: 45,
      homepage: null,
    },
    {
      name: 'repo-forked',
      full_name: 'Eklavya-San/repo-forked',
      html_url: 'https://github.com/Eklavya-San/repo-forked',
      description: 'Forked repository',
      fork: true,
      private: false,
      language: 'C++',
      topics: [],
      pushed_at: '2026-10-15T08:00:00Z',
      stargazers_count: 1,
    },
    {
      name: 'repo-private',
      full_name: 'Eklavya-San/repo-private',
      html_url: 'https://github.com/Eklavya-San/repo-private',
      description: 'Private repository',
      fork: false,
      private: true,
      language: 'Python',
      topics: ['secret'],
      pushed_at: '2026-10-25T12:00:00Z',
      stargazers_count: 0,
    },
    {
      name: 'repo-unrelated',
      full_name: 'Eklavya-San/repo-unrelated',
      html_url: 'https://github.com/Eklavya-San/repo-unrelated',
      description: 'Unrelated repo not in overrides',
      fork: false,
      private: false,
      language: 'Rust',
      topics: [],
      pushed_at: '2026-10-18T09:00:00Z',
      stargazers_count: 3,
    },
  ];

  it('enforces override precedence over GitHub repo fields', () => {
    const overrides: WorkshopOverride[] = [
      {
        repo: 'repo-alpha',
        title: 'Custom Alpha Title',
        tagline: 'Custom curated tagline for alpha',
        tags: ['Custom Tag A', 'Custom Tag B'],
        stack: ['React', 'Tailwind'],
        description: 'Curated description for alpha',
        demoUrl: 'https://custom-demo.com',
      },
    ];

    const cards = mergeWorkshopRepos(overrides, sampleGitHubRepos);

    expect(cards).toHaveLength(1);
    const card = cards[0];
    // Overrides win
    expect(card.title).toBe('Custom Alpha Title');
    expect(card.tagline).toBe('Custom curated tagline for alpha');
    expect(card.tags).toEqual(['Custom Tag A', 'Custom Tag B']);
    expect(card.stack).toEqual(['React', 'Tailwind']);
    expect(card.description).toBe('Curated description for alpha');
    expect(card.demoUrl).toBe('https://custom-demo.com');
    // GitHub supplies metadata
    expect(card.repoUrl).toBe('https://github.com/Eklavya-San/repo-alpha');
    expect(card.pushedAt).toBe('2026-10-20T10:00:00Z');
    expect(card.stars).toBe(12);
  });

  it('preserves the display order defined in overrides', () => {
    const overrides: WorkshopOverride[] = [
      { repo: 'repo-beta', tagline: 'Beta tagline' },
      { repo: 'repo-alpha', tagline: 'Alpha tagline' },
    ];

    const cards = mergeWorkshopRepos(overrides, sampleGitHubRepos);

    expect(cards).toHaveLength(2);
    expect(cards[0].repo).toBe('repo-beta');
    expect(cards[1].repo).toBe('repo-alpha');
  });

  it('uses GitHub metadata as fallbacks when overrides omit optional fields', () => {
    const overrides: WorkshopOverride[] = [
      {
        repo: 'repo-beta',
        tagline: 'Beta tagline',
      },
    ];

    const cards = mergeWorkshopRepos(overrides, sampleGitHubRepos);

    expect(cards).toHaveLength(1);
    const card = cards[0];
    expect(card.title).toBe('repo-beta'); // fallback to repo name
    expect(card.description).toBe('GitHub description for beta'); // fallback description
    expect(card.tags).toEqual(['iot', 'mqtt']); // fallback from topics
    expect(card.stack).toEqual(['Go']); // fallback from language
    expect(card.stars).toBe(45);
    expect(card.demoUrl).toBeUndefined(); // null homepage converted to undefined
  });

  it('excludes repositories marked as forks', () => {
    const overrides: WorkshopOverride[] = [
      { repo: 'repo-forked', tagline: 'Forked repo tagline' },
    ];

    const cards = mergeWorkshopRepos(overrides, sampleGitHubRepos);

    expect(cards).toHaveLength(0);
  });

  it('excludes private repositories', () => {
    const overrides: WorkshopOverride[] = [
      { repo: 'repo-private', tagline: 'Private repo tagline' },
    ];

    const cards = mergeWorkshopRepos(overrides, sampleGitHubRepos);

    expect(cards).toHaveLength(0);
  });

  it('excludes repositories from GitHub that do not appear in overrides', () => {
    const overrides: WorkshopOverride[] = [
      { repo: 'repo-alpha', tagline: 'Alpha tagline' },
    ];

    const cards = mergeWorkshopRepos(overrides, sampleGitHubRepos);

    expect(cards).toHaveLength(1);
    expect(cards.find((c) => c.repo === 'repo-unrelated')).toBeUndefined();
  });

  it('drops cards with missing, empty, or whitespace-only taglines and logs warning', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const overrides: WorkshopOverride[] = [
      { repo: 'repo-alpha', tagline: 'Valid tagline' },
      { repo: 'repo-beta', tagline: '' },
      { repo: 'repo-beta', tagline: '   ' },
      { repo: 'repo-beta' }, // undefined tagline
    ];

    const cards = mergeWorkshopRepos(overrides, sampleGitHubRepos);

    expect(cards).toHaveLength(1);
    expect(cards[0].repo).toBe('repo-alpha');
    expect(warnSpy).toHaveBeenCalled();

    warnSpy.mockRestore();
  });

  it('matches repository names case-insensitively', () => {
    const overrides: WorkshopOverride[] = [
      { repo: 'REPO-ALPHA', tagline: 'Alpha tagline' },
    ];

    const cards = mergeWorkshopRepos(overrides, sampleGitHubRepos);

    expect(cards).toHaveLength(1);
    expect(cards[0].repo).toBe('REPO-ALPHA');
    expect(cards[0].stars).toBe(12);
  });

  describe('fallback mode when GitHub API returns empty array', () => {
    it('falls back entirely to overrides without failing', () => {
      const overrides: WorkshopOverride[] = [
        {
          repo: 'repo-alpha',
          title: 'Curated Alpha',
          tagline: 'Alpha tagline',
          tags: ['AI'],
          stack: ['Python'],
          description: 'Offline description',
          demoUrl: 'https://demo.example.com',
        },
        {
          repo: 'repo-beta',
          tagline: 'Beta tagline',
        },
      ];

      const cards = mergeWorkshopRepos(overrides, []);

      expect(cards).toHaveLength(2);
      expect(cards[0].repo).toBe('repo-alpha');
      expect(cards[0].title).toBe('Curated Alpha');
      expect(cards[0].tagline).toBe('Alpha tagline');
      expect(cards[0].tags).toEqual(['AI']);
      expect(cards[0].stack).toEqual(['Python']);
      expect(cards[0].repoUrl).toBe('https://github.com/Eklavya-San/repo-alpha');

      expect(cards[1].repo).toBe('repo-beta');
      expect(cards[1].title).toBe('repo-beta');
      expect(cards[1].tagline).toBe('Beta tagline');
    });

    it('drops cards with invalid taglines even in fallback mode', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const overrides: WorkshopOverride[] = [
        { repo: 'valid-repo', tagline: 'Valid tagline' },
        { repo: 'invalid-repo', tagline: '' },
      ];

      const cards = mergeWorkshopRepos(overrides, []);

      expect(cards).toHaveLength(1);
      expect(cards[0].repo).toBe('valid-repo');
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Dropping card for repo "invalid-repo"')
      );

      warnSpy.mockRestore();
    });
  });
});

describe('fetchGitHubRepos', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('returns parsed repository array on HTTP 200', async () => {
    const mockData: GitHubRepo[] = [
      { name: 'test-repo', fork: false, private: false },
    ];

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockData,
    } as Response);

    const repos = await fetchGitHubRepos('testuser');

    expect(repos).toEqual(mockData);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'https://api.github.com/users/testuser/repos?per_page=100',
      expect.objectContaining({
        headers: expect.objectContaining({
          Accept: 'application/vnd.github.v3+json',
        }),
      })
    );
  });

  it('includes Authorization header when token is supplied', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => [],
    } as Response);

    await fetchGitHubRepos('testuser', 'ghp_secret_token');

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer ghp_secret_token',
        }),
      })
    );
  });

  it('returns [] on HTTP 403 rate limit without throwing', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 403,
      statusText: 'Forbidden (rate limit exceeded)',
      json: async () => ({ message: 'API rate limit exceeded' }),
    } as Response);

    const repos = await fetchGitHubRepos('testuser');

    expect(repos).toEqual([]);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Failed to fetch repos for testuser: HTTP 403')
    );

    warnSpy.mockRestore();
  });

  it('returns [] on HTTP 500 server error without throwing', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    } as Response);

    const repos = await fetchGitHubRepos('testuser');

    expect(repos).toEqual([]);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('HTTP 500')
    );

    warnSpy.mockRestore();
  });

  it('returns [] when response payload is not an array', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ error: 'something unexpected' }),
    } as Response);

    const repos = await fetchGitHubRepos('testuser');

    expect(repos).toEqual([]);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Expected array of repos')
    );

    warnSpy.mockRestore();
  });

  it('returns [] when fetch rejects with a network error', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network offline or ENOTFOUND'));

    const repos = await fetchGitHubRepos('testuser');

    expect(repos).toEqual([]);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Network offline or ENOTFOUND')
    );

    warnSpy.mockRestore();
  });
});

describe('getWorkshopProjects', () => {
  it('loads and merges workshop projects at build time', async () => {
    const projects = await getWorkshopProjects();
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);

    for (const project of projects) {
      expect(project.repo).toBeDefined();
      expect(project.title).toBeDefined();
      expect(typeof project.tagline).toBe('string');
      expect(project.tagline.trim().length).toBeGreaterThan(0);
      expect(Array.isArray(project.tags)).toBe(true);
      expect(Array.isArray(project.stack)).toBe(true);
      expect(project.repoUrl).toMatch(/^https:\/\/github\.com\//);
    }
  });
});

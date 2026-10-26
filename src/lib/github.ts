import type { WorkshopCard, WorkshopOverride } from '../types/portfolio';
import { workshopOverrides } from '../data/workshop.overrides';

export interface GitHubRepo {
  name: string;
  full_name?: string;
  html_url?: string;
  description?: string | null;
  fork: boolean;
  private: boolean;
  language?: string | null;
  topics?: string[];
  pushed_at?: string;
  stargazers_count?: number;
  homepage?: string | null;
}

/**
 * Pure merge function combining curated overrides with raw GitHub repository metadata.
 *
 * Rules:
 * 1. Filter out forks (`repo.fork === true`) and private repos (`repo.private === true`).
 * 2. Keep only public, non-fork repos matching an override in `workshopOverrides`.
 * 3. Overrides win for title, tagline, tags, stack, and display order.
 * 4. GitHub supplies fallback description, language, topics, pushed_at, and metadata.
 * 5. Drop any card that has no tagline after merge (or has empty tagline) and log a warning.
 * 6. If `githubRepos` is empty (API failure/offline fallback), fall back entirely to overrides.
 */
export function mergeWorkshopRepos(
  overrides: (WorkshopOverride | WorkshopCard)[],
  githubRepos: GitHubRepo[] = []
): WorkshopCard[] {
  const isFallback = githubRepos.length === 0;

  // Index eligible public non-fork GitHub repos by lowercase name
  const repoMap = new Map<string, GitHubRepo>();
  if (!isFallback) {
    for (const repo of githubRepos) {
      if (!repo.fork && !repo.private) {
        repoMap.set(repo.name.toLowerCase(), repo);
      }
    }
  }

  const cards: WorkshopCard[] = [];

  for (const override of overrides) {
    const rawTagline = override.tagline?.trim();
    if (!rawTagline) {
      console.warn(`[workshop] Dropping card for repo "${override.repo}": missing or empty tagline`);
      continue;
    }

    if (isFallback) {
      // Fallback path: use overrides directly so build never fails
      cards.push({
        repo: override.repo,
        title: override.title || override.repo,
        tagline: rawTagline,
        tags: override.tags && override.tags.length > 0 ? override.tags : [],
        stack: override.stack && override.stack.length > 0 ? override.stack : [],
        demoUrl: override.demoUrl,
        description: override.description,
        repoUrl: override.repoUrl || `https://github.com/Eklavya-San/${override.repo}`,
        pushedAt: override.pushedAt,
        language: override.language,
        topics: override.topics || [],
        stars: override.stars ?? 0,
      });
      continue;
    }

    // Match against public non-fork repos
    const ghRepo = repoMap.get(override.repo.toLowerCase());
    if (!ghRepo) {
      // Excluded: not found in public non-fork GitHub repos
      continue;
    }

    // Overrides win for title, tagline, tags, stack, order;
    // GitHub supplies fallback description, language, topics, pushed_at
    const title = override.title || ghRepo.name || override.repo;
    const tags = override.tags && override.tags.length > 0
      ? override.tags
      : (ghRepo.topics && ghRepo.topics.length > 0 ? ghRepo.topics : []);
    const stack = override.stack && override.stack.length > 0
      ? override.stack
      : (ghRepo.language ? [ghRepo.language] : []);
    const description = override.description || ghRepo.description || undefined;
    const repoUrl = override.repoUrl || ghRepo.html_url || `https://github.com/Eklavya-San/${ghRepo.name}`;
    const demoUrl = override.demoUrl || (ghRepo.homepage ? ghRepo.homepage : undefined);
    const pushedAt = ghRepo.pushed_at || override.pushedAt;
    const language = ghRepo.language || override.language;
    const topics = ghRepo.topics && ghRepo.topics.length > 0 ? ghRepo.topics : (override.topics || []);
    const stars = ghRepo.stargazers_count ?? override.stars ?? 0;

    cards.push({
      repo: override.repo,
      title,
      tagline: rawTagline,
      tags,
      stack,
      demoUrl,
      description,
      repoUrl,
      pushedAt,
      language: language ?? undefined,
      topics,
      stars,
    });
  }

  return cards;
}

/**
 * Fetches public repositories for a given GitHub username.
 * Gracefully catches all errors, rate limits, and network issues, returning []
 * so the build never fails.
 */
export async function fetchGitHubRepos(
  username: string = 'Eklavya-San',
  token?: string
): Promise<GitHubRepo[]> {
  const url = `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100`;
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'claudya-portfolio-build',
  };

  const authToken = token || (typeof process !== 'undefined' ? process.env?.GITHUB_TOKEN || process.env?.GH_TOKEN : undefined);
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  try {
    const timeoutSignal = typeof AbortSignal !== 'undefined' && 'timeout' in AbortSignal
      ? AbortSignal.timeout(8000)
      : undefined;

    const response = await fetch(url, {
      headers,
      signal: timeoutSignal,
    });

    if (!response.ok) {
      console.warn(
        `[github] Failed to fetch repos for ${username}: HTTP ${response.status} ${response.statusText}`
      );
      return [];
    }

    const data = (await response.json()) as unknown;
    if (!Array.isArray(data)) {
      console.warn(
        `[github] Expected array of repos for ${username}, received: ${typeof data}`
      );
      return [];
    }

    return data as GitHubRepo[];
  } catch (error) {
    console.warn(
      `[github] Error fetching repos for ${username}: ${error instanceof Error ? error.message : String(error)}`
    );
    return [];
  }
}

/**
 * Build-time loader resolving workshop projects with overrides and GitHub metadata.
 */
export async function getWorkshopProjects(): Promise<WorkshopCard[]> {
  const username = (typeof process !== 'undefined' ? process.env?.GITHUB_USERNAME : undefined) || 'Eklavya-San';
  const token = typeof process !== 'undefined' ? process.env?.GITHUB_TOKEN || process.env?.GH_TOKEN : undefined;
  const repos = await fetchGitHubRepos(username, token);
  return mergeWorkshopRepos(workshopOverrides, repos);
}

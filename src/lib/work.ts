import { flagships } from '../data/flagships';
import type { Flagship } from '../types/portfolio';

export interface WorkStaticPath {
  params: { slug: string };
  props: { flagship: Flagship };
}

export function getWorkStaticPaths(): WorkStaticPath[] {
  return flagships.map((flagship) => ({
    params: { slug: flagship.slug },
    props: { flagship },
  }));
}

export function matchWorkRoute(path: string): Flagship | null {
  const match = path.match(/^\/work\/([a-z0-9-]+)\/?$/);
  if (!match) return null;
  const slug = match[1];
  return flagships.find((f) => f.slug === slug) ?? null;
}

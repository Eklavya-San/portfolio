import { profile } from '../data/profile';
import type { Profile } from '../types/portfolio';

/**
 * Pure helper verifying whether the YouTube community channel is confirmed
 * and not marked as a pending TODO.
 */
export function checkYoutubeConfirmed(prof: Profile = profile): boolean {
  const hasYoutubeLink = Boolean(prof.links?.youtube) && !prof.links.youtube.startsWith('TODO');
  const hasPendingTodo = prof.todos?.some((t) => t.toLowerCase().includes('youtube')) ?? false;
  return hasYoutubeLink && !hasPendingTodo;
}

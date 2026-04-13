/**
 * Podcast code rules. Episode publish date will come from CMS/backend later.
 * When `PODCAST_CODE_EPISODE_PUBLISHED_AT_ISO` is set, codes are only accepted
 * within 7 days of that timestamp (premiera odcinka).
 */
export const VALID_PODCAST_CODE = "0021";

/** ISO 8601 datetime (e.g. 2026-04-10T08:00:00+02:00). null = window check disabled until wired. */
export const PODCAST_CODE_EPISODE_PUBLISHED_AT_ISO: string | null = null;

const VALIDITY_DAYS = 7;

export function isPodcastCodeOutsideValidityWindow(
  publishedAtIso: string | null = PODCAST_CODE_EPISODE_PUBLISHED_AT_ISO,
): boolean {
  if (!publishedAtIso?.trim()) {
    return false;
  }

  const published = new Date(publishedAtIso);
  if (Number.isNaN(published.getTime())) {
    return false;
  }

  const deadlineMs = published.getTime() + VALIDITY_DAYS * 24 * 60 * 60 * 1000;
  return Date.now() > deadlineMs;
}

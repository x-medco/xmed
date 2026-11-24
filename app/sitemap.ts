import type { MetadataRoute } from 'next';

/**
 * Empty sitemap to ensure no private website URLs are advertised to search engines
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [];
}

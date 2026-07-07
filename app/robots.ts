import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/products';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/checkout', '/cart', '/thank-you'] }],
    sitemap: `${siteConfig.domain}/sitemap.xml`,
  };
}

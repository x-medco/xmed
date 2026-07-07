import type { MetadataRoute } from 'next';
import { products, siteConfig } from '@/lib/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/products', '/cart'].map((path) => ({
    url: `${siteConfig.domain}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.7,
  }));

  const productRoutes = products.map((p) => ({
    url: `${siteConfig.domain}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}

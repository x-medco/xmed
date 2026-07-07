import type { Metadata } from 'next';
import { products, categories, siteConfig } from '@/lib/products';
import HomeClient from '@/components/HomeClient';

export const metadata: Metadata = {
  title: `${siteConfig.name} | Premium Research Peptides — Batch-Tested, EU Shipped`,
  description: siteConfig.description,
  alternates: { canonical: '/' },
  openGraph: {
    title: `${siteConfig.name} | Premium Research Peptides`,
    description: siteConfig.description,
    url: siteConfig.domain,
    siteName: siteConfig.name,
    images: [
      {
        url: '/images/xmed1.jpeg',
        width: 1200,
        height: 630,
        alt: 'X-Med Peptide Reagents',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | Premium Research Peptides`,
    description: siteConfig.description,
    images: ['/images/xmed1.jpeg'],
  },
};

export default function HomePage() {
  return <HomeClient products={products} categories={categories} />;
}

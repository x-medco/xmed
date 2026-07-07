import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { products, fetchProductBySlug, fetchRelatedProducts, siteConfig } from '@/lib/products';
import ProductClient from '@/components/ProductClient';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  // Built at compile time using static catalog to keep build phase offline-resilient
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await fetchProductBySlug(params.slug);
  if (!product) return {};
  
  const title = `${product.name} ${product.strength} | HPLC Tested Peptide — X-Med`;
  const desc = product.metaDescription;

  return {
    title,
    description: desc,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title,
      description: desc,
      url: `${siteConfig.domain}/products/${product.slug}`,
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await fetchProductBySlug(params.slug);
  if (!product) return notFound();
  
  const related = await fetchRelatedProducts(product);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.metaDescription,
    image: `${siteConfig.domain}${product.image}`,
    sku: product.slug,
    category: product.category,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: product.price.toFixed(2),
      availability: 'https://schema.org/InStock',
      url: `${siteConfig.domain}/products/${product.slug}`,
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.domain },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: `${siteConfig.domain}/products` },
      { '@type': 'ListItem', position: 3, name: product.name, item: `${siteConfig.domain}/products/${product.slug}` },
    ],
  };

  return (
    <>
      <ProductClient product={product} related={related} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  );
}

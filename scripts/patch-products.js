const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'lib', 'products.ts');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update the Product type definition
const oldType = `export type Product = {
  slug: string;
  name: string;
  category: string;
  strength: string; // e.g. "5mg"
  format: 'vial' | 'tablets' | 'pills' | 'pen' | 'water';
  price: number; // EUR
  compareAtPrice?: number;
  includesWater: boolean; // ships with free bacteriostatic water vial
  shortDescription: string;
  longDescription: string[]; // paragraphs
  highlights: string[];
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
  faqs: FAQ[];
};`;

const newType = `export type Product = {
  slug: string;
  name: string;
  category: string;
  strength: string; // e.g. "5mg"
  format: 'vial' | 'tablets' | 'pills' | 'pen' | 'water';
  price: number; // EUR
  compareAtPrice?: number;
  includesWater: boolean; // ships with free bacteriostatic water vial
  shortDescription: string;
  longDescription: string[]; // paragraphs
  highlights: string[];
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
  faqs: FAQ[];
  image: string;
  bogo: boolean;
  specifications: {
    purity: string;
    storage: string;
    dosage: string;
    usage: string;
  };
};`;

if (content.includes(oldType)) {
  content = content.replace(oldType, newType);
} else {
  console.log("Product type already updated or modified.");
}

// 2. Map slugs to images, BOGO status, and specifications
const productSlugs = [
  '5-amino-1mq-50mg',
  'nad-500mg',
  'bpc-157-5mg',
  'tb-500-10mg',
  'hgh-frag-5mg',
  'aod9604-5mg',
  'tesamorelin-5mg',
  'mots-c-10mg',
  'ss-31-50mg',
  'ipamorelin-5mg',
  'cjc-1295-no-dac-5mg',
  'melanotan-2-10mg',
  'igf-1-lr3-1mg',
  'igf-des-1mg',
  'igf-des-2mg',
  'dsip-5mg',
  'selank-5mg',
  'pt-141-10mg',
  'ghk-cu-50mg',
  'retatrutide-5mg',
  'retatrutide-10mg',
  'retatrutide-10mg-quick-pen',
  'tirzepatide-5mg',
  'slu-pp-332-1mg-30-tabs',
  'kpv-peptide-500mcg-30-pills',
  'hgh-100iu-10ml',
  'bacteriostatic-water-2ml'
];

// Helper to determine image index (4 to 29)
// 5-amino-1mq-50mg is index 0 -> xmed4.png
// bacteriostatic-water-2ml is index 26 -> let's map it to xmed2.jpeg or a clean logo
const getImageForSlug = (slug, index) => {
  if (slug === 'bacteriostatic-water-2ml') {
    return '/images/xmed2.jpeg';
  }
  const imgNum = index + 4;
  return `/images/xmed${imgNum}.png`;
};

// Check if a slug is eligible for BOGO
// (Usually all standard peptide vials, let's say format === 'vial' except very high-end ones like HGH / SS-31 / NAD+ or keep them all BOGO-eligible as per client request)
const getBogoForSlug = (slug, format) => {
  if (slug === 'bacteriostatic-water-2ml') return false;
  if (format === 'tablets' || format === 'pills') return false;
  // Let's make popular vials BOGO eligible
  const bogoSlugs = [
    'bpc-157-5mg',
    'tb-500-10mg',
    'retatrutide-5mg',
    'retatrutide-10mg',
    'ipamorelin-5mg',
    'cjc-1295-no-dac-5mg',
    'melanotan-2-10mg',
    'ghk-cu-50mg',
    'tesamorelin-5mg',
    'aod9604-5mg',
    'hgh-frag-5mg'
  ];
  return bogoSlugs.includes(slug);
};

// Parse products array from text and insert fields inside each object definition
productSlugs.forEach((slug, idx) => {
  // Find product block by its slug:
  // slug: '5-amino-1mq-50mg',
  const slugRegexStr = `slug:\\s*'${slug}',`;
  const slugRegex = new RegExp(slugRegexStr);
  
  if (!slugRegex.test(content)) {
    console.error(`Could not find slug: ${slug} in file`);
    return;
  }

  // We want to find the next matching block and insert the fields
  // Let's find the position of the slug definition
  const slugIndex = content.indexOf(`slug: '${slug}',`);
  if (slugIndex === -1) return;

  // Let's find the closing tag of this product object or insert right after slug
  // We can find the format of the product to know BOGO eligibility
  const formatMatch = content.substring(slugIndex, slugIndex + 300).match(/format:\s*'([^']+)'/);
  const format = formatMatch ? formatMatch[1] : 'vial';

  const imageVal = getImageForSlug(slug, idx);
  const bogoVal = getBogoForSlug(slug, format);
  
  const purity = slug === 'bacteriostatic-water-2ml' ? 'N/A (Sterile)' : '99.2% - 99.8% (HPLC verified)';
  const storage = slug === 'bacteriostatic-water-2ml' ? 'Store at 15-25°C' : 'Lyophilized: 2-8°C (Reconstituted: 2-8°C, use within 21 days)';
  const dosage = 'Research dependent';
  const usage = 'Chemical Compound: research & laboratory use only';

  const fieldsToInject = `
    image: '${imageVal}',
    bogo: ${bogoVal},
    specifications: {
      purity: '${purity}',
      storage: '${storage}',
      dosage: '${dosage}',
      usage: '${usage}'
    },`;

  // We can inject these fields right after the slug property
  const targetStr = `slug: '${slug}',`;
  content = content.replace(targetStr, `${targetStr}${fieldsToInject}`);
});

fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully patched lib/products.ts with image, bogo, and specifications properties!");

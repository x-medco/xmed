export interface FAQ {
  q: string;
  a: string;
}

export interface Product {
  slug: string;
  name: string;
  category: typeof categories[number];
  strength: string;
  format: 'vial' | 'nasal' | 'pen' | 'pills' | 'liquid';
  price: number;
  compareAtPrice?: number;
  includesWater?: boolean;
  shortDescription: string;
  longDescription: string[];
  highlights: string[];
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
  faqs: FAQ[];
  image: string;
  bogo: boolean;
  offer?: string;
  discount?: number;
  specifications?: {
    purity?: string;
    storage?: string;
    dosage?: string;
    usage?: string;
  };
}

export const siteConfig = {
  "name": "X-Med",
  "domain": "https://x-med.co",
  "tagline": "Research-grade peptides, batch-tested and shipped across the EU.",
  "description": "X-Med supplies research peptides and compounds for laboratory and research use, with third-party purity testing, discreet EU shipping, and every vial paired with free bacteriostatic water.",
  "supportEmail": "support@x-med.co",
  "disclaimer": "All products sold by X-Med are intended strictly for laboratory and in-vitro research use by qualified individuals and institutions. They are not drugs, food, or cosmetics, are not for human or animal consumption, and are not evaluated or approved for the diagnosis, treatment, cure, or prevention of any disease. Nothing on this site constitutes medical advice."
};

export const categories = [
  "Weight Management",
  "Growth Hormone & Repair",
  "Longevity & Cellular Health",
  "Cognitive & Mood",
  "Skin, Healing & Pigmentation",
  "Sexual Wellness Research",
  "Research Essentials"
] as const;

export const products: Product[] = [
  {
    "slug": "5-amino-1mq-50mg",
    "image": "/images/xmed28.png",
    "bogo": false,
    "specifications": {
      "purity": "99.2% - 99.8% (HPLC verified)",
      "storage": "Lyophilized: 2-8°C (Reconstituted: 2-8°C, use within 21 days)",
      "dosage": "Research dependent",
      "usage": "Chemical Compound: research & laboratory use only"
    },
    "name": "5-Amino-1MQ",
    "category": "Weight Management",
    "strength": "50mg",
    "format": "vial",
    "price": 150,
    "includesWater": true,
    "shortDescription": "A small-molecule NNMT inhibitor studied for its role in fat-cell metabolism and body-composition research.",
    "longDescription": [
      "5-Amino-1MQ is a selective inhibitor of the NNMT enzyme, an enzyme found at elevated levels in adipose tissue. Researchers use it to study how blocking NNMT activity influences cellular energy metabolism and fat storage pathways in vitro.",
      "Unlike peptide chains, 5-Amino-1MQ is a small molecule, which is why it is often paired in comparative studies with peptide-based metabolic research compounds such as AOD9604 or Tesamorelin. Each vial in our catalog is produced to a stated 50mg strength and verified by third-party analysis before dispatch.",
      "Supplied as a lyophilized (freeze-dried) powder for stability during shipping and storage. A free vial of bacteriostatic water is included with every order for laboratory reconstitution."
    ],
    "highlights": [
      "50mg lyophilized powder",
      "NNMT inhibitor research compound",
      "Third-party purity tested",
      "Free bacteriostatic water included"
    ],
    "keywords": [
      "5-amino-1mq",
      "5-amino-1mq 50mg",
      "buy 5-amino-1mq",
      "NNMT inhibitor research"
    ],
    "metaTitle": "5-Amino-1MQ 50mg | Research NNMT Inhibitor — X-Med",
    "metaDescription": "Buy 5-Amino-1MQ 50mg for laboratory research. Third-party tested, EU shipping, free bacteriostatic water included with every vial.",
    "faqs": [
      {
        "q": "What is 5-Amino-1MQ used for in research?",
        "a": "It is studied as a selective NNMT enzyme inhibitor, primarily in metabolic and adipose-tissue research settings."
      },
      {
        "q": "Does this ship with reconstitution water?",
        "a": "Yes — every order includes one free vial of bacteriostatic water at no extra cost."
      },
      {
        "q": "Is this for human use?",
        "a": "No. This product is sold strictly for laboratory and in-vitro research use, not for human or animal consumption."
      },
      {
        "q": "How should the vial be stored?",
        "a": "Store the lyophilized powder refrigerated and protected from light; once reconstituted, keep chilled and use within the timeframe standard for peptide research handling."
      }
    ]
  },
  {
    "slug": "nad-500mg",
    "image": "/images/xmed5.png",
    "bogo": false,
    "specifications": {
      "purity": "99.2% - 99.8% (HPLC verified)",
      "storage": "Lyophilized: 2-8°C (Reconstituted: 2-8°C, use within 21 days)",
      "dosage": "Research dependent",
      "usage": "Chemical Compound: research & laboratory use only"
    },
    "name": "NAD+",
    "category": "Longevity & Cellular Health",
    "strength": "500mg",
    "format": "vial",
    "price": 90,
    "includesWater": true,
    "shortDescription": "Nicotinamide adenine dinucleotide, a coenzyme central to cellular energy production, studied widely in longevity research.",
    "longDescription": [
      "NAD+ is a coenzyme present in every living cell, playing a central role in redox reactions and mitochondrial energy production. Its decline with age has made it one of the most studied molecules in longevity and cellular-health research.",
      "Our 500mg vial is manufactured for laboratory use and independently verified for purity. Researchers commonly study NAD+ alongside other longevity compounds such as GHK-Cu and SS-31 to examine cellular resilience pathways.",
      "Supplied lyophilized for stability, with a free bacteriostatic water vial included for reconstitution in the lab."
    ],
    "highlights": [
      "500mg per vial",
      "Coenzyme used in mitochondrial research",
      "Independently purity tested",
      "Free bacteriostatic water included"
    ],
    "keywords": [
      "NAD+ 500mg",
      "buy NAD+",
      "NAD+ research peptide",
      "nicotinamide adenine dinucleotide"
    ],
    "metaTitle": "NAD+ 500mg | Cellular Energy Research Compound — X-Med",
    "metaDescription": "NAD+ 500mg for laboratory research into mitochondrial function and cellular aging. Purity tested, fast EU shipping.",
    "faqs": [
      {
        "q": "What is NAD+ studied for?",
        "a": "It is studied for its central role in mitochondrial energy production and cellular aging research."
      },
      {
        "q": "What strength does this vial contain?",
        "a": "Each vial is manufactured to a stated 500mg strength and verified by third-party testing."
      },
      {
        "q": "Is water included?",
        "a": "Yes, a free bacteriostatic water vial ships with every NAD+ order."
      }
    ]
  },
  {
    "slug": "bpc-157-5mg",
    "image": "https://res.cloudinary.com/tedfhije/image/upload/v1783369834/xmed27_ou6g8b.png",
    "bogo": false,
    "specifications": {
      "purity": "99.2% - 99.8% (HPLC verified)",
      "storage": "Lyophilized: 2-8°C (Reconstituted: 2-8°C, use within 21 days)",
      "dosage": "Research dependent",
      "usage": "Chemical Compound: research & laboratory use only"
    },
    "name": "BPC-157",
    "category": "Growth Hormone & Repair",
    "strength": "5mg",
    "format": "vial",
    "price": 35,
    "includesWater": true,
    "shortDescription": "A synthetic 15-amino-acid peptide derived from a body-protective compound, one of the most widely referenced peptides in tissue-repair research.",
    "longDescription": [
      "BPC-157 (\"Body Protection Compound-157\") is a synthetic peptide sequence studied extensively in preclinical models for its effects on tissue and gut-lining research. It is one of the most cited peptides in the recovery and regenerative research literature.",
      "Our 5mg vial is manufactured under controlled conditions and independently tested for purity and identity before it reaches our catalog. Researchers frequently study BPC-157 alongside TB-500 in combined soft-tissue research protocols.",
      "Every vial is shipped lyophilized for maximum shelf stability, with a free bacteriostatic water vial included for laboratory reconstitution."
    ],
    "highlights": [
      "5mg lyophilized vial",
      "Widely referenced in tissue-repair literature",
      "Third-party tested for purity",
      "Free bacteriostatic water included"
    ],
    "keywords": [
      "BPC-157",
      "BPC-157 5mg",
      "buy BPC-157",
      "BPC 157 peptide research"
    ],
    "metaTitle": "BPC-157 5mg | Research Peptide — X-Med",
    "metaDescription": "BPC-157 5mg for laboratory research. Third-party purity tested, discreet EU shipping, free bacteriostatic water included.",
    "faqs": [
      {
        "q": "What is BPC-157 studied for?",
        "a": "It is studied in preclinical models focused on tissue and gut-lining research."
      },
      {
        "q": "Is BPC-157 often studied with other peptides?",
        "a": "Yes, it is frequently paired with TB-500 in combined soft-tissue research protocols."
      },
      {
        "q": "What does the vial contain?",
        "a": "A lyophilized 5mg powder, verified by third-party analysis, plus a free vial of bacteriostatic water."
      },
      {
        "q": "Is this approved for human use?",
        "a": "No — this is a research-use-only product, not evaluated for human or animal consumption."
      }
    ]
  },
  {
    "slug": "tb-500-10mg",
    "image": "https://res.cloudinary.com/tedfhije/image/upload/v1783369827/xmed26_xjvze2.png",
    "bogo": false,
    "specifications": {
      "purity": "99.2% - 99.8% (HPLC verified)",
      "storage": "Lyophilized: 2-8°C (Reconstituted: 2-8°C, use within 21 days)",
      "dosage": "Research dependent",
      "usage": "Chemical Compound: research & laboratory use only"
    },
    "name": "TB-500",
    "category": "Growth Hormone & Repair",
    "strength": "10mg",
    "format": "vial",
    "price": 40,
    "includesWater": true,
    "shortDescription": "A synthetic fragment of Thymosin Beta-4, studied for its role in cellular migration and tissue-repair research.",
    "longDescription": [
      "TB-500 is a synthetic peptide derived from Thymosin Beta-4, a protein naturally present in nearly all human and animal cells. Research has focused on its interaction with actin, a protein involved in cell structure and movement.",
      "Supplied at a 10mg strength, independently tested for purity, TB-500 is a frequent subject of comparative studies alongside BPC-157 in tissue-repair research programs.",
      "Shipped as a stable lyophilized powder, with a free bacteriostatic water vial included for lab reconstitution."
    ],
    "highlights": [
      "10mg lyophilized vial",
      "Studied for actin/cell-migration research",
      "Purity verified by third-party lab",
      "Free bacteriostatic water included"
    ],
    "keywords": [
      "TB-500",
      "TB-500 10mg",
      "buy TB-500",
      "Thymosin Beta-4 research"
    ],
    "metaTitle": "TB-500 10mg | Thymosin Beta-4 Research Peptide — X-Med",
    "metaDescription": "TB-500 10mg for laboratory tissue-repair research. Purity tested, EU shipping, free bacteriostatic water included.",
    "faqs": [
      {
        "q": "What is TB-500 derived from?",
        "a": "It is a synthetic fragment of Thymosin Beta-4, a naturally occurring protein."
      },
      {
        "q": "What is it studied for?",
        "a": "Its interaction with actin and cell migration pathways in tissue-repair research."
      },
      {
        "q": "Does it ship with water?",
        "a": "Yes, every TB-500 order includes a free bacteriostatic water vial."
      }
    ]
  },
  {
    "slug": "hgh-frag-5mg",
    "image": "/images/xmed25.png",
    "bogo": false,
    "specifications": {
      "purity": "99.2% - 99.8% (HPLC verified)",
      "storage": "Lyophilized: 2-8°C (Reconstituted: 2-8°C, use within 21 days)",
      "dosage": "Research dependent",
      "usage": "Chemical Compound: research & laboratory use only"
    },
    "name": "HGH Frag 176-191",
    "category": "Weight Management",
    "strength": "5mg",
    "format": "vial",
    "price": 35,
    "includesWater": true,
    "shortDescription": "A modified fragment of human growth hormone (amino acids 176-191), studied for its isolated effect on lipid metabolism.",
    "longDescription": [
      "HGH Fragment 176-191 is a truncated peptide representing the C-terminal end of the growth hormone molecule. Research on this fragment focuses specifically on the fat-metabolizing region of HGH, without the broader effects associated with full-length growth hormone.",
      "Our 5mg vial is manufactured to research-grade specifications and verified by independent purity testing. It is commonly studied alongside AOD9604, a closely related fragment.",
      "Shipped lyophilized for stability, with a free bacteriostatic water vial included for reconstitution."
    ],
    "highlights": [
      "5mg lyophilized vial",
      "Isolated HGH lipolytic fragment",
      "Third-party tested",
      "Free bacteriostatic water included"
    ],
    "keywords": [
      "HGH Frag 176-191",
      "HGH fragment 5mg",
      "buy HGH frag",
      "growth hormone fragment research"
    ],
    "metaTitle": "HGH Frag 176-191 5mg | Research Peptide — X-Med",
    "metaDescription": "HGH Frag 176-191, 5mg, for laboratory lipid-metabolism research. Purity tested, EU shipping, free water vial included.",
    "faqs": [
      {
        "q": "What part of HGH does this fragment represent?",
        "a": "Amino acids 176-191, the region associated with lipid-metabolizing research."
      },
      {
        "q": "Is this the same as full HGH?",
        "a": "No, it is an isolated fragment studied specifically for its metabolic research profile, distinct from full-length growth hormone."
      }
    ]
  },
  {
    "slug": "aod9604-5mg",
    "image": "/images/xmed24.png",
    "bogo": false,
    "specifications": {
      "purity": "99.2% - 99.8% (HPLC verified)",
      "storage": "Lyophilized: 2-8°C (Reconstituted: 2-8°C, use within 21 days)",
      "dosage": "Research dependent",
      "usage": "Chemical Compound: research & laboratory use only"
    },
    "name": "AOD9604",
    "category": "Weight Management",
    "strength": "5mg",
    "format": "vial",
    "price": 37,
    "includesWater": true,
    "shortDescription": "A modified HGH fragment analog, closely related to HGH Frag 176-191, used in comparative metabolic research.",
    "longDescription": [
      "AOD9604 is a modified analog of the C-terminal HGH fragment, engineered with a modified structure for improved stability during research handling. It is closely related to HGH Frag 176-191 and is frequently used in comparative studies between the two.",
      "Each 5mg vial is produced under controlled manufacturing and independently verified for identity and purity.",
      "Shipped as a lyophilized powder, with a complimentary vial of bacteriostatic water included for reconstitution."
    ],
    "highlights": [
      "5mg lyophilized vial",
      "Modified HGH fragment analog",
      "Third-party purity verified",
      "Free bacteriostatic water included"
    ],
    "keywords": [
      "AOD9604",
      "AOD9604 5mg",
      "buy AOD9604",
      "AOD 9604 research peptide"
    ],
    "metaTitle": "AOD9604 5mg | Research Peptide — X-Med",
    "metaDescription": "AOD9604 5mg for laboratory metabolic research. Purity tested, discreet EU shipping, free bacteriostatic water included.",
    "faqs": [
      {
        "q": "How does AOD9604 differ from HGH Frag 176-191?",
        "a": "It is a structurally modified analog designed for improved research stability, and the two are often studied comparatively."
      }
    ]
  },
  {
    "slug": "tesamorelin-5mg",
    "image": "/images/xmed23.png",
    "bogo": false,
    "specifications": {
      "purity": "99.2% - 99.8% (HPLC verified)",
      "storage": "Lyophilized: 2-8°C (Reconstituted: 2-8°C, use within 21 days)",
      "dosage": "Research dependent",
      "usage": "Chemical Compound: research & laboratory use only"
    },
    "name": "Tesamorelin",
    "category": "Growth Hormone & Repair",
    "strength": "5mg",
    "format": "vial",
    "price": 40,
    "includesWater": true,
    "shortDescription": "A growth-hormone-releasing hormone (GHRH) analog, extensively referenced in research on visceral fat and pituitary signaling.",
    "longDescription": [
      "Tesamorelin is a synthetic analog of growth-hormone-releasing hormone (GHRH), a peptide studied for its stimulating effect on the pituitary gland's natural growth hormone secretion pathway.",
      "It is one of the more extensively documented GHRH analogs in the research literature, often studied alongside CJC-1295 and Ipamorelin in combined growth-hormone secretagogue protocols.",
      "Supplied at a 5mg strength, independently tested, and shipped lyophilized with a free bacteriostatic water vial for reconstitution."
    ],
    "highlights": [
      "5mg lyophilized vial",
      "GHRH analog research compound",
      "Purity tested",
      "Free bacteriostatic water included"
    ],
    "keywords": [
      "Tesamorelin",
      "Tesamorelin 5mg",
      "buy Tesamorelin",
      "GHRH analog research"
    ],
    "metaTitle": "Tesamorelin 5mg | GHRH Analog Research Peptide — X-Med",
    "metaDescription": "Tesamorelin 5mg for laboratory GHRH and pituitary-signaling research. Purity tested, EU shipping.",
    "faqs": [
      {
        "q": "What is Tesamorelin studied for?",
        "a": "Its role as a GHRH analog stimulating the pituitary's natural growth-hormone secretion pathway."
      },
      {
        "q": "Is it studied with other compounds?",
        "a": "Yes, frequently alongside CJC-1295 and Ipamorelin in secretagogue research protocols."
      }
    ]
  },
  {
    "slug": "mots-c-10mg",
    "image": "/images/xmed13.png",
    "bogo": false,
    "specifications": {
      "purity": "99.2% - 99.8% (HPLC verified)",
      "storage": "Lyophilized: 2-8°C (Reconstituted: 2-8°C, use within 21 days)",
      "dosage": "Research dependent",
      "usage": "Chemical Compound: research & laboratory use only"
    },
    "name": "MOTS-c",
    "category": "Longevity & Cellular Health",
    "strength": "10mg",
    "format": "vial",
    "price": 35,
    "includesWater": true,
    "shortDescription": "A mitochondrial-derived peptide studied for its role in metabolic regulation and cellular stress response.",
    "longDescription": [
      "MOTS-c is one of several mitochondrial-derived peptides identified in the mitochondrial genome, encoded independently of nuclear DNA. Research has focused on its role in regulating metabolic homeostasis under cellular stress.",
      "Our 10mg vial is manufactured to research-grade purity and independently verified. It is often studied alongside SS-31, another mitochondria-focused research compound.",
      "Shipped lyophilized, with a free bacteriostatic water vial included for lab reconstitution."
    ],
    "highlights": [
      "10mg lyophilized vial",
      "Mitochondrial-derived peptide",
      "Purity verified",
      "Free bacteriostatic water included"
    ],
    "keywords": [
      "MOTS-c",
      "MOTS-c 10mg",
      "buy MOTS-c",
      "mitochondrial peptide research"
    ],
    "metaTitle": "MOTS-c 10mg | Mitochondrial Research Peptide — X-Med",
    "metaDescription": "MOTS-c 10mg for laboratory research into mitochondrial and metabolic regulation. Purity tested, EU shipping.",
    "faqs": [
      {
        "q": "What makes MOTS-c different from other peptides?",
        "a": "It is encoded by the mitochondrial genome rather than nuclear DNA, which is why it is central to mitochondrial research."
      }
    ]
  },
  {
    "slug": "ss-31-50mg",
    "image": "/images/xmed21.png",
    "bogo": false,
    "specifications": {
      "purity": "99.2% - 99.8% (HPLC verified)",
      "storage": "Lyophilized: 2-8°C (Reconstituted: 2-8°C, use within 21 days)",
      "dosage": "Research dependent",
      "usage": "Chemical Compound: research & laboratory use only"
    },
    "name": "SS-31 (Elamipretide)",
    "category": "Longevity & Cellular Health",
    "strength": "50mg",
    "format": "vial",
    "price": 200,
    "includesWater": true,
    "shortDescription": "A mitochondria-targeted tetrapeptide studied for its interaction with cardiolipin and cellular energy pathways.",
    "longDescription": [
      "SS-31, also referenced as Elamipretide, is a small tetrapeptide designed to concentrate in the inner mitochondrial membrane. Research has centered on its interaction with cardiolipin, a phospholipid essential to mitochondrial energy production.",
      "This is one of our higher-strength research compounds, supplied at 50mg per vial and independently tested for identity and purity given the complexity of its synthesis.",
      "Shipped lyophilized for stability, with a free bacteriostatic water vial included for reconstitution."
    ],
    "highlights": [
      "50mg lyophilized vial",
      "Mitochondria-targeted tetrapeptide",
      "Independently tested",
      "Free bacteriostatic water included"
    ],
    "keywords": [
      "SS-31",
      "SS-31 50mg",
      "Elamipretide",
      "buy SS-31 research peptide"
    ],
    "metaTitle": "SS-31 (Elamipretide) 50mg | Research Peptide — X-Med",
    "metaDescription": "SS-31 (Elamipretide) 50mg for mitochondrial research. Purity tested, discreet EU shipping.",
    "faqs": [
      {
        "q": "What is SS-31 also known as?",
        "a": "It is often referenced in the literature as Elamipretide."
      },
      {
        "q": "Why is this priced higher than other peptides?",
        "a": "Its synthesis and mitochondrial-targeting structure make it more complex to manufacture at verified purity."
      }
    ]
  },
  {
    "slug": "ipamorelin-5mg",
    "image": "https://res.cloudinary.com/tedfhije/image/upload/v1783573535/impamorline_ubmq9q.png",
    "bogo": false,
    "specifications": {
      "purity": "99.2% - 99.8% (HPLC verified)",
      "storage": "Lyophilized: 2-8°C (Reconstituted: 2-8°C, use within 21 days)",
      "dosage": "Research dependent",
      "usage": "Chemical Compound: research & laboratory use only"
    },
    "name": "Ipamorelin",
    "category": "Growth Hormone & Repair",
    "strength": "5mg",
    "format": "vial",
    "price": 30,
    "includesWater": true,
    "shortDescription": "A selective growth-hormone secretagogue peptide, studied for its targeted pituitary signaling without significantly affecting cortisol.",
    "longDescription": [
      "Ipamorelin is a pentapeptide belonging to the growth-hormone secretagogue family. Its research profile is distinguished by its selectivity — studies focus on its targeted stimulation of growth hormone release with minimal impact on cortisol or prolactin pathways compared to older secretagogues.",
      "It is one of the most commonly stacked research peptides, frequently studied in combination with CJC-1295 for synergistic pituitary research.",
      "Supplied at 5mg, independently tested, and shipped lyophilized with a free bacteriostatic water vial."
    ],
    "highlights": [
      "5mg lyophilized vial",
      "Selective GH secretagogue",
      "Purity tested",
      "Free bacteriostatic water included"
    ],
    "keywords": [
      "Ipamorelin",
      "Ipamorelin 5mg",
      "buy Ipamorelin",
      "GH secretagogue research"
    ],
    "metaTitle": "Ipamorelin 5mg | Selective GH Secretagogue — X-Med",
    "metaDescription": "Ipamorelin 5mg for laboratory pituitary and growth-hormone secretagogue research. Purity tested, EU shipping.",
    "faqs": [
      {
        "q": "What makes Ipamorelin selective?",
        "a": "Research indicates it targets growth-hormone release with less impact on cortisol and prolactin than older secretagogues."
      },
      {
        "q": "What is it commonly studied with?",
        "a": "CJC-1295 is the most common research pairing for combined secretagogue studies."
      }
    ]
  },
  {
    "slug": "cjc-1295-no-dac-5mg",
    "image": "/images/xmed20.png",
    "bogo": false,
    "specifications": {
      "purity": "99.2% - 99.8% (HPLC verified)",
      "storage": "Lyophilized: 2-8°C (Reconstituted: 2-8°C, use within 21 days)",
      "dosage": "Research dependent",
      "usage": "Chemical Compound: research & laboratory use only"
    },
    "name": "CJC-1295 (no DAC)",
    "category": "Growth Hormone & Repair",
    "strength": "5mg",
    "format": "vial",
    "price": 35,
    "includesWater": true,
    "shortDescription": "A GHRH analog without Drug Affinity Complex, studied for shorter-acting, pulsatile growth-hormone release research.",
    "longDescription": [
      "CJC-1295 without DAC (also referenced as Mod GRF 1-29) is a growth-hormone-releasing hormone analog engineered without the Drug Affinity Complex found in the extended-release version. This makes it a subject of research into shorter, more pulsatile signaling patterns.",
      "It is frequently paired with Ipamorelin in stacked research protocols examining combined GHRH/secretagogue signaling.",
      "Supplied at 5mg strength, independently verified, and shipped lyophilized with a free bacteriostatic water vial included."
    ],
    "highlights": [
      "5mg lyophilized vial",
      "No-DAC / Mod GRF 1-29 variant",
      "Purity tested",
      "Free bacteriostatic water included"
    ],
    "keywords": [
      "CJC-1295 no DAC",
      "CJC-1295 5mg",
      "Mod GRF 1-29",
      "buy CJC-1295 research"
    ],
    "metaTitle": "CJC-1295 (No DAC) 5mg | GHRH Research Peptide — X-Med",
    "metaDescription": "CJC-1295 without DAC, 5mg, for laboratory pulsatile GHRH research. Purity tested, EU shipping.",
    "faqs": [
      {
        "q": "What does \"no DAC\" mean?",
        "a": "It refers to the version without Drug Affinity Complex, associated with shorter-acting, pulsatile signaling in research."
      }
    ]
  },
  {
    "slug": "melanotan-2-10mg",
    "image": "/images/xmed19.png",
    "bogo": false,
    "specifications": {
      "purity": "99.2% - 99.8% (HPLC verified)",
      "storage": "Lyophilized: 2-8°C (Reconstituted: 2-8°C, use within 21 days)",
      "dosage": "Research dependent",
      "usage": "Chemical Compound: research & laboratory use only"
    },
    "name": "Melanotan 2",
    "category": "Skin, Healing & Pigmentation",
    "strength": "10mg",
    "format": "vial",
    "price": 35,
    "includesWater": true,
    "shortDescription": "A synthetic analog of alpha-melanocyte-stimulating hormone, widely studied for its role in melanocyte and pigmentation research.",
    "longDescription": [
      "Melanotan 2 is a synthetic analog of the naturally occurring alpha-melanocyte-stimulating hormone (α-MSH). It is one of the most widely referenced compounds in pigmentation and melanocortin-receptor research.",
      "Our 10mg vial is manufactured under controlled conditions and independently tested for identity and purity.",
      "Shipped lyophilized for stability, with a free bacteriostatic water vial included for laboratory reconstitution."
    ],
    "highlights": [
      "10mg lyophilized vial",
      "Melanocortin receptor research compound",
      "Purity tested",
      "Free bacteriostatic water included"
    ],
    "keywords": [
      "Melanotan 2",
      "Melanotan 2 10mg",
      "buy Melanotan 2",
      "MT2 research peptide"
    ],
    "metaTitle": "Melanotan 2 10mg | Melanocortin Research Peptide — X-Med",
    "metaDescription": "Melanotan 2, 10mg, for laboratory pigmentation and melanocortin-receptor research. Purity tested, EU shipping.",
    "faqs": [
      {
        "q": "What receptor family does Melanotan 2 target in research?",
        "a": "It is studied for its interaction with melanocortin receptors involved in pigmentation pathways."
      }
    ]
  },
  {
    "slug": "igf-1-lr3-1mg",
    "image": "/images/xmed18.png",
    "bogo": false,
    "specifications": {
      "purity": "99.2% - 99.8% (HPLC verified)",
      "storage": "Lyophilized: 2-8°C (Reconstituted: 2-8°C, use within 21 days)",
      "dosage": "Research dependent",
      "usage": "Chemical Compound: research & laboratory use only"
    },
    "name": "IGF-1 LR3",
    "category": "Growth Hormone & Repair",
    "strength": "1mg",
    "format": "vial",
    "price": 50,
    "includesWater": true,
    "shortDescription": "A long-acting analog of insulin-like growth factor 1, engineered for extended half-life in cellular growth research.",
    "longDescription": [
      "IGF-1 LR3 is a modified analog of insulin-like growth factor 1, featuring a substituted amino acid sequence that extends its half-life compared to native IGF-1. This makes it a key reference compound in growth-factor and cell-proliferation research.",
      "Supplied at 1mg strength — reflecting its high research potency relative to peptides dosed in the 5-10mg range — and independently verified for purity.",
      "Shipped lyophilized, with a free bacteriostatic water vial included for reconstitution."
    ],
    "highlights": [
      "1mg lyophilized vial",
      "Long-acting IGF-1 analog",
      "Purity tested",
      "Free bacteriostatic water included"
    ],
    "keywords": [
      "IGF-1 LR3",
      "IGF-1 LR3 1mg",
      "buy IGF-1 LR3",
      "insulin-like growth factor research"
    ],
    "metaTitle": "IGF-1 LR3 1mg | Growth Factor Research Peptide — X-Med",
    "metaDescription": "IGF-1 LR3, 1mg, for laboratory cell-proliferation and growth-factor research. Purity tested, EU shipping.",
    "faqs": [
      {
        "q": "Why is IGF-1 LR3 supplied at 1mg instead of 5mg?",
        "a": "It is a substantially more potent research compound, so it is formulated at a lower per-vial mass than peptides like BPC-157 or TB-500."
      }
    ]
  },
  {
    "slug": "igf-des-1mg",
    "image": "/images/xmed17.png",
    "bogo": false,
    "specifications": {
      "purity": "99.2% - 99.8% (HPLC verified)",
      "storage": "Lyophilized: 2-8°C (Reconstituted: 2-8°C, use within 21 days)",
      "dosage": "Research dependent",
      "usage": "Chemical Compound: research & laboratory use only"
    },
    "name": "IGF-1 DES",
    "category": "Growth Hormone & Repair",
    "strength": "1mg",
    "format": "vial",
    "price": 50,
    "includesWater": true,
    "shortDescription": "A truncated IGF-1 variant missing the first three N-terminal amino acids, studied for rapid, localized receptor-binding research.",
    "longDescription": [
      "IGF-1 DES (des(1-3)IGF-1) is a truncated variant of IGF-1 lacking its first three N-terminal amino acids. This structural change is studied for its effect on binding-protein interactions, making it a reference compound for localized, short-duration receptor research.",
      "Supplied at 1mg strength and independently verified for identity and purity.",
      "Shipped lyophilized, with a free bacteriostatic water vial included."
    ],
    "highlights": [
      "1mg lyophilized vial",
      "Truncated IGF-1 variant",
      "Purity tested",
      "Free bacteriostatic water included"
    ],
    "keywords": [
      "IGF-1 DES",
      "IGF DES 1mg",
      "des(1-3)IGF-1",
      "buy IGF DES research"
    ],
    "metaTitle": "IGF-1 DES 1mg | Research Peptide — X-Med",
    "metaDescription": "IGF-1 DES, 1mg, for laboratory receptor-binding research. Purity tested, EU shipping.",
    "faqs": [
      {
        "q": "How is IGF-1 DES different from IGF-1 LR3?",
        "a": "DES is a truncated variant studied for rapid, localized receptor binding, while LR3 is modified for an extended half-life."
      }
    ]
  },
  {
    "slug": "igf-des-2mg",
    "image": "/images/xmed17.png",
    "bogo": false,
    "specifications": {
      "purity": "99.2% - 99.8% (HPLC verified)",
      "storage": "Lyophilized: 2-8°C (Reconstituted: 2-8°C, use within 21 days)",
      "dosage": "Research dependent",
      "usage": "Chemical Compound: research & laboratory use only"
    },
    "name": "IGF-1 DES",
    "category": "Growth Hormone & Repair",
    "strength": "2mg",
    "format": "vial",
    "price": 90,
    "includesWater": true,
    "shortDescription": "The higher-strength 2mg vial of our truncated IGF-1 DES variant, for research programs requiring more material per vial.",
    "longDescription": [
      "This is the 2mg strength of IGF-1 DES (des(1-3)IGF-1), giving research programs more material per vial for extended or higher-throughput studies.",
      "Manufactured under the same controlled process as our 1mg vial and independently verified for identity and purity.",
      "Shipped lyophilized, with a free bacteriostatic water vial included for reconstitution."
    ],
    "highlights": [
      "2mg lyophilized vial",
      "Higher-yield IGF-1 DES variant",
      "Purity tested",
      "Free bacteriostatic water included"
    ],
    "keywords": [
      "IGF-1 DES 2mg",
      "buy IGF DES 2mg",
      "des(1-3)IGF-1 2mg"
    ],
    "metaTitle": "IGF-1 DES 2mg | Research Peptide — X-Med",
    "metaDescription": "IGF-1 DES, 2mg, for laboratory research requiring higher yield per vial. Purity tested, EU shipping.",
    "faqs": [
      {
        "q": "Should I choose the 1mg or 2mg vial?",
        "a": "The 2mg vial suits research programs that consume more material per study; the 1mg vial suits smaller-scale work."
      }
    ]
  },
  {
    "slug": "dsip-5mg",
    "image": "/images/xmed29.png",
    "bogo": false,
    "specifications": {
      "purity": "99.2% - 99.8% (HPLC verified)",
      "storage": "Lyophilized: 2-8°C (Reconstituted: 2-8°C, use within 21 days)",
      "dosage": "Research dependent",
      "usage": "Chemical Compound: research & laboratory use only"
    },
    "name": "DSIP",
    "category": "Cognitive & Mood",
    "strength": "5mg",
    "format": "vial",
    "price": 35,
    "includesWater": true,
    "shortDescription": "Delta Sleep-Inducing Peptide, a nonapeptide studied for its association with delta-wave sleep patterns in neuroscience research.",
    "longDescription": [
      "DSIP (Delta Sleep-Inducing Peptide) is a naturally occurring nonapeptide first isolated from rabbit brain research. It is studied for its correlation with delta-wave activity, a hallmark of deep sleep stages.",
      "Our 5mg vial is manufactured to research-grade purity and independently verified.",
      "Shipped lyophilized, with a free bacteriostatic water vial included for reconstitution."
    ],
    "highlights": [
      "5mg lyophilized vial",
      "Studied in delta-wave sleep research",
      "Purity tested",
      "Free bacteriostatic water included"
    ],
    "keywords": [
      "DSIP",
      "DSIP 5mg",
      "Delta Sleep-Inducing Peptide",
      "buy DSIP research"
    ],
    "metaTitle": "DSIP 5mg | Delta Sleep-Inducing Peptide — X-Med",
    "metaDescription": "DSIP 5mg for neuroscience research into delta-wave sleep patterns. Purity tested, EU shipping.",
    "faqs": [
      {
        "q": "What was DSIP originally studied from?",
        "a": "It was first isolated in research examining rabbit brain activity linked to delta-wave sleep."
      }
    ]
  },
  {
    "slug": "selank-5mg",
    "image": "/images/xmed15.png",
    "bogo": false,
    "specifications": {
      "purity": "99.2% - 99.8% (HPLC verified)",
      "storage": "Lyophilized: 2-8°C (Reconstituted: 2-8°C, use within 21 days)",
      "dosage": "Research dependent",
      "usage": "Chemical Compound: research & laboratory use only"
    },
    "name": "Selank",
    "category": "Cognitive & Mood",
    "strength": "5mg",
    "format": "vial",
    "price": 35,
    "includesWater": true,
    "shortDescription": "A synthetic heptapeptide analog of tuftsin, studied in Russian and international neuroscience literature for anxiolytic research.",
    "longDescription": [
      "Selank is a synthetic peptide analog of tuftsin, originally developed within Russian pharmacological research programs. It has since become a reference compound in international neuroscience literature focused on anxiolytic and nootropic research pathways.",
      "Supplied at 5mg, independently tested for identity and purity.",
      "Shipped lyophilized, with a free bacteriostatic water vial included for reconstitution."
    ],
    "highlights": [
      "5mg lyophilized vial",
      "Tuftsin-analog research peptide",
      "Purity tested",
      "Free bacteriostatic water included"
    ],
    "keywords": [
      "Selank",
      "Selank 5mg",
      "buy Selank",
      "Selank peptide research"
    ],
    "metaTitle": "Selank 5mg | Neuroscience Research Peptide — X-Med",
    "metaDescription": "Selank 5mg for laboratory anxiolytic and nootropic research. Purity tested, EU shipping.",
    "faqs": [
      {
        "q": "What compound is Selank analogous to?",
        "a": "It is a synthetic analog of tuftsin, a naturally occurring immunomodulatory peptide."
      }
    ]
  },
  {
    "slug": "ghk-cu-50mg",
    "image": "/images/xmed13.png",
    "bogo": false,
    "specifications": {
      "purity": "99.2% - 99.8% (HPLC verified)",
      "storage": "Lyophilized: 2-8°C (Reconstituted: 2-8°C, use within 21 days)",
      "dosage": "Research dependent",
      "usage": "Chemical Compound: research & laboratory use only"
    },
    "name": "GHK-Cu",
    "category": "Skin, Healing & Pigmentation",
    "strength": "50mg",
    "format": "vial",
    "price": 70,
    "includesWater": true,
    "shortDescription": "A naturally occurring copper-binding tripeptide, extensively studied in dermatological and wound-healing research.",
    "longDescription": [
      "GHK-Cu is a naturally occurring tripeptide with a strong affinity for copper ions, found naturally in human plasma, saliva, and urine, though at levels that decline with age. It is one of the most extensively documented peptides in dermatological research literature.",
      "Our 50mg vial is manufactured under controlled conditions and independently verified for purity, reflecting the compound's frequent use in higher-concentration research formulations.",
      "Shipped lyophilized, with a free bacteriostatic water vial included for reconstitution."
    ],
    "highlights": [
      "50mg lyophilized vial",
      "Copper-binding tripeptide",
      "Purity tested",
      "Free bacteriostatic water included"
    ],
    "keywords": [
      "GHK-Cu",
      "GHK-Cu 50mg",
      "buy GHK-Cu",
      "copper peptide research"
    ],
    "metaTitle": "GHK-Cu 50mg | Copper Peptide Research Compound — X-Med",
    "metaDescription": "GHK-Cu 50mg for dermatological and wound-healing research. Purity tested, EU shipping.",
    "faqs": [
      {
        "q": "Where does GHK-Cu occur naturally?",
        "a": "It is found naturally in human plasma, saliva, and urine, at levels that decline with age."
      }
    ]
  },
  {
    "slug": "retatrutide-5mg",
    "image": "https://res.cloudinary.com/tedfhije/image/upload/v1783369836/xmed12_pzkuwz.png",
    "bogo": false,
    "specifications": {
      "purity": "99.2% - 99.8% (HPLC verified)",
      "storage": "Lyophilized: 2-8°C (Reconstituted: 2-8°C, use within 21 days)",
      "dosage": "Research dependent",
      "usage": "Chemical Compound: research & laboratory use only"
    },
    "name": "Retatrutide",
    "category": "Weight Management",
    "strength": "5mg",
    "format": "vial",
    "price": 80,
    "includesWater": true,
    "shortDescription": "A triple-agonist peptide targeting GIP, GLP-1, and glucagon receptors, among the most studied next-generation metabolic research compounds.",
    "longDescription": [
      "Retatrutide is a unimolecular triple-receptor agonist, engineered to act on GIP, GLP-1, and glucagon receptor pathways simultaneously. It represents one of the most closely watched compounds in current metabolic and incretin research.",
      "Our 5mg vial is manufactured to research-grade specifications and independently tested for identity and purity.",
      "Shipped lyophilized for stability, with a free bacteriostatic water vial included for reconstitution."
    ],
    "highlights": [
      "5mg lyophilized vial",
      "Triple GIP/GLP-1/glucagon agonist",
      "Purity tested",
      "Free bacteriostatic water included"
    ],
    "keywords": [
      "Retatrutide",
      "Retatrutide 5mg",
      "buy Retatrutide",
      "triple agonist research peptide"
    ],
    "metaTitle": "Retatrutide 5mg | Triple-Agonist Research Peptide — X-Med",
    "metaDescription": "Retatrutide 5mg for laboratory metabolic and incretin-receptor research. Purity tested, EU shipping.",
    "faqs": [
      {
        "q": "What receptors does Retatrutide target?",
        "a": "It is engineered to act on GIP, GLP-1, and glucagon receptors simultaneously."
      },
      {
        "q": "How does the 5mg vial compare to the 10mg vial?",
        "a": "The 5mg vial suits smaller research batches; the 10mg vial provides more material for larger studies at a lower per-mg cost."
      }
    ]
  },
  {
    "slug": "retatrutide-10mg",
    "image": "https://res.cloudinary.com/tedfhije/image/upload/v1783369833/xmed11_hfuhpe.png",
    "bogo": false,
    "specifications": {
      "purity": "99.2% - 99.8% (HPLC verified)",
      "storage": "Lyophilized: 2-8°C (Reconstituted: 2-8°C, use within 21 days)",
      "dosage": "Research dependent",
      "usage": "Chemical Compound: research & laboratory use only"
    },
    "name": "Retatrutide",
    "category": "Weight Management",
    "strength": "10mg",
    "format": "vial",
    "price": 140,
    "includesWater": true,
    "shortDescription": "The 10mg strength of our triple-agonist Retatrutide research compound, offering more material per vial for larger studies.",
    "longDescription": [
      "This is the 10mg vial of Retatrutide, a unimolecular triple-receptor agonist targeting GIP, GLP-1, and glucagon pathways, giving research programs additional material per vial at improved cost efficiency versus the 5mg option.",
      "Manufactured under the same controlled process and independently tested for identity and purity.",
      "Shipped lyophilized, with a free bacteriostatic water vial included for reconstitution."
    ],
    "highlights": [
      "10mg lyophilized vial",
      "Triple GIP/GLP-1/glucagon agonist",
      "Purity tested",
      "Free bacteriostatic water included"
    ],
    "keywords": [
      "Retatrutide 10mg",
      "buy Retatrutide 10mg",
      "Retatrutide research peptide"
    ],
    "metaTitle": "Retatrutide 10mg | Triple-Agonist Research Peptide — X-Med",
    "metaDescription": "Retatrutide 10mg for laboratory metabolic research at improved cost per mg. Purity tested, EU shipping.",
    "faqs": [
      {
        "q": "Is the 10mg vial more cost-effective?",
        "a": "Yes, the per-mg cost is lower than the 5mg vial, suiting larger or longer-running research programs."
      }
    ]
  },
  {
    "slug": "retatrutide-10mg-quick-pen",
    "image": "https://res.cloudinary.com/tedfhije/image/upload/v1783446972/ChatGPT_Image_Jul_7_2026_06_14_47_AM_ttkfde.png",
    "bogo": false,
    "specifications": {
      "purity": "99.2% - 99.8% (HPLC verified)",
      "storage": "Cold-chain: 2-8°C (discreet and easy storage)",
      "dosage": "30 clicks = 1MG",
      "usage": "Precision click-based dose control"
    },
    "name": "X-Med Retatrutide Quick Pen 10MG – 3ML",
    "category": "Weight Management",
    "strength": "10mg",
    "format": "pen",
    "price": 170,
    "includesWater": false,
    "shortDescription": "X-Med Retatrutide Quick Pen 10MG is a precision quick-pen format product designed for accurate, convenient, and easy dose control. The pen comes with a total volume of 3ML and a total strength of 10MG, offering a clean and practical application experience with click-based dosing support.",
    "longDescription": [
      "X-Med Retatrutide Quick Pen 10MG is designed for users who need accuracy, convenience, and controlled dosage in a modern pen format. The quick-pen system helps make application simple, discreet, and easy to manage, while the click-based mechanism supports precise measurement with every use.",
      "Each pen contains a total of 10MG Retatrutide in 3ML volume, giving a structured dosage system for better control. The product design focuses on precision, usability, and reliability, making it suitable for professional treatment guidance where accurate dosage is important.",
      "The X-Med Quick Pen format is built to provide a practical experience with clear dosage calculation. According to the product guide, 30 clicks equal 1MG, allowing users to follow dosage instructions more carefully under medical supervision. The compact pen design also makes it easier to store, carry, and use compared to traditional vial-based formats.",
      "Important Note: This product should be used only under the guidance of a qualified doctor or healthcare professional. Always follow medical advice and local regulations before using or selling this type of product."
    ],
    "highlights": [
      "Product: Retatrutide Quick Pen",
      "Brand: X-Med",
      "Strength: 10MG",
      "Volume: 3ML total",
      "Format: Quick Pen",
      "Dosage Control: Click-based precision system",
      "Usage Style: Easy, practical, and discreet",
      "Quality Focus: Designed for accurate and controlled application"
    ],
    "keywords": [
      "Retatrutide pen",
      "Retatrutide quick pen",
      "Retatrutide 10mg pen",
      "buy Retatrutide pen",
      "Retatrutide 3ml pen"
    ],
    "metaTitle": "X-Med Retatrutide Quick Pen 10MG – 3ML | X-Med",
    "metaDescription": "X-Med Retatrutide Quick Pen 10MG is a precision click-based quick-pen format with 3ML volume and 10MG strength.",
    "faqs": [
      {
        "q": "How many clicks equal 1MG in the Retatrutide Quick Pen?",
        "a": "According to the product guide, 30 clicks equal 1MG, allowing for careful dose calculations."
      },
      {
        "q": "Does this pen require reconstitution?",
        "a": "No, the quick pen format is ready-to-use and designed for convenient and discreet application."
      }
    ]
  },
  {
    "slug": "tirzepatide-5mg",
    "image": "/images/xmed10.png",
    "bogo": false,
    "specifications": {
      "purity": "99.2% - 99.8% (HPLC verified)",
      "storage": "Lyophilized: 2-8°C (Reconstituted: 2-8°C, use within 21 days)",
      "dosage": "Research dependent",
      "usage": "Chemical Compound: research & laboratory use only"
    },
    "name": "Tirzepatide",
    "category": "Weight Management",
    "strength": "5mg",
    "format": "vial",
    "price": 70,
    "includesWater": true,
    "shortDescription": "A dual GIP/GLP-1 receptor agonist, one of the most referenced compounds in current incretin and metabolic research.",
    "longDescription": [
      "Tirzepatide is a dual-agonist peptide acting on both GIP and GLP-1 receptors, and is among the most extensively documented compounds in current metabolic and incretin research literature.",
      "Our 5mg vial is manufactured to research-grade specifications and independently tested for identity and purity.",
      "Shipped lyophilized for stability, with a free bacteriostatic water vial included for laboratory reconstitution."
    ],
    "highlights": [
      "5mg lyophilized vial",
      "Dual GIP/GLP-1 agonist",
      "Purity tested",
      "Free bacteriostatic water included"
    ],
    "keywords": [
      "Tirzepatide",
      "Tirzepatide 5mg",
      "buy Tirzepatide",
      "dual agonist research peptide"
    ],
    "metaTitle": "Tirzepatide 5mg | Dual-Agonist Research Peptide — X-Med",
    "metaDescription": "Tirzepatide 5mg for laboratory incretin and metabolic research. Purity tested, EU shipping.",
    "faqs": [
      {
        "q": "What receptors does Tirzepatide target?",
        "a": "It is a dual agonist acting on both GIP and GLP-1 receptors."
      },
      {
        "q": "How does this differ from Retatrutide?",
        "a": "Tirzepatide acts on two receptor pathways (GIP/GLP-1), while Retatrutide is a triple agonist that also targets glucagon receptors."
      }
    ]
  },
  {
    "slug": "slu-pp-332-1mg-30-tabs",
    "image": "/images/xmed9.png",
    "bogo": false,
    "specifications": {
      "purity": "99.2% - 99.8% (HPLC verified)",
      "storage": "Lyophilized: 2-8°C (Reconstituted: 2-8°C, use within 21 days)",
      "dosage": "Research dependent",
      "usage": "Chemical Compound: research & laboratory use only"
    },
    "name": "SLU-PP-332",
    "category": "Longevity & Cellular Health",
    "strength": "1mg x 30 tabs",
    "format": "pills",
    "price": 100,
    "includesWater": false,
    "shortDescription": "An orally-available ERR agonist, studied in exercise-mimetic and mitochondrial-biogenesis research, supplied as 30 tablets.",
    "longDescription": [
      "SLU-PP-332 is a small molecule that acts as a pan-agonist of the estrogen-related receptors (ERRs), a class of nuclear receptors involved in mitochondrial biogenesis. It has attracted research interest as an orally-active \"exercise mimetic\" candidate in metabolic studies.",
      "Unlike our peptide vials, SLU-PP-332 is supplied as 30 oral tablets at 1mg each, reflecting its use as a small-molecule compound rather than an injectable peptide.",
      "Each batch is independently tested for identity and purity before packaging."
    ],
    "highlights": [
      "30 tablets x 1mg",
      "Oral ERR agonist",
      "Exercise-mimetic research compound",
      "Purity tested"
    ],
    "keywords": [
      "SLU-PP-332",
      "SLU-PP-332 tablets",
      "buy SLU-PP-332",
      "ERR agonist research"
    ],
    "metaTitle": "SLU-PP-332 1mg (30 Tablets) | ERR Agonist Research Compound — X-Med",
    "metaDescription": "SLU-PP-332, 1mg x 30 tablets, for mitochondrial-biogenesis and exercise-mimetic research. Purity tested.",
    "faqs": [
      {
        "q": "Why tablets instead of a vial?",
        "a": "SLU-PP-332 is an orally-available small molecule, so it is supplied as tablets rather than a lyophilized injectable vial."
      },
      {
        "q": "Does this need bacteriostatic water?",
        "a": "No — tablets require no reconstitution."
      }
    ]
  },
  {
    "slug": "kpv-peptide-500mcg-30-pills",
    "image": "/images/xmed8.png",
    "bogo": false,
    "specifications": {
      "purity": "99.2% - 99.8% (HPLC verified)",
      "storage": "Lyophilized: 2-8°C (Reconstituted: 2-8°C, use within 21 days)",
      "dosage": "Research dependent",
      "usage": "Chemical Compound: research & laboratory use only"
    },
    "name": "KPV Peptide",
    "category": "Skin, Healing & Pigmentation",
    "strength": "500mcg x 30 pills",
    "format": "pills",
    "price": 35,
    "includesWater": false,
    "shortDescription": "A tripeptide fragment of alpha-MSH (Lysine–Proline–Valine), studied for anti-inflammatory research, supplied as 30 oral pills.",
    "longDescription": [
      "KPV is a tripeptide sequence (Lysine–Proline–Valine) derived from the C-terminal portion of alpha-melanocyte-stimulating hormone. Research has focused on its anti-inflammatory properties independent of the pigmentation effects associated with the full α-MSH molecule.",
      "Supplied as 30 pills at 500mcg each, formulated for oral-route research rather than injection.",
      "Each batch is independently tested for identity and purity before packaging."
    ],
    "highlights": [
      "30 pills x 500mcg",
      "Alpha-MSH tripeptide fragment",
      "Oral-route research format",
      "Purity tested"
    ],
    "keywords": [
      "KPV peptide",
      "KPV pills",
      "buy KPV",
      "Lysine Proline Valine peptide research"
    ],
    "metaTitle": "KPV Peptide 500mcg (30 Pills) | Research Compound — X-Med",
    "metaDescription": "KPV Peptide, 500mcg x 30 pills, for anti-inflammatory research. Purity tested, EU shipping.",
    "faqs": [
      {
        "q": "What is KPV derived from?",
        "a": "It is a tripeptide fragment derived from the C-terminal portion of alpha-MSH."
      },
      {
        "q": "Is this injectable?",
        "a": "No — KPV here is formulated as oral pills, not a lyophilized injectable vial."
      }
    ]
  },
  {
    "slug": "hgh-100iu-10ml",
    "image": "/images/xmed7.png",
    "bogo": false,
    "specifications": {
      "purity": "99.2% - 99.8% (HPLC verified)",
      "storage": "Lyophilized: 2-8°C (Reconstituted: 2-8°C, use within 21 days)",
      "dosage": "Research dependent",
      "usage": "Chemical Compound: research & laboratory use only"
    },
    "name": "HGH",
    "category": "Growth Hormone & Repair",
    "strength": "100iu / 10ml",
    "format": "vial",
    "price": 200,
    "includesWater": true,
    "shortDescription": "Recombinant human growth hormone, 100iu multi-dose vial, a foundational reference compound in growth-hormone research.",
    "longDescription": [
      "This 100iu (10ml) vial of recombinant human growth hormone is a foundational reference compound across growth-hormone, secretagogue, and metabolic research programs, often used as a comparative benchmark alongside GHRH analogs like Tesamorelin and CJC-1295.",
      "Manufactured under controlled recombinant production and independently tested for identity, purity, and potency given its status as a full-length protein rather than a short peptide chain.",
      "Shipped lyophilized in a multi-dose vial format, with a free bacteriostatic water vial included for laboratory reconstitution."
    ],
    "highlights": [
      "100iu / 10ml multi-dose vial",
      "Recombinant human growth hormone",
      "Purity and potency tested",
      "Free bacteriostatic water included"
    ],
    "keywords": [
      "HGH 100iu",
      "buy HGH",
      "recombinant growth hormone research",
      "HGH 10ml vial"
    ],
    "metaTitle": "HGH 100iu/10ml | Recombinant Growth Hormone Research — X-Med",
    "metaDescription": "Recombinant HGH, 100iu/10ml multi-dose vial, for laboratory growth-hormone research. Purity tested, EU shipping.",
    "faqs": [
      {
        "q": "How is this different from GHRH analogs like Tesamorelin?",
        "a": "This is the full-length recombinant growth hormone protein itself, whereas Tesamorelin and CJC-1295 are analogs that stimulate its natural release."
      },
      {
        "q": "Is bacteriostatic water included?",
        "a": "Yes, a free vial ships with every HGH order for reconstitution."
      }
    ]
  },
  {
    "slug": "bacteriostatic-water-2ml",
    "image": "/images/xmed6.png",
    "bogo": false,
    "specifications": {
      "purity": "N/A (Sterile)",
      "storage": "Store at 15-25°C",
      "dosage": "Research dependent",
      "usage": "Chemical Compound: research & laboratory use only"
    },
    "name": "Bacteriostatic Water",
    "category": "Research Essentials",
    "strength": "2ml",
    "format": "liquid",
    "price": 6,
    "includesWater": false,
    "shortDescription": "Sterile water containing 0.9% benzyl alcohol, used in the laboratory to reconstitute lyophilized peptide vials.",
    "longDescription": [
      "Bacteriostatic water is sterile water for injection containing 0.9% benzyl alcohol as a preservative, which inhibits bacterial growth and allows a reconstituted vial to be used multiple times within a laboratory setting rather than once.",
      "While one 2ml vial ships free with every peptide order on this site, this listing lets you order additional vials separately — useful when reconstituting multiple compounds or replacing a vial that has been fully used.",
      "Each batch is sterility and quality tested before dispatch."
    ],
    "highlights": [
      "2ml vial",
      "0.9% benzyl alcohol preservative",
      "Sterility tested",
      "For laboratory reconstitution use"
    ],
    "keywords": [
      "bacteriostatic water",
      "bacteriostatic water 2ml",
      "buy bacteriostatic water",
      "peptide reconstitution water"
    ],
    "metaTitle": "Bacteriostatic Water 2ml | Reconstitution Water — X-Med",
    "metaDescription": "Bacteriostatic water, 2ml vial, for laboratory peptide reconstitution. Sterility tested, EU shipping.",
    "faqs": [
      {
        "q": "Do I need to buy this separately?",
        "a": "Not necessarily — one free 2ml vial already ships with every peptide order. Buy extra here if you need more."
      },
      {
        "q": "What does the benzyl alcohol do?",
        "a": "It acts as a preservative, inhibiting bacterial growth so a reconstituted vial can be used more than once in the lab."
      }
    ]
  },
  {
    "slug": "glutathione-1200mg",
    "name": "Glutathione",
    "category": "Longevity & Cellular Health",
    "strength": "1200mg/10ml",
    "format": "vial",
    "price": 45,
    "includesWater": false,
    "shortDescription": "X-Med Glutathione Injection is a sterile injectable formulation containing 1200mg Glutathione per 10ml vial. Designed for intravenous use only.",
    "longDescription": [
      "Glutationa Injetável 1200 mg/10 mL. A Glutationa é um dos principais antioxidantes produzidos naturalmente pelo organismo, desempenhando um papel essencial na proteção das células contra o estresse oxidativo e no suporte às funções metabólicas. Sua forma injetável é utilizada por profissionais de saúde em protocolos específicos, conforme avaliação clínica.",
      "X-Med Glutathione Injection 1200mg/10ml is a professional-grade sterile injectable solution formulated with Glutathione 120mg/ml. Each 10ml vial contains a total of 1200mg Glutathione, making it suitable for clinical and professional medical use where glutathione supplementation is prescribed.",
      "The product comes in a premium sealed vial with clear dosage information, sterile preparation, and professional packaging. It is intended for intravenous use only and must be handled and administered by trained medical personnel."
    ],
    "highlights": [
      "1200mg Glutathione per 10ml vial",
      "Sterile injectable solution",
      "Intravenous use only",
      "Professional-grade formulation"
    ],
    "keywords": [
      "glutathione",
      "glutathione injection",
      "glutathione 1200mg",
      "antioxidant injection"
    ],
    "metaTitle": "Glutathione Injection 1200mg/10ml | X-Med",
    "metaDescription": "Buy sterile Glutathione Injection 1200mg/10ml for clinical and professional use. High quality, sterile preparation, secure shipping.",
    "faqs": [
      {
        "q": "What is Glutathione?",
        "a": "Glutathione is a powerful antioxidant naturally produced in the liver that helps protect cells from oxidative stress and supports liver detoxification."
      },
      {
        "q": "How should this product be administered?",
        "a": "It is designed for intravenous (IV) use only and must be administered strictly under the supervision of a qualified healthcare professional."
      }
    ],
    "image": "https://res.cloudinary.com/tedfhije/image/upload/v1783571478/xmedproduct1_o0r9an.png",
    "bogo": false,
    "specifications": {
      "purity": "Sterile formulation",
      "storage": "Store at 2-8°C, protect from light",
      "dosage": "As directed by healthcare professional",
      "usage": "Intravenous use only"
    }
  },
  {
    "slug": "pt-141-bremelanotide-10mg",
    "name": "PT-141 Bremelanotide",
    "category": "Sexual Wellness Research",
    "strength": "10mg",
    "format": "vial",
    "price": 35,
    "includesWater": true,
    "shortDescription": "PT-141 Bremelanotide is a research-grade peptide product supplied in a sealed vial for laboratory research purposes only.",
    "longDescription": [
      "PT-141 Bremelanotide is a peptide research product designed for laboratory-based study and professional research applications. The product is presented in a premium sealed vial with a clear blue-and-white label, making it suitable for research catalog listings, scientific product pages, and laboratory supply presentation.",
      "This vial is labeled “For Laboratory Research”, meaning it should only be handled by qualified professionals in appropriate research settings. It is not intended for personal use, medical use, diagnosis, treatment, or consumption.",
      "Important Note: This product is strictly for laboratory research purposes only. Not for human or animal use. Keep stored and handled according to professional laboratory guidelines."
    ],
    "highlights": [
      "10mg research-grade peptide",
      "Sealed research vial",
      "For laboratory research use only",
      "Lot Number: RN07156"
    ],
    "keywords": [
      "pt-141",
      "bremelanotide",
      "pt-141 peptide",
      "buy pt-141 bremelanotide"
    ],
    "metaTitle": "PT-141 Bremelanotide 10mg | Research Peptide — X-Med",
    "metaDescription": "Buy PT-141 Bremelanotide 10mg for laboratory research. Third-party verified purity, secure packaging, discreet EU delivery.",
    "faqs": [
      {
        "q": "What is PT-141 Bremelanotide studied for?",
        "a": "It is studied as a melanocortin receptor agonist, primarily in sexual wellness and libido research models."
      },
      {
        "q": "Is this product for human use?",
        "a": "No. This product is strictly for laboratory and in-vitro research use, not for human or animal consumption."
      }
    ],
    "image": "https://res.cloudinary.com/tedfhije/image/upload/v1783571478/xmedproduct2_yg0wr9.png",
    "bogo": false,
    "specifications": {
      "purity": "99% HPLC verified",
      "storage": "Lyophilized: 2-8°C (Reconstituted: 2-8°C, use within 21 days)",
      "dosage": "Research dependent",
      "usage": "Laboratory research only"
    }
  },
  {
    "slug": "l-carnitine-500mg-ml",
    "name": "L-Carnitine",
    "category": "Weight Management",
    "strength": "500mg/ml",
    "format": "vial",
    "price": 35,
    "includesWater": false,
    "shortDescription": "X-Med L-Carnitine Injection is a sterile injectable formulation containing 500mg/ml L-Carnitine in a 10ml vial. Intramuscular use only.",
    "longDescription": [
      "L-Carnitina 500 mg/mL. A L-Carnitina é um composto naturalmente presente no organismo que participa do metabolismo energético, auxiliando no transporte de ácidos graxos para serem utilizados como fonte de energia. Quando associada a uma alimentação equilibrada e à prática regular de exercícios físicos, pode contribuir para o desempenho durante os treinos e apoiar um estilo de vida saudável.",
      "X-Med L-Carnitine Injection 500mg/ml is a professional-grade sterile injectable solution formulated with L-Carnitine. Each vial contains 10ml of solution, with a concentration of 500mg per ml, making it suitable for clinical or professional use where L-Carnitine injection is prescribed.",
      "The product is supplied in a sealed glass vial with clear dosage and batch information. Its premium medical-style packaging makes it suitable for professional product listings, pharmaceutical catalogs, and healthcare supply presentation."
    ],
    "highlights": [
      "500mg/ml L-Carnitine concentration",
      "10ml sterile glass vial (5000mg total)",
      "Intramuscular use only",
      "Batch: XV809"
    ],
    "keywords": [
      "l-carnitine",
      "l-carnitine injection",
      "carnitine 500mg/ml",
      "weight loss injection"
    ],
    "metaTitle": "L-Carnitine Injection 500mg/ml | X-Med",
    "metaDescription": "Buy premium L-Carnitine Injection 500mg/ml for clinical and weight management protocols. Sterile 10ml vials.",
    "faqs": [
      {
        "q": "What is L-Carnitine studied for?",
        "a": "L-Carnitine participates in fat metabolism by transporting fatty acids into mitochondria to be converted into energy."
      },
      {
        "q": "How should this product be administered?",
        "a": "It is designed for intramuscular (IM) use only and should be administered under professional medical supervision."
      }
    ],
    "image": "https://res.cloudinary.com/tedfhije/image/upload/v1783571478/xmedproduct3_v95s4k.png",
    "bogo": false,
    "specifications": {
      "purity": "Sterile formulation",
      "storage": "Store at 15-30°C, protect from freezing and light",
      "dosage": "As directed by healthcare professional",
      "usage": "Intramuscular use only"
    }
  },
  {
      "slug": "cialis",
      "name": "Cialis",
      "category": "Sexual Wellness Research",
      "strength": "Laboratory Research",
      "format": "pills",
      "price": 35.0,
      "includesWater": false,
      "shortDescription": "\\n \t Generic Name: Tadalafil \\n \t Quantity: 30 tablets \\n \t Strength: 10mg/tab \\n \t Administration: For oral use only \\n",
      "longDescription": [
          "\\n \\n \\n \\n \\n     Cialis Product Description \\n \\n        body { \\n            font-family: Arial, sans-serif; \\n            line-height: 1.6; \\n        } \\n        .container { \\n            width: 80%; \\n            margin: auto; \\n        } \\n        .product-table { \\n            width: 100%; \\n            border-collapse: collapse; \\n            margin-bottom: 20px; \\n        } \\n        .product-table, .product-table th, .product-table td { \\n            border: 1px solid #ddd; \\n        } \\n        .product-table th, .product-table td { \\n            padding: 10px; \\n            text-align: left; \\n        } \\n        .product-table th { \\n            background-color: #f4f4f4; \\n        } \\n        h2 { \\n            color: #333; \\n        } \\n        h3 { \\n            color: #555; \\n        } \\n \\n \\n \\n \\n         Cialis \\n \\n \\n                 Generic Name \\n                 Tadalafil \\n \\n \\n                 Quantity \\n                 30 tablets \\n \\n \\n                 Strength \\n                 10mg/tab \\n \\n \\n                 Administration \\n                 For oral use only \\n \\n \\n                 Price \\n                 35\u20ac \\n \\n \\n \\n         About the Product \\n \\n            Cialis is a popular medication used to treat erectile dysfunction (ED) and symptoms of benign prostatic hyperplasia (BPH). Its active ingredient, Tadalafil, is known for its effectiveness in enhancing blood flow to the penis, which helps in achieving and maintaining an erection.",
          "Cialis is widely recognized for its longer duration of action compared to other ED medications, offering up to 36 hours of effectiveness. This allows for more spontaneity in sexual activity.",
          "\\n \\n \\n         Benefits \\n \\n             Effective treatment for erectile dysfunction (ED). \\n             Helps in improving sexual performance and satisfaction.",
          "\\n             Long-lasting effect of up to 36 hours. \\n             Enhances blood flow to the penis, leading to improved erection quality.",
          "\\n             Also helps with symptoms of benign prostatic hyperplasia (BPH), such as frequent urination and difficulty in urinating. \\n \\n \\n         Uses \\n \\n             Treating erectile dysfunction (ED) in men, helping to achieve and maintain an erection during sexual activity.",
          "\\n             Managing symptoms of benign prostatic hyperplasia (BPH), including reduced urinary flow and increased frequency of urination. \\n \\n \\n \\n \\n."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Pills"
      ],
      "keywords": [
          "cialis",
          "cialis",
          "cialis research"
      ],
      "metaTitle": "Cialis | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy Cialis for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is Cialis intended for?",
              "a": "Cialis is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/1.jpg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "sibutramine",
      "name": "Sibutramine",
      "category": "Weight Management",
      "strength": "Laboratory Research",
      "format": "pills",
      "price": 35.0,
      "includesWater": false,
      "shortDescription": "\\n \t Generic Name: Sibutramine \\n \t Quantity: 30 tablets \\n \t Strength: 20mg/tab \\n \t Administration: For oral use only \\n",
      "longDescription": [
          "\\n \\n \\n \\n \\n     Sibutramine Product Description \\n \\n        body { \\n            font-family: Arial, sans-serif; \\n            line-height: 1.6; \\n        } \\n        .container { \\n            width: 80%; \\n            margin: auto; \\n        } \\n        .product-table { \\n            width: 100%; \\n            border-collapse: collapse; \\n            margin-bottom: 20px; \\n        } \\n        .product-table, .product-table th, .product-table td { \\n            border: 1px solid #ddd; \\n        } \\n        .product-table th, .product-table td { \\n            padding: 10px; \\n            text-align: left; \\n        } \\n        .product-table th { \\n            background-color: #f4f4f4; \\n        } \\n        h2 { \\n            color: #333; \\n        } \\n        h3 { \\n            color: #555; \\n        } \\n \\n \\n \\n \\n         Sibutramine \\n \\n \\n                 Generic Name \\n                 Sibutramine \\n \\n \\n                 Quantity \\n                 30 tablets \\n \\n \\n                 Strength \\n                 20mg/tab \\n \\n \\n                 Administration \\n                 For oral use only \\n \\n \\n                 Price \\n                 35\u20ac \\n \\n \\n \\n         About the Product \\n \\n            Sibutramine is a medication used primarily for weight management and obesity treatment. It works as an appetite suppressant by increasing serotonin and norepinephrine levels in the brain, which helps to reduce hunger and promote feelings of fullness.",
          "Sibutramine is often prescribed as part of a comprehensive weight loss program, including dietary changes and exercise. \\n \\n \\n         Benefits \\n \\n             Effective appetite suppressant aiding in weight loss.",
          "\\n             Helps to reduce hunger and cravings. \\n             Promotes feelings of fullness, leading to decreased food intake.",
          "\\n             Supports weight management efforts when combined with diet and exercise. \\n \\n \\n         Uses \\n \\n             Managing obesity and overweight conditions.",
          "\\n             Assisting with weight loss in conjunction with a balanced diet and exercise. \\n \\n \\n \\n \\n."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Pills"
      ],
      "keywords": [
          "sibutramine",
          "sibutramine",
          "sibutramine research"
      ],
      "metaTitle": "Sibutramine | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy Sibutramine for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is Sibutramine intended for?",
              "a": "Sibutramine is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/2.jpg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "dnp",
      "name": "DNP",
      "category": "Weight Management",
      "strength": "Laboratory Research",
      "format": "pills",
      "price": 45.0,
      "includesWater": false,
      "shortDescription": "\\n \t Generic Name: 2,4-Dinitrophenol \\n \t Quantity: 20 capsules \\n \t Strength: 150mg/cap \\n \t Administration: For oral use only \\n",
      "longDescription": [
          "\\n \\n \\n \\n \\n     DNP Product Description \\n \\n        body { \\n            font-family: Arial, sans-serif; \\n            line-height: 1.6; \\n        } \\n        .container { \\n            width: 80%; \\n            margin: auto; \\n        } \\n        .product-table { \\n            width: 100%; \\n            border-collapse: collapse; \\n            margin-bottom: 20px; \\n        } \\n        .product-table, .product-table th, .product-table td { \\n            border: 1px solid #ddd; \\n        } \\n        .product-table th, .product-table td { \\n            padding: 10px; \\n            text-align: left; \\n        } \\n        .product-table th { \\n            background-color: #f4f4f4; \\n        } \\n        h2 { \\n            color: #333; \\n        } \\n        h3 { \\n            color: #555; \\n        } \\n \\n \\n \\n \\n         DNP \\n \\n \\n                 Generic Name \\n                 2,4-Dinitrophenol \\n \\n \\n                 Quantity \\n                 20 capsules \\n \\n \\n                 Strength \\n                 150mg/cap \\n \\n \\n                 Administration \\n                 For oral use only \\n \\n \\n                 Price \\n                 45\u20ac \\n \\n \\n \\n         About the Product \\n \\n            DNP (2,4-Dinitrophenol) is a chemical compound used in some cases for weight loss and fat burning. It works by increasing the metabolic rate in the body, leading to higher calorie expenditure.",
          "DNP disrupts the process of cellular respiration, which increases energy expenditure and fat loss. However, DNP is known to have significant risks and potential side effects, so it is generally not recommended for use without professional supervision.",
          "\\n \\n \\n         Benefits \\n \\n             May assist in weight loss and fat burning by increasing metabolic rate. \\n             Leads to higher calorie expenditure and reduced body fat.",
          "\\n \\n \\n         Uses \\n \\n             Occasionally used for weight management and fat reduction. \\n             Should only be used under strict medical supervision due to its potential side effects and risks.",
          "\\n \\n \\n \\n \\n."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Pills"
      ],
      "keywords": [
          "dnp",
          "dnp",
          "dnp research"
      ],
      "metaTitle": "DNP | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy DNP for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is DNP intended for?",
              "a": "DNP is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/3.jpg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "mk-677",
      "name": "MK 677",
      "category": "Growth Hormone & Repair",
      "strength": "Laboratory Research",
      "format": "pills",
      "price": 40.0,
      "includesWater": false,
      "shortDescription": "\\n \t Generic Name: ibutamoren \\n \t Quantity: 30 tablets \\n \t Strength: 25mg/tab \\n \t Administration: For oral use only \\n",
      "longDescription": [
          "\\n \\n \\n \\n \\n     MK 677 Product Description \\n \\n        body { \\n            font-family: Arial, sans-serif; \\n            line-height: 1.6; \\n        } \\n        .container { \\n            width: 80%; \\n            margin: auto; \\n        } \\n        .product-table { \\n            width: 100%; \\n            border-collapse: collapse; \\n            margin-bottom: 20px; \\n        } \\n        .product-table, .product-table th, .product-table td { \\n            border: 1px solid #ddd; \\n        } \\n        .product-table th, .product-table td { \\n            padding: 10px; \\n            text-align: left; \\n        } \\n        .product-table th { \\n            background-color: #f4f4f4; \\n        } \\n        h2 { \\n            color: #333; \\n        } \\n        h3 { \\n            color: #555; \\n        } \\n \\n \\n \\n \\n         MK 677 \\n \\n \\n                 Generic Name \\n                 Ibutamoren \\n \\n \\n                 Quantity \\n                 30 tablets \\n \\n \\n                 Strength \\n                 25mg/tab \\n \\n \\n                 Administration \\n                 For oral use only \\n \\n \\n                 Price \\n                 40\u20ac \\n \\n \\n \\n         About the Product \\n \\n            MK 677, also known as Ibutamoren, is a growth hormone secretagogue that stimulates the release of growth hormone (GH) and insulin-like growth factor 1 (IGF-1). It is commonly used to enhance muscle growth, improve bone density, and support overall health.",
          "MK 677 can help increase appetite and improve sleep quality, making it a popular choice for those looking to optimize their body composition and recovery. \\n \\n \\n         Benefits \\n \\n             Stimulates natural growth hormone release, aiding in muscle growth and repair.",
          "\\n             Supports increased bone density and overall skeletal health. \\n             May improve sleep quality and increase appetite.",
          "\\n             Helps in enhancing physical performance and recovery. \\n \\n \\n         Uses \\n \\n             Enhancing muscle growth and improving body composition.",
          "\\n             Supporting bone health and density. \\n             Improving recovery times and overall physical performance.",
          "\\n             Increasing appetite and enhancing sleep quality. \\n \\n \\n \\n \\n."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Pills"
      ],
      "keywords": [
          "mk 677",
          "mk-677",
          "mk 677 research"
      ],
      "metaTitle": "MK 677 | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy MK 677 for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is MK 677 intended for?",
              "a": "MK 677 is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/4.jpg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "arimidex",
      "name": "Arimidex",
      "category": "Research Essentials",
      "strength": "Laboratory Research",
      "format": "pills",
      "price": 35.0,
      "includesWater": false,
      "shortDescription": "\\n \t Generic Name: Anastrozole \\n \t Quantity: 30 tablets \\n \t Strength: 1mg/tab \\n \t Administration: For oral use only \\n",
      "longDescription": [
          "\\n \\n \\n \\n \\n     Arimidex Product Description \\n \\n        body { \\n            font-family: Arial, sans-serif; \\n            line-height: 1.6; \\n        } \\n        .container { \\n            width: 80%; \\n            margin: auto; \\n        } \\n        .product-table { \\n            width: 100%; \\n            border-collapse: collapse; \\n            margin-bottom: 20px; \\n        } \\n        .product-table, .product-table th, .product-table td { \\n            border: 1px solid #ddd; \\n        } \\n        .product-table th, .product-table td { \\n            padding: 10px; \\n            text-align: left; \\n        } \\n        .product-table th { \\n            background-color: #f4f4f4; \\n        } \\n        h2 { \\n            color: #333; \\n        } \\n        h3 { \\n            color: #555; \\n        } \\n \\n \\n \\n \\n         Arimidex \\n \\n \\n                 Generic Name \\n                 Anastrozole \\n \\n \\n                 Quantity \\n                 30 tablets \\n \\n \\n                 Strength \\n                 1mg/tab \\n \\n \\n                 Administration \\n                 For oral use only \\n \\n \\n                 Price \\n                 35\u20ac \\n \\n \\n \\n         About the Product \\n \\n            Arimidex, with its generic name Anastrozole, is a medication used primarily in the treatment of breast cancer in postmenopausal women. It works as an aromatase inhibitor, which means it helps lower estrogen levels in the body.",
          "By reducing estrogen, Arimidex can help slow or stop the growth of certain types of breast cancer that require estrogen to grow. It is commonly prescribed as part of a comprehensive cancer treatment plan.",
          "\\n \\n \\n         Benefits \\n \\n             Effective in lowering estrogen levels in the body. \\n             Helps to slow or stop the growth of estrogen-dependent breast cancer.",
          "\\n             Often used as a part of adjuvant therapy to reduce the risk of cancer recurrence. \\n             May be beneficial in managing hormone-sensitive breast cancers.",
          "\\n \\n \\n         Uses \\n \\n             Treating hormone receptor-positive breast cancer in postmenopausal women. \\n             Reducing the risk of cancer recurrence in breast cancer patients.",
          "\\n             Part of the adjuvant treatment plan for breast cancer. \\n \\n \\n \\n \\n."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Pills"
      ],
      "keywords": [
          "arimidex",
          "arimidex",
          "arimidex research"
      ],
      "metaTitle": "Arimidex | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy Arimidex for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is Arimidex intended for?",
              "a": "Arimidex is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/5.jpg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "proviron",
      "name": "Proviron",
      "category": "Research Essentials",
      "strength": "Laboratory Research",
      "format": "pills",
      "price": 22.0,
      "includesWater": false,
      "shortDescription": "\\n \t Generic Name: Mesterolone \\n \t Quantity: 25 tablets \\n \t Strength: 25mg/tab \\n \t Administration: For oral use only \\n",
      "longDescription": [
          "\\n \\n \\n \\n \\n     Proviron Product Description \\n \\n        body { \\n            font-family: Arial, sans-serif; \\n            line-height: 1.6; \\n        } \\n        .container { \\n            width: 80%; \\n            margin: auto; \\n        } \\n        .product-table { \\n            width: 100%; \\n            border-collapse: collapse; \\n            margin-bottom: 20px; \\n        } \\n        .product-table, .product-table th, .product-table td { \\n            border: 1px solid #ddd; \\n        } \\n        .product-table th, .product-table td { \\n            padding: 10px; \\n            text-align: left; \\n        } \\n        .product-table th { \\n            background-color: #f4f4f4; \\n        } \\n        h2 { \\n            color: #333; \\n        } \\n        h3 { \\n            color: #555; \\n        } \\n \\n \\n \\n \\n         Proviron \\n \\n \\n                 Generic Name \\n                 Mesterolone \\n \\n \\n                 Quantity \\n                 25 tablets \\n \\n \\n                 Strength \\n                 25mg/tab \\n \\n \\n                 Administration \\n                 For oral use only \\n \\n \\n                 Price \\n                 22\u20ac \\n \\n \\n \\n         About the Product \\n \\n            Proviron, also known as Mesterolone, is an oral androgenic steroid primarily used to treat low testosterone levels and certain types of male infertility. It works by enhancing the effects of testosterone in the body.",
          "Proviron is known for its ability to improve libido, sexual performance, and mood. It is also used in some cases to counteract the estrogenic effects in other anabolic steroid treatments.",
          "\\n \\n \\n         Benefits \\n \\n             Enhances testosterone effects in the body, improving libido and sexual performance. \\n             Supports treatment of low testosterone levels and male infertility.",
          "\\n             May help to reduce estrogenic side effects in anabolic steroid cycles. \\n             Improves mood and energy levels.",
          "\\n \\n \\n         Uses \\n \\n             Managing low testosterone levels and male infertility. \\n             Improving libido and sexual performance.",
          "\\n             Reducing estrogenic side effects in other steroid treatments. \\n             Enhancing mood and overall well-being.",
          "\\n \\n \\n \\n \\n."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Pills"
      ],
      "keywords": [
          "proviron",
          "proviron",
          "proviron research"
      ],
      "metaTitle": "Proviron | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy Proviron for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is Proviron intended for?",
              "a": "Proviron is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/6.jpg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "anavar",
      "name": "Anavar",
      "category": "Research Essentials",
      "strength": "Laboratory Research",
      "format": "pills",
      "price": 65.0,
      "includesWater": false,
      "shortDescription": "\\n \t Generic Name: Oxandrolone \\n \t Quantity: 100 tablets \\n \t Strength: 10mg/tab \\n \t Administration: For oral use only \\n",
      "longDescription": [
          "\\n \\n \\n \\n \\n     Anavar Product Description \\n \\n        body { \\n            font-family: Arial, sans-serif; \\n            line-height: 1.6; \\n        } \\n        .container { \\n            width: 80%; \\n            margin: auto; \\n        } \\n        .product-table { \\n            width: 100%; \\n            border-collapse: collapse; \\n            margin-bottom: 20px; \\n        } \\n        .product-table, .product-table th, .product-table td { \\n            border: 1px solid #ddd; \\n        } \\n        .product-table th, .product-table td { \\n            padding: 10px; \\n            text-align: left; \\n        } \\n        .product-table th { \\n            background-color: #f4f4f4; \\n        } \\n        h2 { \\n            color: #333; \\n        } \\n        h3 { \\n            color: #555; \\n        } \\n \\n \\n \\n \\n         Anavar \\n \\n \\n                 Generic Name \\n                 Oxandrolone \\n \\n \\n                 Quantity \\n                 100 tablets \\n \\n \\n                 Strength \\n                 10mg/tab \\n \\n \\n                 Administration \\n                 For oral use only \\n \\n \\n                 Price \\n                 65\u20ac \\n \\n \\n \\n         About the Product \\n \\n            Anavar, with the generic name Oxandrolone, is an anabolic steroid used for muscle growth and strength enhancement. It is known for its mild nature and is often used in cutting cycles to help preserve lean muscle mass while reducing body fat.",
          "Anavar is favored for its lower risk of side effects compared to other steroids, making it a popular choice for both men and women. \\n \\n \\n         Benefits \\n \\n             Promotes muscle growth and strength gains.",
          "\\n             Helps preserve lean muscle mass during cutting phases. \\n             Lower risk of androgenic side effects compared to other anabolic steroids.",
          "\\n             Improves physical performance and recovery. \\n \\n \\n         Uses \\n \\n             Enhancing muscle mass and strength.",
          "\\n             Preserving lean muscle during fat loss or cutting phases. \\n             Improving athletic performance and recovery.",
          "\\n             Used in both bulking and cutting cycles. \\n \\n \\n \\n \\n."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Pills"
      ],
      "keywords": [
          "anavar",
          "anavar",
          "anavar research"
      ],
      "metaTitle": "Anavar | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy Anavar for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is Anavar intended for?",
              "a": "Anavar is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/7.jpg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "anadrol",
      "name": "Anadrol",
      "category": "Research Essentials",
      "strength": "Laboratory Research",
      "format": "pills",
      "price": 45.0,
      "includesWater": false,
      "shortDescription": "\\n \t Generic Name: Oxymetholone \\n \t Quantity: 50 tablets \\n \t Strength: 50mg/tab \\n \t Administration: For oral use only \\n",
      "longDescription": [
          "\\n \\n \\n \\n \\n     Anadrol Product Description \\n \\n        body { \\n            font-family: Arial, sans-serif; \\n            line-height: 1.6; \\n        } \\n        .container { \\n            width: 80%; \\n            margin: auto; \\n        } \\n        .product-table { \\n            width: 100%; \\n            border-collapse: collapse; \\n            margin-bottom: 20px; \\n        } \\n        .product-table, .product-table th, .product-table td { \\n            border: 1px solid #ddd; \\n        } \\n        .product-table th, .product-table td { \\n            padding: 10px; \\n            text-align: left; \\n        } \\n        .product-table th { \\n            background-color: #f4f4f4; \\n        } \\n        h2 { \\n            color: #333; \\n        } \\n        h3 { \\n            color: #555; \\n        } \\n \\n \\n \\n \\n         Anadrol \\n \\n \\n                 Generic Name \\n                 Oxymetholone \\n \\n \\n                 Quantity \\n                 50 tablets \\n \\n \\n                 Strength \\n                 50mg/tab \\n \\n \\n                 Administration \\n                 For oral use only \\n \\n \\n                 Price \\n                 45\u20ac \\n \\n \\n \\n         About the Product \\n \\n            Anadrol, known generically as Oxymetholone, is a powerful anabolic steroid used to enhance muscle growth and strength. It is often used in bulking cycles due to its effectiveness in rapidly increasing muscle mass and strength.",
          "Anadrol is recognized for its potent anabolic effects, which can lead to significant gains in size and strength, but it should be used cautiously due to its potential side effects. \\n \\n \\n         Benefits \\n \\n             Rapidly increases muscle mass and strength.",
          "\\n             Highly effective in bulking cycles. \\n             Can help improve overall physical performance and endurance.",
          "\\n             Promotes increased red blood cell production, which can enhance stamina. \\n \\n \\n         Uses \\n \\n             Used primarily in bulking cycles to gain muscle mass and strength.",
          "\\n             Helps improve overall physical performance and endurance. \\n             Can be beneficial for those looking to quickly increase body weight and strength.",
          "\\n \\n \\n \\n \\n."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Pills"
      ],
      "keywords": [
          "anadrol",
          "anadrol",
          "anadrol research"
      ],
      "metaTitle": "Anadrol | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy Anadrol for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is Anadrol intended for?",
              "a": "Anadrol is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/Task-6157577-1-3-1.png",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "halotestin",
      "name": "Halotestin",
      "category": "Research Essentials",
      "strength": "Laboratory Research",
      "format": "pills",
      "price": 75.0,
      "includesWater": false,
      "shortDescription": "\\n \t Generic Name: Fluoxymesterone \\n \t Quantity: 50 tablets \\n \t Strength: 10mg/tab \\n \t Administration: For oral use only \\n",
      "longDescription": [
          "\\n \\n \\n \\n \\n     Halotestin Product Description \\n \\n        body { \\n            font-family: Arial, sans-serif; \\n            line-height: 1.6; \\n        } \\n        .container { \\n            width: 80%; \\n            margin: auto; \\n        } \\n        .product-table { \\n            width: 100%; \\n            border-collapse: collapse; \\n            margin-bottom: 20px; \\n        } \\n        .product-table, .product-table th, .product-table td { \\n            border: 1px solid #ddd; \\n        } \\n        .product-table th, .product-table td { \\n            padding: 10px; \\n            text-align: left; \\n        } \\n        .product-table th { \\n            background-color: #f4f4f4; \\n        } \\n        h2 { \\n            color: #333; \\n        } \\n        h3 { \\n            color: #555; \\n        } \\n \\n \\n \\n \\n         Halotestin \\n \\n \\n                 Generic Name \\n                 Fluoxymesterone \\n \\n \\n                 Quantity \\n                 50 tablets \\n \\n \\n                 Strength \\n                 10mg/tab \\n \\n \\n                 Administration \\n                 For oral use only \\n \\n \\n                 Price \\n                 75\u20ac \\n \\n \\n \\n         About the Product \\n \\n            Halotestin, with the generic name Fluoxymesterone, is a powerful anabolic steroid known for its strong androgenic effects. It is primarily used to increase strength and aggression, making it a popular choice among athletes and bodybuilders.",
          "Due to its potent nature, Halotestin is often used in cutting phases to enhance performance and achieve a more defined physique. It should be used with caution due to its potential for significant side effects.",
          "\\n \\n \\n         Benefits \\n \\n             Significantly enhances strength and physical performance. \\n             Improves aggression and mental focus, which can be beneficial for intense training sessions.",
          "\\n             Can aid in achieving a more defined physique during cutting cycles. \\n             Supports increased muscle hardness and density.",
          "\\n \\n \\n         Uses \\n \\n             Enhancing strength and physical performance. \\n             Improving aggression and focus during workouts.",
          "\\n             Used in cutting phases to achieve a more defined and muscular physique. \\n             Helps in achieving greater muscle hardness and density.",
          "\\n \\n \\n \\n \\n."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Pills"
      ],
      "keywords": [
          "halotestin",
          "halotestin",
          "halotestin research"
      ],
      "metaTitle": "Halotestin | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy Halotestin for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is Halotestin intended for?",
              "a": "Halotestin is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/8.jpg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "winstrol",
      "name": "Winstrol",
      "category": "Research Essentials",
      "strength": "Laboratory Research",
      "format": "pills",
      "price": 35.0,
      "includesWater": false,
      "shortDescription": "\\n \t Generic Name: Stanozolol \\n \t Quantity: 100 tablets \\n \t Strength: 10mg/tab \\n \t Administration: For oral use only \\n",
      "longDescription": [
          "\\n \\n \\n \\n \\n     Winstrol Product Description \\n \\n        body { \\n            font-family: Arial, sans-serif; \\n            line-height: 1.6; \\n        } \\n        .container { \\n            width: 80%; \\n            margin: auto; \\n        } \\n        .product-table { \\n            width: 100%; \\n            border-collapse: collapse; \\n            margin-bottom: 20px; \\n        } \\n        .product-table, .product-table th, .product-table td { \\n            border: 1px solid #ddd; \\n        } \\n        .product-table th, .product-table td { \\n            padding: 10px; \\n            text-align: left; \\n        } \\n        .product-table th { \\n            background-color: #f4f4f4; \\n        } \\n        h2 { \\n            color: #333; \\n        } \\n        h3 { \\n            color: #555; \\n        } \\n \\n \\n \\n \\n         Winstrol \\n \\n \\n                 Generic Name \\n                 Stanozolol \\n \\n \\n                 Quantity \\n                 100 tablets \\n \\n \\n                 Strength \\n                 10mg/tab \\n \\n \\n                 Administration \\n                 For oral use only \\n \\n \\n                 Price \\n                 35\u20ac \\n \\n \\n \\n         About the Product \\n \\n            Winstrol, generically known as Stanozolol, is a popular anabolic steroid widely used in both cutting cycles and athletic performance enhancement. It is well-regarded for its ability to promote fat loss while preserving lean muscle mass.",
          "Winstrol is favored by bodybuilders and athletes alike for its ability to produce a hard, lean appearance without excessive water retention. Its oral formulation makes it convenient for users who prefer not to inject steroids.",
          "\\n \\n \\n         Benefits \\n \\n             Promotes fat loss while preserving lean muscle mass. \\n             Enhances strength and endurance, making it ideal for athletic performance.",
          "\\n             Produces a hard, lean physique with minimal water retention. \\n             Convenient oral administration.",
          "\\n \\n \\n         Uses \\n \\n             Used in cutting cycles to achieve a lean, defined physique. \\n             Enhancing athletic performance, including strength and endurance.",
          "\\n             Ideal for bodybuilders aiming for a hard, vascular appearance. \\n             Maintaining muscle mass during periods of caloric deficit.",
          "\\n \\n \\n \\n \\n."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Pills"
      ],
      "keywords": [
          "winstrol",
          "winstrol",
          "winstrol research"
      ],
      "metaTitle": "Winstrol | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy Winstrol for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is Winstrol intended for?",
              "a": "Winstrol is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/9.jpg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "tbol10-4-chlorodehydromethyltestosterone",
      "name": "Tbol10 (4-chlorodehydromethyltestosterone)",
      "category": "Research Essentials",
      "strength": "Laboratory Research",
      "format": "pills",
      "price": 50.0,
      "includesWater": false,
      "shortDescription": "\\n \t Generic Name: Turinabol \\n \t Quantity: 100 tablets \\n \t Strength: 10mg/tab \\n \t Administration: For oral use only \\n",
      "longDescription": [
          "\\n \\n \\n \\n \\n     Tbol10 Product Description \\n \\n        body { \\n            font-family: Arial, sans-serif; \\n            line-height: 1.6; \\n        } \\n        .container { \\n            width: 80%; \\n            margin: auto; \\n        } \\n        .product-table { \\n            width: 100%; \\n            border-collapse: collapse; \\n            margin-bottom: 20px; \\n        } \\n        .product-table, .product-table th, .product-table td { \\n            border: 1px solid #ddd; \\n        } \\n        .product-table th, .product-table td { \\n            padding: 10px; \\n            text-align: left; \\n        } \\n        .product-table th { \\n            background-color: #f4f4f4; \\n        } \\n        h2 { \\n            color: #333; \\n        } \\n        h3 { \\n            color: #555; \\n        } \\n \\n \\n \\n \\n         Tbol10 (4-chlorodehydromethyltestosterone) \\n \\n \\n                 Generic Name \\n                 Turinabol \\n \\n \\n                 Quantity \\n                 100 tablets \\n \\n \\n                 Strength \\n                 10mg/tab \\n \\n \\n                 Administration \\n                 For oral use only \\n \\n \\n                 Price \\n                 50\u20ac \\n \\n \\n \\n         About the Product \\n \\n            Tbol10, also known as Turinabol (4-chlorodehydromethyltestosterone), is an anabolic steroid that offers a balanced mix of anabolic and androgenic effects. It is favored by athletes and bodybuilders for its ability to promote lean muscle gains without significant water retention.",
          "Turinabol is commonly used during cutting cycles, but it is also effective for building strength and endurance, making it a versatile addition to any performance-enhancing regimen. \\n \\n \\n         Benefits \\n \\n             Promotes lean muscle gains with minimal water retention.",
          "\\n             Enhances strength and endurance, beneficial for both bulking and cutting cycles. \\n             Improves overall athletic performance without excessive bulk.",
          "\\n             Oral administration makes it a convenient choice. \\n \\n \\n         Uses \\n \\n             Ideal for cutting cycles to maintain lean muscle mass while reducing body fat.",
          "\\n             Used to enhance strength and endurance during both training and competition. \\n             Favored by athletes who require performance enhancement without significant weight gain.",
          "\\n             Maintains muscle hardness and definition during caloric deficits. \\n \\n \\n \\n \\n."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Pills"
      ],
      "keywords": [
          "tbol10 (4-chlorodehydromethyltestosterone)",
          "tbol10-4-chlorodehydromethyltestosterone",
          "tbol10 (4-chlorodehydromethyltestosterone) research"
      ],
      "metaTitle": "Tbol10 (4-chlorodehydromethyltestosterone) | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy Tbol10 (4-chlorodehydromethyltestosterone) for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is Tbol10 (4-chlorodehydromethyltestosterone) intended for?",
              "a": "Tbol10 (4-chlorodehydromethyltestosterone) is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/10.jpg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "dbol10",
      "name": "DBOL10",
      "category": "Research Essentials",
      "strength": "Laboratory Research",
      "format": "pills",
      "price": 30.0,
      "includesWater": false,
      "shortDescription": "Generic Name: Dianabol \\nQuantity: 100 tablets \\nStrength: 10mg/tab \\nAdministration: For oral use only",
      "longDescription": [
          "\\n \\n \\n \\n \\n     Dbol10 Product Description \\n \\n        body { \\n            font-family: Arial, sans-serif; \\n            line-height: 1.6; \\n        } \\n        .container { \\n            width: 80%; \\n            margin: auto; \\n        } \\n        .product-table { \\n            width: 100%; \\n            border-collapse: collapse; \\n            margin-bottom: 20px; \\n        } \\n        .product-table, .product-table th, .product-table td { \\n            border: 1px solid #ddd; \\n        } \\n        .product-table th, .product-table td { \\n            padding: 10px; \\n            text-align: left; \\n        } \\n        .product-table th { \\n            background-color: #f4f4f4; \\n        } \\n        h2 { \\n            color: #333; \\n        } \\n        h3 { \\n            color: #555; \\n        } \\n \\n \\n \\n \\n         Dbol10 (Methandrostenolone) \\n \\n \\n                 Generic Name \\n                 Dianabol (Methandrostenolone) \\n \\n \\n                 Quantity \\n                 100 tablets \\n \\n \\n                 Strength \\n                 10mg/tab \\n \\n \\n                 Administration \\n                 For oral use only \\n \\n \\n                 Price \\n                 30\u20ac \\n \\n \\n \\n         About the Product \\n \\n            Dbol10, known as Dianabol (Methandrostenolone), is one of the most popular anabolic steroids used by bodybuilders and athletes for rapid muscle gains and strength enhancement. Dianabol is highly effective in bulking cycles, where it helps users gain significant muscle mass in a short period.",
          "It is favored for its potent anabolic effects, though it can cause water retention, making it more suitable for mass-building phases rather than cutting. \\n \\n \\n         Benefits \\n \\n             Rapid muscle mass gain, making it ideal for bulking cycles.",
          "\\n             Significant strength enhancement, improving overall performance. \\n             Boosts protein synthesis and nitrogen retention for muscle growth.",
          "\\n             Convenient oral administration. \\n \\n \\n         Uses \\n \\n             Used in bulking cycles to achieve significant muscle mass gains.",
          "\\n             Enhances strength and power for intense training sessions. \\n             Promotes increased protein synthesis, leading to faster muscle recovery and growth.",
          "\\n             Often stacked with other steroids for a more effective bulking regimen. \\n \\n \\n \\n \\n."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Pills"
      ],
      "keywords": [
          "dbol10",
          "dbol10",
          "dbol10 research"
      ],
      "metaTitle": "DBOL10 | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy DBOL10 for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is DBOL10 intended for?",
              "a": "DBOL10 is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/11.jpg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "test-c-300-testosterone-cypionate",
      "name": "Test C 300 (Testosterone Cypionate)",
      "category": "Research Essentials",
      "strength": "Laboratory Research",
      "format": "vial",
      "price": 40.0,
      "includesWater": true,
      "shortDescription": "\\n \t Type: Injection \\n \t Strength: 300mg/ml \\n \t Quantity: Sterile 10 ml \\n \t Administration: For intramuscular use only \\n \t Each ml contains: 300mg Testosterone Cypionate \\n",
      "longDescription": [
          "\\n \\n \\n \\n \\n     Test C 300 Product Description \\n \\n        body { \\n            font-family: Arial, sans-serif; \\n            line-height: 1.6; \\n        } \\n        .container { \\n            width: 80%; \\n            margin: auto; \\n        } \\n        .product-table { \\n            width: 100%; \\n            border-collapse: collapse; \\n            margin-bottom: 20px; \\n        } \\n        .product-table, .product-table th, .product-table td { \\n            border: 1px solid #ddd; \\n        } \\n        .product-table th, .product-table td { \\n            padding: 10px; \\n            text-align: left; \\n        } \\n        .product-table th { \\n            background-color: #f4f4f4; \\n        } \\n        h2 { \\n            color: #333; \\n        } \\n        h3 { \\n            color: #555; \\n        } \\n \\n \\n \\n \\n         Test C 300 (Testosterone Cypionate) \\n \\n \\n                 Type \\n                 Injection \\n \\n \\n                 Strength \\n                 300mg/ml \\n \\n \\n                 Quantity \\n                 Sterile 10 ml \\n \\n \\n                 Administration \\n                 For intramuscular use only \\n \\n \\n                 Each ml contains \\n                 300mg Testosterone Cypionate \\n \\n \\n                 Price \\n                 40\u20ac \\n \\n \\n \\n         About the Product \\n \\n            Test C 300, also known as Testosterone Cypionate, is a long-acting testosterone ester widely used in hormone replacement therapy (HRT) and for enhancing athletic performance. As a potent anabolic steroid, Testosterone Cypionate plays a crucial role in promoting muscle growth, increasing strength, and improving overall physical performance.",
          "It is commonly used in bulking cycles to achieve significant muscle mass gains. Due to its slow-release properties, Test C 300 provides a steady release of testosterone, requiring less frequent injections compared to other testosterone esters.",
          "\\n \\n \\n         Benefits \\n \\n             Promotes significant muscle growth and strength enhancement. \\n             Long-acting testosterone ester requiring fewer injections.",
          "\\n             Supports overall physical performance and recovery. \\n             Commonly used in hormone replacement therapy to address low testosterone levels.",
          "\\n \\n \\n         Uses \\n \\n             Used in bulking cycles to gain muscle mass and increase strength. \\n             Administered in hormone replacement therapy to treat testosterone deficiency.",
          "\\n             Enhances athletic performance by boosting testosterone levels. \\n             Supports faster recovery and endurance during intense training sessions.",
          "\\n \\n \\n \\n \\n."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Vial"
      ],
      "keywords": [
          "test c 300 (testosterone cypionate)",
          "test-c-300-testosterone-cypionate",
          "test c 300 (testosterone cypionate) research"
      ],
      "metaTitle": "Test C 300 (Testosterone Cypionate) | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy Test C 300 (Testosterone Cypionate) for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is Test C 300 (Testosterone Cypionate) intended for?",
              "a": "Test C 300 (Testosterone Cypionate) is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/12.jpg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "test-p-150-testosterone-propionate",
      "name": "Test P 150 (Testosterone Propionate)",
      "category": "Research Essentials",
      "strength": "Laboratory Research",
      "format": "vial",
      "price": 32.5,
      "includesWater": true,
      "shortDescription": "\\n \t Type: Injection \\n \t Strength: 150mg/ml \\n \t Quantity: Sterile 10 ml \\n \t Administration: For intramuscular use only \\n \t Each ml contains: 150mg Testosterone Propionate \\n",
      "longDescription": [
          "\\n \\n \\n \\n \\n     Test P 150 Product Description \\n \\n        body { \\n            font-family: Arial, sans-serif; \\n            line-height: 1.6; \\n        } \\n        .container { \\n            width: 80%; \\n            margin: auto; \\n        } \\n        .product-table { \\n            width: 100%; \\n            border-collapse: collapse; \\n            margin-bottom: 20px; \\n        } \\n        .product-table, .product-table th, .product-table td { \\n            border: 1px solid #ddd; \\n        } \\n        .product-table th, .product-table td { \\n            padding: 10px; \\n            text-align: left; \\n        } \\n        .product-table th { \\n            background-color: #f4f4f4; \\n        } \\n        h2 { \\n            color: #333; \\n        } \\n        h3 { \\n            color: #555; \\n        } \\n \\n \\n \\n \\n         Test P 150 (Testosterone Propionate) \\n \\n \\n                 Type \\n                 Injection \\n \\n \\n                 Strength \\n                 150mg/ml \\n \\n \\n                 Quantity \\n                 Sterile 10 ml \\n \\n \\n                 Administration \\n                 For intramuscular use only \\n \\n \\n                 Each ml contains \\n                 150mg Testosterone Propionate \\n \\n \\n                 Price \\n                 32,50\u20ac \\n \\n \\n \\n         About the Product \\n \\n            Test P 150, also known as Testosterone Propionate, is a fast-acting testosterone ester that is commonly used in both bulking and cutting cycles. It is known for its ability to promote rapid muscle growth and enhance strength.",
          "Testosterone Propionate is favored by athletes and bodybuilders for its ability to provide quick results due to its shorter half-life, requiring more frequent injections. This ester is particularly effective in maintaining stable blood testosterone levels, which can support improved energy, performance, and recovery.",
          "\\n \\n \\n         Benefits \\n \\n             Promotes rapid muscle growth and strength enhancement. \\n             Fast-acting testosterone ester providing quick results.",
          "\\n             Supports stable blood testosterone levels. \\n             Effective in both bulking and cutting cycles.",
          "\\n \\n \\n         Uses \\n \\n             Used in bulking cycles to gain lean muscle mass. \\n             Administered in cutting cycles to preserve muscle while reducing fat.",
          "\\n             Enhances athletic performance by increasing strength and endurance. \\n             Supports faster recovery and reduced muscle soreness after workouts.",
          "\\n \\n \\n \\n \\n."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Vial"
      ],
      "keywords": [
          "test p 150 (testosterone propionate)",
          "test-p-150-testosterone-propionate",
          "test p 150 (testosterone propionate) research"
      ],
      "metaTitle": "Test P 150 (Testosterone Propionate) | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy Test P 150 (Testosterone Propionate) for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is Test P 150 (Testosterone Propionate) intended for?",
              "a": "Test P 150 (Testosterone Propionate) is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/13.jpg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "test-e-300-testosterone-enanthate",
      "name": "Test E 300 (Testosterone Enanthate)",
      "category": "Research Essentials",
      "strength": "Laboratory Research",
      "format": "vial",
      "price": 40.0,
      "includesWater": true,
      "shortDescription": "Type: Injection \\nStrength: 300mg/ml \\nQuantity: Sterile 10 ml \\nAdministration: For intramuscular use only \\nEach ml contains: 300mg Testosterone Enanthate",
      "longDescription": [
          "\\n \\n \\n \\n \\n     Test E 300 Product Description \\n \\n        body { \\n            font-family: Arial, sans-serif; \\n            line-height: 1.6; \\n        } \\n        .container { \\n            width: 80%; \\n            margin: auto; \\n        } \\n        .product-table { \\n            width: 100%; \\n            border-collapse: collapse; \\n            margin-bottom: 20px; \\n        } \\n        .product-table, .product-table th, .product-table td { \\n            border: 1px solid #ddd; \\n        } \\n        .product-table th, .product-table td { \\n            padding: 10px; \\n            text-align: left; \\n        } \\n        .product-table th { \\n            background-color: #f4f4f4; \\n        } \\n        h2 { \\n            color: #333; \\n        } \\n        h3 { \\n            color: #555; \\n        } \\n \\n \\n \\n \\n         Test E 300 (Testosterone Enanthate) \\n \\n \\n                 Type \\n                 Injection \\n \\n \\n                 Strength \\n                 300mg/ml \\n \\n \\n                 Quantity \\n                 Sterile 10 ml \\n \\n \\n                 Administration \\n                 For intramuscular use only \\n \\n \\n                 Each ml contains \\n                 300mg Testosterone Enanthate \\n \\n \\n                 Price \\n                 40\u20ac \\n \\n \\n \\n         About the Product \\n \\n            Test E 300, also known as Testosterone Enanthate, is a long-acting testosterone ester widely used for hormone replacement therapy (HRT) and performance enhancement. It is particularly popular in bodybuilding and strength sports for its ability to significantly increase muscle mass and strength.",
          "Due to its longer half-life, Testosterone Enanthate requires less frequent injections while maintaining stable testosterone levels. This makes it an ideal choice for those looking to achieve consistent and lasting results in their training cycles.",
          "\\n \\n \\n         Benefits \\n \\n             Promotes substantial muscle growth and strength gains. \\n             Long-acting testosterone ester requiring fewer injections.",
          "\\n             Helps maintain stable blood testosterone levels. \\n             Ideal for both bulking and cutting cycles.",
          "\\n \\n \\n         Uses \\n \\n             Used in bulking cycles to gain significant muscle mass. \\n             Administered in hormone replacement therapy to address low testosterone levels.",
          "\\n             Supports improved athletic performance and endurance. \\n             Helps maintain muscle mass during cutting cycles.",
          "\\n \\n \\n \\n \\n."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Vial"
      ],
      "keywords": [
          "test e 300 (testosterone enanthate)",
          "test-e-300-testosterone-enanthate",
          "test e 300 (testosterone enanthate) research"
      ],
      "metaTitle": "Test E 300 (Testosterone Enanthate) | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy Test E 300 (Testosterone Enanthate) for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is Test E 300 (Testosterone Enanthate) intended for?",
              "a": "Test E 300 (Testosterone Enanthate) is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/14.jpg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "sus-250-sustanon-250",
      "name": "SUS 250 (Sustanon 250)",
      "category": "Research Essentials",
      "strength": "Laboratory Research",
      "format": "vial",
      "price": 45.0,
      "includesWater": true,
      "shortDescription": "\\n \t Type: Injection \\n \t Strength: 250mg/ml \\n \t Quantity: Sterile 10 ml \\n \t Administration: For intramuscular use only \\n \t Each ml contains: \\n \t Testosterone Propionate: 30mg \\n \t Testosterone Phenylpropionate: 60mg \\n \t Testosterone Isocaproate: 60mg \\n \t Testosterone Decanoate: 100mg \\n",
      "longDescription": [
          "\\n \\n \\n \\n \\n     SUS 250 Product Description \\n \\n        body { \\n            font-family: Arial, sans-serif; \\n            line-height: 1.6; \\n        } \\n        .container { \\n            width: 80%; \\n            margin: auto; \\n        } \\n        .product-table { \\n            width: 100%; \\n            border-collapse: collapse; \\n            margin-bottom: 20px; \\n        } \\n        .product-table, .product-table th, .product-table td { \\n            border: 1px solid #ddd; \\n        } \\n        .product-table th, .product-table td { \\n            padding: 10px; \\n            text-align: left; \\n        } \\n        .product-table th { \\n            background-color: #f4f4f4; \\n        } \\n        h2 { \\n            color: #333; \\n        } \\n        h3 { \\n            color: #555; \\n        } \\n \\n \\n \\n \\n         SUS 250 (Sustanon 250) \\n \\n \\n                 Type \\n                 Injection \\n \\n \\n                 Strength \\n                 250mg/ml \\n \\n \\n                 Quantity \\n                 Sterile 10 ml \\n \\n \\n                 Administration \\n                 For intramuscular use only \\n \\n \\n                 Each ml contains \\n \\n \\n                         Testosterone Propionate: 30mg \\n                         Testosterone Phenylpropionate: 60mg \\n                         Testosterone Isocaproate: 60mg \\n                         Testosterone Decanoate: 100mg \\n \\n \\n \\n \\n                 Price \\n                 45\u20ac \\n \\n \\n \\n         About the Product \\n \\n            SUS 250, commonly known as Sustanon 250, is a powerful testosterone blend designed to provide a long-lasting release of testosterone into the bloodstream. This unique mixture combines four different testosterone esters, each with varying release times, to maintain consistent testosterone levels in the body.",
          "It is widely used in both hormone replacement therapy (HRT) and performance enhancement. Athletes and bodybuilders favor Sustanon 250 for its ability to promote significant muscle mass and strength gains, as well as its convenience due to less frequent injections compared to single-ester testosterone products.",
          "\\n \\n \\n         Benefits \\n \\n             Provides a sustained release of testosterone due to its blend of esters. \\n             Promotes substantial muscle growth and strength enhancement.",
          "\\n             Maintains stable testosterone levels in the body. \\n             Less frequent injections required compared to single-ester testosterone.",
          "\\n \\n \\n         Uses \\n \\n             Used in bulking cycles to build significant muscle mass. \\n             Administered in hormone replacement therapy to maintain normal testosterone levels.",
          "\\n             Enhances athletic performance and overall physical strength. \\n             Supports recovery and reduces muscle soreness after intense workouts.",
          "\\n \\n \\n \\n \\n."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Vial"
      ],
      "keywords": [
          "sus 250 (sustanon 250)",
          "sus-250-sustanon-250",
          "sus 250 (sustanon 250) research"
      ],
      "metaTitle": "SUS 250 (Sustanon 250) | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy SUS 250 (Sustanon 250) for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is SUS 250 (Sustanon 250) intended for?",
              "a": "SUS 250 (Sustanon 250) is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/15.jpg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "npp-150-nandrolone-phenylpropionate",
      "name": "NPP 150 (Nandrolone Phenylpropionate)",
      "category": "Research Essentials",
      "strength": "Laboratory Research",
      "format": "vial",
      "price": 40.0,
      "includesWater": true,
      "shortDescription": "\\n \t Type: Injection \\n \t Strength: 150mg/ml \\n \t Quantity: Sterile 10 ml \\n \t Administration: For intramuscular use only \\n \t Each ml contains: 150mg Nandrolone Phenylpropionate \\n",
      "longDescription": [
          "\\n \\n \\n \\n \\n     NPP 150 Product Description \\n \\n        body { \\n            font-family: Arial, sans-serif; \\n            line-height: 1.6; \\n        } \\n        .container { \\n            width: 80%; \\n            margin: auto; \\n        } \\n        .product-table { \\n            width: 100%; \\n            border-collapse: collapse; \\n            margin-bottom: 20px; \\n        } \\n        .product-table, .product-table th, .product-table td { \\n            border: 1px solid #ddd; \\n        } \\n        .product-table th, .product-table td { \\n            padding: 10px; \\n            text-align: left; \\n        } \\n        .product-table th { \\n            background-color: #f4f4f4; \\n        } \\n        h2 { \\n            color: #333; \\n        } \\n        h3 { \\n            color: #555; \\n        } \\n \\n \\n \\n \\n         NPP 150 (Nandrolone Phenylpropionate) \\n \\n \\n                 Type \\n                 Injection \\n \\n \\n                 Strength \\n                 150mg/ml \\n \\n \\n                 Quantity \\n                 Sterile 10 ml \\n \\n \\n                 Administration \\n                 For intramuscular use only \\n \\n \\n                 Each ml contains \\n                 150mg Nandrolone Phenylpropionate \\n \\n \\n                 Price \\n                 40\u20ac \\n \\n \\n \\n         About the Product \\n \\n            NPP 150, also known as Nandrolone Phenylpropionate, is a popular anabolic steroid used in both bodybuilding and therapeutic settings. It is favored for its ability to enhance muscle growth, increase strength, and improve recovery times.",
          "Nandrolone Phenylpropionate is a fast-acting ester of nandrolone, known for its shorter half-life compared to other nandrolone esters. This allows for more frequent dosing and faster results.",
          "The product is often used to help achieve lean muscle gains and improve overall physique during cutting and bulking cycles. \\n \\n \\n         Benefits \\n \\n             Promotes significant muscle growth and strength gains.",
          "\\n             Enhances recovery and reduces muscle soreness. \\n             Fast-acting ester for quicker results.",
          "\\n             Helps achieve lean muscle gains with minimal water retention. \\n \\n \\n         Uses \\n \\n             Used in bulking cycles to increase muscle mass and strength.",
          "\\n             Administered in cutting cycles to enhance muscle definition and reduce fat. \\n             Supports improved recovery and performance in strength training.",
          "\\n             Helps to improve overall muscle quality and density. \\n \\n \\n \\n \\n."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Vial"
      ],
      "keywords": [
          "npp 150 (nandrolone phenylpropionate)",
          "npp-150-nandrolone-phenylpropionate",
          "npp 150 (nandrolone phenylpropionate) research"
      ],
      "metaTitle": "NPP 150 (Nandrolone Phenylpropionate) | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy NPP 150 (Nandrolone Phenylpropionate) for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is NPP 150 (Nandrolone Phenylpropionate) intended for?",
              "a": "NPP 150 (Nandrolone Phenylpropionate) is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/16.jpg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "deca-300-nandrolone-decanoate",
      "name": "DECA 300 (Nandrolone Decanoate)",
      "category": "Research Essentials",
      "strength": "Laboratory Research",
      "format": "vial",
      "price": 45.0,
      "includesWater": true,
      "shortDescription": "Type: Injection \\nStrength: 300mg/ml \\nQuantity: Sterile 10 ml \\nAdministration: For intramuscular use only \\nEach ml contains: 300mg Nandrolone Decanoate",
      "longDescription": [
          "\\n \\n \\n \\n \\n     DECA 300 Product Description \\n \\n        body { \\n            font-family: Arial, sans-serif; \\n            line-height: 1.6; \\n        } \\n        .container { \\n            width: 80%; \\n            margin: auto; \\n        } \\n        .product-table { \\n            width: 100%; \\n            border-collapse: collapse; \\n            margin-bottom: 20px; \\n        } \\n        .product-table, .product-table th, .product-table td { \\n            border: 1px solid #ddd; \\n        } \\n        .product-table th, .product-table td { \\n            padding: 10px; \\n            text-align: left; \\n        } \\n        .product-table th { \\n            background-color: #f4f4f4; \\n        } \\n        h2 { \\n            color: #333; \\n        } \\n        h3 { \\n            color: #555; \\n        } \\n \\n \\n \\n \\n         DECA 300 (Nandrolone Decanoate) \\n \\n \\n                 Type \\n                 Injection \\n \\n \\n                 Strength \\n                 300mg/ml \\n \\n \\n                 Quantity \\n                 Sterile 10 ml \\n \\n \\n                 Administration \\n                 For intramuscular use only \\n \\n \\n                 Each ml contains \\n                 300mg Nandrolone Decanoate \\n \\n \\n                 Price \\n                 45\u20ac \\n \\n \\n \\n         About the Product \\n \\n            DECA 300, or Nandrolone Decanoate, is a highly effective anabolic steroid known for its ability to promote muscle growth and strength. It is characterized by its long-acting decanoate ester, which ensures sustained release and prolonged effects in the body.",
          "DECA 300 is widely used in bodybuilding and strength training to help increase muscle mass, enhance joint health, and improve overall performance. Its slow-release nature makes it suitable for those seeking consistent and gradual gains over extended periods.",
          "\\n \\n \\n         Benefits \\n \\n             Promotes significant muscle growth and strength. \\n             Improves joint health and reduces joint pain.",
          "\\n             Provides a steady release of nandrolone for prolonged effects. \\n             Helps in gaining muscle mass with minimal water retention.",
          "\\n \\n \\n         Uses \\n \\n             Used in bulking cycles to enhance muscle mass and strength. \\n             Administered to support joint health and reduce joint discomfort.",
          "\\n             Ideal for long-term cycles due to its slow-release ester. \\n             Helps in achieving steady muscle gains and overall physique improvement.",
          "\\n \\n \\n \\n \\n."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Vial"
      ],
      "keywords": [
          "deca 300 (nandrolone decanoate)",
          "deca-300-nandrolone-decanoate",
          "deca 300 (nandrolone decanoate) research"
      ],
      "metaTitle": "DECA 300 (Nandrolone Decanoate) | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy DECA 300 (Nandrolone Decanoate) for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is DECA 300 (Nandrolone Decanoate) intended for?",
              "a": "DECA 300 (Nandrolone Decanoate) is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/17.jpg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "primo-e-150-methenolone-enanthate",
      "name": "PRIMO E 150 (Methenolone Enanthate)",
      "category": "Research Essentials",
      "strength": "Laboratory Research",
      "format": "vial",
      "price": 65.0,
      "includesWater": true,
      "shortDescription": "Type: Injection \\nStrength: 150mg/ml \\nQuantity: Sterile 10 ml \\nAdministration: For intramuscular use only \\nEach ml contains: 150mg Methenolone Enanthate",
      "longDescription": [
          "\\n \\n \\n \\n \\n     PRIMO E 150 Product Description \\n \\n        body { \\n            font-family: Arial, sans-serif; \\n            line-height: 1.6; \\n        } \\n        .container { \\n            width: 80%; \\n            margin: auto; \\n        } \\n        .product-table { \\n            width: 100%; \\n            border-collapse: collapse; \\n            margin-bottom: 20px; \\n        } \\n        .product-table, .product-table th, .product-table td { \\n            border: 1px solid #ddd; \\n        } \\n        .product-table th, .product-table td { \\n            padding: 10px; \\n            text-align: left; \\n        } \\n        .product-table th { \\n            background-color: #f4f4f4; \\n        } \\n        h2 { \\n            color: #333; \\n        } \\n        h3 { \\n            color: #555; \\n        } \\n \\n \\n \\n \\n         PRIMO E 150 (Methenolone Enanthate) \\n \\n \\n                 Type \\n                 Injection \\n \\n \\n                 Strength \\n                 150mg/ml \\n \\n \\n                 Quantity \\n                 Sterile 10 ml \\n \\n \\n                 Administration \\n                 For intramuscular use only \\n \\n \\n                 Each ml contains \\n                 150mg Methenolone Enanthate \\n \\n \\n                 Price \\n                 65\u20ac \\n \\n \\n \\n         About the Product \\n \\n            PRIMO E 150, or Methenolone Enanthate, is a potent anabolic steroid renowned for its ability to promote lean muscle mass without significant water retention. It is valued in bodybuilding and strength training for its mild androgenic properties and effectiveness in maintaining muscle mass during cutting phases.",
          "The enanthate ester provides a slow and steady release of methenolone, making it suitable for extended cycles and consistent gains. PRIMO E 150 is particularly popular among athletes and bodybuilders seeking quality muscle development with minimal side effects.",
          "\\n \\n \\n         Benefits \\n \\n             Promotes lean muscle growth with minimal water retention. \\n             Helps in maintaining muscle mass during cutting phases.",
          "\\n             Provides a slow and steady release for prolonged effects. \\n             Mild androgenic effects reduce the risk of side effects.",
          "\\n \\n \\n         Uses \\n \\n             Used in cutting cycles to preserve muscle mass while reducing body fat. \\n             Ideal for athletes and bodybuilders looking for quality muscle gains.",
          "\\n             Administered to support long-term muscle maintenance with less frequent injections. \\n             Effective in achieving a defined physique without excessive water retention.",
          "\\n \\n \\n \\n \\n."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Vial"
      ],
      "keywords": [
          "primo e 150 (methenolone enanthate)",
          "primo-e-150-methenolone-enanthate",
          "primo e 150 (methenolone enanthate) research"
      ],
      "metaTitle": "PRIMO E 150 (Methenolone Enanthate) | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy PRIMO E 150 (Methenolone Enanthate) for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is PRIMO E 150 (Methenolone Enanthate) intended for?",
              "a": "PRIMO E 150 (Methenolone Enanthate) is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/18.jpg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "mast-p-150-drostanolone-propionate",
      "name": "MAST P 150 (Drostanolone Propionate)",
      "category": "Research Essentials",
      "strength": "Laboratory Research",
      "format": "vial",
      "price": 40.0,
      "includesWater": true,
      "shortDescription": "Type: Injection \\nStrength: 150mg/ml \\nQuantity: Sterile 10 ml \\nAdministration: For intramuscular use only \\nEach ml contains: 150mg Drostanolone Propionate",
      "longDescription": [
          "\\n \\n \\n \\n \\n     MAST P 150 Product Description \\n \\n        body { \\n            font-family: Arial, sans-serif; \\n            line-height: 1.6; \\n        } \\n        .container { \\n            width: 80%; \\n            margin: auto; \\n        } \\n        .product-table { \\n            width: 100%; \\n            border-collapse: collapse; \\n            margin-bottom: 20px; \\n        } \\n        .product-table, .product-table th, .product-table td { \\n            border: 1px solid #ddd; \\n        } \\n        .product-table th, .product-table td { \\n            padding: 10px; \\n            text-align: left; \\n        } \\n        .product-table th { \\n            background-color: #f4f4f4; \\n        } \\n        h2 { \\n            color: #333; \\n        } \\n        h3 { \\n            color: #555; \\n        } \\n \\n \\n \\n \\n         MAST P 150 (Drostanolone Propionate) \\n \\n \\n                 Type \\n                 Injection \\n \\n \\n                 Strength \\n                 150mg/ml \\n \\n \\n                 Quantity \\n                 Sterile 10 ml \\n \\n \\n                 Administration \\n                 For intramuscular use only \\n \\n \\n                 Each ml contains \\n                 150mg Drostanolone Propionate \\n \\n \\n                 Price \\n                 40\u20ac \\n \\n \\n \\n         About the Product \\n \\n            MAST P 150, also known as Drostanolone Propionate, is a powerful anabolic steroid known for its ability to enhance muscle hardness and definition. It is especially popular during cutting cycles due to its capacity to help users achieve a lean and vascular physique.",
          "The propionate ester provides a rapid release of Drostanolone, making it suitable for those seeking fast results with frequent administration. MAST P 150 is valued for its minimal estrogenic effects and effectiveness in promoting a ripped and toned appearance.",
          "\\n \\n \\n         Benefits \\n \\n             Enhances muscle hardness and definition. \\n             Helps achieve a lean and vascular physique during cutting phases.",
          "\\n             Provides a rapid release for quicker results. \\n             Minimizes estrogenic side effects and water retention.",
          "\\n \\n \\n         Uses \\n \\n             Used in cutting cycles to improve muscle definition and vascularity. \\n             Ideal for athletes and bodybuilders seeking a more ripped and toned appearance.",
          "\\n             Administered to achieve noticeable results with frequent dosing. \\n             Effective in maintaining muscle mass while reducing body fat.",
          "\\n \\n \\n \\n \\n."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Vial"
      ],
      "keywords": [
          "mast p 150 (drostanolone propionate)",
          "mast-p-150-drostanolone-propionate",
          "mast p 150 (drostanolone propionate) research"
      ],
      "metaTitle": "MAST P 150 (Drostanolone Propionate) | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy MAST P 150 (Drostanolone Propionate) for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is MAST P 150 (Drostanolone Propionate) intended for?",
              "a": "MAST P 150 (Drostanolone Propionate) is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/19.jpg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "mast-e-200-drostanolone-enantathe",
      "name": "MAST E 200 (Drostanolone Enantathe )",
      "category": "Research Essentials",
      "strength": "Laboratory Research",
      "format": "vial",
      "price": 50.0,
      "includesWater": true,
      "shortDescription": "\\n \t Type: Injection \\n \t Strength: 200mg/ml \\n \t Quantity: Sterile 10 ml \\n \t Administration: For intramuscular use only \\n \t Each ml contains: 200mg Drostanolone Enantathe \\n",
      "longDescription": [
          "&nbsp; \\n \\n \\n        body { \\n            font-family: Arial, sans-serif; \\n            line-height: 1.6; \\n        } \\n        .container { \\n            width: 80%; \\n            margin: auto; \\n        } \\n        .product-table { \\n            width: 100%; \\n            border-collapse: collapse; \\n            margin-bottom: 20px; \\n        } \\n        .product-table, .product-table th, .product-table td { \\n            border: 1px solid #ddd; \\n        } \\n        .product-table th, .product-table td { \\n            padding: 10px; \\n            text-align: left; \\n        } \\n        .product-table th { \\n            background-color: #f4f4f4; \\n        } \\n        h2 { \\n            color: #333; \\n        } \\n        h3 { \\n            color: #555; \\n        } \\n \\n \\n&nbsp; \\n \\n MAST E 200 (Drostanolone Enanthate) \\n \\n \\n \\n Type \\n Injection \\n \\n \\n Strength \\n 200mg/ml \\n \\n \\n Quantity \\n Sterile 10 ml \\n \\n \\n Administration \\n For intramuscular use only \\n \\n \\n Each ml contains \\n 200mg Drostanolone Enanthate \\n \\n \\n Price \\n 50\u20ac \\n \\n \\n \\n About the Product \\nMAST E 200, or Drostanolone Enanthate, is a potent anabolic steroid known for its ability to enhance muscle hardness and definition. This product features the enanthate ester, which provides a slow and sustained release of Drostanolone, making it suitable for extended cycles and long-term use.",
          "MAST E 200 is highly regarded in bodybuilding and strength training for its effectiveness in promoting a lean, vascular, and well-defined physique. Its properties also help reduce estrogenic side effects, making it a preferred choice for those looking to achieve a refined and toned appearance.",
          "\\n Benefits \\n \\n \t Enhances muscle hardness and definition for a more sculpted look. \\n \t Provides a slow and steady release of Drostanolone for extended effects.",
          "\\n \t Helps achieve a lean and vascular physique with minimal water retention. \\n \t Reduces the risk of estrogenic side effects compared to other steroids.",
          "\\n \\n Uses \\n \\n \t Used in cutting cycles to improve muscle definition and reduce body fat. \\n \t Ideal for athletes and bodybuilders aiming for a refined and well-defined physique.",
          "\\n \t Administered for long-term use due to its slow-release ester, minimizing injection frequency. \\n \t Effective in maintaining muscle mass while focusing on fat loss and overall physique enhancement.",
          "\\n \\n \\n&nbsp;."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Vial"
      ],
      "keywords": [
          "mast e 200 (drostanolone enantathe )",
          "mast-e-200-drostanolone-enantathe",
          "mast e 200 (drostanolone enantathe ) research"
      ],
      "metaTitle": "MAST E 200 (Drostanolone Enantathe ) | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy MAST E 200 (Drostanolone Enantathe ) for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is MAST E 200 (Drostanolone Enantathe ) intended for?",
              "a": "MAST E 200 (Drostanolone Enantathe ) is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/mast-e.webp",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "bold-u-300-boldenone-undecylenate",
      "name": "BOLD U 300 (Boldenone Undecylenate)",
      "category": "Research Essentials",
      "strength": "Laboratory Research",
      "format": "vial",
      "price": 40.0,
      "includesWater": true,
      "shortDescription": "Type: Injection \\nStrength: 300mg/ml \\nQuantity: Sterile 10 ml \\nAdministration: For intramuscular use only \\nEach ml contains: 300mg Boldenone Undecylenate",
      "longDescription": [
          "\\n \\n \\n \\n \\n     BOLD U 300 Product Description \\n \\n        body { \\n            font-family: Arial, sans-serif; \\n            line-height: 1.6; \\n        } \\n        .container { \\n            width: 80%; \\n            margin: auto; \\n        } \\n        .product-table { \\n            width: 100%; \\n            border-collapse: collapse; \\n            margin-bottom: 20px; \\n        } \\n        .product-table, .product-table th, .product-table td { \\n            border: 1px solid #ddd; \\n        } \\n        .product-table th, .product-table td { \\n            padding: 10px; \\n            text-align: left; \\n        } \\n        .product-table th { \\n            background-color: #f4f4f4; \\n        } \\n        h2 { \\n            color: #333; \\n        } \\n        h3 { \\n            color: #555; \\n        } \\n \\n \\n \\n \\n         BOLD U 300 (Boldenone Undecylenate) \\n \\n \\n                 Type \\n                 Injection \\n \\n \\n                 Strength \\n                 300mg/ml \\n \\n \\n                 Quantity \\n                 Sterile 10 ml \\n \\n \\n                 Administration \\n                 For intramuscular use only \\n \\n \\n                 Each ml contains \\n                 300mg Boldenone Undecylenate \\n \\n \\n                 Price \\n                 40\u20ac \\n \\n \\n \\n         About the Product \\n \\n            BOLD U 300, or Boldenone Undecylenate, is a powerful anabolic steroid renowned for its ability to enhance muscle growth and improve physical performance. This product features a high concentration of Boldenone, which promotes increased red blood cell production and enhances protein synthesis, leading to improved muscle mass and strength.",
          "The undecylenate ester ensures a slow and sustained release of the hormone, allowing for less frequent injections and stable blood levels. BOLD U 300 is widely used in bulking cycles and for improving overall physique.",
          "\\n \\n \\n         Benefits \\n \\n             Promotes significant muscle growth and strength enhancement. \\n             Increases red blood cell production, improving endurance and recovery.",
          "\\n             Provides a slow and steady release for stable blood levels and less frequent injections. \\n             Enhances protein synthesis for better muscle development.",
          "\\n \\n \\n         Uses \\n \\n             Used in bulking cycles to maximize muscle growth and strength. \\n             Ideal for athletes and bodybuilders aiming to improve overall physique.",
          "\\n             Administered to maintain stable hormone levels with less frequent dosing. \\n             Effective for enhancing recovery and reducing fatigue during intense training.",
          "\\n \\n \\n \\n \\n."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Vial"
      ],
      "keywords": [
          "bold u 300 (boldenone undecylenate)",
          "bold-u-300-boldenone-undecylenate",
          "bold u 300 (boldenone undecylenate) research"
      ],
      "metaTitle": "BOLD U 300 (Boldenone Undecylenate) | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy BOLD U 300 (Boldenone Undecylenate) for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is BOLD U 300 (Boldenone Undecylenate) intended for?",
              "a": "BOLD U 300 (Boldenone Undecylenate) is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/20.jpg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "tren-a-150-trenbolone-acetate",
      "name": "TREN A 150 (Trenbolone Acetate)",
      "category": "Research Essentials",
      "strength": "Laboratory Research",
      "format": "vial",
      "price": 45.0,
      "includesWater": true,
      "shortDescription": "\\n \t Type: Injection \\n \t Strength: 150mg/ml \\n \t Quantity: Sterile 10 ml \\n \t Administration: For intramuscular use only \\n \t Each ml contains: 150mg Trenbolone Acetate \\n",
      "longDescription": [
          "\\n \\n \\n \\n \\n     TREN A 150 Product Description \\n \\n        body { \\n            font-family: Arial, sans-serif; \\n            line-height: 1.6; \\n        } \\n        .container { \\n            width: 80%; \\n            margin: auto; \\n        } \\n        .product-table { \\n            width: 100%; \\n            border-collapse: collapse; \\n            margin-bottom: 20px; \\n        } \\n        .product-table, .product-table th, .product-table td { \\n            border: 1px solid #ddd; \\n        } \\n        .product-table th, .product-table td { \\n            padding: 10px; \\n            text-align: left; \\n        } \\n        .product-table th { \\n            background-color: #f4f4f4; \\n        } \\n        h2 { \\n            color: #333; \\n        } \\n        h3 { \\n            color: #555; \\n        } \\n \\n \\n \\n \\n         TREN A 150 (Trenbolone Acetate) \\n \\n \\n                 Type \\n                 Injection \\n \\n \\n                 Strength \\n                 150mg/ml \\n \\n \\n                 Quantity \\n                 Sterile 10 ml \\n \\n \\n                 Administration \\n                 For intramuscular use only \\n \\n \\n                 Each ml contains \\n                 150mg Trenbolone Acetate \\n \\n \\n                 Price \\n                 45\u20ac \\n \\n \\n \\n         About the Product \\n \\n            TREN A 150, or Trenbolone Acetate, is a highly effective anabolic steroid known for its potent muscle-building and fat-burning properties. The acetate ester ensures a rapid release of Trenbolone, making it ideal for those seeking quick results with frequent injections.",
          "TREN A 150 is renowned for its ability to significantly increase muscle mass, strength, and overall performance while also enhancing muscle hardness and definition. It is widely used by athletes and bodybuilders during cutting and bulking cycles for its powerful effects and efficiency.",
          "\\n \\n \\n         Benefits \\n \\n             Promotes substantial muscle growth and strength gains. \\n             Enhances muscle hardness and definition.",
          "\\n             Facilitates rapid fat loss and improves overall body composition. \\n             Offers a fast-acting formula with frequent injections for quick results.",
          "\\n \\n \\n         Uses \\n \\n             Utilized in both cutting and bulking cycles to maximize muscle gains and fat loss. \\n             Ideal for athletes and bodybuilders aiming to enhance muscle definition and performance.",
          "\\n             Administered to achieve noticeable results with a potent, fast-acting formula. \\n             Effective in improving overall physique and strength during intense training periods.",
          "\\n \\n \\n \\n \\n."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Vial"
      ],
      "keywords": [
          "tren a 150 (trenbolone acetate)",
          "tren-a-150-trenbolone-acetate",
          "tren a 150 (trenbolone acetate) research"
      ],
      "metaTitle": "TREN A 150 (Trenbolone Acetate) | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy TREN A 150 (Trenbolone Acetate) for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is TREN A 150 (Trenbolone Acetate) intended for?",
              "a": "TREN A 150 (Trenbolone Acetate) is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/21.jpg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "tren-e-200-trenbolone-enanthate",
      "name": "TREN E 200 (Trenbolone Enanthate)",
      "category": "Research Essentials",
      "strength": "Laboratory Research",
      "format": "vial",
      "price": 50.0,
      "includesWater": true,
      "shortDescription": "Type: Injection \\nStrength: 200mg/ml \\nQuantity: Sterile 10 ml \\nAdministration: For intramuscular use only \\nEach ml contains: 200mg Trenbolone Enanthate",
      "longDescription": [
          "\\n \\n \\n \\n \\n     TREN E 200 Product Description \\n \\n        body { \\n            font-family: Arial, sans-serif; \\n            line-height: 1.6; \\n        } \\n        .container { \\n            width: 80%; \\n            margin: auto; \\n        } \\n        .product-table { \\n            width: 100%; \\n            border-collapse: collapse; \\n            margin-bottom: 20px; \\n        } \\n        .product-table, .product-table th, .product-table td { \\n            border: 1px solid #ddd; \\n        } \\n        .product-table th, .product-table td { \\n            padding: 10px; \\n            text-align: left; \\n        } \\n        .product-table th { \\n            background-color: #f4f4f4; \\n        } \\n        h2 { \\n            color: #333; \\n        } \\n        h3 { \\n            color: #555; \\n        } \\n \\n \\n \\n \\n         TREN E 200 (Trenbolone Enanthate) \\n \\n \\n                 Type \\n                 Injection \\n \\n \\n                 Strength \\n                 200mg/ml \\n \\n \\n                 Quantity \\n                 Sterile 10 ml \\n \\n \\n                 Administration \\n                 For intramuscular use only \\n \\n \\n                 Each ml contains \\n                 200mg Trenbolone Enanthate \\n \\n \\n                 Price \\n                 50\u20ac \\n \\n \\n \\n         About the Product \\n \\n            TREN E 200, or Trenbolone Enanthate, is a highly effective anabolic steroid known for its powerful muscle-building and fat-burning effects. Featuring the enanthate ester, this product provides a slower, more sustained release of Trenbolone, making it suitable for those who prefer less frequent injections.",
          "TREN E 200 is celebrated for its ability to significantly increase muscle mass, strength, and overall performance while enhancing muscle hardness and definition. It is commonly used by bodybuilders and athletes during cutting and bulking phases to achieve an impressive physique and optimal results.",
          "\\n \\n \\n         Benefits \\n \\n             Promotes significant muscle growth and strength gains. \\n             Enhances muscle hardness and definition.",
          "\\n             Facilitates fat loss while maintaining lean muscle mass. \\n             Provides a sustained release for less frequent injections and stable blood levels.",
          "\\n \\n \\n         Uses \\n \\n             Utilized in both cutting and bulking cycles to maximize muscle gains and fat loss. \\n             Ideal for athletes and bodybuilders aiming for improved muscle definition and overall performance.",
          "\\n             Administered to achieve steady results with a long-lasting formula. \\n             Effective for maintaining muscle mass during fat reduction phases and enhancing physical appearance.",
          "\\n \\n \\n \\n \\n."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Vial"
      ],
      "keywords": [
          "tren e 200 (trenbolone enanthate)",
          "tren-e-200-trenbolone-enanthate",
          "tren e 200 (trenbolone enanthate) research"
      ],
      "metaTitle": "TREN E 200 (Trenbolone Enanthate) | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy TREN E 200 (Trenbolone Enanthate) for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is TREN E 200 (Trenbolone Enanthate) intended for?",
              "a": "TREN E 200 (Trenbolone Enanthate) is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/22.jpg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "yohimbine-yohimbine-hcl",
      "name": "Yohimbine (yohimbine HCl )",
      "category": "Weight Management",
      "strength": "Laboratory Research",
      "format": "pills",
      "price": 30.0,
      "includesWater": false,
      "shortDescription": "\\n \t Generic Name: yohimbine \\n \t Quantity: 50 tablets \\n \t Strength: 5mg/tab \\n \t Administration: For oral use only \\n",
      "longDescription": [
          "&nbsp; \\n \\n \\n        body { \\n            font-family: Arial, sans-serif; \\n            line-height: 1.6; \\n        } \\n        .container { \\n            width: 80%; \\n            margin: auto; \\n        } \\n        .product-table { \\n            width: 100%; \\n            border-collapse: collapse; \\n            margin-bottom: 20px; \\n        } \\n        .product-table, .product-table th, .product-table td { \\n            border: 1px solid #ddd; \\n        } \\n        .product-table th, .product-table td { \\n            padding: 10px; \\n            text-align: left; \\n        } \\n        .product-table th { \\n            background-color: #f4f4f4; \\n        } \\n        h2 { \\n            color: #333; \\n        } \\n        h3 { \\n            color: #555; \\n        } \\n \\n \\n&nbsp; \\n \\n Yohimbine (Yohimbine HCl) \\n \\n \\n \\n Generic Name \\n Yohimbine \\n \\n \\n Quantity \\n 50 tablets \\n \\n \\n Strength \\n 5mg/tab \\n \\n \\n Administration \\n For oral use only \\n \\n \\n Price \\n 30\u20ac \\n \\n \\n \\n About the Product \\nYohimbine, known as Yohimbine HCl, is a popular supplement used for fat loss and enhancing athletic performance. Derived from the bark of the Yohimbe tree, it is primarily recognized for its ability to promote fat burning by increasing adrenaline levels and improving blood flow.",
          "Yohimbine is widely used during cutting cycles to aid in the reduction of stubborn fat, particularly in areas like the lower abdomen. Additionally, it is known for its potential benefits in enhancing libido and treating erectile dysfunction.",
          "\\n Benefits \\n \\n \t Promotes fat loss by increasing adrenaline levels and thermogenesis. \\n \t Enhances blood flow, which can aid in athletic performance and libido.",
          "\\n \t Effective in targeting stubborn fat, particularly in the lower body. \\n \t Oral administration offers convenience and ease of use.",
          "\\n \\n Uses \\n \\n \t Used in cutting cycles to help reduce stubborn body fat. \\n \t Enhances athletic performance by improving blood flow and energy levels.",
          "\\n \t Often used as a natural remedy for erectile dysfunction and to boost libido. \\n \t Supports overall weight management by promoting fat oxidation.",
          "\\n \\n \\n&nbsp;."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Pills"
      ],
      "keywords": [
          "yohimbine (yohimbine hcl )",
          "yohimbine-yohimbine-hcl",
          "yohimbine (yohimbine hcl ) research"
      ],
      "metaTitle": "Yohimbine (yohimbine HCl ) | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy Yohimbine (yohimbine HCl ) for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is Yohimbine (yohimbine HCl ) intended for?",
              "a": "Yohimbine (yohimbine HCl ) is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/yoshi.webp",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "cabergolina-30tabs-x-05mg",
      "name": "Cabergolina 30tabs x 0,5mg",
      "category": "Research Essentials",
      "strength": "5MG",
      "format": "pills",
      "price": 47.0,
      "includesWater": false,
      "shortDescription": "Cabergolina 30tabs x 0,5mg research compound supplied for laboratory investigation and analytical research.",
      "longDescription": [
          "cabergolina como subst\u00e2ncia ativa, que pertence a uma classe de medicamentos\\nchamados \"agonistas da dopamina\u201d. A dopamina \u00e9 produzida naturalmente no corpo e ajuda a transmitir mensagens para o c\u00e9rebro.",
          "A cabergolina imita a a\u00e7\u00e3o da dopamina para reduzir a produ\u00e7\u00e3o de prolactina no sangue. A prolactina \u00e9 a hormona que estimula a produ\u00e7\u00e3o de leite.."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Pills"
      ],
      "keywords": [
          "cabergolina 30tabs x 0,5mg",
          "cabergolina-30tabs-x-05mg",
          "cabergolina 30tabs x 0,5mg research"
      ],
      "metaTitle": "Cabergolina 30tabs x 0,5mg | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy Cabergolina 30tabs x 0,5mg for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is Cabergolina 30tabs x 0,5mg intended for?",
              "a": "Cabergolina 30tabs x 0,5mg is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/1000011264.jpg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "superdrol-100x-10mg",
      "name": "Superdrol 100x 10mg",
      "category": "Research Essentials",
      "strength": "10MG",
      "format": "pills",
      "price": 45.0,
      "includesWater": false,
      "shortDescription": "Superdrol 100x 10mg research compound supplied for laboratory investigation and analytical research.",
      "longDescription": [
          "Superdrol \u00e9 o nome comercial do referente ao composto hormonal 2a, 17a Dimethyl Etiocholan 3-One, 17b-Ol, criado pelo qu\u00edmico conhecido na internet como Dr. D,\\n\\nO superdrol \u00e9 um pr\u00f3-hormonal de classe 4 (classe mais forte), e ficou conhecido mundialmente a partir do lan\u00e7amento do M-drol, e depois disseminado com o surgimentos de outros pr\u00f3-hormonais clones do superdrol.\\n\\ncomo usar:\\n\\nHOMENS - A dosagem di\u00e1ria recomendada para um ciclo de Superdrol \u00e9 de 10mg at\u00e9 30mg por dia no m\u00e1ximo.\\n\\nMULHERES -  A dosagem di\u00e1ria recomendada para um ciclo de Superdrol \u00e9 de 2,5mg at\u00e9 5mg por dia no m\u00e1ximo.\\n\\nO per\u00edodo recomendado de utiliza\u00e7\u00e3o \u00e9 de 3 a 4 semanas.."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Pills"
      ],
      "keywords": [
          "superdrol 100x 10mg",
          "superdrol-100x-10mg",
          "superdrol 100x 10mg research"
      ],
      "metaTitle": "Superdrol 100x 10mg | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy Superdrol 100x 10mg for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is Superdrol 100x 10mg intended for?",
              "a": "Superdrol 100x 10mg is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/1000011267.jpg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "hgh-frag-fragment-176-191-5mg",
      "name": "HGH Frag (Fragment 176-191) 5mg",
      "category": "Weight Management",
      "strength": "5MG",
      "format": "vial",
      "price": 35.0,
      "includesWater": true,
      "shortDescription": "HGH fragment focused specifically on fat burning (lipolysis) and abdominal fat reduction, with no anabolic effects.",
      "longDescription": [
          "HGH Frag 176-191 is a modified fragment of the growth hormone (somatotropin), focused specifically on fat burning, with no anabolic effects. \\n \\nExpected Benefits (Experimental Use): \\n* Accelerates lipolysis (fat breakdown).",
          "\\n* Reduces abdominal and visceral fat. \\n* Does not affect IGF-1 levels (less risk of water retention or organ growth).",
          "\\n* No effects on glucose, appetite, or muscle growth. \\n \\nCommon Protocol (Experimental): \\n* Dose: 250 to 500 mcg per day.",
          "\\n* Route: Subcutaneous (abdomen). \\n* Ideal Timing: Morning on an empty stomach OR at night before bed (minimum 2h after last meal).",
          "\\n* Duration: 4 to 12 weeks. \\n \\nTips for better results: \\n* Avoid consuming carbohydrates for at least 1h before and after application.",
          "\\n* Combine with exercise + low-calorie diet to optimize fat loss. \\n* Can be combined with Ipamorelin, AOD-9604, CJC-1295 for better results.."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Vial"
      ],
      "keywords": [
          "hgh frag (fragment 176-191) 5mg",
          "hgh-frag-fragment-176-191-5mg",
          "hgh frag (fragment 176-191) 5mg research"
      ],
      "metaTitle": "HGH Frag (Fragment 176-191) 5mg | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy HGH Frag (Fragment 176-191) 5mg for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is HGH Frag (Fragment 176-191) 5mg intended for?",
              "a": "HGH Frag (Fragment 176-191) 5mg is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/HGH-frag.jpg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "clembuterol-40mcg-x-50tabs",
      "name": "Clembuterol 40mcg x 50TABS",
      "category": "Weight Management",
      "strength": "40MCG",
      "format": "pills",
      "price": 20.0,
      "includesWater": false,
      "shortDescription": "Clembuterol 40mcg x 50TABS research compound supplied for laboratory investigation and analytical research.",
      "longDescription": [
          "Clembuterol 40mcg x 50TABS is a high-grade chemical compound manufactured under stringent quality control protocols for laboratory research purposes.",
          "Supplied in sealed packaging with verified identity and batch documentation. Strictly intended for in-vitro laboratory analysis."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Pills"
      ],
      "keywords": [
          "clembuterol 40mcg x 50tabs",
          "clembuterol-40mcg-x-50tabs",
          "clembuterol 40mcg x 50tabs research"
      ],
      "metaTitle": "Clembuterol 40mcg x 50TABS | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy Clembuterol 40mcg x 50TABS for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is Clembuterol 40mcg x 50TABS intended for?",
              "a": "Clembuterol 40mcg x 50TABS is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/1000039089.png",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "t3-25mcg-x-30tabs",
      "name": "T3 25mcg x 30tabs",
      "category": "Weight Management",
      "strength": "25MCG",
      "format": "pills",
      "price": 15.0,
      "includesWater": false,
      "shortDescription": "T3 25mcg x 30tabs research compound supplied for laboratory investigation and analytical research.",
      "longDescription": [
          "T3 25mcg x 30tabs is a high-grade chemical compound manufactured under stringent quality control protocols for laboratory research purposes.",
          "Supplied in sealed packaging with verified identity and batch documentation. Strictly intended for in-vitro laboratory analysis."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Pills"
      ],
      "keywords": [
          "t3 25mcg x 30tabs",
          "t3-25mcg-x-30tabs",
          "t3 25mcg x 30tabs research"
      ],
      "metaTitle": "T3 25mcg x 30tabs | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy T3 25mcg x 30tabs for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is T3 25mcg x 30tabs intended for?",
              "a": "T3 25mcg x 30tabs is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/xmed1.jpeg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "t4-100mcg-x-50tabs",
      "name": "T4 100MCG X 50TABS",
      "category": "Weight Management",
      "strength": "100MCG",
      "format": "pills",
      "price": 20.0,
      "includesWater": false,
      "shortDescription": "T4 100MCG X 50TABS research compound supplied for laboratory investigation and analytical research.",
      "longDescription": [
          "T4 100MCG X 50TABS is a high-grade chemical compound manufactured under stringent quality control protocols for laboratory research purposes.",
          "Supplied in sealed packaging with verified identity and batch documentation. Strictly intended for in-vitro laboratory analysis."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Pills"
      ],
      "keywords": [
          "t4 100mcg x 50tabs",
          "t4-100mcg-x-50tabs",
          "t4 100mcg x 50tabs research"
      ],
      "metaTitle": "T4 100MCG X 50TABS | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy T4 100MCG X 50TABS for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is T4 100MCG X 50TABS intended for?",
              "a": "T4 100MCG X 50TABS is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/xmed1.jpeg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "dianabol",
      "name": "Dianabol",
      "category": "Research Essentials",
      "strength": "Laboratory Research",
      "format": "pills",
      "price": 25.0,
      "includesWater": false,
      "shortDescription": "Dianabol research compound supplied for laboratory investigation and analytical research.",
      "longDescription": [
          "Methandienone, commonly known as Dbol, is a widely known oral steroid in bodybuilding and other sports. Its structure includes a 17-alpha-methyl group, allowing for oral intake due to the C17-alpha alkylation, which delivers pronounced bodily effects but also strains the liver.",
          "\\n With a half-life of 4.5-6 hours, Methandienone has mild estrogenic effects. Its conversion to a more androgenic metabolite via the 5-alpha reductase enzyme is minimal.",
          "Its    efficacy in boosting muscle size    and power has made it a favorite among athletes and bodybuilders. \\n Available for sale are 10 mg tablets of Dianabol, which people appreciate due to the comparatively affordable price for a single pack.",
          "\\n Methandienone chemical composition \\n Structurally, it can be described as 17\u03b1-methyl-17\u03b2-hydroxy-1,4-androstadien-3-one. The molecular structure consists of a core of four interconnected cycloalkane rings - three six-member cyclohexane rings and one five-member cyclopentane ring, which is typical for steroids.",
          "\\n Methandienone contains a 17-alpha-methyl group. It is the alkylation of C17-alpha that makes the oral use of this anabolic steroid possible, with a very noticeable effect on the body (and a negative effect on the liver).",
          "\\n Benefits for the body and health \\n \\n\t Increase protein synthesis; \\n\t Promotes a    rapid increase in strength    and muscle mass; \\n\t Improves your recovery; \\n\t Increase the level of glycogen; \\n\t Increased appetite; \\n\t  Improves mood    and supports training drive. \\n."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Pills"
      ],
      "keywords": [
          "dianabol",
          "dianabol",
          "dianabol research"
      ],
      "metaTitle": "Dianabol | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy Dianabol for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is Dianabol intended for?",
              "a": "Dianabol is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/1000054663.jpg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "stanos-10-mg-stanozolol-winstrol",
      "name": "Stanos 10 mg (Stanozolol, Winstrol)",
      "category": "Research Essentials",
      "strength": "10 MG",
      "format": "pills",
      "price": 26.0,
      "includesWater": false,
      "shortDescription": "Stanos 10 mg (Stanozolol, Winstrol) research compound supplied for laboratory investigation and analytical research.",
      "longDescription": [
          "Stanos 10 mg (Stanozolol, Winstrol) is a high-grade chemical compound manufactured under stringent quality control protocols for laboratory research purposes.",
          "Supplied in sealed packaging with verified identity and batch documentation. Strictly intended for in-vitro laboratory analysis."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Pills"
      ],
      "keywords": [
          "stanos 10 mg (stanozolol, winstrol)",
          "stanos-10-mg-stanozolol-winstrol",
          "stanos 10 mg (stanozolol, winstrol) research"
      ],
      "metaTitle": "Stanos 10 mg (Stanozolol, Winstrol) | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy Stanos 10 mg (Stanozolol, Winstrol) for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is Stanos 10 mg (Stanozolol, Winstrol) intended for?",
              "a": "Stanos 10 mg (Stanozolol, Winstrol) is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/1000054664.jpg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "anavaros-10-mg-oxandrolone",
      "name": "Anavaros 10 mg (Oxandrolone)",
      "category": "Research Essentials",
      "strength": "10 MG",
      "format": "pills",
      "price": 45.0,
      "includesWater": false,
      "shortDescription": "Anavaros 10 mg (Oxandrolone) research compound supplied for laboratory investigation and analytical research.",
      "longDescription": [
          "Anavaros 10 mg (Oxandrolone) is a high-grade chemical compound manufactured under stringent quality control protocols for laboratory research purposes.",
          "Supplied in sealed packaging with verified identity and batch documentation. Strictly intended for in-vitro laboratory analysis."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Pills"
      ],
      "keywords": [
          "anavaros 10 mg (oxandrolone)",
          "anavaros-10-mg-oxandrolone",
          "anavaros 10 mg (oxandrolone) research"
      ],
      "metaTitle": "Anavaros 10 mg (Oxandrolone) | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy Anavaros 10 mg (Oxandrolone) for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is Anavaros 10 mg (Oxandrolone) intended for?",
              "a": "Anavaros 10 mg (Oxandrolone) is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/1000054665.jpg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "nandecos-200-mgml-nandrolone-decanoate",
      "name": "Nandecos 200 mg/ml (Nandrolone Decanoate)",
      "category": "Research Essentials",
      "strength": "200 MG/ML",
      "format": "vial",
      "price": 35.0,
      "includesWater": true,
      "shortDescription": "Nandecos 200 mg/ml (Nandrolone Decanoate) research compound supplied for laboratory investigation and analytical research.",
      "longDescription": [
          "Nandecos 200 mg/ml (Nandrolone Decanoate) is a high-grade chemical compound manufactured under stringent quality control protocols for laboratory research purposes.",
          "Supplied in sealed packaging with verified identity and batch documentation. Strictly intended for in-vitro laboratory analysis."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Vial"
      ],
      "keywords": [
          "nandecos 200 mg/ml (nandrolone decanoate)",
          "nandecos-200-mgml-nandrolone-decanoate",
          "nandecos 200 mg/ml (nandrolone decanoate) research"
      ],
      "metaTitle": "Nandecos 200 mg/ml (Nandrolone Decanoate) | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy Nandecos 200 mg/ml (Nandrolone Decanoate) for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is Nandecos 200 mg/ml (Nandrolone Decanoate) intended for?",
              "a": "Nandecos 200 mg/ml (Nandrolone Decanoate) is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/1000054666.jpg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "trenacetos-100-mgml-trenbolone-acetate",
      "name": "Trenacetos 100 mg/ml (Trenbolone Acetate)",
      "category": "Research Essentials",
      "strength": "100 MG/ML",
      "format": "vial",
      "price": 40.0,
      "includesWater": true,
      "shortDescription": "Trenacetos 100 mg/ml (Trenbolone Acetate) research compound supplied for laboratory investigation and analytical research.",
      "longDescription": [
          "Trenacetos 100 mg/ml (Trenbolone Acetate) is a high-grade chemical compound manufactured under stringent quality control protocols for laboratory research purposes.",
          "Supplied in sealed packaging with verified identity and batch documentation. Strictly intended for in-vitro laboratory analysis."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Vial"
      ],
      "keywords": [
          "trenacetos 100 mg/ml (trenbolone acetate)",
          "trenacetos-100-mgml-trenbolone-acetate",
          "trenacetos 100 mg/ml (trenbolone acetate) research"
      ],
      "metaTitle": "Trenacetos 100 mg/ml (Trenbolone Acetate) | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy Trenacetos 100 mg/ml (Trenbolone Acetate) for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is Trenacetos 100 mg/ml (Trenbolone Acetate) intended for?",
              "a": "Trenacetos 100 mg/ml (Trenbolone Acetate) is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/1000054667.jpg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "mastelad-100-mgml-drostanolone-propionate",
      "name": "Mastelad 100 mg/ml (Drostanolone Propionate)",
      "category": "Research Essentials",
      "strength": "100 MG/ML",
      "format": "vial",
      "price": 40.0,
      "includesWater": true,
      "shortDescription": "Mastelad 100 mg/ml (Drostanolone Propionate) research compound supplied for laboratory investigation and analytical research.",
      "longDescription": [
          "Mastelad 100 mg/ml (Drostanolone Propionate) is a high-grade chemical compound manufactured under stringent quality control protocols for laboratory research purposes.",
          "Supplied in sealed packaging with verified identity and batch documentation. Strictly intended for in-vitro laboratory analysis."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Vial"
      ],
      "keywords": [
          "mastelad 100 mg/ml (drostanolone propionate)",
          "mastelad-100-mgml-drostanolone-propionate",
          "mastelad 100 mg/ml (drostanolone propionate) research"
      ],
      "metaTitle": "Mastelad 100 mg/ml (Drostanolone Propionate) | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy Mastelad 100 mg/ml (Drostanolone Propionate) for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is Mastelad 100 mg/ml (Drostanolone Propionate) intended for?",
              "a": "Mastelad 100 mg/ml (Drostanolone Propionate) is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/1000054668.jpg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "dhb-100mg",
      "name": "DHB 100MG",
      "category": "Research Essentials",
      "strength": "100MG",
      "format": "pills",
      "price": 50.0,
      "includesWater": false,
      "shortDescription": "DHB 100MG research compound supplied for laboratory investigation and analytical research.",
      "longDescription": [
          "DHB 100MG is a high-grade chemical compound manufactured under stringent quality control protocols for laboratory research purposes.",
          "Supplied in sealed packaging with verified identity and batch documentation. Strictly intended for in-vitro laboratory analysis."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Pills"
      ],
      "keywords": [
          "dhb 100mg",
          "dhb-100mg",
          "dhb 100mg research"
      ],
      "metaTitle": "DHB 100MG | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy DHB 100MG for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is DHB 100MG intended for?",
              "a": "DHB 100MG is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/1000054161.jpg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "trestolone-ment",
      "name": "TRESTOLONE MENT",
      "category": "Research Essentials",
      "strength": "Laboratory Research",
      "format": "pills",
      "price": 60.0,
      "includesWater": false,
      "shortDescription": "TRESTOLONE MENT research compound supplied for laboratory investigation and analytical research.",
      "longDescription": [
          "TRESTOLONE MENT is a high-grade chemical compound manufactured under stringent quality control protocols for laboratory research purposes.",
          "Supplied in sealed packaging with verified identity and batch documentation. Strictly intended for in-vitro laboratory analysis."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Pills"
      ],
      "keywords": [
          "trestolone ment",
          "trestolone-ment",
          "trestolone ment research"
      ],
      "metaTitle": "TRESTOLONE MENT | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy TRESTOLONE MENT for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is TRESTOLONE MENT intended for?",
              "a": "TRESTOLONE MENT is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/1000054170.jpg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  },
  {
      "slug": "cenforce-200-10tablets",
      "name": "cenforce 200 - 10tablets",
      "category": "Sexual Wellness Research",
      "strength": "Laboratory Research",
      "format": "pills",
      "price": 20.0,
      "includesWater": false,
      "shortDescription": "cenforce 200 - 10tablets research compound supplied for laboratory investigation and analytical research.",
      "longDescription": [
          "Estimulante bastante eficaz, dos mais fortes do mercado. Provoca uma ere\u00e7\u00e3o bastante forte e mais duradoura.",
          "Deve ser tomado com 20 a 30 minutos antes da rela\u00e7\u00e3o sexual.\\nPre\u00e7o por blister de 10 comprimidos."
      ],
      "highlights": [
          "Verified Purity",
          "Batch-Tested & Documented",
          "Strictly Laboratory Research Only",
          "Format: Pills"
      ],
      "keywords": [
          "cenforce 200 - 10tablets",
          "cenforce-200-10tablets",
          "cenforce 200 - 10tablets research"
      ],
      "metaTitle": "cenforce 200 - 10tablets | Laboratory Research Reagent \u2014 X-Med",
      "metaDescription": "Buy cenforce 200 - 10tablets for certified laboratory research. Verified purity and fast EU shipping from X-Med.",
      "faqs": [
          {
              "q": "What is cenforce 200 - 10tablets intended for?",
              "a": "cenforce 200 - 10tablets is strictly synthesized for in-vitro laboratory research and analytical studies."
          },
          {
              "q": "How should this compound be stored?",
              "a": "Store in a cool, dry place protected from light and moisture according to standard laboratory safety guidelines."
          }
      ],
      "image": "/images/imported/1000057990.jpg",
      "bogo": false,
      "specifications": {
          "purity": "99% (HPLC verified)",
          "storage": "Store at 2-8\u00b0C or room temp as specified",
          "dosage": "Research dependent",
          "usage": "Chemical Compound: research & laboratory use only"
      }
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, count);
}

export async function fetchProductsFromDb(): Promise<Product[]> {
  try {
    const { getSupabaseClient } = require('./supabase');
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true);
    
    if (error || !data || data.length === 0) {
      return products;
    }
    
    return data.map((row: any) => ({
      slug: row.slug,
      name: row.name,
      category: row.category,
      strength: row.strength,
      format: row.format,
      price: Number(row.price),
      compareAtPrice: row.compare_at_price ? Number(row.compare_at_price) : undefined,
      includesWater: row.includes_water,
      shortDescription: row.short_description,
      longDescription: row.long_description,
      highlights: row.highlights,
      keywords: row.keywords,
      metaTitle: row.meta_title,
      metaDescription: row.meta_description,
      faqs: row.faqs,
      image: row.image,
      bogo: row.bogo,
      offer: row.offer || undefined,
      discount: row.discount ? Number(row.discount) : undefined,
      specifications: row.specifications
    }));
  } catch (err) {
    console.error('Error in fetchProductsFromDb:', err);
    return products;
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    const { getSupabaseClient } = require('./supabase');
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .maybeSingle();

    if (error || !data) {
      return getProductBySlug(slug);
    }

    return {
      slug: data.slug,
      name: data.name,
      category: data.category,
      strength: data.strength,
      format: data.format,
      price: Number(data.price),
      compareAtPrice: data.compare_at_price ? Number(data.compare_at_price) : undefined,
      includesWater: data.includes_water,
      shortDescription: data.short_description,
      longDescription: data.long_description,
      highlights: data.highlights,
      keywords: data.keywords,
      metaTitle: data.meta_title,
      metaDescription: data.meta_description,
      faqs: data.faqs,
      image: data.image,
      bogo: data.bogo,
      offer: data.offer || undefined,
      discount: data.discount ? Number(data.discount) : undefined,
      specifications: data.specifications
    };
  } catch (err) {
    return getProductBySlug(slug);
  }
}

export async function fetchRelatedProducts(product: Product, count = 4): Promise<Product[]> {
  try {
    const { getSupabaseClient } = require('./supabase');
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .neq('slug', product.slug)
      .eq('category', product.category)
      .eq('is_active', true)
      .limit(count);

    if (error || !data || data.length === 0) {
      return getRelatedProducts(product, count);
    }

    return data.map((row: any) => ({
      slug: row.slug,
      name: row.name,
      category: row.category,
      strength: row.strength,
      format: row.format,
      price: Number(row.price),
      compareAtPrice: row.compare_at_price ? Number(row.compare_at_price) : undefined,
      includesWater: row.includes_water,
      shortDescription: row.short_description,
      longDescription: row.long_description,
      highlights: row.highlights,
      keywords: row.keywords,
      metaTitle: row.meta_title,
      metaDescription: row.meta_description,
      faqs: row.faqs,
      image: row.image,
      bogo: row.bogo,
      offer: row.offer || undefined,
      discount: row.discount ? Number(row.discount) : undefined,
      specifications: row.specifications
    }));
  } catch (err) {
    return getRelatedProducts(product, count);
  }
}

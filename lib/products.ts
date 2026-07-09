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
    "image": "/images/xmed22.png",
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
    "image": "https://res.cloudinary.com/tedfhije/image/upload/v1783573535/impamorline_ubmq9q.png",
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

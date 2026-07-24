// src/types/homepage.ts

export interface ExploreCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  startingPrice: string;
  slug: string;
  isHero?: boolean;
}

export interface WhyChooseFeature {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface WhyChooseUsData {
  badge: string;
  title: string;
  description: string;

  featured: {
    badge: string;
    title: string;
    description: string;
    image: string;
  };

  features: WhyChooseFeature[];

  cta: {
    text: string;
    button: string;
  };
}

export interface ExploreCTACard {
  title: string;
  description: string;
  primaryButton: {
    text: string;
    href: string;
  };
  secondaryButton: {
    text: string;
    href: string;
  };
}

export interface ExploreProductsData {
  badge: string;
  heading: string;
  description: string;
  categories: ExploreCategory[];
  ctaCard: ExploreCTACard;
  bottomCTA: {
    heading: string;
    description: string;
    buttonText: string;
    buttonHref: string;
  };
}
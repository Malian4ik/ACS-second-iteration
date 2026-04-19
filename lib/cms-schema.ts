export type BlockType = "hero" | "offers" | "rooms" | "restaurant" | "contacts";

export type CmsCta = {
  label: string;
  href: string;
};

export type CtaButtonSize = "compact" | "standard" | "large";
export type CtaAlignment = "left" | "center" | "right";
export type CtaGap = "tight" | "normal" | "wide";
export type SecondaryCtaTone = "outline" | "quiet";

export type HeroCtaLayout = {
  alignment: CtaAlignment;
  primarySize: CtaButtonSize;
  secondarySize: CtaButtonSize;
  secondaryTone: SecondaryCtaTone;
  gap: CtaGap;
};

export type CmsNavigationItem = {
  id: string;
  label: string;
  blockId: string;
};

export type OfferCard = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  cta: CmsCta;
};

// Backward compatible aliases for older components.
export type PromoCard = OfferCard;
export type FoodVisualCard = RestaurantPhoto;

export type RoomCard = {
  id: string;
  title: string;
  capacity: string;
  dayPrice: string;
  nightPrice: string;
  description: string;
  imageUrl: string;
  telegramCta: CmsCta;
  callCta: CmsCta;
};

export type RestaurantPhoto = {
  id: string;
  imageUrl: string;
  alt: string;
};

export type ContactLink = {
  id: string;
  label: string;
  href: string;
};

export type BaseBlock = {
  id: string;
  type: BlockType;
  enabled: boolean;
};

export type HeroBlock = BaseBlock & {
  type: "hero";
  title: string;
  subtitle: string;
  description: string;
  badges: string[];
  primaryCta: CmsCta;
  secondaryCta: CmsCta;
  ctaLayout: HeroCtaLayout;
};

export type OffersBlock = BaseBlock & {
  type: "offers";
  title: string;
  subtitle: string;
  emptyStateTitle: string;
  emptyStateDescription: string;
  cards: OfferCard[];
};

export type RoomsBlock = BaseBlock & {
  type: "rooms";
  title: string;
  subtitle: string;
  pricingHint: string;
  cards: RoomCard[];
};

export type RestaurantBlock = BaseBlock & {
  type: "restaurant";
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  photos: RestaurantPhoto[];
  // Legacy field kept for backward compatibility with old CMS payloads.
  menuEmbedUrl: string;
  foodMenuUrl: string;
  barMenuUrl: string;
  cocktailsMenuUrl: string;
  foodMenuImages: string[];
  barMenuImages: string[];
  cocktailsMenuImages: string[];
  menuCta: CmsCta;
  telegramCta: CmsCta;
  callCta: CmsCta;
};

export type ContactsBlock = BaseBlock & {
  type: "contacts";
  title: string;
  subtitle: string;
  address: string;
  mapEmbedUrl: string;
  badges: string[];
  links: ContactLink[];
};

export type CmsBlock = HeroBlock | OffersBlock | RoomsBlock | RestaurantBlock | ContactsBlock;

export type CmsContent = {
  version: 2;
  site: {
    projectName: string;
    brandSubtitle: string;
    navigationItems: CmsNavigationItem[];
    navCta: CmsCta;
    stickyTelegramCta: CmsCta;
    stickyCallCta: CmsCta;
  };
  blocks: CmsBlock[];
  home?: {
    promoTitle?: string;
    promoSubtitle?: string;
    promoCards?: PromoCard[];
    primaryCtaLabel?: string;
    secondaryCtaLabel?: string;
  };
  restaurant?: {
    shortDescription?: string;
    visualTitle?: string;
    visualBody?: string;
    menuButtonLabel?: string;
    telegramCtaLabel?: string;
    heroBadge?: string;
    foodVisuals?: Array<{ id: string; title: string; description: string; imageUrl: string }>;
  };
  club?: {
    heroSupport?: string;
    primaryCtaLabel?: string;
    secondaryCtaLabel?: string;
  };
  media?: {
    homeClubCardImage?: string;
    homeRestaurantCardImage?: string;
    restaurantHeroImage?: string;
    restaurantSideImage?: string;
    clubHeroImage?: string;
    clubSideImage?: string;
  };
};

// Legacy v1 types are kept to make migration from old JSON safe.
export type LegacyPromoCard = {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  imageUrl: string;
};

export type LegacyCmsContent = {
  home?: {
    promoTitle?: string;
    promoSubtitle?: string;
    promoCards?: LegacyPromoCard[];
    primaryCtaLabel?: string;
    secondaryCtaLabel?: string;
  };
  restaurant?: {
    shortDescription?: string;
    menuButtonLabel?: string;
    telegramCtaLabel?: string;
    foodVisuals?: Array<{
      id: string;
      title: string;
      description: string;
      imageUrl: string;
    }>;
  };
};

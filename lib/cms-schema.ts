export type PromoCard = {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  imageUrl: string;
};

export type FoodVisualCard = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
};

export type CmsContent = {
  home: {
    heroSupport: string;
    heroStatusLine: string;
    contactsOpenLine: string;
    contactsParkingLine: string;
    promoTitle: string;
    promoSubtitle: string;
    promoCards: PromoCard[];
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    tertiaryCtaLabel: string;
  };
  restaurant: {
    shortDescription: string;
    visualTitle: string;
    visualBody: string;
    menuButtonLabel: string;
    telegramCtaLabel: string;
    heroBadge: string;
    foodVisuals: FoodVisualCard[];
  };
  club: {
    heroSupport: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
  };
  media: {
    homeClubCardImage: string;
    homeRestaurantCardImage: string;
    restaurantHeroImage: string;
    restaurantSideImage: string;
    clubHeroImage: string;
    clubSideImage: string;
  };
};

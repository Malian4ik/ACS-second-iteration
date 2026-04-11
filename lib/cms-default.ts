import type { CmsContent } from "@/lib/cms-schema";

export const defaultCmsContent: CmsContent = {
  home: {
    heroSupport: "Клуб, ресторан и бар открыты 24/7",
    heroStatusLine: "Open 24/7. Быстрый ответ в Telegram и по телефону.",
    contactsOpenLine: "Открыты 24 часа в сутки, 7 дней в неделю",
    contactsParkingLine: "Бесплатная парковка рядом",
    promoTitle: "Спецпредложения",
    promoSubtitle: "Блок подготовлен под текущие акции и быстрый переход в Telegram. Здесь можно держать 3-5 актуальных офферов без перегруза главной страницы.",
    promoCards: [
      {
        id: "night-promo",
        title: "Ночная бронь",
        description: "Акцент на длинные вечерние сессии, когда важен быстрый вход без лишних согласований.",
        ctaLabel: "Уточнить в Telegram",
        ctaHref: "https://t.me/AVULUSbot",
        imageUrl: "/images/club-room-red.webp"
      },
      {
        id: "duo-promo",
        title: "Приват на двоих",
        description: "Подходит для пары, кооператива и камерного вечера с быстрым бронированием.",
        ctaLabel: "Уточнить в Telegram",
        ctaHref: "https://t.me/AVULUSbot",
        imageUrl: "/images/cyberclub-vip.jpg"
      },
      {
        id: "restaurant-promo",
        title: "Стол в ресторане 24/7",
        description: "Резерв стола и быстрый контакт по ресторану прямо с сайта, без лишних шагов.",
        ctaLabel: "Забронировать стол",
        ctaHref: "https://t.me/AVULUSbot",
        imageUrl: "/images/restaurant-real-1.jpg"
      }
    ],
    primaryCtaLabel: "Написать в Telegram",
    secondaryCtaLabel: "Позвонить",
    tertiaryCtaLabel: "Открыть бронь клуба"
  },
  restaurant: {
    shortDescription: "Кухня и бар внутри киберпространства. Открыто 24/7. На странице оставляем только короткое описание, визуалы и быстрый переход к контакту или полному меню.",
    visualTitle: "Что показывает ресторан лучше всего",
    visualBody: "Вместо длинного меню на странице мы даем визуальный блок с едой и баром, чтобы решение принималось быстрее. Полное меню открывается отдельной кнопкой.",
    menuButtonLabel: "Смотреть полное меню",
    telegramCtaLabel: "Забронировать стол",
    heroBadge: "Open 24/7",
    foodVisuals: [
      {
        id: "food",
        title: "Еда",
        description: "Полноценная кухня для длинного вечера: comfort food, закуски и позиции, которые хорошо работают на группу.",
        imageUrl: "/images/dish-burger.jpg"
      },
      {
        id: "drinks",
        title: "Бар",
        description: "Коктейли и напитки, которые поддерживают поздний ритм площадки без ощущения случайного бара при клубе.",
        imageUrl: "/images/dish-cocktail.jpg"
      }
    ]
  },
  club: {
    heroSupport: "Open 24/7. Клуб, приватные комнаты и быстрый контакт в одном потоке.",
    primaryCtaLabel: "Написать в Telegram",
    secondaryCtaLabel: "Позвонить"
  },
  media: {
    homeClubCardImage: "/images/club-room-red.webp",
    homeRestaurantCardImage: "/images/restaurant-real-1.jpg",
    restaurantHeroImage: "/images/restaurant-real-1.jpg",
    restaurantSideImage: "/images/restaurant-real-2.jpg",
    clubHeroImage: "/images/club-room-green.webp",
    clubSideImage: "/images/club-room-red.webp"
  }
};

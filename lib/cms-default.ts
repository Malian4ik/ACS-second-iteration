import type { CmsContent } from "@/lib/cms-schema";

export const defaultCmsContent: CmsContent = {
  home: {
    heroSupport: "Собственный ресторан и бар. Открыты без перерывов.",
    heroStatusLine: "Прямая связь и мгновенная бронь через Telegram.",
    contactsOpenLine: "Открыты 24 часа в сутки, 7 дней в неделю",
    contactsParkingLine: "Бесплатная парковка рядом",
    promoTitle: "Спецпредложения",
    promoSubtitle:
      "Актуальные форматы для клуба и ресторана. Каждая карточка ведет сразу в Telegram, без лишних шагов и длинной переписки.",
    promoCards: [
      {
        id: "night-session",
        title: "Ночная сессия 24/7",
        description:
          "Для тех, кто планирует длинный игровой вечер после полуночи: подскажем свободные комнаты и лучший формат под вашу компанию.",
        ctaLabel: "Уточнить в Telegram",
        ctaHref: "https://t.me/AVULUSbot",
        imageUrl: "/images/club-room-red.webp"
      },
      {
        id: "private-duo",
        title: "Privat для двоих",
        description:
          "Подходит для пары или камерного коопа: приватность, мягкая посадка и быстрый вход без перегруза выбором.",
        ctaLabel: "Запросить свободное время",
        ctaHref: "https://t.me/AVULUSbot",
        imageUrl: "/images/cyberclub-vip.jpg"
      },
      {
        id: "bootcamp-team",
        title: "Bootcamp для 5+ человек",
        description:
          "Командный формат для сквадов и совместных игровых блоков. Подскажем, какой room-сценарий лучше подходит под состав.",
        ctaLabel: "Собрать командный формат",
        ctaHref: "https://t.me/AVULUSbot",
        imageUrl: "/images/cyberclub-team.jpg"
      },
      {
        id: "restaurant-table",
        title: "Стол в ресторане 24/7",
        description:
          "Если нужен только ресторан, без клуба: быстро подтвердим стол в Telegram и отправим актуальную информацию по размещению.",
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
    shortDescription:
      "Кухня и бар внутри Avulus. Открыто 24/7. На странице оставляем только атмосферу, ключевые визуалы и быстрый путь к Telegram или полному меню.",
    visualTitle: "Еда и бар",
    visualBody:
      "Вместо длинного списка блюд показываем, что помогает принять решение быстрее: подачу, атмосферу и понятный путь к контакту.",
    menuButtonLabel: "Смотреть полное меню",
    telegramCtaLabel: "Забронировать стол в Telegram",
    heroBadge: "Open 24/7",
    foodVisuals: [
      {
        id: "food",
        title: "Еда",
        description:
          "Комфортная кухня для длинного вечера: горячие позиции, закуски и блюда, которые удобно брать на компанию.",
        imageUrl: "/images/dish-burger.jpg"
      },
      {
        id: "drinks",
        title: "Бар",
        description: "Барная карта для позднего ритма площадки: коктейли и напитки без лишнего шума на странице.",
        imageUrl: "/images/dish-cocktail.jpg"
      }
    ]
  },
  club: {
    heroSupport: "Open 24/7. Клуб, приватные комнаты и быстрый контакт в одном понятном потоке.",
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

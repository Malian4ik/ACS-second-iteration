import type { CmsContent } from "@/lib/cms-schema";

export const defaultCmsContent: CmsContent = {
  landing: {
    heroTitle: "Avulus Cyber Space",
    heroSubtitle: "Игровой клуб + ресторан и бар в центре Москвы",
    heroDescription: "Приватные игровые комнаты, полноценный ресторан и бар в одном пространстве. Основной канал бронирования и связи - Telegram.",
    heroBadges: ["Игровой клуб", "Ресторан и бар", "Центр Москвы"],
    offersTitle: "Предложения",
    offersSubtitle: "Быстрые сценарии под вечер, свидание или командную сессию. Всё подтверждаем в Telegram.",
    roomsTitle: "Игровые комнаты",
    roomsSubtitle: "Подберем подходящую игровую комнату и время в Telegram за пару сообщений.",
    restaurantTitle: "Ресторан и бар 24/7",
    restaurantSubtitle: "Полноценная часть пространства AVULUS: кухня, коктейли и сервис для гостей клуба и города.",
    restaurantBody:
      "Можно прийти отдельно в ресторан или заказать в игровую комнату. Меню и бронь стола доступны через Telegram и по телефону.",
    restaurantMenuUrl: "https://vk.me/avuluscyberspace",
    restaurantMenuLabel: "Посмотреть меню",
    restaurantTelegramLabel: "Забронировать в Telegram",
    restaurantCallLabel: "Позвонить",
    restaurantImages: [
      "/images/restaurant-real-1.jpg",
      "/images/restaurant-real-2.jpg",
      "/images/dish-burger.jpg",
      "/images/dish-cocktail.jpg"
    ],
    contactsTitle: "Как попасть",
    contactsAddress: "Москва, Серебрянический переулок, 12с1",
    contactsBadges: ["Круглосуточно", "Бесплатная парковка"],
    contactsTelegramLabel: "Написать в Telegram",
    contactsVkLabel: "VK",
    contactsPhoneLabel: "+7 495 921-22-21",
    contactsMapUrl:
      "https://yandex.ru/map-widget/v1/?ll=37.648860%2C55.750838&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1Njc4MjI2NxJG0KDQvtGB0YHQuNGPLCDQnNC-0YHQutCy0LAsINCh0LXRgNC10LHRgNGP0L3QuNGH0LXRgdC60LjQuSDQv9C10YDQtdGD0LvQvtC6LCAxMtGBMSIKDcs4FkIVN0ZC&z=16"
  },
  home: {
    heroSupport: "Игровой клуб и ресторан AVULUS",
    heroStatusLine: "Работаем круглосуточно.",
    contactsOpenLine: "Открыты 24/7",
    contactsParkingLine: "Бесплатная парковка рядом",
    promoTitle: "Спецпредложения",
    promoSubtitle: "Актуальные офферы с быстрым переходом в Telegram.",
    promoCards: [
      {
        id: "night-session",
        title: "Ночной формат",
        description: "Подскажем свободные игровые комнаты и подберем оптимальный формат под вашу компанию.",
        ctaLabel: "Уточнить в Telegram",
        ctaHref: "https://t.me/AVULUSbot",
        imageUrl: "/images/club-room-red.webp"
      },
      {
        id: "private-duo",
        title: "Для двоих",
        description: "Камерная посадка и быстрый вход без сложного выбора.",
        ctaLabel: "Запросить время в Telegram",
        ctaHref: "https://t.me/AVULUSbot",
        imageUrl: "/images/cyberclub-vip.jpg"
      },
      {
        id: "team-session",
        title: "Для команды",
        description: "Соберем сценарий под состав, длительность и задачу команды.",
        ctaLabel: "Подобрать формат",
        ctaHref: "https://t.me/AVULUSbot",
        imageUrl: "/images/cyberclub-team.jpg"
      }
    ],
    primaryCtaLabel: "Написать в Telegram",
    secondaryCtaLabel: "Позвонить",
    tertiaryCtaLabel: "Открыть бронь клуба"
  },
  restaurant: {
    shortDescription: "Ресторан и бар AVULUS работают круглосуточно.",
    visualTitle: "Еда и бар",
    visualBody: "Ключевые позиции меню и быстрый путь к брони через Telegram.",
    menuButtonLabel: "Смотреть меню",
    telegramCtaLabel: "Забронировать стол в Telegram",
    heroBadge: "Open 24/7",
    foodVisuals: [
      {
        id: "food",
        title: "Еда",
        description: "Горячие блюда и закуски для длинного вечера.",
        imageUrl: "/images/dish-burger.jpg"
      },
      {
        id: "drinks",
        title: "Бар",
        description: "Коктейли и напитки в ритме ночной Москвы.",
        imageUrl: "/images/dish-cocktail.jpg"
      }
    ]
  },
  club: {
    heroSupport: "Игровой клуб AVULUS",
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

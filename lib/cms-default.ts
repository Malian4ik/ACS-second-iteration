import type { CmsContent } from "@/lib/cms-schema";

export const defaultCmsContent: CmsContent = {
  version: 2,
  site: {
    projectName: "Avulus Cyber Space",
    brandSubtitle: "Клуб + ресторан",
    navigationItems: [
      { id: "nav-offers", label: "Офферы", blockId: "offers-main" },
      { id: "nav-rooms", label: "Комнаты", blockId: "rooms-main" },
      { id: "nav-restaurant", label: "Ресторан", blockId: "restaurant-main" },
      { id: "nav-contacts", label: "Контакты", blockId: "contacts-main" }
    ],
    navCta: {
      label: "Написать в Telegram",
      href: "https://t.me/AVULUSbot"
    },
    stickyTelegramCta: {
      label: "Telegram",
      href: "https://t.me/AVULUSbot"
    },
    stickyCallCta: {
      label: "Звонок",
      href: "tel:+74959212221"
    }
  },
  blocks: [
    {
      id: "hero-main",
      type: "hero",
      enabled: true,
      title: "Avulus Cyber Space",
      subtitle: "Клуб и ресторан 24/7 в центре Москвы",
      description: "Приватные игровые комнаты, кухня и бар — круглосуточно.",
      badges: ["24/7", "Центр Москвы", "Бесплатная парковка"],
      primaryCta: {
        label: "Написать в Telegram",
        href: "https://t.me/AVULUSbot"
      },
      secondaryCta: {
        label: "Позвонить",
        href: "tel:+74959212221"
      }
    },
    {
      id: "offers-main",
      type: "offers",
      enabled: true,
      title: "Офферы",
      subtitle: "Короткие актуальные предложения. Нажимаете и сразу пишете нам в Telegram.",
      emptyStateTitle: "Офферы скоро добавим",
      emptyStateDescription: "Сейчас можно написать в Telegram и уточнить актуальные предложения.",
      cards: [
        {
          id: "offer-night",
          title: "Ночная сессия",
          description: "Подскажем свободную комнату на ночь и забронируем за пару минут.",
          imageUrl: "/images/club-room-red.webp",
          cta: {
            label: "Написать в Telegram",
            href: "https://t.me/AVULUSbot"
          }
        },
        {
          id: "offer-privat",
          title: "Privat для двоих",
          description: "Тихая отдельная комната на двоих: TV, диван и комфортная посадка.",
          imageUrl: "/images/cyberclub-vip.jpg",
          cta: {
            label: "Написать в Telegram",
            href: "https://t.me/AVULUSbot"
          }
        },
        {
          id: "offer-bootcamp",
          title: "Bootcamp 5+",
          description: "Командный формат для тренировок, совместных сессий и турниров.",
          imageUrl: "/images/cyberclub-team.jpg",
          cta: {
            label: "Написать в Telegram",
            href: "https://t.me/AVULUSbot"
          }
        }
      ]
    },
    {
      id: "rooms-main",
      type: "rooms",
      enabled: true,
      title: "Комнаты",
      subtitle: "Выбирайте формат, пишите в Telegram — забронируем.",
      pricingHint: "Подробный прайс уточняйте в Telegram.",
      cards: [
        {
          id: "room-stream",
          title: "Stream",
          capacity: "1 чел",
          dayPrice: "от 290 ₽/час",
          nightPrice: "от 330 ₽/час",
          description: "Одно место, свой монитор, тишина. Для игры или стрима.",
          imageUrl: "/images/club-room-green.webp",
          telegramCta: { label: "Telegram", href: "https://t.me/AVULUSbot" },
          callCta: { label: "Позвонить", href: "tel:+74959212221" }
        },
        {
          id: "room-privat",
          title: "Privat",
          capacity: "2 чел",
          dayPrice: "от 490 ₽/час",
          nightPrice: "от 590 ₽/час",
          description: "Отдельная комната на двоих. TV, диван, тихо.",
          imageUrl: "/images/cyberclub-card.jpg",
          telegramCta: { label: "Telegram", href: "https://t.me/AVULUSbot" },
          callCta: { label: "Позвонить", href: "tel:+74959212221" }
        },
        {
          id: "room-privat-plus",
          title: "Privat+",
          capacity: "2 чел",
          dayPrice: "от 690 ₽/час",
          nightPrice: "от 790 ₽/час",
          description: "Больше пространства для длинного вечера вдвоем. Диван, минибар.",
          imageUrl: "/images/cyberclub-vip.jpg",
          telegramCta: { label: "Telegram", href: "https://t.me/AVULUSbot" },
          callCta: { label: "Позвонить", href: "tel:+74959212221" }
        },
        {
          id: "room-vip",
          title: "VIP",
          capacity: "2-4 чел",
          dayPrice: "от 890 ₽/час",
          nightPrice: "от 990 ₽/час",
          description: "Большая приватная комната. Диван, минибар, румсервис из ресторана.",
          imageUrl: "/images/club-room-red.webp",
          telegramCta: { label: "Telegram", href: "https://t.me/AVULUSbot" },
          callCta: { label: "Позвонить", href: "tel:+74959212221" }
        },
        {
          id: "room-super-vip",
          title: "Super VIP",
          capacity: "2-4 чел",
          dayPrice: "По запросу",
          nightPrice: "По запросу",
          description: "Максимум приватности и места. Свой вход, полный сервис, тишина.",
          imageUrl: "/images/cyberclub-vip.jpg",
          telegramCta: { label: "Telegram", href: "https://t.me/AVULUSbot" },
          callCta: { label: "Позвонить", href: "tel:+74959212221" }
        },
        {
          id: "room-bootcamp",
          title: "Bootcamp",
          capacity: "5+ чел",
          dayPrice: "от 850 ₽/час",
          nightPrice: "от 850 ₽/час",
          description: "Комната для команды. 5+ мест за одним столом.",
          imageUrl: "/images/cyberclub-team.jpg",
          telegramCta: { label: "Telegram", href: "https://t.me/AVULUSbot" },
          callCta: { label: "Позвонить", href: "tel:+74959212221" }
        }
      ]
    },
    {
      id: "restaurant-main",
      type: "restaurant",
      enabled: true,
      title: "Ресторан и бар",
      subtitle: "Кухня, коктейли и румсервис в комнаты клуба. Открыты 24/7.",
      description:
        "Полноценный ресторан внутри Avulus. Можно зайти отдельно или заказать еду прямо в комнату.",
      photos: [
        { id: "rest-photo-1", imageUrl: "/images/dish-burger.jpg", alt: "Блюда ресторана" },
        { id: "rest-photo-2", imageUrl: "/images/dish-cocktail.jpg", alt: "Коктейли" },
        { id: "rest-photo-3", imageUrl: "/images/dish-ramen.jpg", alt: "Горячие блюда" },
        { id: "rest-photo-4", imageUrl: "/images/dish-snack.jpg", alt: "Зал и закуски" }
      ],
      menuCta: {
        label: "Посмотреть меню",
        href: "https://vk.me/avuluscyberspace"
      },
      telegramCta: {
        label: "Забронировать стол в TG",
        href: "https://t.me/AVULUSbot"
      },
      callCta: {
        label: "Позвонить",
        href: "tel:+74959212221"
      }
    },
    {
      id: "contacts-main",
      type: "contacts",
      enabled: true,
      title: "Контакты",
      subtitle: "Приезжайте в Avulus — ответим быстро и поможем с бронью.",
      address: "Москва, Серебрянический переулок, 12с1",
      mapEmbedUrl:
        "https://yandex.ru/map-widget/v1/?ll=37.648335%2C55.750049&mode=search&oid=244165336383&ol=biz&z=16",
      badges: ["24/7", "Бесплатная парковка"],
      links: [
        { id: "contact-telegram", label: "Telegram", href: "https://t.me/AVULUSbot" },
        { id: "contact-vk", label: "VK", href: "https://vk.me/avuluscyberspace" },
        { id: "contact-call", label: "Позвонить", href: "tel:+74959212221" }
      ]
    }
  ]
};

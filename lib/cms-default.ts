import type { CmsContent } from "@/lib/cms-schema";

export const defaultCmsContent: CmsContent = {
  version: 2,
  site: {
    projectName: "Avulus Cyber Space",
    brandSubtitle: "Клуб + ресторан",
    navigationItems: [
      { id: "nav-offers", label: "Предложения", blockId: "offers-main" },
      { id: "nav-rooms", label: "Форматы", blockId: "rooms-main" },
      { id: "nav-restaurant", label: "Ресторан", blockId: "restaurant-main" },
      { id: "nav-contacts", label: "Как попасть", blockId: "contacts-main" }
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
      title: "Приватные игровые комнаты в центре Москвы",
      subtitle: "Avulus Cyber Space",
      description: "Играй один, вдвоём или командой. Без шума и посторонних — можно стримить, отдыхать или провести ночь. Еду и напитки принесём прямо в комнату.",
      badges: ["Соло / Вдвоём / Командой", "24/7", "Центр Москвы", "Своя парковка"],
      primaryCta: {
        label: "Забронировать в Telegram",
        href: "https://t.me/AVULUSbot"
      },
      secondaryCta: {
        label: "Позвонить",
        href: "tel:+74959212221"
      },
      ctaLayout: {
        alignment: "center",
        primarySize: "large",
        secondarySize: "compact",
        secondaryTone: "quiet",
        gap: "normal"
      }
    },
    {
      id: "offers-main",
      type: "offers",
      enabled: true,
      title: "Готовые форматы под тебя",
      subtitle: "Выбери формат и пиши в TG, забронируем за минуту",
      emptyStateTitle: "Форматы скоро добавим",
      emptyStateDescription: "Сейчас можно написать в Telegram и уточнить актуальные предложения.",
      cards: [
        {
          id: "offer-night",
          title: "Ночь без перерывов",
          description: "Отдельная комната только для тебя или твоей компании на всю ночь.",
          imageUrl: "https://1ux3bxsqbebnnpcv.public.blob.vercel-storage.com/cms/uploads/1776606594027--2026-04-19-164948844.png",
          cta: {
            label: "Написать в Telegram",
            href: "https://t.me/AVULUSbot"
          }
        },
        {
          id: "offer-privat",
          title: "Комната для двоих",
          description: "Приватное пространство для игры и отдыха вдвоём.",
          imageUrl: "/images/cyberclub-vip.jpg",
          cta: {
            label: "Написать в Telegram",
            href: "https://t.me/AVULUSbot"
          }
        },
        {
          id: "offer-bootcamp",
          title: "Комната для команды",
          description: "Подходит для тренировок и разборов большой компанией.",
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
      title: "Игровые комнаты",
      subtitle: "Выбирайте формат, пишите в Telegram — забронируем.",
      pricingHint: "Подробный прайс уточняйте в Telegram.",
      cards: [
        {
          id: "room-stream",
          title: "Stream Room",
          capacity: "1 чел",
          dayPrice: "от 290 ₽/час",
          nightPrice: "от 330 ₽/час",
          description: "Готовый стримерский сетап, осталось только запустить поток.",
          imageUrl: "https://1ux3bxsqbebnnpcv.public.blob.vercel-storage.com/cms/uploads/1776605139142--2026-04-19-162507381.png",
          telegramCta: { label: "Telegram", href: "https://t.me/AVULUSbot" },
          callCta: { label: "Позвонить", href: "tel:+74959212221" }
        },
        {
          id: "room-privat",
          title: "Private",
          capacity: "2 чел",
          dayPrice: "от 490 ₽/час",
          nightPrice: "от 590 ₽/час",
          description: "Базовый игровой сетап для стабильной игры в соло или вдвоём.",
          imageUrl: "https://1ux3bxsqbebnnpcv.public.blob.vercel-storage.com/cms/uploads/1776604578515--2026-04-19-161543667.png",
          telegramCta: { label: "Telegram", href: "https://t.me/AVULUSbot" },
          callCta: { label: "Позвонить", href: "tel:+74959212221" }
        },
        {
          id: "room-privat-plus",
          title: "Private+",
          capacity: "2 чел",
          dayPrice: "от 690 ₽/час",
          nightPrice: "от 790 ₽/час",
          description: "Усиленный сетап с запасом по мощности.",
          imageUrl: "https://1ux3bxsqbebnnpcv.public.blob.vercel-storage.com/cms/uploads/1776605367623--2026-04-19-162924458.png",
          telegramCta: { label: "Telegram", href: "https://t.me/AVULUSbot" },
          callCta: { label: "Позвонить", href: "tel:+74959212221" }
        },
        {
          id: "room-vip",
          title: "VIP",
          capacity: "2-4 чел",
          dayPrice: "от 890 ₽/час",
          nightPrice: "от 990 ₽/час",
          description: "Отдельная комната с продвинутым игровым сетапом и зоной отдыха.",
          imageUrl: "https://1ux3bxsqbebnnpcv.public.blob.vercel-storage.com/cms/uploads/1776605693268--2026-04-19-163442606.png",
          telegramCta: { label: "Telegram", href: "https://t.me/AVULUSbot" },
          callCta: { label: "Позвонить", href: "tel:+74959212221" }
        },
        {
          id: "room-super-vip",
          title: "Super VIP",
          capacity: "2-4 чел",
          dayPrice: "По запросу",
          nightPrice: "По запросу",
          description: "Мощнейшее железо и максимальный уровень приватности с большой зоной отдыха и отдельным входом.",
          imageUrl: "https://1ux3bxsqbebnnpcv.public.blob.vercel-storage.com/cms/uploads/1776605609687--2026-04-19-163322052.png",
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
          imageUrl: "https://1ux3bxsqbebnnpcv.public.blob.vercel-storage.com/cms/uploads/1776606434405--2026-04-19-164708526.png",
          telegramCta: { label: "Telegram", href: "https://t.me/AVULUSbot" },
          callCta: { label: "Позвонить", href: "tel:+74959212221" }
        }
      ]
    },
    {
      id: "restaurant-main",
      type: "restaurant",
      enabled: true,
      eyebrow: "Клуб + бар",
      title: "Ресторан и бар 24/7",
      subtitle: "Любое блюдо или напиток можно заказать прямо в комнату.",
      description:
        "Можно просто зайти в ресторан и вкусно провести время. Это полноценная зона, где можно отдохнуть между делами, пообедать или провести встречу.",
      photos: [
        { id: "rest-photo-1", imageUrl: "https://1ux3bxsqbebnnpcv.public.blob.vercel-storage.com/cms/uploads/1776606761566--2026-04-19-165226383.png", alt: "Блюда ресторана" },
        { id: "rest-photo-2", imageUrl: "https://1ux3bxsqbebnnpcv.public.blob.vercel-storage.com/cms/uploads/1776607034947--2026-04-19-165708814.png", alt: "Меню ресторана" },
        { id: "rest-photo-3", imageUrl: "https://1ux3bxsqbebnnpcv.public.blob.vercel-storage.com/cms/uploads/1776607114269--2026-04-19-165830179.png", alt: "Поке" },
        { id: "rest-photo-4", imageUrl: "https://1ux3bxsqbebnnpcv.public.blob.vercel-storage.com/cms/uploads/1776607156294--2026-04-19-165914319.png", alt: "Бургер" },
        { id: "rest-photo-5", imageUrl: "https://1ux3bxsqbebnnpcv.public.blob.vercel-storage.com/cms/uploads/1776607217463--2026-04-19-170008842.png", alt: "Закуски" },
        { id: "rest-photo-6", imageUrl: "https://1ux3bxsqbebnnpcv.public.blob.vercel-storage.com/cms/uploads/1776607259187--2026-04-19-170054987.png", alt: "Блюда" }
      ],
      menuEmbedUrl: "",
      foodMenuUrl: "",
      barMenuUrl: "",
      cocktailsMenuUrl: "",
      foodMenuImages: [],
      barMenuImages: [],
      cocktailsMenuImages: [],
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
      title: "Как попасть",
      subtitle: "Приезжайте в Avulus — ответим быстро и поможем с бронью.",
      address: "Москва, Серебрянический переулок, 12с1",
      mapEmbedUrl:
        "https://yandex.ru/map-widget/v1/?ll=37.648259%2C55.750145&mode=search&oid=71331203438&ol=biz&z=17",
      badges: ["24/7", "Бесплатная парковка"],
      links: [
        { id: "contact-telegram", label: "Telegram", href: "https://t.me/AVULUSbot" },
        { id: "contact-vk", label: "VK", href: "https://vk.me/avuluscyberspace" },
        { id: "contact-call", label: "Позвонить", href: "tel:+74959212221" }
      ]
    }
  ]
};

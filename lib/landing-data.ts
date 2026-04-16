import type { PromoCard } from "@/lib/cms-schema";

export const CONTACTS = {
  telegram: "https://t.me/AVULUSbot",
  phone: "tel:+74959212221",
  phoneLabel: "+7 495 921-22-21",
  vk: "https://vk.me/avuluscyberspace",
  menuFallback: "https://vk.me/avuluscyberspace",
  booking: "https://t.me/AVULUSbot"
};

export const HERO_BADGES = ["Игровой клуб", "Ресторан и бар", "Центр Москвы"];

export const OFFERS_FALLBACK: PromoCard[] = [
  {
    id: "offer-1",
    title: "Ночной формат",
    description: "Подберем игровую комнату на ночь и подтвердим бронь в Telegram без лишних шагов.",
    ctaLabel: "Уточнить условия в Telegram",
    ctaHref: CONTACTS.telegram,
    imageUrl: "/images/club-room-red.webp"
  },
  {
    id: "offer-2",
    title: "Для двоих",
    description: "Подскажем оптимальную игровую комнату для пары и быстро согласуем удобное время.",
    ctaLabel: "Подобрать формат в Telegram",
    ctaHref: CONTACTS.telegram,
    imageUrl: "/images/cyberclub-vip.jpg"
  },
  {
    id: "offer-3",
    title: "Для команды",
    description: "Соберем командный сценарий и поможем выбрать игровую комнату под ваш состав.",
    ctaLabel: "Написать в Telegram",
    ctaHref: CONTACTS.telegram,
    imageUrl: "/images/cyberclub-team.jpg"
  }
];

export const ROOM_CARDS = [
  {
    id: "stream",
    title: "Stream",
    capacity: "1 чел",
    price: "Уточнить условия в Telegram",
    description: "Игровая комната для соло-сессий и стримов: тишина, фокус и комфорт.",
    image: "/images/club-room-green.webp"
  },
  {
    id: "privat",
    title: "Privat",
    capacity: "2 чел",
    price: "Подобрать формат в Telegram",
    description: "Приватная игровая комната на двоих с мягкой посадкой и спокойной атмосферой.",
    image: "/images/club-room-red.webp"
  },
  {
    id: "privat-plus",
    title: "Privat+",
    capacity: "2 чел",
    price: "Уточнить условия в Telegram",
    description: "Расширенная игровая комната для длинных сессий вдвоем и максимального комфорта.",
    image: "/images/cyberclub-card.jpg"
  },
  {
    id: "vip",
    title: "VIP",
    capacity: "2-4 чел",
    price: "Уточнить условия в Telegram",
    description: "Большая игровая комната для компании: больше пространства и сервис из ресторана и бара.",
    image: "/images/cyberclub-vip.jpg"
  },
  {
    id: "super-vip",
    title: "Super VIP",
    capacity: "2-4 чел",
    price: "Индивидуальные условия в Telegram",
    description: "Флагманская игровая комната для приватных встреч и статусных бронирований.",
    image: "/images/cyberclub-team.jpg"
  },
  {
    id: "bootcamp",
    title: "Bootcamp",
    capacity: "5+ чел",
    price: "Уточнить условия в Telegram",
    description: "Командная игровая комната для тренировок, турнирных сессий и длительных игровых блоков.",
    image: "/images/hero-main.jpg"
  }
];

export const RESTAURANT_IMAGES = [
  "/images/restaurant-real-1.jpg",
  "/images/restaurant-real-2.jpg",
  "/images/dish-burger.jpg",
  "/images/dish-cocktail.jpg"
];

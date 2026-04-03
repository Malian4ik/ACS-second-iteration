export type NavItem = {
  label: string;
  href: string;
  active?: boolean;
};

export type ContactOption = {
  label: string;
  description: string;
  href: string;
  goal: string;
};

export type FormatCard = {
  key: "solo" | "duo" | "bootcamp";
  label: string;
  title: string;
  summary: string;
  details: string[];
  audience: string;
  image: string;
  href: string;
  priceFrom: string;
};

export type ProductSplit = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  accent: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
};

export type RoomCard = {
  key: string;
  format: FormatCard["key"];
  title: string;
  subtitle: string;
  description: string;
  price: string;
  duration: string;
  capacity: string;
  image: string;
  features: string[];
};

export type ClubZone = {
  name: string;
  tagline: string;
  capacity: string;
  hardware: string;
  image: string;
};

export type RestaurantMoment = {
  title: string;
  description: string;
  detail: string;
};

export const venueAddress = "Москва, Серебрянический переулок, 12с1";
export const venueSchedule = "Клуб и ресторан 24/7";

export const contactLinks = {
  telegram: "https://t.me/AVULUSbot",
  vk: "https://vk.me/avuluscyberspace",
  call: "tel:+74959212221",
  booking: "https://langame.ru/799454394_computerniy_club_avulus-cyber-space_moskva",
  hardware:
    "https://vk.com/away.php?to=https%3A%2F%2Flangame.ru%2F799454394_computerniy_club_avulus-cyber-space_moskva&cc_key=",
  menu: "https://vk.me/avuluscyberspace",
  privacy: "#",
  terms: "#",
  cookies: "#"
};

export const homeNav: NavItem[] = [
  { label: "Клуб", href: "#cyberclub" },
  { label: "Ресторан", href: "#restaurant" },
  { label: "Зоны", href: "#zones" },
  { label: "Контакты", href: "#contact" }
];

export const roomsNav: NavItem[] = [
  { label: "Главная", href: "/" },
  { label: "Комнаты", href: "/rooms", active: true },
  { label: "Контакты", href: "#contact-options" }
];

export const heroStats = [
  { label: "Режим", value: venueSchedule },
  { label: "Локация", value: "Китай-город, центр Москвы" },
  { label: "Формат", value: "55 ПК, ресторан, приватные комнаты" }
];

export const formats: FormatCard[] = [
  {
    key: "solo",
    label: "Solo / Stream",
    title: "Комнаты для личной игры и стримов",
    summary: "Для тех, кто хочет тишину, контроль и приватную игровую атмосферу без общего зала.",
    details: ["Приватная посадка", "Экран и свет под личный ритм", "Подходит для стрима и долгих сессий"],
    audience: "Подходит для соло-игроков, создателей контента и гостей, которым нужен отдельный ритм.",
    image: "/images/cyberclub-card.jpg",
    href: "/rooms?format=solo",
    priceFrom: "от 290 ₽/час"
  },
  {
    key: "duo",
    label: "Privat / VIP",
    title: "Приватные комнаты для двоих и малого круга",
    summary: "Для свиданий, кооператива, камерных вечеров и тех, кто хочет клуб без лишнего шума.",
    details: ["Комнаты с диванами и TV", "Больше приватности", "Удобно совмещать игру и ресторан"],
    audience: "Лучший формат для пары, друзей и гостей, которым важна приватность и комфорт.",
    image: "/images/cyberclub-vip.jpg",
    href: "/rooms?format=duo",
    priceFrom: "от 490 ₽/час"
  },
  {
    key: "bootcamp",
    label: "Super VIP / Bootcamp",
    title: "Комнаты для команд, событий и длинных смен",
    summary: "Для полноценных игровых блоков, буткемпов, командной подготовки и премиального группового опыта.",
    details: ["Командная посадка", "Топовые конфиги", "Прямой переход в ресторанный сервис"],
    audience: "Подходит для сквадов, мероприятий и всех, кто хочет лучший формат клуба в Москве.",
    image: "/images/cyberclub-team.jpg",
    href: "/rooms?format=bootcamp",
    priceFrom: "от 850 ₽/час"
  }
];

export const splitProducts: ProductSplit[] = [
  {
    id: "cyberclub",
    eyebrow: "CyberClub",
    title: "Флагманский клуб столицы с приватными форматами, сильным железом и ночной атмосферой.",
    description:
      "Avulus строится не вокруг общего зала, а вокруг опыта. Здесь важны комнаты, уровень приватности, премиальные зоны и ощущение места, куда приходят не просто поиграть, а провести весь вечер правильно.",
    bullets: [
      "Privat, Privat+, VIP, Super VIP, Stream и Bootcamp",
      "55 игровых мест и конфиги под разные сценарии",
      "Рядом ресторан, чтобы вечер не заканчивался после первой сессии"
    ],
    accent: "from-[rgba(169,17,48,0.24)] via-transparent to-transparent",
    image: "/images/cyberclub-team.jpg",
    ctaLabel: "Забронировать клуб",
    ctaHref: contactLinks.booking
  },
  {
    id: "restaurant",
    eyebrow: "Restaurant",
    title: "Полноценный ресторан 24/7, куда можно прийти отдельно, даже если ты не играешь.",
    description:
      "Ресторан в Avulus не играет вторую роль. Это самостоятельное место для завтраков, ужинов, коктейлей и ночных встреч в центре Москвы, с темным премиальным настроением и полноценным меню.",
    bullets: [
      "Отдельный повод приехать без брони клуба",
      "Завтраки, street food, паста, пицца, коктейли и бар",
      "Работает круглосуточно, как и сам Avulus"
    ],
    accent: "from-[rgba(18,87,68,0.22)] via-transparent to-transparent",
    image: "/images/restaurant-room.jpg",
    ctaLabel: "Связаться по ресторану",
    ctaHref: contactLinks.telegram
  }
];

export const clubZones: ClubZone[] = [
  {
    name: "Privat",
    tagline: "Базовая приватная комната",
    capacity: "Для двоих",
    hardware: "Отдельная посадка, TV, мягкий приватный сценарий",
    image: "/images/cyberclub-card.jpg"
  },
  {
    name: "Privat+",
    tagline: "Больше комфорта и длины сессии",
    capacity: "Для двоих / пары",
    hardware: "Удобен для длинных игр, свиданий и камерных встреч",
    image: "/images/cyberclub-vip.jpg"
  },
  {
    name: "VIP",
    tagline: "Премиальный приватный формат",
    capacity: "Малая компания",
    hardware: "Усиленная атмосфера, отдельный ритм, премиальный визуал",
    image: "/images/cyberclub-vip.jpg"
  },
  {
    name: "Super VIP",
    tagline: "Максимальный уровень приватности",
    capacity: "Для гостей, которым нужен самый сильный формат",
    hardware: "Высокий уровень комфорта и ощущение закрытого premium space",
    image: "/images/cyberclub-team.jpg"
  },
  {
    name: "Stream",
    tagline: "Комнаты под контент и стриминг",
    capacity: "Соло / креатор",
    hardware: "Подходит для стримеров, камерной работы и личного режима",
    image: "/images/hero-main.jpg"
  },
  {
    name: "Bootcamp",
    tagline: "Командная зона для сквадов",
    capacity: "Для 5+ игроков",
    hardware: "Подготовка, скримы, командные сессии и долгие игровые блоки",
    image: "/images/cyberclub-team.jpg"
  }
];

export const restaurantMoments: RestaurantMoment[] = [
  {
    title: "Ресторан сам по себе",
    description: "Не нужно бронировать комнату, чтобы приехать в Avulus. Сюда можно прийти просто на ужин, коктейли или ночной барный вайб.",
    detail: "Это отдельный полноценный повод для визита."
  },
  {
    title: "Меню на весь день и ночь",
    description: "Завтраки, салаты, пицца, паста, street food, бар и авторские коктейли делают ресторан самостоятельной точкой притяжения.",
    detail: "Формат рассчитан не на перекус, а на длинное пребывание."
  },
  {
    title: "Темп большого города",
    description: "Круглосуточный режим и центральная локация делают ресторан удобным для поздних встреч, after-hours и ночной Москвы.",
    detail: "Avulus работает в ритме столицы, а не по стандартному расписанию."
  }
];

export const journeySteps = [
  {
    title: "Выбрать формат клуба",
    body: "С первого экрана должно быть ясно, куда нажимать: Privat, VIP, Stream или Bootcamp."
  },
  {
    title: "Понять, что ресторан живет отдельно",
    body: "Ресторан нельзя подавать как приложение к игре. Это отдельный продукт с собственной причиной приехать."
  },
  {
    title: "Закрыть решение в один клик",
    body: "На главной CTA должен быть везде: бронирование, Telegram, VK и звонок без лишнего трения."
  }
];

export const roomCards: RoomCard[] = [
  {
    key: "solo-core",
    format: "solo",
    title: "Stream Room",
    subtitle: "Соло-комната под личный режим",
    description: "Для стрима, спокойной игры и длинной сессии без общего шума и лишних отвлекающих факторов.",
    price: "от 290 ₽ / час",
    duration: "1-4 часа",
    capacity: "1 игрок",
    image: "/images/cyberclub-card.jpg",
    features: ["Приватная посадка", "Подходит для контента", "Быстрый вход в игровой режим"]
  },
  {
    key: "solo-night",
    format: "solo",
    title: "Solo Night",
    subtitle: "Ночной режим на длинную дистанцию",
    description: "Для игроков, которые заходят в клуб не на час, а на полноценный вечер или ночной блок.",
    price: "от 980 ₽ / блок",
    duration: "4 часа",
    capacity: "1 игрок",
    image: "/images/dish-snack.jpg",
    features: ["Комфорт на длинной дистанции", "Можно совмещать с рестораном", "Идеально для late-night flow"]
  },
  {
    key: "duo-sync",
    format: "duo",
    title: "Privat",
    subtitle: "Комната для двоих",
    description: "Подходит для кооператива, пары, друзей и всех, кто хочет клуб без ощущения общего зала.",
    price: "от 490 ₽ / час",
    duration: "1-4 часа",
    capacity: "2 игрока",
    image: "/images/cyberclub-vip.jpg",
    features: ["TV и диваны", "Приватность", "Удобно для совместного вечера"]
  },
  {
    key: "duo-premium",
    format: "duo",
    title: "Privat+ / VIP",
    subtitle: "Усиленный приватный опыт",
    description: "Для тех, кто хочет более высокий уровень комфорта, атмосферы и приватности внутри клуба.",
    price: "от 890 ₽ / час",
    duration: "4 часа",
    capacity: "2-4 игрока",
    image: "/images/restaurant-card.jpg",
    features: ["Премиальный формат", "Долгие игровые сессии", "Прямой сценарий на клуб + ресторан"]
  },
  {
    key: "bootcamp-squad",
    format: "bootcamp",
    title: "Bootcamp",
    subtitle: "Командная игровая зона",
    description: "Формат под скримы, тренировку, командные вечера и большие игровые блоки в приватной среде.",
    price: "от 850 ₽ / час",
    duration: "2-6 часов",
    capacity: "5 игроков",
    image: "/images/cyberclub-team.jpg",
    features: ["Командная посадка", "Сильные конфиги", "Оптимален для squads"]
  },
  {
    key: "bootcamp-event",
    format: "bootcamp",
    title: "Super VIP",
    subtitle: "Самый сильный клубный формат",
    description: "Для гостей, которым нужен premium private experience, статус и максимальный контроль над пространством.",
    price: "по запросу",
    duration: "Индивидуально",
    capacity: "Малая группа",
    image: "/images/restaurant-room.jpg",
    features: ["Максимальный комфорт", "Премиальная подача", "Лучший room-based опыт"]
  }
];

export const contactOptions: ContactOption[] = [
  {
    label: "Бронь клуба",
    description: "Быстрый переход в бронирование игровых мест и комнат.",
    href: contactLinks.booking,
    goal: "contact_booking"
  },
  {
    label: "Telegram",
    description: "Самый быстрый контакт по клубу, ресторану и любым вопросам.",
    href: contactLinks.telegram,
    goal: "contact_telegram"
  },
  {
    label: "Позвонить",
    description: "Для срочных вопросов, навигации по локации и моментального контакта.",
    href: contactLinks.call,
    goal: "contact_call"
  }
];

export const howItWorks = [
  {
    step: "01",
    title: "Выбери направление",
    body: "Сразу реши, идешь ты в клуб, в ресторан или хочешь совместить оба сценария."
  },
  {
    step: "02",
    title: "Открой нужный CTA",
    body: "Бронь клуба, Telegram и звонок должны быть доступны с первого экрана и дальше по всей странице."
  },
  {
    step: "03",
    title: "Проведи здесь весь вечер",
    body: "Avulus должен ощущаться не как одна услуга, а как место, где можно провести целую ночь."
  }
];

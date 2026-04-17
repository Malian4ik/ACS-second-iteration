export type Locale = "ru" | "en";

export type NavItem = {
  label: string;
  href: string;
  active?: boolean;
};

export type ClubZone = {
  name: string;
  capacity: string;
  hardware: string;
  image: string;
};

export type RoomCard = {
  key: string;
  format: "solo" | "duo" | "bootcamp";
  title: string;
  subtitle: string;
  description: string;
  price: string;
  duration: string;
  capacity: string;
  image: string;
  features: string[];
};

export type ContactOption = {
  label: string;
  description: string;
  href: string;
  goal: string;
};

export const locales: Locale[] = ["ru", "en"];
export const defaultLocale: Locale = "ru";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function withLocale(locale: Locale, path: string) {
  if (locale === "ru") {
    return path;
  }

  return path === "/" ? "/en" : `/en${path}`;
}

export function stripLocaleFromPathname(pathname: string) {
  if (pathname === "/en") {
    return "/";
  }

  if (pathname.startsWith("/en/")) {
    return pathname.slice(3);
  }

  return pathname;
}

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

type SharedContent = {
  localeLabel: string;
  brandSubtitle: string;
  venueAddress: string;
  venueSchedule: string;
  footerBlurb: string;
  footerBooking: string;
  footerCall: string;
  footerPrivacy: string;
  footerTerms: string;
  footerCookies: string;
  navBook: string;
  mapTitle: string;
  mapFrameTitle: string;
  homeTitle: string;
  homeDescription: string;
  homeHeroKicker: string;
  homeBookClub: string;
  homeReserveTable: string;
  homeCardClubEyebrow: string;
  homeCardClubBody: string;
  homeCardClubLabel: string;
  homeCardClubPage: string;
  homeCardRestaurantEyebrow: string;
  homeCardRestaurantBody: string;
  homeCardRestaurantLabel: string;
  homeCardRestaurantPage: string;
  featureAlwaysOpenTitle: string;
  featureAlwaysOpenBody: string;
  featureLocationTitle: string;
  featureContactsTitle: string;
  featureContactsBody: string;
  contactsTitle: string;
  contactsSubtitle: string;
  stickyClub: string;
  stickyRestaurant: string;
  cyberclubMetaTitle: string;
  cyberclubMetaDescription: string;
  cyberclubNavHero: string;
  cyberclubNavZones: string;
  cyberclubNavBook: string;
  cyberclubEyebrow: string;
  cyberclubTitle: string;
  cyberclubBody: string;
  cyberclubNotes: string[];
  cyberclubPrimary: string;
  cyberclubSecondary: string;
  cyberclubPrivateByDesign: string;
  cyberclubVipRooms: string;
  cyberclubMoodEyebrow: string;
  cyberclubMoodTitle: string;
  cyberclubMoodBody: string;
  cyberclubZonesEyebrow: string;
  cyberclubZonesTitle: string;
  cyberclubZonesBody: string;
  cyberclubBookingEyebrow: string;
  cyberclubBookingTitle: string;
  cyberclubBookingBody: string;
  cyberclubDirectActions: string;
  cyberclubOpenBooking: string;
  restaurantMetaTitle: string;
  restaurantMetaDescription: string;
  restaurantNavHero: string;
  restaurantNavMenu: string;
  restaurantNavReserve: string;
  restaurantEyebrow: string;
  restaurantTitle: string;
  restaurantBody: string;
  restaurantNotes: string[];
  restaurantPrimary: string;
  restaurantSecondary: string;
  restaurantHeroBadge: string;
  restaurantHeroHeadline: string;
  restaurantHeroSideTitle: string;
  restaurantMoodEyebrow: string;
  restaurantMoodTitle: string;
  restaurantMoodBody: string;
  restaurantMenuEyebrow: string;
  restaurantMenuTitle: string;
  restaurantMenuBody: string;
  restaurantReserveEyebrow: string;
  restaurantReserveTitle: string;
  restaurantReserveBody: string;
  restaurantDirectActions: string;
  roomsMetaTitle: string;
  roomsMetaDescription: string;
  roomsNavHome: string;
  roomsNavRooms: string;
  roomsNavContacts: string;
  roomsEyebrow: string;
  roomsTitle: string;
  roomsBody: string;
  roomsPanelEyebrow: string;
  roomsPanelBody: string;
  roomsPanelCta: string;
  roomsHowTitle: string;
  roomsHowBody: string;
  roomsContactEyebrow: string;
  roomsContactTitle: string;
  roomsContactBody: string;
  roomsOpenNow: string;
  roomsStickyTelegram: string;
  roomsStickyVk: string;
  roomsStickyCall: string;
  roomsFilterAll: string;
  roomsFilterSolo: string;
  roomsFilterDuo: string;
  roomsFilterBootcamp: string;
  roomsPriceLabel: string;
  roomsStayLabel: string;
  roomsCapacityLabel: string;
  roomsOpenBooking: string;
  roomsAskVk: string;
  roomsAddonEyebrow: string;
  roomsAddonTitle: string;
  roomsAddonBody: string;
  roomsAddonCta: string;
  menuCards: { title: string; body: string }[];
  howItWorks: { step: string; title: string; body: string }[];
};

const sharedByLocale: Record<Locale, SharedContent> = {
  ru: {
    localeLabel: "RU",
    brandSubtitle: "Киберклуб + ресторан",
    venueAddress: "Москва, Серебрянический переулок, 12с1",
    venueSchedule: "Клуб и ресторан 24/7",
    footerBlurb:
      "Флагманский киберклуб и ресторан в центре Москвы. Приватные комнаты, сильные игровые зоны и круглосуточный ритм большого города.",
    footerBooking: "Бронь клуба",
    footerCall: "Позвонить",
    footerPrivacy: "Политика",
    footerTerms: "Условия",
    footerCookies: "Cookies",
    navBook: "Забронировать",
    mapTitle: "Расположение",
    mapFrameTitle: "Карта Avulus",
    homeTitle: "Avulus Cyber Space | Киберклуб и ресторан 24/7 в центре Москвы",
    homeDescription:
      "Avulus Cyber Space — премиальный киберклуб и самостоятельный ресторан 24/7 в центре Москвы. Бронь клуба, резерв стола, контакты и карта в один клик.",
    homeHeroKicker: "Премиальное игровое пространство",
    homeBookClub: "Забронировать комп",
    homeReserveTable: "Зарезервировать стол",
    homeCardClubEyebrow: "Клуб",
    homeCardClubBody: "Приватные комнаты, сильные конфиги и быстрая бронь 24/7.",
    homeCardClubLabel: "Забронировать клуб",
    homeCardClubPage: "Страница клуба",
    homeCardRestaurantEyebrow: "Ресторан",
    homeCardRestaurantBody: "Полноценный ресторан 24/7. Можно приехать отдельно, даже без брони клуба.",
    homeCardRestaurantLabel: "Зарезервировать стол",
    homeCardRestaurantPage: "Страница ресторана",
    featureAlwaysOpenTitle: "24/7",
    featureAlwaysOpenBody: "Клуб и ресторан работают круглосуточно.",
    featureLocationTitle: "Центр Москвы",
    featureContactsTitle: "Контакты",
    featureContactsBody: "+7 495 921-22-21 • Telegram • VK",
    contactsTitle: "Контакты",
    contactsSubtitle: "Серебрянический переулок, 12с1",
    stickyClub: "Клуб",
    stickyRestaurant: "Ресторан",
    cyberclubMetaTitle: "Клуб | Avulus Cyber Space",
    cyberclubMetaDescription:
      "Avulus Cyber Space — флагманский киберклуб в центре Москвы: приватные комнаты, VIP-зоны, bootcamp и быстрая бронь 24/7.",
    cyberclubNavHero: "Главное",
    cyberclubNavZones: "Зоны",
    cyberclubNavBook: "Бронь",
    cyberclubEyebrow: "Киберклуб",
    cyberclubTitle: "Флагманский игровой клуб в центре Москвы",
    cyberclubBody:
      "Avulus строится вокруг приватных комнат, сильного железа и атмосферы места, куда приезжают не на час, а на весь вечер.",
    cyberclubNotes: [
      "Приватные комнаты и премиальные зоны вместо ощущения шумного общего зала.",
      "Сильные игровые конфиги, ночной ритм и room-based формат.",
      "Место, куда приезжают не просто поиграть, а провести весь вечер правильно."
    ],
    cyberclubPrimary: "Забронировать комп",
    cyberclubSecondary: "Фото и железо",
    cyberclubPrivateByDesign: "Приватность как часть дизайна",
    cyberclubVipRooms: "VIP-комнаты",
    cyberclubMoodEyebrow: "Атмосфера клуба",
    cyberclubMoodTitle: "Меньше аркады. Больше московской ночи.",
    cyberclubMoodBody:
      "Приватные комнаты, сильные конфиги и спокойная тёмная подача собирают клубный опыт без ощущения шумного общего зала.",
    cyberclubZonesEyebrow: "Зоны",
    cyberclubZonesTitle: "Форматы со статусом",
    cyberclubZonesBody:
      "У каждого формата свой сценарий: для соло-игры, пары, маленькой компании или полноценной командной сессии.",
    cyberclubBookingEyebrow: "Бронь",
    cyberclubBookingTitle: "Забронируй комнату до того, как кто-то займет твой вечер",
    cyberclubBookingBody:
      "Выбирай формат, открывай бронь и приезжай без длинных форм, лишних шагов и лишней навигации.",
    cyberclubDirectActions: "Быстрые действия",
    cyberclubOpenBooking: "Открыть бронь",
    restaurantMetaTitle: "Ресторан | Avulus Cyber Space",
    restaurantMetaDescription:
      "Ресторан Avulus — полноценный ресторан 24/7 в центре Москвы. Завтраки, кухня, коктейли и резерв стола отдельно от клуба.",
    restaurantNavHero: "Главное",
    restaurantNavMenu: "Меню",
    restaurantNavReserve: "Резерв",
    restaurantEyebrow: "Ресторан",
    restaurantTitle: "Ресторан, который живет отдельно от клуба",
    restaurantBody:
      "Сюда можно приехать отдельно ради ужина, коктейлей и позднего вечера в центре Москвы, даже если ты не бронируешь клуб.",
    restaurantNotes: [
      "Можно приехать только ради ресторана, без брони клуба.",
      "Темный интерьер и ночная подача работают как самостоятельная точка притяжения.",
      "Ресторан живет в ритме большого города и не выключается ночью."
    ],
    restaurantPrimary: "Зарезервировать стол",
    restaurantSecondary: "Написать в VK",
    restaurantHeroBadge: "Открыто 24/7",
    restaurantHeroHeadline: "Приезжай на ужин. Оставайся до ночи.",
    restaurantHeroSideTitle: "Темный lounge",
    restaurantMoodEyebrow: "Настроение ресторана",
    restaurantMoodTitle: "Не дополнение. Полноценная точка назначения.",
    restaurantMoodBody:
      "Тёмный интерьер, полноценная кухня и ночной ритм делают ресторан самостоятельной точкой притяжения внутри Avulus.",
    restaurantMenuEyebrow: "Меню",
    restaurantMenuTitle: "На весь день и на всю ночь",
    restaurantMenuBody:
      "Меню должно читаться не как список категорий, а как уверенное обещание длинного и полноценного вечера.",
    restaurantReserveEyebrow: "Резерв",
    restaurantReserveTitle: "Забронируй стол, пока настроение еще живо",
    restaurantReserveBody:
      "Напиши нам, подтверди стол и приезжай. Резерв должен занимать меньше минуты.",
    restaurantDirectActions: "Быстрые действия",
    roomsMetaTitle: "Комнаты | Avulus Cyber Space",
    roomsMetaDescription:
      "Выберите формат комнаты в Avulus Cyber Space: solo, privat, VIP и bootcamp. Быстрая бронь и контакты в один клик.",
    roomsNavHome: "Главная",
    roomsNavRooms: "Комнаты",
    roomsNavContacts: "Контакты",
    roomsEyebrow: "Комнаты",
    roomsTitle: "Выбери формат быстро, затем сразу перейди к брони",
    roomsBody:
      "Эта страница убирает сомнения: понятные форматы, видимый прайс и быстрые контакты без лишних шагов.",
    roomsPanelEyebrow: "Для длинных сессий",
    roomsPanelBody: "Для duo и bootcamp важно сразу показывать и клуб, и ресторан как единый сценарий вечера.",
    roomsPanelCta: "Написать по командам",
    roomsHowTitle: "Как это работает",
    roomsHowBody: "Связаться можно сразу: бронь, Telegram, VK или звонок. Без длинных форм и лишних экранов.",
    roomsContactEyebrow: "Варианты связи",
    roomsContactTitle: "Закрывай решение, пока намерение еще высоко",
    roomsContactBody: "Быстрый слой контактов без трения: бронь, Telegram, VK и звонок.",
    roomsOpenNow: "Открыть сейчас",
    roomsStickyTelegram: "Telegram",
    roomsStickyVk: "VK",
    roomsStickyCall: "Звонок",
    roomsFilterAll: "Все комнаты",
    roomsFilterSolo: "Solo",
    roomsFilterDuo: "Privat / VIP",
    roomsFilterBootcamp: "Bootcamp",
    roomsPriceLabel: "Цена",
    roomsStayLabel: "Время",
    roomsCapacityLabel: "Вместимость",
    roomsOpenBooking: "Открыть бронь",
    roomsAskVk: "Спросить в VK",
    roomsAddonEyebrow: "Ресторан",
    roomsAddonTitle: "Сохраняй бронь простой, но показывай ресторан как часть длинного визита",
    roomsAddonBody: "Меню особенно важно для долгих сессий, duo-визитов и командных блоков.",
    roomsAddonCta: "Смотреть меню",
    menuCards: [
      { title: "Завтраки", body: "Завтраки и спокойное начало дня в центре Москвы." },
      { title: "Кухня", body: "Пицца, паста, street food, бар и полноценное ночное меню." },
      { title: "Коктейли", body: "Авторские и классические коктейли для длинного вечернего ритма." }
    ],
    howItWorks: [
      { step: "01", title: "Выбери формат", body: "Solo, privat, VIP или bootcamp — без лишних переходов." },
      { step: "02", title: "Пойми сценарий", body: "Клуб и ресторан работают как единый вечер, а не как разрозненные услуги." },
      { step: "03", title: "Закрой решение", body: "Один тап в бронь, мессенджер или звонок." }
    ]
  },
  en: {
    localeLabel: "EN",
    brandSubtitle: "Cyberclub + restaurant",
    venueAddress: "12 bld. 1 Serebryanichesky Lane, Moscow",
    venueSchedule: "Club and restaurant open 24/7",
    footerBlurb:
      "A flagship cyberclub and restaurant in central Moscow, built around private rooms, premium gaming setups and the pace of a city that never really slows down.",
    footerBooking: "Club booking",
    footerCall: "Call",
    footerPrivacy: "Privacy",
    footerTerms: "Terms",
    footerCookies: "Cookies",
    navBook: "Book now",
    mapTitle: "Location",
    mapFrameTitle: "Avulus map",
    homeTitle: "Avulus Cyber Space | Premium cyberclub and restaurant in Moscow",
    homeDescription:
      "Avulus Cyber Space is a premium cyberclub and standalone 24/7 restaurant in central Moscow. Book a setup, reserve a table, or get in touch in one click.",
    homeHeroKicker: "Premium gaming space",
    homeBookClub: "Book a setup",
    homeReserveTable: "Reserve a table",
    homeCardClubEyebrow: "Club",
    homeCardClubBody: "Private rooms, high-end gaming hardware and a frictionless booking flow 24/7.",
    homeCardClubLabel: "Book the club",
    homeCardClubPage: "Club page",
    homeCardRestaurantEyebrow: "Restaurant",
    homeCardRestaurantBody: "A full restaurant open 24/7. Guests can come purely for dinner, drinks and the atmosphere.",
    homeCardRestaurantLabel: "Reserve a table",
    homeCardRestaurantPage: "Restaurant page",
    featureAlwaysOpenTitle: "24/7",
    featureAlwaysOpenBody: "Both the club and the restaurant are open around the clock.",
    featureLocationTitle: "Central Moscow",
    featureContactsTitle: "Contacts",
    featureContactsBody: "+7 495 921-22-21 • Telegram • VK",
    contactsTitle: "Contacts",
    contactsSubtitle: "12 bld. 1 Serebryanichesky Lane",
    stickyClub: "Club",
    stickyRestaurant: "Restaurant",
    cyberclubMetaTitle: "Club | Avulus Cyber Space",
    cyberclubMetaDescription:
      "Avulus Cyber Space is a flagship gaming club in central Moscow with private rooms, VIP formats, bootcamp zones and 24/7 booking.",
    cyberclubNavHero: "Hero",
    cyberclubNavZones: "Zones",
    cyberclubNavBook: "Book",
    cyberclubEyebrow: "Cyberclub",
    cyberclubTitle: "A flagship gaming space in the center of Moscow",
    cyberclubBody:
      "Avulus is built around private rooms, powerful hardware and the kind of atmosphere that makes people stay for the entire night.",
    cyberclubNotes: [
      "Private rooms and premium formats instead of the usual crowded hall feeling.",
      "Strong gaming setups, a late-night rhythm and a room-based experience.",
      "A place people choose for the entire evening, not just for a quick session."
    ],
    cyberclubPrimary: "Book a setup",
    cyberclubSecondary: "Photos and hardware",
    cyberclubPrivateByDesign: "Private by design",
    cyberclubVipRooms: "VIP rooms",
    cyberclubMoodEyebrow: "Club mood",
    cyberclubMoodTitle: "Less arcade. More capital city night.",
    cyberclubMoodBody:
      "Private rooms, strong setups and a darker atmosphere create a calmer premium club experience from the first glance.",
    cyberclubZonesEyebrow: "Zones",
    cyberclubZonesTitle: "Formats with status",
    cyberclubZonesBody:
      "Each format solves a different visit: solo play, a pair, a smaller group or a full team session.",
    cyberclubBookingEyebrow: "Booking",
    cyberclubBookingTitle: "Reserve the room before someone else takes your night",
    cyberclubBookingBody:
      "Choose the format, open the booking page and arrive without heavy forms or extra steps.",
    cyberclubDirectActions: "Direct actions",
    cyberclubOpenBooking: "Open booking",
    restaurantMetaTitle: "Restaurant | Avulus Cyber Space",
    restaurantMetaDescription:
      "Avulus restaurant is a standalone 24/7 destination in central Moscow with breakfast, kitchen, cocktails and quick table reservations.",
    restaurantNavHero: "Hero",
    restaurantNavMenu: "Menu",
    restaurantNavReserve: "Reserve",
    restaurantEyebrow: "Restaurant",
    restaurantTitle: "A restaurant that lives beyond the club",
    restaurantBody:
      "Guests can come here just for dinner, cocktails and a late-night atmosphere in central Moscow, even without booking the club.",
    restaurantNotes: [
      "Guests can come just for the restaurant, without booking the club.",
      "The dark interior and nightlife mood work as a destination of their own.",
      "The restaurant follows the pulse of the city and stays on long after midnight."
    ],
    restaurantPrimary: "Reserve a table",
    restaurantSecondary: "Message on VK",
    restaurantHeroBadge: "Open 24/7",
    restaurantHeroHeadline: "Come for dinner. Stay for the night.",
    restaurantHeroSideTitle: "Dark lounge",
    restaurantMoodEyebrow: "Restaurant mood",
    restaurantMoodTitle: "Not an add-on. A destination.",
    restaurantMoodBody:
      "A darker interior, full kitchen and late-night rhythm make the restaurant a destination in its own right inside Avulus.",
    restaurantMenuEyebrow: "Menu",
    restaurantMenuTitle: "All-day and all-night",
    restaurantMenuBody:
      "The menu should read less like a category list and more like a promise of a long, fully-formed evening.",
    restaurantReserveEyebrow: "Reserve",
    restaurantReserveTitle: "Reserve the table while the mood is still there",
    restaurantReserveBody:
      "Message us, confirm the table and arrive. Reserving should take less than a minute.",
    restaurantDirectActions: "Direct actions",
    roomsMetaTitle: "Rooms | Avulus Cyber Space",
    roomsMetaDescription:
      "Choose a room format at Avulus Cyber Space: solo, privat, VIP and bootcamp. Clear options, fast booking and direct contact.",
    roomsNavHome: "Home",
    roomsNavRooms: "Rooms",
    roomsNavContacts: "Contacts",
    roomsEyebrow: "Rooms",
    roomsTitle: "Choose the format fast, then move straight into contact",
    roomsBody:
      "This page removes uncertainty: clear room formats, visible pricing and one-tap contact options.",
    roomsPanelEyebrow: "For longer stays",
    roomsPanelBody: "For duo and bootcamp visits, the club and restaurant should read as one seamless evening.",
    roomsPanelCta: "Ask about team bookings",
    roomsHowTitle: "How it works",
    roomsHowBody: "Reach out immediately through booking, Telegram, VK or a direct call. No heavy forms and no extra screens.",
    roomsContactEyebrow: "Contact options",
    roomsContactTitle: "Close the loop while intent is still high",
    roomsContactBody: "Keep the contact layer frictionless: booking, Telegram, VK and a direct call.",
    roomsOpenNow: "Open now",
    roomsStickyTelegram: "Telegram",
    roomsStickyVk: "VK",
    roomsStickyCall: "Call",
    roomsFilterAll: "All rooms",
    roomsFilterSolo: "Solo",
    roomsFilterDuo: "Privat / VIP",
    roomsFilterBootcamp: "Bootcamp",
    roomsPriceLabel: "Price",
    roomsStayLabel: "Stay",
    roomsCapacityLabel: "Capacity",
    roomsOpenBooking: "Open booking",
    roomsAskVk: "Ask in VK",
    roomsAddonEyebrow: "Restaurant",
    roomsAddonTitle: "Keep the booking simple, but show the restaurant as part of the full stay",
    roomsAddonBody: "The menu matters most for longer sessions, duo visits and team blocks.",
    roomsAddonCta: "View menu",
    menuCards: [
      { title: "Breakfast", body: "Breakfast options and a softer start to the day in central Moscow." },
      { title: "Kitchen", body: "Pizza, pasta, street food, bar and a proper late-night menu." },
      { title: "Cocktails", body: "Signature and classic cocktails for an evening that stretches deep into the night." }
    ],
    howItWorks: [
      { step: "01", title: "Pick the format", body: "Solo, privat, VIP or bootcamp, without any extra friction." },
      { step: "02", title: "Understand the flow", body: "Club and restaurant work as one evening, not as disconnected services." },
      { step: "03", title: "Act instantly", body: "One tap into booking, a messenger or a call." }
    ]
  }
};

export function getSharedContent(locale: Locale) {
  return sharedByLocale[locale];
}

export function getHomeNav(locale: Locale): NavItem[] {
  const isRu = locale === "ru";
  return [
    { label: isRu ? "Предложения" : "Offers", href: "#offers" },
    { label: isRu ? "Форматы" : "Rooms", href: "#rooms" },
    { label: isRu ? "Ресторан" : "Restaurant", href: "#restaurant" },
    { label: isRu ? "Как попасть" : "How to get here", href: "#contact" }
  ];
}

export function getRoomsNav(locale: Locale): NavItem[] {
  const c = getSharedContent(locale);
  return [
    { label: c.roomsNavHome, href: withLocale(locale, "/") },
    { label: c.roomsNavRooms, href: withLocale(locale, "/rooms"), active: true },
    { label: c.roomsNavContacts, href: "#contact-options" }
  ];
}

export function getCyberclubNav(locale: Locale): NavItem[] {
  const c = getSharedContent(locale);
  return [
    { label: c.cyberclubNavHero, href: "#top" },
    { label: c.cyberclubNavZones, href: "#zones" },
    { label: locale === "ru" ? "Тарифы" : "Pricing", href: "#pricing" },
    { label: c.cyberclubNavBook, href: "#book" }
  ];
}

export function getRestaurantNav(locale: Locale): NavItem[] {
  const c = getSharedContent(locale);
  return [
    { label: c.restaurantNavHero, href: "#top" },
    { label: c.restaurantNavMenu, href: "#menu" },
    { label: c.restaurantNavReserve, href: "#reserve" }
  ];
}

export function getClubZones(locale: Locale): ClubZone[] {
  return locale === "ru"
    ? [
        { name: "Privat", capacity: "Для двоих", hardware: "Отдельная посадка, TV и камерный сценарий без общего шума.", image: "/images/cyberclub-card.jpg" },
        { name: "Privat+", capacity: "Для пары или двух гостей", hardware: "Больше комфорта и более длинный формат для неторопливого вечера.", image: "/images/cyberclub-vip.jpg" },
        { name: "VIP", capacity: "Малая компания", hardware: "Премиальный уровень приватности, атмосферы и визуального статуса.", image: "/images/cyberclub-vip.jpg" },
        { name: "Super VIP", capacity: "Премиальный private-формат", hardware: "Максимальный уровень контроля над пространством и высоким сервисом.", image: "/images/cyberclub-team.jpg" },
        { name: "Stream", capacity: "Solo / creator", hardware: "Подходит для контента, стриминга и личного игрового ритма.", image: "/images/hero-main.jpg" },
        { name: "Bootcamp", capacity: "Для команд 5+", hardware: "Сильный формат для сквадов, тренировок и длинных командных блоков.", image: "/images/cyberclub-team.jpg" }
      ]
    : [
        { name: "Privat", capacity: "For two", hardware: "Private seating, TV and a room-first format without the noise of a shared hall.", image: "/images/cyberclub-card.jpg" },
        { name: "Privat+", capacity: "For a pair or two guests", hardware: "More comfort and a longer-session setup for an unhurried evening.", image: "/images/cyberclub-vip.jpg" },
        { name: "VIP", capacity: "Small group", hardware: "A premium tier of privacy, atmosphere and visual presence.", image: "/images/cyberclub-vip.jpg" },
        { name: "Super VIP", capacity: "High-end private format", hardware: "The highest level of control, comfort and premium service inside the club.", image: "/images/cyberclub-team.jpg" },
        { name: "Stream", capacity: "Solo / creator", hardware: "Built for content, streaming and a focused personal setup.", image: "/images/hero-main.jpg" },
        { name: "Bootcamp", capacity: "For teams of 5+", hardware: "A strong format for squads, training sessions and longer team blocks.", image: "/images/cyberclub-team.jpg" }
      ];
}

export function getRoomCards(locale: Locale): RoomCard[] {
  return locale === "ru"
    ? [
        { key: "solo-core", format: "solo", title: "Stream Room", subtitle: "Solo-комната под личный режим", description: "Для стрима, спокойной игры и длинной сессии без общего шума и лишних отвлекающих факторов.", price: "от 290 ₽ / час", duration: "1–4 часа", capacity: "1 игрок", image: "/images/cyberclub-card.jpg", features: ["Приватная посадка", "Подходит для контента", "Быстрый вход в игровой режим"] },
        { key: "solo-night", format: "solo", title: "Solo Night", subtitle: "Ночной формат на длинную дистанцию", description: "Для гостей, которые приезжают в клуб не на час, а на полноценный вечер или ночной блок.", price: "от 980 ₽ / блок", duration: "4 часа", capacity: "1 игрок", image: "/images/club-room-green.webp", features: ["Комфорт на длинной дистанции", "Легко сочетать с рестораном", "Подходит для late-night flow"] },
        { key: "duo-sync", format: "duo", title: "Privat", subtitle: "Комната для двоих", description: "Подходит для кооператива, пары, друзей и всех, кто хочет клуб без ощущения общего зала.", price: "от 490 ₽ / час", duration: "1–4 часа", capacity: "2 игрока", image: "/images/cyberclub-vip.jpg", features: ["TV и диваны", "Приватность", "Удобно для совместного вечера"] },
        { key: "duo-premium", format: "duo", title: "Privat+ / VIP", subtitle: "Усиленный приватный опыт", description: "Для тех, кто хочет больше комфорта, атмосферы и камерности внутри клуба.", price: "от 890 ₽ / час", duration: "4 часа", capacity: "2–4 игрока", image: "/images/club-room-red.webp", features: ["Премиальный формат", "Для длинных сессий", "Сценарий клуб + ресторан"] },
        { key: "bootcamp-squad", format: "bootcamp", title: "Bootcamp", subtitle: "Командная игровая зона", description: "Формат под скримы, тренировку, командные вечера и большие игровые блоки в приватной среде.", price: "от 850 ₽ / час", duration: "2–6 часов", capacity: "5 игроков", image: "/images/cyberclub-team.jpg", features: ["Командная посадка", "Сильные конфиги", "Оптимален для squads"] },
        { key: "bootcamp-event", format: "bootcamp", title: "Super VIP", subtitle: "Самый статусный клубный формат", description: "Для гостей, которым нужен private premium experience с максимальным комфортом и контролем над пространством.", price: "по запросу", duration: "Индивидуально", capacity: "Малая группа", image: "/images/cyberclub-vip.jpg", features: ["Максимальный комфорт", "Премиальная подача", "Лучший room-based опыт"] }
      ]
    : [
        { key: "solo-core", format: "solo", title: "Stream Room", subtitle: "A solo room for a private session", description: "Designed for streaming, focused gaming and longer stays without shared-hall noise.", price: "from 290 RUB / hour", duration: "1–4 hours", capacity: "1 player", image: "/images/cyberclub-card.jpg", features: ["Private seating", "Content-friendly setup", "Fast entry into game mode"] },
        { key: "solo-night", format: "solo", title: "Solo Night", subtitle: "Late-night format for longer stays", description: "For guests who come in for a full evening or a night block, not just a quick session.", price: "from 980 RUB / block", duration: "4 hours", capacity: "1 player", image: "/images/club-room-green.webp", features: ["Comfort over longer stays", "Easy to combine with the restaurant", "Built for a late-night flow"] },
        { key: "duo-sync", format: "duo", title: "Privat", subtitle: "A room for two", description: "A strong fit for co-op play, couples, friends and anyone who wants the club without the shared-hall atmosphere.", price: "from 490 RUB / hour", duration: "1–4 hours", capacity: "2 players", image: "/images/cyberclub-vip.jpg", features: ["TV and lounge seating", "Privacy", "Built for a shared evening"] },
        { key: "duo-premium", format: "duo", title: "Privat+ / VIP", subtitle: "An elevated private experience", description: "For guests who want more comfort, atmosphere and intimacy inside the club.", price: "from 890 RUB / hour", duration: "4 hours", capacity: "2–4 players", image: "/images/club-room-red.webp", features: ["Premium format", "Built for longer sessions", "Club + restaurant flow"] },
        { key: "bootcamp-squad", format: "bootcamp", title: "Bootcamp", subtitle: "A team gaming zone", description: "Built for scrims, training, team sessions and longer competitive blocks inside a private environment.", price: "from 850 RUB / hour", duration: "2–6 hours", capacity: "5 players", image: "/images/cyberclub-team.jpg", features: ["Team seating", "High-end setups", "Ideal for squads"] },
        { key: "bootcamp-event", format: "bootcamp", title: "Super VIP", subtitle: "The most elevated club format", description: "For guests who want a premium private experience with maximum comfort and control over the space.", price: "on request", duration: "Custom", capacity: "Small group", image: "/images/cyberclub-vip.jpg", features: ["Maximum comfort", "Premium presentation", "Top-tier room-based experience"] }
      ];
}

export function getContactOptions(locale: Locale): ContactOption[] {
  return locale === "ru"
    ? [
        { label: "Бронь клуба", description: "Быстрый переход в бронирование игровых мест и комнат.", href: contactLinks.booking, goal: "contact_booking" },
        { label: "Telegram", description: "Самый быстрый контакт по клубу, ресторану и любым вопросам.", href: contactLinks.telegram, goal: "contact_telegram" },
        { label: "Позвонить", description: "Для срочных вопросов, навигации по локации и моментального контакта.", href: contactLinks.call, goal: "contact_call" }
      ]
    : [
        { label: "Club booking", description: "Direct access to the booking page for gaming setups and private rooms.", href: contactLinks.booking, goal: "contact_booking" },
        { label: "Telegram", description: "The fastest channel for club, restaurant and general enquiries.", href: contactLinks.telegram, goal: "contact_telegram" },
        { label: "Call", description: "Best for urgent questions, directions and direct contact.", href: contactLinks.call, goal: "contact_call" }
      ];
}

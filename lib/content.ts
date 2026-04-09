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
  format: "solo" | "privat" | "vip" | "bootcamp";
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
  /** Full menu (QR / Yandex Maps) — replace when the final public menu URL is confirmed */
  menu: "https://yandex.ru/maps/?text=Avulus%20Cyber%20Space%20ресторан%20меню",
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
  contactsPhone: string;
  contactsOpen247: string;
  contactsParking: string;
  homeOpenBadge: string;
  homeOpenSupport: string;
  homeOffersTitle: string;
  homeOffersCards: { title: string; body: string; cta: string }[];
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
  cyberclubSpecsEyebrow: string;
  cyberclubSpecsTitle: string;
  cyberclubSpecsBody: string;
  cyberclubSpecsItems: string[];
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
  restaurantShortDescription: string;
  restaurantMenuButton: string;
  restaurantMenuUrl: string;
  restaurantMenuHint: string;
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
  roomsFilterPrivat: string;
  roomsFilterVip: string;
  roomsFilterBootcamp: string;
  roomsBootcampNote: string;
  roomsPriceLabel: string;
  roomsPricePending: string;
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
      "Avulus Cyber Space — премиальный киберклуб, ресторан и бар 24/7 в центре Москвы. Бронь клуба, стол и контакты — в один клик.",
    homeHeroKicker: "Киберклуб и ресторан в центре Москвы",
    homeBookClub: "Забронировать комп",
    homeReserveTable: "Забронировать стол",
    homeCardClubEyebrow: "Клуб",
    homeCardClubBody: "Приватные комнаты, сильные конфиги и быстрая бронь 24/7.",
    homeCardClubLabel: "Забронировать клуб",
    homeCardClubPage: "Страница клуба",
    homeCardRestaurantEyebrow: "Ресторан",
    homeCardRestaurantBody: "Полноценный ресторан 24/7. Можно приехать отдельно, даже без брони клуба.",
    homeCardRestaurantLabel: "Забронировать стол",
    homeCardRestaurantPage: "Страница ресторана",
    featureAlwaysOpenTitle: "24/7",
    featureAlwaysOpenBody: "Клуб и ресторан работают круглосуточно.",
    featureLocationTitle: "Центр Москвы",
    featureContactsTitle: "Контакты",
    featureContactsBody: "+7 495 921-22-21 • Telegram",
    contactsTitle: "Контакты",
    contactsSubtitle: "Серебрянический переулок, 12с1",
    contactsPhone: "+7 495 921-22-21",
    contactsOpen247: "Открыты 24 часа в сутки, 7 дней в неделю",
    contactsParking: "Бесплатная парковка рядом",
    homeOpenBadge: "Открыты 24/7",
    homeOpenSupport: "Клуб, ресторан и бар открыты 24/7",
    homeOffersTitle: "Специальные предложения",
    homeOffersCards: [
      { title: "Ночной слот", body: "Комнаты с комфортной посадкой и быстрым подтверждением в Telegram.", cta: "Уточнить в Telegram" },
      { title: "Privat / VIP", body: "Форматы для пары и небольшой компании: приватность, диван, сервис.", cta: "Забронировать в Telegram" },
      { title: "Командные блоки", body: "Bootcamp — комнаты на 5+ человек, единый сценарий вечера.", cta: "Согласовать в Telegram" },
      { title: "Клуб + ужин", body: "Соберём вечер: игровой формат и стол в ресторане в одном визите.", cta: "Собрать в Telegram" },
      { title: "Праздник в Avulus", body: "Индивидуальный сценарий без лишних шагов — обсудим детали в мессенджере.", cta: "Обсудить в Telegram" }
    ],
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
    cyberclubSecondary: "Позвонить",
    cyberclubPrivateByDesign: "Приватность как часть дизайна",
    cyberclubVipRooms: "VIP-комнаты",
    cyberclubMoodEyebrow: "Атмосфера клуба",
    cyberclubMoodTitle: "Меньше аркады. Больше московской ночи.",
    cyberclubMoodBody:
      "Avulus должен ощущаться премиальным, камерным и статусным еще до того, как гость начнет сравнивать спецификации.",
    cyberclubZonesEyebrow: "Зоны",
    cyberclubZonesTitle: "Форматы со статусом",
    cyberclubZonesBody:
      "Каждая зона должна ощущаться как отдельный уровень клуба, а не как еще один набор столов.",
    cyberclubSpecsEyebrow: "Станции",
    cyberclubSpecsTitle: "Игровые ПК и периферия",
    cyberclubSpecsBody:
      "Понятный уровень конфигураций для соревновательного ритма, стриминга и длинных сессий — без ухода на внешние каталоги.",
    cyberclubSpecsItems: [
      "Видеокарты NVIDIA GeForce RTX 4080",
      "Процессоры Intel Core i7 и AMD Ryzen 7",
      "32 ГБ оперативной памяти, накопители NVMe SSD",
      "Мониторы с высокой частотой обновления и геймерская периферия"
    ],
    cyberclubBookingEyebrow: "Бронь",
    cyberclubBookingTitle: "Забронируй комнату до того, как кто-то займет твой вечер",
    cyberclubBookingBody:
      "Сценарий для клуба должен закрываться без лишних переходов: открыть бронь, выбрать формат и приехать.",
    cyberclubDirectActions: "Быстрые действия",
    cyberclubOpenBooking: "Забронировать в Telegram",
    restaurantMetaTitle: "Ресторан | Avulus Cyber Space",
    restaurantMetaDescription:
      "Кухня и бар Avulus Cyber Space 24/7 в центре Москвы. Бронь стола в Telegram, визуал блюд и ссылка на полное меню.",
    restaurantNavHero: "Главное",
    restaurantNavMenu: "Меню",
    restaurantNavReserve: "Резерв",
    restaurantEyebrow: "Ресторан",
    restaurantTitle: "Ресторан внутри Avulus Cyber Space",
    restaurantBody:
      "Кухня и бар внутри киберпространства. Открыто 24/7.",
    restaurantNotes: [
      "Кухня и бар работают в едином пространстве с клубом.",
      "Подходит для ужина, напитков и длинного вечернего ритма.",
      "Открыто 24/7: можно приехать в любое время."
    ],
    restaurantPrimary: "Забронировать стол",
    restaurantSecondary: "Позвонить",
    restaurantHeroBadge: "Открыто 24/7",
    restaurantHeroHeadline: "Приезжай на ужин. Оставайся до ночи.",
    restaurantHeroSideTitle: "Темный lounge",
    restaurantMoodEyebrow: "Настроение ресторана",
    restaurantMoodTitle: "Еда и атмосфера без лишних шагов",
    restaurantMoodBody:
      "Показываем визуал блюд и напитков; полный список — по ссылке на меню в Яндекс.Картах (обновим после финального QR).",
    restaurantShortDescription: "Кухня и бар внутри киберпространства. Открыто 24/7.",
    restaurantMenuButton: "Смотреть полное меню",
    restaurantMenuUrl: contactLinks.menu,
    restaurantMenuHint:
      "Ссылка ведёт на карточку заведения и меню в Яндекс.Картах — заменим на финальный QR, как только команда пришлёт адрес.",
    restaurantMenuEyebrow: "Меню",
    restaurantMenuTitle: "Еда и напитки",
    restaurantMenuBody: "Коллекция фото ниже; полный перечень — по кнопке меню (обновим ссылку после финального QR).",
    restaurantReserveEyebrow: "Резерв",
    restaurantReserveTitle: "Забронируй стол, пока настроение еще живо",
    restaurantReserveBody:
      "Для ресторана сценарий должен быть еще проще, чем для клуба: написать, подтвердить стол и приехать.",
    restaurantDirectActions: "Быстрые действия",
    roomsMetaTitle: "Комнаты | Avulus Cyber Space",
    roomsMetaDescription:
      "Форматы комнат в Avulus Cyber Space: solo, privat, VIP и bootcamp. Вместимость, сценарии и бронь в Telegram.",
    roomsNavHome: "Главная",
    roomsNavRooms: "Комнаты",
    roomsNavContacts: "Контакты",
    roomsEyebrow: "Комнаты",
    roomsTitle: "Выбери формат быстро, затем сразу перейди к брони",
    roomsBody:
      "Эта страница убирает сомнения: понятные форматы, вместимость и быстрый контакт без лишних шагов.",
    roomsPanelEyebrow: "Для длинных сессий",
    roomsPanelBody: "Для duo и bootcamp важно сразу показывать и клуб, и ресторан как единый сценарий вечера.",
    roomsPanelCta: "Написать по командам",
    roomsHowTitle: "Как это работает",
    roomsHowBody: "CTA должен быть быстрым: мессенджер, мессенджер, звонок. Без длинных форм и лишних экранов.",
    roomsContactEyebrow: "Варианты связи",
    roomsContactTitle: "Закрывай решение, пока намерение еще высоко",
    roomsContactBody: "Быстрый контакт: сначала Telegram, при необходимости — звонок.",
    roomsOpenNow: "Открыть сейчас",
    roomsStickyTelegram: "Telegram",
    roomsStickyVk: "VK",
    roomsStickyCall: "Звонок",
    roomsFilterAll: "Все комнаты",
    roomsFilterSolo: "Solo",
    roomsFilterPrivat: "Privat",
    roomsFilterVip: "VIP",
    roomsFilterBootcamp: "Bootcamp",
    roomsBootcampNote: "Bootcamp — не отдельный продукт: это комнаты на 5+ человек в общем фильтре форматов.",
    roomsPriceLabel: "Условия",
    roomsPricePending: "Уточняем в Telegram",
    roomsStayLabel: "Время",
    roomsCapacityLabel: "Вместимость",
    roomsOpenBooking: "Забронировать в Telegram",
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
      "Avulus Cyber Space is a premium cyberclub with restaurant and bar open 24/7 in central Moscow. Book club time, a table, or reach us in one click.",
    homeHeroKicker: "Cyberclub and restaurant in central Moscow",
    homeBookClub: "Book a setup",
    homeReserveTable: "Book a table",
    homeCardClubEyebrow: "Club",
    homeCardClubBody: "Private rooms, high-end gaming hardware and a frictionless booking flow 24/7.",
    homeCardClubLabel: "Book the club",
    homeCardClubPage: "Club page",
    homeCardRestaurantEyebrow: "Restaurant",
    homeCardRestaurantBody: "A full restaurant open 24/7. Guests can come purely for dinner, drinks and the atmosphere.",
    homeCardRestaurantLabel: "Book a table",
    homeCardRestaurantPage: "Restaurant page",
    featureAlwaysOpenTitle: "24/7",
    featureAlwaysOpenBody: "Both the club and the restaurant are open around the clock.",
    featureLocationTitle: "Central Moscow",
    featureContactsTitle: "Contacts",
    featureContactsBody: "+7 495 921-22-21 • Telegram",
    contactsTitle: "Contacts",
    contactsSubtitle: "12 bld. 1 Serebryanichesky Lane",
    contactsPhone: "+7 495 921-22-21",
    contactsOpen247: "Open 24 hours a day, 7 days a week",
    contactsParking: "Free parking nearby",
    homeOpenBadge: "Open 24/7",
    homeOpenSupport: "Club, restaurant, and bar are open 24/7",
    homeOffersTitle: "Current offers",
    homeOffersCards: [
      { title: "Late-night slot", body: "Room formats with comfortable seating and fast confirmation in Telegram.", cta: "Check in Telegram" },
      { title: "Privat / VIP", body: "Formats for couples and small groups: privacy, sofa, in-room service.", cta: "Book in Telegram" },
      { title: "Team blocks", body: "Bootcamp means rooms for 5+ people—one flexible evening flow.", cta: "Arrange in Telegram" },
      { title: "Club + dinner", body: "We’ll shape one visit: gaming time and a restaurant table.", cta: "Plan in Telegram" },
      { title: "Celebrations", body: "A tailored scenario without extra friction—details in the messenger.", cta: "Discuss in Telegram" }
    ],
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
    cyberclubSecondary: "Call",
    cyberclubPrivateByDesign: "Private by design",
    cyberclubVipRooms: "VIP rooms",
    cyberclubMoodEyebrow: "Club mood",
    cyberclubMoodTitle: "Less arcade. More capital city night.",
    cyberclubMoodBody:
      "Avulus should feel premium, private and atmospheric before guests even start comparing technical specs.",
    cyberclubZonesEyebrow: "Zones",
    cyberclubZonesTitle: "Formats with status",
    cyberclubZonesBody:
      "Each zone should feel like its own tier inside the club, not just another row of gaming desks.",
    cyberclubSpecsEyebrow: "Setups",
    cyberclubSpecsTitle: "Gaming PCs and peripherals",
    cyberclubSpecsBody:
      "High-tier configurations for competitive play, streaming and long sessions—shown here, without sending people to external catalogs.",
    cyberclubSpecsItems: [
      "NVIDIA GeForce RTX 4080 graphics cards",
      "Intel Core i7 and AMD Ryzen 7 processors",
      "32 GB RAM and NVMe SSD storage",
      "High refresh-rate monitors and gaming peripherals"
    ],
    cyberclubBookingEyebrow: "Booking",
    cyberclubBookingTitle: "Reserve the room before someone else takes your night",
    cyberclubBookingBody:
      "The booking flow should close fast: open the booking page, choose the format and arrive.",
    cyberclubDirectActions: "Direct actions",
    cyberclubOpenBooking: "Book in Telegram",
    restaurantMetaTitle: "Restaurant | Avulus Cyber Space",
    restaurantMetaDescription:
      "Kitchen and bar at Avulus Cyber Space, open 24/7 in central Moscow. Book a table in Telegram, food visuals and link to the full menu.",
    restaurantNavHero: "Hero",
    restaurantNavMenu: "Menu",
    restaurantNavReserve: "Reserve",
    restaurantEyebrow: "Restaurant",
    restaurantTitle: "Restaurant inside Avulus Cyber Space",
    restaurantBody:
      "Kitchen and bar inside a cyber space. Open 24/7.",
    restaurantNotes: [
      "Kitchen and bar work in one space with the club.",
      "Built for food, drinks and a long evening rhythm.",
      "Open 24/7, so guests can arrive anytime."
    ],
    restaurantPrimary: "Book a table",
    restaurantSecondary: "Call",
    restaurantHeroBadge: "Open 24/7",
    restaurantHeroHeadline: "Come for dinner. Stay for the night.",
    restaurantHeroSideTitle: "Dark lounge",
    restaurantMoodEyebrow: "Restaurant mood",
    restaurantMoodTitle: "Food visuals first, full menu by link",
    restaurantMoodBody:
      "We showcase food and drinks on the site; the full list opens via the Yandex Maps menu link (we’ll swap in the final QR once the team confirms it).",
    restaurantShortDescription: "Kitchen and bar inside a cyber space. Open 24/7.",
    restaurantMenuButton: "View full menu",
    restaurantMenuUrl: contactLinks.menu,
    restaurantMenuHint:
      "Link goes to our venue card and menu on Yandex Maps—we’ll replace it with the final QR URL when you send it.",
    restaurantMenuEyebrow: "Menu",
    restaurantMenuTitle: "Food and drinks",
    restaurantMenuBody: "Gallery below; full list opens via the menu button (we’ll update the link after the final QR).",
    restaurantReserveEyebrow: "Reserve",
    restaurantReserveTitle: "Reserve the table while the mood is still there",
    restaurantReserveBody:
      "For the restaurant, the path should be even simpler than for the club: message, confirm the table and arrive.",
    restaurantDirectActions: "Direct actions",
    roomsMetaTitle: "Rooms | Avulus Cyber Space",
    roomsMetaDescription:
      "Room formats at Avulus Cyber Space: solo, privat, VIP and bootcamp. Capacity, scenarios and booking in Telegram.",
    roomsNavHome: "Home",
    roomsNavRooms: "Rooms",
    roomsNavContacts: "Contacts",
    roomsEyebrow: "Rooms",
    roomsTitle: "Choose the format fast, then move straight into contact",
    roomsBody:
      "This page removes uncertainty: clear formats, headcount and one-tap contact without extra steps.",
    roomsPanelEyebrow: "For longer stays",
    roomsPanelBody: "For duo and bootcamp visits, the club and restaurant should read as one seamless evening.",
    roomsPanelCta: "Ask about team bookings",
    roomsHowTitle: "How it works",
    roomsHowBody: "The CTA layer should feel immediate: messenger, messenger, phone. No heavy forms and no extra screens.",
    roomsContactEyebrow: "Contact options",
    roomsContactTitle: "Close the loop while intent is still high",
    roomsContactBody: "Keep the contact layer frictionless: Telegram first, then a direct call.",
    roomsOpenNow: "Open now",
    roomsStickyTelegram: "Telegram",
    roomsStickyVk: "VK",
    roomsStickyCall: "Call",
    roomsFilterAll: "All rooms",
    roomsFilterSolo: "Solo",
    roomsFilterPrivat: "Privat",
    roomsFilterVip: "VIP",
    roomsFilterBootcamp: "Bootcamp",
    roomsBootcampNote: "Bootcamp is not a separate product—it filters rooms for groups of 5+.",
    roomsPriceLabel: "Details",
    roomsPricePending: "Ask in Telegram",
    roomsStayLabel: "Stay",
    roomsCapacityLabel: "Capacity",
    roomsOpenBooking: "Book in Telegram",
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
  const c = getSharedContent(locale);
  return [
    { label: c.homeCardClubEyebrow, href: "#club" },
    { label: c.homeCardRestaurantEyebrow, href: "#restaurant" },
    { label: c.contactsTitle, href: "#contact" }
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
        { key: "solo-core", format: "solo", title: "Stream Room", subtitle: "Solo-комната под личный режим", description: "Для стрима, спокойной игры и длинной сессии без общего шума и лишних отвлекающих факторов.", price: "", duration: "1–4 часа", capacity: "1 человек", image: "/images/cyberclub-card.jpg", features: ["Приватная посадка", "Подходит для контента", "Быстрый вход в игровой режим"] },
        { key: "solo-night", format: "solo", title: "Solo Night", subtitle: "Ночной формат на длинную дистанцию", description: "Для гостей, которые приезжают в клуб не на час, а на полноценный вечерний блок.", price: "", duration: "4 часа", capacity: "1 человек", image: "/images/dish-snack.jpg", features: ["Комфорт на длинной дистанции", "Легко сочетать с рестораном", "Подходит для позднего ритма"] },
        { key: "privat-sync", format: "privat", title: "Privat", subtitle: "Комната для двоих", description: "Комфортный диван, room service, мини-бар и приватность. Вечер до глубокой ночи — спокойно, уютно, без лишнего шума.", price: "", duration: "1–4 часа", capacity: "1–2 человека", image: "/images/cyberclub-vip.jpg", features: ["Комфортный диван", "Room service", "Мини-бар", "Приватность"] },
        { key: "vip-premium", format: "vip", title: "VIP", subtitle: "Усиленный приватный формат", description: "Больше пространства и сервиса: диван, room service и мини-бар. Формат для вечера и ночи в комфорте — со статусной подачей.", price: "", duration: "4 часа", capacity: "2–4 человека", image: "/images/restaurant-card.jpg", features: ["Премиальная приватность", "Комфортный диван", "Room service", "Мини-бар"] },
        { key: "bootcamp-squad", format: "bootcamp", title: "Bootcamp", subtitle: "Комнаты для 5+ человек", description: "Не отдельный продукт — те же комнаты, отфильтрованные под группы 5+: скримы, тренировки и командные блоки в приватной среде.", price: "", duration: "2–6 часов", capacity: "5–8 человек", image: "/images/cyberclub-team.jpg", features: ["Командная посадка", "Сильные конфиги", "Для squads и командных вечеров"] },
        { key: "bootcamp-event", format: "bootcamp", title: "Super VIP", subtitle: "Статусный групповой формат", description: "Для компании, которой нужен максимум комфорта и контроля над пространством на весь вечер.", price: "", duration: "Индивидуально", capacity: "4–8 человек", image: "/images/restaurant-room.jpg", features: ["Максимальный комфорт", "Премиальная подача", "Приватный формат для компании"] }
      ]
    : [
        { key: "solo-core", format: "solo", title: "Stream Room", subtitle: "A solo room for a private session", description: "Designed for streaming, focused gaming and longer stays without shared-hall noise.", price: "", duration: "1–4 hours", capacity: "1 person", image: "/images/cyberclub-card.jpg", features: ["Private seating", "Content-friendly setup", "Fast entry into game mode"] },
        { key: "solo-night", format: "solo", title: "Solo Night", subtitle: "Late-night format for longer stays", description: "For guests who come in for a full evening block, not just a quick session.", price: "", duration: "4 hours", capacity: "1 person", image: "/images/dish-snack.jpg", features: ["Comfort over longer stays", "Easy to combine with the restaurant", "Built for a late-night flow"] },
        { key: "privat-sync", format: "privat", title: "Privat", subtitle: "A room for two", description: "Comfortable sofa, room service, minibar and privacy. An evening deep into the night—calm, cosy, without hall noise.", price: "", duration: "1–4 hours", capacity: "1–2 people", image: "/images/cyberclub-vip.jpg", features: ["Comfortable sofa", "Room service", "Minibar", "Privacy"] },
        { key: "vip-premium", format: "vip", title: "VIP", subtitle: "An elevated private format", description: "More space and service: sofa, room service and minibar. A comfortable evening-and-night format—with a premium feel.", price: "", duration: "4 hours", capacity: "2–4 people", image: "/images/restaurant-card.jpg", features: ["Premium privacy", "Comfortable sofa", "Room service", "Minibar"] },
        { key: "bootcamp-squad", format: "bootcamp", title: "Bootcamp", subtitle: "Rooms for 5+ people", description: "Not a separate product—the same rooms, filtered for groups of 5+: scrims, training and team blocks in a private setting.", price: "", duration: "2–6 hours", capacity: "5–8 people", image: "/images/cyberclub-team.jpg", features: ["Team seating", "High-end setups", "Built for squads"] },
        { key: "bootcamp-event", format: "bootcamp", title: "Super VIP", subtitle: "Top group format", description: "For groups that want maximum comfort and control over the space for the full evening.", price: "", duration: "Custom", capacity: "4–8 people", image: "/images/restaurant-room.jpg", features: ["Maximum comfort", "Premium presentation", "Private format for groups"] }
      ];
}

export function getContactOptions(locale: Locale): ContactOption[] {
  return locale === "ru"
    ? [
        { label: "Telegram", description: "Самый быстрый контакт по клубу, ресторану и любым вопросам.", href: contactLinks.telegram, goal: "contact_telegram" },
        { label: "Позвонить", description: "Для срочных вопросов, навигации по локации и моментального контакта.", href: contactLinks.call, goal: "contact_call" }
      ]
    : [
        { label: "Telegram", description: "The fastest channel for club, restaurant and general enquiries.", href: contactLinks.telegram, goal: "contact_telegram" },
        { label: "Call", description: "Best for urgent questions, directions and direct contact.", href: contactLinks.call, goal: "contact_call" }
      ];
}

import type { Locale } from "@/lib/content";

type LocalizedText = Record<Locale, string>;

export type PricingEntry = {
  label: LocalizedText;
  price: string;
};

export type PricingCard = {
  title: string;
  entries: PricingEntry[];
  packages?: PricingEntry[];
};

export type PricingPeriod = {
  key: string;
  label: LocalizedText;
  time: string;
  cards: PricingCard[];
};

export type MenuItem = {
  name: LocalizedText;
  details?: LocalizedText;
  price: string;
};

export type MenuCategory = {
  title: LocalizedText;
  items: MenuItem[];
};

export function t(locale: Locale, text: LocalizedText) {
  return text[locale];
}

export const pricingPeriods: PricingPeriod[] = [
  {
    key: "weekday-day",
    label: { ru: "Будни", en: "Weekdays" },
    time: "08:00 - 20:00",
    cards: [
      {
        title: "PRIVATE",
        entries: [
          { label: { ru: "1 ЧАС", en: "1 HOUR" }, price: "290" },
          { label: { ru: "3 ЧАС", en: "3 HOUR" }, price: "730" },
          { label: { ru: "5 ЧАС", en: "5 HOUR" }, price: "1170" }
        ]
      },
      {
        title: "PRIVATE+",
        entries: [
          { label: { ru: "1 ЧАС", en: "1 HOUR" }, price: "410" },
          { label: { ru: "3 ЧАС", en: "3 HOUR" }, price: "1020" },
          { label: { ru: "5 ЧАС", en: "5 HOUR" }, price: "1620" }
        ]
      },
      {
        title: "VIP",
        entries: [
          { label: { ru: "1 ЧАС", en: "1 HOUR" }, price: "680" },
          { label: { ru: "3 ЧАС", en: "3 HOUR" }, price: "1700" },
          { label: { ru: "5 ЧАС", en: "5 HOUR" }, price: "2720" }
        ]
      },
      {
        title: "STREAM",
        entries: [
          { label: { ru: "1 ЧАС", en: "1 HOUR" }, price: "525" },
          { label: { ru: "3 ЧАС", en: "3 HOUR" }, price: "1315" },
          { label: { ru: "5 ЧАС", en: "5 HOUR" }, price: "2100" }
        ]
      },
      {
        title: "PS5",
        entries: [
          { label: { ru: "1 ЧАС", en: "1 HOUR" }, price: "750" },
          { label: { ru: "3 ЧАС", en: "3 HOUR" }, price: "1875" },
          { label: { ru: "5 ЧАС", en: "5 HOUR" }, price: "2625" }
        ]
      },
      {
        title: "SUPER VIP",
        entries: [
          { label: { ru: "1 ЧАС", en: "1 HOUR" }, price: "12500" },
          { label: { ru: "3 ЧАС", en: "3 HOUR" }, price: "31250" },
          { label: { ru: "5 ЧАС", en: "5 HOUR" }, price: "43750" }
        ]
      }
    ]
  },
  {
    key: "weekday-night",
    label: { ru: "Будни", en: "Weekdays" },
    time: "20:00 - 08:00",
    cards: [
      {
        title: "PRIVATE",
        entries: [
          { label: { ru: "1 ЧАС", en: "1 HOUR" }, price: "330" },
          { label: { ru: "3 ЧАС", en: "3 HOUR" }, price: "840" },
          { label: { ru: "5 ЧАС", en: "5 HOUR" }, price: "1340" }
        ],
        packages: [
          { label: { ru: "Пакет ночь", en: "Night pack" }, price: "2010" },
          { label: { ru: "Пакет до обеда", en: "Till noon pack" }, price: "2830" }
        ]
      },
      {
        title: "PRIVATE +",
        entries: [
          { label: { ru: "1 ЧАС", en: "1 HOUR" }, price: "470" },
          { label: { ru: "3 ЧАС", en: "3 HOUR" }, price: "1170" },
          { label: { ru: "5 ЧАС", en: "5 HOUR" }, price: "1860" }
        ],
        packages: [
          { label: { ru: "Пакет ночь", en: "Night pack" }, price: "2830" },
          { label: { ru: "Пакет до обеда", en: "Till noon pack" }, price: "3740" }
        ]
      },
      {
        title: "VIP",
        entries: [
          { label: { ru: "1 ЧАС", en: "1 HOUR" }, price: "800" },
          { label: { ru: "3 ЧАС", en: "3 HOUR" }, price: "1950" },
          { label: { ru: "5 ЧАС", en: "5 HOUR" }, price: "3130" }
        ],
        packages: [{ label: { ru: "Пакет ночь", en: "Night pack" }, price: "4800" }]
      },
      {
        title: "STREAM",
        entries: [
          { label: { ru: "1 ЧАС", en: "1 HOUR" }, price: "615" },
          { label: { ru: "3 ЧАС", en: "3 HOUR" }, price: "1510" },
          { label: { ru: "5 ЧАС", en: "5 HOUR" }, price: "2410" }
        ],
        packages: [
          { label: { ru: "Пакет ночь", en: "Night pack" }, price: "3690" },
          { label: { ru: "Пакет до обеда", en: "Till noon pack" }, price: "4900" }
        ]
      },
      {
        title: "PS5",
        entries: [
          { label: { ru: "1 ЧАС", en: "1 HOUR" }, price: "900" },
          { label: { ru: "3 ЧАС", en: "3 HOUR" }, price: "2250" },
          { label: { ru: "5 ЧАС", en: "5 HOUR" }, price: "3150" }
        ],
        packages: [
          { label: { ru: "Пакет день", en: "Day pack" }, price: "3200" },
          { label: { ru: "Пакет ночь", en: "Night pack" }, price: "3800" }
        ]
      },
      {
        title: "SUPER VIP",
        entries: [
          { label: { ru: "1 ЧАС", en: "1 HOUR" }, price: "15000" },
          { label: { ru: "3 ЧАС", en: "3 HOUR" }, price: "37500" },
          { label: { ru: "5 ЧАС", en: "5 HOUR" }, price: "52500" }
        ],
        packages: [
          { label: { ru: "Пакет ночь", en: "Night pack" }, price: "82500" },
          { label: { ru: "Пакет сутки", en: "24h pack" }, price: "150000" }
        ]
      }
    ]
  },
  {
    key: "weekend-day",
    label: { ru: "Выходные", en: "Weekends" },
    time: "08:00 - 20:00",
    cards: [
      {
        title: "PRIVATE",
        entries: [
          { label: { ru: "1 ЧАС", en: "1 HOUR" }, price: "350" },
          { label: { ru: "3 ЧАС", en: "3 HOUR" }, price: "870" },
          { label: { ru: "5 ЧАС", en: "5 HOUR" }, price: "1390" }
        ]
      },
      {
        title: "PRIVATE+",
        entries: [
          { label: { ru: "1 ЧАС", en: "1 HOUR" }, price: "480" },
          { label: { ru: "3 ЧАС", en: "3 HOUR" }, price: "1210" },
          { label: { ru: "5 ЧАС", en: "5 HOUR" }, price: "1930" }
        ]
      },
      {
        title: "VIP",
        entries: [
          { label: { ru: "1 ЧАС", en: "1 HOUR" }, price: "820" },
          { label: { ru: "3 ЧАС", en: "3 HOUR" }, price: "2050" },
          { label: { ru: "5 ЧАС", en: "5 HOUR" }, price: "3280" }
        ]
      },
      {
        title: "STREAM",
        entries: [
          { label: { ru: "1 ЧАС", en: "1 HOUR" }, price: "630" },
          { label: { ru: "3 ЧАС", en: "3 HOUR" }, price: "1575" },
          { label: { ru: "5 ЧАС", en: "5 HOUR" }, price: "2520" }
        ]
      },
      {
        title: "PS5",
        entries: [
          { label: { ru: "1 ЧАС", en: "1 HOUR" }, price: "950" },
          { label: { ru: "3 ЧАС", en: "3 HOUR" }, price: "2375" },
          { label: { ru: "5 ЧАС", en: "5 HOUR" }, price: "3325" }
        ]
      },
      {
        title: "SUPER VIP",
        entries: [
          { label: { ru: "1 ЧАС", en: "1 HOUR" }, price: "17500" },
          { label: { ru: "3 ЧАС", en: "3 HOUR" }, price: "43750" },
          { label: { ru: "5 ЧАС", en: "5 HOUR" }, price: "61250" }
        ]
      }
    ]
  },
  {
    key: "weekend-night",
    label: { ru: "Выходные", en: "Weekends" },
    time: "20:00 - 08:00",
    cards: [
      {
        title: "PRIVATE",
        entries: [
          { label: { ru: "1 ЧАС", en: "1 HOUR" }, price: "390" },
          { label: { ru: "3 ЧАС", en: "3 HOUR" }, price: "1000" },
          { label: { ru: "5 ЧАС", en: "5 HOUR" }, price: "1590" }
        ],
        packages: [
          { label: { ru: "Пакет ночь", en: "Night pack" }, price: "2400" },
          { label: { ru: "Пакет до обеда", en: "Till noon pack" }, price: "3400" }
        ]
      },
      {
        title: "PRIVATE +",
        entries: [
          { label: { ru: "1 ЧАС", en: "1 HOUR" }, price: "560" },
          { label: { ru: "3 ЧАС", en: "3 HOUR" }, price: "1390" },
          { label: { ru: "5 ЧАС", en: "5 HOUR" }, price: "2210" }
        ],
        packages: [
          { label: { ru: "Пакет ночь", en: "Night pack" }, price: "3410" },
          { label: { ru: "Пакет до обеда", en: "Till noon pack" }, price: "4510" }
        ]
      },
      {
        title: "VIP",
        entries: [
          { label: { ru: "1 ЧАС", en: "1 HOUR" }, price: "900" },
          { label: { ru: "3 ЧАС", en: "3 HOUR" }, price: "2350" },
          { label: { ru: "5 ЧАС", en: "5 HOUR" }, price: "3760" }
        ],
        packages: [{ label: { ru: "Пакет ночь", en: "Night pack" }, price: "5400" }]
      },
      {
        title: "STREAM",
        entries: [
          { label: { ru: "1 ЧАС", en: "1 HOUR" }, price: "705" },
          { label: { ru: "3 ЧАС", en: "3 HOUR" }, price: "1810" },
          { label: { ru: "5 ЧАС", en: "5 HOUR" }, price: "2900" }
        ],
        packages: [
          { label: { ru: "Пакет ночь", en: "Night pack" }, price: "4230" },
          { label: { ru: "Пакет до обеда", en: "Till noon pack" }, price: "5600" }
        ]
      },
      {
        title: "PS5",
        entries: [
          { label: { ru: "1 ЧАС", en: "1 HOUR" }, price: "1100" },
          { label: { ru: "3 ЧАС", en: "3 HOUR" }, price: "2750" },
          { label: { ru: "5 ЧАС", en: "5 HOUR" }, price: "3850" }
        ],
        packages: [
          { label: { ru: "Пакет день", en: "Day pack" }, price: "3900" },
          { label: { ru: "Пакет ночь", en: "Night pack" }, price: "4400" }
        ]
      },
      {
        title: "SUPER VIP",
        entries: [
          { label: { ru: "1 ЧАС", en: "1 HOUR" }, price: "20000" },
          { label: { ru: "3 ЧАС", en: "3 HOUR" }, price: "50000" },
          { label: { ru: "5 ЧАС", en: "5 HOUR" }, price: "70000" }
        ],
        packages: [
          { label: { ru: "Пакет ночь", en: "Night pack" }, price: "110000" },
          { label: { ru: "Пакет сутки", en: "24h pack" }, price: "300000" }
        ]
      }
    ]
  }
];

export const restaurantMenu: MenuCategory[] = [
  {
    title: { ru: "Завтраки", en: "Breakfast" },
    items: [
      { name: { ru: "Каша пшенная с тыквой", en: "Millet porridge with pumpkin" }, details: { ru: "350 г", en: "350 g" }, price: "330 ₽" },
      { name: { ru: "Блинчики с мясом", en: "Crepes with beef" }, details: { ru: "230 г", en: "230 g" }, price: "590 ₽" },
      { name: { ru: "Блинчики с творогом", en: "Crepes with cottage cheese" }, details: { ru: "230 г", en: "230 g" }, price: "350 ₽" },
      { name: { ru: "Большой тост с авокадо и яйцом пашот", en: "Large avocado toast with poached egg" }, details: { ru: "300 г", en: "300 g" }, price: "490 ₽" },
      { name: { ru: "Французский омлет с лососем", en: "French omelette with salmon" }, details: { ru: "300 г", en: "300 g" }, price: "790 ₽" },
      { name: { ru: "Яичница шакшука", en: "Shakshuka" }, details: { ru: "250 г", en: "250 g" }, price: "480 ₽" },
      { name: { ru: "Английский завтрак", en: "English breakfast" }, details: { ru: "350 г", en: "350 g" }, price: "850 ₽" },
      { name: { ru: "Скандинавский завтрак", en: "Scandinavian breakfast" }, details: { ru: "250 г", en: "250 g" }, price: "950 ₽" },
      { name: { ru: "Средиземноморский завтрак", en: "Mediterranean breakfast" }, details: { ru: "250 г", en: "250 g" }, price: "850 ₽" },
      { name: { ru: "Творог со сливочным муссом и ягодами", en: "Farmer cheese with cream mousse and berries" }, details: { ru: "230 г", en: "230 g" }, price: "490 ₽" },
      { name: { ru: "Сырники с ягодами и сливочным кремом", en: "Syrniki with berries and cream" }, details: { ru: "235 г", en: "235 g" }, price: "590 ₽" },
      { name: { ru: "Рисовая каша на кокосовом молоке", en: "Rice porridge with coconut milk" }, details: { ru: "350 г", en: "350 g" }, price: "390 ₽" }
    ]
  },
  {
    title: { ru: "Салаты", en: "Salads" },
    items: [
      { name: { ru: "Тар-тар из говядины", en: "Beef tartare" }, details: { ru: "220 г", en: "220 g" }, price: "1190 ₽" },
      { name: { ru: "Цезарь деревенский с курицей и яйцом", en: "Rustic Caesar with chicken and egg" }, details: { ru: "250 г", en: "250 g" }, price: "690 ₽" },
      { name: { ru: "Цезарь с креветками", en: "Caesar with shrimp" }, details: { ru: "240 г", en: "240 g" }, price: "890 ₽" },
      { name: { ru: "Коул-слоу", en: "Coleslaw" }, details: { ru: "150 г", en: "150 g" }, price: "290 ₽" },
      { name: { ru: "Овощной салат", en: "Fresh vegetable salad" }, details: { ru: "200 г", en: "200 g" }, price: "480 ₽" },
      { name: { ru: "Карпаччо из говядины в соусе тонато", en: "Beef carpaccio with tonnato sauce" }, details: { ru: "100 г", en: "100 g" }, price: "690 ₽" },
      { name: { ru: "Зеленый салат", en: "Green salad" }, details: { ru: "210 г", en: "210 g" }, price: "760 ₽" },
      { name: { ru: "Салат с хрустящими баклажанами и страчателлой", en: "Crispy eggplant salad with stracciatella" }, details: { ru: "280 г", en: "280 g" }, price: "900 ₽" },
      { name: { ru: "Гриль-салат из говяжьего филе", en: "Grilled beef fillet salad" }, details: { ru: "330 г", en: "330 g" }, price: "990 ₽" }
    ]
  },
  {
    title: { ru: "Супы", en: "Soups" },
    items: [
      { name: { ru: "Том-ям", en: "Tom yum" }, details: { ru: "450/100/15 г", en: "450/100/15 g" }, price: "980 ₽" },
      { name: { ru: "Борщ с говядиной", en: "Borscht with beef" }, details: { ru: "300/20 г", en: "300/20 g" }, price: "490 ₽" },
      { name: { ru: "Суп-пюре томатный", en: "Creamy tomato soup" }, details: { ru: "300 г", en: "300 g" }, price: "590 ₽" },
      { name: { ru: "Куриный бульон с тортеллини", en: "Chicken broth with tortellini" }, details: { ru: "300 г", en: "300 g" }, price: "560 ₽" },
      { name: { ru: "Суп-пюре грибной", en: "Creamy mushroom soup" }, details: { ru: "300 г", en: "300 g" }, price: "680 ₽" },
      { name: { ru: "Солянка мясная сборная", en: "Solyanka" }, details: { ru: "300/20 г", en: "300/20 g" }, price: "690 ₽" }
    ]
  },
  {
    title: { ru: "Пицца и бургеры", en: "Pizza and burgers" },
    items: [
      { name: { ru: "Острая мясная пицца", en: "Spicy meat pizza" }, details: { ru: "550 г", en: "550 g" }, price: "890 ₽" },
      { name: { ru: "Пицца груша с горгонзолой", en: "Pear and gorgonzola pizza" }, details: { ru: "550 г", en: "550 g" }, price: "990 ₽" },
      { name: { ru: "Пицца капри", en: "Capri pizza" }, details: { ru: "550 г", en: "550 g" }, price: "690 ₽" },
      { name: { ru: "Пицца курица-барбекю", en: "BBQ chicken pizza" }, details: { ru: "550 г", en: "550 g" }, price: "690 ₽" },
      { name: { ru: "Пицца пепперони", en: "Pepperoni pizza" }, details: { ru: "500 г", en: "500 g" }, price: "690 ₽" },
      { name: { ru: "Пицца маргарита", en: "Margherita pizza" }, details: { ru: "450 г", en: "450 g" }, price: "590 ₽" },
      { name: { ru: "Пицца маргарита со страчателлой и рукколой", en: "Margherita with stracciatella and arugula" }, details: { ru: "500 г", en: "500 g" }, price: "790 ₽" },
      { name: { ru: "Пицца цезарь с курицей", en: "Chicken Caesar pizza" }, details: { ru: "600 г", en: "600 g" }, price: "790 ₽" },
      { name: { ru: "Бургер мега-чиз", en: "Mega cheese burger" }, details: { ru: "450/100/30 г", en: "450/100/30 g" }, price: "990 ₽" },
      { name: { ru: "Бургер барбекю", en: "BBQ burger" }, details: { ru: "330/100/30 г", en: "330/100/30 g" }, price: "690 ₽" },
      { name: { ru: "Чизбургер", en: "Cheeseburger" }, details: { ru: "310/100/30 г", en: "310/100/30 g" }, price: "590 ₽" },
      { name: { ru: "Бургер Биг-геймер", en: "Big Gamer burger" }, details: { ru: "450/100/30 г", en: "450/100/30 g" }, price: "990 ₽" }
    ]
  },
  {
    title: { ru: "Стритфуд и горячее", en: "Street food and mains" },
    items: [
      { name: { ru: "Кесадилья с цыпленком", en: "Chicken quesadilla" }, details: { ru: "400 г", en: "400 g" }, price: "780 ₽" },
      { name: { ru: "Кесадилья с рваной говядиной", en: "Pulled beef quesadilla" }, details: { ru: "400 г", en: "400 g" }, price: "880 ₽" },
      { name: { ru: "Буррито с цыпленком", en: "Chicken burrito" }, details: { ru: "250 г", en: "250 g" }, price: "590 ₽" },
      { name: { ru: "Буррито с реберным мясом", en: "Pulled rib burrito" }, details: { ru: "250 г", en: "250 g" }, price: "690 ₽" },
      { name: { ru: "Шаурма с реберным мясом", en: "Shawarma with rib meat" }, details: { ru: "350 г", en: "350 g" }, price: "590 ₽" },
      { name: { ru: "Шаурма с курицей", en: "Chicken shawarma" }, details: { ru: "350 г", en: "350 g" }, price: "490 ₽" },
      { name: { ru: "Клаб-сэндвич", en: "Club sandwich" }, details: { ru: "400/100/30 г", en: "400/100/30 g" }, price: "590 ₽" },
      { name: { ru: "Начос с чили кон карне и сырным соусом", en: "Nachos with chili con carne and cheese sauce" }, details: { ru: "230 г", en: "230 g" }, price: "780 ₽" },
      { name: { ru: "Наггетсы куриные", en: "Chicken nuggets" }, details: { ru: "150 г", en: "150 g" }, price: "380 ₽" },
      { name: { ru: "Картофель фри", en: "French fries" }, details: { ru: "150 г", en: "150 g" }, price: "250 ₽" },
      { name: { ru: "Сырные палочки", en: "Cheese sticks" }, details: { ru: "150 г", en: "150 g" }, price: "450 ₽" },
      { name: { ru: "Луковые кольца", en: "Onion rings" }, details: { ru: "150 г", en: "150 g" }, price: "380 ₽" },
      { name: { ru: "Куриные стрипсы", en: "Chicken strips" }, details: { ru: "150 г", en: "150 g" }, price: "390 ₽" },
      { name: { ru: "Пивное плато", en: "Beer platter" }, details: { ru: "60/100/100/100/100/30/30 г", en: "assorted platter" }, price: "1790 ₽" },
      { name: { ru: "Хлебная корзина с ароматным маслом", en: "Bread basket with flavored butter" }, details: { ru: "150/30 г", en: "150/30 g" }, price: "330 ₽" },
      { name: { ru: "Куриные крылья в соусе Jack Daniel's", en: "Chicken wings in Jack Daniel's sauce" }, details: { ru: "250 г", en: "250 g" }, price: "690 ₽" },
      { name: { ru: "Ребра свиные томленые в соусе Jack Daniel's", en: "Braised pork ribs with Jack Daniel's sauce" }, details: { ru: "450 г", en: "450 g" }, price: "1290 ₽" },
      { name: { ru: "Фиш & Чипс", en: "Fish & chips" }, details: { ru: "400 г", en: "400 g" }, price: "690 ₽" },
      { name: { ru: "Бифштекс из мраморной говядины с яйцом пашот", en: "Marble beef steak with poached egg" }, details: { ru: "280 г", en: "280 g" }, price: "980 ₽" },
      { name: { ru: "Стейк рибай", en: "Ribeye steak" }, details: { ru: "220 г", en: "220 g" }, price: "3900 ₽" },
      { name: { ru: "Стейк стриплойн", en: "Striploin steak" }, details: { ru: "220 г", en: "220 g" }, price: "2900 ₽" },
      { name: { ru: "Стейк из семги с брокколи гриль и соусом лимончелло", en: "Salmon steak with grilled broccoli and limoncello sauce" }, details: { ru: "120/150/30 г", en: "120/150/30 g" }, price: "1900 ₽" },
      { name: { ru: "Паста с мясным рагу", en: "Pasta with meat ragu" }, details: { ru: "310 г", en: "310 g" }, price: "780 ₽" },
      { name: { ru: "Паста карбонара", en: "Carbonara" }, details: { ru: "300 г", en: "300 g" }, price: "690 ₽" },
      { name: { ru: "Паста Альфредо с курицей", en: "Chicken Alfredo" }, details: { ru: "300 г", en: "300 g" }, price: "590 ₽" },
      { name: { ru: "Лингвини с креветками и соусом биск", en: "Linguine with shrimp and bisque sauce" }, details: { ru: "300 г", en: "300 g" }, price: "890 ₽" },
      { name: { ru: "Паста с лососем", en: "Salmon pasta" }, details: { ru: "300 г", en: "300 g" }, price: "1280 ₽" },
      { name: { ru: "Орзо с белыми грибами", en: "Orzo with porcini mushrooms" }, details: { ru: "300 г", en: "300 g" }, price: "790 ₽" },
      { name: { ru: "Картофельное пюре", en: "Mashed potatoes" }, details: { ru: "200 г", en: "200 g" }, price: "350 ₽" }
    ]
  },
  {
    title: { ru: "Бар и безалкогольные", en: "Bar and soft drinks" },
    items: [
      { name: { ru: "Чай", en: "Tea" }, details: { ru: "Эрл Грей, Молочный Улун, Сенча, Жасмин, Ассам, Сладкий фрукт, Гаганьинь, Габа, Шу Пуэр", en: "Earl Grey, Milk Oolong, Sencha, Jasmine, Assam, Sweet Fruit, Te Guan Yin, Gaba, Shu Pu-erh" }, price: "350–500 ₽" },
      { name: { ru: "Кофе", en: "Coffee" }, details: { ru: "Эспрессо, Доппио, Американо, Латте, Капучино, Раф, Флэт уайт, Какао", en: "Espresso, Doppio, Americano, Latte, Cappuccino, Raf, Flat white, Cocoa" }, price: "120–400 ₽" },
      { name: { ru: "Лимонады", en: "Lemonades" }, details: { ru: "Avulus tea, Маракуйя-вишня-ваниль, Клубника-каламанси-лемонграсс", en: "Avulus tea, Passionfruit-Cherry-Vanilla, Strawberry-Calamansi-Lemongrass" }, price: "400/800 ₽" },
      { name: { ru: "Свежевыжатые соки", en: "Fresh juices" }, details: { ru: "Грейпфрут, Апельсин", en: "Grapefruit, Orange" }, price: "500 ₽" },
      { name: { ru: "Энергетики", en: "Energy drinks" }, details: { ru: "Red Bull, Adrenaline Rush", en: "Red Bull, Adrenaline Rush" }, price: "400–500 ₽" },
      { name: { ru: "Пиво", en: "Beer" }, details: { ru: "Peroni, Corona Extra, Tsingtao, Guinness, Clausthaler", en: "Peroni, Corona Extra, Tsingtao, Guinness, Clausthaler" }, price: "500–800 ₽" },
      { name: { ru: "Игристое и шампанское", en: "Sparkling wine and champagne" }, details: { ru: "Valvasore Prosecco, Joseph Beck Cremant d'Alsace, Champagne Cossy Pechon", en: "Valvasore Prosecco, Joseph Beck Cremant d'Alsace, Champagne Cossy Pechon" }, price: "1000–15240 ₽" },
      { name: { ru: "Крепкие напитки", en: "Spirits" }, details: { ru: "Виски, ром, коньяк, текила, аперитивы, джин, водка, вино и настойки", en: "Whisky, rum, cognac, tequila, aperitifs, gin, vodka, wine and house infusions" }, price: "300–3500 ₽" }
    ]
  },
  {
    title: { ru: "Коктейли", en: "Cocktails" },
    items: [
      { name: { ru: "Crystal Maiden", en: "Crystal Maiden" }, details: { ru: "Джин на мармеладе, чупа-чупс, юдзу, соджу клубника, рислинг", en: "Marmalade gin, Chupa Chups, yuzu, strawberry soju, riesling" }, price: "1200 ₽" },
      { name: { ru: "Pudge", en: "Pudge" }, details: { ru: "Водка на клюкве, трипл сек, сок лайма", en: "Cranberry vodka, triple sec, lime juice" }, price: "1200 ₽" },
      { name: { ru: "Avulus", en: "Avulus" }, details: { ru: "Водка на черной смородине, соджу виноград, лемонграсс, мараскино, сухое игристое", en: "Blackcurrant vodka, grape soju, lemongrass, maraschino, brut sparkling wine" }, price: "1200 ₽" },
      { name: { ru: "Plant", en: "Plant" }, details: { ru: "Джин на кафирском лайме, каламанси, бузина, трипл сек, пена из маракуйи", en: "Kaffir lime gin, calamansi, elderflower, triple sec, passionfruit foam" }, price: "1200 ₽" },
      { name: { ru: "Give the drop", en: "Give the drop" }, details: { ru: "Джин на малине, кампари, личи, тоник", en: "Raspberry gin, Campari, lychee, tonic" }, price: "1200 ₽" },
      { name: { ru: "Phoenix", en: "Phoenix" }, details: { ru: "Водка на клубнике с лаймом, сухое игристое вино", en: "Strawberry-lime vodka, dry sparkling wine" }, price: "1200 ₽" },
      { name: { ru: "Wraith King", en: "Wraith King" }, details: { ru: "Лимончелло, ликер сауэр эпл, лимонный сок, белок", en: "Limoncello, sour apple liqueur, lemon juice, egg white" }, price: "1200 ₽" },
      { name: { ru: "Dazzle", en: "Dazzle" }, details: { ru: "Джин на барбарисках, вермут экстра драй, красный сладкий вермут, бузина", en: "Barberry gin, extra dry vermouth, sweet red vermouth, elderflower" }, price: "1200 ₽" },
      { name: { ru: "Классика: Negroni, White Russian, Aperol Spritz, Pornstar Martini, Lynchburg Lemonade, Margarita, Whiskey Sour, Clover Club, Espresso Martini, Basil Smash", en: "Classics: Negroni, White Russian, Aperol Spritz, Pornstar Martini, Lynchburg Lemonade, Margarita, Whiskey Sour, Clover Club, Espresso Martini, Basil Smash" }, price: "950 ₽" }
    ]
  }
];

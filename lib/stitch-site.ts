export type NavItem = {
  label: string;
  href: string;
  active?: boolean;
};

export const contactLinks = {
  bookPc: "#book-pc",
  reserveTable: "#reserve",
  privacy: "#",
  terms: "#",
  cookies: "#"
};

export const sharedImages = {
  logo: "/images/avulus-logo.png",
  homeWatermark: "/images/hero-main.jpg",
  arenaWatermark: "/images/cyberclub-team.jpg",
  restaurantWatermark: "/images/restaurant-room.jpg"
};

export const homePage = {
  nav: [
    { label: "ARENA", href: "/cyberclub" },
    { label: "RESTAURANT", href: "/restaurant" }
  ] satisfies NavItem[],
  sectors: [
    {
      label: "SECTOR 01",
      title: "CYBERCLUB",
      body:
        "Deploy into the high-performance arena. RTX 4090 stations, 360Hz displays, and professional ergonomics for elite combat units.",
      status: "GIGABIT UPLINK ACTIVE",
      cta: "ENTER ARENA",
      href: "/cyberclub",
      accent: "bg-[#CA98FF] text-[#46007D]",
      icon: "sensors",
      textColor: "text-primary",
      image: "/images/cyberclub-card.jpg"
    },
    {
      label: "SECTOR 02",
      title: "RESTAURANT",
      body:
        "Refuel at the tactical core. Molecular gastronomy meets cybernetic aesthetics in a high-pressure culinary environment.",
      status: "SYSTEM RECHARGE READY",
      cta: "VIEW MENU",
      href: "/restaurant",
      accent: "bg-[#FF6C8F] text-[#480019]",
      icon: "restaurant",
      textColor: "text-secondary",
      image: "/images/restaurant-card.jpg"
    }
  ],
  features: [
    {
      title: "ELITE HARDWARE",
      body:
        "Configured for maximum frames. No compromises. Custom liquid cooling loops and peripheral suites for competitive dominance.",
      accent: "border-primary"
    },
    {
      title: "PRIVATE SUITES",
      body:
        "Secure communication bunkers for team operations. Sound-isolated, dedicated uplink, and integrated catering service.",
      accent: "border-secondary"
    },
    {
      title: "CYBER LOUNGE",
      body:
        "Calibrate your neural net with handcrafted stimulants and neon-infused cocktails in a low-light sanctuary.",
      accent: "border-tertiary"
    }
  ]
};

export const cyberclubPage = {
  nav: [
    { label: "ARENA", href: "/cyberclub", active: true },
    { label: "RESTAURANT", href: "/restaurant" }
  ] satisfies NavItem[],
  specs: [
    { label: "Processor", value: "i9-14900K" },
    { label: "Graphics", value: "RTX 4090" },
    { label: "Refresh Rate", value: "360HZ" },
    { label: "Latency", value: "0.5MS" }
  ],
  zones: [
    {
      level: "Level 1 // Solo",
      title: "TACTICAL NEST",
      body: "Dedicated solo station with prioritized bandwidth and sound-isolating hardware.",
      bullets: ["PRIVATE ACCESS TUNNEL", "ERGONOMIC XL SEATING", "PERIPHERAL CUSTOMIZATION"],
      cta: "RESERVE SLOT",
      accent: "text-secondary border-primary text-primary hover:bg-primary hover:text-on-primary",
      image: "/images/cyberclub-card.jpg"
    },
    {
      level: "Level 2 // Duo",
      title: "STRIKE TEAM",
      body: "Paired stations engineered for seamless coordination and shared tactical displays.",
      bullets: ["DUAL-SYNC COMM-LINK", "SHARED COOLING GRID", "COORDINATED LIGHTING"],
      cta: "RESERVE SLOT",
      accent: "text-primary bg-primary text-on-primary hover:bg-primary-dim",
      image: "/images/cyberclub-vip.jpg"
    },
    {
      level: "Level 3 // Bootcamp",
      title: "WAR ROOM",
      body: "Full tactical squad command floor for training blocks, scrims, and high-pressure team prep.",
      bullets: ["5X PRO-STATION ARRAY", "REPLAY ANALYSIS HUD", "ANALYST STATION INCL."],
      cta: "RESERVE SLOT",
      accent: "text-tertiary border-tertiary text-tertiary hover:bg-tertiary hover:text-[#0d6100]",
      image: "/images/cyberclub-team.jpg"
    }
  ],
  hardwarePanels: [
    {
      title: "DISPLAY PRECISION",
      body:
        "Every station is equipped with 360Hz refresh rate panels, ensuring that every frame of data is delivered with zero ghosting or delay.",
      accent: "border-primary text-primary"
    },
    {
      title: "PROCESSING POWER",
      body:
        "Powered by i9-14900K and RTX 4090 architecture, the Arena handles 4K competitive rendering without breaking a sweat.",
      accent: "border-secondary text-secondary"
    },
    {
      title: "NEURAL CONNECTIVITY",
      body:
        "Fiber-optic backbone with <1ms jitter. Our local network is optimized for zero-packet-loss environments.",
      accent: "border-tertiary text-tertiary"
    }
  ],
  hardwareImage: "/images/cyberclub-team.jpg"
};

export const restaurantPage = {
  nav: [
    { label: "ARENA", href: "/cyberclub" },
    { label: "RESTAURANT", href: "/restaurant", active: true }
  ] satisfies NavItem[],
  heroImage: "/images/restaurant-room.jpg",
  dishes: [
    {
      label: "DISH // 01",
      title: "VOID-SEA TARTARE",
      body:
        "Cured atlantic salmon, charcoal-infused oil, wasabi foam, compressed cucumber crystals.",
      image: "/images/dish-ramen.jpg"
    },
    {
      label: "ELIXIR // 09",
      title: "NEURAL OVERLOAD",
      body: "Gin, elderflower, electric bitters, bioluminescent citrus.",
      image: "/images/dish-cocktail.jpg"
    },
    {
      title: "CORE BYPASS",
      image: "/images/dish-burger.jpg"
    },
    {
      title: "GRID-SYNC SASHIMI",
      image: "/images/dish-snack.jpg"
    },
    {
      title: "OPERATIVE RATION X",
      image: "/images/cyberclub-vip.jpg"
    }
  ],
  atmosphereImage: "/images/restaurant-card.jpg",
  atmosphereBullets: [
    {
      icon: "local_police",
      title: "BIOMETRIC ACCESS",
      body:
        "Controlled entry sequence with retinal-grade check-in moments that reinforce the secure, premium mood of the Stitch screen."
    },
    {
      icon: "privacy_tip",
      title: "ABSOLUTE DISCRETION",
      body:
        "Acoustic dampening fields and private pod logic support both elevated dining and confidential tactical meetings."
    },
    {
      icon: "shield_with_heart",
      title: "PROTOCOL ZERO",
      body:
        "High-priority table flow, private room handling, and clean reservation routing for VIP guests."
    }
  ]
};

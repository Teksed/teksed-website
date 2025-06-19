export const NavbarFallBackData = {
  _id: "fallback_1",
  logo: {
    asset: { url: "assets/tek.png" },
    alt: "TeKSED Inc. Logo",
  },
  navigationItems: [
    { label: "Home", route: "/", _key: "1" },
    {
      label: "About",
      route: "/about-us",
      _key: "2",
      subItems: [
        { label: "Our Story", route: "/about/story", _key: "2-1" },
        { label: "Team", route: "/about/team", _key: "2-2" },
      ],
    },
    {
      label: "Solutions",
      _key: "3",
      subItems: [
        { label: "Software Development", route: "/solutions/software", _key: "3-1" },
        { label: "AI Integration", route: "/solutions/ai", _key: "3-2" },
        { label: "Digital Transformation", route: "/solutions/digital", _key: "3-3" },
      ],
    },
    { label: "Contact", route: "/contact", _key: "4" },
  ],
  ctaButton: {
    label: "Get Started",
    action: "/get-started",
  },
};

export const FooterFallBackData = {
  _id: "fallback_1",
  title: "Footer data",
  footerColumns: [],
  companyInfo: {
    socialLinks: [
      { platform: "LinkedIn", url: "#", _key: "linkedin" },
      { platform: "Instagram", url: "#", _key: "instagram" },
      { platform: "Facebook", url: "#", _key: "facebook" },
      { platform: "WhatsApp", url: "#", _key: "whatsapp" },
    ],
  },
  //   legalLinks: [],
  companyName: "TekSed Inc",
  //   copyrightText: "",
  sitemap: [
    {
      title: "Products",
      links: ["Accounts", "Batch payments", "API integrations", "Currency exchange & FX"],
    },
    {
      title: "Industries",
      links: [
        "Ecommerce",
        "Construction",
        "Import & export",
        "Corporate & Fund Administrators",
        "Travel",
        "IT and SaaS",
      ],
    },
    {
      title: "Help & Support",
      links: [
        "Pricing plans",
        "Fees",
        "Help centre",
        "Payment guides",
        "Fraud & Security",
        "Service status",
      ],
    },
    {
      title: "Refer a client",
      links: ["Invite a client", "Become an introducer"],
    },
    {
      title: "About Us",
      links: ["News and stories", "Careers", "Contact us"],
    },
    {
      title: "HeadQuarters Address",
      links: [
        "45 Folgate Street, London, E1 6GL, United Kingdom",
        "info@yourorganization.com",
        "+44 (0) 203 807 9645",
      ],
    },
  ],

  appStoreLinks: [
    { name: "App Store", url: "#", image: "https://via.placeholder.com/120x40?text=App+Store" },
    {
      name: "Google Play",
      url: "#",
      image: "https://via.placeholder.com/120x40?text=Google+Play",
    },
  ],
  contactInfo: {},
  legalLinks: [
    {
      _key: "1",
      label: "Privacy policy",
      url: "pp",
    },
  ],
};

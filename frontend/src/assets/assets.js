import logo from './Primary-Logo-01.png';

export const img = {
  logo,
};

export const NAV_ITEMS = [
  {
    label: "About",
    bgColor: "#0D0716",
    textColor: "#fff",
    links: [
      { label: "Company", href: "/company", ariaLabel: "About Company" },
      { label: "Careers", href: "/careers", ariaLabel: "About Careers" },
    ],
  },
  {
    label: "Projects",
    bgColor: "#170D27",
    textColor: "#fff",
    links: [
      { label: "Featured", href: "/featured", ariaLabel: "Featured Projects" },
      { label: "Case Studies", href: "/case-studies", ariaLabel: "Project Case Studies" },
    ],
  },
  {
    label: "Contact",
    bgColor: "#271E37",
    textColor: "#fff",
    links: [
      { label: "Email", href: "mailto:hello@company.com", ariaLabel: "Email us" },
      { label: "Twitter", href: "https://twitter.com", ariaLabel: "Twitter" },
      { label: "LinkedIn", href: "https://linkedin.com", ariaLabel: "LinkedIn" },
    ],
  },
];

export const NAV_CONFIG = {
  baseColor: "#f4ede9",
  menuColor: "#211f1e",
  buttonBgColor: "#d03d2d",
  buttonTextColor: "#f4ede9",
  ease: "power3.out",
};
export type FooterLink = {
  href: string;
  label: string;
  external?: boolean;
};

export const footerPages: FooterLink[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/activity", label: "Activity" },
  { href: "/travel", label: "Travel" },
  { href: "/music", label: "Music" },
  { href: "/timeline", label: "Timeline" },
];

export const footerSocials: FooterLink[] = [
  { href: "https://www.linkedin.com/in/vinaygov", label: "LinkedIn", external: true },
  { href: "mailto:vinaysgovindaraju@gmail.com", label: "Email", external: true },
  { href: "https://www.instagram.com/vinaynay9", label: "Instagram", external: true },
];

export const footerProjects: FooterLink[] = [
  { href: "/projects#this-website", label: "My Story" },
  { href: "/projects#read-the-field", label: "ReadTheField" },
  { href: "/projects#anchor", label: "Anchor" },
];


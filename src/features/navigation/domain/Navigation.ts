export interface NavItemData {
  id: string;
  label: string;
  menuLabel: string;
  href: string;
}

/**
 * `label` is used by the NavWidget (title case, as in the Flutter nav bar).
 * `menuLabel` is used by the hero DesktopMenu (all caps, as in the Flutter
 * splash menus: WORKS / CRAFT / ABOUT / CONTACT).
 */
export const navItems: NavItemData[] = [
  { id: "work", label: "Work", menuLabel: "WORKS", href: "/" },
  { id: "crafts", label: "Crafts", menuLabel: "CRAFT", href: "/crafts" },
  { id: "about", label: "About me", menuLabel: "ABOUT", href: "/about-me" },
  { id: "contact", label: "Contact", menuLabel: "CONTACT", href: "/contact" },
];

/**
 * Navigation item interface for menu links
 */
export interface NavItem {
  name: string;
  href: string;
  current: boolean;
}

/**
 * Main navigation items for the site
 */
export const NAV_ITEMS: NavItem[] = [
  { name: 'Home', href: '/', current: true },
  { name: 'Services', href: '/services', current: false },
  { name: 'About', href: '/about', current: false },
  { name: 'Contact Us', href: '/contact', current: false },
]; 
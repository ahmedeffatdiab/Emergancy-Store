export const navLinks :TypeNavigationItem[] = [
  { title: 'Home', link: '/' },
  { title: 'About', link: '/about' },
  { title: 'Services', link: '/services' },
  { title: 'Brands', link: '/brands' },
  { title: 'Dashboard', link: '/dashboard' },

]



export type TypeNavigationItem = {
    title: string;
    link: string;
};
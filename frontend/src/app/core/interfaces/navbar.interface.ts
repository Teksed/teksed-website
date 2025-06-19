// navbar.interface.ts
export interface NavbarData {
  _id: string;
  title?: string;
  logo: {
    asset: {
      url: string;
    };
    alt: string;
  };
  navigationItems: NavigationItem[];
  ctaButton: {
    label: string;
    action: string;
  };
}

export interface NavigationItem {
  label: string;
  hasSubItems?: boolean;
  route?: string; // Optional when hasSubItems is true
  subItems?: SubMenuItem[];
  _key: string;
}

export interface SubMenuItem {
  label: string;
  route: string;
  _key: string;
}

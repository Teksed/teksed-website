export interface SocialLink {
  platform: string;
  url: string;
  _key: string;
}

export interface FooterLink {
  label: string;
  url: string;
  isExternal?: boolean;
  _key: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
  _key: string;
}

export interface ContactInfo {
  address?: string;
  phone?: string;
  email?: string;
}

export interface LegalLink {
  label: string;
  url: string;
  _key: string;
}

export interface FooterData {
  _id: string;
  title: string;
  companyInfo: {
    logo?: {
      asset: {
        url: string;
      };
      alt?: string;
    };
    description?: string;
    socialLinks: SocialLink[];
  };
  footerColumns: FooterColumn[];
  contactInfo: ContactInfo;
  legalLinks: LegalLink[];
  copyrightText?: string;
  companyName: string;
}

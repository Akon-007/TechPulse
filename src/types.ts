export interface Post {
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  avatar: string;
  image: string;
}

export interface FooterLink {
  label: string;
  href: string;
  badge?: string;
  isExternal?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

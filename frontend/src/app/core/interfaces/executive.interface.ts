export interface Executive {
  name: string;
  position: string;
  bio: string;
  image?: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
    instagram?: string;
    github?: string;
  };
}

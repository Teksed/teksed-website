export interface Product {
  name: string;
  description: string;
  features: string[];
  benefits: string[];
  targetAudience: string[];
  pricing: {
    model: string;
    details: string;
  };
  status: "live" | "beta" | "coming-soon";
  demoUrl?: string;
  screenshots?: string[];
}

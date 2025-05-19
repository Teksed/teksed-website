import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "teksed-footer",
  imports: [CommonModule],
  templateUrl: "./footer.component.html",
  styleUrl: "./footer.component.css",
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  sitemap = [
    {
      title: "Products",
      links: ["Accounts", "Batch payments", "API integrations", "Currency exchange & FX"],
    },
    {
      title: "Industries",
      links: [
        "Ecommerce",
        "Construction",
        "Import & export",
        "Corporate & Fund Administrators",
        "Travel",
        "IT and SaaS",
      ],
    },
    {
      title: "Help & Support",
      links: [
        "Pricing plans",
        "Fees",
        "Help centre",
        "Payment guides",
        "Fraud & Security",
        "Service status",
      ],
    },
    {
      title: "Refer a client",
      links: ["Invite a client", "Become an introducer"],
    },
    {
      title: "About Us",
      links: ["News and stories", "Careers", "Contact us"],
    },
    {
      title: "HeadQuarters Address",
      links: ["45 Folgate Street, London, E1 6GL, United Kingdom", "info@yourorganization.com", "+44 (0) 203 807 9645"],
    },
  ];
  // contactInfo = {
  //   address: "45 Folgate Street, London, E1 6GL, United Kingdom",
  //   email: "info@yourorganization.com",
  //   phone: "+44 (0) 203 807 9645",
  // };
  socialLinks = [
    { name: "LinkedIn", url: "#", icon: "linkedin" },
    { name: "Instagram", url: "#", icon: "instagram" },
    { name: "Facebook", url: "#", icon: "facebook" },
    { name: "WhatsApp", url: "#", icon: "whatsapp" },
  ];
  appStoreLinks = [
    { name: "App Store", url: "#", image: "https://via.placeholder.com/120x40?text=App+Store" },
    { name: "Google Play", url: "#", image: "https://via.placeholder.com/120x40?text=Google+Play" },
  ];
  legalLinks = [
    "Terms and conditions",
    "Vulnerable customer statement",
    "Consumer duty",
    "Privacy policy",
    "Cookies",
  ];
}

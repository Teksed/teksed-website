import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Product } from "@app/core/interfaces/products.interface";

@Component({
  selector: "teksed-products",
  imports: [],
  templateUrl: "./products.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  products: Product[] = [
    {
      name: "E-Voting System",
      description:
        "Secure, transparent, and efficient digital voting platform designed for educational institutions, organizations, and democratic processes.",
      features: [
        "Blockchain-based security",
        "Real-time vote counting",
        "Multi-device accessibility",
        "Audit trail and transparency",
        "Customizable ballot designs",
        "Voter authentication system",
        "Results analytics dashboard",
        "Mobile-responsive interface",
      ],
      benefits: [
        "Eliminate paper-based voting",
        "Reduce election costs by 70%",
        "Instant, accurate results",
        "Enhanced security and transparency",
        "Increased voter participation",
        "Environmental sustainability",
      ],
      targetAudience: [
        "Educational Institutions",
        "Student Unions",
        "Professional Organizations",
        "Corporate Boards",
        "Community Groups",
      ],
      pricing: {
        model: "Per Election",
        details: "Starting from $500 per election with unlimited voters",
      },
      status: "live",
      demoUrl: "",
    },
    {
      name: "SMS Portal",
      description:
        "Comprehensive SMS communication platform for bulk messaging, notifications, and automated communication workflows.",
      features: [
        "Bulk SMS broadcasting",
        "Automated message scheduling",
        "Two-way SMS communication",
        "Contact management system",
        "Message templates library",
        "Delivery reports and analytics",
        "API integration capabilities",
        "Multi-language support",
      ],
      benefits: [
        "Reach thousands instantly",
        "Improve communication efficiency",
        "Reduce communication costs",
        "Automated workflow management",
        "Enhanced customer engagement",
        "Real-time delivery tracking",
      ],
      targetAudience: [
        "Educational Institutions",
        "Healthcare Providers",
        "Financial Services",
        "Retail Businesses",
        "Government Agencies",
      ],
      pricing: {
        model: "Pay-as-you-go",
        details: "Starting from $0.05 per SMS with volume discounts",
      },
      status: "live",
      demoUrl: "",
    },
  ];

  getStatusColor(status: string): string {
    switch (status) {
      case "live":
        return "bg-green-100 text-green-800";
      case "beta":
        return "bg-yellow-100 text-yellow-800";
      case "coming-soon":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case "live":
        return "Live";
      case "beta":
        return "Beta";
      case "coming-soon":
        return "Coming Soon";
      default:
        return "Unknown";
    }
  }

  requestDemo(product: Product) {
    if (product.demoUrl) {
      window.open(product.demoUrl, "_blank");
    } else {
      // Handle demo request for products without live demos
      console.log(`Demo requested for ${product.name}`);
    }
  }

  contactSales(productName: string) {
    // Handle contact sales action
    console.log(`Sales contact requested for ${productName}`);
  }
}

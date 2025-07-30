import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Service } from "@app/core/interfaces/service.interface";

@Component({
  selector: "teksed-services",
  imports: [],
  templateUrl: "./services.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent {
  protected services: Service[] = [
    {
      title: "Software Development",
      description:
        "Custom software solutions built to meet your specific business requirements and drive operational efficiency.",
      features: [
        "Custom Web Applications",
        "Enterprise Software Solutions",
        "API Development & Integration",
        "Database Design & Management",
        "Legacy System Modernization",
      ],
      technologies: [
        "Java",
        "PHP",
        "JavaScript / TypeScript",
        "Angular",
        "Node.js",
        "React",
        "NextJs",
        "NestJs",
        "PostgreSQL",
        "MongoDB",
        "AWS",
      ],
      icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
      benefits: [
        "Increased operational efficiency",
        "Reduced manual processes",
        "Scalable architecture",
        "Enhanced data security",
      ],
    },
    {
      title: "Mobile App Development",
      description:
        "Native and cross-platform mobile applications that provide seamless user experiences across all devices.",
      features: [
        "iOS & Android Development",
        "Cross-Platform Solutions",
        "Mobile UI/UX Design",
        "App Store Optimization",
        "Mobile Backend Services",
      ],
      technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "GraphQL"],
      icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
      benefits: [
        "Reach mobile-first users",
        "Improved customer engagement",
        "Real-time notifications",
        "Offline functionality",
      ],
    },
    {
      title: "Network Engineering",
      description:
        "Comprehensive network infrastructure design, implementation, and management for reliable connectivity.",
      features: [
        "Network Architecture Design",
        "Infrastructure Setup",
        "Security Implementation",
        "Performance Monitoring",
        "Network Troubleshooting",
      ],
      technologies: ["Cisco", "Juniper", "Fortinet", "VMware", "Linux", "Windows Server"],
      icon: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0",
      benefits: [
        "Reliable network connectivity",
        "Enhanced security protocols",
        "Optimized performance",
        "24/7 monitoring support",
      ],
    },
    {
      title: "DevOps Operations",
      description:
        "Streamline your development and deployment processes with modern DevOps practices and automation.",
      features: [
        "CI/CD Pipeline Setup",
        "Infrastructure as Code",
        "Container Orchestration",
        "Monitoring & Logging",
        "Automated Testing",
      ],
      technologies: ["Docker", "Kubernetes", "Jenkins", "Terraform", "Prometheus", "ELK Stack"],
      icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
      benefits: [
        "Faster deployment cycles",
        "Improved system reliability",
        "Automated scaling",
        "Reduced operational costs",
      ],
    },
  ];

  processSteps = [
    {
      step: "01",
      title: "Discovery & Planning",
      description: "We analyze your requirements and create a comprehensive project roadmap.",
    },
    {
      step: "02",
      title: "Design & Architecture",
      description: "Our team designs the optimal solution architecture for your needs.",
    },
    {
      step: "03",
      title: "Development & Testing",
      description: "We build and rigorously test your solution using industry best practices.",
    },
    {
      step: "04",
      title: "Deployment & Support",
      description: "We deploy your solution and provide ongoing maintenance and support.",
    },
  ];
}

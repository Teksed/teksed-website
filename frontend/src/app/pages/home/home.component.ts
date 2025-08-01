import { ChangeDetectionStrategy, Component, effect, signal } from "@angular/core";
import { trigger, transition, style, animate, query, stagger } from "@angular/animations";
import { CommonModule } from "@angular/common";
import { FormsModule, NgForm } from "@angular/forms";
import {
  NotificationComponent,
  NotificationData,
} from "@app/shared/notification/notification.component";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";

interface Service {
  title: string;
  description: string;
  icon: string;
  features: string[];
  color: string;
}

interface Testimonial {
  name: string;
  position: string;
  company: string;
  content: string;
  image: string;
  rating: number;
}

interface Stat {
  number: string;
  label: string;
  icon: string;
  description: string;
}

@Component({
  selector: "teksed-home",
  imports: [CommonModule, FormsModule, NotificationComponent],
  templateUrl: "./home.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger("fadeInUp", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(30px)" }),
        animate("600ms ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
    ]),
    trigger("staggerAnimation", [
      transition("* => *", [
        query(
          ":enter",
          [
            style({ opacity: 0, transform: "translateY(30px)" }),
            stagger(100, [
              animate("500ms ease-out", style({ opacity: 1, transform: "translateY(0)" })),
            ]),
          ],
          { optional: true },
        ),
      ]),
    ]),
    trigger("slideInLeft", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateX(-50px)" }),
        animate("700ms ease-out", style({ opacity: 1, transform: "translateX(0)" })),
      ]),
    ]),
    trigger("slideInRight", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateX(50px)" }),
        animate("700ms ease-out", style({ opacity: 1, transform: "translateX(0)" })),
      ]),
    ]),
    trigger("scaleIn", [
      transition(":enter", [
        style({ opacity: 0, transform: "scale(0.8)" }),
        animate("600ms ease-out", style({ opacity: 1, transform: "scale(1)" })),
      ]),
    ]),
  ],
})
export class HomeComponent {
  protected notification: NotificationData | null = null;
  protected currentTestimonial = signal(0);
  private testimonialInterval?: number;

  constructor(private readonly router: Router) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      window.scrollTo(0, 0);
    });

    effect(() => {
      this.startTestimonialAutoPlay();
    });
  }

  ngOnInit() {
    this.startTestimonialAutoPlay();
  }

  ngOnDestroy() {
    this.stopTestimonialAutoPlay();
  }

  protected navigateToProducts() {
    this.router.navigate(["services"]);
  }

  protected navigateToAboutUs() {
    this.router.navigate(["about-us"]);
  }

  startTestimonialAutoPlay() {
    this.testimonialInterval = window.setInterval(() => {
      this.nextTestimonial();
    }, 5000);
  }

  stopTestimonialAutoPlay() {
    if (this.testimonialInterval) {
      clearInterval(this.testimonialInterval);
    }
  }

  nextTestimonial() {
    this.currentTestimonial.update((current) =>
      current >= this.testimonials.length - 1 ? 0 : current + 1,
    );
  }

  goToTestimonial(index: number) {
    this.currentTestimonial.set(index);
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  async onNewsletterSubmit(form: NgForm) {
    const email = form.value.email;

    // Simulate loading delay
    // await new Promise((resolve) => setTimeout(resolve, 1500));

    // Show success notification
    this.notification = {
      success: true,
      message: `Thanks for subscribing, ${email}! 🎉`,
    };

    // Reset form
    form.reset();
  }

  handleNotificationClosed() {
    this.notification = null;
  }

  services: Service[] = [
    {
      title: "Custom Software Development",
      description:
        "Tailored solutions built with cutting-edge technologies to meet your specific business requirements and drive digital transformation.",
      icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
      features: ["Web Applications", "Mobile Apps", "Enterprise Systems", "API Development"],
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "AI & Machine Learning",
      description:
        "Intelligent systems that learn, adapt, and optimize your operations through advanced artificial intelligence and data analytics.",
      icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
      features: [
        "Predictive Analytics",
        "Automation",
        "Natural Language Processing",
        "Computer Vision",
      ],
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Digital Transformation",
      description:
        "Comprehensive modernization of your business processes, systems, and culture to thrive in the digital age.",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      features: [
        "Process Optimization",
        "Cloud Migration",
        "System Integration",
        "Change Management",
      ],
      color: "from-green-500 to-green-600",
    },
    {
      title: "Cybersecurity Solutions",
      description:
        "Robust security frameworks to protect your digital assets and ensure compliance with industry standards.",
      icon: "M9 12l2 2 4-4m5.25-4.5L21 12l-1.5 1.5M4.5 19.5L3 21l1.5-1.5M3 21l18-18",
      features: ["Security Audits", "Threat Detection", "Data Protection", "Compliance Management"],
      color: "from-red-500 to-red-600",
    },
    {
      title: "Cloud Infrastructure",
      description:
        "Scalable, secure, and cost-effective cloud solutions to power your business operations and growth.",
      icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
      features: ["Cloud Architecture", "DevOps", "Infrastructure Management", "Disaster Recovery"],
      color: "from-indigo-500 to-indigo-600",
    },
    {
      title: "Data Analytics",
      description:
        "Transform raw data into actionable insights that drive informed decision-making and business growth.",
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      features: [
        "Business Intelligence",
        "Data Visualization",
        "Reporting Systems",
        "Real-time Analytics",
      ],
      color: "from-yellow-500 to-yellow-600",
    },
  ];

  testimonials: Testimonial[] = [
    {
      name: "Dr. Sarah Mensah",
      position: "Director of Innovation",
      company: "Ghana Health Service",
      content:
        "TeKSED transformed our patient management system, improving efficiency by 300% and enhancing care delivery across our network of hospitals.",
      image:
        "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      rating: 5,
    },
    {
      name: "Michael Osei",
      position: "CTO",
      company: "Osei Financial Group",
      content:
        "Their AI-powered fraud detection system has saved us millions while providing seamless customer experiences. Truly exceptional work.",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      rating: 5,
    },
    {
      name: "Prof. Akosua Frimpong",
      position: "Vice Chancellor",
      company: "University of Cape Coast",
      content:
        "The digital transformation of our campus operations has been remarkable. TeKSED delivered beyond our expectations with professionalism and innovation.",
      image:
        "https://images.pexels.com/photos/3760790/pexels-photo-3760790.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      rating: 5,
    },
  ];

  stats: Stat[] = [
    {
      number: "5+",
      label: "Projects Delivered",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      description: "Successfully completed projects across various industries",
    },
    {
      number: "98%",
      label: "Client Satisfaction",
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      description: "Consistently exceeding client expectations and building lasting relationships",
    },
    {
      number: "24/7",
      label: "Support Available",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      description: "Round-the-clock technical support for all our solutions",
    },
    {
      number: "5+",
      label: "Years Experience",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      description: "Combined decades of expertise in cutting-edge technology",
    },
  ];
}

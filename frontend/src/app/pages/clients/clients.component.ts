import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Client } from "@app/core/interfaces/clients.interface";
import { filter } from "rxjs";

@Component({
  selector: "teksed-clients",
  imports: [],
  templateUrl: "./clients.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsComponent {
  constructor(private readonly router: Router) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      window.scrollTo(0, 0);
    });
  }
  protected navigateToProducts() {
    this.router.navigate(["products"]);
  }

  protected navigateToAboutUs() {
    this.router.navigate(["about-us"]);
  }
  protected clients: Client[] = [
    {
      name: "Kokofu Nursing Training College",
      description:
        "Leading nursing education institution committed to training the next generation of healthcare professionals in Ghana.",
      industry: "Healthcare Education",
      services: ["Student Management System", "Digital Learning Platform", "Administrative Portal"],
      testimonial:
        "TeKSED transformed our administrative processes and improved our student management capabilities significantly.",
      testimonialAuthor: "Dr. Sarah Mensah",
      testimonialRole: "Principal",
    },
    {
      name: "Tarkwa Nursing Training College",
      description:
        "Prestigious nursing college focused on excellence in healthcare education and professional development.",
      industry: "Healthcare Education",
      services: ["E-Learning Management System", "Student Portal", "Faculty Management"],
      testimonial:
        "The digital solutions provided by TeKSED have modernized our teaching methods and enhanced student engagement.",
      testimonialAuthor: "Prof. Kwame Asante",
      testimonialRole: "Academic Director",
    },
    {
      name: "Uthmass Senior High School",
      description:
        "Progressive secondary education institution dedicated to academic excellence and holistic student development.",
      industry: "Secondary Education",
      services: [
        "School Management System",
        "Parent-Teacher Portal",
        "Digital Assessment Platform",
      ],
      testimonial:
        "TeKSED's solutions have streamlined our operations and improved communication between teachers, students, and parents.",
      testimonialAuthor: "Mr. Abdul Rahman",
      testimonialRole: "Headmaster",
    },
  ];

  industries = [
    {
      name: "Healthcare Education",
      count: 2,
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      name: "Secondary Education",
      count: 1,
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    },
  ];

  stats = [
    { number: "3+", label: "Trusted Clients" },
    { number: "100%", label: "Client Satisfaction" },
    { number: "5+", label: "Projects Delivered" },
    { number: "2+", label: "Years Partnership" },
  ];
}

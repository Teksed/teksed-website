import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
interface AshbyJob {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

@Component({
  selector: "teksed-careers",
  imports: [],
  templateUrl: "./careers.component.html",
})
export class CareersComponent {
  jobs: AshbyJob[] = [];
  loading = true;
  error = false;

  //TODO: Mock data for demonstration (replace with actual Ashby API integration)
  mockJobs: AshbyJob[] = [
    // {
    //   id: "1",
    //   title: "Senior Software Developer",
    //   department: "Engineering",
    //   location: "Accra, Ghana",
    //   employmentType: "Full-time",
    //   description:
    //     "Join our engineering team to build cutting-edge solutions that empower African institutions.",
    //   requirements: [
    //     "5+ years of software development experience",
    //     "Proficiency in Angular, Node.js, and cloud technologies",
    //     "Experience with agile development methodologies",
    //     "Strong problem-solving and communication skills",
    //   ],
    //   benefits: [
    //     "Competitive salary and equity package",
    //     "Health insurance coverage",
    //     "Professional development opportunities",
    //     "Flexible working arrangements",
    //   ],
    // },
    // {
    //   id: "2",
    //   title: "Mobile App Developer",
    //   department: "Engineering",
    //   location: "Remote",
    //   employmentType: "Full-time",
    //   description:
    //     "Build innovative mobile applications that transform how institutions operate across Africa.",
    //   requirements: [
    //     "3+ years of mobile development experience",
    //     "Expertise in React Native or Flutter",
    //     "Experience with mobile app deployment",
    //     "Understanding of mobile UI/UX principles",
    //   ],
    //   benefits: [
    //     "Remote-first culture",
    //     "Learning and development budget",
    //     "Health and wellness benefits",
    //     "Stock options",
    //   ],
    // },
    // {
    //   id: "3",
    //   title: "DevOps Engineer",
    //   department: "Infrastructure",
    //   location: "Accra, Ghana",
    //   employmentType: "Full-time",
    //   description: "Scale our infrastructure to support growing demand across African markets.",
    //   requirements: [
    //     "4+ years of DevOps experience",
    //     "Expertise in AWS, Docker, and Kubernetes",
    //     "Experience with CI/CD pipelines",
    //     "Strong automation and scripting skills",
    //   ],
    //   benefits: [
    //     "Cutting-edge technology stack",
    //     "Conference and training opportunities",
    //     "Comprehensive benefits package",
    //     "Career growth opportunities",
    //   ],
    // },
  ];

  constructor(private readonly http: HttpClient) {}

  ngOnInit() {
    this.loadJobs();
  }

  loadJobs() {
    // In a real implementation, you would call the Ashby API here
    // Example: this.http.get<AshbyJob[]>('https://api.ashbyhq.com/jobs').subscribe(...)

    // For now, using mock data
    setTimeout(() => {
      this.jobs = this.mockJobs;
      this.loading = false;
    }, 1000);
  }

  applyForJob(jobId: string) {
    // Redirect to Ashby application form
    window.open(`https://jobs.ashbyhq.com/teksed/${jobId}`, "_blank");
  }
}

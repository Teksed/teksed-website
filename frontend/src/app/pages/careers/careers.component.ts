import { animate, style, transition, trigger } from "@angular/animations";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
interface Job {
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
  imports: [FormsModule, CommonModule],
  templateUrl: "./careers.component.html",
  animations: [
    trigger("fadeInUp", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(30px)" }),
        animate("600ms ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
    ]),
  ],
})
export class CareersComponent {
  jobs: Job[] = [];
  loading = true;
  error = false;

  // Application modal state
  showApplicationModal = false;
  selectedJob: Job | null = null;

  // Application form data
  applicationForm = {
    name: "",
    email: "",
    phone: "",
    linkedIn: "",
    coverLetter: "",
    resume: null as File | null,
  };

  isSubmitting = false;
  submitMessage = "";

  constructor(private readonly http: HttpClient) {}

  ngOnInit() {
    this.loadJobs();
  }

  loadJobs() {
    this.http.get<Job[]>("https://teksedinc.com/api/get-jobs.php").subscribe({
      next: (jobs) => {
        this.jobs = jobs;
        this.loading = false;
      },
      error: (error) => {
        console.error("Error loading jobs:", error);
        this.error = true;
        this.loading = false;
      },
    });
  }

  applyForJob(jobId: string) {
    this.selectedJob = this.jobs.find((job) => job.id === jobId) || null;
    this.showApplicationModal = true;
    this.submitMessage = "";
    // Reset form
    this.applicationForm = {
      name: "",
      email: "",
      phone: "",
      linkedIn: "",
      coverLetter: "",
      resume: null,
    };
  }

  closeModal() {
    this.showApplicationModal = false;
    this.selectedJob = null;
    this.submitMessage = "";
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        this.submitMessage = "Please upload only PDF or DOC/DOCX files";
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.submitMessage = "File size must be less than 5MB";
        return;
      }

      this.applicationForm.resume = file;
      this.submitMessage = "";
    }
  }

  submitApplication(event: Event) {
    event.preventDefault();

    if (!this.applicationForm.resume) {
      this.submitMessage = "Please upload your resume";
      return;
    }

    this.isSubmitting = true;
    this.submitMessage = "";

    // Create FormData for file upload
    const formData = new FormData();
    formData.append("name", this.applicationForm.name);
    formData.append("email", this.applicationForm.email);
    formData.append("phone", this.applicationForm.phone);
    formData.append("linkedIn", this.applicationForm.linkedIn);
    formData.append("coverLetter", this.applicationForm.coverLetter);
    formData.append("jobTitle", this.selectedJob?.title || "");
    formData.append("jobId", this.selectedJob?.id || "");
    formData.append("resume", this.applicationForm.resume);

    this.http.post("https://teksedinc.com/api/apply-job.php", formData).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.submitMessage = "Application submitted successfully! We'll be in touch soon.";
          setTimeout(() => {
            this.closeModal();
          }, 3000);
        } else {
          this.submitMessage =
            response.message || "Failed to submit application. Please try again.";
        }
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error("Error:", error);
        this.submitMessage = "An error occurred. Please try again.";
        this.isSubmitting = false;
      },
    });
  }

  sendResume() {
    window.location.href = "mailto:info@teksedinc.com?subject=General Application - TeKSED Careers";
  }
}

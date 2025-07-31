import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  timestamp?: Date;
}

export interface NewsletterFormData {
  email: string;
  timestamp?: Date;
}

export interface FormSubmissionResult {
  success: boolean;
  message: string;
  data?: any;
}

@Injectable({
  providedIn: "root",
})
export class FormSubmissionService {
  private readonly submissionStatus = new BehaviorSubject<FormSubmissionResult | null>(null);
  public submissionStatus$ = this.submissionStatus.asObservable();
  constructor() {}

  async submitToFormspree(
    formData: ContactFormData,
    formspreeId: string,
  ): Promise<FormSubmissionResult> {
    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = {
          success: true,
          message: "Thank you for your message! We'll get back to you soon.",
        };
        this.submissionStatus.next(result);
        return result;
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      let errorMessage = "Sorry, there was an error submitting your message. Please try again.";
      if (error instanceof Error) {
        errorMessage += ` (${error.message})`;
      }
      const result = {
        success: false,
        message: errorMessage,
      };
      this.submissionStatus.next(result);
      return result;
    }
  }
}

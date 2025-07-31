import { animate, style, transition, trigger } from "@angular/animations";
import { CommonModule } from "@angular/common";
import { Component, input, output } from "@angular/core";
export interface NotificationData {
  success: boolean;
  message: string;
}

@Component({
  selector: "teksed-notification",
  imports: [CommonModule],
  template: `
    @if (notification()) {
      <div [@slideIn] class="fixed top-4 right-4 z-50 max-w-md w-full mx-4">
        <div
          [class]="getNotificationClasses()"
          class="p-4 rounded-lg shadow-lg border flex items-start gap-3"
        >
          <!-- Success Icon -->
          @if (notification()?.success) {
            <svg
              class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          }

          <!-- Error Icon -->
          @if (!notification()?.success) {
            <svg
              class="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          }

          <!-- Message -->
          <div class="flex-1">
            <p [class]="getTextClasses()" class="font-medium">
              {{ notification()?.message }}
            </p>
          </div>

          <!-- Close Button -->
          <button
            (click)="close()"
            [class]="getCloseButtonClasses()"
            class="flex-shrink-0 rounded-full p-1 hover:bg-opacity-20 transition-colors duration-200"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    }
  `,
  animations: [
    trigger("slideIn", [
      transition(":enter", [
        style({ transform: "translateX(100%)", opacity: 0 }),
        animate("300ms ease-out", style({ transform: "translateX(0)", opacity: 1 })),
      ]),
      transition(":leave", [
        animate("300ms ease-in", style({ transform: "translateX(100%)", opacity: 0 })),
      ]),
    ]),
  ],
})
export class NotificationComponent {
  notification = input<NotificationData | null>(null);
  autoClose = input<boolean>(true);
  autoCloseDelay = input<number>(5000);
  closed = output<void>();

  private autoCloseTimer?: number;

  ngOnInit() {
    if (this.autoClose() && this.notification()) {
      this.startAutoCloseTimer();
    }
  }

  ngOnDestroy() {
    this.clearAutoCloseTimer();
  }

  close() {
    this.clearAutoCloseTimer();
    this.closed.emit();
  }

  private startAutoCloseTimer() {
    this.autoCloseTimer = window.setTimeout(() => {
      this.close();
    }, this.autoCloseDelay());
  }

  private clearAutoCloseTimer() {
    if (this.autoCloseTimer) {
      clearTimeout(this.autoCloseTimer);
      this.autoCloseTimer = undefined;
    }
  }

  getNotificationClasses(): string {
    return this.notification()?.success
      ? "bg-green-50 border-green-200"
      : "bg-red-50 border-red-200";
  }

  getTextClasses(): string {
    return this.notification()?.success ? "text-green-800" : "text-red-800";
  }

  getCloseButtonClasses(): string {
    return this.notification()?.success
      ? "text-green-600 hover:bg-green-600"
      : "text-red-600 hover:bg-red-600";
  }
}

import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from "@angular/core";
import { Router } from "@angular/router";
import { FooterData } from "@app/core/interfaces/footer.interface";
import { SanityService } from "@app/core/services/sanity/sanity.service";
import { FooterFallBackData } from "@app/data/fallback-data";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "teksed-footer",
  imports: [CommonModule],
  templateUrl: "./footer.component.html",
  styleUrl: "./footer.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit, OnDestroy {
  protected currentYear = new Date().getFullYear();

  // Dynamic content from Sanity
  protected footerData = signal<FooterData | null>(null);
  protected error = signal<string | null>(null);
  protected isLoading = signal(true);

  private readonly destroy$ = new Subject<void>();
  private readonly router = inject(Router);
  private readonly sanityService = inject(SanityService);

  ngOnInit() {
    this.loadFooterData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadFooterData() {
    this.sanityService
      .getFooterData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: FooterData) => {
          this.footerData.set(data);
          this.error.set(null);
        },
        error: (error) => {
          this.error.set(error);
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }

  private setFallbackData() {
    this.footerData.set(FooterFallBackData);
  }
}

import { CommonModule } from "@angular/common";
import { Component, HostListener, OnInit, OnDestroy, signal, inject } from "@angular/core";
import { trigger, transition, style, animate } from "@angular/animations";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { SanityService } from "@app/core/services/sanity/sanity.service";
import { NavbarData } from "@app/core/interfaces/navbar.interface";
import { NavbarFallBackData } from "@app/data/fallback-data";

@Component({
  selector: "teksed-navbar",
  imports: [CommonModule],
  templateUrl: "./navbar.component.html",

  animations: [
    trigger("slideInOut", [
      transition(":enter", [
        style({ transform: "translateY(-100%)", backgroundColor: "transparent" }),
        animate("300ms ease-out", style({ transform: "translateY(0%)" })),
      ]),
      transition(":leave", [animate("300ms ease-in", style({ transform: "translateY(-100%)" }))]),
    ]),
  ],
})
export class NavbarComponent implements OnInit, OnDestroy {
  protected isVisible = signal(true);
  protected hasScrolled = signal(false);
  protected lastScrollPosition = signal(0);
  protected error = signal<string | null>(null);

  // Dynamic content from Sanity
  protected navbarData = signal<NavbarData | null>(null);
  protected isLoading = signal(true);

  // Dropdown state management
  protected activeDropdown = signal<string | null>(null);
  protected isMenuOpen = signal(false);

  private readonly router = inject(Router);
  private readonly destroy$ = new Subject<void>();
  private readonly sanityService = inject(SanityService);

  ngOnInit() {
    this.lastScrollPosition.set(window.pageYOffset || document.documentElement.scrollTop);
    this.checkInitialScroll();
    this.loadNavbarData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadNavbarData() {
    this.sanityService
      .getNavbarData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.navbarData.set(data);
          if (data === null) {
            this.setFallbackData();
          }
          this.error.set(null);
        },
        error: (error) => {
          this.error.set(error);
          this.setFallbackData();
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }

  private setFallbackData() {
    this.navbarData.set(NavbarFallBackData);
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    // Show/hide logic
    if (currentScrollPosition < this.lastScrollPosition()) {
      this.isVisible.set(true);
    } else if (currentScrollPosition > this.lastScrollPosition() && currentScrollPosition > 50) {
      this.isVisible.set(false);
    }

    // Background change logic
    this.hasScrolled.set(currentScrollPosition > 50);

    // Always show navbar at the top of the page
    if (currentScrollPosition === 0) {
      this.isVisible.set(true);
      this.hasScrolled.set(false);
    }

    this.lastScrollPosition.set(currentScrollPosition);
  }

  private checkInitialScroll() {
    if (window.pageYOffset > 0) {
      this.hasScrolled.set(true);
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  onCtaClick() {
    if (this.navbarData()?.ctaButton.action) {
      this.navigateTo(this.navbarData()!.ctaButton.action);
    }
  }

  // Dropdown management methods
  toggleDropdown(itemKey: string, event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.activeDropdown() === itemKey) {
      this.activeDropdown.set(null);
    } else {
      this.activeDropdown.set(itemKey);
    }
  }

  closeDropdown() {
    this.activeDropdown.set(null);
  }

  navigateToSubItem(route: string) {
    this.activeDropdown.set(null);
    this.navigateTo(route);
  }

  hasSubItems(item: any): boolean {
    return item.subItems && item.subItems.length > 0;
  }

  toggleMobileMenu() {
    this.isMenuOpen.update(() => !this.isMenuOpen());
  }

  @HostListener("document:click", ["$event"])
  onDocumentClick(event: Event) {
    if (this.activeDropdown()) {
      this.closeDropdown();
    }
  }
}

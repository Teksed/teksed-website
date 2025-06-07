import { CommonModule } from "@angular/common";
import { Component, HostListener, OnInit, Renderer2 } from "@angular/core";
import { trigger, transition, style, animate } from "@angular/animations";
import { Router } from "@angular/router";

@Component({
  selector: "teksed-navbar",
  imports: [CommonModule],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
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
export class NavbarComponent implements OnInit {
  isVisible = true;
  hasScrolled = false;
  private lastScrollPosition = 0;

  constructor(
    private readonly router: Router,
    private readonly renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.lastScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    this.checkInitialScroll();
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    // Show/hide logic
    if (currentScrollPosition < this.lastScrollPosition) {
      this.isVisible = true;
    } else if (currentScrollPosition > this.lastScrollPosition && currentScrollPosition > 50) {
      this.isVisible = false;
    }

    // Background change logic
    this.hasScrolled = currentScrollPosition > 50;

    // Always show navbar at the top of the page
    if (currentScrollPosition === 0) {
      this.isVisible = true;
      this.hasScrolled = false;
    }

    this.lastScrollPosition = currentScrollPosition;
  }

  private checkInitialScroll() {
    if (window.pageYOffset > 0) {
      this.hasScrolled = true;
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

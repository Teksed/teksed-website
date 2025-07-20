import { Component, effect, signal } from "@angular/core";
import { Executive } from "@app/core/interfaces/executive.interface";
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
  selector: "teksed-about-us",
  imports: [],
  templateUrl: "./about-us.component.html",
  styleUrl: "./about-us.component.css",
  animations: [
    trigger("slideAnimation", [
      transition(":increment", [
        style({ transform: "translateX(100%)", opacity: 0 }),
        animate("500ms ease-out", style({ transform: "translateX(0)", opacity: 1 })),
      ]),
      transition(":decrement", [
        style({ transform: "translateX(-100%)", opacity: 0 }),
        animate("500ms ease-out", style({ transform: "translateX(0)", opacity: 1 })),
      ]),
    ]),
    trigger("modalAnimation", [
      transition(":enter", [
        style({ opacity: 0, transform: "scale(0.9)" }),
        animate("300ms ease-out", style({ opacity: 1, transform: "scale(1)" })),
      ]),
      transition(":leave", [
        animate("300ms ease-in", style({ opacity: 0, transform: "scale(0.9)" })),
      ]),
    ]),
  ],
})
export class AboutUsComponent {
  protected executives: Executive[] = [
    {
      name: "Emmanuel Kwesi Tandoh",
      position: "Chief Executive Officer",
      bio: "A tech entrepreneur, lecturer, and servant leader, Tandoh launched TeKSED to transform Africa's role in global technology. With a background in Computer Science & Engineering and deep experience in STEM education, he leads with vision, integrity, and innovation. His goal: to make TeKSED a world-class African tech powerhouse rooted in impact and sustainability.",
      image: "assets/emmanuel.jpg",
      socials: {
        linkedin: "https://linkedin.com/in/emmanuel-tandoh",
        twitter: "https://twitter.com/emmanuel_tandoh",
        email: "emmanuel@teksed.com",
      },
    },
    {
      name: "Kingsley Amankwah",
      position: "Chief Technology Officer",
      bio: "Software architect expert specializing in scalable, resilient systems and a passion for African-led innovation. With over 10 years of experience in building enterprise-level applications, Kingsley leads our technical vision and ensures our products meet world-class standards while addressing African market needs.",
      image: "assets/kingsley.jpg",
      socials: {
        linkedin: "https://www.linkedin.com/in/kingsleyamankwah/",
        twitter: "https://twitter.com/kingsley_dev",
        email: "kingsley@teksed.com",
      },
    },
    {
      name: "Joseph Sanaki",
      position: "Chief Operations Officer",
      bio: "Strategic leader with expertise in scaling technology startups across emerging markets. Joseph brings operational excellence and process optimization to ensure TeKSED delivers on its promises while maintaining sustainable growth across African markets.",
      image: "assets/sanaki.jpg",
      socials: {
        linkedin: "https://linkedin.com/in/joseph-sanaki",
        email: "joseph@teksed.com",
      },
    },
    {
      name: "Francis Abeka Dacosta",
      position: "Chief Marketing Officer",
      bio: "Brand strategist focused on telling Africa's technology success stories to the world. I'm Francis Abeka-Dacosta, a multi-disciplinary creative passionate about turning ideas into visually compelling stories. With a background in video editing, graphic design, branding, and web development, I offer a comprehensive approach to digital storytelling. Over the years, I've collaborated with startups, ministries, businesses, and personal brands to deliver high-impact content—from cinematic video edits and strategic brand identities to responsive websites and print-ready designs. I help brands communicate clearly, creatively, and confidently in a fast-paced digital world.",
      image: "assets/dacosta.jpg",
      socials: {
        linkedin: "https://linkedin.com/in/francis-abeka-dacosta",
        twitter: "https://twitter.com/francis_creates",
        email: "francis@teksed.com",
      },
    },
    {
      name: "Erica Gyau",
      position: "Head of Product Development",
      bio: "Innovation leader with expertise in building user-centric digital products. Erica combines design thinking with technical expertise to create products that solve real problems for African users, ensuring our solutions are both innovative and accessible.",
      image: "assets/erica.jpg",
      socials: {
        linkedin: "https://linkedin.com/in/erica-gyau",
        twitter: "https://twitter.com/erica_builds",
        email: "erica@teksed.com",
      },
    },
  ];

  protected currentIndex = signal(0);
  protected itemsPerSlide = signal(4);
  protected visibleExecutives = signal<Executive[]>([]);
  protected canGoPrev = signal(false);
  protected canGoNext = signal(true);
  protected selectedExecutive = signal<Executive | null>(null);
  private autoPlayInterval?: number;

  constructor() {
    effect(() => {
      this.updateVisibleExecutives();
    });

    effect(() => {
      this.adjustItemsPerSlide();
    });
  }

  ngOnInit(): void {
    this.startAutoPlay();
    window.addEventListener("resize", this.onResize.bind(this));
    // Add escape key listener for modal
    document.addEventListener("keydown", this.onKeyDown.bind(this));
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
    window.removeEventListener("resize", this.onResize.bind(this));
    document.removeEventListener("keydown", this.onKeyDown.bind(this));
  }

  private onKeyDown(event: KeyboardEvent): void {
    if (event.key === "Escape" && this.selectedExecutive()) {
      this.closeModal();
    }
  }

  private updateVisibleExecutives(): void {
    const newVisibleExecutives: Executive[] = [];
    const endIndex = Math.min(this.currentIndex() + this.itemsPerSlide(), this.executives.length);

    for (let i = this.currentIndex(); i < endIndex; i++) {
      newVisibleExecutives.push(this.executives[i]);
    }

    // Handle wrap-around for smooth infinite scrolling
    if (endIndex < this.currentIndex() + this.itemsPerSlide()) {
      const remaining = this.itemsPerSlide() - newVisibleExecutives.length;
      for (let i = 0; i < remaining; i++) {
        newVisibleExecutives.push(this.executives[i]);
      }
    }

    this.visibleExecutives.set(newVisibleExecutives);
  }

  private adjustItemsPerSlide(): void {
    if (window.innerWidth < 768) {
      this.itemsPerSlide.set(1);
    } else if (window.innerWidth < 1024) {
      this.itemsPerSlide.set(2);
    } else {
      this.itemsPerSlide.set(4);
    }
  }

  protected getTruncatedBio(bio: string): string {
    const maxLength = 50;
    if (bio.length <= maxLength) {
      return bio;
    }
    return bio.substring(0, maxLength).trim();
  }

  protected openExecutiveModal(executive: Executive): void {
    this.selectedExecutive.set(executive);
    this.stopAutoPlay(); // Stop autoplay when modal is open
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  }

  protected closeModal(): void {
    this.selectedExecutive.set(null);
    this.startAutoPlay(); // Resume autoplay when modal is closed
    document.body.style.overflow = ""; // Restore scrolling
  }

  startAutoPlay() {
    this.autoPlayInterval = window.setInterval(() => {
      if (this.canGoNext()) {
        this.next();
      } else {
        // Reset to first slide if at end
        this.goTo(0);
      }
    }, 5000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  next() {
    this.currentIndex.update((current) => (current + 1) % this.executives.length);
  }

  prev() {
    this.currentIndex.update(
      (current) => (current - 1 + this.executives.length) % this.executives.length,
    );
  }

  goTo(index: number) {
    if (index >= 0 && index < this.executives.length) {
      this.currentIndex.set(index);
    }
  }

  onResize() {
    this.adjustItemsPerSlide();
  }
}

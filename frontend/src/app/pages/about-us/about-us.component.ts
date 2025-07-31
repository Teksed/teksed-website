import { ChangeDetectionStrategy, Component, effect, signal } from "@angular/core";
import { Executive, Stat } from "@app/core/interfaces/executive.interface";
import { trigger, transition, style, animate, query, stagger } from "@angular/animations";
import { CommonModule } from "@angular/common";

@Component({
  selector: "teksed-about-us",
  imports: [CommonModule],
  templateUrl: "./about-us.component.html",
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
  executives: Executive[] = [
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
      bio: "Brand strategist focused on telling Africa's technology success stories to the world. Francis is a multi-disciplinary creative passionate about turning ideas into visually compelling stories. With expertise in video editing, graphic design, branding, and web development, he delivers comprehensive digital storytelling solutions.",
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

  stats: Stat[] = [
    {
      number: "2024",
      label: "Founded",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      number: "5+",
      label: "Team Members",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
      number: "3+",
      label: "Countries",
      icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      number: "100%",
      label: "African Owned",
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    },
  ];

  currentIndex = signal(0);
  itemsPerSlide = signal(1);
  selectedExecutive = signal<Executive | null>(null);
  private autoPlayInterval?: number;

  constructor() {
    effect(() => {
      this.adjustItemsPerSlide();
    });
  }

  ngOnInit() {
    this.startAutoPlay();
    this.adjustItemsPerSlide();
    window.addEventListener("resize", this.onResize.bind(this));
    document.addEventListener("keydown", this.onKeyDown.bind(this));
  }

  ngOnDestroy() {
    this.stopAutoPlay();
    window.removeEventListener("resize", this.onResize.bind(this));
    document.removeEventListener("keydown", this.onKeyDown.bind(this));
  }

  private onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape" && this.selectedExecutive()) {
      this.closeModal();
    }
  }

  private adjustItemsPerSlide() {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        this.itemsPerSlide.set(1);
      } else if (window.innerWidth < 1024) {
        this.itemsPerSlide.set(2);
      } else {
        this.itemsPerSlide.set(3);
      }
    }
  }

  startAutoPlay() {
    this.autoPlayInterval = window.setInterval(() => {
      this.next();
    }, 4000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  next() {
    const maxIndex = Math.max(0, this.executives.length - this.itemsPerSlide());
    this.currentIndex.update((current) => (current >= maxIndex ? 0 : current + 1));
  }

  prev() {
    const maxIndex = Math.max(0, this.executives.length - this.itemsPerSlide());
    this.currentIndex.update((current) => (current <= 0 ? maxIndex : current - 1));
  }

  goTo(index: number) {
    const maxIndex = Math.max(0, this.executives.length - this.itemsPerSlide());
    if (index >= 0 && index <= maxIndex) {
      this.currentIndex.set(index);
    }
  }

  canGoPrev(): boolean {
    return this.currentIndex() > 0;
  }

  canGoNext(): boolean {
    const maxIndex = Math.max(0, this.executives.length - this.itemsPerSlide());
    return this.currentIndex() < maxIndex;
  }

  getVisibleExecutives(): Executive[] {
    const start = this.currentIndex();
    const end = start + this.itemsPerSlide();
    return this.executives.slice(start, end);
  }

  getTruncatedBio(bio: string): string {
    const maxLength = 120;
    if (bio.length <= maxLength) return bio;
    return bio.substring(0, maxLength).trim() + "...";
  }

  openExecutiveModal(executive: Executive) {
    this.selectedExecutive.set(executive);
    this.stopAutoPlay();
    document.body.style.overflow = "hidden";
  }

  closeModal() {
    this.selectedExecutive.set(null);
    this.startAutoPlay();
    document.body.style.overflow = "";
  }

  onResize() {
    this.adjustItemsPerSlide();
  }
}

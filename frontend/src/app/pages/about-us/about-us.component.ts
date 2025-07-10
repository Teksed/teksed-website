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
  ],
})
export class AboutUsComponent {
  protected executives: Executive[] = [
    {
      name: "Emmanuel Kwesi Tandoh",
      position: "Chief Executive Officer",
      bio: " A tech entrepreneur, lecturer, and servant leader, Tandoh launched TeKSED to transform Africa’s role in global technology. With a background in Computer Science & Engineering and deep experience in STEM education, he leads with vision, integrity, and innovation. His goal: to make TeKSED a world-class African tech powerhouse rooted in impact and sustainability.",
      // image: "assets/executives/emmanuel.jpg",
      image:"https://teksedinc.com/assets/executives/emmanuel.jpg",
    },
    {
      name: "Kingsley Amankwah",
      position: "Chief Technology Officer",
      bio: "Software architect expert specializing in scalable, resilient systems and a passion for African-led innovation.",
      // image: "assets/executives/kingsley.jpg",
      image:"https://teksedinc.com/assets/executives/kingsley.jpg",
    },
    {
      name: "Joesph Sanaki",
      position: "Chief Operations Officer",
      bio: "Strategic leader with expertise in scaling technology startups across emerging markets.",
      // image: "assets/executives/joesph.jpg",
      image:"https://teksedinc.com/assets/executives/sanaki.jpg",
  
    },
    {
      name: "Francis Abeka Dacosta",
      position: "Chief Marketing Officer",
      bio: "Brand strategist focused on telling Africa's technology success stories to the world.I’m Francis Abeka-Dacosta, a multi-disciplinary creative passionate about turning ideas into visually compelling stories. With a background in video editing, graphic design, branding, and web development, I offer a comprehensive approach to digital storytelling. Over the years, I’ve collaborated with startups, ministries, businesses, and personal brands to deliver high-impact content—from cinematic video edits and strategic brand identities to responsive websites and print-ready designs. I help brands communicate clearly, creatively, and confidently in a fast-paced digital world.",
      // image: "assets/executives/francis.jpg",
      image:"https://teksedinc.com/assets/executives/dacosta.jpg",
      //
    },
    {
      name: "Erica Gyau",
      position: "Head of Product Development",
      bio: "Innovation leader with expertise in building user-centric digital products.",
      // image: "assets/executives/nana.jpg",
      image:"https://teksedinc.com/assets/executives/erica.jpg",
    },
  ];

  protected currentIndex = signal(0);
  protected itemsPerSlide = signal(4);
  protected visibleExecutives = signal<Executive[]>([]);
  protected canGoPrev = signal(false);
  protected canGoNext = signal(true);
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
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
    window.removeEventListener("resize", this.onResize.bind(this));
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

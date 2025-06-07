import { DatePipe } from "@angular/common";
import { Component, signal } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "teksed-blog",
  imports: [RouterLink, DatePipe],
  templateUrl: "./blog.component.html",
  styleUrl: "./blog.component.css",
})
export class BlogComponent {
  activeCategory = signal<string>("all");

  categories = signal<string[]>(["Technology", "Company News", "Industry Insights", "Innovation"]);

  articles = signal<any[]>([
    {
      id: 1,
      title: "TeKSED Launches New AI Platform",
      excerpt: "Our revolutionary AI platform is transforming businesses across Africa...",
      category: "Technology",
      date: new Date("2023-05-15"),
      slug: "teksed-ai-platform",
      image: "/assets/tek.png",
    },
    // More articles...
  ]);

  filteredArticles = signal<any[]>(this.articles());

  filterByCategory(category: string): void {
    this.activeCategory.set(category);
    if (category === "all") {
      this.filteredArticles.set(this.articles());
    } else {
      this.filteredArticles.set(this.articles().filter((article) => article.category === category));
    }
  }
}

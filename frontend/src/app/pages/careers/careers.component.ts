import { Component, signal } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "teksed-careers",
  imports: [RouterLink],
  templateUrl: "./careers.component.html",
  styleUrl: "./careers.component.css",
})
export class CareersComponent {
  openPositions = signal<any[]>([
    {
      id: 1,
      title: "Senior Software Engineer",
      location: "Accra, Ghana (Remote)",
      type: "Full-time",
      slug: "senior-software-engineer",
    },
    {
      id: 2,
      title: "Product Designer",
      location: "Lagos, Nigeria",
      type: "Full-time",
      slug: "product-designer",
    },
  ]);
}

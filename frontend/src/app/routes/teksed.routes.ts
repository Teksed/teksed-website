import { Routes } from "@angular/router";
import { titlePrefix } from "@app/utils/utils";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("../pages/home/home.component").then((c) => c.HomeComponent),
    title: `${titlePrefix} - Home Page`,
  },
  {
    path: "about-us",
    loadComponent: () =>
      import("../pages/about-us/about-us.component").then((c) => c.AboutUsComponent),
    title: `${titlePrefix} - About US`,
  },
  {
    path: "careers",
    loadComponent: () =>
      import("../pages/careers/careers.component").then((c) => c.CareersComponent),
    title: `${titlePrefix} - Careers`,
  },
  {
    path: "blog",
    loadComponent: () => import("../pages/blog/blog.component").then((c) => c.BlogComponent),
    title: `${titlePrefix} - Blog`,
  },
];

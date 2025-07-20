import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "home",
    loadComponent: () => import("../pages/home/home.component").then((c) => c.HomeComponent),
    title: `Home Page`,
  },
  {
    path: "about-us",
    loadComponent: () =>
      import("../pages/about-us/about-us.component").then((c) => c.AboutUsComponent),
    title: `About US`,
  },
  {
    path: "careers",
    loadComponent: () =>
      import("../pages/careers/careers.component").then((c) => c.CareersComponent),
    title: `Careers`,
  },
  {
    path: "blog",
    loadComponent: () => import("../pages/blog/blog.component").then((c) => c.BlogComponent),
    title: `Blog`,
  },
];

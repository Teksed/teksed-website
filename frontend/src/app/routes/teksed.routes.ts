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

  {
    path: "clients",
    loadComponent: () =>
      import("../pages/clients/clients.component").then((c) => c.ClientsComponent),
    title: `Clients`,
  },

  {
    path: "products",
    loadComponent: () =>
      import("../pages/products/products.component").then((c) => c.ProductsComponent),
    title: `Products`,
  },

  {
    path: "services",
    loadComponent: () =>
      import("../pages/services/services.component").then((c) => c.ServicesComponent),
    title: `Services`,
  },

  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
];

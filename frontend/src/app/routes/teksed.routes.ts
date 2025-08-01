import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "home",
    loadComponent: () => import("../pages/home/home.component").then((c) => c.HomeComponent),
  },
  {
    path: "about-us",
    loadComponent: () =>
      import("../pages/about-us/about-us.component").then((c) => c.AboutUsComponent),
  },
  {
    path: "careers",
    loadComponent: () =>
      import("../pages/careers/careers.component").then((c) => c.CareersComponent),
  },
  {
    path: "blog",
    loadComponent: () => import("../pages/blog/blog.component").then((c) => c.BlogComponent),
  },

  {
    path: "clients",
    loadComponent: () =>
      import("../pages/clients/clients.component").then((c) => c.ClientsComponent),
  },

  {
    path: "products",
    loadComponent: () =>
      import("../pages/products/products.component").then((c) => c.ProductsComponent),
  },

  {
    path: "services",
    loadComponent: () =>
      import("../pages/services/services.component").then((c) => c.ServicesComponent),
  },

  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
];

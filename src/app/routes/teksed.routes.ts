import { Routes } from "@angular/router";
import { titlePrefix } from "@app/utils/utils";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("../pages/home/home.component").then((c) => c.HomeComponent),
    title: `${titlePrefix} - Home Page`,
  },
];

import { Routes } from "@angular/router";
import { titlePrefix } from "@app/utils/utils";

export const routes: Routes = [
  {
    path: "**",
    title: `${titlePrefix} - Page Not Found`,
  },
];

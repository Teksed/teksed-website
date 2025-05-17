import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { TeksedComponent } from "./app/teksed.component";

bootstrapApplication(TeksedComponent, appConfig).catch((err) => console.error(err));

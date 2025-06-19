import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "./shared/footer/footer.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";

@Component({
  selector: "teksed-root",
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `<teksed-navbar /> <router-outlet /> <teksed-footer />`,
})
export class TeksedComponent {}

import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "teksed-root",
  imports: [RouterOutlet],
  template: "<router-outlet />",
})
export class TeksedComponent {}

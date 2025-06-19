import { Injectable } from "@angular/core";
import { client } from "@app/config/sanity-client";
import { FOOTER_DATA } from "@app/queries/footer.groq";
import { NAVBAR_DATA } from "@app/queries/navbar.groq";
import { from } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SanityService {
  constructor() {}

  getNavbarData() {
    return from(client.fetch(NAVBAR_DATA));
  }

  getFooterData() {
    return from(client.fetch(FOOTER_DATA));
  }
}

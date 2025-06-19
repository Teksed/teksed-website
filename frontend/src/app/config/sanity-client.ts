import { environment } from "@env/environment";
import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: environment.PROJECT_ID,
  dataset: environment.DATASET,
  useCdn: true, // Enable CDN for faster response
  apiVersion: "2023-05-03",
});

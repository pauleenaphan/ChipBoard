//! MAIN ROUTE FOLDER (HOMEPAGE)

import { api, HydrateClient } from "~/trpc/server";
import { LandingPage } from "./landing";

export default async function Home() {
  return (
    <HydrateClient>
      <main>
        <LandingPage></LandingPage>
      </main>
    </HydrateClient>
  );
}

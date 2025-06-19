//! MAIN ROUTE FOLDER (HOMEPAGE)

import { api, HydrateClient } from "~/trpc/server";
import { Navbar } from "./_components/Navbar";
import { LandingPage } from "./landing";

export default async function Home() {
  return (
    <HydrateClient>
      <main>
        <Navbar></Navbar>
        <LandingPage></LandingPage>
      </main>
    </HydrateClient>
  );
}

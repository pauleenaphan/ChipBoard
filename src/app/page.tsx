//! MAIN ROUTE FOLDER (HOMEPAGE)

import { api, HydrateClient } from "~/trpc/server";
import { Navbar } from "./_components/Navbar";

export default async function Home() {
  return (
    <HydrateClient>
      <main>
        <Navbar></Navbar>
      </main>
    </HydrateClient>
  );
}

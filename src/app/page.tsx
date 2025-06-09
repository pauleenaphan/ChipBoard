//! MAIN ROUTE FOLDER (HOMEPAGE)
import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";
import { Navbar } from "./_components/Navbar";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main>
        <Navbar></Navbar>
      </main>
    </HydrateClient>
  );
}

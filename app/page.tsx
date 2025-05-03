"use client";

import { Header } from "@/components/header";
import { Player } from "@/components/player";
import { PlaylistView } from "@/components/playlist-view";
import { PlaylistSidebar } from "@/components/sidebar";
import { AudioInitializer } from "@/components/audio-initializer";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="bg-black h-screen flex flex-col overflow-hidden">
      <AudioInitializer />
      <Header />

      <div className="flex flex-1 mt-1 px-2 items-start gap-1.5 max-h-[670px] overflow-hidden">
        <PlaylistSidebar />
        <Suspense
          fallback={<div className="flex-1 bg-zinc-900 animate-pulse" />}
        >
          <PlaylistView />
        </Suspense>
      </div>

      <Player />
    </div>
  );
}

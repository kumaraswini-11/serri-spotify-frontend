"use client";

import type React from "react";

import { playlists } from "@/lib/data";
import { useAudioStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { LibraryBig } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";
import { Playlist } from "@/lib/types";

export const PlaylistSidebar: React.FC = () => {
  const currentPlaylist = useAudioStore((state) => state.currentPlaylist);
  const setCurrentPlaylist = useAudioStore((state) => state.setCurrentPlaylist);
  const [loadingPlaylistId, setLoadingPlaylistId] = useState<string | null>(
    null
  );

  const handlePlaylistClick = (playlist: Playlist) => {
    if (currentPlaylist.id === playlist.id) return;

    setLoadingPlaylistId(playlist.id);
    // Simulate loading delay
    setTimeout(() => {
      setCurrentPlaylist(playlist);
      setLoadingPlaylistId(null);
    }, 500);
  };

  return (
    <aside className="h-full w-[72px] p-2 flex flex-col items-center bg-[#121212] rounded-sm shadow-xl overflow-hidden">
      {/* Library Icon */}
      <LibraryBig className="text-zinc-400 my-2" aria-label="Library" />

      {/* Scrollable Playlist Area */}
      <ScrollArea className="h-full w-full flex-1 overflow-y-auto">
        <div className="flex flex-col items-center gap-2.5 pb-1">
          {playlists.map((playlist) => (
            <button
              key={playlist.id}
              className={cn(
                "w-12 h-12 shadow-md overflow-hidden mt-1 cursor-pointer relative rounded-sm transition-all",
                currentPlaylist.id === playlist.id && "ring-2 ring-green-500"
              )}
              title={playlist.name}
              onClick={() => handlePlaylistClick(playlist)}
              aria-label={`Play ${playlist.name} playlist`}
              aria-current={
                currentPlaylist.id === playlist.id ? "true" : "false"
              }
            >
              {loadingPlaylistId === playlist.id ? (
                <Skeleton className="w-full h-full" />
              ) : (
                <Image
                  src={playlist.coverUrl || "/placeholder.svg"}
                  alt={playlist.name || "Playlist cover"}
                  width={60}
                  height={60}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              )}
            </button>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
};

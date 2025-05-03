"use client";

import Image from "next/image";
import {
  Play,
  MoreHorizontal,
  CirclePlus,
  List,
  Clock,
  Pause,
  Loader2,
} from "lucide-react";

import { formatDuration, cn, formatArtists } from "@/lib/utils";
import { Button } from "./ui/button";
import { useAudioStore } from "@/lib/store";
import { Skeleton } from "./ui/skeleton";
import { useState, useEffect } from "react";
import { Song } from "@/lib/types";

export function PlaylistView() {
  const currentPlaylist = useAudioStore((state) => state.currentPlaylist);
  const currentSong = useAudioStore((state) => state.currentSong);
  const isPlaying = useAudioStore((state) => state.isPlaying);
  const isLoading = useAudioStore((state) => state.isLoading);
  const playSong = useAudioStore((state) => state.playSong);
  const pauseSong = useAudioStore((state) => state.pauseSong);
  const togglePlayPause = useAudioStore((state) => state.togglePlayPause);

  const [isPlaylistLoading, setIsPlaylistLoading] = useState(true);

  // Simulate playlist loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPlaylistLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [currentPlaylist.id]);

  const totalDurationSeconds = currentPlaylist.songs.reduce(
    (sum, song) => sum + song.duration,
    0
  );

  const displayArtists = formatArtists(currentPlaylist.songs[0]?.artist || "");

  const handleSongClick = (song: Song) => {
    if (currentSong?.id === song.id) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      isPlaying ? pauseSong() : playSong(song);
    } else {
      playSong(song);
    }
  };

  const handlePlayPauseClick = () => {
    if (!currentSong) {
      if (currentPlaylist.songs.length > 0) {
        playSong(currentPlaylist.songs[0]);
      }
      return;
    }
    togglePlayPause();
  };

  return (
    <section className="flex-1 p-5 bg-gradient-to-b from-[#9E2984] via-[#421237] to-[#121212] rounded-sm text-white h-full overflow-y-auto">
      {/* Header */}
      <div className="flex gap-6">
        {isPlaylistLoading ? (
          <Skeleton className="w-[180px] h-[180px] rounded-md" />
        ) : (
          <Image
            src={currentPlaylist.coverUrl || "/placeholder.svg"}
            alt={currentPlaylist.name}
            width={180}
            height={180}
            className="object-cover rounded-md shadow-lg"
            priority
          />
        )}

        <div className="flex flex-col justify-center gap-2">
          {isPlaylistLoading ? (
            <>
              <Skeleton className="w-16 h-4" />
              <Skeleton className="w-64 h-12" />
              <Skeleton className="w-48 h-4 mt-2" />
              <Skeleton className="w-72 h-6 mt-2" />
            </>
          ) : (
            <>
              <span className="text-xs font-medium">Playlist</span>
              <h1 className="text-6xl font-bold">{currentPlaylist.name}</h1>
              <p className="text-sm text-zinc-300 mt-2">{displayArtists}</p>

              <div className="flex items-center gap-2 mt-2 text-sm text-zinc-300">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <Image
                    src="/spotify-logo.svg"
                    alt="Spotify"
                    width={16}
                    height={16}
                  />
                </div>
                <span>Spotify</span>
                <span>
                  • {currentPlaylist.songs.length} songs, about{" "}
                  {formatDuration(totalDurationSeconds)}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 mt-6 flex items-center gap-6">
        <Button
          onClick={handlePlayPauseClick}
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center transition"
          disabled={isLoading || isPlaylistLoading}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isLoading ? (
            <Loader2 className="size-7 text-black animate-spin" />
          ) : isPlaying ? (
            <Pause className="size-7 fill-black text-black" />
          ) : (
            <Play className="size-7 fill-black text-black" />
          )}
        </Button>

        <Button
          variant="link"
          size="icon"
          className="bg-transparent"
          aria-label="Add to playlist"
        >
          <CirclePlus className="size-9 text-[#bebebe]" />
        </Button>

        <Button variant="link" size="icon" aria-label="More options">
          <MoreHorizontal className="size-7 text-[#bebebe]" />
        </Button>

        <div className="ml-auto">
          <Button
            variant="link"
            className="text-[#bebebe]"
            aria-label="View recents"
          >
            Recents <List className="size-5 ml-2 text-[#bebebe]" />
          </Button>
        </div>
      </div>

      {/* Song list */}
      <div className="px-6 mt-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-zinc-400 text-sm border-b border-zinc-800">
              <th className="text-left font-normal py-2 w-12">#</th>
              <th className="text-left font-normal py-2">Title</th>
              <th className="text-left font-normal py-2">Album</th>
              <th className="text-right font-normal py-2 pr-4">
                <Clock className="h-4 w-4 inline" aria-label="Duration" />
              </th>
            </tr>
          </thead>

          <tbody>
            {isPlaylistLoading
              ? // Skeleton loading state for songs
                Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <tr key={`skeleton-${index}`}>
                      <td className="py-3 pl-4">
                        <Skeleton className="w-4 h-4" />
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <Skeleton className="w-10 h-10 rounded" />
                          <div>
                            <Skeleton className="w-32 h-4 mb-1" />
                            <Skeleton className="w-24 h-3" />
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <Skeleton className="w-48 h-4" />
                      </td>
                      <td className="py-3 text-right pr-4">
                        <Skeleton className="w-10 h-4 ml-auto" />
                      </td>
                    </tr>
                  ))
              : currentPlaylist.songs.map((song, index) => {
                  const isCurrent = currentSong?.id === song.id;
                  const isCurrentPlaying = isCurrent && isPlaying;

                  return (
                    <tr
                      key={song.id}
                      className={cn(
                        "group hover:bg-zinc-800/50 rounded-md cursor-pointer",
                        isCurrent && "bg-zinc-800/50"
                      )}
                      onClick={() => handleSongClick(song)}
                    >
                      <td className="py-3 pl-4">
                        {isCurrent && isLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin text-green-500" />
                        ) : (
                          <>
                            <div
                              className={cn(
                                "w-4 text-center text-zinc-400 group-hover:hidden",
                                isCurrent && "text-green-500"
                              )}
                            >
                              {isCurrentPlaying ? (
                                <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                              ) : (
                                index + 1
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-4 h-4 p-0 hidden group-hover:flex items-center justify-center text-white"
                              aria-label={`Play ${song.title}`}
                            >
                              <Play className="h-3 w-3 fill-white text-white" />
                            </Button>
                          </>
                        )}
                      </td>

                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded overflow-hidden">
                            <Image
                              src={song.coverUrl || "/placeholder.svg"}
                              alt={song.title}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div
                              className={cn(
                                "font-medium",
                                isCurrent && "text-green-500"
                              )}
                            >
                              {song.title}
                            </div>
                            <div className="text-sm text-zinc-400">
                              {song.artist}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 text-zinc-400 text-sm">
                        {song.album}
                      </td>

                      <td className="py-3 text-zinc-400 text-sm text-right pr-4">
                        {formatDuration(song.duration)}
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

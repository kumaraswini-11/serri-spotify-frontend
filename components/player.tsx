"use client";

import type React from "react";

import { useAudioStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  ListMusic,
  Maximize2,
  Mic2,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  Loader2,
} from "lucide-react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import Image from "next/image";
import { useEffect } from "react";
import { formatDuration } from "@/lib/utils";

export const Player: React.FC = () => {
  const currentSong = useAudioStore((state) => state.currentSong);
  const isPlaying = useAudioStore((state) => state.isPlaying);
  const currentTime = useAudioStore((state) => state.currentTime);
  const duration = useAudioStore((state) => state.duration);
  const volume = useAudioStore((state) => state.volume);
  const isLoading = useAudioStore((state) => state.isLoading);
  const togglePlayPause = useAudioStore((state) => state.togglePlayPause);
  const seekTo = useAudioStore((state) => state.seekTo);
  const setVolume = useAudioStore((state) => state.setVolume);
  const nextSong = useAudioStore((state) => state.nextSong);
  const previousSong = useAudioStore((state) => state.previousSong);

  const handleSeek = (value: number[]) => {
    seekTo(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  // Keyboard shortcuts for player controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Space bar toggles play/pause
      if (e.code === "Space" && e.target === document.body) {
        e.preventDefault();
        togglePlayPause();
      }
      // Arrow right for next song
      else if (e.code === "ArrowRight" && e.ctrlKey) {
        e.preventDefault();
        nextSong();
      }
      // Arrow left for previous song
      else if (e.code === "ArrowLeft" && e.ctrlKey) {
        e.preventDefault();
        previousSong();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlayPause, nextSong, previousSong]);

  if (!currentSong) return null;

  return (
    <div className="h-[90px] bg-transparent px-4 flex items-center">
      {/* Current song info */}
      <div className="w-[30%] flex items-center gap-3">
        <div className="w-14 h-14 rounded overflow-hidden">
          <Image
            src={currentSong.coverUrl || "/placeholder.svg"}
            alt={currentSong.title}
            width={56}
            height={56}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="text-white font-medium text-sm">
            {currentSong.title}
          </div>
          <div className="text-xs text-zinc-400">{currentSong.artist}</div>
        </div>

        <IoIosCheckmarkCircle
          className={`h-4 w-4 fill-green-500 text-green-500`}
        />
      </div>

      {/* Player controls */}
      <div className="flex-1 flex flex-col items-center gap-2">
        <div className="flex items-center gap-4">
          <Button
            variant="link"
            size="icon"
            className="text-zinc-400 hover:text-white"
            aria-label="Shuffle"
          >
            <Shuffle className="h-4 w-4" />
          </Button>
          <Button
            variant="link"
            size="icon"
            onClick={previousSong}
            aria-label="Previous song"
            className="text-zinc-400 hover:text-white"
            disabled={isLoading}
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button
            onClick={togglePlayPause}
            className="w-8 h-8 rounded-full bg-white hover:bg-gray-200 flex items-center justify-center"
            aria-label={isPlaying ? "Pause" : "Play"}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 text-black animate-spin" />
            ) : isPlaying ? (
              <Pause className="h-4 w-4 text-black" />
            ) : (
              <Play className="h-4 w-4 fill-black text-black" />
            )}
          </Button>
          <Button
            variant="link"
            size="icon"
            onClick={nextSong}
            aria-label="Next song"
            className="text-zinc-400 hover:text-white"
            disabled={isLoading}
          >
            <SkipForward className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:text-white"
            aria-label="Repeat"
          >
            <Repeat className="h-4 w-4" />
          </Button>
        </div>

        <div className="w-full flex items-center gap-2 group">
          <span className="text-xs text-zinc-400 w-10 text-right">
            {formatDuration(currentTime)}
          </span>
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            className="w-full"
            aria-label="Seek position"
          />
          <span className="text-xs text-zinc-400 w-10">
            {formatDuration(duration)}
          </span>
        </div>
      </div>

      {/* Volume controls */}
      <div className="w-[30%] flex items-center justify-end gap-2">
        <Button
          variant="link"
          size="icon"
          className="text-zinc-400 hover:text-white"
          aria-label="Microphone"
        >
          <Mic2 className="h-4 w-4" />
        </Button>
        <Button
          variant="link"
          size="icon"
          className="text-zinc-400 hover:text-white"
          aria-label="Queue"
        >
          <ListMusic className="h-4 w-4" />
        </Button>
        <div className="relative flex items-center">
          <Button
            variant="link"
            size="icon"
            className="text-zinc-400 hover:text-white"
            aria-label="Volume"
          >
            <Volume2 className="h-4 w-4" />
          </Button>

          <div className="bottom-full p-2 bg-transparent rounded-md w-32">
            <Slider
              value={[volume]}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="w-full"
              aria-label="Volume"
            />
          </div>
        </div>
        <Button
          variant="link"
          size="icon"
          className="text-zinc-400 hover:text-white"
          aria-label="Fullscreen"
        >
          <Maximize2 className="size-4" />
        </Button>
      </div>
    </div>
  );
};

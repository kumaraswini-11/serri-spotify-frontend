"use client";

import { useEffect } from "react";
import { useAudioStore } from "@/lib/store";

export function AudioInitializer() {
  const initializeAudio = useAudioStore((state) => state.initializeAudio);

  useEffect(() => {
    // Initialize audio on client side only
    initializeAudio();

    // Clean up audio on unmount
    return () => {
      const audioElement = useAudioStore.getState().audioElement;
      if (audioElement) {
        audioElement.pause();
        audioElement.src = "";

        // Clean up event listeners
        if (audioElement._eventListeners) {
          Object.entries(audioElement._eventListeners).forEach(
            ([key, listener]) => {
              audioElement.removeEventListener(
                key.toLowerCase(),
                listener as EventListener
              );
            }
          );
        }
      }
    };
  }, [initializeAudio]);

  return null;
}

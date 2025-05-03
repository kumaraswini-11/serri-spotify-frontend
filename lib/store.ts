import { create } from "zustand";
import { playlists } from "@/lib/data";
import type { Playlist, Song } from "@/lib/types";
import { immer } from "zustand/middleware/immer";

interface AudioState {
  currentPlaylist: Playlist;
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  audioElement: HTMLAudioElement | null;
  isLoading: boolean;

  playSong: (song: Song) => void;
  pauseSong: () => void;
  togglePlayPause: () => void;
  seekTo: (time: number) => void;
  setVolume: (volume: number) => void;
  nextSong: () => void;
  previousSong: () => void;
  updateCurrentTime: (time: number) => void;
  updateDuration: (duration: number) => void;
  initializeAudio: () => void;
  setCurrentPlaylist: (playlist: Playlist) => void;
}

export const useAudioStore = create<AudioState>()(
  immer((set, get) => {
    const initialPlaylist = playlists[0];
    const initialSong = initialPlaylist.songs[0] ?? null;

    return {
      // Initial state
      currentPlaylist: initialPlaylist,
      currentSong: initialSong,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      volume: 0.7,
      audioElement: null,
      isLoading: false,

      initializeAudio: () => {
        if (typeof window === "undefined") return;

        const { currentSong, volume } = get();

        // Clean up any existing audio element
        const existingAudio = get().audioElement;
        if (existingAudio) {
          existingAudio.pause();
          existingAudio.src = "";
          existingAudio.remove();
        }

        const audio = new Audio(currentSong?.audioUrl || "");
        audio.volume = volume;
        audio.preload = "auto"; // Preload audio for better performance

        // Event listeners
        const timeUpdateHandler = () => {
          get().updateCurrentTime(audio.currentTime);
        };

        const loadedMetadataHandler = () => {
          get().updateDuration(audio.duration);
          set((state) => {
            state.isLoading = false;
          });
        };

        const endedHandler = () => {
          get().nextSong();
        };

        const errorHandler = (e: ErrorEvent) => {
          console.error("Audio error:", e);
          set((state) => {
            state.isLoading = false;
          });
        };

        const loadStartHandler = () => {
          set((state) => {
            state.isLoading = true;
          });
        };

        // Add event listeners
        audio.addEventListener("timeupdate", timeUpdateHandler);
        audio.addEventListener("loadedmetadata", loadedMetadataHandler);
        audio.addEventListener("ended", endedHandler);
        audio.addEventListener("error", errorHandler);
        audio.addEventListener("loadstart", loadStartHandler);

        set((state) => {
          state.audioElement = audio;
          // Store event listeners for cleanup
          state.audioElement._eventListeners = {
            timeUpdate: timeUpdateHandler,
            loadedMetadata: loadedMetadataHandler,
            ended: endedHandler,
            error: errorHandler,
            loadStart: loadStartHandler,
          };
        });
      },

      updateCurrentTime: (time: number) => {
        set((state) => {
          state.currentTime = time;
        });
      },

      updateDuration: (duration: number) => {
        set((state) => {
          state.duration = duration;
        });
      },

      playSong: (song: Song) => {
        const { currentSong, audioElement } = get();

        set((state) => {
          state.isLoading = true;
        });

        if (currentSong?.id === song.id) {
          audioElement
            ?.play()
            .then(() =>
              set((state) => {
                state.isPlaying = true;
                state.isLoading = false;
              })
            )
            .catch((error) => {
              console.error("Error playing audio:", error);
              set((state) => {
                state.isLoading = false;
              });
            });
        } else {
          if (audioElement) {
            audioElement.pause();
            audioElement.src = song.audioUrl;
            audioElement.currentTime = 0;

            audioElement
              .play()
              .then(() =>
                set((state) => {
                  state.isPlaying = true;
                  state.isLoading = false;
                })
              )
              .catch((error) => {
                console.error("Error playing audio:", error);
                set((state) => {
                  state.isLoading = false;
                });
              });
          }

          set((state) => {
            state.currentSong = song;
            state.currentTime = 0;
          });
        }
      },

      pauseSong: () => {
        const { audioElement } = get();
        audioElement?.pause();
        set((state) => {
          state.isPlaying = false;
        });
      },

      togglePlayPause: () => {
        const { isPlaying, audioElement, currentSong } = get();

        if (!currentSong) return;

        if (isPlaying) {
          audioElement?.pause();
          set((state) => {
            state.isPlaying = false;
          });
        } else {
          set((state) => {
            state.isLoading = true;
          });

          audioElement
            ?.play()
            .then(() =>
              set((state) => {
                state.isPlaying = true;
                state.isLoading = false;
              })
            )
            .catch((error) => {
              console.error("Error playing audio:", error);
              set((state) => {
                state.isLoading = false;
              });
            });
        }
      },

      seekTo: (time: number) => {
        const { audioElement } = get();
        if (audioElement) {
          audioElement.currentTime = time;
          set((state) => {
            state.currentTime = time;
          });
        }
      },

      setVolume: (volume: number) => {
        const { audioElement } = get();
        if (audioElement) {
          audioElement.volume = volume;
          set((state) => {
            state.volume = volume;
          });
        }
      },

      nextSong: () => {
        const { currentSong, currentPlaylist, audioElement } = get();
        const songs = currentPlaylist.songs;
        const currentIndex = songs.findIndex(
          (song) => song.id === currentSong?.id
        );
        const nextIndex = (currentIndex + 1) % songs.length;
        const nextSong = songs[nextIndex];

        set((state) => {
          state.isLoading = true;
        });

        if (audioElement) {
          audioElement.pause();
          audioElement.src = nextSong.audioUrl;
          audioElement.currentTime = 0;

          audioElement
            .play()
            .then(() =>
              set((state) => {
                state.isLoading = false;
              })
            )
            .catch((error) => {
              console.error("Error playing audio:", error);
              set((state) => {
                state.isLoading = false;
              });
            });
        }

        set((state) => {
          state.currentSong = nextSong;
          state.isPlaying = true;
          state.currentTime = 0;
        });
      },

      previousSong: () => {
        const { currentSong, currentPlaylist, audioElement } = get();
        const songs = currentPlaylist.songs;
        const currentIndex = songs.findIndex(
          (song) => song.id === currentSong?.id
        );
        const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
        const prevSong = songs[prevIndex];

        set((state) => {
          state.isLoading = true;
        });

        if (audioElement) {
          audioElement.pause();
          audioElement.src = prevSong.audioUrl;
          audioElement.currentTime = 0;

          audioElement
            .play()
            .then(() =>
              set((state) => {
                state.isLoading = false;
              })
            )
            .catch((error) => {
              console.error("Error playing audio:", error);
              set((state) => {
                state.isLoading = false;
              });
            });
        }

        set((state) => {
          state.currentSong = prevSong;
          state.isPlaying = true;
          state.currentTime = 0;
        });
      },

      setCurrentPlaylist: (playlist: Playlist) => {
        set((state) => {
          state.currentPlaylist = playlist;
        });
      },
    };
  })
);

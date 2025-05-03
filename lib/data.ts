import type { Playlist, Song } from "@/lib/types";

export const sampleSongs: Song[] = [
  {
    id: "song-1",
    title: "Daily Mix 1",
    artist: "Alex Paul, Patrick Micheal,Alex Paul, Patrick Micheal",
    album: "Summer with God (Original Motion Pictures Soundtrack)",
    duration: 289,
    coverUrl: "/playlist-1.png",
    audioUrl: "/song1.mp3",
  },
  {
    id: "song-2",
    title: "Lost",
    artist: "Alex Paul, Patrick Micheal",
    album: "Summer with God (Original Motion Pictures Soundtrack)",
    duration: 289,
    coverUrl: "/playlist-2.png",
    audioUrl: "/song1.mp3",
  },
  {
    id: "song-3",
    title: "Heaven",
    artist: "Alex Paul, Patrick Micheal",
    album: "Summer with God (Original Motion Pictures Soundtrack)",
    duration: 289,
    coverUrl: "/playlist-3.png",
    audioUrl: "/song1.mp3",
  },
  {
    id: "song-4",
    title: "Sad",
    artist: "Alex Paul, Patrick Micheal",
    album: "Summer with God (Original Motion Pictures Soundtrack)",
    duration: 289,
    coverUrl: "/playlist-4.png",
    audioUrl: "/song1.mp3",
  },
];

export const playlists: Playlist[] = [
  {
    id: "daily-mix-1",
    name: "Daily Mix 1",
    coverUrl: "/playlist-1.png",
    songs: sampleSongs,
  },
  {
    id: "awesome",
    name: "Awesome",
    coverUrl: "/playlist-2.png",
    songs: sampleSongs,
  },
  {
    id: "hardcore",
    name: "HARDCORE",
    coverUrl: "/playlist-3.png",
    songs: sampleSongs,
  },
  {
    id: "brain-radio",
    name: "BRAIN RADIO",
    coverUrl: "/playlist-4.png",
    songs: sampleSongs,
  },
  {
    id: "daily-mix-1",
    name: "Daily Mix 1",
    coverUrl: "/playlist-5.png",
    songs: sampleSongs,
  },
  {
    id: "awesome",
    name: "Awesome",
    coverUrl: "/playlist-6.png",
    songs: sampleSongs,
  },
  {
    id: "hardcore",
    name: "HARDCORE",
    coverUrl: "/playlist-7.png",
    songs: sampleSongs,
  },
  {
    id: "brain-radio",
    name: "BRAIN RADIO",
    coverUrl: "/playlist-8.png",
    songs: sampleSongs,
  },
  {
    id: "hardcore",
    name: "HARDCORE",
    coverUrl: "/playlist-2.png",
    songs: sampleSongs,
  },
  {
    id: "brain-radio",
    name: "BRAIN RADIO",
    coverUrl: "/playlist-5.png",
    songs: sampleSongs,
  },
];

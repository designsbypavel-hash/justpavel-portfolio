"use client";
import { createContext, useContext, useState } from "react";

export const TRACKS = [
  {
    id: "5r5cp9IpziiIsR6b93vcnQ",
    title: "Walking On A Dream",
    artist: "Empire of the Sun",
    mood: "Dream",
    art: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02f3aa0e6ca22a382007f61e4d",
  },
  {
    id: "3KkXRkHbMCARz0aVfEt68P",
    title: "Sunflower",
    artist: "Post Malone, Swae Lee",
    mood: "Sunlit",
    art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02e2e352d89826aef6dbd5ff8f",
  },
  {
    id: "5JVbvCHX10U2pLa5DEqGav",
    title: "Safe and Sound",
    artist: "Capital Cities",
    mood: "Ease",
    art: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02b03e92f4e7dcd9db3a06c869",
  },
] as const;

interface MusicContextValue {
  currentIndex: number;
  setCurrentIndex: (i: number) => void;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

const MusicContext = createContext<MusicContextValue | null>(null);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <MusicContext.Provider value={{ currentIndex, setCurrentIndex, isOpen, setIsOpen }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusicPlayer() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusicPlayer must be within MusicProvider");
  return ctx;
}

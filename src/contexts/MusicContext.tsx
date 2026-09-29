"use client";
import { createContext, useContext, useState } from "react";

export const TRACKS = [
  { id: "5r5cp9IpziiIsR6b93vcnQ", title: "Walking On A Dream", mood: "Dream" },
  { id: "3KkXRkHbMCARz0aVfEt68P", title: "Sunflower", mood: "Sunlit" },
  { id: "5JVbvCHX10U2pLa5DEqGav", title: "Safe and Sound", mood: "Ease" },
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
  if (!ctx) throw new Error("useMusicPlayer must be used within MusicProvider");
  return ctx;
}

"use client";
import { createContext, useContext, useState } from "react";

// Walking On A Dream plays by default — the vibe setter
export const DEFAULT_TRACK_ID = "5r5cp9IpziiIsR6b93vcnQ";

interface MusicContextValue {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

const MusicContext = createContext<MusicContextValue | null>(null);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <MusicContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusicPlayer() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusicPlayer must be within MusicProvider");
  return ctx;
}

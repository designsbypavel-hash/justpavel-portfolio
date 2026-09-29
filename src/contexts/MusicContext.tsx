"use client";
import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";

export const TRACKS = [
  { id: "5r5cp9IpziiIsR6b93vcnQ", title: "Walking On A Dream", mood: "Dream" },
  { id: "3KkXRkHbMCARz0aVfEt68P", title: "Sunflower", mood: "Sunlit" },
  { id: "5JVbvCHX10U2pLa5DEqGav", title: "Safe and Sound", mood: "Ease" },
] as const;

interface MusicContextValue {
  tracks: typeof TRACKS;
  currentIndex: number;
  isPlaying: boolean;
  isReady: boolean;
  needsInteraction: boolean;
  play: (index?: number) => void;
  pause: () => void;
  toggle: () => void;
  switchTo: (index: number) => void;
}

const MusicContext = createContext<MusicContextValue | null>(null);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(true);
  const controllersRef = useRef<any[]>([]);
  const readyCountRef = useRef(0);
  const pendingIndexRef = useRef<number | null>(null);

  useEffect(() => {
    (window as any).onSpotifyIframeApiReady = (IFrameAPI: any) => {
      TRACKS.forEach((track, i) => {
        const container = document.getElementById(`spotify-embed-${i}`);
        if (!container) return;
        IFrameAPI.createController(
          container,
          { uri: `spotify:track:${track.id}`, width: "100%", height: "80" },
          (controller: any) => {
            controllersRef.current[i] = controller;

            controller.addListener("ready", () => {
              readyCountRef.current += 1;
              if (readyCountRef.current === TRACKS.length) {
                setIsReady(true);
                // Attempt autoplay on first visit — browser may block it
                controller.play().catch?.(() => {
                  // Browser blocked autoplay; user needs to interact first
                });
              }
            });

            controller.addListener("playback_update", (e: any) => {
              if (e.data?.isPaused !== undefined) {
                setIsPlaying(!e.data.isPaused);
                if (!e.data.isPaused) setNeedsInteraction(false);
              }
            });
          }
        );
      });
    };

    if (!document.getElementById("spotify-iframe-api")) {
      const script = document.createElement("script");
      script.id = "spotify-iframe-api";
      script.src = "https://open.spotify.com/embed-podcast/iframe-api/v1";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  const play = useCallback(
    (index?: number) => {
      const target = index ?? currentIndex;
      const controller = controllersRef.current[target];
      if (!controller) return;

      // Pause the currently active controller if switching tracks
      if (target !== currentIndex) {
        controllersRef.current[currentIndex]?.pause();
        setCurrentIndex(target);
      }

      controller.play();
      setNeedsInteraction(false);
      setIsPlaying(true);
    },
    [currentIndex]
  );

  const pause = useCallback(() => {
    controllersRef.current[currentIndex]?.pause();
    setIsPlaying(false);
  }, [currentIndex]);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  const switchTo = useCallback(
    (index: number) => {
      if (index === currentIndex) {
        if (!isPlaying) play();
        return;
      }
      play(index);
    },
    [currentIndex, isPlaying, play]
  );

  return (
    <MusicContext.Provider
      value={{ tracks: TRACKS, currentIndex, isPlaying, isReady, needsInteraction, play, pause, toggle, switchTo }}
    >
      {children}
      {/* Spotify iFrame API containers — off-screen, not display:none (that breaks the API) */}
      <div
        aria-hidden="true"
        style={{ position: "fixed", left: "-9999px", top: 0, width: 300, pointerEvents: "none", opacity: 0 }}
      >
        {TRACKS.map((_, i) => (
          <div key={i} id={`spotify-embed-${i}`} style={{ width: 300, height: 80 }} />
        ))}
      </div>
    </MusicContext.Provider>
  );
}

export function useMusicPlayer() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusicPlayer must be used within MusicProvider");
  return ctx;
}

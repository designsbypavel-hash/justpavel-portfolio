"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { getJarvisReply, suggestedQuestions, type JarvisMessage } from "@/lib/jarvis";
import { playClickSound } from "@/lib/sound";

export default function JarvisChat() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<JarvisMessage[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [voiceOn, setVoiceOn] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Voice output
  const speakIfOn = useCallback(
    (text: string) => {
      if (!voiceOn || typeof window === "undefined" || !window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const fire = () => {
        const utter = new SpeechSynthesisUtterance(text);
        utter.rate = 0.9;
        utter.pitch = 0.8;
        utter.volume = 1;
        const voices = window.speechSynthesis.getVoices();
        const preferred =
          voices.find((v) => v.name === "Daniel") ||
          voices.find((v) => v.name.includes("Google UK English Male")) ||
          voices.find((v) => v.lang === "en-GB") ||
          voices.find((v) => v.lang.startsWith("en")) ||
          null;
        if (preferred) utter.voice = preferred;
        utter.onstart = () => setSpeaking(true);
        utter.onend = () => setSpeaking(false);
        utter.onerror = () => setSpeaking(false);
        window.speechSynthesis.speak(utter);
      };
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) fire();
      else window.speechSynthesis.addEventListener("voiceschanged", fire, { once: true });
    },
    [voiceOn]
  );

  function send(text: string) {
    if (!text.trim()) return;
    playClickSound();
    setMessages((prev) => [...prev, { role: "user", text: text.trim() }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply = getJarvisReply(text);
      setMessages((prev) => [...prev, { role: "jarvis", text: reply }]);
      setTyping(false);
      speakIfOn(reply);
    }, 650);
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") send(input);
  }

  function toggleVoiceOutput() {
    playClickSound();
    if (voiceOn) window.speechSynthesis?.cancel();
    setVoiceOn((v) => !v);
    setSpeaking(false);
  }

  function clearMessages() {
    playClickSound();
    setMessages([]);
    setInput("");
    window.speechSynthesis?.cancel();
    setSpeaking(false);
    recognitionRef.current?.stop();
    setIsListening(false);
  }

  // Voice input (speech-to-text)
  function toggleListening() {
    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.continuous = false;
    rec.interimResults = true;
    rec.lang = "en-US";
    rec.onstart = () => setIsListening(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((r: any) => r[0].transcript)
        .join("");
      setInput(transcript);
      if (event.results[0].isFinal) {
        send(transcript);
        setIsListening(false);
      }
    };
    rec.onend = () => setIsListening(false);
    rec.onerror = () => setIsListening(false);
    recognitionRef.current = rec;
    rec.start();
  }

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      window.speechSynthesis?.cancel();
    };
  }, []);

  // /games is a full-bleed embedded app with its own UI - a floating chat
  // trigger on top of it would sit above the game's own HUD for no reason.
  if (pathname?.startsWith("/games")) return null;

  return (
    <>
      {/* Floating trigger */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Tooltip */}
        {!open && (
          <div className="jv-label pointer-events-none">
            <span>Ask Jarvis</span>
          </div>
        )}

        <div className="jv-trigger-wrap relative flex h-14 w-14 items-center justify-center">
          {/* Orbital comet ring — a bright arc node orbiting the FAB */}
          <span className="jv-orbit pointer-events-none absolute" aria-hidden />

          {/* Ambient breathing glow */}
          <span className="jv-glow pointer-events-none absolute inset-0 rounded-full" aria-hidden />

          {/* Continuous sonar rings — always pulsing when panel is closed */}
          {!open && (
            <>
              <span className="jv-sonar jv-sonar-1 pointer-events-none absolute inset-0 rounded-full" aria-hidden />
              <span className="jv-sonar jv-sonar-2 pointer-events-none absolute inset-0 rounded-full" aria-hidden />
            </>
          )}

          <button
            type="button"
            onClick={() => { playClickSound(); setOpen((o) => !o); }}
            aria-label={open ? "Close Jarvis" : "Open Jarvis"}
            className="jv-trigger relative flex h-14 w-14 items-center justify-center rounded-full"
          >
            {/* Spinning conic ring inside */}
            <span className="jv-ring pointer-events-none absolute inset-0 rounded-full" aria-hidden />
            {/* Inner surface */}
            <span className="jv-inner absolute inset-[1.5px] rounded-full" aria-hidden />

            {/* Icon */}
            <span className="relative z-10 flex items-center justify-center">
              {open ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              ) : speaking ? (
                <span className="flex items-end gap-[2.5px]">
                  {[3, 7, 5, 9, 4].map((h, i) => (
                    <span
                      key={i}
                      className="jv-bar-el rounded-full"
                      style={{ width: 2.5, height: h, animationDelay: `${i * 0.11}s` }}
                    />
                  ))}
                </span>
              ) : (
                <span className="jv-monogram">J</span>
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Chat panel */}
      {open && (
        <div className="jv-panel fixed z-50 flex flex-col overflow-hidden">
          {/* Top accent line */}
          <div className="jv-top-line pointer-events-none absolute left-0 right-0 top-0 h-px" aria-hidden />

          {/* Header */}
          <div className="jv-header flex items-center justify-between px-4 py-3.5">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="jv-avatar relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full overflow-hidden">
                {(typing || speaking) && (
                  <span className="jv-scan pointer-events-none absolute inset-0" aria-hidden />
                )}
                <span className="jv-avatar-letter relative z-10">J</span>
              </div>
              <div>
                <p className="jv-name">Jarvis</p>
                <p className="jv-subtitle">
                  {typing ? "Thinking..." : speaking ? "Speaking..." : "Pavel's assistant"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-0.5">
              {/* Clear conversation — only when there are messages */}
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={clearMessages}
                  title="Clear conversation"
                  className="jv-icon-btn flex h-8 w-8 items-center justify-center rounded-lg"
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M2 3h9M5 3V2h3v1M10.5 3l-.7 8H3.2L2.5 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}

              {/* Voice output toggle */}
              <button
                type="button"
                onClick={toggleVoiceOutput}
                title={voiceOn ? "Mute Jarvis" : "Enable Jarvis voice"}
                className="jv-icon-btn flex h-8 w-8 items-center justify-center rounded-lg"
                data-active={voiceOn}
              >
                {voiceOn ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 5h2l3-3v10L4 9H2V5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                    <path d="M10 4.5a3 3 0 010 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 5h2l3-3v10L4 9H2V5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                    <line x1="10" y1="4" x2="13" y2="10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    <line x1="13" y1="4" x2="10" y2="10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                )}
              </button>

              {/* Close */}
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setOpen(false);
                  window.speechSynthesis?.cancel();
                  setSpeaking(false);
                  recognitionRef.current?.stop();
                }}
                className="jv-icon-btn flex h-8 w-8 items-center justify-center rounded-lg"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="jv-scroll-wrap">
          <div className="jv-scroll flex max-h-[340px] min-h-[160px] flex-col gap-3 overflow-y-auto px-4 py-4">
            {messages.length === 0 && (
              <div className="flex flex-col gap-2">
                <p className="jv-empty-headline">Jarvis is ready.</p>
                <p className="jv-empty-sub">Ask about Pavel's work, background, skills, or what he's building next.</p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                {msg.role === "jarvis" && (
                  <div className="jv-msg-avatar flex h-6 w-6 shrink-0 items-center justify-center rounded-full mt-0.5">
                    <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "-0.01em" }}>J</span>
                  </div>
                )}
                <div
                  className={`jv-bubble ${msg.role === "user" ? "jv-bubble-user" : "jv-bubble-jarvis"}`}
                  style={{ maxWidth: "82%" }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex gap-2.5">
                <div className="jv-msg-avatar flex h-6 w-6 shrink-0 items-center justify-center rounded-full mt-0.5">
                  <span style={{ fontSize: 9, fontWeight: 700 }}>J</span>
                </div>
                <div className="jv-bubble jv-bubble-jarvis flex items-center gap-[5px] py-3">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="jv-typing-dot rounded-full"
                      style={{ animationDelay: `${i * 0.18}s` }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
          </div>

          {/* Suggested questions */}
          {messages.length === 0 && (
            <div className="jv-suggestions px-4 pb-3">
              <div className="flex flex-wrap gap-1.5">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    className="jv-chip"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="jv-input-section px-4 pb-4 pt-3">
            <div className={`jv-input-wrap flex items-center gap-2 ${isListening ? "jv-input-wrap--listening" : ""}`}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={isListening ? "Listening..." : "Message Jarvis..."}
                className="jv-input flex-1 bg-transparent outline-none"
                readOnly={isListening}
              />

              {/* Mic button */}
              <button
                type="button"
                onClick={toggleListening}
                title={isListening ? "Stop recording" : "Speak to Jarvis"}
                className={`jv-mic-btn flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all ${isListening ? "jv-mic-btn--active" : ""}`}
              >
                {isListening ? (
                  <span className="jv-mic-live" />
                ) : (
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                    <rect x="3.5" y="0.5" width="5" height="8" rx="2.5" stroke="currentColor" strokeWidth="1.3" />
                    <path d="M1 6.5C1 9.26 3.24 11.5 6 11.5s5-2.24 5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    <line x1="6" y1="11.5" x2="6" y2="13.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                )}
              </button>

              {/* Send button */}
              <button
                type="button"
                onClick={() => send(input)}
                disabled={!input.trim() || isListening}
                className="jv-send-btn flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                data-active={!!input.trim() && !isListening}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M1 6h9M7 2.5l3.5 3.5L7 9.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            {isListening && (
              <p className="jv-listening-hint">Speak now. Jarvis is listening.</p>
            )}
          </div>
        </div>
      )}

      <style>{`
        /* ── FAB Wrapper ── */
        .jv-trigger-wrap {
          animation: jv-fab-in 0.55s cubic-bezier(0.16,1,0.3,1) 0.3s both;
        }
        @keyframes jv-fab-in {
          from { opacity: 0; transform: scale(0.6) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* Orbital comet ring — bright cyan-blue arc node */
        .jv-orbit {
          inset: -8px;
          border-radius: 50%;
          width: calc(100% + 16px);
          height: calc(100% + 16px);
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            transparent 298deg,
            rgba(120,200,255,0.06) 318deg,
            rgba(155,220,255,0.92) 342deg,
            rgba(200,235,255,0.28) 352deg,
            transparent 360deg
          );
          -webkit-mask: radial-gradient(circle, transparent calc(100% - 1.5px), white calc(100% - 1.5px));
          mask: radial-gradient(circle, transparent calc(100% - 1.5px), white calc(100% - 1.5px));
          animation: jv-orbit-spin 4s linear infinite;
        }
        [data-theme="light"] .jv-orbit {
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            transparent 298deg,
            rgba(0,0,0,0.04) 318deg,
            rgba(0,0,0,0.60) 342deg,
            rgba(0,0,0,0.14) 352deg,
            transparent 360deg
          );
        }
        @keyframes jv-orbit-spin { to { transform: rotate(360deg); } }

        /* Ambient breathing glow — colored electric blue corona */
        .jv-glow {
          animation: jv-breathe 3.5s ease-in-out 0.6s infinite;
        }
        @keyframes jv-breathe {
          0%, 100% {
            box-shadow:
              0 0 22px 6px rgba(100,185,255,0.10),
              0 0 0 1px rgba(120,200,255,0.06);
          }
          50% {
            box-shadow:
              0 0 52px 18px rgba(100,185,255,0.22),
              0 0 90px 32px rgba(100,185,255,0.07),
              0 0 0 1px rgba(140,210,255,0.14);
          }
        }
        [data-theme="light"] .jv-glow {
          animation: jv-breathe-light 3.5s ease-in-out 0.6s infinite;
        }
        @keyframes jv-breathe-light {
          0%, 100% { box-shadow: 0 0 22px 8px rgba(0,0,0,0.18), 0 8px 32px rgba(0,0,0,0.14); }
          50%       { box-shadow: 0 0 52px 22px rgba(0,0,0,0.28), 0 12px 48px rgba(0,0,0,0.22), 0 0 80px 30px rgba(0,0,0,0.10); }
        }

        /* ── Trigger button ── */
        .jv-trigger {
          color: rgba(255,255,255,0.72);
          box-shadow:
            0 6px 28px rgba(0,0,0,0.60),
            0 1px 4px rgba(0,0,0,0.30),
            0 0 0 1px rgba(120,200,255,0.07);
          transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease;
        }
        .jv-trigger:hover {
          transform: scale(1.08);
          box-shadow:
            0 10px 40px rgba(0,0,0,0.70),
            0 0 0 8px rgba(100,185,255,0.07),
            0 0 36px rgba(100,185,255,0.18);
        }
        .jv-trigger:active { transform: scale(0.96); }

        /* Inner surface — dark navy orb with blue-tinted specular highlight */
        .jv-inner {
          background:
            radial-gradient(ellipse at 36% 28%, rgba(155,220,255,0.28) 0%, rgba(100,185,255,0.08) 38%, transparent 62%),
            radial-gradient(ellipse at 66% 70%, rgba(60,120,200,0.10) 0%, transparent 55%),
            rgba(9,11,18,0.90);
          border: 1px solid rgba(130,205,255,0.22);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
        }
        [data-theme="light"] .jv-inner {
          background:
            radial-gradient(ellipse at 36% 28%, rgba(255,255,255,0.26) 0%, transparent 58%),
            rgba(9,11,18,0.94);
          border: 1px solid rgba(255,255,255,0.20);
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
        }

        /* Spinning conic ring inside the button — subtle blue tint */
        .jv-ring {
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            rgba(120,200,255,0.14) 60deg,
            transparent 120deg,
            rgba(100,180,255,0.04) 220deg,
            transparent 300deg
          );
          animation: jv-spin 9s linear infinite;
        }
        @keyframes jv-spin { to { transform: rotate(360deg); } }

        /* Continuous sonar rings — electric blue ping */
        .jv-sonar {
          border-radius: 50%;
          position: absolute;
          inset: 0;
          opacity: 0;
        }
        .jv-sonar-1 {
          animation: jv-sonar-pulse 3s cubic-bezier(0.16,1,0.3,1) 0s infinite;
        }
        .jv-sonar-2 {
          animation: jv-sonar-pulse 3s cubic-bezier(0.16,1,0.3,1) 1.5s infinite;
        }
        @keyframes jv-sonar-pulse {
          0%   { box-shadow: 0 0 0 0px rgba(120,200,255,0.40); opacity: 1; }
          100% { box-shadow: 0 0 0 38px rgba(120,200,255,0); opacity: 0; }
        }
        [data-theme="light"] .jv-sonar-1,
        [data-theme="light"] .jv-sonar-2 {
          animation-name: jv-sonar-pulse-light;
        }
        @keyframes jv-sonar-pulse-light {
          0%   { box-shadow: 0 0 0 0px rgba(0,0,0,0.38); opacity: 1; }
          100% { box-shadow: 0 0 0 44px rgba(0,0,0,0); opacity: 0; }
        }

        /* Monogram — bright with subtle glow */
        .jv-monogram {
          font-family: var(--font-heading, system-ui, sans-serif);
          font-size: 20px;
          font-weight: 700;
          color: rgba(255,255,255,0.96);
          letter-spacing: -0.03em;
          line-height: 1;
          text-shadow: 0 0 18px rgba(150,215,255,0.55);
        }

        /* Audio bars */
        .jv-bar-el {
          background: rgba(255,255,255,0.72);
          animation: jv-bar 0.9s ease-in-out infinite;
        }
        @keyframes jv-bar {
          0%, 100% { transform: scaleY(0.4); opacity: 0.4; }
          50%       { transform: scaleY(1.6); opacity: 1; }
        }

        /* Tooltip label — high-contrast inverted pill */
        .jv-label { animation: jv-label-in 0.28s cubic-bezier(0.16,1,0.3,1) 1.1s both; }
        .jv-label span {
          display: block;
          font-size: 12px;
          font-weight: 600;
          padding: 6px 13px;
          border-radius: 20px;
          white-space: nowrap;
          /* Dark mode: WHITE pill — max contrast on dark page */
          color: rgba(9,11,20,0.90);
          background: rgba(246,249,255,0.98);
          border: 1px solid rgba(255,255,255,0.30);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 4px 24px rgba(0,0,0,0.50), 0 1px 3px rgba(0,0,0,0.20);
          letter-spacing: 0.005em;
        }
        /* Light mode: DARK pill — max contrast on light page */
        [data-theme="light"] .jv-label span {
          color: rgba(240,245,255,0.97);
          background: rgba(9,11,20,0.94);
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 4px 24px rgba(0,0,0,0.30), 0 1px 3px rgba(0,0,0,0.18);
        }
        @keyframes jv-label-in {
          from { opacity: 0; transform: translateX(6px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* ── Panel ── */
        .jv-panel {
          bottom: 88px;
          right: 16px;
          width: min(400px, calc(100vw - 32px));
          border-radius: 16px;
          animation: jv-panel-in 0.26s cubic-bezier(0.16,1,0.3,1) both;
          background: rgba(18,18,26,0.92);
          border: 1px solid rgba(255,255,255,0.16);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.06),
            0 32px 80px rgba(0,0,0,0.80),
            0 8px 24px rgba(0,0,0,0.45),
            inset 0 1px 0 rgba(255,255,255,0.12),
            inset 0 0 0 1px rgba(255,255,255,0.04);
          backdrop-filter: blur(40px) saturate(160%);
          -webkit-backdrop-filter: blur(40px) saturate(160%);
        }
        [data-theme="light"] .jv-panel {
          background: rgba(254,254,255,0.98);
          border: 1px solid rgba(0,0,0,0.08);
          box-shadow: 0 20px 60px rgba(0,0,0,0.13), 0 4px 16px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.05);
        }
        @keyframes jv-panel-in {
          from { opacity: 0; transform: translateY(14px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Top hairline gradient */
        .jv-top-line {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22) 30%, rgba(255,255,255,0.14) 70%, transparent);
        }
        [data-theme="light"] .jv-top-line {
          background: linear-gradient(90deg, transparent, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.03) 70%, transparent);
        }

        /* Header */
        .jv-header { border-bottom: 1px solid rgba(255,255,255,0.10); }
        [data-theme="light"] .jv-header { border-bottom: 1px solid rgba(0,0,0,0.08); }

        /* Avatar */
        .jv-avatar {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
        }
        [data-theme="light"] .jv-avatar {
          background: #111111;
          border: 1px solid rgba(0,0,0,0.08);
        }
        .jv-avatar-letter {
          font-family: var(--font-heading, system-ui, sans-serif);
          font-size: 13px;
          font-weight: 700;
          color: rgba(255,255,255,0.82);
        }

        /* Scanning shimmer */
        .jv-scan {
          background: linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.14) 50%, transparent 100%);
          animation: jv-scan-sweep 1.6s ease-in-out infinite;
        }
        @keyframes jv-scan-sweep {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }

        /* Name + subtitle — no status dot */
        .jv-name {
          font-size: 13.5px;
          font-weight: 600;
          line-height: 1.2;
          color: rgba(255,255,255,0.9);
        }
        [data-theme="light"] .jv-name { color: rgba(17,17,17,0.9); }
        .jv-subtitle {
          font-size: 11.5px;
          color: rgba(255,255,255,0.3);
          line-height: 1;
          margin-top: 2px;
        }
        [data-theme="light"] .jv-subtitle { color: rgba(17,17,17,0.38); }

        /* Icon buttons */
        .jv-icon-btn {
          color: rgba(255,255,255,0.22);
          transition: color 0.15s ease, background 0.15s ease;
        }
        .jv-icon-btn:hover { color: rgba(255,255,255,0.52); background: rgba(255,255,255,0.05); }
        .jv-icon-btn[data-active="true"] { color: rgba(255,255,255,0.72) !important; background: rgba(255,255,255,0.07); }
        [data-theme="light"] .jv-icon-btn { color: rgba(17,17,17,0.28); }
        [data-theme="light"] .jv-icon-btn:hover { color: rgba(17,17,17,0.6); background: rgba(0,0,0,0.04); }
        [data-theme="light"] .jv-icon-btn[data-active="true"] { color: rgba(17,17,17,0.8) !important; background: rgba(0,0,0,0.06); }

        /* Empty state */
        .jv-empty-headline {
          font-size: 15px;
          font-weight: 600;
          color: rgba(255,255,255,0.82);
          line-height: 1.3;
          letter-spacing: -0.02em;
        }
        [data-theme="light"] .jv-empty-headline { color: rgba(17,17,17,0.85); }
        .jv-empty-sub {
          font-size: 13px;
          color: rgba(255,255,255,0.28);
          line-height: 1.6;
        }
        [data-theme="light"] .jv-empty-sub { color: rgba(17,17,17,0.38); }

        /* Message avatar */
        .jv-msg-avatar {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.09);
          color: rgba(255,255,255,0.72);
        }
        [data-theme="light"] .jv-msg-avatar {
          background: #111111;
          border: 1px solid rgba(0,0,0,0.06);
          color: rgba(255,255,255,0.82);
        }

        /* Bubbles */
        /* Bubble entrance — blur + lift, ease-in-out */
        @keyframes jv-msg-in {
          0%   { opacity: 0; transform: translateY(10px) scale(0.96); filter: blur(5px); }
          40%  { filter: blur(0); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        .jv-bubble { animation: jv-msg-in 0.42s cubic-bezier(0.4,0,0.2,1) both; }

        .jv-bubble {
          font-size: 13.5px;
          line-height: 1.6;
          border-radius: 14px;
          padding: 8px 12px;
        }
        .jv-bubble-user {
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.09);
          color: rgba(255,255,255,0.88);
          border-bottom-right-radius: 4px;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.07);
        }
        [data-theme="light"] .jv-bubble-user {
          background: #111111;
          border: 1px solid transparent;
          color: rgba(255,255,255,0.88);
          box-shadow: none;
        }
        .jv-bubble-jarvis {
          background: transparent;
          color: rgba(255,255,255,0.68);
          padding-left: 0;
          padding-right: 0;
          border-radius: 0;
        }
        [data-theme="light"] .jv-bubble-jarvis { color: rgba(17,17,17,0.72); }

        /* Typing dots */
        .jv-typing-dot {
          width: 5px;
          height: 5px;
          background: rgba(255,255,255,0.25);
          animation: jv-typing 1.3s ease-in-out infinite;
        }
        [data-theme="light"] .jv-typing-dot { background: rgba(17,17,17,0.22); }
        @keyframes jv-typing {
          0%, 100% { opacity: 0.25; transform: translateY(0); }
          50%       { opacity: 0.75; transform: translateY(-3px); }
        }

        /* Suggested chips */
        .jv-suggestions {
          border-top: 1px solid rgba(255,255,255,0.05);
          padding-top: 12px;
        }
        [data-theme="light"] .jv-suggestions { border-top: 1px solid rgba(0,0,0,0.06); }
        .jv-chip {
          font-size: 12px;
          font-weight: 500;
          padding: 6px 11px;
          border-radius: 20px;
          color: rgba(255,255,255,0.4);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          transition: all 0.15s ease;
          line-height: 1;
        }
        .jv-chip:hover {
          color: rgba(255,255,255,0.75);
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.12);
        }
        [data-theme="light"] .jv-chip {
          color: rgba(17,17,17,0.48);
          background: rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.09);
        }
        [data-theme="light"] .jv-chip:hover {
          color: rgba(17,17,17,0.82);
          background: rgba(0,0,0,0.07);
        }

        /* Input section */
        .jv-input-section { border-top: 1px solid rgba(255,255,255,0.10); }
        [data-theme="light"] .jv-input-section { border-top: 1px solid rgba(0,0,0,0.08); }
        .jv-input-wrap {
          border-radius: 12px;
          padding: 9px 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .jv-input-wrap:focus-within {
          border-color: rgba(255,255,255,0.14) !important;
          background: rgba(255,255,255,0.06) !important;
        }
        .jv-input-wrap--listening {
          border-color: rgba(239,68,68,0.35) !important;
          background: rgba(239,68,68,0.04) !important;
          animation: jv-listen-pulse 1.5s ease-in-out infinite;
        }
        @keyframes jv-listen-pulse {
          0%, 100% { border-color: rgba(239,68,68,0.25); }
          50%       { border-color: rgba(239,68,68,0.45); }
        }
        [data-theme="light"] .jv-input-wrap {
          background: rgba(0,0,0,0.03);
          border: 1px solid rgba(0,0,0,0.09);
        }
        [data-theme="light"] .jv-input-wrap:focus-within {
          border-color: rgba(0,0,0,0.18) !important;
          background: rgba(0,0,0,0.05) !important;
        }
        .jv-input { font-size: 13.5px; color: rgba(255,255,255,0.8); }
        .jv-input::placeholder { color: rgba(255,255,255,0.18); }
        [data-theme="light"] .jv-input { color: rgba(17,17,17,0.8); }
        [data-theme="light"] .jv-input::placeholder { color: rgba(17,17,17,0.28); }

        /* Mic button */
        .jv-mic-btn {
          color: rgba(255,255,255,0.25);
          background: transparent;
          transition: color 0.15s ease, background 0.15s ease;
        }
        .jv-mic-btn:hover { color: rgba(255,255,255,0.55); background: rgba(255,255,255,0.05); }
        .jv-mic-btn--active { color: #ef4444 !important; background: rgba(239,68,68,0.1) !important; }
        [data-theme="light"] .jv-mic-btn { color: rgba(17,17,17,0.28); }
        [data-theme="light"] .jv-mic-btn:hover { color: rgba(17,17,17,0.6); background: rgba(0,0,0,0.04); }
        [data-theme="light"] .jv-mic-btn--active { color: #ef4444 !important; background: rgba(239,68,68,0.07) !important; }

        /* Mic live indicator */
        .jv-mic-live {
          display: block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ef4444;
          animation: jv-mic-blink 0.8s ease-in-out infinite;
        }
        @keyframes jv-mic-blink {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.8); }
        }

        /* Listening hint */
        .jv-listening-hint {
          margin-top: 6px;
          font-size: 11.5px;
          color: rgba(239,68,68,0.65);
          padding-left: 2px;
        }
        [data-theme="light"] .jv-listening-hint { color: rgba(185,28,28,0.65); }

        /* Send button */
        .jv-send-btn {
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.25);
          transition: all 0.15s ease;
        }
        .jv-send-btn[data-active="true"] {
          background: rgba(255,255,255,0.92);
          color: #0b0b0d;
        }
        .jv-send-btn[data-active="true"]:hover { background: #ffffff; }
        .jv-send-btn:disabled { opacity: 0.2; }
        [data-theme="light"] .jv-send-btn { background: rgba(0,0,0,0.05); color: rgba(17,17,17,0.28); }
        [data-theme="light"] .jv-send-btn[data-active="true"] { background: #111111; color: #ffffff; }

        /* Scrollbar */
        .jv-scroll::-webkit-scrollbar { width: 3px; }
        .jv-scroll::-webkit-scrollbar-track { background: transparent; }
        .jv-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.07); border-radius: 99px; }
        [data-theme="light"] .jv-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); }

        /* Reduced motion */
        /* Scroll ambient fade — depth at bottom */
        .jv-scroll-wrap {
          position: relative;
        }
        .jv-scroll-wrap::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 40px;
          background: linear-gradient(to bottom, transparent, rgba(18,18,26,0.80));
          pointer-events: none;
          border-radius: 0 0 4px 4px;
        }
        [data-theme="light"] .jv-scroll-wrap::after {
          background: linear-gradient(to bottom, transparent, rgba(254,254,255,0.90));
        }

        @media (prefers-reduced-motion: reduce) {
          .jv-orbit, .jv-glow, .jv-ring, .jv-scan, .jv-bar-el, .jv-sonar { animation: none !important; }
          .jv-trigger-wrap, .jv-panel { animation: none !important; }
          .jv-bubble { animation: none !important; }
        }
      `}</style>
    </>
  );
}

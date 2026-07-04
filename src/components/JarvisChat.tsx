"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { getJarvisReply, suggestedQuestions, type JarvisMessage } from "@/lib/jarvis";
import { playClickSound } from "@/lib/sound";

export default function JarvisChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<JarvisMessage[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [voiceOn, setVoiceOn] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Wake word: "Hey Jarvis"
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = false;
    rec.lang = "en-US";
    recognitionRef.current = rec;

    rec.onresult = (e: any) => {
      const transcript = Array.from(e.results as any[])
        .map((r: any) => r[0].transcript)
        .join(" ")
        .toLowerCase();
      if (transcript.includes("hey jarvis") || transcript.includes("hi jarvis")) {
        setOpen(true);
        setListening(false);
        rec.stop();
        setTimeout(() => {
          const greeting = "Hello! I'm Jarvis, Pavel's AI assistant. How can I help you today?";
          setMessages((prev) =>
            prev.length === 0 ? [{ role: "jarvis", text: greeting }] : prev
          );
        }, 300);
      }
    };

    rec.onerror = () => setListening(false);
    rec.onend = () => {
      // Restart if still in wake-word mode
      if (recognitionRef.current && !open) {
        try { rec.start(); } catch {}
      }
    };

    try {
      rec.start();
      setListening(true);
    } catch {}

    return () => { try { rec.stop(); } catch {} };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    }, 600);
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") send(input);
  }

  function toggleVoice() {
    playClickSound();
    if (voiceOn) window.speechSynthesis?.cancel();
    setVoiceOn((v) => !v);
    setSpeaking(false);
  }

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50" style={{ width: 56, height: 56 }}>
        <button
          type="button"
          onClick={() => { playClickSound(); setOpen((o) => !o); }}
          aria-label="Open Jarvis"
          className="relative flex h-14 w-14 items-center justify-center rounded-full transition-all hover:scale-110"
          style={{
            background: "linear-gradient(135deg, #f97316 0%, #6366f1 50%, #a855f7 80%, #ffffff 100%)",
            border: "2px solid rgba(255,255,255,0.85)",
            boxShadow: "0 0 20px rgba(249,115,22,0.5), 0 0 40px rgba(99,102,241,0.4), 0 0 60px rgba(168,85,247,0.3)",
          }}
        >
          <div className="flex items-center gap-[3px]">
            {[
              { color: "#f97316", delay: "0s" },
              { color: "#ffffff", delay: "0.15s" },
              { color: "#a855f7", delay: "0.3s" },
              { color: "#ffffff", delay: "0.45s" },
              { color: "#6366f1", delay: "0.6s" },
            ].map((d, i) => (
              <span
                key={i}
                className="rounded-full"
                style={{
                  width: 4,
                  height: 4,
                  background: d.color,
                  boxShadow: `0 0 4px ${d.color}`,
                  animation: `gmini-bounce 1.2s ease-in-out infinite`,
                  animationDelay: d.delay,
                }}
              />
            ))}
          </div>
        </button>
        {!open && (
          <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-widest" style={{ background: "rgba(0,0,0,0.75)", color: "rgba(255,255,255,0.8)" }}>
            JARVIS
          </span>
        )}
      </div>

      {/* Chat window — clean white card */}
      {open && (
        <div
          className="fixed bottom-24 right-4 z-50 flex flex-col overflow-hidden rounded-2xl"
          style={{
            width: "min(420px, calc(100vw - 32px))",
            background: "#ffffff",
            boxShadow: "0 8px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08)",
            border: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
            <div className="flex items-center gap-3">
              <span className="text-base font-bold tracking-tight text-gray-900">Ask Jarvis</span>
              <span
                className="h-3 w-3 rounded-full"
                style={{
                  background: speaking
                    ? "linear-gradient(135deg, #f97316, #6366f1)"
                    : "linear-gradient(135deg, #f97316, #a855f7)",
                  boxShadow: speaking ? "0 0 8px rgba(99,102,241,0.6)" : "none",
                }}
              />
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={toggleVoice}
                title={voiceOn ? "Mute" : "Unmute"}
                className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
                style={{ color: voiceOn ? "#6366f1" : "#9ca3af" }}
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
              <button
                type="button"
                onClick={() => { playClickSound(); setOpen(false); window.speechSynthesis?.cancel(); setSpeaking(false); }}
                className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex max-h-[380px] min-h-[200px] flex-col gap-3 overflow-y-auto px-5 py-5">
            {messages.length === 0 && (
              <p className="text-sm text-gray-400">Ask me anything about Pavel's work, background, or availability.</p>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[88%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
                  style={
                    msg.role === "user"
                      ? { background: "#1d1d1f", color: "white" }
                      : { background: "#f3f4f6", color: "#111827" }
                  }
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl bg-gray-100 px-4 py-3">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-gray-400"
                      style={{ animation: `dotpulse 1.2s ease-in-out ${i * 0.2}s infinite` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggested questions */}
          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2 px-5 pb-4">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  className="rounded-full border border-gray-200 px-3 py-1.5 text-xs text-gray-600 transition-colors hover:border-gray-400 hover:text-gray-900"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-5 pb-5 pt-2" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 transition-all focus-within:border-indigo-400">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask me anything about my work..."
                className="jarvis-input flex-1 bg-transparent text-sm text-gray-800 outline-none"
              />
              <button
                type="button"
                onClick={() => send(input)}
                disabled={!input.trim()}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white transition-opacity disabled:opacity-30"
                style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes dotpulse {
          0%, 100% { opacity: 0.4; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes gmini-bounce {
          0%, 100% { transform: scaleY(1); opacity: 0.7; }
          50% { transform: scaleY(2.8); opacity: 1; }
        }
        .jarvis-input::placeholder { color: #9ca3af; }
      `}</style>
    </>
  );
}

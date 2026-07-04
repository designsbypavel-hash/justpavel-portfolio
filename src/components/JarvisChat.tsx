"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { getJarvisReply, suggestedQuestions, type JarvisMessage } from "@/lib/jarvis";
import { playClickSound } from "@/lib/sound";


export default function JarvisChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<JarvisMessage[]>([
    {
      role: "jarvis",
      text: "Good day. I'm Jarvis — Pavel's AI assistant. Ask me anything about his experience, skills, or availability.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const speakIfOn = useCallback(
    (text: string) => {
      if (!voiceOn || typeof window === "undefined" || !window.speechSynthesis) return;
      window.speechSynthesis.cancel();

      const fire = () => {
        const utter = new SpeechSynthesisUtterance(text);
        utter.rate = 0.9;
        utter.pitch = 0.8;
        utter.volume = 1;
        // Pick best English voice — prefer Daniel (Mac) or Google UK Male (Chrome)
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
      if (voices.length > 0) {
        fire();
      } else {
        // Chrome loads voices async — wait for the event then fire
        window.speechSynthesis.addEventListener("voiceschanged", fire, { once: true });
      }
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
      <div className="fixed bottom-6 right-6 z-50">
        {/* Pulse rings */}
        {!open && (
          <>
            <span className="absolute inset-0 rounded-full jarvis-ring" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(59,130,246,0.1) 60%, transparent 100%)", animationDelay: "0s" }} />
            <span className="absolute inset-0 rounded-full jarvis-ring" style={{ background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(99,102,241,0.07) 60%, transparent 100%)", animationDelay: "0.8s" }} />
          </>
        )}
        <button
          onClick={() => { playClickSound(); setOpen((o) => !o); }}
          aria-label="Open Jarvis"
          className="relative flex h-14 w-14 items-center justify-center rounded-full transition-all hover:scale-110"
          style={{
            background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 40%, #a855f7 70%, #ffffff 100%)",
            border: "2px solid rgba(255,255,255,0.9)",
            boxShadow: "0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(168,85,247,0.9), 0 0 70px rgba(99,102,241,0.6)",
          }}
        >
          {/* Jarvis arc icon */}
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <circle cx="13" cy="13" r="10" stroke="#60a5fa" strokeWidth="1.2" opacity="0.6" />
            <circle cx="13" cy="13" r="6" stroke="#93c5fd" strokeWidth="1" opacity="0.5" />
            <circle cx="13" cy="13" r="2.5" fill="#bfdbfe" opacity="0.9" />
            <line x1="13" y1="3" x2="13" y2="7" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="13" y1="19" x2="13" y2="23" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="3" y1="13" x2="7" y2="13" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="19" y1="13" x2="23" y2="13" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
            {speaking && (
              <>
                <circle cx="13" cy="13" r="8" stroke="#60a5fa" strokeWidth="1" opacity="0.4" strokeDasharray="3 3">
                  <animateTransform attributeName="transform" type="rotate" from="0 13 13" to="360 13 13" dur="3s" repeatCount="indefinite" />
                </circle>
              </>
            )}
          </svg>
        </button>
        {/* Label */}
        {!open && (
          <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-widest" style={{ background: "rgba(0,0,0,0.8)", border: "1px solid rgba(96,165,250,0.2)", color: "rgba(147,197,253,0.8)" }}>
            JARVIS
          </span>
        )}
      </div>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-4 z-50 flex flex-col overflow-hidden rounded-2xl backdrop-blur-xl" style={{ width: "min(380px, calc(100vw - 32px))", background: "rgba(5,5,20,0.97)", border: "1.5px solid rgba(124,58,237,0.4)", boxShadow: "0 0 30px rgba(124,58,237,0.3), 0 0 60px rgba(59,130,246,0.15)" }}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid rgba(120,180,255,0.1)", background: "linear-gradient(135deg, rgba(10,15,46,0.9) 0%, rgba(26,10,61,0.8) 100%)" }}>
            <div className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-blue-400/30 bg-blue-950/50">
                <svg width="18" height="18" viewBox="0 0 26 26" fill="none">
                  <circle cx="13" cy="13" r="10" stroke="#60a5fa" strokeWidth="1.2" opacity="0.5" />
                  <circle cx="13" cy="13" r="2.5" fill="#bfdbfe" opacity="0.9" />
                  <line x1="13" y1="3" x2="13" y2="7" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="13" y1="19" x2="13" y2="23" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="3" y1="13" x2="7" y2="13" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="19" y1="13" x2="23" y2="13" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {speaking && (
                  <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border border-black bg-blue-400">
                    <span className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75" />
                  </span>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold tracking-wide text-blue-200">JARVIS</p>
                <p className="text-[10px] uppercase tracking-widest text-blue-400/50">
                  {speaking ? "Speaking…" : "Pavel's AI assistant"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {/* Voice toggle */}
              <button
                onClick={toggleVoice}
                title={voiceOn ? "Mute voice" : "Unmute voice"}
                className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                  voiceOn
                    ? "text-blue-400 hover:bg-blue-400/10"
                    : "text-white/25 hover:bg-white/10 hover:text-white/50"
                }`}
              >
                {voiceOn ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 5h2l3-3v10L4 9H2V5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                    <path d="M10 4.5a3 3 0 010 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 5h2l3-3v10L4 9H2V5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                    <line x1="10" y1="4" x2="13" y2="10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    <line x1="13" y1="4" x2="10" y2="10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                )}
              </button>
              <button
                onClick={() => { playClickSound(); setOpen(false); window.speechSynthesis?.cancel(); setSpeaking(false); }}
                className="flex h-7 w-7 items-center justify-center rounded-full text-white/30 transition-colors hover:bg-white/10 hover:text-white/70"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex max-h-[360px] flex-col gap-3 overflow-y-auto px-4 py-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[88%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-white/10 text-white"
                      : "text-white"
                  }`}
                  style={msg.role === "jarvis" ? { background: "rgba(30,50,100,0.3)", border: "1px solid rgba(96,165,250,0.15)" } : {}}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-xl border border-blue-400/10 bg-blue-950/20 px-3 py-2">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-blue-400/60"
                      style={{ animation: `dotpulse 1.2s ease-in-out ${i * 0.2}s infinite` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggested questions */}
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 border-t border-white/8 px-4 py-3">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full px-3 py-1 text-xs transition-colors hover:text-white" style={{ border: "1px solid rgba(96,165,250,0.35)", color: "rgba(147,197,253,0.9)" }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-white/8 px-4 py-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask Jarvis anything…"
              className="jarvis-input flex-1 bg-transparent text-sm outline-none" style={{ color: "rgba(255,255,255,0.9)" }}
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim()}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-400/20 bg-blue-950/40 text-blue-300/60 transition-colors hover:border-blue-400/40 hover:text-blue-300 disabled:opacity-30"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes dotpulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes jarvis-ping {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .jarvis-ring {
          animation: jarvis-ping 2.4s ease-out infinite;
        }
        .jarvis-input::placeholder { color: rgba(167,139,250,0.6); }
      `}</style>
    </>
  );
}


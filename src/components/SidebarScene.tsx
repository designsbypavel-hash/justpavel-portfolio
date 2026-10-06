"use client";

// ─── Sidebar walking scene ────────────────────────────────────────────────────
// Headless figure (inspired by the Android-Mobile illustration aesthetic)
// walks in front of a dense, zoomed-in city that scrolls endlessly.
// All inline SVG — zero external assets.

export default function SidebarScene({ expanded }: { expanded: boolean }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: "100%",
        height: 128,
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
        opacity: expanded ? 1 : 0,
        transition: "opacity 0.22s ease",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      <style>{`
        /* ── City scroll ─────────────────────────────────────────── */
        @keyframes sb-city {
          from { transform: scale(2.8) translateX(0%)   translateY(6px); }
          to   { transform: scale(2.8) translateX(-50%) translateY(6px); }
        }
        .sb-city-track {
          position: absolute;
          bottom: 0; left: 0;
          width: 200%;
          height: 100%;
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          transform-origin: 0 100%;
          animation: sb-city 22s linear infinite;
          will-change: transform;
        }

        /* ── Figure bob ──────────────────────────────────────────── */
        @keyframes sb-bob {
          0%,100% { transform: translate(-50%, 0px); }
          50%      { transform: translate(-50%, -2px); }
        }
        .sb-figure {
          position: absolute;
          bottom: 0px;
          left: 42%;
          transform: translateX(-50%);
          z-index: 3;
          animation: sb-bob 0.6s ease-in-out infinite;
          width: 26px;
          height: 52px;
        }

        /* ── Limb animations — CSS rotate around explicit SVG point ─ */
        @keyframes sb-arm-l {
          0%,100% { transform: rotate(-22deg); }
          50%      { transform: rotate(22deg);  }
        }
        @keyframes sb-arm-r {
          0%,100% { transform: rotate(22deg);  }
          50%      { transform: rotate(-22deg); }
        }
        @keyframes sb-leg-l {
          0%,100% { transform: rotate(-18deg); }
          50%      { transform: rotate(18deg);  }
        }
        @keyframes sb-leg-r {
          0%,100% { transform: rotate(18deg);  }
          50%      { transform: rotate(-18deg); }
        }

        .sb-arm-l { transform-origin: 7px 10px;  animation: sb-arm-l 0.6s ease-in-out infinite; }
        .sb-arm-r { transform-origin: 19px 10px; animation: sb-arm-r 0.6s ease-in-out infinite; }
        .sb-leg-l { transform-origin: 10px 26px; animation: sb-leg-l 0.6s ease-in-out infinite; }
        .sb-leg-r { transform-origin: 16px 26px; animation: sb-leg-r 0.6s ease-in-out infinite; }

        /* Ground line */
        .sb-ground {
          position: absolute;
          bottom: 18px; left: 0; right: 0;
          height: 1px;
          background: rgba(255,255,255,0.14);
        }
      `}</style>

      {/* ── Scrolling city ──────────────────────────────────────────────────── */}
      <div className="sb-city-track">
        {/* Block A */}
        <CityBlock />
        {/* Block B — seamless duplicate */}
        <CityBlock />
      </div>

      {/* ── Ground line ─────────────────────────────────────────────────────── */}
      <div className="sb-ground" />

      {/* ── Walking figure ──────────────────────────────────────────────────── */}
      <svg
        className="sb-figure"
        viewBox="0 0 26 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Collar — top of headless body */}
        <path d="M9 4 Q13 2 17 4" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round"/>

        {/* Torso / jacket */}
        <path
          d="M9,4 L6,22 Q13,24 20,22 L17,4 Z"
          stroke="rgba(255,255,255,0.88)" strokeWidth="1.3"
          strokeLinejoin="round"
        />
        {/* Jacket centre seam */}
        <line x1="13" y1="4" x2="13" y2="22" stroke="rgba(255,255,255,0.22)" strokeWidth="0.8" strokeDasharray="1.5 2.5"/>

        {/* Backpack */}
        <rect x="17" y="6" width="6" height="10" rx="1.5"
          stroke="rgba(255,255,255,0.5)" strokeWidth="1"
        />

        {/* Left arm */}
        <line
          className="sb-arm-l"
          x1="7" y1="10" x2="2" y2="20"
          stroke="rgba(255,255,255,0.85)" strokeWidth="1.4" strokeLinecap="round"
        />
        {/* Right arm */}
        <line
          className="sb-arm-r"
          x1="19" y1="10" x2="24" y2="20"
          stroke="rgba(255,255,255,0.85)" strokeWidth="1.4" strokeLinecap="round"
        />

        {/* Left leg (upper + lower) */}
        <path
          className="sb-leg-l"
          d="M10,26 L8,37 L7,46"
          stroke="rgba(255,255,255,0.85)" strokeWidth="1.4" strokeLinecap="round"
        />
        {/* Right leg */}
        <path
          className="sb-leg-r"
          d="M16,26 L18,37 L19,46"
          stroke="rgba(255,255,255,0.85)" strokeWidth="1.4" strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

// ─── City block — one seamless 700-unit-wide SVG panel ───────────────────────
function CityBlock() {
  const s  = "rgba(255,255,255,0.70)";  // stroke color
  const sw = "1";                        // stroke width

  return (
    <svg
      viewBox="0 0 700 90"
      preserveAspectRatio="xMinYMax meet"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flex: "0 0 50%", height: "100%", display: "block" }}
    >
      {/* ── Tall glass tower ──────────────────────────────── */}
      <rect x="10" y="8"  width="34" height="82" stroke={s} strokeWidth={sw} fill="none"/>
      {/* horizontal floors */}
      {[20,32,44,56,68].map(y => (
        <line key={y} x1="10" y1={y} x2="44" y2={y} stroke={s} strokeWidth="0.5" strokeOpacity="0.4"/>
      ))}
      {/* window columns */}
      {[16,22,28,36].map(x => (
        [14,26,38,50,62,74].map(y => (
          <rect key={`${x}-${y}`} x={x} y={y} width="4" height="4"
            stroke={s} strokeWidth="0.6" fill="none" strokeOpacity="0.5"/>
        ))
      ))}

      {/* ── Antenna ───────────────────────────────────────── */}
      <line x1="27" y1="8" x2="27" y2="0" stroke={s} strokeWidth={sw} strokeOpacity="0.6"/>
      <circle cx="27" cy="0" r="1.2" stroke={s} strokeWidth={sw} fill="none" strokeOpacity="0.5"/>

      {/* ── Mid-rise office ───────────────────────────────── */}
      <rect x="58" y="28" width="56" height="62" stroke={s} strokeWidth={sw} fill="none"/>
      {[38,48,58,68,78].map(y => (
        <line key={y} x1="58" y1={y} x2="114" y2={y} stroke={s} strokeWidth="0.4" strokeOpacity="0.35"/>
      ))}
      {[63,71,79,87,95,103].map(x => (
        [31,41,51,61,71,81].map(y => (
          <rect key={`${x}-${y}`} x={x} y={y} width="5" height="5"
            stroke={s} strokeWidth="0.6" fill="none" strokeOpacity="0.45"/>
        ))
      ))}

      {/* ── Lamp post ─────────────────────────────────────── */}
      <line x1="130" y1="52" x2="130" y2="90" stroke={s} strokeWidth={sw} strokeOpacity="0.7"/>
      <path d="M130,52 Q138,48 146,50" stroke={s} strokeWidth={sw} fill="none" strokeOpacity="0.7"/>
      <circle cx="146" cy="50" r="2" stroke={s} strokeWidth={sw} fill="none" strokeOpacity="0.6"/>

      {/* ── Townhouse with triangular roof ────────────────── */}
      <rect x="160" y="54" width="44" height="36" stroke={s} strokeWidth={sw} fill="none"/>
      <polygon points="160,54 182,36 204,54" stroke={s} strokeWidth={sw} fill="none"/>
      <rect x="174" y="66" width="14" height="24" stroke={s} strokeWidth={sw} fill="none" strokeOpacity="0.7"/>
      <rect x="165" y="58" width="8" height="7" stroke={s} strokeWidth="0.7" fill="none" strokeOpacity="0.5"/>
      <rect x="191" y="58" width="8" height="7" stroke={s} strokeWidth="0.7" fill="none" strokeOpacity="0.5"/>

      {/* ── Tree ──────────────────────────────────────────── */}
      <line x1="222" y1="62" x2="222" y2="90" stroke={s} strokeWidth={sw} strokeOpacity="0.55"/>
      <ellipse cx="222" cy="52" rx="11" ry="13" stroke={s} strokeWidth={sw} fill="none" strokeOpacity="0.45"/>

      {/* ── Skinny tower ──────────────────────────────────── */}
      <rect x="242" y="18" width="22" height="72" stroke={s} strokeWidth={sw} fill="none"/>
      {[30,42,54,66,78].map(y => (
        <line key={y} x1="242" y1={y} x2="264" y2={y} stroke={s} strokeWidth="0.4" strokeOpacity="0.35"/>
      ))}
      <rect x="249" y="22" width="5" height="5" stroke={s} strokeWidth="0.7" fill="none" strokeOpacity="0.5"/>
      <rect x="258" y="22" width="5" height="5" stroke={s} strokeWidth="0.7" fill="none" strokeOpacity="0.5"/>

      {/* ── Lamp post 2 ───────────────────────────────────── */}
      <line x1="280" y1="54" x2="280" y2="90" stroke={s} strokeWidth={sw} strokeOpacity="0.7"/>
      <path d="M280,54 Q288,50 296,52" stroke={s} strokeWidth={sw} fill="none" strokeOpacity="0.7"/>
      <circle cx="296" cy="52" r="2" stroke={s} strokeWidth={sw} fill="none" strokeOpacity="0.6"/>

      {/* ── Wide low industrial ───────────────────────────── */}
      <rect x="308" y="44" width="80" height="46" stroke={s} strokeWidth={sw} fill="none"/>
      {/* Roof details */}
      <line x1="308" y1="44" x2="388" y2="44" stroke={s} strokeWidth="0.5" strokeOpacity="0.4"/>
      <rect x="328" y="34" width="14" height="10" stroke={s} strokeWidth="0.7" fill="none" strokeOpacity="0.5"/>
      <rect x="354" y="30" width="14" height="14" stroke={s} strokeWidth="0.7" fill="none" strokeOpacity="0.5"/>
      {/* Windows */}
      {[315,332,349,366].map(x => (
        [50,62,74].map(y => (
          <rect key={`${x}-${y}`} x={x} y={y} width="10" height="8"
            stroke={s} strokeWidth="0.6" fill="none" strokeOpacity="0.45"/>
        ))
      ))}

      {/* ── Tree 2 ────────────────────────────────────────── */}
      <line x1="408" y1="64" x2="408" y2="90" stroke={s} strokeWidth={sw} strokeOpacity="0.55"/>
      <ellipse cx="408" cy="54" rx="9" ry="11" stroke={s} strokeWidth={sw} fill="none" strokeOpacity="0.45"/>

      {/* ── Apartment block ───────────────────────────────── */}
      <rect x="426" y="22" width="58" height="68" stroke={s} strokeWidth={sw} fill="none"/>
      <line x1="455" y1="22" x2="455" y2="90" stroke={s} strokeWidth="0.5" strokeOpacity="0.3"/>
      {[32,44,56,68,80].map(y => (
        <line key={y} x1="426" y1={y} x2="484" y2={y} stroke={s} strokeWidth="0.4" strokeOpacity="0.3"/>
      ))}
      {[430,438,446,460,468,476].map(x => (
        [26,38,50,62,74].map(y => (
          <rect key={`${x}-${y}`} x={x} y={y} width="5" height="7"
            stroke={s} strokeWidth="0.55" fill="none" strokeOpacity="0.4"/>
        ))
      ))}

      {/* ── Billboard ─────────────────────────────────────── */}
      <rect x="500" y="44" width="46" height="26" stroke={s} strokeWidth={sw} fill="none" strokeOpacity="0.8"/>
      <line x1="500" y1="50" x2="546" y2="50" stroke={s} strokeWidth="0.5" strokeOpacity="0.3"/>
      <line x1="523" y1="70" x2="523" y2="90" stroke={s} strokeWidth={sw} strokeOpacity="0.6"/>
      {/* billboard content lines */}
      <line x1="505" y1="46" x2="536" y2="46" stroke={s} strokeWidth="1.2" strokeOpacity="0.5" strokeLinecap="round"/>
      <line x1="505" y1="54" x2="528" y2="54" stroke={s} strokeWidth="0.8" strokeOpacity="0.35" strokeLinecap="round"/>
      <line x1="505" y1="60" x2="534" y2="60" stroke={s} strokeWidth="0.8" strokeOpacity="0.35" strokeLinecap="round"/>

      {/* ── Lamp post 3 ───────────────────────────────────── */}
      <line x1="560" y1="50" x2="560" y2="90" stroke={s} strokeWidth={sw} strokeOpacity="0.7"/>
      <path d="M560,50 Q568,46 576,48" stroke={s} strokeWidth={sw} fill="none" strokeOpacity="0.7"/>
      <circle cx="576" cy="48" r="2" stroke={s} strokeWidth={sw} fill="none" strokeOpacity="0.6"/>

      {/* ── Corner shop / low building ────────────────────── */}
      <rect x="592" y="58" width="50" height="32" stroke={s} strokeWidth={sw} fill="none"/>
      <rect x="598" y="63" width="10" height="10" stroke={s} strokeWidth="0.7" fill="none" strokeOpacity="0.5"/>
      <rect x="616" y="63" width="10" height="10" stroke={s} strokeWidth="0.7" fill="none" strokeOpacity="0.5"/>
      <rect x="634" y="63" width="6" height="20" stroke={s} strokeWidth="0.7" fill="none" strokeOpacity="0.5"/>

      {/* ── Tall tower (end) ──────────────────────────────── */}
      <rect x="654" y="4" width="30" height="86" stroke={s} strokeWidth={sw} fill="none"/>
      {[16,28,40,52,64,76].map(y => (
        <line key={y} x1="654" y1={y} x2="684" y2={y} stroke={s} strokeWidth="0.4" strokeOpacity="0.3"/>
      ))}
      {[658,664,670,676].map(x => (
        [8,20,32,44,56,68,80].map(y => (
          <rect key={`${x}-${y}`} x={x} y={y} width="4" height="5"
            stroke={s} strokeWidth="0.55" fill="none" strokeOpacity="0.4"/>
        ))
      ))}
    </svg>
  );
}

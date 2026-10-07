// ─── Sidebar walking scene ────────────────────────────────────────────────────
// A boy walks in place while a line-art street scrolls endlessly behind him.
// Treadmill technique: two identical street tiles sit side by side and the
// track slides left by exactly one tile, so the loop never shows a seam.
// All inline SVG, drawn in currentColor so it follows the sidebar theme.
// Styles live in globals.css under "Sidebar walking scene".

const TILE_W = 320;

export default function SidebarScene({ isDark }: { isDark: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`sbw-scene ${isDark ? "text-white/85" : "text-zinc-800"}`}
      style={{ ["--sbw-bg" as string]: isDark ? "#0b0b0c" : "#ffffff" }}
    >
      <div className="sbw-track" style={{ width: TILE_W * 2 }}>
        <StreetTile />
        <StreetTile />
      </div>

      <div className="sbw-walker">
        <Boy />
      </div>
    </div>
  );
}

// ─── Boy — side profile, backpack, hands in hoodie pocket, stepped leg cycle ──
function Boy() {
  const ink = { stroke: "currentColor", strokeWidth: 1.6, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  const tint = "color-mix(in oklab, currentColor 16%, var(--sbw-bg))";
  const pack = "color-mix(in oklab, currentColor 42%, var(--sbw-bg))";

  return (
    <svg className="sbw-boy" viewBox="0 0 60 90" width="84" height="126" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Far leg */}
      <g transform="translate(32 57)">
        <Leg fill="color-mix(in oklab, currentColor 26%, var(--sbw-bg))" className="sbw-leg sbw-leg--far" ink={ink} />
      </g>
      {/* Near leg */}
      <g transform="translate(29 57)">
        <Leg fill="var(--sbw-bg)" className="sbw-leg" ink={ink} />
      </g>

      {/* Backpack */}
      <path d="M22 35.5 C13 34.5 9.5 38.5 9.5 45 V52 C9.5 56.5 13 58 22 57.5 Z" fill={pack} {...ink} />
      <path d="M15 35.8 q1.5 -3.4 4.5 -1.2" {...ink} strokeWidth={1.2} />
      <rect x="12" y="46.5" width="7" height="7.5" rx="2" {...ink} strokeWidth={1.1} />

      {/* Hood bunched at the nape */}
      <path d="M26 33 C20 30.5 16 34 18 40 C21 38 24 36 26 33 Z" fill={tint} {...ink} />
      {/* Hoodie body */}
      <path
        d="M25 33.5 C18.5 36 16.5 48 18.5 60 Q30 63.5 42.5 60 C44 51 43 40 38.5 34 Q32 36.5 25 33.5 Z"
        fill={tint}
        {...ink}
      />
      {/* Backpack strap over the shoulder */}
      <path d="M29.5 35.2 C26.5 40 24.5 47 22.5 55" {...ink} strokeWidth={2.4} />
      {/* Sleeve, hand tucked in the pocket */}
      <path
        d="M29 38 C25.5 44 26 52 32 55 C35 56 38.5 54.5 39 52 C37 50 35 49.5 33.5 49.5 C33 45 33.5 41 34.5 38"
        fill={tint}
        {...ink}
      />
      <path d="M36.5 50 L41.5 49" {...ink} strokeWidth={1.2} />

      {/* Head */}
      <circle cx="32" cy="20" r="14" fill="var(--sbw-bg)" {...ink} />
      {/* Hair */}
      <path
        d="M17.5 21 C16 9 26 3.5 34 4.5 C42 5.5 47.5 11 46.5 18 C43 14.5 38 13 33.5 13.5 C32.5 17.5 29.5 20 26 20.5 C26.5 24 25 27.5 22 29.5 C19.5 27.5 17.8 24.5 17.5 21 Z"
        fill="currentColor"
        {...ink}
      />
      <path d="M30 5 q2 -4 6.5 -3" {...ink} />
      {/* Ear, eye, mouth */}
      <path d="M28.5 22 q-2.5 1.6 0 4.2" {...ink} strokeWidth={1.2} />
      <ellipse cx="40.5" cy="21.5" rx="1.3" ry="2" fill="currentColor" />
      <path d="M39.5 28 q2 1.2 3.6 0" {...ink} strokeWidth={1.2} />
    </svg>
  );
}

// One leg, drawn hanging straight down from the hip at (0,0).
function Leg({
  fill,
  className,
  ink,
}: {
  fill: string;
  className: string;
  ink: React.SVGProps<SVGPathElement>;
}) {
  return (
    <g className={className}>
      <g className="sbw-thigh">
        <g className="sbw-shin">
          <rect x="-4.8" y="11" width="9.6" height="14" rx="3.5" fill={fill} {...(ink as React.SVGProps<SVGRectElement>)} />
          <path d="M-5.5 23.5 H5 C9 23.5 11.5 25.5 11.5 28 V29 H-5.5 Z" fill={fill} {...ink} />
        </g>
        <rect x="-5.5" y="-1" width="11" height="16" rx="4" fill={fill} {...(ink as React.SVGProps<SVGRectElement>)} />
      </g>
    </g>
  );
}

// ─── Street tile — left and right edges match so two tiles join seamlessly ────
function StreetTile() {
  const s = { stroke: "currentColor", strokeWidth: 1, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  return (
    <svg
      className="sbw-tile"
      viewBox={`0 0 ${TILE_W} 48`}
      width={TILE_W}
      height="48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ground */}
      <path d={`M0 44 H${TILE_W}`} {...s} />

      {/* Overhead wire, pole to pole, carried across the tile edges */}
      <path d="M-146 15 Q-66 25 14 15 Q94 25 174 15 Q254 25 334 15" {...s} strokeWidth={0.7} />

      {/* Utility pole */}
      <path d="M14 10 V44 M9 15 H19 M10 19 H18" {...s} />

      {/* Apartment block */}
      <rect x="24" y="16" width="28" height="28" {...s} />
      {[21, 28, 35].map((y) =>
        [29, 36, 43].map((x) => <rect key={`${x}-${y}`} x={x} y={y} width="4" height="4" {...s} strokeWidth={0.7} />),
      )}

      {/* Corner shop with awning */}
      <rect x="58" y="28" width="26" height="16" {...s} />
      <path d="M56 28 H86 L84 32 H58 Z" {...s} />
      <rect x="62" y="35" width="7" height="9" {...s} strokeWidth={0.7} />
      <rect x="73" y="35" width="8" height="5" {...s} strokeWidth={0.7} />

      {/* Parked bicycle */}
      <circle cx="98" cy="40" r="4" {...s} strokeWidth={0.8} />
      <circle cx="111" cy="40" r="4" {...s} strokeWidth={0.8} />
      <path d="M98 40 L103 33 H108 L111 40 M103 33 L105 40 H98 M107 31 H110" {...s} strokeWidth={0.8} />

      {/* Tree */}
      <path d="M130 34 V44" {...s} />
      <circle cx="130" cy="27" r="8" {...s} />

      {/* Lamp post */}
      <path d="M150 22 V44 M150 22 Q154 19 158 21" {...s} />
      <circle cx="158" cy="22.5" r="1.5" {...s} strokeWidth={0.8} />

      {/* Utility pole */}
      <path d="M174 10 V44 M169 15 H179 M170 19 H178" {...s} />

      {/* House with pitched roof */}
      <rect x="186" y="27" width="28" height="17" {...s} />
      <path d="M184 27 L200 16 L216 27" {...s} />
      <rect x="197" y="34" width="6" height="10" {...s} strokeWidth={0.7} />
      <rect x="189" y="31" width="5" height="5" {...s} strokeWidth={0.7} />
      <rect x="206" y="31" width="5" height="5" {...s} strokeWidth={0.7} />

      {/* Tall block with rooftop tank */}
      <rect x="224" y="12" width="24" height="32" {...s} />
      <path d="M230 12 V7 H238 V12" {...s} strokeWidth={0.8} />
      {[17, 24, 31, 38].map((y) =>
        [228, 234, 240].map((x) => <rect key={`${x}-${y}`} x={x} y={y} width="3.5" height="3.5" {...s} strokeWidth={0.7} />),
      )}

      {/* Fence */}
      <path d="M254 37 H290 M254 41 H290" {...s} strokeWidth={0.8} />
      {[256, 263, 270, 277, 284].map((x) => (
        <path key={x} d={`M${x} 35 V44`} {...s} strokeWidth={0.8} />
      ))}

      {/* Narrow tower */}
      <rect x="296" y="22" width="16" height="22" {...s} />
      <path d="M296 28 H312 M296 34 H312 M304 22 V17" {...s} strokeWidth={0.7} />
    </svg>
  );
}

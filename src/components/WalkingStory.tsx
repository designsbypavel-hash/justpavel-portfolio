"use client";

import { useTheme } from "@/components/ThemeProvider";

export default function WalkingStory() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const st  = isDark ? "rgba(255,255,255,0.88)" : "rgba(10,10,10,0.82)";
  const bg  = isDark ? "white" : "black";
  const lbl = isDark ? "rgba(255,255,255,0.20)" : "rgba(0,0,0,0.22)";
  const brd = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)";

  // City building set (800px) — duplicated for seamless loop
  const cityBlock = (ox: number) => `
    <line x1="${ox+40}" y1="128" x2="${ox+800}" y2="128" stroke="${bg}" stroke-opacity="0" stroke-width="0"/>

    <!-- tall glass tower -->
    <rect x="${ox+30}" y="44" width="36" height="84" stroke="${bg}" stroke-opacity="0.07" stroke-width="0.9" fill="none"/>
    <line x1="${ox+30}" y1="62" x2="${ox+66}" y2="62" stroke="${bg}" stroke-opacity="0.04" stroke-width="0.6"/>
    <line x1="${ox+30}" y1="80" x2="${ox+66}" y2="80" stroke="${bg}" stroke-opacity="0.04" stroke-width="0.6"/>
    <line x1="${ox+30}" y1="98" x2="${ox+66}" y2="98" stroke="${bg}" stroke-opacity="0.04" stroke-width="0.6"/>
    <line x1="${ox+30}" y1="116" x2="${ox+66}" y2="116" stroke="${bg}" stroke-opacity="0.04" stroke-width="0.6"/>

    <!-- short shop -->
    <rect x="${ox+84}" y="90" width="48" height="38" stroke="${bg}" stroke-opacity="0.09" stroke-width="0.9" fill="none"/>
    <rect x="${ox+92}" y="98" width="10" height="10" stroke="${bg}" stroke-opacity="0.06" stroke-width="0.7" fill="none"/>
    <rect x="${ox+114}" y="98" width="10" height="10" stroke="${bg}" stroke-opacity="0.06" stroke-width="0.7" fill="none"/>

    <!-- lamp post -->
    <line x1="${ox+150}" y1="76" x2="${ox+150}" y2="128" stroke="${bg}" stroke-opacity="0.14" stroke-width="0.9"/>
    <path d="M${ox+150},76 Q${ox+158},72 ${ox+166},74" stroke="${bg}" stroke-opacity="0.14" stroke-width="0.9" fill="none"/>
    <circle cx="${ox+166}" cy="74" r="2" stroke="${bg}" stroke-opacity="0.14" stroke-width="0.9" fill="none"/>

    <!-- medium office -->
    <rect x="${ox+182}" y="62" width="52" height="66" stroke="${bg}" stroke-opacity="0.07" stroke-width="0.9" fill="none"/>
    <rect x="${ox+192}" y="72" width="8" height="7" stroke="${bg}" stroke-opacity="0.05" stroke-width="0.7" fill="none"/>
    <rect x="${ox+208}" y="72" width="8" height="7" stroke="${bg}" stroke-opacity="0.05" stroke-width="0.7" fill="none"/>
    <rect x="${ox+224}" y="72" width="8" height="7" stroke="${bg}" stroke-opacity="0.05" stroke-width="0.7" fill="none"/>
    <rect x="${ox+192}" y="86" width="8" height="7" stroke="${bg}" stroke-opacity="0.05" stroke-width="0.7" fill="none"/>
    <rect x="${ox+208}" y="86" width="8" height="7" stroke="${bg}" stroke-opacity="0.05" stroke-width="0.7" fill="none"/>
    <rect x="${ox+224}" y="86" width="8" height="7" stroke="${bg}" stroke-opacity="0.05" stroke-width="0.7" fill="none"/>
    <rect x="${ox+192}" y="100" width="8" height="7" stroke="${bg}" stroke-opacity="0.05" stroke-width="0.7" fill="none"/>
    <rect x="${ox+208}" y="100" width="8" height="7" stroke="${bg}" stroke-opacity="0.05" stroke-width="0.7" fill="none"/>

    <!-- house with roof -->
    <rect x="${ox+252}" y="88" width="50" height="40" stroke="${bg}" stroke-opacity="0.09" stroke-width="0.9" fill="none"/>
    <polygon points="${ox+252},88 ${ox+277},67 ${ox+302},88" stroke="${bg}" stroke-opacity="0.09" stroke-width="0.9" fill="none"/>
    <rect x="${ox+268}" y="104" width="16" height="24" stroke="${bg}" stroke-opacity="0.07" stroke-width="0.7" fill="none"/>

    <!-- tree -->
    <line x1="${ox+320}" y1="96" x2="${ox+320}" y2="128" stroke="${bg}" stroke-opacity="0.11" stroke-width="0.9"/>
    <ellipse cx="${ox+320}" cy="86" rx="11" ry="13" stroke="${bg}" stroke-opacity="0.07" stroke-width="0.9" fill="none"/>

    <!-- skinny tower -->
    <rect x="${ox+344}" y="36" width="24" height="92" stroke="${bg}" stroke-opacity="0.07" stroke-width="0.9" fill="none"/>
    <line x1="${ox+344}" y1="54" x2="${ox+368}" y2="54" stroke="${bg}" stroke-opacity="0.04" stroke-width="0.5"/>
    <line x1="${ox+344}" y1="72" x2="${ox+368}" y2="72" stroke="${bg}" stroke-opacity="0.04" stroke-width="0.5"/>
    <line x1="${ox+344}" y1="90" x2="${ox+368}" y2="90" stroke="${bg}" stroke-opacity="0.04" stroke-width="0.5"/>
    <line x1="${ox+344}" y1="108" x2="${ox+368}" y2="108" stroke="${bg}" stroke-opacity="0.04" stroke-width="0.5"/>

    <!-- lamp post 2 -->
    <line x1="${ox+388}" y1="78" x2="${ox+388}" y2="128" stroke="${bg}" stroke-opacity="0.14" stroke-width="0.9"/>
    <path d="M${ox+388},78 Q${ox+396},74 ${ox+404},76" stroke="${bg}" stroke-opacity="0.14" stroke-width="0.9" fill="none"/>
    <circle cx="${ox+404}" cy="76" r="2" stroke="${bg}" stroke-opacity="0.14" stroke-width="0.9" fill="none"/>

    <!-- wide low building -->
    <rect x="${ox+422}" y="78" width="76" height="50" stroke="${bg}" stroke-opacity="0.07" stroke-width="0.9" fill="none"/>
    <rect x="${ox+434}" y="88" width="9" height="8" stroke="${bg}" stroke-opacity="0.05" stroke-width="0.7" fill="none"/>
    <rect x="${ox+452}" y="88" width="9" height="8" stroke="${bg}" stroke-opacity="0.05" stroke-width="0.7" fill="none"/>
    <rect x="${ox+470}" y="88" width="9" height="8" stroke="${bg}" stroke-opacity="0.05" stroke-width="0.7" fill="none"/>
    <rect x="${ox+488}" y="88" width="9" height="8" stroke="${bg}" stroke-opacity="0.05" stroke-width="0.7" fill="none"/>
    <rect x="${ox+434}" y="104" width="9" height="8" stroke="${bg}" stroke-opacity="0.05" stroke-width="0.7" fill="none"/>
    <rect x="${ox+452}" y="104" width="9" height="8" stroke="${bg}" stroke-opacity="0.05" stroke-width="0.7" fill="none"/>

    <!-- tree 2 -->
    <line x1="${ox+520}" y1="94" x2="${ox+520}" y2="128" stroke="${bg}" stroke-opacity="0.11" stroke-width="0.9"/>
    <ellipse cx="${ox+520}" cy="84" rx="9" ry="11" stroke="${bg}" stroke-opacity="0.07" stroke-width="0.9" fill="none"/>

    <!-- apartment block -->
    <rect x="${ox+542}" y="58" width="56" height="70" stroke="${bg}" stroke-opacity="0.07" stroke-width="0.9" fill="none"/>
    <line x1="${ox+570}" y1="58" x2="${ox+570}" y2="128" stroke="${bg}" stroke-opacity="0.04" stroke-width="0.6"/>
    <rect x="${ox+550}" y="70" width="8" height="7" stroke="${bg}" stroke-opacity="0.05" stroke-width="0.7" fill="none"/>
    <rect x="${ox+578}" y="70" width="8" height="7" stroke="${bg}" stroke-opacity="0.05" stroke-width="0.7" fill="none"/>
    <rect x="${ox+550}" y="85" width="8" height="7" stroke="${bg}" stroke-opacity="0.05" stroke-width="0.7" fill="none"/>
    <rect x="${ox+578}" y="85" width="8" height="7" stroke="${bg}" stroke-opacity="0.05" stroke-width="0.7" fill="none"/>
    <rect x="${ox+550}" y="100" width="8" height="7" stroke="${bg}" stroke-opacity="0.05" stroke-width="0.7" fill="none"/>
    <rect x="${ox+578}" y="100" width="8" height="7" stroke="${bg}" stroke-opacity="0.05" stroke-width="0.7" fill="none"/>

    <!-- lamp post 3 -->
    <line x1="${ox+620}" y1="80" x2="${ox+620}" y2="128" stroke="${bg}" stroke-opacity="0.14" stroke-width="0.9"/>
    <path d="M${ox+620},80 Q${ox+628},76 ${ox+636},78" stroke="${bg}" stroke-opacity="0.14" stroke-width="0.9" fill="none"/>
    <circle cx="${ox+636}" cy="78" r="2" stroke="${bg}" stroke-opacity="0.14" stroke-width="0.9" fill="none"/>

    <!-- billboard -->
    <rect x="${ox+654}" y="62" width="46" height="26" stroke="${bg}" stroke-opacity="0.07" stroke-width="0.9" fill="none"/>
    <line x1="${ox+677}" y1="88" x2="${ox+677}" y2="128" stroke="${bg}" stroke-opacity="0.08" stroke-width="0.9"/>

    <!-- tree 3 -->
    <line x1="${ox+722}" y1="98" x2="${ox+722}" y2="128" stroke="${bg}" stroke-opacity="0.11" stroke-width="0.9"/>
    <ellipse cx="${ox+722}" cy="88" rx="10" ry="12" stroke="${bg}" stroke-opacity="0.07" stroke-width="0.9" fill="none"/>

    <!-- low townhouse -->
    <rect x="${ox+748}" y="74" width="44" height="54" stroke="${bg}" stroke-opacity="0.08" stroke-width="0.9" fill="none"/>
    <polygon points="${ox+748},74 ${ox+770},56 ${ox+792},74" stroke="${bg}" stroke-opacity="0.08" stroke-width="0.9" fill="none"/>
    <rect x="${ox+762}" y="96" width="14" height="32" stroke="${bg}" stroke-opacity="0.06" stroke-width="0.7" fill="none"/>
  `;

  // Character inner SVG using SMIL (dangerouslySetInnerHTML avoids TS issues)
  const charSvg = `
    <g>
      <animateTransform attributeName="transform" type="translate"
        values="0,0;0,-1.5;0,0;0,-1.5;0,0"
        keyTimes="0;0.25;0.5;0.75;1"
        dur="0.58s" repeatCount="indefinite"/>

      <!-- head -->
      <circle cx="0" cy="-55" r="9" stroke="${st}" stroke-width="1.5" fill="none"/>
      <!-- hair -->
      <path d="M-8,-60 Q0,-67 8,-60" stroke="${st}" stroke-width="1.4" fill="none" stroke-linecap="round"/>
      <!-- eyes -->
      <circle cx="-3.2" cy="-55" r="0.9" fill="${st}"/>
      <circle cx="3.2"  cy="-55" r="0.9" fill="${st}"/>

      <!-- neck -->
      <line x1="0" y1="-46" x2="0" y2="-43" stroke="${st}" stroke-width="1.3" stroke-linecap="round"/>

      <!-- jacket body -->
      <rect x="-8" y="-43" width="16" height="20" rx="2.5" stroke="${st}" stroke-width="1.5" fill="none"/>
      <line x1="0" y1="-43" x2="0" y2="-28" stroke="${st}" stroke-width="0.7" stroke-opacity="0.45" stroke-dasharray="1.5,2.5"/>

      <!-- backpack -->
      <rect x="6" y="-41" width="9" height="13" rx="2" stroke="${st}" stroke-width="1.1" stroke-opacity="0.6" fill="none"/>

      <!-- left arm — pivot at (-8, -40) -->
      <line x1="-8" y1="-40" x2="-14" y2="-27" stroke="${st}" stroke-width="1.5" stroke-linecap="round">
        <animateTransform attributeName="transform" type="rotate"
          values="-22,-8,-40;18,-8,-40;-22,-8,-40"
          keyTimes="0;0.5;1" dur="0.58s" repeatCount="indefinite"
          calcMode="spline" keySplines="0.45,0,0.55,1;0.45,0,0.55,1"/>
      </line>

      <!-- right arm — pivot at (8, -40), opposite phase -->
      <line x1="8" y1="-40" x2="14" y2="-27" stroke="${st}" stroke-width="1.5" stroke-linecap="round">
        <animateTransform attributeName="transform" type="rotate"
          values="22,8,-40;-18,8,-40;22,8,-40"
          keyTimes="0;0.5;1" dur="0.58s" repeatCount="indefinite"
          calcMode="spline" keySplines="0.45,0,0.55,1;0.45,0,0.55,1"/>
      </line>

      <!-- left leg — pivot at (-4, -23) -->
      <path d="M-4,-23 L-8,-10 L-9,4" stroke="${st}" stroke-width="1.5" stroke-linecap="round" fill="none">
        <animateTransform attributeName="transform" type="rotate"
          values="-18,-4,-23;18,-4,-23;-18,-4,-23"
          keyTimes="0;0.5;1" dur="0.58s" repeatCount="indefinite"
          calcMode="spline" keySplines="0.45,0,0.55,1;0.45,0,0.55,1"/>
      </path>

      <!-- right leg — pivot at (4, -23), opposite phase -->
      <path d="M4,-23 L8,-10 L9,4" stroke="${st}" stroke-width="1.5" stroke-linecap="round" fill="none">
        <animateTransform attributeName="transform" type="rotate"
          values="18,4,-23;-18,4,-23;18,4,-23"
          keyTimes="0;0.5;1" dur="0.58s" repeatCount="indefinite"
          calcMode="spline" keySplines="0.45,0,0.55,1;0.45,0,0.55,1"/>
      </path>
    </g>
  `;

  return (
    <section
      aria-hidden="true"
      className="relative w-full overflow-hidden select-none pointer-events-none"
      style={{ height: 150, borderTop: `1px solid ${brd}` }}
    >
      <style>{`
        @keyframes ws-city { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ws-city { animation: ws-city 28s linear infinite; will-change: transform; }
      `}</style>

      {/* "One Story" label */}
      <span
        className="absolute top-4 left-6 font-(family-name:--font-heading) text-[10px] font-bold tracking-[0.18em] uppercase"
        style={{ color: lbl }}
      >
        One Story
      </span>

      {/* Ground line */}
      <div
        className="absolute left-0 right-0"
        style={{ bottom: 22, height: 1, background: isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)" }}
      />

      {/* Scrolling city */}
      <svg
        className="ws-city absolute bottom-0 left-0"
        style={{ width: "200%", height: "100%" }}
        viewBox="0 0 1600 150"
        preserveAspectRatio="xMinYMax meet"
        xmlns="http://www.w3.org/2000/svg"
        dangerouslySetInnerHTML={{ __html: cityBlock(0) + cityBlock(800) }}
      />

      {/* Walking boy */}
      <svg
        style={{ position: "absolute", bottom: 22, left: "22%", width: 44, height: 68 }}
        viewBox="-22 -66 44 70"
        xmlns="http://www.w3.org/2000/svg"
        dangerouslySetInnerHTML={{ __html: charSvg }}
      />
    </section>
  );
}

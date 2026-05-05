import React from "react";
import mascotWave from "@/assets/mascot-wave.png";
import mascotPresent from "@/assets/mascot-present.png";
import mascotCode from "@/assets/mascot-code.png";
import mascotThink from "@/assets/mascot-think.png";
import mascotCelebrate from "@/assets/mascot-celebrate.png";
import mascotStretch from "@/assets/mascot-stretch.png";
import mascotSitting from "@/assets/mascot-sitting.png";

export type MascotAction =
  | "wave"
  | "code"
  | "think"
  | "present"
  | "celebrate"
  | "stretch"
  | "sit-laptop";

const sources: Record<MascotAction, string> = {
  wave: mascotWave,
  present: mascotPresent,
  code: mascotCode,
  think: mascotThink,
  celebrate: mascotCelebrate,
  stretch: mascotStretch,
  "sit-laptop": mascotSitting,
};

// Subtle, action-specific animations for the standing variants.
// The sitting variant stays still (only a tiny laptop-typing nod) per request.
const animClass: Record<MascotAction, string> = {
  wave: "anim-mascot-wave-img",
  present: "anim-mascot-bob",
  code: "anim-mascot-bob",
  think: "anim-mascot-bob",
  celebrate: "anim-mascot-cheer-img",
  stretch: "anim-mascot-bob",
  "sit-laptop": "anim-mascot-focus",
};

const SKIN = "#f1c8a7";
const SKIN_DARK = "#d9a884";

/** Reusable hooded head + torso. Returns absolute SVG fragment. */
const HoodedBody = ({ children }: { children?: React.ReactNode }) => (
  <>
    {/* hood back */}
    <path
      d="M30 14 C16 14 12 28 14 42 L46 42 C48 28 44 14 30 14 Z"
      fill="hsl(var(--primary) / 0.85)"
    />
    {/* face */}
    <ellipse cx="30" cy="26" rx="9" ry="10" fill={SKIN} />
    {/* hood front shadow */}
    <path
      d="M21 18 Q30 12 39 18 L39 22 Q30 17 21 22 Z"
      fill="hsl(var(--primary))"
    />
    {/* eyes */}
    <circle cx="27" cy="27" r="1.1" fill="#222" />
    <circle cx="33" cy="27" r="1.1" fill="#222" />
    {/* smile */}
    <path
      d="M27 31 Q30 33 33 31"
      stroke="#5a3a2a"
      strokeWidth="1.1"
      strokeLinecap="round"
      fill="none"
    />
    {/* hoodie body */}
    <path
      d="M16 42 L44 42 L48 70 L12 70 Z"
      fill="hsl(var(--primary) / 0.9)"
    />
    {/* hoodie pocket */}
    <path
      d="M22 56 L38 56 L40 66 L20 66 Z"
      fill="hsl(var(--primary) / 0.7)"
    />
    {/* drawstrings */}
    <line x1="27" y1="38" x2="27" y2="48" stroke="#fff" strokeWidth="0.8" />
    <line x1="33" y1="38" x2="33" y2="48" stroke="#fff" strokeWidth="0.8" />
    {children}
  </>
);

/** Pants + ground shadow */
const Legs = () => (
  <>
    <path d="M18 70 L22 96 L28 96 L29 70 Z" fill="#3a3f55" />
    <path d="M31 70 L32 96 L38 96 L42 70 Z" fill="#3a3f55" />
    {/* shoes */}
    <ellipse cx="25" cy="97" rx="5" ry="2" fill="#1a1d28" />
    <ellipse cx="35" cy="97" rx="5" ry="2" fill="#1a1d28" />
    <ellipse cx="30" cy="102" rx="16" ry="2.4" fill="hsl(var(--primary) / 0.18)" />
  </>
);

const Mascot = ({ action }: { action: MascotAction }) => {
  switch (action) {
    case "sit-laptop":
      // Sitting cross-legged with a laptop
      return (
        <svg viewBox="0 0 80 70" className="h-full w-full" fill="none">
          {/* body shadow */}
          <ellipse cx="40" cy="64" rx="26" ry="3" fill="hsl(var(--primary) / 0.18)" />
          {/* legs crossed */}
          <path d="M18 58 Q30 48 42 58 Q54 48 62 58 L62 64 L18 64 Z" fill="#3a3f55" />
          {/* hoodie torso (smaller, sitting) */}
          <g transform="translate(15,2)">
            {/* hood */}
            <path d="M25 10 C13 10 10 22 12 34 L38 34 C40 22 37 10 25 10 Z" fill="hsl(var(--primary) / 0.85)" />
            {/* face */}
            <ellipse cx="25" cy="20" rx="7.5" ry="8.5" fill={SKIN} />
            <path d="M17 14 Q25 9 33 14 L33 17 Q25 13 17 17 Z" fill="hsl(var(--primary))" />
            <circle cx="22.5" cy="21" r="1" fill="#222" />
            <circle cx="27.5" cy="21" r="1" fill="#222" />
            <path d="M22 25 Q25 26.5 28 25" stroke="#5a3a2a" strokeWidth="1" fill="none" strokeLinecap="round" />
            {/* hoodie body */}
            <path d="M12 34 L38 34 L42 56 L8 56 Z" fill="hsl(var(--primary) / 0.9)" />
            <line x1="22" y1="32" x2="22" y2="40" stroke="#fff" strokeWidth="0.7" />
            <line x1="28" y1="32" x2="28" y2="40" stroke="#fff" strokeWidth="0.7" />
            {/* arms onto laptop */}
            <path d="M14 40 Q10 50 18 54" stroke="hsl(var(--primary) / 0.9)" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M36 40 Q40 50 32 54" stroke="hsl(var(--primary) / 0.9)" strokeWidth="5" strokeLinecap="round" fill="none" />
          </g>
          {/* laptop */}
          <g className="anim-mascot-type-arm" style={{ transformOrigin: "40px 56px" }}>
            <rect x="28" y="48" width="24" height="14" rx="1.5" fill="#1f2330" stroke="hsl(var(--primary))" strokeWidth="0.8" />
            <rect x="30" y="50" width="20" height="10" rx="0.5" fill="hsl(var(--primary) / 0.25)" />
            <text x="40" y="57" textAnchor="middle" fontSize="5" fontFamily="monospace" fill="hsl(var(--primary))">{"</>"}</text>
            <rect x="26" y="61" width="28" height="2" rx="1" fill="#2a2f3d" />
          </g>
        </svg>
      );
    case "wave":
      return (
        <svg viewBox="0 0 60 110" className="h-full w-full anim-mascot-bob">
          <HoodedBody />
          {/* static arm */}
          <path d="M16 44 Q10 56 14 68" stroke="hsl(var(--primary) / 0.9)" strokeWidth="6" strokeLinecap="round" fill="none" />
          {/* waving arm */}
          <g className="anim-mascot-wave" style={{ transformOrigin: "44px 44px" }}>
            <path d="M44 44 Q54 30 50 18" stroke="hsl(var(--primary) / 0.9)" strokeWidth="6" strokeLinecap="round" fill="none" />
            <circle cx="50" cy="16" r="3.2" fill={SKIN} />
          </g>
          <Legs />
        </svg>
      );
    case "code":
      // typing on a floating laptop
      return (
        <svg viewBox="0 0 60 110" className="h-full w-full anim-mascot-bob">
          <HoodedBody />
          {/* both arms forward */}
          <path d="M16 44 Q14 58 22 64" stroke="hsl(var(--primary) / 0.9)" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M44 44 Q46 58 38 64" stroke="hsl(var(--primary) / 0.9)" strokeWidth="6" strokeLinecap="round" fill="none" />
          {/* laptop */}
          <g className="anim-mascot-type-arm" style={{ transformOrigin: "30px 66px" }}>
            <rect x="18" y="60" width="24" height="12" rx="1.5" fill="#1f2330" stroke="hsl(var(--primary))" strokeWidth="0.8" />
            <rect x="20" y="62" width="20" height="8" rx="0.5" fill="hsl(var(--primary) / 0.25)" />
            <text x="30" y="69" textAnchor="middle" fontSize="5" fontFamily="monospace" fill="hsl(var(--primary))">{"</>"}</text>
          </g>
          <Legs />
        </svg>
      );
    case "think":
      return (
        <svg viewBox="0 0 60 110" className="h-full w-full anim-mascot-bob">
          <HoodedBody />
          {/* hand to chin */}
          <path d="M16 44 Q10 56 14 68" stroke="hsl(var(--primary) / 0.9)" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M44 44 Q40 36 34 32" stroke="hsl(var(--primary) / 0.9)" strokeWidth="6" strokeLinecap="round" fill="none" />
          <circle cx="33" cy="32" r="2.5" fill={SKIN} />
          {/* thought bubble */}
          <g className="anim-mascot-think">
            <circle cx="48" cy="20" r="2" fill="hsl(var(--primary) / 0.4)" />
            <circle cx="52" cy="14" r="3" fill="hsl(var(--primary) / 0.5)" />
            <circle cx="56" cy="6" r="4" fill="hsl(var(--primary) / 0.6)" />
          </g>
          <Legs />
        </svg>
      );
    case "present":
      // arm extended pointing at content
      return (
        <svg viewBox="0 0 60 110" className="h-full w-full anim-mascot-bob">
          <HoodedBody />
          <path d="M16 44 Q10 56 14 68" stroke="hsl(var(--primary) / 0.9)" strokeWidth="6" strokeLinecap="round" fill="none" />
          <g className="anim-mascot-present" style={{ transformOrigin: "44px 44px" }}>
            <path d="M44 44 L62 40" stroke="hsl(var(--primary) / 0.9)" strokeWidth="6" strokeLinecap="round" fill="none" />
            <circle cx="63" cy="40" r="3" fill={SKIN} />
          </g>
          <Legs />
        </svg>
      );
    case "celebrate":
      // both arms up
      return (
        <svg viewBox="0 0 60 110" className="h-full w-full anim-mascot-bob">
          <HoodedBody />
          <g className="anim-mascot-cheer-l" style={{ transformOrigin: "16px 44px" }}>
            <path d="M16 44 Q8 30 12 14" stroke="hsl(var(--primary) / 0.9)" strokeWidth="6" strokeLinecap="round" fill="none" />
            <circle cx="11" cy="12" r="3" fill={SKIN} />
          </g>
          <g className="anim-mascot-cheer-r" style={{ transformOrigin: "44px 44px" }}>
            <path d="M44 44 Q52 30 48 14" stroke="hsl(var(--primary) / 0.9)" strokeWidth="6" strokeLinecap="round" fill="none" />
            <circle cx="49" cy="12" r="3" fill={SKIN} />
          </g>
          {/* sparkles */}
          <g className="anim-mascot-spark">
            <circle cx="6" cy="20" r="1.2" fill="hsl(var(--accent))" />
            <circle cx="54" cy="24" r="1.2" fill="hsl(var(--accent))" />
            <circle cx="30" cy="6" r="1.4" fill="hsl(var(--accent))" />
          </g>
          <Legs />
        </svg>
      );
    case "stretch":
      return (
        <svg viewBox="0 0 60 110" className="h-full w-full anim-mascot-bob">
          <HoodedBody />
          <path d="M16 44 Q4 40 6 26" stroke="hsl(var(--primary) / 0.9)" strokeWidth="6" strokeLinecap="round" fill="none" />
          <circle cx="6" cy="24" r="3" fill={SKIN} />
          <path d="M44 44 Q56 40 54 26" stroke="hsl(var(--primary) / 0.9)" strokeWidth="6" strokeLinecap="round" fill="none" />
          <circle cx="54" cy="24" r="3" fill={SKIN} />
          <Legs />
        </svg>
      );
  }
};

export const SectionMascot = ({
  action = "wave",
  message,
  className = "",
}: {
  action?: MascotAction;
  message?: string;
  className?: string;
}) => {
  const isSitting = action === "sit-laptop";
  return (
    <div
      aria-hidden
      className={`relative shrink-0 ${
        isSitting ? "h-28 w-28 md:h-40 md:w-40" : "h-36 w-28 md:h-48 md:w-36"
      } ${className}`}
    >
      {message && (
        <div className="absolute -top-3 left-full z-10 ml-2 hidden whitespace-nowrap rounded-lg border border-border/60 bg-card/90 px-2.5 py-1 font-mono text-[10px] text-foreground shadow-card backdrop-blur-sm md:block animate-fade-in">
          {message}
          <span className="absolute -left-1 top-3 h-2 w-2 rotate-45 border-b border-l border-border/60 bg-card/90" />
        </div>
      )}
      <img
        src={sources[action]}
        alt=""
        className={`h-full w-full object-contain ${animClass[action]}`}
        draggable={false}
      />
    </div>
  );
};

export default SectionMascot;
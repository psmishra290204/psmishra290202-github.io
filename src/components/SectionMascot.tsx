import React from "react";

/**
 * Animated standing figure that waves at the viewer.
 * Sized larger than section headings to feel like a tiny companion
 * trying to communicate. Pure SVG + CSS, no deps.
 */
export const SectionMascot = ({ message }: { message?: string }) => {
  return (
    <div
      aria-hidden
      className="relative h-28 w-20 shrink-0 md:h-36 md:w-24"
    >
      {/* speech bubble */}
      {message && (
        <div className="absolute -top-2 left-full ml-2 hidden whitespace-nowrap rounded-lg border border-border/60 bg-card/80 px-2 py-1 font-mono text-[10px] text-muted-foreground shadow-card backdrop-blur-sm md:block animate-fade-in">
          {message}
          <span className="absolute -left-1 top-2 h-2 w-2 rotate-45 border-b border-l border-border/60 bg-card/80" />
        </div>
      )}

      <svg
        viewBox="0 0 60 110"
        className="h-full w-full anim-mascot-bob"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* head */}
        <circle cx="30" cy="14" r="8" fill="hsl(var(--card))" />
        {/* eyes */}
        <circle cx="27" cy="13" r="0.9" fill="hsl(var(--primary))" stroke="none" />
        <circle cx="33" cy="13" r="0.9" fill="hsl(var(--primary))" stroke="none" />
        {/* smile */}
        <path d="M27 17 Q30 19 33 17" />

        {/* body */}
        <path d="M30 22 L30 60" />

        {/* static arm */}
        <path d="M30 32 L18 48" />

        {/* waving arm */}
        <g
          className="anim-mascot-wave"
          style={{ transformOrigin: "30px 32px" }}
        >
          <path d="M30 32 L44 22" />
          <circle cx="44" cy="22" r="2" fill="hsl(var(--primary))" stroke="none" />
        </g>

        {/* legs */}
        <path d="M30 60 L22 88" />
        <path d="M30 60 L38 88" />

        {/* ground shadow */}
        <ellipse cx="30" cy="96" rx="14" ry="2.2" fill="hsl(var(--primary) / 0.18)" stroke="none" />
      </svg>
    </div>
  );
};

export default SectionMascot;
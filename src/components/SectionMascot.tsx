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

const animClass: Record<MascotAction, string> = {
  wave: "anim-mascot-wave-img",
  present: "anim-mascot-bob",
  code: "anim-mascot-bob",
  think: "anim-mascot-bob",
  celebrate: "anim-mascot-cheer-img",
  stretch: "anim-mascot-bob",
  "sit-laptop": "anim-mascot-focus",
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
        className={`h-full w-full object-contain opacity-90 drop-shadow-[0_10px_28px_hsl(var(--foreground)/0.14)] ${animClass[action]}`}
        draggable={false}
      />
    </div>
  );
};

export default SectionMascot;

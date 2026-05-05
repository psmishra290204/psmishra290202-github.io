import React from "react";

export const ProjectAnimation = ({ kind }: { kind: "pose" | "eeg" | "eye" }) => {
  if (kind === "pose") return <PoseAnim />;
  if (kind === "eeg") return <EEGAnim />;
  return <EyeAnim />;
};

const PoseAnim = () => (
  <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet" className="block h-full w-full">
    <defs>
      <linearGradient id="poseG" x1="0" x2="1">
        <stop offset="0%" stopColor="hsl(var(--primary))" />
        <stop offset="100%" stopColor="hsl(var(--accent))" />
      </linearGradient>
    </defs>
    <g stroke="url(#poseG)" strokeWidth="2" fill="none" strokeLinecap="round">
      <line className="anim-pose-line" x1="100" y1="30" x2="100" y2="65" />
      <line className="anim-pose-line" style={{ animationDelay: "0.2s" }} x1="100" y1="40" x2="70" y2="60" />
      <line className="anim-pose-line" style={{ animationDelay: "0.3s" }} x1="100" y1="40" x2="130" y2="60" />
      <line className="anim-pose-line" style={{ animationDelay: "0.4s" }} x1="100" y1="65" x2="80" y2="100" />
      <line className="anim-pose-line" style={{ animationDelay: "0.5s" }} x1="100" y1="65" x2="120" y2="100" />
    </g>
    <g fill="hsl(var(--primary))">
      {[
        [100, 25, 0],
        [100, 40, 0.1],
        [70, 60, 0.2],
        [130, 60, 0.3],
        [100, 65, 0.4],
        [80, 100, 0.5],
        [120, 100, 0.6],
      ].map(([x, y, d], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" className="anim-pose-dot" style={{ animationDelay: `${d}s`, transformOrigin: `${x}px ${y}px` }} />
      ))}
    </g>
  </svg>
);

const EEGAnim = () => (
  <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet" className="block h-full w-full anim-eeg-wave">
    <defs>
      <linearGradient id="eegG" x1="0" x2="1">
        <stop offset="0%" stopColor="hsl(var(--primary))" />
        <stop offset="100%" stopColor="hsl(var(--accent))" />
      </linearGradient>
    </defs>
    {[20, 50, 80].map((y, i) => (
      <path
        key={i}
        d={`M0 ${y} Q 20 ${y - 15} 40 ${y} T 80 ${y} T 120 ${y} T 160 ${y} T 200 ${y}`}
        stroke="url(#eegG)"
        strokeWidth="1.6"
        fill="none"
        style={{ animationDelay: `${i * 0.4}s` }}
      />
    ))}
    <path
      d="M0 105 L20 105 L25 80 L30 115 L35 95 L45 105 L60 105 L65 75 L70 120 L75 90 L85 105 L120 105 L125 70 L130 120 L135 90 L150 105 L200 105"
      stroke="url(#eegG)"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

const EyeAnim = () => (
  <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet" className="block h-full w-full overflow-hidden">
    <defs>
      <linearGradient id="eyeG" x1="0" x2="1">
        <stop offset="0%" stopColor="hsl(var(--primary))" />
        <stop offset="100%" stopColor="hsl(var(--accent))" />
      </linearGradient>
      <clipPath id="eyeClip">
        <path d="M30 60 Q100 10 170 60 Q100 110 30 60 Z" />
      </clipPath>
    </defs>
    <path d="M30 60 Q100 10 170 60 Q100 110 30 60 Z" stroke="url(#eyeG)" strokeWidth="2" fill="none" />
    <g clipPath="url(#eyeClip)">
      <g className="anim-eye-iris" style={{ transformOrigin: "100px 60px" }}>
        <circle cx="100" cy="60" r="22" fill="hsl(var(--primary)/0.25)" stroke="url(#eyeG)" strokeWidth="2" />
        <circle cx="100" cy="60" r="9" fill="hsl(var(--foreground))" />
        <circle cx="95" cy="55" r="3" fill="hsl(var(--background))" />
      </g>
      <rect x="0" y="0" width="200" height="3" fill="hsl(var(--primary)/0.6)" className="anim-eye-scan" />
    </g>
  </svg>
);

export default ProjectAnimation;
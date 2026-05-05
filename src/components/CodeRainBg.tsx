import React from "react";

/**
 * Minimal animated "code" background.
 * - Subtle grid + drifting monospace snippets
 * - Pure CSS animations, no JS, very low perf cost
 * - Sits behind content via absolute inset-0 (parent must be relative)
 */
export const CodeRainBg = () => {
  const snippets = [
    "const dev = () => code();",
    "if (curious) keepLearning();",
    "while(true) { build(); ship(); }",
    "import { future } from 'today';",
    "function solve(p){ return p.split(); }",
    "git commit -m 'ship it'",
    "// TODO: change the world",
    "<Portfolio />",
    "npm run dream",
    "01001100 01001111 01010110 01000101",
    "async () => await success;",
    "export default You;",
  ];

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse at center, black 50%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 50%, transparent 85%)",
        }}
      />

      {/* drifting snippets */}
      {snippets.map((s, i) => {
        const left = (i * 53) % 95;
        const delay = (i * 1.7) % 12;
        const dur = 14 + ((i * 3) % 10);
        const size = 11 + (i % 3);
        return (
          <span
            key={i}
            className="absolute font-mono text-primary/30 anim-code-fall whitespace-nowrap"
            style={{
              left: `${left}%`,
              top: "-10%",
              fontSize: `${size}px`,
              animationDelay: `${delay}s`,
              animationDuration: `${dur}s`,
            }}
          >
            {s}
          </span>
        );
      })}
    </div>
  );
};

export default CodeRainBg;
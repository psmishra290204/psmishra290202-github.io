import React from "react";

/**
 * Animated "coding setup" background.
 * - Subtle dev grid, ambient glow, floating terminal windows
 * - Drifting code snippets and a blinking cursor
 * - Pure CSS animations, fixed full-viewport, sits behind everything
 */

const TerminalWindow = ({
  title,
  lines,
  className = "",
  style,
}: {
  title: string;
  lines: { c?: string; t: string }[];
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div
    className={`absolute w-[320px] rounded-lg border border-border/50 bg-card/40 shadow-card backdrop-blur-sm ${className}`}
    style={style}
  >
    <div className="flex items-center gap-1.5 border-b border-border/40 px-3 py-1.5">
      <span className="h-2 w-2 rounded-full bg-destructive/60" />
      <span className="h-2 w-2 rounded-full bg-accent/60" />
      <span className="h-2 w-2 rounded-full bg-primary/60" />
      <span className="ml-2 font-mono text-[10px] text-muted-foreground/70">{title}</span>
    </div>
    <pre className="px-3 py-2 font-mono text-[10px] leading-relaxed">
      {lines.map((l, i) => (
        <div key={i} className={l.c ?? "text-muted-foreground/60"}>
          {l.t}
        </div>
      ))}
      <div className="text-primary/70">
        {"> "}
        <span className="anim-cursor-blink">▌</span>
      </div>
    </pre>
  </div>
);

export const CodeRainBg = () => {
  const snippets = [
    "const dev = () => code();",
    "if (curious) keepLearning();",
    "while(true) { build(); ship(); }",
    "import { future } from 'today';",
    "git commit -m 'ship it'",
    "// TODO: change the world",
    "<Portfolio />",
    "npm run dream",
    "async () => await success;",
    "export default You;",
  ];

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* ambient glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(40% 40% at 15% 20%, hsl(var(--primary)/0.10), transparent 70%), radial-gradient(40% 40% at 85% 75%, hsl(var(--accent)/0.10), transparent 70%)",
        }}
      />

      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 90%)",
        }}
      />

      {/* floating terminal windows */}
      <div className="anim-bg-float-slow absolute left-[3%] top-[12%] hidden md:block opacity-60">
        <TerminalWindow
          title="~/portfolio"
          lines={[
            { c: "text-primary/70", t: "$ npm run dev" },
            { c: "text-muted-foreground/60", t: "  ready in 312ms" },
            { c: "text-accent/70", t: "  ➜ local: http://localhost" },
          ]}
        />
      </div>
      <div className="anim-bg-float absolute right-[4%] top-[55%] hidden lg:block opacity-50">
        <TerminalWindow
          title="build.ts"
          lines={[
            { c: "text-accent/70", t: "function ship(idea) {" },
            { c: "text-muted-foreground/60", t: "  return code(idea)" },
            { c: "text-muted-foreground/60", t: "    .then(test)" },
            { c: "text-primary/70", t: "    .then(deploy)" },
            { c: "text-accent/70", t: "}" },
          ]}
        />
      </div>
      <div className="anim-bg-float absolute left-[55%] top-[78%] hidden xl:block opacity-40">
        <TerminalWindow
          title="git status"
          lines={[
            { c: "text-muted-foreground/60", t: "On branch main" },
            { c: "text-primary/70", t: "  modified: portfolio.tsx" },
            { c: "text-accent/70", t: "  + new feature added" },
          ]}
        />
      </div>

      {/* drifting snippets */}
      {snippets.map((s, i) => {
        const left = (i * 53) % 95;
        const delay = (i * 1.7) % 12;
        const dur = 18 + ((i * 3) % 12);
        const size = 11 + (i % 3);
        return (
          <span
            key={i}
            className="absolute font-mono text-primary/25 anim-code-fall whitespace-nowrap"
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
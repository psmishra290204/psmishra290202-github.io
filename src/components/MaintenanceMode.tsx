import { useEffect, useState } from "react";

export const MaintenanceMode = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background p-6 text-foreground">
      {/* Animated terminal window */}
      <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-border/60 bg-card/80 shadow-glow backdrop-blur-sm">
        {/* Terminal header */}
        <div className="flex items-center gap-2 border-b border-border/40 bg-secondary/30 px-4 py-3">
          <div className="h-3 w-3 rounded-full bg-red-400/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
          <div className="h-3 w-3 rounded-full bg-green-400/80" />
          <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            maintenance.sh
          </span>
        </div>

        {/* Terminal body */}
        <div className="space-y-3 p-6 font-mono text-sm">
          <div className="flex items-center gap-2 text-primary">
            <span className="text-lg">➜</span>
            <span className="animate-pulse">npm run deploy</span>
          </div>

          <div className="space-y-1.5 text-muted-foreground">
            <p>&gt; Building project...</p>
            <p>&gt; Optimizing assets...</p>
            <p className="text-yellow-500/80">⚠ Site under maintenance</p>
          </div>

          <div className="mt-4 rounded-lg border border-dashed border-primary/30 bg-primary/5 p-4">
            <p className="text-base font-semibold text-foreground">Work in Progress</p>
            <p className="mt-1 text-xs text-muted-foreground">
              We are currently updating the site with new features.
            </p>
            <p className="mt-2 text-xs text-primary">
              Please check back after some time{dots}
            </p>
          </div>

          {/* Progress bar */}
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-gradient-primary animate-[coming-bar-fill_2.4s_ease-in-out_infinite]"
              style={{ transformOrigin: "left" }}
            />
          </div>

          <p className="pt-2 text-[10px] text-muted-foreground/60">
            Error code: 503 | Maintenance mode active
          </p>
        </div>
      </div>

      {/* Floating code brackets in background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span className="absolute top-[20%] left-[10%] animate-[bg-float_18s_ease-in-out_infinite] font-mono text-6xl text-foreground/[0.03]">
          {"{ }"}
        </span>
        <span className="absolute top-[60%] right-[15%] animate-[bg-float_26s_ease-in-out_infinite] font-mono text-5xl text-foreground/[0.03]">
          &lt;/&gt;
        </span>
        <span className="absolute bottom-[20%] left-[30%] animate-[bg-float_22s_ease-in-out_infinite] font-mono text-4xl text-foreground/[0.03]">
          [ ];
        </span>
      </div>
    </div>
  );
};

export default MaintenanceMode;

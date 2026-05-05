import { useEffect, useRef, useState } from "react";

/**
 * A tiny car that drives along the left edge of the viewport as the user
 * scrolls. When a tracked section is near the viewport center, the car
 * "parks" at that section (snaps + wheels stop spinning).
 */
export const ScrollCar = ({ sectionIds }: { sectionIds: string[] }) => {
  const [y, setY] = useState(0);
  const [moving, setMoving] = useState(false);
  const [parked, setParked] = useState<string | null>(null);
  const lastY = useRef(0);
  const stopTimer = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight;
      const docH = document.documentElement.scrollHeight - vh;
      const progress = docH > 0 ? window.scrollY / docH : 0;
      // travel within a comfortable band of the viewport
      const top = 80;
      const bottom = vh - 120;
      let target = top + progress * (bottom - top);

      // check if any section is near viewport center → park there
      const center = vh / 2;
      let nearest: { id: string; dist: number; screenY: number } | null = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const sy = r.top + r.height / 2;
        const dist = Math.abs(sy - center);
        if (!nearest || dist < nearest.dist) nearest = { id, dist, screenY: sy };
      }
      if (nearest && nearest.dist < 140) {
        target = Math.max(top, Math.min(bottom, nearest.screenY));
        setParked(nearest.id);
      } else {
        setParked(null);
      }

      setY(target);
      setMoving(true);
      if (stopTimer.current) window.clearTimeout(stopTimer.current);
      stopTimer.current = window.setTimeout(() => setMoving(false), 140);
      lastY.current = target;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (stopTimer.current) window.clearTimeout(stopTimer.current);
    };
  }, [sectionIds]);

  const wheelsSpin = moving && !parked;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-40 hidden h-screen w-12 md:block"
    >
      {/* the road */}
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
      <div
        className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 opacity-50"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, hsl(var(--primary)) 0 8px, transparent 8px 18px)",
        }}
      />

      {/* the car */}
      <div
        className="absolute left-1/2 -translate-x-1/2 transition-[top] duration-500 ease-out"
        style={{ top: y }}
      >
        <div className="relative -translate-y-1/2">
          {/* park badge */}
          {parked && (
            <span className="absolute -right-2 top-1/2 -translate-y-1/2 translate-x-full whitespace-nowrap rounded-md border border-primary/40 bg-card/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-primary backdrop-blur-sm animate-fade-in">
              {parked}
            </span>
          )}
          <CarSvg spinning={wheelsSpin} />
        </div>
      </div>
    </div>
  );
};

const CarSvg = ({ spinning }: { spinning: boolean }) => (
  <svg width="36" height="22" viewBox="0 0 60 36" className="drop-shadow-[0_2px_6px_hsl(var(--primary)/0.5)]">
    {/* body */}
    <path
      d="M4 22 L10 12 Q12 9 16 9 L40 9 Q44 9 47 12 L54 18 L56 22 Q56 26 52 26 L8 26 Q4 26 4 22 Z"
      fill="hsl(var(--primary))"
    />
    {/* roof highlight */}
    <path d="M16 11 L40 11 L46 18 L14 18 Z" fill="hsl(var(--primary-foreground)/0.85)" opacity="0.7" />
    {/* windows */}
    <path d="M18 12 L29 12 L29 17 L15 17 Z" fill="hsl(var(--background))" />
    <path d="M31 12 L39 12 L44 17 L31 17 Z" fill="hsl(var(--background))" />
    {/* headlight */}
    <circle cx="54" cy="20" r="1.5" fill="hsl(var(--accent))" />
    {/* wheels */}
    <g style={{ transformOrigin: "14px 26px" }} className={spinning ? "anim-wheel-spin" : ""}>
      <circle cx="14" cy="26" r="5" fill="hsl(var(--foreground))" />
      <circle cx="14" cy="26" r="2" fill="hsl(var(--background))" />
      <line x1="14" y1="22" x2="14" y2="30" stroke="hsl(var(--background))" strokeWidth="0.6" />
      <line x1="10" y1="26" x2="18" y2="26" stroke="hsl(var(--background))" strokeWidth="0.6" />
    </g>
    <g style={{ transformOrigin: "46px 26px" }} className={spinning ? "anim-wheel-spin" : ""}>
      <circle cx="46" cy="26" r="5" fill="hsl(var(--foreground))" />
      <circle cx="46" cy="26" r="2" fill="hsl(var(--background))" />
      <line x1="46" y1="22" x2="46" y2="30" stroke="hsl(var(--background))" strokeWidth="0.6" />
      <line x1="42" y1="26" x2="50" y2="26" stroke="hsl(var(--background))" strokeWidth="0.6" />
    </g>
  </svg>
);

export default ScrollCar;
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * A car drives along an S-shaped road that spans the viewport background.
 * - The road is a fixed SVG covering the whole portfolio (behind content).
 * - As the user scrolls, the car follows the S curve from top to bottom.
 * - Traffic lights are placed at each tracked section; the nearest one is RED
 *   (car "stopping"), the rest are GREEN.
 * - The car emits exhaust fume puffs while scrolling.
 */
export const ScrollCar = ({ sectionIds }: { sectionIds: string[] }) => {
  const [vw, setVw] = useState(0);
  const [vh, setVh] = useState(0);
  const [progress, setProgress] = useState(0);
  const [moving, setMoving] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number>(-1);
  const [sectionFracs, setSectionFracs] = useState<number[]>([]);
  const [puffs, setPuffs] = useState<{ id: number; x: number; y: number; angle: number }[]>([]);
  const stopTimer = useRef<number | null>(null);
  const puffId = useRef(0);

  // build the S path for the current viewport
  const pathD = useMemo(() => {
    if (!vw || !vh) return "";
    // Two cubic curves making an S, spanning full viewport height
    const xL = vw * 0.18;
    const xR = vw * 0.82;
    const xM = vw * 0.5;
    const y0 = 40;
    const y1 = vh * 0.5;
    const y2 = vh - 40;
    return `M ${xL} ${y0} C ${vw * 0.95} ${vh * 0.18}, ${vw * 0.05} ${vh * 0.32}, ${xM} ${y1} S ${vw * 0.95} ${vh * 0.82}, ${xR} ${y2}`;
  }, [vw, vh]);

  const pathRef = useRef<SVGPathElement | null>(null);
  const [pathLen, setPathLen] = useState(0);

  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, [pathD]);

  // scroll handler
  useEffect(() => {
    const recalc = () => {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const p = docH > 0 ? window.scrollY / docH : 0;
      setProgress(Math.max(0, Math.min(1, p)));

      // section fractions along the document
      const fracs = sectionIds.map((id) => {
        const el = document.getElementById(id);
        if (!el || docH <= 0) return 0;
        const top = el.getBoundingClientRect().top + window.scrollY;
        return Math.max(0, Math.min(1, top / docH));
      });
      setSectionFracs(fracs);

      // active = closest section to current progress (within range)
      let best = -1;
      let bestD = 0.05;
      fracs.forEach((f, i) => {
        const d = Math.abs(f - p);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      setActiveIdx(best);

      setMoving(true);
      if (stopTimer.current) window.clearTimeout(stopTimer.current);
      stopTimer.current = window.setTimeout(() => setMoving(false), 180);
    };
    recalc();
    window.addEventListener("scroll", recalc, { passive: true });
    window.addEventListener("resize", recalc);
    return () => {
      window.removeEventListener("scroll", recalc);
      window.removeEventListener("resize", recalc);
      if (stopTimer.current) window.clearTimeout(stopTimer.current);
    };
  }, [sectionIds]);

  // car position + angle along path
  const carPose = useMemo(() => {
    if (!pathRef.current || !pathLen) return null;
    const len = pathLen * progress;
    const p = pathRef.current.getPointAtLength(len);
    const p2 = pathRef.current.getPointAtLength(Math.min(pathLen, len + 1));
    const angle = (Math.atan2(p2.y - p.y, p2.x - p.x) * 180) / Math.PI;
    return { x: p.x, y: p.y, angle };
  }, [progress, pathLen]);

  // emit exhaust puffs while moving
  useEffect(() => {
    if (!moving || !carPose) return;
    const i = window.setInterval(() => {
      const rad = ((carPose.angle + 180) * Math.PI) / 180;
      const ox = carPose.x + Math.cos(rad) * 16;
      const oy = carPose.y + Math.sin(rad) * 16;
      const id = ++puffId.current;
      setPuffs((prev) => [...prev.slice(-12), { id, x: ox, y: oy, angle: carPose.angle }]);
      window.setTimeout(() => {
        setPuffs((prev) => prev.filter((p) => p.id !== id));
      }, 1400);
    }, 90);
    return () => window.clearInterval(i);
  }, [moving, carPose]);

  // light positions along the path
  const lights = useMemo(() => {
    if (!pathRef.current || !pathLen) return [];
    return sectionFracs.map((f, i) => {
      const p = pathRef.current!.getPointAtLength(pathLen * f);
      return { id: sectionIds[i], x: p.x, y: p.y, active: i === activeIdx };
    });
  }, [sectionFracs, pathLen, activeIdx, sectionIds]);

  if (!vw || !vh) {
    return <div ref={() => { setVw(window.innerWidth); setVh(window.innerHeight); }} />;
  }

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-[5] hidden md:block">
      <svg width={vw} height={vh} className="absolute inset-0">
        {/* road glow */}
        <path
          d={pathD}
          fill="none"
          stroke="hsl(var(--primary) / 0.08)"
          strokeWidth={26}
          strokeLinecap="round"
        />
        {/* road body */}
        <path
          d={pathD}
          fill="none"
          stroke="hsl(var(--foreground) / 0.18)"
          strokeWidth={14}
          strokeLinecap="round"
        />
        {/* dashed center line */}
        <path
          ref={pathRef}
          d={pathD}
          fill="none"
          stroke="hsl(var(--primary) / 0.55)"
          strokeWidth={1.5}
          strokeDasharray="10 12"
          strokeLinecap="round"
        />

        {/* exhaust fumes */}
        {puffs.map((p) => (
          <circle
            key={p.id}
            cx={p.x}
            cy={p.y}
            r={4}
            fill="hsl(var(--muted-foreground))"
            className="anim-fume"
          />
        ))}

        {/* traffic lights */}
        {lights.map((l) => (
          <g key={l.id} transform={`translate(${l.x + 22}, ${l.y - 28})`}>
            <rect x={-7} y={-2} width={14} height={32} rx={3} fill="hsl(var(--card))" stroke="hsl(var(--border))" />
            <circle cx={0} cy={5} r={3} fill={l.active ? "hsl(0 80% 55%)" : "hsl(0 30% 25%)"} />
            <circle cx={0} cy={14} r={3} fill="hsl(45 30% 25%)" />
            <circle cx={0} cy={23} r={3} fill={!l.active ? "hsl(140 70% 45%)" : "hsl(140 25% 22%)"} />
            <line x1={0} y1={30} x2={0} y2={40} stroke="hsl(var(--border))" strokeWidth={1.5} />
            <text x={10} y={20} fontSize={9} fontFamily="ui-monospace, monospace" fill="hsl(var(--muted-foreground))" className="uppercase tracking-widest">
              {l.id}
            </text>
          </g>
        ))}

        {/* car */}
        {carPose && (
          <g transform={`translate(${carPose.x}, ${carPose.y}) rotate(${carPose.angle})`}>
            <CarSvg spinning={moving && activeIdx === -1} />
          </g>
        )}
      </svg>
    </div>
  );
};

const CarSvg = ({ spinning }: { spinning: boolean }) => (
  <g transform="translate(-30, -18)" className="drop-shadow-[0_2px_6px_hsl(var(--primary)/0.5)]">
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
  </g>
);

export default ScrollCar;
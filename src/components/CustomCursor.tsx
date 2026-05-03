import { useEffect, useState } from "react";

export const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a, button, [data-cursor-hover]"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <>
      <div
        className="pointer-events-none fixed z-[100] rounded-full bg-primary mix-blend-difference transition-[width,height] duration-200"
        style={{
          left: pos.x,
          top: pos.y,
          width: hover ? 36 : 10,
          height: hover ? 36 : 10,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className="pointer-events-none fixed z-[99] h-10 w-10 rounded-full border border-primary/40 transition-transform duration-300 ease-out"
        style={{
          left: pos.x,
          top: pos.y,
          transform: `translate(-50%, -50%) scale(${hover ? 1.5 : 1})`,
        }}
      />
    </>
  );
};
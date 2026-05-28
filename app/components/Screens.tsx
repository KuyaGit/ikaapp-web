"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";

const bp = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const screens = [
  {
    src: `${bp}/screenshots/home.png`,
    label: "Dashboard",
    description: "Payday status, income overview & period budget progress",
    glow: "13, 148, 136",   // teal-600
  },
  {
    src: `${bp}/screenshots/savings.png`,
    label: "Savings",
    description: "Monthly savings goal with bank tags & all-time trend",
    glow: "22, 163, 74",    // green-600
  },
  {
    src: `${bp}/screenshots/expenses.png`,
    label: "Expenses",
    description: "Period expense tracking with over-budget alerts",
    glow: "234, 88, 12",    // orange-600
  },
  {
    src: `${bp}/screenshots/tithes.png`,
    label: "Tithes & Blessings",
    description: "Weekly income groups with auto tithe calculation",
    glow: "79, 70, 229",    // indigo-600
  },
  {
    src: `${bp}/screenshots/settings.png`,
    label: "Budget Settings",
    description: "Custom categories, allocation % & pay schedule",
    glow: "2, 132, 199",    // sky-600
  },
  {
    src: `${bp}/screenshots/income-history.png`,
    label: "Income History",
    description: "Monthly blessing totals — tap the income card to open",
    glow: "59, 130, 246",   // blue-500
  },
];

const TOTAL = screens.length;

function getSlotStyle(pos: number, glowRgb: string): React.CSSProperties {
  const abs = Math.abs(pos);

  if (abs > 2) return { opacity: 0, pointerEvents: "none", zIndex: 0 };

  type Cfg = { x: number; scale: number; rotY: number; opacity: number; z: number };
  const cfg: Record<number, Cfg> = {
    0: { x: 0,   scale: 1,    rotY: 0,   opacity: 1,    z: 10 },
    1: { x: 62,  scale: 0.72, rotY: 22,  opacity: 0.6,  z: 5  },
    2: { x: 108, scale: 0.52, rotY: 38,  opacity: 0.2,  z: 1  },
  };

  const { x, scale, rotY, opacity, z } = cfg[abs];
  const sign = pos < 0 ? -1 : 1;

  return {
    position: "absolute",
    transform: `perspective(1100px) translateX(${sign * x}%) scale(${scale}) rotateY(${-sign * rotY}deg)`,
    opacity,
    zIndex: z,
    pointerEvents: abs === 0 ? "auto" : "none",
    transition: "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.5s ease",
    filter: abs === 0 ? `drop-shadow(0 0 40px rgba(${glowRgb},0.45))` : "none",
  };
}

export default function Screens() {
  const [active, setActive] = useState(0);
  const [labelKey, setLabelKey] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback((idx: number) => {
    setActive(((idx % TOTAL) + TOTAL) % TOTAL);
    setLabelKey(k => k + 1);
  }, []);

  const next = useCallback(() => go(active + 1), [active, go]);
  const prev = useCallback(() => go(active - 1), [active, go]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [paused, next]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const current = screens[active];

  return (
    <section
      id="screens"
      className="relative overflow-hidden py-24"
      style={{ background: "linear-gradient(160deg,#04101a 0%,#081a26 55%,#030c14 100%)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={e => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
        touchStartX.current = null;
      }}
    >
      {/* Ambient glow that shifts with each screen */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 55% 45% at 50% 65%, rgba(${current.glow},0.18) 0%, transparent 70%)`,
          transition: "background 0.7s ease",
        }}
      />

      {/* Subtle noise grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Header */}
      <div className="relative z-10 text-center px-6 mb-14">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase border border-white/10 bg-white/5 text-teal-400 mb-5">
          App Screens
        </span>
        <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
          Everything in one place
        </h2>
        <p className="mt-3 text-base text-white/35 max-w-md mx-auto">
          Simple, focused screens that stay out of your way.
        </p>
      </div>

      {/* Carousel stage */}
      <div className="relative z-10 flex items-center justify-center" style={{ height: 520 }}>
        {screens.map((screen, idx) => {
          let pos = idx - active;
          if (pos > Math.floor(TOTAL / 2)) pos -= TOTAL;
          if (pos < -Math.floor(TOTAL / 2)) pos += TOTAL;

          return (
            <div
              key={screen.label}
              style={getSlotStyle(pos, current.glow)}
              onClick={() => pos !== 0 && go(idx)}
            >
              <PhoneFrame
                src={screen.src}
                alt={screen.label}
                active={pos === 0}
                glowRgb={current.glow}
              />
            </div>
          );
        })}
      </div>

      {/* Nav arrows */}
      <NavBtn direction="left"  onClick={prev} />
      <NavBtn direction="right" onClick={next} />

      {/* Label + dots */}
      <div className="relative z-10 text-center mt-10 px-6">
        <div
          key={labelKey}
          style={{ animation: "fadeUp 0.35s ease both" }}
        >
          <p className="text-xl font-semibold text-white">{current.label}</p>
          <p className="text-sm text-white/40 mt-1">{current.description}</p>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          {screens.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Go to ${screens[idx].label}`}
              onClick={() => go(idx)}
              style={{
                height: 7,
                width: idx === active ? 28 : 7,
                borderRadius: 4,
                background:
                  idx === active
                    ? `rgb(${current.glow})`
                    : "rgba(255,255,255,0.18)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "all 0.35s cubic-bezier(0.25,0.46,0.45,0.94)",
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

/* ── Sub-components ──────────────────────────────────────────────────────── */

function PhoneFrame({
  src,
  alt,
  active,
  glowRgb,
}: {
  src: string;
  alt: string;
  active: boolean;
  glowRgb: string;
}) {
  return (
    <div
      style={{
        width: 210,
        borderRadius: "2.75rem",
        overflow: "hidden",
        border: active
          ? `2.5px solid rgba(${glowRgb},0.7)`
          : "2.5px solid rgba(255,255,255,0.08)",
        background: "#111827",
        transition: "border-color 0.5s ease",
        boxShadow: active
          ? `0 0 0 1px rgba(${glowRgb},0.15), 0 32px 64px rgba(0,0,0,0.6)`
          : "0 16px 40px rgba(0,0,0,0.5)",
      }}
    >
      {/* Notch bar */}
      <div
        style={{
          height: 28,
          background: "#0d1117",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 56,
            height: 5,
            borderRadius: 3,
            background: active ? `rgba(${glowRgb},0.4)` : "#2d3748",
            transition: "background 0.5s ease",
          }}
        />
      </div>
      {/* Screen */}
      <div style={{ background: "#f2f2f7", overflow: "hidden" }}>
        <Image
          src={src}
          alt={alt}
          width={390}
          height={844}
          className="w-full h-auto block"
          priority
        />
      </div>
      {/* Home bar */}
      <div
        style={{
          height: 20,
          background: "#0d1117",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 72,
            height: 4,
            borderRadius: 2,
            background: active ? `rgba(${glowRgb},0.35)` : "#2d3748",
            transition: "background 0.5s ease",
          }}
        />
      </div>
    </div>
  );
}

function NavBtn({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      aria-label={direction === "left" ? "Previous screen" : "Next screen"}
      onClick={onClick}
      className="absolute top-1/2 z-20 flex items-center justify-center rounded-full transition-colors duration-200"
      style={{
        width: 44,
        height: 44,
        [direction]: "max(1.5rem, calc(50% - 180px))",
        transform: "translateY(-50%)",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
        cursor: "pointer",
        color: "white",
      }}
      onMouseEnter={e =>
        ((e.currentTarget as HTMLButtonElement).style.background =
          "rgba(255,255,255,0.13)")
      }
      onMouseLeave={e =>
        ((e.currentTarget as HTMLButtonElement).style.background =
          "rgba(255,255,255,0.06)")
      }
    >
      <svg
        width={18}
        height={18}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        {direction === "left" ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        )}
      </svg>
    </button>
  );
}

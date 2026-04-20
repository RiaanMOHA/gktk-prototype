import { useState, useRef, useCallback, useEffect } from "react";

/* ───────────────────────────────────────────────────────
   GKTK step-1-opening-transition — locked
   Hold-to-confirm splash screen
   ─────────────────────────────────────────────────────── */

// ─── Design tokens ───
const C = {
  heading: "#25272C",
  sub: "#383A42",
  body: "#40444C",
  caption: "#5B616E",
  amber: "#FBB931",
  amber50: "#FFFBEc",
  amber100: "#FEF2C9",
  neutral100: "#EDEEF1",
  neutral200: "#D8DBDF",
  bg: "#F9F9F9",
};

// ─── SVG noise filter ───
const NoiseFilter = () => (
  <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
  </svg>
);

// ─── MoreHarvest logo ───
const Logo = ({ id = "main", size = 1 }) => (
  <svg width={56 * size} height={24 * size} viewBox="0 0 56 24" fill="none">
    <path
      d="M11.45.012C15.61-.047 18.82 1.73 21.25 5.09c3.31 4.58 6.66 9.14 9.98 13.72 1.25 1.72 1.3 2.65.24 4.07-1.04 1.39-3.34 1.53-4.4.16-1.72-2.19-3.33-4.46-5-6.68-2.13-2.83-4.23-5.69-6.41-8.48-1.44-1.84-3.44-2.25-5.6-1.73-2.01.48-3.27 1.84-4.03 3.78-.9 2.3.24 5.18 2.01 6.49 1.99 1.49 4.76 1.52 6.84.08 1.02-.7 1.66-1.71 2.1-2.83.23-.6.4-.72.81-.15.9 1.27 1.8 2.55 2.75 3.79.47.6.47 1.1.02 1.71-2.45 3.28-5.66 4.92-9.77 4.72C4.09 23.4-.69 17.29.08 10.24.6 5.48 4.73 1.08 8.73.28c.9-.18 1.8-.32 2.72-.27z"
      fill={`url(#a${id})`}
    />
    <path
      d="M38.64 10.69c-1.1-1.53-2.23-3.08-3.33-4.64-.2-.27 0-.52.16-.75 1.97-2.85 4.6-4.6 8.08-4.88 5.05-.41 8.77 1.76 11.1 6.19 2.9 5.52 1 12.44-3.33 15.71-4.93 3.01-11.78 1.6-15.4-3.51-3.27-4.62-6.64-9.17-9.95-13.75-1.2-1.66-1.25-2.51-.3-3.83 1-1.37 3.38-1.47 4.39-.12 3.08 4.11 6.12 8.25 9.19 12.37.6.81 1.21 1.62 1.83 2.41 2.12 2.69 5.78 3.08 8.24.87 2.7-2.43 2.88-6.22.42-8.71-3.06-3.09-8.11-2.03-9.7 2.04-.08.19-.04.44-.4.61z"
      fill={`url(#b${id})`}
    />
    <defs>
      <linearGradient id={`a${id}`} x1="32.22" y1="0" x2="-2.36" y2="4.1" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FBB931" />
        <stop offset="1" stopColor="#FF8660" />
      </linearGradient>
      <linearGradient id={`b${id}`} x1="56" y1=".14" x2="21.67" y2="4.22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FBB931" />
        <stop offset="1" stopColor="#FF8660" />
      </linearGradient>
    </defs>
  </svg>
);

// ─── Mesh gradient background ───
const MeshBg = () => (
  <div style={{ position: "absolute", inset: 0, background: C.bg, overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 20% 30%, rgba(254,242,201,0.5), transparent 70%)" }} />
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 80% at 80% 70%, rgba(251,185,49,0.12), transparent 60%)" }} />
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 60% 20%, rgba(255,148,36,0.08), transparent 60%)" }} />
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 70% at 40% 80%, rgba(237,238,241,0.4), transparent 60%)" }} />
    <div style={{ position: "absolute", inset: 0, filter: "url(#noise)", opacity: 0.025, mixBlendMode: "overlay" }} />
  </div>
);

// ─── iPhone 17 Pro frame ───
const PhoneFrame = ({ children }) => (
  <div style={{
    position: "relative",
    width: 393,
    height: 852,
    borderRadius: 55,
    overflow: "hidden",
    background: "#1A1A1E",
    boxShadow: "0 0 0 1px rgba(255,255,255,0.08) inset",
  }}>
    {/* Metallic edge */}
    <div style={{
      position: "absolute",
      inset: -1,
      borderRadius: 56,
      background: "linear-gradient(170deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.03) 40%, rgba(255,255,255,0.08) 100%)",
      pointerEvents: "none",
    }} />
    {/* Power button (right) */}
    <div style={{ position: "absolute", right: -3, top: 160, width: 3, height: 38, borderRadius: "0 2px 2px 0", background: "linear-gradient(180deg, #3A3A3C, #2A2A2C)", boxShadow: "1px 0 2px rgba(0,0,0,0.3)" }} />
    {/* Volume up (left) */}
    <div style={{ position: "absolute", left: -3, top: 130, width: 3, height: 28, borderRadius: "2px 0 0 2px", background: "linear-gradient(180deg, #3A3A3C, #2A2A2C)", boxShadow: "-1px 0 2px rgba(0,0,0,0.3)" }} />
    {/* Volume down (left) */}
    <div style={{ position: "absolute", left: -3, top: 170, width: 3, height: 28, borderRadius: "2px 0 0 2px", background: "linear-gradient(180deg, #3A3A3C, #2A2A2C)", boxShadow: "-1px 0 2px rgba(0,0,0,0.3)" }} />
    {/* Silent switch (left) */}
    <div style={{ position: "absolute", left: -3, top: 95, width: 3, height: 18, borderRadius: "2px 0 0 2px", background: "linear-gradient(180deg, #3A3A3C, #2A2A2C)", boxShadow: "-1px 0 2px rgba(0,0,0,0.3)" }} />
    {/* Screen */}
    <div style={{
      position: "absolute",
      inset: 6,
      borderRadius: 49,
      overflow: "hidden",
      background: C.bg,
    }}>
      {/* Dynamic Island */}
      <div style={{
        position: "absolute",
        top: 10,
        left: "50%",
        transform: "translateX(-50%)",
        width: 126,
        height: 37,
        borderRadius: 20,
        background: "#000",
        zIndex: 300,
      }}>
        {/* Camera lens */}
        <div style={{
          position: "absolute",
          right: 16,
          top: "50%",
          transform: "translateY(-50%)",
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "radial-gradient(circle, #1a1a2e 40%, #0d0d1a 100%)",
          boxShadow: "inset 0 0 2px rgba(255,255,255,0.1)",
        }} />
      </div>
      {children}
    </div>
  </div>
);

// ─── Step 1: opening transition ───
const Step1Content = ({ onBlank }) => {
  const [progress, setProgress] = useState(0);
  const [pressing, setPressing] = useState(false);
  const [done, setDone] = useState(false);
  const raf = useRef(null);
  const startT = useRef(null);
  const prog = useRef(0);
  const DUR = 1200;

  const startPress = useCallback(() => {
    if (done) return;
    setPressing(true);
    startT.current = performance.now() - (prog.current / 100) * DUR;
    const tick = (now) => {
      const p = Math.min((now - startT.current) / DUR, 1);
      prog.current = p * 100;
      setProgress(p * 100);
      if (p >= 1) {
        setDone(true);
        setTimeout(() => onBlank?.(), 150);
        return;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [done]);

  const endPress = useCallback(() => {
    setPressing(false);
    if (raf.current) cancelAnimationFrame(raf.current);
    if (done) return;
    const sp = prog.current;
    const t0 = performance.now();
    const decay = (now) => {
      const p = Math.max(sp - ((now - t0) / 400) * sp, 0);
      prog.current = p;
      setProgress(p);
      if (p > 0.1) {
        raf.current = requestAnimationFrame(decay);
      } else {
        prog.current = 0;
        setProgress(0);
      }
    };
    raf.current = requestAnimationFrame(decay);
  }, [done]);

  useEffect(() => {
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const circ = 2 * Math.PI * 36;

  return (
    <div style={{
      position: "absolute",
      inset: 0,
      zIndex: 10,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <Logo id="splash" size={1.3} />

      <h1 style={{
        fontFamily: "'Noto Sans JP', sans-serif",
        fontSize: 14,
        fontWeight: 500,
        color: C.sub,
        margin: "20px 0 48px",
      }}>
        Enter MoreHarvest World
      </h1>

      {/* Hold-to-confirm button */}
      <div
        onMouseDown={startPress}
        onMouseUp={() => { endPress(); }}
        onMouseLeave={endPress}
        onTouchStart={(e) => { e.preventDefault(); startPress(); }}
        onTouchEnd={() => { endPress(); }}
        onTouchCancel={endPress}
        style={{
          position: "relative",
          width: 88,
          height: 88,
          cursor: "pointer",
          transform: pressing ? "scale(0.92)" : "scale(1)",
          transition: "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
          userSelect: "none",
          WebkitUserSelect: "none",
          touchAction: "none",
        }}
      >
        {/* Glass circle background */}
        <div style={{
          position: "absolute",
          inset: 4,
          borderRadius: "50%",
          background:"#F9F9F9",
          
          
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: `0 4px 20px rgba(0,0,0,0.08), 0 0 ${progress * 0.5}px rgba(251,185,49,${progress * 0.005})`,
        }} />

        {/* Progress ring */}
        <svg style={{
          position: "absolute",
          inset: 0,
          width: 88,
          height: 88,
          transform: "rotate(-90deg)",
        }}>
          {/* Track */}
          <circle cx={44} cy={44} r={36} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth={3} />
          {/* Progress */}
          <circle
            cx={44} cy={44} r={36}
            fill="none"
            stroke={C.amber}
            strokeWidth={3}
            strokeDasharray={circ}
            strokeDashoffset={circ - (progress / 100) * circ}
            strokeLinecap="round"
            style={{
              filter: `drop-shadow(0 0 ${4 + progress * 0.15}px rgba(251,185,49,${0.15 + progress * 0.006}))`,
            }}
          />
        </svg>

        {/* Chevron icon */}
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <svg width={22} height={22} viewBox="0 0 20 20" fill="none">
            <path d="M7.5 4L13.5 10L7.5 16" stroke={C.heading} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <p style={{
        fontFamily: "'Noto Sans JP', sans-serif",
        fontSize: 11,
        color: "rgba(91,97,110,0.5)",
        marginTop: 20,
      }}>
        Hold to enter
      </p>
    </div>
  );
};

// ─── Main export ───
export default function Step1OpeningTransition() {
  const [blank, setBlank] = useState(false);

  return (
    <div data-proto="step-1" style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#EDEEF1",
      padding: 24,
      fontFamily: "'Noto Sans JP', sans-serif",
    }}>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-proto="step-1"] *,
          [data-proto="step-1"] *::before,
          [data-proto="step-1"] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
      `}</style>
      <NoiseFilter />
      <PhoneFrame>
        <div style={{
          position: "absolute",
          inset: 0,
          opacity: blank ? 0 : 1,
          transform: blank ? "scale(0.97)" : "scale(1)",
          transition: "opacity 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}>
          <MeshBg />
          <Step1Content onBlank={() => setBlank(true)} />
        </div>
        {/* Blank viewport behind — just #F9F9F9 */}
        <div style={{ position: "absolute", inset: 0, background: C.bg, zIndex: -1 }} />
      </PhoneFrame>
    </div>
  );
}

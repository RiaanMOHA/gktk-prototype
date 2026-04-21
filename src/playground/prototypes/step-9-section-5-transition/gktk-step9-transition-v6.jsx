import { useEffect, useState } from "react";

/* ── design tokens ── */
const C = {
  bg: "#F9F9F9", n100: "#EDEEF1", n200: "#D8DBDF", n400: "#8A8F9A",
  n600: "#5B616E", n800: "#40444C", n900: "#383A42", n950: "#25272C",
  amber: "#FBB931", amber100: "#FEF2C9", orange: "#FF9424",
};

const MeshBg = () => (
  <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: "inherit" }}>
    <div style={{ position: "absolute", inset: 0, background: C.bg }} />
  </div>
);

const GlowDot = ({ size = 6, style = {} }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%", background: C.amber,
    ...style,
  }} />
);

/* ───────────────────────────────────────────────────────
   STEP 9: transition — cinematic question reveal
   ─────────────────────────────────────────────────────── */
function Step9Transition({ onAdvance }) {
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    // beat 0: blank/breathe (300ms)
    // beat 1: question fades in
    // beat 2: [amber line removed]
    // beat 3: prompt appears
    const t1 = setTimeout(() => setBeat(1), 300);
    const t2 = setTimeout(() => setBeat(2), 900);
    const t3 = setTimeout(() => setBeat(3), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div
      onClick={beat >= 3 ? onAdvance : undefined}
      role="button"
      tabIndex={0}
      aria-label="Tap to continue"
      onKeyDown={(e) => { if ((e.key === "Enter" || e.key === " ") && beat >= 3) { e.preventDefault(); onAdvance(e); } }}
      style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        justifyContent: "center",
        padding: "0 32px",
        cursor: beat >= 3 ? "pointer" : "default",
      }}
    >
      {/* ambient glow removed per flat-design mandate (no radial gradients or glows) */}

      {/* the question — word by word stagger feel via opacity + translateY */}
      <h1 aria-live="polite" style={{
        fontFamily: "'REM', sans-serif", fontWeight: 600, fontSize: 32,
        lineHeight: 1.15, color: C.n950, letterSpacing: "-0.02em",
        margin: 0, maxWidth: 280,
        opacity: beat >= 1 ? 1 : 0,
        transform: beat >= 1 ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}>
        So what does a real solution look like?
      </h1>

      {/* tap prompt */}
      <div aria-live="polite" style={{
        position: "absolute", bottom: 48, left: 32, right: 32,
        display: "flex", alignItems: "center", gap: 8,
        opacity: beat >= 3 ? 1 : 0,
        transition: "opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}>
        <GlowDot size={5} />
        <span style={{
          fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 500,
          fontSize: 13, color: C.n400,
        }}>Tap to continue</span>
      </div>

      <style>{`
        @keyframes glowPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}

/* ── entry ── */
export default function Step9TransitionPlayground() {
  const [key, setKey] = useState(0);
  const replay = () => setKey(k => k + 1);

  return (
    <div data-proto="step-9" style={{
      minHeight: "100vh", background: "#EDEEF1",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24, fontFamily: "'Noto Sans JP', sans-serif",
    }}>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-proto="step-9"] *,
          [data-proto="step-9"] *::before,
          [data-proto="step-9"] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=REM:wght@600&family=Noto+Sans+JP:wght@400;500;600&display=swap" rel="stylesheet" />
      <div style={{ position: "relative", width: 393, height: 852, borderRadius: 55, overflow: "hidden", background: "#1A1A1E", boxShadow: "0 0 0 1px rgba(255,255,255,0.08) inset" }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 55, border: "2.5px solid transparent",
          background: "linear-gradient(135deg,rgba(255,255,255,0.2) 0%,rgba(255,255,255,0.05) 50%,rgba(255,255,255,0.15) 100%) border-box",
          WebkitMask: "linear-gradient(#fff 0 0) padding-box,linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude",
          zIndex: 50, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 6, left: 6, right: 6, bottom: 6, borderRadius: 49, overflow: "hidden", background: C.bg }}>
          <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: 126, height: 37, borderRadius: 20, background: "#000", zIndex: 100 }} />
          <MeshBg />
          <Step9Transition key={key} onAdvance={replay} />
          <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", width: 134, height: 5, borderRadius: 3, background: "rgba(0,0,0,0.2)", zIndex: 100 }} />
        </div>
      </div>
    </div>
  );
}

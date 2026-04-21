import { useState, useEffect, useRef, useCallback } from "react";

/* ───────────────────────────────────────────────────────
   Step 3 — Section 2 transition (playground draft v1)
   Bridges the entry (step 2) to the bridge (step 4).
   Starts on a simplified entry frame (headline + subheading),
   runs one of four transition animations, lands on the
   bridge's opening fact ("10 trillion yen").
   Variants: sweep · scatter · dissolve · drop
   ─────────────────────────────────────────────────────── */

const N = { 950: "#25272C", 900: "#383A42", 800: "#40444C", 600: "#5B616E", 200: "#D8DBDF", 100: "#EDEEF1", dis: "#8E8F8F" };

/* ── logo ── */
function Logo({ id = "l3", size = 48 }) {
  const h = size * (24 / 56);
  return (
    <svg width={size} height={h} viewBox="0 0 56 24" fill="none">
      <path d="M11.4499 0.012C15.6113 -0.047 18.8225 1.729 21.2495 5.091C24.5588 9.675 27.9048 14.233 31.2296 18.806C32.4795 20.525 32.5275 21.462 31.4681 22.883C30.431 24.274 28.131 24.409 27.0638 23.043C25.3525 20.853 23.7371 18.586 22.0689 16.361C19.9435 13.527 17.8404 10.674 15.6611 7.883C14.2228 6.04 12.2237 5.629 10.0574 6.148C8.0471 6.629 6.791 7.985 6.033 9.925C5.135 12.223 6.276 15.102 8.039 16.419C10.027 17.904 12.796 17.933 14.881 16.499C15.901 15.798 16.537 14.791 16.975 13.666C17.208 13.065 17.383 12.95 17.785 13.515C18.689 14.786 19.583 16.066 20.533 17.302C21 17.91 21.008 18.411 20.554 19.018C18.105 22.296 14.891 23.94 10.787 23.737C4.094 23.404 -0.687 17.288 0.081 10.245C0.601 5.477 4.731 1.076 8.728 0.276C9.626 0.096 10.529 -0.042 11.45 0.012Z" fill={`url(#p0_${id})`} />
      <path d="M38.639 10.691C37.536 9.159 36.413 7.612 35.306 6.054C35.112 5.78 35.304 5.529 35.462 5.299C37.429 2.449 40.064 0.693 43.547 0.413C48.593 0.007 52.318 2.171 54.645 6.606C57.543 12.127 55.651 19.047 50.315 22.312C45.384 25.328 38.538 23.913 34.914 18.799C31.643 14.184 28.281 9.634 24.97 5.048C23.774 3.391 23.723 2.54 24.674 1.218C25.658 -0.151 28.052 -0.25 29.062 1.097C32.143 5.207 35.187 9.346 38.25 13.471C38.851 14.281 39.458 15.088 40.082 15.88C42.2 18.573 45.865 18.958 48.319 16.754C51.021 14.327 51.204 10.534 48.74 8.043C45.682 4.952 40.631 6.013 39.037 10.078C38.963 10.268 38.998 10.519 38.639 10.691Z" fill={`url(#p1_${id})`} />
      <defs>
        <linearGradient id={`p0_${id}`} x1="32" y1="0" x2="-2" y2="4" gradientUnits="userSpaceOnUse"><stop stopColor="#FBB931" /><stop offset="1" stopColor="#FF8660" /></linearGradient>
        <linearGradient id={`p1_${id}`} x1="56" y1="0" x2="22" y2="4" gradientUnits="userSpaceOnUse"><stop stopColor="#FBB931" /><stop offset="1" stopColor="#FF8660" /></linearGradient>
      </defs>
    </svg>
  );
}

/* ── flat bg (was MeshBG; radial gradients removed per flat-design mandate) ── */
function MeshBG() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "#F9F9F9" }} />
  );
}

/* ── entry snapshot (simplified step-2 final state) ── */
function EntrySnapshot() {
  return (
    <div style={{ position: "absolute", inset: 0, padding: "0 24px" }}>
      <div style={{ position: "absolute", top: 60, left: 24 }}><Logo /></div>
      <div style={{ position: "absolute", bottom: 120, left: 24, right: 24 }}>
        <h1 style={{ fontFamily: "'REM',sans-serif", fontWeight: 600, fontSize: 36, lineHeight: 1.1, letterSpacing: "-0.025em", color: N[950], margin: "0 0 8px 0" }}>Why Kumamoto,<br />why now?</h1>
        <p style={{ fontFamily: "'Noto Sans JP',sans-serif", fontSize: 15, color: N[900], margin: 0 }}>{"Japan's fastest-rising property market"}</p>
      </div>
    </div>
  );
}

/* ── bridge snapshot (simplified step-4 opening fact) ── */
function BridgeSnapshot({ visible }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 24px" }}>
      <div style={{
        position: "relative", padding: 24, borderRadius: 20, overflow: "hidden",
        background:"#F9F9F9",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 16px 48px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 120ms, transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 120ms",
      }}>
        <div style={{ fontFamily: "'REM',sans-serif", fontWeight: 600, fontSize: "4.5rem", lineHeight: 1.05, letterSpacing: "-0.03em", color: N[950] }}>10</div>
        <p style={{ fontFamily: "'Noto Sans JP',sans-serif", fontSize: "0.875rem", color: N[600], margin: "8px 0 0", lineHeight: 1.6 }}>trillion yen. Japan is rebuilding its chip industry.</p>
      </div>
      <p style={{ fontFamily: "'Noto Sans JP',sans-serif", fontSize: 12, color: N.dis, marginTop: 24, opacity: visible ? 1 : 0, transition: "opacity 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 700ms" }}>Tap to replay</p>
    </div>
  );
}

/* ── scatter particles (from step-2) ── */
function ScatterDots() {
  const dots = Array.from({ length: 12 }, (_, i) => ({
    o: (0.3 + Math.random() * 0.4).toFixed(2),
    l: `${(30 + Math.random() * 40).toFixed(1)}%`,
    t: `${(30 + Math.random() * 40).toFixed(1)}%`,
    a: `particle${i % 4} 0.8s ease-out forwards`,
  }));
  return (
    <>
      {dots.map((d, i) => (
        <div key={i} style={{ position: "absolute", width: 6, height: 6, borderRadius: "50%", background: `rgba(251,185,49,${d.o})`, left: d.l, top: d.t, animation: d.a }} />
      ))}
    </>
  );
}

/* ── transition specs ── */
const TRANSITIONS = {
  sweep:    { key: "sweep",    dur: 700, band: true },
  scatter:  { key: "scatter",  dur: 800, band: false, particles: true },
  dissolve: { key: "dissolve", dur: 900, band: false },
  drop:     { key: "drop",     dur: 600, band: false },
};

const TRANS_BY_VARIANT = { "1": "sweep", "2": "scatter", "3": "dissolve", "4": "drop" };

/* ── main ── */
export default function Step3TransitionV1({ variant } = {}) {
  const key = TRANS_BY_VARIANT[variant] ?? "sweep";
  const spec = TRANSITIONS[key];

  const [phase, setPhase] = useState("entry"); // entry | exiting | bridge
  const [scatterNonce, setScatterNonce] = useState(0);
  const timer = useRef(null);

  const run = useCallback(() => {
    clearTimeout(timer.current);
    setPhase("entry");
    timer.current = setTimeout(() => {
      if (spec.particles) setScatterNonce(n => n + 1);
      setPhase("exiting");
      timer.current = setTimeout(() => setPhase("bridge"), spec.dur);
    }, 900);
  }, [spec.dur, spec.particles]);

  useEffect(() => {
    run();
    return () => clearTimeout(timer.current);
  }, [run]);

  const onTap = () => {
    if (phase === "bridge") run();
  };

  return (
    <div data-proto="step-3" style={{ minHeight: "100vh", background: N[100], display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "'Noto Sans JP',sans-serif" }}>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-proto="step-3"] *,
          [data-proto="step-3"] *::before,
          [data-proto="step-3"] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
      `}</style>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=REM:wght@600&family=Noto+Sans+JP:wght@400;500;600&display=swap');

        @keyframes sweepOut    { 0% { clip-path: inset(0 0 0 0); } 100% { clip-path: inset(0 0 0 100%); } }
        @keyframes sweepBand   { 0% { clip-path: inset(0 100% 0 0); } 45% { clip-path: inset(0 0 0 0); } 55% { clip-path: inset(0 0 0 0); } 100% { clip-path: inset(0 0 0 100%); } }
        @keyframes scatterOut  { 0% { transform: scale(1); opacity: 1; } 60% { transform: scale(0.94); opacity: 0.6; } 100% { transform: scale(0.85); opacity: 0; } }
        @keyframes dissolveOut { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.98); } 100% { opacity: 0; transform: scale(0.96); } }
        @keyframes dropOut     { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(60px); opacity: 0; } }

        @keyframes particle0 { to { transform: translate(-80px,-120px) scale(0); opacity: 0; } }
        @keyframes particle1 { to { transform: translate(100px,-90px) scale(0); opacity: 0; } }
        @keyframes particle2 { to { transform: translate(-60px,110px) scale(0); opacity: 0; } }
        @keyframes particle3 { to { transform: translate(90px,80px) scale(0); opacity: 0; } }
      `}</style>

      {/* iPhone frame (standard playground) */}
      <div style={{ position: "relative", width: 393, height: 852, borderRadius: 55, overflow: "hidden", background: "#1A1A1E", boxShadow: "0 0 0 1px rgba(255,255,255,0.08) inset" }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 55, border: "2.5px solid transparent",
          background: "linear-gradient(135deg,rgba(255,255,255,0.2) 0%,rgba(255,255,255,0.05) 50%,rgba(255,255,255,0.15) 100%) border-box",
          WebkitMask: "linear-gradient(#fff 0 0) padding-box,linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude",
          zIndex: 50, pointerEvents: "none" }} />

        {/* screen */}
        <div
          onClick={onTap}
          role="button"
          tabIndex={0}
          aria-label="Tap to continue"
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onTap(e); } }}
          style={{ position: "absolute", top: 6, left: 6, right: 6, bottom: 6, borderRadius: 49, overflow: "hidden", background: "#F9F9F9", cursor: phase === "bridge" ? "pointer" : "default" }}
        >
          {/* dynamic island */}
          <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: 126, height: 37, borderRadius: 20, background: "#000", zIndex: 100 }} />

          <MeshBG />

          {/* entry layer — exits with the selected animation */}
          <div style={{ position: "absolute", inset: 0, zIndex: 5,
            animation: phase === "exiting" ? `${spec.key}Out ${spec.dur}ms ease-in-out forwards` : "none",
            opacity: phase === "bridge" ? 0 : 1,
          }}>
            <EntrySnapshot />
          </div>

          {/* sweep band overlay */}
          {phase === "exiting" && spec.band && (
            <div style={{ position: "absolute", inset: 0, zIndex: 6, background: "#EDEEF1", animation: `sweepBand ${spec.dur}ms ease-in-out forwards` }} />
          )}

          {/* scatter particles */}
          {phase === "exiting" && spec.particles && (
            <div key={scatterNonce} style={{ position: "absolute", inset: 0, zIndex: 6, pointerEvents: "none", overflow: "hidden" }}>
              <ScatterDots />
            </div>
          )}

          {/* bridge snapshot */}
          <div style={{ position: "absolute", inset: 0, zIndex: 7 }}>
            <BridgeSnapshot visible={phase === "bridge"} />
          </div>

          {/* home indicator */}
          <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", width: 134, height: 5, borderRadius: 3, background: "rgba(0,0,0,0.2)", zIndex: 100 }} />
        </div>
      </div>
    </div>
  );
}

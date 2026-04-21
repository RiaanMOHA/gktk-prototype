import { useState, useRef, useCallback, useEffect } from "react";

/* ── constants ── */
const AMBER = "#FBB931";
const N = { 950: "#25272C", 900: "#383A42", 800: "#40444C", 600: "#5B616E", 200: "#D8DBDF", 100: "#EDEEF1", dis: "#8E8F8F" };
const HOLD_DURATION = 800;
const CIRCUMFERENCE = 2 * Math.PI * 26;

/* ── Logo SVG ── */
function Logo({ id, size }) {
  const h = size * (24 / 56);
  return (
    <svg width={size} height={h} viewBox="0 0 56 24" fill="none">
      <path d="M11.4499 0.0119694C15.6113 -0.0472805 18.8225 1.72909 21.2495 5.09096C24.5588 9.67532 27.9048 14.2327 31.2296 18.8058C32.4795 20.5248 32.5275 21.4623 31.4681 22.8832C30.431 24.2744 28.131 24.409 27.0638 23.0429C25.3525 20.8525 23.7371 18.5861 22.0689 16.3612C19.9435 13.5269 17.8404 10.6743 15.6611 7.88283C14.2228 6.04046 12.2237 5.62871 10.0574 6.14771C8.0471 6.62921 6.79123 7.98483 6.03273 9.92507C5.13493 12.2227 6.2764 15.1016 8.03892 16.4186C10.0269 17.9039 12.7964 17.9332 14.8814 16.4992C15.9014 15.7976 16.5373 14.7911 16.9745 13.6657C17.2078 13.0653 17.3827 12.9502 17.7846 13.5153C18.6887 14.7862 19.5828 16.0661 20.5326 17.3017C21.0003 17.9103 21.0081 18.4106 20.5542 19.0181C18.1052 22.2963 14.8907 23.9403 10.7865 23.7367C4.09413 23.4037 -0.687161 17.2882 0.0809956 10.2449C0.601025 5.47683 4.73117 1.07584 8.72833 0.275594C9.62613 0.0959692 10.5295 -0.0424055 11.4499 0.0119694V0.0119694Z" fill={`url(#p0_${id})`} />
      <path d="M38.6392 10.6906C37.536 9.15947 36.4132 7.61222 35.3059 6.05372C35.1116 5.78035 35.3036 5.52947 35.4622 5.29923C37.4294 2.44923 40.0638 0.693108 43.5472 0.412984C48.5926 0.00685967 52.3175 2.17098 54.645 6.60572C57.5427 12.1272 55.6505 19.0474 50.3146 22.3118C45.3844 25.3279 38.5382 23.9134 34.9136 18.7992C31.6426 14.1841 28.281 9.63422 24.9699 5.0476C23.7738 3.39085 23.7233 2.53998 24.6742 1.21773C25.6582 -0.15064 28.0515 -0.25039 29.0618 1.09736C32.1433 5.20735 35.187 9.34584 38.2496 13.4705C38.8513 14.2808 39.4583 15.0875 40.082 15.8802C42.2 18.5731 45.8651 18.9582 48.3185 16.7543C51.0208 14.327 51.2043 10.5335 48.7404 8.0431C45.6819 4.95198 40.6306 6.01285 39.0374 10.0778C38.9631 10.2676 38.9981 10.5185 38.6392 10.691V10.6906Z" fill={`url(#p1_${id})`} />
      <defs>
        <linearGradient id={`p0_${id}`} x1="32.2182" y1="-2.02546e-06" x2="-2.35867" y2="4.09781" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FBB931" /><stop offset="1" stopColor="#FF8660" />
        </linearGradient>
        <linearGradient id={`p1_${id}`} x1="55.9996" y1="0.137327" x2="21.6733" y2="4.21983" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FBB931" /><stop offset="1" stopColor="#FF8660" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Glass surfaces ── */
const glass1 = {
  background:"#F9F9F9",
  
  
  border: "1px solid rgba(0,0,0,0.06)",
  boxShadow: "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
};

/* ── Entry layout: A — the warmth ── */
function EntryWarmth() {
  return (
    <>
      <div className="entry-logo"><Logo id="warmth" size={48} /></div>
      <div style={{ position: "absolute", bottom: 100, left: 24, right: 24 }}>
        <h1 className="entry-h1">Why Kumamoto,<br />why now?</h1>
        <p className="entry-sub" style={{ marginBottom: 24 }}>{"Japan's fastest-rising property market"}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <span className="fact-chip">Serviced apartments</span>
          <span className="fact-chip">TSMC / JASM hub</span>
          <span className="fact-chip">Taiwanese engineers</span>
          <span className="fact-chip bold">12-15% IRR</span>
        </div>
      </div>
    </>
  );
}

/* ── Entry layout: B — the layers ── */
function EntryLayers() {
  const bars = [
    { label: "Serviced apartments", width: "78%", elev: 1, delay: 0 },
    { label: "TSMC / JASM semiconductor hub", width: "92%", elev: 1, delay: 0.08 },
    { label: "Taiwanese engineers", width: "68%", elev: 1, delay: 0.16 },
    { label: "12-15% IRR", width: "52%", elev: 2, delay: 0.24 },
  ];
  return (
    <>
      <div className="entry-logo"><Logo id="layers" size={48} /></div>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", padding: "0 24px", justifyContent: "center" }}>
        <h1 className="entry-h1">Why Kumamoto,<br />why now?</h1>
        <p className="entry-sub" style={{ marginBottom: 28 }}>{"Japan's fastest-rising property market"}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {bars.map((b, i) => (
            <div key={i} className={`glass-bar${b.elev === 2 ? " elev2" : ""}`} style={{ width: b.width, animation: `barSlideIn 0.6s ease-out ${b.delay}s both` }}>{b.label}</div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ── Entry layout: C — the signal ── */
function EntrySignal() {
  return (
    <>
      <div style={{ position: "absolute", top: "18%", left: "50%", transform: "translateX(-50%)", opacity: 0.14, animation: "logoPulse 4s ease-in-out infinite" }}>
        <Logo id="signal-bg" size={240} />
      </div>
      <div className="entry-logo"><Logo id="signal" size={48} /></div>
      <div style={{ position: "absolute", bottom: 100, left: 24, right: 24 }}>
        <h1 className="entry-h1">Why Kumamoto,<br />why now?</h1>
        <p className="entry-sub" style={{ marginBottom: 20 }}>{"Japan's fastest-rising property market"}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", gap: 8 }}>
            <span className="fact-chip">Serviced apartments</span>
            <span className="fact-chip">TSMC / JASM hub</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <span className="fact-chip">Taiwanese engineers</span>
            <span className="fact-chip bold">12-15% IRR</span>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Entry layout: D — the stagger ── */
function EntryStagger() {
  const items = [
    { icon: "\u25CA", text: "Serviced apartments", bold: false },
    { icon: "\u25CA", text: "TSMC / JASM semiconductor hub", bold: false },
    { icon: "\u25CA", text: "Taiwanese engineers", bold: false },
    { icon: "\u25CF", text: "12-15% IRR", bold: true },
  ];
  return (
    <>
      <div className="entry-logo"><Logo id="stagger" size={48} /></div>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", padding: "0 24px" }}>
        <div style={{ marginTop: 110 }}>
          <h1 className="entry-h1" style={{ fontSize: 44, lineHeight: 1.0, letterSpacing: "-0.03em" }}>Why<br />Kumamoto,<br />why now?</h1>
          <div style={{ width: 40, height: 3, borderRadius: 2, background: `linear-gradient(90deg,${AMBER},#FF8660)`, margin: "0 0 16px 0" }} />
          <p className="entry-sub" style={{ fontSize: 14, marginBottom: 32, maxWidth: 240 }}>{"Japan's fastest-rising property market"}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {items.map((it, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'Noto Sans JP',sans-serif", fontSize: 14, fontWeight: it.bold ? 600 : 400, color: it.bold ? N[950] : N[800], lineHeight: 1.4, animation: `fadeSlideIn 0.5s ease-out ${i * 0.1}s both` }}>
              <span style={{ color: AMBER, fontSize: 8 }}>{it.icon}</span>{it.text}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ── Bridge (shown after transition) ── */
function BridgeContent() {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 24px", background: "#F9F9F9" }}>
      <div className="entry-logo"><Logo id="bridge" size={48} /></div>
      <p style={{ fontFamily: "'Noto Sans JP',sans-serif", fontSize: 17, fontWeight: 400, color: N[800], lineHeight: 1.65, maxWidth: 340 }}>
        The COVID-era chip shortage exposed a hard truth: semiconductor security is national security. Now, Japan is investing over 10 trillion yen to rebuild its chip industry.
      </p>
      <p style={{ fontFamily: "'Noto Sans JP',sans-serif", fontSize: 15, fontWeight: 400, color: N[600], lineHeight: 1.65, maxWidth: 340, marginTop: 16 }}>
        With over 47,000 jobs being created, Kumamoto is set to attract waves of high-income engineers, fueling real estate growth for decades.
      </p>
      <p style={{ fontFamily: "'Noto Sans JP',sans-serif", fontSize: 12, color: N.dis, marginTop: 24 }}>Tap anywhere to reset</p>
    </div>
  );
}

/* ── Data ── */
const ENTRIES = [
  { key: "warmth", label: "A: The warmth", Comp: EntryWarmth },
  { key: "layers", label: "B: The layers", Comp: EntryLayers },
  { key: "signal", label: "C: The signal", Comp: EntrySignal },
  { key: "stagger", label: "D: The stagger", Comp: EntryStagger },
];
const TRANSITIONS = [
  { key: "sweep", label: "1: The sweep", duration: 700 },
  { key: "scatter", label: "2: The scatter", duration: 800 },
  { key: "dissolve", label: "3: The dissolve", duration: 900 },
  { key: "drop", label: "4: The drop", duration: 600 },
];

/* ── Scatter particles ── */
function ScatterDots() {
  const dots = Array.from({ length: 12 }, (_, i) => ({
    opacity: (0.3 + Math.random() * 0.4).toFixed(2),
    left: `${(30 + Math.random() * 40).toFixed(1)}%`,
    top: `${(30 + Math.random() * 40).toFixed(1)}%`,
    anim: `particle${i % 4} 0.8s ease-out forwards`,
  }));
  return (
    <>
      {dots.map((d, i) => (
        <div key={i} style={{ position: "absolute", width: 6, height: 6, borderRadius: "50%", background: `rgba(251,185,49,${d.opacity})`, left: d.left, top: d.top, animation: d.anim }} />
      ))}
    </>
  );
}

/* ── Main component ── */
const ENTRY_BY_VARIANT = { A: 0, B: 1, C: 2, D: 3 };

export default function GKTKEntryTransitions({ variant } = {}) {
  const entryIdx = ENTRY_BY_VARIANT[variant] ?? 0;
  const transIdx = 0; // sweep — default transition
  const [phase, setPhase] = useState("entry"); // entry | transitioning | bridge
  const [holdProgress, setHoldProgress] = useState(0);
  const [holding, setHolding] = useState(false);
  const holdStart = useRef(null);
  const holdRaf = useRef(null);
  const holdConfirmed = useRef(false);
  const transTimer = useRef(null);
  const [scatterKey, setScatterKey] = useState(0);

  const resetToEntry = useCallback(() => {
    if (transTimer.current) clearTimeout(transTimer.current);
    holdStart.current = null;
    holdConfirmed.current = false;
    setHoldProgress(0);
    setHolding(false);
    setPhase("entry");
  }, []);

  const startTransition = useCallback(() => {
    const t = TRANSITIONS[transIdx];
    setPhase("transitioning");
    if (t.key === "scatter") setScatterKey(k => k + 1);
    transTimer.current = setTimeout(() => setPhase("bridge"), t.duration);
  }, [transIdx]);

  const animateHold = useCallback(() => {
    if (!holdStart.current) return;
    const elapsed = Date.now() - holdStart.current;
    const p = Math.min(elapsed / HOLD_DURATION, 1);
    setHoldProgress(p);
    if (p >= 1 && !holdConfirmed.current) {
      holdConfirmed.current = true;
      startTransition();
      return;
    }
    if (p < 1) holdRaf.current = requestAnimationFrame(animateHold);
  }, [startTransition]);

  const onHoldStart = useCallback((e) => {
    e.preventDefault();
    if (phase !== "entry") return;
    holdConfirmed.current = false;
    holdStart.current = Date.now();
    setHolding(true);
    holdRaf.current = requestAnimationFrame(animateHold);
  }, [phase, animateHold]);

  const onHoldEnd = useCallback(() => {
    holdStart.current = null;
    setHolding(false);
    if (holdRaf.current) cancelAnimationFrame(holdRaf.current);
    if (!holdConfirmed.current) setHoldProgress(0);
  }, []);

  useEffect(() => () => {
    if (holdRaf.current) cancelAnimationFrame(holdRaf.current);
    if (transTimer.current) clearTimeout(transTimer.current);
  }, []);

  const t = TRANSITIONS[transIdx];
  const Entry = ENTRIES[entryIdx].Comp;
  const dashOffset = CIRCUMFERENCE * (1 - holdProgress);

  return (
    <div data-proto="step-2" style={{ fontFamily: "'Noto Sans JP',sans-serif", background: N[100], minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-proto="step-2"] *,
          [data-proto="step-2"] *::before,
          [data-proto="step-2"] *::after {
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

        .entry-logo { position: absolute; top: 60px; left: 24px; }
        .entry-h1 { font-family: 'REM', sans-serif; font-weight: 600; font-size: 36px; line-height: 1.1; letter-spacing: -0.025em; color: ${N[950]}; margin: 0 0 8px 0; }
        .entry-sub { font-family: 'Noto Sans JP', sans-serif; font-size: 15px; font-weight: 400; color: ${N[900]}; line-height: 1.5; margin: 0; }
        .fact-chip { display: inline-block; padding: 6px 14px; border-radius: 12px; background: #F9F9F9; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04); font-family: 'Noto Sans JP', sans-serif; font-size: 13px; font-weight: 500; color: ${N[600]}; letter-spacing: 0.01em; line-height: 1.4; }
        .fact-chip.bold { font-weight: 600; color: ${N[950]}; }
        .glass-bar { padding: 8px 14px; border-radius: 12px; background: #F9F9F9; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04); font-family: 'Noto Sans JP', sans-serif; font-size: 14px; font-weight: 400; color: ${N[800]}; line-height: 1.4; }
        .glass-bar.elev2 { padding: 10px 16px; background: #F9F9F9; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06); font-weight: 600; color: ${N[950]}; }
        @keyframes logoPulse { 0%, 100% { opacity: 0.12; transform: translateX(-50%) scale(1); } 50% { opacity: 0.18; transform: translateX(-50%) scale(1.03); } }
        @keyframes barSlideIn { from { opacity: 0; transform: translateX(-16px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeSlideIn { from { opacity: 0; transform: translateX(-12px); } to { opacity: 1; transform: translateX(0); } }

        @keyframes sweepOut { 0% { clip-path: inset(0 0 0 0); } 100% { clip-path: inset(0 0 0 100%); } }
        @keyframes sweepIn { from { clip-path: inset(0 100% 0 0); opacity: 0.8; } to { clip-path: inset(0 0 0 0); opacity: 1; } }
        @keyframes scatterOut { 0% { transform: scale(1); opacity: 1; } 60% { transform: scale(0.94); opacity: 0.6; } 100% { transform: scale(0.85); opacity: 0; } }
        @keyframes scatterIn { from { transform: scale(1.04); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes dissolveOut { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.98); } 100% { opacity: 0; transform: scale(0.96); } }
        @keyframes dissolveIn { from { opacity: 0; transform: scale(1.02); } to { opacity: 1; transform: scale(1); } }
        @keyframes dropOut { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(60px); opacity: 0; } }
        @keyframes dropIn { from { transform: translateY(-40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes sweepBand { 0% { clip-path: inset(0 100% 0 0); } 45% { clip-path: inset(0 0 0 0); } 55% { clip-path: inset(0 0 0 0); } 100% { clip-path: inset(0 0 0 100%); } }
        @keyframes particle0 { to { transform: translate(-80px, -120px) scale(0); opacity: 0; } }
        @keyframes particle1 { to { transform: translate(100px, -90px) scale(0); opacity: 0; } }
        @keyframes particle2 { to { transform: translate(-60px, 110px) scale(0); opacity: 0; } }
        @keyframes particle3 { to { transform: translate(90px, 80px) scale(0); opacity: 0; } }
      `}</style>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* iPhone device frame */}
        <div style={{ position: "relative", width: 393, height: 852, flexShrink: 0 }}>
          {/* Outer shell */}
          <div style={{ position: "absolute", inset: 0, borderRadius: 54, background: "#1A1A1C", boxShadow: "0 0 0 1px rgba(255,255,255,0.08) inset" }}>
            {/* Metallic edge */}
            <div style={{ position: "absolute", inset: -1, borderRadius: 55, background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.04) 40%, rgba(0,0,0,0.1) 60%, rgba(255,255,255,0.08) 100%)", zIndex: -1 }} />
            {/* Side buttons */}
            <div style={{ position: "absolute", right: -2, top: 180, width: 3, height: 80, borderRadius: "0 2px 2px 0", background: "#1A1A1C" }} />
            <div style={{ position: "absolute", left: -2, top: 160, width: 3, height: 36, borderRadius: "2px 0 0 2px", background: "#1A1A1C" }} />
            <div style={{ position: "absolute", left: -2, top: 204, width: 3, height: 36, borderRadius: "2px 0 0 2px", background: "#1A1A1C" }} />
            <div style={{ position: "absolute", left: -2, top: 120, width: 3, height: 18, borderRadius: "2px 0 0 2px", background: "#1A1A1C" }} />
          </div>

          {/* Screen */}
          <div style={{ position: "absolute", top: 6, left: 6, right: 6, bottom: 6, borderRadius: 49, overflow: "hidden", background: "#F9F9F9" }}>
            {/* Dynamic Island */}
            <div style={{ position: "absolute", top: 11, left: "50%", transform: "translateX(-50%)", width: 126, height: 37, background: "#000", borderRadius: 20, zIndex: 20 }}>
              <div style={{ position: "absolute", top: "50%", right: 18, transform: "translateY(-50%)", width: 11, height: 11, borderRadius: "50%", background: "radial-gradient(circle at 40% 40%, #1E2028 0%, #0A0A0C 50%, #1A1A1E 100%)", boxShadow: "0 0 0 1.5px #0D0D0F, 0 0 3px rgba(255,255,255,0.06) inset" }} />
            </div>

            {/* Flat screen bg (was mesh gradient) */}
            <div style={{ position: "absolute", inset: 0, background: "#F9F9F9", zIndex: 0 }} />

            {/* Phone content */}
            <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
              {phase === "entry" && (
                <div style={{ position: "absolute", inset: 0 }}>
                  <Entry />
                </div>
              )}
              {phase === "transitioning" && (
                <div style={{ position: "absolute", inset: 0, animation: `${t.key}Out ${t.duration}ms ease-in-out forwards` }}>
                  <Entry />
                </div>
              )}
              {phase === "bridge" && (
                <div
                  style={{ position: "absolute", inset: 0, animation: `${t.key}In 0.5s ease-out forwards`, cursor: "pointer" }}
                  onClick={resetToEntry}
                  role="button"
                  tabIndex={0}
                  aria-label="Reset"
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); resetToEntry(e); } }}
                >
                  <BridgeContent />
                </div>
              )}
            </div>

            {/* Hold button */}
            {phase === "entry" && (
              <div
                style={{ position: "absolute", bottom: 32, right: 24, zIndex: 10, width: 56, height: 56, cursor: "pointer", touchAction: "none", userSelect: "none", WebkitUserSelect: "none" }}
                onPointerDown={onHoldStart}
                onPointerUp={onHoldEnd}
                onPointerLeave={onHoldEnd}
                onPointerCancel={onHoldEnd}
              >
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", ...glass1, boxShadow: holding ? "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)" : glass1.boxShadow, transition: "box-shadow 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }} />
                <svg style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }} width="56" height="56">
                  <circle cx="28" cy="28" r="26" fill="none" stroke={AMBER} strokeWidth="2.5" strokeDasharray={CIRCUMFERENCE} strokeDashoffset={dashOffset} strokeLinecap="round" style={{ transition: holding ? "none" : "stroke-dashoffset 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }} />
                </svg>
                <svg style={{ position: "absolute", top: 18, left: 18 }} width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7 4l6 6-6 6" stroke={N[950]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}

            {/* Sweep overlay */}
            {phase === "transitioning" && t.key === "sweep" && (
              <div style={{ position: "absolute", inset: 0, zIndex: 5, background: "#EDEEF1", animation: `sweepBand ${t.duration}ms ease-in-out forwards` }} />
            )}

            {/* Scatter particles */}
            {phase === "transitioning" && t.key === "scatter" && (
              <div key={scatterKey} style={{ position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none", overflow: "hidden" }}>
                <ScatterDots />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

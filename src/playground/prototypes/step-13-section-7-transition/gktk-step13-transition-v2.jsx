import { useState, useRef, useEffect } from "react";

const C = {
  bg: "#F9F9F9",
  white: "#F9F9F9",
  amber: "#FBB931",
  n950: "#25272C",
  n900: "#383A42",
  n800: "#40444C",
  n600: "#5B616E",
  n200: "#D8DBDF",
  n100: "#EDEEF1",
};

const EASING = {
  gentle: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  settle: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
};

const Glass = ({ level = 1, children, style = {} }) => {
  const levels = {
    1: {
      background:"#F9F9F9",
      border: "1px solid rgba(0,0,0,0.06)",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
    },
    2: {
      background:"#F9F9F9",
      border: "1px solid rgba(0,0,0,0.06)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
    },
  };
  return (
    <div style={{ borderRadius: 20, ...levels[level], ...style }}>
      {children}
    </div>
  );
};

const PhoneFrame = ({ children }) => (
  <div style={{ position: "relative", width: 393, height: 852, borderRadius: 55, background: "#1A1A1E", overflow: "hidden", boxShadow: "0 0 0 1px rgba(255,255,255,0.08) inset" }}>
    <div style={{ position: "absolute", left: -2.5, top: 130, width: 3, height: 28, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
    <div style={{ position: "absolute", left: -2.5, top: 195, width: 3, height: 48, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
    <div style={{ position: "absolute", left: -2.5, top: 270, width: 3, height: 48, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
    <div style={{ position: "absolute", right: -2.5, top: 210, width: 3, height: 68, background: "#2a2a2a", borderRadius: "0 2px 2px 0" }} />
    <div style={{ position: "absolute", inset: 6, borderRadius: 49, overflow: "hidden", background: C.bg }}>
      <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 126, height: 36, background: "#000", borderRadius: 20, zIndex: 100 }} />
      {children}
    </div>
  </div>
);

const MeshGradient = () => (
  <div style={{ position: "absolute", inset: 0, background: C.bg }} />
);

const MapSVG = () => (
  <svg viewBox="0 0 280 606" style={{ width: "100%", height: "100%", position: "absolute" }}>
    {[90, 160, 240, 310, 390, 460, 530].map((y, i) => (
      <path key={i} d={`M0 ${y} Q70 ${y - 18 + i * 6} 140 ${y + 10 - i * 3} Q210 ${y + 5 + i * 4} 280 ${y - 7}`} stroke="rgba(255,255,255,0.06)" fill="none" strokeWidth="1" />
    ))}
    <line x1="55" y1="0" x2="78" y2="606" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
    <line x1="180" y1="0" x2="195" y2="606" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
    <line x1="0" y1="310" x2="280" y2="285" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
    <line x1="0" y1="420" x2="280" y2="430" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
    <rect x="88" y="195" width="104" height="190" rx="4" fill="rgba(251,185,49,0.12)" stroke="rgba(251,185,49,0.3)" strokeWidth="1" />
    {[[118, 245], [148, 285], [168, 325], [128, 355], [158, 375]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="4" fill={C.amber} opacity="0.8" />
    ))}
    <defs>
      <radialGradient id="mapVig" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="transparent" />
        <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
      </radialGradient>
    </defs>
    <rect x="0" y="0" width="280" height="606" fill="url(#mapVig)" />
  </svg>
);

const GhostMap = ({ containerRef }) => (
  <div ref={containerRef} style={{ position: "absolute", inset: 0, background: "#1a1e2a" }}>
    <MapSVG />
    {/* amber radial glow removed per flat-design mandate */}
  </div>
);

const ResolvePanel = ({ containerRef, headingRef, bodyRef }) => (
  <div ref={containerRef} style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 20px 40px", opacity: 0, visibility: "hidden" }}>
    <MeshGradient />
    <div style={{ position: "relative", zIndex: 1 }}>
      <Glass level={2} style={{ padding: "24px 20px" }}>
        <div ref={headingRef} style={{ fontFamily: "'REM', sans-serif", fontWeight: 600, fontSize: 13, color: C.n600, letterSpacing: "0.01em", lineHeight: 1.4, textAlign: "left", opacity: 0 }}>
          step-14-section-7-product-software
        </div>
        <div ref={bodyRef} style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12, color: C.n800, lineHeight: 1.6, marginTop: 8, textAlign: "left", opacity: 0 }}>
          Next section
        </div>
      </Glass>
    </div>
  </div>
);

const TapPrompt = ({ containerRef }) => (
  <div ref={containerRef} aria-live="polite" style={{ position: "absolute", bottom: 36, left: 0, right: 0, textAlign: "center", opacity: 0, visibility: "hidden" }}>
    <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12, color: C.n600, letterSpacing: "0.02em" }}>Tap to continue</div>
  </div>
);

const revealResolve = async (resolve, heading, body, prompt) => {
  resolve.style.visibility = "visible";
  await resolve.animate([
    { opacity: 0, transform: "translateY(30px) scale(0.97)" },
    { opacity: 0.4, transform: "translateY(14px) scale(0.985)", offset: 0.4 },
    { opacity: 1, transform: "translateY(0) scale(1)" },
  ], { duration: 750, easing: EASING.settle, fill: "forwards" }).finished;

  await new Promise(r => setTimeout(r, 200));
  await heading.animate([
    { opacity: 0, transform: "translateY(10px) scale(0.95)" },
    { opacity: 0.6, transform: "translateY(4px) scale(0.98)", offset: 0.5 },
    { opacity: 1, transform: "translateY(0) scale(1)" },
  ], { duration: 600, easing: EASING.settle, fill: "forwards" }).finished;

  await new Promise(r => setTimeout(r, 150));
  await body.animate([
    { opacity: 0, transform: "translateY(6px)" },
    { opacity: 1, transform: "translateY(0)" },
  ], { duration: 450, easing: EASING.settle, fill: "forwards" }).finished;

  await new Promise(r => setTimeout(r, 300));
  prompt.style.visibility = "visible";
  prompt.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: "forwards" });
};

const Lift = ({ playing, onDone }) => {
  const mapWrapRef = useRef(null);
  const resolveRef = useRef(null);
  const headingRef = useRef(null);
  const bodyRef = useRef(null);
  const promptRef = useRef(null);

  useEffect(() => {
    if (!playing) return;
    const mapWrap = mapWrapRef.current;
    const resolve = resolveRef.current;
    const heading = headingRef.current;
    const body = bodyRef.current;
    const prompt = promptRef.current;
    if (!mapWrap || !resolve || !heading || !body || !prompt) return;

    const run = async () => {
      await mapWrap.animate([
        { transform: "perspective(900px) rotateX(0deg)", opacity: 1, offset: 0 },
        { transform: "perspective(900px) rotateX(-1deg)", opacity: 1, offset: 0.05 },
        { transform: "perspective(900px) rotateX(-2.5deg)", opacity: 1, offset: 0.10 },
        { transform: "perspective(900px) rotateX(-4.5deg)", opacity: 1, offset: 0.16 },
        { transform: "perspective(900px) rotateX(-7deg)", opacity: 1, offset: 0.22 },
        { transform: "perspective(900px) rotateX(-10deg)", opacity: 0.98, offset: 0.28 },
        { transform: "perspective(900px) rotateX(-14deg)", opacity: 0.96, offset: 0.34 },
        { transform: "perspective(900px) rotateX(-19deg)", opacity: 0.93, offset: 0.40 },
        { transform: "perspective(900px) rotateX(-25deg)", opacity: 0.88, offset: 0.46 },
        { transform: "perspective(900px) rotateX(-32deg)", opacity: 0.80, offset: 0.52 },
        { transform: "perspective(900px) rotateX(-40deg)", opacity: 0.70, offset: 0.58 },
        { transform: "perspective(900px) rotateX(-49deg)", opacity: 0.56, offset: 0.64 },
        { transform: "perspective(900px) rotateX(-58deg)", opacity: 0.40, offset: 0.70 },
        { transform: "perspective(900px) rotateX(-66deg)", opacity: 0.26, offset: 0.77 },
        { transform: "perspective(900px) rotateX(-74deg)", opacity: 0.14, offset: 0.84 },
        { transform: "perspective(900px) rotateX(-81deg)", opacity: 0.06, offset: 0.92 },
        { transform: "perspective(900px) rotateX(-88deg)", opacity: 0, offset: 1 },
      ], { duration: 2000, easing: "linear", fill: "forwards" }).finished;

      await new Promise(r => setTimeout(r, 500));
      await revealResolve(resolve, heading, body, prompt);
      onDone();
    };
    run();
  }, [playing]);

  return (
    <>
      <MeshGradient />
      <div ref={mapWrapRef} style={{ position: "absolute", inset: 0, transformOrigin: "50% 100%", zIndex: 5 }}>
        <GhostMap containerRef={useRef(null)} />
      </div>
      <ResolvePanel containerRef={resolveRef} headingRef={headingRef} bodyRef={bodyRef} />
      <TapPrompt containerRef={promptRef} />
    </>
  );
};

const Push = ({ playing, onDone }) => {
  const mapWrapRef = useRef(null);
  const resolveRef = useRef(null);
  const headingRef = useRef(null);
  const bodyRef = useRef(null);
  const promptRef = useRef(null);

  useEffect(() => {
    if (!playing) return;
    const mapWrap = mapWrapRef.current;
    const resolve = resolveRef.current;
    const heading = headingRef.current;
    const body = bodyRef.current;
    const prompt = promptRef.current;
    if (!mapWrap || !resolve || !heading || !body || !prompt) return;

    const run = async () => {
      await mapWrap.animate([
        { transform: "perspective(700px) translateZ(0px) rotateX(0deg) scale(1)", opacity: 1, offset: 0 },
        { transform: "perspective(700px) translateZ(-4px) rotateX(0.2deg) scale(0.998)", opacity: 1, offset: 0.05 },
        { transform: "perspective(700px) translateZ(-10px) rotateX(0.5deg) scale(0.995)", opacity: 1, offset: 0.10 },
        { transform: "perspective(700px) translateZ(-20px) rotateX(0.9deg) scale(0.99)", opacity: 1, offset: 0.16 },
        { transform: "perspective(700px) translateZ(-34px) rotateX(1.5deg) scale(0.982)", opacity: 0.98, offset: 0.22 },
        { transform: "perspective(700px) translateZ(-52px) rotateX(2.2deg) scale(0.972)", opacity: 0.96, offset: 0.28 },
        { transform: "perspective(700px) translateZ(-75px) rotateX(3.1deg) scale(0.958)", opacity: 0.92, offset: 0.34 },
        { transform: "perspective(700px) translateZ(-105px) rotateX(4.2deg) scale(0.94)", opacity: 0.86, offset: 0.40 },
        { transform: "perspective(700px) translateZ(-140px) rotateX(5.4deg) scale(0.918)", opacity: 0.78, offset: 0.46 },
        { transform: "perspective(700px) translateZ(-180px) rotateX(6.8deg) scale(0.892)", opacity: 0.68, offset: 0.52 },
        { transform: "perspective(700px) translateZ(-225px) rotateX(8.2deg) scale(0.862)", opacity: 0.56, offset: 0.58 },
        { transform: "perspective(700px) translateZ(-275px) rotateX(9.6deg) scale(0.828)", opacity: 0.44, offset: 0.64 },
        { transform: "perspective(700px) translateZ(-325px) rotateX(10.8deg) scale(0.79)", opacity: 0.32, offset: 0.70 },
        { transform: "perspective(700px) translateZ(-375px) rotateX(12deg) scale(0.748)", opacity: 0.22, offset: 0.76 },
        { transform: "perspective(700px) translateZ(-420px) rotateX(13deg) scale(0.70)", opacity: 0.14, offset: 0.82 },
        { transform: "perspective(700px) translateZ(-460px) rotateX(13.8deg) scale(0.66)", opacity: 0.07, offset: 0.88 },
        { transform: "perspective(700px) translateZ(-495px) rotateX(14.5deg) scale(0.62)", opacity: 0.02, offset: 0.94 },
        { transform: "perspective(700px) translateZ(-520px) rotateX(15deg) scale(0.58)", opacity: 0, offset: 1 },
      ], { duration: 2200, easing: "linear", fill: "forwards" }).finished;

      await new Promise(r => setTimeout(r, 500));

      resolve.style.visibility = "visible";
      await resolve.animate([
        { opacity: 0, transform: "perspective(700px) translateZ(-160px) rotateX(-2deg)" },
        { opacity: 0.1, transform: "perspective(700px) translateZ(-120px) rotateX(-1.6deg)", offset: 0.15 },
        { opacity: 0.25, transform: "perspective(700px) translateZ(-80px) rotateX(-1.1deg)", offset: 0.30 },
        { opacity: 0.45, transform: "perspective(700px) translateZ(-48px) rotateX(-0.7deg)", offset: 0.48 },
        { opacity: 0.65, transform: "perspective(700px) translateZ(-24px) rotateX(-0.35deg)", offset: 0.65 },
        { opacity: 0.85, transform: "perspective(700px) translateZ(-8px) rotateX(-0.1deg)", offset: 0.82 },
        { opacity: 1, transform: "perspective(700px) translateZ(0px) rotateX(0deg)" },
      ], { duration: 950, easing: EASING.settle, fill: "forwards" }).finished;

      await new Promise(r => setTimeout(r, 200));
      await heading.animate([
        { opacity: 0, transform: "translateY(10px) scale(0.95)" },
        { opacity: 0.6, transform: "translateY(4px) scale(0.98)", offset: 0.5 },
        { opacity: 1, transform: "translateY(0) scale(1)" },
      ], { duration: 600, easing: EASING.settle, fill: "forwards" }).finished;

      await new Promise(r => setTimeout(r, 150));
      await body.animate([
        { opacity: 0, transform: "translateY(6px)" },
        { opacity: 1, transform: "translateY(0)" },
      ], { duration: 450, easing: EASING.settle, fill: "forwards" }).finished;

      await new Promise(r => setTimeout(r, 300));
      prompt.style.visibility = "visible";
      prompt.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: "forwards" });
      onDone();
    };
    run();
  }, [playing]);

  return (
    <>
      <MeshGradient />
      <div ref={mapWrapRef} style={{ position: "absolute", inset: 0, zIndex: 5, transformOrigin: "50% 55%" }}>
        <GhostMap containerRef={useRef(null)} />
      </div>
      <ResolvePanel containerRef={resolveRef} headingRef={headingRef} bodyRef={bodyRef} />
      <TapPrompt containerRef={promptRef} />
    </>
  );
};

const VARIANTS = [
  { id: "B", label: "B: the lift", Component: Lift },
  { id: "D", label: "D: the push", Component: Push },
];

export default function Step13TransitionV2({ variant } = {}) {
  const resolved = VARIANTS.find(v => v.id === variant) ? variant : "B";
  const [done, setDone] = useState(false);
  const [key, setKey] = useState(0);
  const current = VARIANTS.find(v => v.id === resolved);

  const replay = () => {
    if (!done) return;
    setDone(false);
    setKey(k => k + 1);
  };

  return (
    <div
      data-proto="step-13"
      onClick={replay}
      role="button"
      tabIndex={0}
      aria-label="Replay"
      onKeyDown={(e) => { if ((e.key === "Enter" || e.key === " ") && done) { e.preventDefault(); replay(); } }}
      style={{
        minHeight: "100vh", background: "#EDEEF1",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: 24, fontFamily: "'Noto Sans JP', -apple-system, sans-serif",
        cursor: done ? "pointer" : "default",
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-proto="step-13"] *,
          [data-proto="step-13"] *::before,
          [data-proto="step-13"] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
      `}</style>
      <PhoneFrame>
        <div key={`${resolved}-${key}`} style={{ position: "absolute", inset: 0, borderRadius: 34, overflow: "hidden" }}>
          {current && <current.Component playing={true} onDone={() => setDone(true)} />}
        </div>
        <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 90, height: 24, background: "#000", borderRadius: 20, zIndex: 100 }} />
      </PhoneFrame>
    </div>
  );
}

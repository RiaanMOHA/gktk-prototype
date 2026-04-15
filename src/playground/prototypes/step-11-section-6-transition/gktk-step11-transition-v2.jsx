import { useState, useRef, useEffect } from "react";

const C = {
  bg: "#F9F9F9",
  white: "#FEFEFE",
  amber: "#FBB931",
  n950: "#25272C",
  n900: "#383A42",
  n800: "#40444C",
  n600: "#5B616E",
  n200: "#D8DBDF",
  n100: "#EDEEF1",
};

const EASING = {
  gentle: "cubic-bezier(0.23, 0.86, 0.39, 0.96)",
  settle: "cubic-bezier(0.22, 1, 0.36, 1)",
};

const NoiseGrain = ({ id = "noise" }) => (
  <svg style={{ position: "absolute", width: 0, height: 0 }}>
    <defs>
      <filter id={id}>
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feBlend in="SourceGraphic" mode="overlay" />
      </filter>
    </defs>
  </svg>
);

const Glass = ({ level = 1, children, style = {} }) => {
  const levels = {
    1: {
      background: "rgba(255,255,255,0.70)",
      backdropFilter: "blur(20px) saturate(1.4)",
      WebkitBackdropFilter: "blur(20px) saturate(1.4)",
      border: "1px solid rgba(255,255,255,0.85)",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)",
    },
    2: {
      background: "rgba(255,255,255,0.88)",
      backdropFilter: "blur(24px) saturate(1.6)",
      WebkitBackdropFilter: "blur(24px) saturate(1.6)",
      border: "1px solid rgba(255,255,255,0.95)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.95)",
    },
  };
  return (
    <div style={{ borderRadius: 16, ...levels[level], ...style }}>
      {children}
    </div>
  );
};

const PhoneFrame = ({ children }) => (
  <div style={{ position: "relative", width: 280, height: 606, borderRadius: 40, background: "#1a1a1a", boxShadow: "inset 0 0 0 1.5px rgba(255,255,255,0.12)", padding: 6 }}>
    <div style={{ position: "absolute", left: -2.5, top: 90, width: 3, height: 28, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
    <div style={{ position: "absolute", left: -2.5, top: 140, width: 3, height: 48, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
    <div style={{ position: "absolute", left: -2.5, top: 196, width: 3, height: 48, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
    <div style={{ position: "absolute", right: -2.5, top: 150, width: 3, height: 68, background: "#2a2a2a", borderRadius: "0 2px 2px 0" }} />
    <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 34, overflow: "hidden", background: C.bg }}>
      <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 90, height: 24, background: "#000", borderRadius: 20, zIndex: 100 }} />
      {children}
    </div>
  </div>
);

const MeshGradient = () => (
  <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 140% 80% at 30% 20%, rgba(237,238,241,0.5) 0%, transparent 60%), radial-gradient(ellipse 100% 100% at 80% 70%, rgba(254,242,201,0.15) 0%, transparent 50%), ${C.bg}` }} />
);

const GhostBridge = ({ containerRef }) => (
  <div ref={containerRef} style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 20px 40px" }}>
    <MeshGradient />
    <div style={{ position: "relative", zIndex: 1 }}>
      <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 11, fontWeight: 500, color: C.n600, letterSpacing: "0.01em", marginBottom: 16, textAlign: "left" }}>The investment</div>
      <Glass level={2} style={{ padding: "20px 16px", marginBottom: 12 }}>
        <div style={{ fontFamily: "'REM', sans-serif", fontWeight: 600, fontSize: 28, color: C.n950, letterSpacing: "-0.02em", lineHeight: 1.1, textAlign: "left" }}>10 trillion yen</div>
        <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 13, color: C.n800, lineHeight: 1.5, marginTop: 6, textAlign: "left" }}>Total semiconductor investment committed to Kumamoto prefecture</div>
      </Glass>
      <Glass level={1} style={{ padding: "14px 16px" }}>
        <div style={{ fontFamily: "'REM', sans-serif", fontWeight: 600, fontSize: 20, color: C.n950, letterSpacing: "-0.015em", textAlign: "left" }}>47,000 jobs</div>
        <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12, color: C.n800, lineHeight: 1.5, marginTop: 4, textAlign: "left" }}>New positions projected by 2030</div>
      </Glass>
    </div>
  </div>
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

const MapDestination = ({ containerRef }) => (
  <div ref={containerRef} style={{ position: "absolute", inset: 0, background: "#1a1e2a", opacity: 0, visibility: "hidden" }}>
    <MapSVG />
    <div style={{ position: "absolute", top: 195, left: 88, width: 104, height: 190, background: "radial-gradient(ellipse at center, rgba(251,185,49,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
  </div>
);

const TapPrompt = ({ containerRef }) => (
  <div ref={containerRef} style={{ position: "absolute", bottom: 36, left: 0, right: 0, textAlign: "center", opacity: 0, visibility: "hidden" }}>
    <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.02em" }}>Tap to continue</div>
  </div>
);

const revealMap = async (map, prompt) => {
  map.style.visibility = "visible";
  await map.animate([
    { opacity: 0, filter: "blur(14px)" },
    { opacity: 0.3, filter: "blur(8px)", offset: 0.3 },
    { opacity: 0.7, filter: "blur(3px)", offset: 0.65 },
    { opacity: 1, filter: "blur(0px)" },
  ], { duration: 700, easing: EASING.settle, fill: "forwards" }).finished;
  await new Promise(r => setTimeout(r, 200));
  prompt.style.visibility = "visible";
  prompt.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: "forwards" });
};

const Tilt = ({ playing, onDone }) => {
  const ghostRef = useRef(null);
  const perspRef = useRef(null);
  const mapRef = useRef(null);
  const promptRef = useRef(null);

  useEffect(() => {
    if (!playing) return;
    const persp = perspRef.current;
    const map = mapRef.current;
    const prompt = promptRef.current;
    if (!persp || !map || !prompt) return;

    const run = async () => {
      await persp.animate([
        { transform: "perspective(600px) rotateX(0deg) translateY(0px)", opacity: 1, filter: "blur(0px)", offset: 0 },
        { transform: "perspective(600px) rotateX(1.5deg) translateY(2px)", opacity: 1, filter: "blur(0px)", offset: 0.06 },
        { transform: "perspective(600px) rotateX(3deg) translateY(5px)", opacity: 1, filter: "blur(0px)", offset: 0.12 },
        { transform: "perspective(600px) rotateX(5.5deg) translateY(10px)", opacity: 1, filter: "blur(0px)", offset: 0.18 },
        { transform: "perspective(600px) rotateX(8deg) translateY(17px)", opacity: 1, filter: "blur(0.2px)", offset: 0.24 },
        { transform: "perspective(600px) rotateX(11.5deg) translateY(28px)", opacity: 1, filter: "blur(0.4px)", offset: 0.30 },
        { transform: "perspective(600px) rotateX(15deg) translateY(42px)", opacity: 0.98, filter: "blur(0.6px)", offset: 0.36 },
        { transform: "perspective(600px) rotateX(20deg) translateY(62px)", opacity: 0.95, filter: "blur(0.9px)", offset: 0.42 },
        { transform: "perspective(600px) rotateX(26deg) translateY(90px)", opacity: 0.90, filter: "blur(1.2px)", offset: 0.48 },
        { transform: "perspective(600px) rotateX(33deg) translateY(130px)", opacity: 0.82, filter: "blur(1.6px)", offset: 0.54 },
        { transform: "perspective(600px) rotateX(40deg) translateY(180px)", opacity: 0.72, filter: "blur(2px)", offset: 0.60 },
        { transform: "perspective(600px) rotateX(47deg) translateY(240px)", opacity: 0.58, filter: "blur(2.8px)", offset: 0.66 },
        { transform: "perspective(600px) rotateX(54deg) translateY(310px)", opacity: 0.42, filter: "blur(3.5px)", offset: 0.72 },
        { transform: "perspective(600px) rotateX(60deg) translateY(380px)", opacity: 0.28, filter: "blur(4.5px)", offset: 0.78 },
        { transform: "perspective(600px) rotateX(65deg) translateY(450px)", opacity: 0.16, filter: "blur(5.5px)", offset: 0.84 },
        { transform: "perspective(600px) rotateX(70deg) translateY(520px)", opacity: 0.08, filter: "blur(6.5px)", offset: 0.90 },
        { transform: "perspective(600px) rotateX(73deg) translateY(560px)", opacity: 0.03, filter: "blur(7px)", offset: 0.95 },
        { transform: "perspective(600px) rotateX(75deg) translateY(600px)", opacity: 0, filter: "blur(8px)", offset: 1 },
      ], { duration: 2200, easing: "linear", fill: "forwards" }).finished;

      await new Promise(r => setTimeout(r, 350));
      await revealMap(map, prompt);
      onDone();
    };
    run();
  }, [playing]);

  return (
    <>
      <div ref={perspRef} style={{ position: "absolute", inset: 0, transformOrigin: "50% 0%" }}>
        <GhostBridge containerRef={ghostRef} />
      </div>
      <MapDestination containerRef={mapRef} />
      <TapPrompt containerRef={promptRef} />
    </>
  );
};

const Corridor = ({ playing, onDone }) => {
  const ghostRef = useRef(null);
  const wrapRef = useRef(null);
  const mapRef = useRef(null);
  const promptRef = useRef(null);

  useEffect(() => {
    if (!playing) return;
    const wrap = wrapRef.current;
    const map = mapRef.current;
    const prompt = promptRef.current;
    if (!wrap || !map || !prompt) return;

    const run = async () => {
      await wrap.animate([
        { transform: "perspective(900px) translateZ(0px) scaleX(1) scaleY(1)", filter: "blur(0px) brightness(1)", opacity: 1, offset: 0 },
        { transform: "perspective(900px) translateZ(-5px) scaleX(0.995) scaleY(0.998)", filter: "blur(0px) brightness(1)", opacity: 1, offset: 0.05 },
        { transform: "perspective(900px) translateZ(-12px) scaleX(0.985) scaleY(0.994)", filter: "blur(0px) brightness(0.99)", opacity: 1, offset: 0.10 },
        { transform: "perspective(900px) translateZ(-24px) scaleX(0.97) scaleY(0.988)", filter: "blur(0.2px) brightness(0.98)", opacity: 1, offset: 0.16 },
        { transform: "perspective(900px) translateZ(-40px) scaleX(0.95) scaleY(0.98)", filter: "blur(0.4px) brightness(0.96)", opacity: 0.98, offset: 0.22 },
        { transform: "perspective(900px) translateZ(-62px) scaleX(0.92) scaleY(0.97)", filter: "blur(0.6px) brightness(0.94)", opacity: 0.96, offset: 0.28 },
        { transform: "perspective(900px) translateZ(-90px) scaleX(0.88) scaleY(0.955)", filter: "blur(0.9px) brightness(0.91)", opacity: 0.92, offset: 0.34 },
        { transform: "perspective(900px) translateZ(-125px) scaleX(0.83) scaleY(0.94)", filter: "blur(1.3px) brightness(0.87)", opacity: 0.86, offset: 0.40 },
        { transform: "perspective(900px) translateZ(-165px) scaleX(0.77) scaleY(0.92)", filter: "blur(1.8px) brightness(0.82)", opacity: 0.78, offset: 0.46 },
        { transform: "perspective(900px) translateZ(-210px) scaleX(0.70) scaleY(0.895)", filter: "blur(2.3px) brightness(0.77)", opacity: 0.68, offset: 0.52 },
        { transform: "perspective(900px) translateZ(-260px) scaleX(0.62) scaleY(0.86)", filter: "blur(2.9px) brightness(0.71)", opacity: 0.56, offset: 0.58 },
        { transform: "perspective(900px) translateZ(-315px) scaleX(0.53) scaleY(0.82)", filter: "blur(3.5px) brightness(0.65)", opacity: 0.44, offset: 0.64 },
        { transform: "perspective(900px) translateZ(-370px) scaleX(0.44) scaleY(0.77)", filter: "blur(4.2px) brightness(0.58)", opacity: 0.32, offset: 0.70 },
        { transform: "perspective(900px) translateZ(-420px) scaleX(0.35) scaleY(0.71)", filter: "blur(5px) brightness(0.50)", opacity: 0.22, offset: 0.76 },
        { transform: "perspective(900px) translateZ(-465px) scaleX(0.27) scaleY(0.64)", filter: "blur(5.8px) brightness(0.42)", opacity: 0.14, offset: 0.82 },
        { transform: "perspective(900px) translateZ(-505px) scaleX(0.19) scaleY(0.56)", filter: "blur(6.5px) brightness(0.35)", opacity: 0.08, offset: 0.88 },
        { transform: "perspective(900px) translateZ(-540px) scaleX(0.12) scaleY(0.46)", filter: "blur(7px) brightness(0.28)", opacity: 0.03, offset: 0.94 },
        { transform: "perspective(900px) translateZ(-570px) scaleX(0.06) scaleY(0.36)", filter: "blur(8px) brightness(0.22)", opacity: 0, offset: 1 },
      ], { duration: 2400, easing: "linear", fill: "forwards" }).finished;

      await new Promise(r => setTimeout(r, 350));
      await revealMap(map, prompt);
      onDone();
    };
    run();
  }, [playing]);

  return (
    <>
      <div ref={wrapRef} style={{ position: "absolute", inset: 0, transformOrigin: "50% 50%" }}>
        <GhostBridge containerRef={ghostRef} />
      </div>
      <MapDestination containerRef={mapRef} />
      <TapPrompt containerRef={promptRef} />
    </>
  );
};

const VARIANTS = [
  { id: "B", label: "B: the tilt", Component: Tilt },
  { id: "C", label: "C: the corridor", Component: Corridor },
];

export default function Step11TransitionV2({ variant } = {}) {
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
      onClick={replay}
      style={{
        minHeight: "100vh", background: "#EDEEF1",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: 24, fontFamily: "'Noto Sans JP', -apple-system, sans-serif",
        cursor: done ? "pointer" : "default",
      }}
    >
      <NoiseGrain />
      <PhoneFrame>
        <div key={`${resolved}-${key}`} style={{ position: "absolute", inset: 0, borderRadius: 34, overflow: "hidden" }}>
          {current && <current.Component playing={true} onDone={() => setDone(true)} />}
        </div>
        <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 90, height: 24, background: "#000", borderRadius: 20, zIndex: 100 }} />
      </PhoneFrame>
    </div>
  );
}

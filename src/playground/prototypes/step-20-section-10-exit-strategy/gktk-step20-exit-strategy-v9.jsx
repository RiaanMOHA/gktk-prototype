import { useState, useRef, useCallback } from "react";

/* ─── approved content only (reduced from wireframe) ─── */
const EXIT_PATHS = [
  {
    id: "reit",
    name: "CapitaLand REIT injection",
    stat: "2 to 3%",
    statLabel: "ROFR discount",
    body: "Contractual right of first refusal. Pre-negotiated exit pipeline.",
  },
  {
    id: "market",
    name: "Open market sale",
    stat: "Master lease",
    statLabel: "in place at sale",
    body: "De-risked acquisition. Premium valuation from stable industrial demand.",
  },
];


/* ─── easing ─── */
const EASE = {
  gentle: "cubic-bezier(0.4, 0, 0.2, 1)",
  settle: "cubic-bezier(0.22, 1, 0.36, 1)",
  smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
};

const an = (el, keyframes, options) => {
  if (!el) return Promise.resolve();
  return el.animate(keyframes, { fill: "forwards", ...options }).finished;
};
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* ─── mesh gradient ─── */
const MeshGradient = () => (
  <div style={{
    position: "absolute", inset: 0, borderRadius: 40, overflow: "hidden", pointerEvents: "none",
  }}>
    <div style={{
      position: "absolute", inset: 0,
      background: "radial-gradient(ellipse 120% 80% at 20% 20%, rgba(251,185,49,0.06) 0%, transparent 60%), radial-gradient(ellipse 100% 100% at 80% 80%, rgba(180,190,210,0.08) 0%, transparent 50%), radial-gradient(ellipse 80% 60% at 60% 30%, rgba(200,210,230,0.06) 0%, transparent 50%), #F9F9F9",
    }} />
  </div>
);

/* ─── glass panel ─── */
const GlassPanel = ({ children, level = 1, style = {}, innerRef }) => {
  const levels = {
    1: {
      background: "rgba(255,255,255,0.70)",
      backdropFilter: "blur(20px) saturate(1.4)",
      WebkitBackdropFilter: "blur(20px) saturate(1.4)",
      border: "1px solid rgba(255,255,255,0.85)",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
    },
    2: {
      background: "rgba(255,255,255,0.88)",
      backdropFilter: "blur(24px) saturate(1.6)",
      WebkitBackdropFilter: "blur(24px) saturate(1.6)",
      border: "1px solid rgba(255,255,255,0.95)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
    },
  };
  return (
    <div ref={innerRef} style={{ borderRadius: 16, position: "relative", overflow: "hidden", ...levels[level], ...style }}>
      <div style={{ position: "absolute", top: 0, left: 8, right: 8, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent)", borderRadius: "16px 16px 0 0", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 40, background: "linear-gradient(180deg, rgba(255,255,255,0.3), transparent)", borderRadius: "16px 16px 0 0", pointerEvents: "none" }} />
      {children}
    </div>
  );
};

/* ─── iPhone 17 Pro ─── */
const PhoneFrame = ({ children }) => (
  <div style={{ width: 380, margin: "0 auto", position: "relative", background: "#1A1A1E", borderRadius: 44, padding: 6, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)" }}>
    <div style={{ position:"absolute",left:-2,top:100,width:3,height:32,background:"#2A2A2E",borderRadius:"2px 0 0 2px" }} />
    <div style={{ position:"absolute",left:-2,top:150,width:3,height:56,background:"#2A2A2E",borderRadius:"2px 0 0 2px" }} />
    <div style={{ position:"absolute",left:-2,top:214,width:3,height:56,background:"#2A2A2E",borderRadius:"2px 0 0 2px" }} />
    <div style={{ position:"absolute",right:-2,top:160,width:3,height:72,background:"#2A2A2E",borderRadius:"0 2px 2px 0" }} />
    <div style={{ position:"absolute",inset:-1,borderRadius:45,border:"1px solid rgba(255,255,255,0.12)",pointerEvents:"none" }} />
    <div style={{ borderRadius: 40, overflow: "hidden", position: "relative", background: "#F9F9F9", height: 720 }}>
      <MeshGradient />
      <div style={{ position:"absolute",top:10,left:"50%",transform:"translateX(-50%)",width:126,height:36,background:"#000",borderRadius:20,zIndex:100 }} />
      <div style={{ position: "relative", zIndex: 1, height: "100%", overflow: "hidden" }}>{children}</div>
    </div>
  </div>
);

const TapPrompt = ({ innerRef, label = "Tap to continue" }) => (
  <div ref={innerRef} style={{ position: "absolute", bottom: 28, left: 0, right: 0, textAlign: "center", opacity: 0, zIndex: 50 }}>
    <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12, color: "#8E95A2", letterSpacing: 0.3 }}>{label}</span>
  </div>
);

/* ─── shared beat 2 ─── */
const Beat2Content = ({ ctaRef }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", paddingLeft: 40, paddingRight: 40 }}>
    <div ref={ctaRef} style={{ opacity: 0, width: "100%" }}>
      <button style={{ background: "#FBB931", border: "none", borderRadius: 14, padding: "16px 0", width: "100%", cursor: "pointer", fontFamily: "'REM', sans-serif", fontWeight: 600, fontSize: 15, color: "#25272C", boxShadow: "0 2px 12px rgba(251,185,49,0.25)" }}>Download PDF</button>
    </div>
  </div>
);

const playBeat2Anim = async (running, ctaRef) => {
  await wait(200);
  await an(ctaRef.current, [
    { opacity: 0, transform: "translateY(10px) scale(0.96)", filter: "blur(4px)" },
    { opacity: 0.6, transform: "translateY(3px) scale(0.99)", filter: "blur(1px)" },
    { opacity: 1, transform: "translateY(0) scale(1)", filter: "blur(0)" },
  ], { duration: 550, easing: EASE.settle });
  running.current = false;
};


/* ───────────────────────────────────────────────
   A: THE REVEAL
   Heading, guide line, cards materialize one by one.
   ─────────────────────────────────────────────── */

const VariantA = () => {
  const [beat, setBeat] = useState(0);
  const running = useRef(false);
  const headRef = useRef(null);
  const subRef = useRef(null);
  const guideRef = useRef(null);
  const cardRefs = useRef([]);
  const tapRef = useRef(null);
  const ctaRef = useRef(null);

  const playBeat1 = useCallback(async () => {
    if (running.current) return;
    running.current = true; setBeat(1);
    await an(headRef.current, [{ opacity: 0, transform: "translateY(16px)", filter: "blur(4px)" }, { opacity: 0.5, transform: "translateY(5px)", filter: "blur(1.5px)" }, { opacity: 1, transform: "translateY(0)", filter: "blur(0)" }], { duration: 550, easing: EASE.settle });
    await wait(120);
    await an(subRef.current, [{ opacity: 0, transform: "translateY(10px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 400, easing: EASE.settle });
    await wait(250);
    await an(guideRef.current, [{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 450, easing: EASE.settle });
    await wait(350);
    await an(cardRefs.current[0], [{ opacity: 0, transform: "translateY(30px) scale(0.96)", filter: "blur(6px)" }, { opacity: 0.4, transform: "translateY(14px) scale(0.98)", filter: "blur(3px)" }, { opacity: 0.8, transform: "translateY(4px) scale(0.99)", filter: "blur(0.8px)" }, { opacity: 1, transform: "translateY(0) scale(1)", filter: "blur(0)" }], { duration: 650, easing: EASE.settle });
    await wait(250);
    await an(cardRefs.current[1], [{ opacity: 0, transform: "translateY(30px) scale(0.96)", filter: "blur(6px)" }, { opacity: 0.4, transform: "translateY(14px) scale(0.98)", filter: "blur(3px)" }, { opacity: 0.8, transform: "translateY(4px) scale(0.99)", filter: "blur(0.8px)" }, { opacity: 1, transform: "translateY(0) scale(1)", filter: "blur(0)" }], { duration: 650, easing: EASE.settle });
    await wait(350);
    await an(tapRef.current, [{ opacity: 0 }, { opacity: 1 }], { duration: 400, easing: EASE.smooth });
    running.current = false;
  }, []);

  const handleTap = () => {
    if (running.current) return;
    if (beat === 0) playBeat1();
    else if (beat === 1) { running.current = true; setBeat(2); playBeat2Anim(running, ctaRef); }
  };

  return (
    <PhoneFrame>
      <div onClick={handleTap} style={{ position: "absolute", inset: 0, zIndex: 60, cursor: "pointer" }} />
      <div style={{ position: "absolute", inset: 0, paddingTop: 62, paddingLeft: 22, paddingRight: 22, display: beat <= 1 ? "flex" : "none", flexDirection: "column" }}>
        <div ref={headRef} style={{ opacity: 0, marginBottom: 6 }}>
          <span style={{ fontFamily: "'REM', sans-serif", fontWeight: 600, fontSize: 24, color: "#25272C", lineHeight: 1.2 }}>Exit strategy</span>
        </div>
        <div ref={subRef} style={{ opacity: 0, marginBottom: 20 }}>
          <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 13, color: "#6B7280", lineHeight: 1.5 }}>Two structured paths to liquidity, plus built-in asset flexibility.</span>
        </div>
        <div ref={guideRef} style={{ opacity: 0, marginBottom: 28 }}>
          <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 14, color: "#40444C", fontStyle: "italic", lineHeight: 1.5 }}>Two doors. One is already unlocked.</span>
        </div>
        {EXIT_PATHS.map((ep, i) => (
          <div key={ep.id} ref={(el) => (cardRefs.current[i] = el)} style={{ opacity: 0, marginBottom: 14 }}>
            <GlassPanel level={2} style={{ padding: "18px 18px" }}>
              <div style={{ position: "relative", zIndex: 2 }}>
                <div style={{ fontFamily: "'REM', sans-serif", fontWeight: 600, fontSize: 15, color: "#25272C", marginBottom: 8 }}>{ep.name}</div>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", background: "rgba(251,185,49,0.10)", borderRadius: 8, padding: "6px 12px", marginBottom: 10 }}>
                  <span style={{ fontFamily: "'REM', sans-serif", fontWeight: 600, fontSize: 20, color: "#25272C" }}>{ep.stat}</span>
                  <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 11, color: "#6B7280" }}>{ep.statLabel}</span>
                </div>
                <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12, color: "#6B7280", lineHeight: 1.5 }}>{ep.body}</div>
              </div>
            </GlassPanel>
          </div>
        ))}
        <TapPrompt innerRef={tapRef} />
      </div>
      <div style={{ position: "absolute", inset: 0, display: beat === 2 ? "block" : "none" }}>
        <Beat2Content ctaRef={ctaRef} />
      </div>
      {beat === 0 && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 40, pointerEvents: "none" }}><span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 13, color: "#8E95A2" }}>Tap to play</span></div>}
      <button onClick={(e) => { e.stopPropagation(); setBeat(0); running.current = false; }} style={{ position: "absolute", bottom: 8, right: 12, zIndex: 70, background: "rgba(0,0,0,0.04)", border: "none", borderRadius: 8, padding: "4px 10px", cursor: "pointer", fontFamily: "'Noto Sans JP', sans-serif", fontSize: 10, color: "#8E95A2" }}>Reset</button>
    </PhoneFrame>
  );
};



/* ───────────────────────────────────────────────
   C: THE DEPTH
   Cards enter with CSS 3D. Stat is hero metric.
   ─────────────────────────────────────────────── */

const VariantC = () => {
  const [beat, setBeat] = useState(0);
  const running = useRef(false);
  const headRef = useRef(null);
  const subRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const tapRef = useRef(null);
  const ctaRef = useRef(null);

  const playBeat1 = useCallback(async () => {
    if (running.current) return;
    running.current = true; setBeat(1);
    await an(headRef.current, [{ opacity: 0, transform: "translateY(14px)", filter: "blur(4px)" }, { opacity: 0.6, transform: "translateY(4px)", filter: "blur(1px)" }, { opacity: 1, transform: "translateY(0)", filter: "blur(0)" }], { duration: 500, easing: EASE.settle });
    await wait(100);
    await an(subRef.current, [{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 400, easing: EASE.settle });
    await wait(350);
    await an(card1Ref.current, [{ opacity: 0, transform: "perspective(800px) translateZ(-60px) rotateX(6deg) translateY(20px)", filter: "blur(6px)" }, { opacity: 0.5, transform: "perspective(800px) translateZ(-20px) rotateX(2deg) translateY(8px)", filter: "blur(2px)" }, { opacity: 1, transform: "perspective(800px) translateZ(0) rotateX(0deg) translateY(0)", filter: "blur(0)" }], { duration: 700, easing: EASE.settle });
    await wait(300);
    await an(card2Ref.current, [{ opacity: 0, transform: "perspective(800px) translateZ(-60px) rotateX(6deg) translateY(20px)", filter: "blur(6px)" }, { opacity: 0.5, transform: "perspective(800px) translateZ(-20px) rotateX(2deg) translateY(8px)", filter: "blur(2px)" }, { opacity: 1, transform: "perspective(800px) translateZ(0) rotateX(0deg) translateY(0)", filter: "blur(0)" }], { duration: 700, easing: EASE.settle });
    await wait(350);
    await an(tapRef.current, [{ opacity: 0 }, { opacity: 1 }], { duration: 400, easing: EASE.smooth });
    running.current = false;
  }, []);

  const handleTap = () => {
    if (running.current) return;
    if (beat === 0) playBeat1();
    else if (beat === 1) { running.current = true; setBeat(2); playBeat2Anim(running, ctaRef); }
  };

  const renderCard = (ep, ref, statSize) => (
    <div ref={ref} style={{ opacity: 0, marginBottom: 16 }}>
      <GlassPanel level={2} style={{ padding: "20px 18px" }}>
        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 11, color: "#8E95A2", marginBottom: 4, letterSpacing: 0.3 }}>{ep.statLabel}</div>
          <div style={{ fontFamily: "'REM', sans-serif", fontWeight: 600, fontSize: statSize, color: "#25272C", marginBottom: 8, lineHeight: 1.1 }}>{ep.stat}</div>
          <div style={{ fontFamily: "'REM', sans-serif", fontWeight: 600, fontSize: 15, color: "#25272C", marginBottom: 6 }}>{ep.name}</div>
          <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12, color: "#6B7280", lineHeight: 1.5 }}>{ep.body}</div>
        </div>
      </GlassPanel>
    </div>
  );

  return (
    <PhoneFrame>
      <div onClick={handleTap} style={{ position: "absolute", inset: 0, zIndex: 60, cursor: "pointer" }} />
      <div style={{ position: "absolute", inset: 0, paddingTop: 62, paddingLeft: 22, paddingRight: 22, display: beat <= 1 ? "flex" : "none", flexDirection: "column" }}>
        <div ref={headRef} style={{ opacity: 0, marginBottom: 6 }}>
          <span style={{ fontFamily: "'REM', sans-serif", fontWeight: 600, fontSize: 24, color: "#25272C" }}>Exit strategy</span>
        </div>
        <div ref={subRef} style={{ opacity: 0, marginBottom: 28 }}>
          <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 13, color: "#6B7280", lineHeight: 1.5 }}>Two structured paths to liquidity, plus built-in asset flexibility.</span>
        </div>
        {renderCard(EXIT_PATHS[0], card1Ref, 32)}
        {renderCard(EXIT_PATHS[1], card2Ref, 28)}
        <TapPrompt innerRef={tapRef} />
      </div>
      <div style={{ position: "absolute", inset: 0, display: beat === 2 ? "block" : "none" }}>
        <Beat2Content ctaRef={ctaRef} />
      </div>
      {beat === 0 && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 40, pointerEvents: "none" }}><span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 13, color: "#8E95A2" }}>Tap to play</span></div>}
      <button onClick={(e) => { e.stopPropagation(); setBeat(0); running.current = false; }} style={{ position: "absolute", bottom: 8, right: 12, zIndex: 70, background: "rgba(0,0,0,0.04)", border: "none", borderRadius: 8, padding: "4px 10px", cursor: "pointer", fontFamily: "'Noto Sans JP', sans-serif", fontSize: 10, color: "#8E95A2" }}>Reset</button>
    </PhoneFrame>
  );
};


/* ───────────────────────────────────────────────
   D: THE SPLIT
   Ghost shells appear first. Content fills in.
   ─────────────────────────────────────────────── */



/* ─── main ─── */
const VARIANTS = [
  { id: "A", label: "A: the reveal", component: VariantA },
  { id: "C", label: "C: the depth", component: VariantC },
];

export default function Step20ExitStrategy({ variant } = {}) {
  const resolved = VARIANTS.find((v) => v.id === variant) ? variant : "A";
  const ActiveComponent = VARIANTS.find((v) => v.id === resolved)?.component || VariantA;
  return (
    <div style={{ minHeight: "100vh", background: "#EDEEF1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 16px", fontFamily: "'Noto Sans JP', sans-serif" }}>
      <ActiveComponent key={resolved} />
    </div>
  );
}

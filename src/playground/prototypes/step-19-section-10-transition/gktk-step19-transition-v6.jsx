import { useState, useRef, useCallback } from "react";

const C = {
  bg: "#F9F9F9",
  white: "#FEFEFE",
  n100: "#EDEEF1",
  n200: "#D8DBDF",
  n950: "#25272C",
  n900: "#383A42",
  n800: "#40444C",
  n600: "#5B616E",
  amber: "#FBB931",
  black: "#1E1F20",
};

const F = {
  h: "'REM', system-ui, sans-serif",
  b: "'Noto Sans JP', system-ui, sans-serif",
};

const E = {
  gentle: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  settle: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
};

const an = (el, kf, opts) => {
  if (!el) return Promise.resolve();
  return el.animate(kf, { fill: "forwards", ...opts }).finished;
};
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const MeshBg = () => (
  <div style={{ position: "absolute", inset: 0, zIndex: 0, background: C.bg }} />
);

const Glass = ({ children, style = {}, panelRef, level = 1 }) => {
  const s = level === 1
    ? { bg:"#F9F9F9", bdr: "1px solid rgba(0,0,0,0.06)", sh: "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)", rad: 20 }
    : { bg:"#F9F9F9", bdr: "1px solid rgba(0,0,0,0.06)", sh: "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)", rad: 28 };
  return (
    <div ref={panelRef} style={{ position: "relative", overflow: "hidden", borderRadius: s.rad, background: s.bg, border: s.bdr, boxShadow: s.sh, ...style }}>
      <div style={{ position: "relative", zIndex: 3 }}>{children}</div>
    </div>
  );
};

const FAQ_GHOST = [
  "What if TSMC slows down or pulls out?",
  "JPY volatility and rising rates?",
  "Construction over budget or delayed?",
  "How is GK-TK structure tax-efficient?",
  "What stops major hotel chains?",
  "What governance rights do TK investors have?",
];

const GhostFaq = ({ containerRef, cardRefs }) => (
  <div ref={containerRef} style={{ position: "absolute", inset: 0, padding: "64px 20px 56px", display: "flex", flexDirection: "column", zIndex: 3 }}>
    <div style={{ fontFamily: F.b, fontWeight: 500, fontSize: 12, color: C.n600, marginBottom: 12 }}>Risk factors</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {FAQ_GHOST.map((q, i) => (
        <Glass key={i} level={1} panelRef={(el) => { if (cardRefs) cardRefs.current[i] = el; }} style={{ padding: "12px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ flex: 1, fontFamily: F.b, fontWeight: 500, fontSize: 13, lineHeight: 1.35, color: C.n950 }}>{q}</div>
            <div style={{ fontSize: 14, color: C.n600, flexShrink: 0 }}>&#9662;</div>
          </div>
        </Glass>
      ))}
    </div>
  </div>
);

const ResolveContent = ({ resolveRef }) => (
  <div style={{ position: "absolute", top: "50%", left: 20, right: 20, transform: "translateY(-50%)", zIndex: 6 }}>
    <Glass level={2} panelRef={resolveRef} style={{ padding: "32px 24px", opacity: 0 }}>
      <div style={{ position: "relative", zIndex: 4 }}>
        <div style={{ fontFamily: F.h, fontWeight: 600, fontSize: 22, lineHeight: 1.25, color: C.n950 }}>Exit strategy</div>
      </div>
    </Glass>
  </div>
);

const TapPrompt = ({ visible, label = "Tap to continue" }) => (
  <div aria-live="polite" style={{ position: "absolute", bottom: 32, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 10, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(8px)", transition: `opacity 500ms ${E.smooth}, transform 500ms ${E.smooth}`, pointerEvents: "none" }}>
    <span style={{ fontFamily: F.b, fontSize: 13, fontWeight: 500, letterSpacing: "0.01em", color: C.n600 }}>{label}</span>
  </div>
);

const VariantA = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const resolveRef = useRef(null);
  const [showTap, setShowTap] = useState(false);
  const [resolveVisible, setResolveVisible] = useState(false);
  const running = useRef(false);

  const run = useCallback(async () => {
    if (running.current) return;
    running.current = true;

    const label = containerRef.current?.firstChild;
    if (label) {
      an(label, [
        { opacity: 1 },
        { opacity: 0 },
      ], { duration: 300, easing: E.gentle });
    }
    await wait(200);

    for (let i = 5; i >= 0; i--) {
      const card = cardRefs.current[i];
      if (!card) continue;
      an(card, [
        { opacity: 1, transform: "translateY(0)" },
        { opacity: 0.6, transform: "translateY(-30px)", offset: 0.4 },
        { opacity: 0.2, transform: "translateY(-80px)", offset: 0.75 },
        { opacity: 0, transform: "translateY(-140px)" },
      ], { duration: 600, easing: E.gentle });
      await wait(100);
    }
    await wait(400);

    await wait(400);

    setResolveVisible(true);
    await wait(30);
    if (resolveRef.current) {
      await an(resolveRef.current, [
        { opacity: 0, transform: "translateY(40px) scale(0.97)" },
        { opacity: 0.6, transform: "translateY(12px) scale(0.99)", offset: 0.5 },
        { opacity: 1, transform: "translateY(0) scale(1)" },
      ], { duration: 650, easing: E.settle });
    }

    await wait(400);
    setShowTap(true);
  }, []);

  return (
    <div
      style={{ position: "absolute", inset: 0, cursor: "pointer" }}
      onClick={!running.current ? run : undefined}
      role="button"
      tabIndex={0}
      aria-label="Tap to continue"
      onKeyDown={(e) => { if ((e.key === "Enter" || e.key === " ") && !running.current) { e.preventDefault(); run(); } }}
    >
      <MeshBg />
      <GhostFaq containerRef={containerRef} cardRefs={cardRefs} />
      {resolveVisible && <ResolveContent resolveRef={resolveRef} />}
      <TapPrompt visible={!running.current && !resolveVisible} label="Tap to see transition" />
      <TapPrompt visible={showTap} />
    </div>
  );
};

const VariantB = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const resolveRef = useRef(null);
  const [showTap, setShowTap] = useState(false);
  const [resolveVisible, setResolveVisible] = useState(false);
  const running = useRef(false);

  const run = useCallback(async () => {
    if (running.current) return;
    running.current = true;

    const label = containerRef.current?.firstChild;
    if (label) {
      an(label, [{ opacity: 1 }, { opacity: 0 }], { duration: 300, easing: E.gentle });
    }
    await wait(200);

    const baseY = 320;
    for (let i = 0; i < 6; i++) {
      const card = cardRefs.current[i];
      if (!card) continue;
      const rect = card.getBoundingClientRect();
      const parentRect = containerRef.current?.getBoundingClientRect();
      const currentY = rect.top - (parentRect?.top || 0);
      const targetOffset = baseY - currentY + (i * 3);
      const scaleVal = 0.92 - (i * 0.02);

      an(card, [
        { opacity: 1, transform: "translateY(0) scale(1)" },
        { opacity: 0.7, transform: `translateY(${targetOffset * 0.4}px) scale(${1 - (1 - scaleVal) * 0.4})`, offset: 0.4 },
        { opacity: 0.35, transform: `translateY(${targetOffset * 0.8}px) scale(${scaleVal})`, offset: 0.75 },
        { opacity: 0.1, transform: `translateY(${targetOffset}px) scale(${scaleVal - 0.05})` },
      ], { duration: 800, easing: E.gentle });
      await wait(80);
    }
    await wait(600);

    if (containerRef.current) {
      await an(containerRef.current, [
        { opacity: 1 },
        { opacity: 0 },
      ], { duration: 400, easing: E.gentle });
    }

    await wait(400);

    setResolveVisible(true);
    await wait(30);
    if (resolveRef.current) {
      await an(resolveRef.current, [
        { opacity: 0, transform: "translateY(30px) scale(0.96)" },
        { opacity: 0.5, transform: "translateY(10px) scale(0.98)", offset: 0.45 },
        { opacity: 1, transform: "translateY(0) scale(1)" },
      ], { duration: 700, easing: E.settle });
    }

    await wait(400);
    setShowTap(true);
  }, []);

  return (
    <div
      style={{ position: "absolute", inset: 0, cursor: "pointer" }}
      onClick={!running.current ? run : undefined}
      role="button"
      tabIndex={0}
      aria-label="Tap to continue"
      onKeyDown={(e) => { if ((e.key === "Enter" || e.key === " ") && !running.current) { e.preventDefault(); run(); } }}
    >
      <MeshBg />
      <GhostFaq containerRef={containerRef} cardRefs={cardRefs} />
      {resolveVisible && <ResolveContent resolveRef={resolveRef} />}
      <TapPrompt visible={!running.current && !resolveVisible} label="Tap to see transition" />
      <TapPrompt visible={showTap} />
    </div>
  );
};

const Phone = ({ children }) => (
  <div style={{
    width: 393, height: 852, borderRadius: 54, position: "relative",
    background: "#1A1A1C",
    flexShrink: 0,
  }}>
    <div style={{ position: "absolute", inset: -1, borderRadius: 55, background: "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0.15) 100%)", zIndex: 0, pointerEvents: "none" }} />
    <div style={{ position: "absolute", top: 20, left: "50%", transform: "translateX(-50%)", width: 126, height: 37, background: "#000", borderRadius: 20, zIndex: 20 }}>
      <div style={{ position: "absolute", top: "50%", right: 18, transform: "translateY(-50%)", width: 11, height: 11, borderRadius: "50%", background: "radial-gradient(circle at 40% 40%, #2a2a3a 0%, #111 60%, #000 100%)", boxShadow: "inset 0 0 2px rgba(255,255,255,0.15)" }} />
    </div>
    <div style={{ position: "absolute", top: 180, right: -3, width: 4, height: 80, background: "#2a2a2c", borderRadius: "0 3px 3px 0" }} />
    <div style={{ position: "absolute", top: 150, left: -3, width: 4, height: 36, background: "#2a2a2c", borderRadius: "3px 0 0 3px" }} />
    <div style={{ position: "absolute", top: 200, left: -3, width: 4, height: 36, background: "#2a2a2c", borderRadius: "3px 0 0 3px" }} />
    <div style={{ position: "absolute", top: 115, left: -3, width: 4, height: 18, background: "#2a2a2c", borderRadius: "3px 0 0 3px" }} />
    <div style={{ position: "absolute", top: 10, left: 10, right: 10, bottom: 10, borderRadius: 44, overflow: "hidden", background: C.bg }}>
      {children}
    </div>
  </div>
);

const VARIANTS = {
  A: { name: "A: the lift", c: VariantA },
  B: { name: "B: the settle", c: VariantB },
};

export default function Step19TransitionV6({ variant } = {}) {
  const resolved = VARIANTS[variant] ? variant : "A";
  const Cur = VARIANTS[resolved].c;

  return (
    <div data-proto="step-19" style={{
      minHeight: "100vh", background: "#EDEEF1",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: 24, fontFamily: F.b,
    }}>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-proto="step-19"] *,
          [data-proto="step-19"] *::before,
          [data-proto="step-19"] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
      `}</style>
      <Phone>
        <Cur key={resolved} />
      </Phone>
    </div>
  );
}

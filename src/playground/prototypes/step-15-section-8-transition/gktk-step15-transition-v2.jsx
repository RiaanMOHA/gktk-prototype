import { useState, useRef, useEffect, useCallback } from "react";

const C = {
  bg: "#F9F9F9",
  amber: "#FBB931",
  n950: "#25272C",
  n800: "#40444C",
};

const EASE = {
  smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
};

const SERVICES = [
  "Property secretary",
  "Medical navigation",
  "Education support",
  "Admin support",
  "Mental wellness",
  "Cultural program",
];

const HEADING = "The investment case.";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* ─────────────────────────────────────────────────────────────
   Phone frame (consistent across step-15 prototypes)
   ───────────────────────────────────────────────────────────── */
const PhoneFrame = ({ children, onTap }) => (
  <div
    style={{
      position: "relative",
      width: 393, height: 852, borderRadius: 55, overflow: "hidden",
      background: "#1A1A1E",
      boxShadow: "0 0 0 1px rgba(255,255,255,0.15), 0 0 0 2px #1A1A1E, 0 0 0 3px rgba(255,255,255,0.08)",
    }}
  >
    <div
      style={{
        position: "absolute", inset: 0, borderRadius: 55,
        border: "2.5px solid transparent",
        background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.15) 100%) border-box",
        WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor", maskComposite: "exclude",
        zIndex: 50, pointerEvents: "none",
      }}
    />
    <div
      style={{
        position: "absolute", top: 6, left: 6, right: 6, bottom: 6,
        borderRadius: 49, overflow: "hidden", background: C.bg,
      }}
    >
      <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: 126, height: 37, borderRadius: 20, background: "#000", zIndex: 100 }} />
      <div onClick={onTap} role="button" tabIndex={0} style={{ position: "absolute", inset: 0 }}>
        {children}
      </div>
      <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", width: 134, height: 5, borderRadius: 3, background: "rgba(0,0,0,0.2)", zIndex: 100 }} />
    </div>
    <div style={{ position: "absolute", left: -2.5, top: 180, width: 3, height: 32, borderRadius: "2px 0 0 2px", background: "#2A2A2E" }} />
    <div style={{ position: "absolute", left: -2.5, top: 240, width: 3, height: 60, borderRadius: "2px 0 0 2px", background: "#2A2A2E" }} />
    <div style={{ position: "absolute", left: -2.5, top: 310, width: 3, height: 60, borderRadius: "2px 0 0 2px", background: "#2A2A2E" }} />
    <div style={{ position: "absolute", right: -2.5, top: 260, width: 3, height: 80, borderRadius: "0 2px 2px 0", background: "#2A2A2E" }} />
  </div>
);

/* ─────────────────────────────────────────────────────────────
   Ledger transition
   Beats: rows fade in (stagger) → amber tally rule draws beneath
   rows → dots pulse and settle → hold (rows readable) → ledger
   fades → heading + underline resolve. Underline width always
   matches the heading text width (inline-flex wrapper).
   ───────────────────────────────────────────────────────────── */
const Ledger = ({ runKey, onDone }) => {
  const rowRefs = useRef([]);
  const dotRefs = useRef([]);
  const ledgerRuleRef = useRef(null);
  const headingRef = useRef(null);
  const underlineRef = useRef(null);

  useEffect(() => {
    const rows  = rowRefs.current.filter(Boolean);
    const dots  = dotRefs.current.filter(Boolean);
    const rule  = ledgerRuleRef.current;
    const h     = headingRef.current;
    const under = underlineRef.current;
    let cancelled = false;

    (async () => {
      // 1. rows fade and slide in
      rows.forEach((el, i) => {
        el.animate(
          [{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }],
          { duration: 320, delay: i * 80, easing: EASE.smooth, fill: "forwards" }
        );
      });
      await wait(320 + (rows.length - 1) * 80 + 60);
      if (cancelled) return;

      // 2. amber tally rule draws beneath rows
      if (rule) {
        rule.animate(
          [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
          { duration: 480, easing: EASE.smooth, fill: "forwards" }
        );
      }
      await wait(420);
      if (cancelled) return;

      // 3. dots pulse and settle
      dots.forEach((d, i) => {
        d.animate(
          [
            { transform: "scale(1)",   opacity: 1 },
            { transform: "scale(1.6)", opacity: 1, offset: 0.5 },
            { transform: "scale(1)",   opacity: 1 },
          ],
          { duration: 420, delay: i * 40, easing: EASE.spring, fill: "forwards" }
        );
      });
      await wait(420 + (dots.length - 1) * 40);
      if (cancelled) return;

      // 4. hold — everything sits fully formed so the rows can be read
      await wait(1800);
      if (cancelled) return;

      // 5. fade ledger out (slower than the entrance so the loss is gentle)
      rows.forEach((el) => el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 520, easing: EASE.smooth, fill: "forwards" }));
      if (rule) rule.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 520, easing: EASE.smooth, fill: "forwards" });
      await wait(440);
      if (cancelled) return;

      // 6. heading fades in, underline draws
      if (h) {
        try {
          await h.animate(
            [{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }],
            { duration: 480, easing: EASE.smooth, fill: "forwards" }
          ).finished;
        } catch { /* cancelled */ }
      }
      if (cancelled) return;
      if (under) {
        under.animate(
          [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
          { duration: 520, easing: EASE.smooth, fill: "forwards" }
        );
      }
      await wait(520);
      if (cancelled) return;
      onDone?.();
    })();

    return () => {
      cancelled = true;
      [...rows, ...dots, rule, h, under].forEach((n) =>
        n?.getAnimations().forEach((a) => a.cancel())
      );
    };
  }, [runKey, onDone]);

  return (
    <>
      <div style={{ position: "absolute", top: 120, left: 32, right: 32, zIndex: 5, display: "flex", flexDirection: "column", gap: 14 }}>
        {SERVICES.map((s, i) => (
          <div
            key={i}
            ref={(el) => (rowRefs.current[i] = el)}
            style={{
              display: "flex", alignItems: "center", gap: 10, opacity: 0,
              fontFamily: "'Noto Sans JP', sans-serif", fontSize: 13, color: C.n800,
            }}
          >
            <span style={{ whiteSpace: "nowrap" }}>{s}</span>
            <span
              aria-hidden
              style={{
                flex: 1, height: 1,
                background: "repeating-linear-gradient(90deg, rgba(0,0,0,0.18) 0 2px, transparent 2px 6px)",
              }}
            />
            <span
              ref={(el) => (dotRefs.current[i] = el)}
              style={{ width: 6, height: 6, borderRadius: "50%", background: C.amber, flex: "none" }}
            />
          </div>
        ))}
      </div>

      <div
        ref={ledgerRuleRef}
        style={{
          position: "absolute", left: 32, right: 32, top: 470,
          height: 2, background: C.amber, borderRadius: 1,
          transformOrigin: "left center", transform: "scaleX(0)", zIndex: 6,
        }}
      />

      {/* heading + underline; inline-flex wrapper keeps underline width = text width */}
      <div
        style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "0 32px", zIndex: 20, pointerEvents: "none",
        }}
      >
        <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "stretch" }}>
          <h1
            ref={headingRef}
            style={{
              fontFamily: "REM, sans-serif",
              fontWeight: 600, fontSize: 28, lineHeight: 1.15,
              color: C.n950, letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
              margin: 0, opacity: 0, textAlign: "left",
            }}
          >
            {HEADING}
          </h1>
          <div
            ref={underlineRef}
            style={{
              width: "100%", height: 2,
              background: C.amber, borderRadius: 1, marginTop: 8,
              transformOrigin: "left center", transform: "scaleX(0)",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default function Step15TransitionV2() {
  const [done, setDone] = useState(false);
  const [runKey, setRunKey] = useState(0);

  const handleTap = useCallback(() => {
    if (!done) return;
    setDone(false);
    setRunKey((k) => k + 1);
  }, [done]);

  return (
    <div
      data-proto="step-15-v2"
      style={{
        minHeight: "100vh", background: "#EDEEF1",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24, fontFamily: "'Noto Sans JP', sans-serif",
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-proto="step-15-v2"] *,
          [data-proto="step-15-v2"] *::before,
          [data-proto="step-15-v2"] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
        @import url('https://fonts.googleapis.com/css2?family=REM:wght@600&family=Noto+Sans+JP:wght@400;500;600&display=swap');
      `}</style>

      <PhoneFrame onTap={handleTap}>
        <Ledger key={runKey} runKey={runKey} onDone={() => setDone(true)} />
      </PhoneFrame>
    </div>
  );
}

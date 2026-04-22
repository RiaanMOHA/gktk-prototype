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

// ─── Flat background (was MeshBg; radial gradients removed per flat-design mandate) ───
const MeshBg = () => (
  <div style={{ position: "absolute", inset: 0, background: C.bg, overflow: "hidden" }} />
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
const Step1Content = ({ onBlank, variant = "A" }) => {
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

  const isSeal = variant === "B" || variant === "C" || variant === "D" || variant === "E";
  const hasPulse = variant === "C";
  const hasThread = variant === "D";
  const hasLayered = variant === "E";
  const ringSize = isSeal ? 104 : 88;
  const ringR = isSeal ? 48 : 36;
  const ringC = ringSize / 2;
  const circ = 2 * Math.PI * ringR;

  return (
    <div style={{
      position: "absolute",
      inset: 0,
      zIndex: 10,
    }}>
      {/* Editorial layered layout (variant E) — left-aligned, magazine-style */}
      {hasLayered && (
        <div style={{
          position: "absolute",
          top: 120,
          left: 24,
          right: 24,
        }}>
          <div style={{
            fontFamily: "'Noto Sans JP', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            color: C.caption,
            letterSpacing: "0.14em",
            marginBottom: 20,
          }}>
            Enter
          </div>
          <div style={{
            fontFamily: "'Noto Sans JP', sans-serif",
            fontSize: 56,
            fontWeight: 700,
            color: C.heading,
            letterSpacing: "-0.035em",
            lineHeight: 0.96,
          }}>
            MoreHarvest
          </div>
          <div style={{
            fontFamily: "'Noto Sans JP', sans-serif",
            fontSize: 32,
            fontWeight: 400,
            color: C.sub,
            letterSpacing: "-0.015em",
            marginTop: 6,
            fontStyle: "italic",
          }}>
            world
          </div>
          <div style={{
            width: 48,
            height: 3,
            background: C.amber,
            borderRadius: 2,
            marginTop: 24,
          }} />
        </div>
      )}

      {/* Thread layout (variant D) — heading anchored, vertical spine connects to button */}
      {hasThread && (
        <>
          <h1 style={{
            position: "absolute",
            top: 200,
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: "'Noto Sans JP', sans-serif",
            fontSize: 18,
            fontWeight: 500,
            color: C.sub,
            margin: 0,
          }}>
            Enter MoreHarvest world
          </h1>
          <div style={{
            position: "absolute",
            top: 248,
            bottom: 216,
            left: "50%",
            width: 2,
            transform: "translateX(-1px)",
            background: C.amber,
          }}>
            {[0.2, 0.5, 0.8].map((t, i) => (
              <div key={i} style={{
                position: "absolute",
                top: `${t * 100}%`,
                left: -6,
                width: 14,
                height: 2,
                background: C.amber,
              }} />
            ))}
          </div>
        </>
      )}

      {/* Default/seal/pulse layout — centered heading */}
      {!hasLayered && !hasThread && (
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {!isSeal && (
            <img
              src="/logos-and-icons/favicon.svg"
              alt="MoreHarvest"
              width={128}
              height={128}
              style={{ display: "block" }}
            />
          )}
          <h1 style={{
            fontFamily: "'Noto Sans JP', sans-serif",
            fontSize: 18,
            fontWeight: 500,
            color: C.sub,
            margin: isSeal ? 0 : "20px 0 0",
          }}>
            Enter MoreHarvest world
          </h1>
        </div>
      )}

      {/* Bottom cluster — 48px from bottom of screen */}
      <div style={{
        position: "absolute",
        bottom: 48,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
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
            width: ringSize,
            height: ringSize,
            cursor: "pointer",
            transform: pressing ? "scale(0.92)" : "scale(1)",
            transition: "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
            userSelect: "none",
            WebkitUserSelect: "none",
            touchAction: "none",
          }}
        >
          {/* Pulse halos (variant C) */}
          {hasPulse && !pressing && (
            <>
              <div style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: `3px solid ${C.amber}`,
                animation: "mh-halo 2.8s ease-out infinite",
                pointerEvents: "none",
              }} />
              <div style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: `3px solid ${C.amber}`,
                animation: "mh-halo 2.8s ease-out infinite",
                animationDelay: "0.93s",
                pointerEvents: "none",
              }} />
              <div style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: `3px solid ${C.amber}`,
                animation: "mh-halo 2.8s ease-out infinite",
                animationDelay: "1.86s",
                pointerEvents: "none",
              }} />
            </>
          )}
          {isSeal ? (
            /* Favicon-as-button */
            <img
              src="/logos-and-icons/favicon.svg"
              alt="Enter MoreHarvest world"
              width={88}
              height={88}
              style={{
                position: "absolute",
                top: (ringSize - 88) / 2,
                left: (ringSize - 88) / 2,
                display: "block",
                animation: hasPulse ? "mh-breathe 2.4s ease-in-out infinite" : undefined,
              }}
            />
          ) : (
            <>
              {/* Glass circle background */}
              <div style={{
                position: "absolute",
                inset: 4,
                borderRadius: "50%",
                background: "#F9F9F9",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: `0 4px 20px rgba(0,0,0,0.08)`,
              }} />
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
            </>
          )}

          {/* Progress ring */}
          <svg style={{
            position: "absolute",
            inset: 0,
            width: ringSize,
            height: ringSize,
            transform: "rotate(-90deg)",
            pointerEvents: "none",
          }}>
            {/* Track */}
            <circle cx={ringC} cy={ringC} r={ringR} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth={3} />
            {/* Progress */}
            <circle
              cx={ringC} cy={ringC} r={ringR}
              fill="none"
              stroke={C.amber}
              strokeWidth={3}
              strokeDasharray={circ}
              strokeDashoffset={circ - (progress / 100) * circ}
              strokeLinecap="round"
            />
          </svg>

          {/* Idle scout dot (variant C) */}
          {hasPulse && (
            <div style={{
              position: "absolute",
              inset: 0,
              animation: "mh-orbit 4s linear infinite",
              pointerEvents: "none",
              opacity: pressing ? 0 : 1,
              transition: "opacity 200ms ease",
            }}>
              <div style={{
                position: "absolute",
                top: ringC - ringR - 3,
                left: ringC - 3,
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: C.amber,
              }} />
            </div>
          )}
        </div>

        <p style={{
          fontFamily: "'Noto Sans JP', sans-serif",
          fontSize: 16,
          color: "rgba(91,97,110,0.5)",
          marginTop: 20,
        }}>
          Hold to enter
        </p>
      </div>
    </div>
  );
};

// ─── Main export ───
export default function Step1OpeningTransition({ variant = "A" } = {}) {
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
        @keyframes mh-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        @keyframes mh-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes mh-halo {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.8); opacity: 0; }
        }
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
      <PhoneFrame>
        <div style={{
          position: "absolute",
          inset: 0,
          opacity: blank ? 0 : 1,
          transform: blank ? "scale(0.97)" : "scale(1)",
          transition: "opacity 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}>
          <MeshBg />
          <Step1Content variant={variant} onBlank={() => setBlank(true)} />
        </div>
        {/* Blank viewport behind — just #F9F9F9 */}
        <div style={{ position: "absolute", inset: 0, background: C.bg, zIndex: -1 }} />
      </PhoneFrame>
    </div>
  );
}

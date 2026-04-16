import { useCallback, useEffect, useState } from "react";

/* ── design tokens ── */
const C = {
  bg: "#F9F9F9", n100: "#EDEEF1", n200: "#D8DBDF", n400: "#8A8F9A",
  n600: "#5B616E", n800: "#40444C", n900: "#383A42", n950: "#25272C",
  amber: "#FBB931", amber100: "#FEF2C9", orange: "#FF9424",
};

/* ── visionOS material primitives ── */
const NOISE_ID = "gktk-noise-s10";
const NoiseDefs = () => (
  <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
    <defs>
      <filter id={NOISE_ID}>
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
    </defs>
  </svg>
);

const NoiseOverlay = ({ opacity = 0.03 }) => (
  <div style={{
    position: "absolute", inset: 0, borderRadius: "inherit",
    filter: `url(#${NOISE_ID})`, opacity, mixBlendMode: "overlay", pointerEvents: "none",
  }} />
);

const MeshBg = () => (
  <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: "inherit" }}>
    <div style={{
      position: "absolute", inset: 0,
      background: [
        "radial-gradient(ellipse 80% 50% at 20% 80%, rgba(251,185,49,0.08) 0%, transparent 60%)",
        "radial-gradient(ellipse 60% 60% at 80% 20%, rgba(255,148,36,0.05) 0%, transparent 50%)",
        "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(237,238,241,0.4) 0%, transparent 70%)",
        "radial-gradient(ellipse 100% 100% at 50% 100%, rgba(254,242,201,0.12) 0%, transparent 60%)",
        `linear-gradient(180deg, ${C.n100} 0%, ${C.bg} 40%)`,
      ].join(", "),
    }} />
    <NoiseOverlay opacity={0.025} />
  </div>
);

function GlassPanel({ level = 1, borderRadius = 20, children, style = {}, ...props }) {
  const isL2 = level === 2;
  return (
    <div style={{
      position: "relative", borderRadius,
      background: isL2 ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.62)",
      backdropFilter: isL2 ? "blur(24px) saturate(1.6)" : "blur(20px) saturate(1.4)",
      WebkitBackdropFilter: isL2 ? "blur(24px) saturate(1.6)" : "blur(20px) saturate(1.4)",
      border: isL2 ? "1px solid rgba(255,255,255,0.95)" : "1px solid rgba(255,255,255,0.85)",
      boxShadow: isL2
        ? "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.7)"
        : "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.5)",
      overflow: "hidden", ...style,
    }} {...props}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: isL2 ? 2 : 1.5, borderRadius: `${borderRadius}px ${borderRadius}px 0 0`,
        background: "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: 0, left: "10%", right: "10%", height: 40,
        background: "radial-gradient(ellipse 100% 100% at 50% 0%, rgba(255,255,255,0.4) 0%, transparent 100%)",
        pointerEvents: "none",
      }} />
      <NoiseOverlay opacity={0.04} />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

/* ── data ── */
const DATA = [
  {
    label: "Market proof",
    heading: "42 units. Fully reserved before completion.",
    body: "Former municipal Kusunoki public housing site, Kita-ku, Kumamoto City. D&D General Group developed 4 buildings, 3 stories each. 42 units, all 3LDK, family-oriented. All units bulk-leased by JASM (TSMC subsidiary). Move-in from August 2023.",
    takeaway: "The B2B bulk-lease model works. Demand is proven.",
    stat: "42", statLabel: "units reserved",
  },
  {
    label: "Closest competitor",
    heading: "Formosa Hills: hardware without software",
    body: "14-story building, 65 units, all 3LDK (70 to 80 sqm). 80% Taiwanese business guests. From 20,000 yen per night with long-term lease options. Services: bilingual property management, mail handling, meeting facilities, airport transfers.",
    verdicts: [
      "What DoMo offers: a roof, basic bilingual admin, and parking.",
      "What DoMo does not offer: medical navigation, mental health support, education integration, spouse career support, data-driven HR dashboards, or any of the \u2018software\u2019 that keeps families stable and engineers productive.",
      "Their model is accommodation. Ours is retention infrastructure.",
    ],
    stat: "65", statLabel: "units, no software",
  },
];

/* ───────────────────────────────────────────────────────
   SHARED: detail view
   ─────────────────────────────────────────────────────── */
function DetailView({ index, onBack }) {
  const d = DATA[index];
  const [phase, setPhase] = useState(0);
  const [vCount, setVCount] = useState(0);

  useEffect(() => {
    setPhase(0); setVCount(0);
    requestAnimationFrame(() => requestAnimationFrame(() => setPhase(1)));
  }, [index]);

  useEffect(() => {
    if (d.verdicts && phase === 1) {
      const timers = d.verdicts.map((_, i) =>
        setTimeout(() => setVCount(i + 1), 500 + i * 600)
      );
      return () => timers.forEach(clearTimeout);
    }
  }, [phase, d.verdicts]);

  return (
    <div style={{ position: "absolute", inset: 0, padding: "20px 24px 32px", overflowY: "auto", perspective: "1200px" }}>
      <button onClick={onBack} style={{
        background: "none", border: "none", cursor: "pointer",
        display: "inline-flex", alignItems: "center", gap: 4,
        fontFamily: "'Noto Sans JP', sans-serif", fontSize: 13, fontWeight: 500,
        color: C.n600, padding: "8px 0", marginBottom: 16,
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.n600} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div style={{
        opacity: phase ? 1 : 0,
        transform: phase ? "translateZ(0) scale(1)" : "translateZ(-60px) scale(0.85)",
        transition: "all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)", marginBottom: 20,
        willChange: "transform, opacity",
      }}>
        <span style={{
          fontFamily: "'REM', sans-serif", fontWeight: 600, fontSize: 72,
          lineHeight: 1, color: C.n950, letterSpacing: "-0.03em", display: "block",
          textShadow: "0 4px 16px rgba(0,0,0,0.08)",
        }}>{d.stat}</span>
        <span style={{
          fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 500,
          fontSize: 14, color: C.n600, display: "block", marginTop: 4,
        }}>{d.statLabel}</span>
      </div>

      <span style={{
        fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 500, fontSize: 12,
        color: C.n600, letterSpacing: "0.01em", display: "block", marginBottom: 6,
        opacity: phase ? 1 : 0, transition: "opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s",
      }}>{d.label}</span>

      <h2 style={{
        fontFamily: "'REM', sans-serif", fontWeight: 600, fontSize: 22,
        lineHeight: 1.15, color: C.n950, letterSpacing: "-0.02em", margin: "0 0 14px 0",
        opacity: phase ? 1 : 0, transform: phase ? "translateY(0)" : "translateY(10px)",
        transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.15s",
      }}>{d.heading}</h2>

      <p style={{
        fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 400, fontSize: 14,
        lineHeight: 1.65, color: C.n800, margin: "0 0 24px 0", maxWidth: 310,
        opacity: phase ? 1 : 0, transition: "opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.25s",
      }}>{d.body}</p>

      {d.takeaway && (
        <GlassPanel level={2} borderRadius={14} style={{
          padding: "16px 20px",
          opacity: phase ? 1 : 0,
          transform: phase ? "translateY(0) translateZ(10px)" : "translateY(20px) translateZ(-30px)",
          transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.35s",
        }}>
          <p style={{
            fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 600, fontSize: 15,
            color: C.n950, margin: 0, lineHeight: 1.5,
          }}>{d.takeaway}</p>
        </GlassPanel>
      )}

      {d.verdicts && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, perspective: "800px" }}>
          {d.verdicts.map((v, i) => {
            const isLast = i === d.verdicts.length - 1;
            return (
              <GlassPanel key={i} level={isLast ? 2 : 1} borderRadius={14} style={{
                padding: "16px 20px",
                opacity: i < vCount ? 1 : 0,
                transform: i < vCount
                  ? "translateY(0) translateZ(0) scale(1)"
                  : "translateY(24px) translateZ(-50px) scale(0.93)",
                transition: "all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}>
                <p style={{
                  fontFamily: "'Noto Sans JP', sans-serif",
                  fontWeight: isLast ? 600 : 400, fontSize: isLast ? 15 : 14,
                  color: isLast ? C.n950 : C.n800, margin: 0, lineHeight: 1.6,
                }}>{v}</p>
              </GlassPanel>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ───────────────────────────────────────────────────────
   VARIANT B: the stack
   ─────────────────────────────────────────────────────── */
function ChoiceB({ onSelectDetail }) {
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      position: "absolute", inset: 0, display: "flex", flexDirection: "column",
      justifyContent: "flex-end", padding: "0 20px 44px", perspective: "1200px",
    }}>
      <p style={{
        fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 500, fontSize: 13,
        color: C.n400, marginBottom: 20,
        opacity: entered ? 1 : 0,
        transition: "opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s",
      }}>
        Choose a path to explore.
      </p>

      {DATA.map((d, i) => (
        <GlassPanel key={i} level={1} borderRadius={18} style={{
          padding: "20px", cursor: "pointer", marginBottom: i === 0 ? 12 : 0,
          opacity: entered ? 1 : 0,
          transform: entered
            ? "translateY(0) translateZ(0)"
            : "translateY(40px) translateZ(-60px)",
          transition: `opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${300 + i * 150}ms, transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${300 + i * 150}ms`,
          willChange: "transform, opacity",
        }} onClick={() => onSelectDetail(i)}
        role="button"
        tabIndex={0}
        aria-label={d.heading || d.label || `Option ${i + 1}`}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelectDetail(i); } }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={{
                fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 500, fontSize: 12,
                color: C.n600, letterSpacing: "0.01em", display: "block", marginBottom: 6,
              }}>{d.label}</span>
              <span style={{
                fontFamily: "'REM', sans-serif", fontWeight: 600, fontSize: 17,
                color: C.n950, letterSpacing: "-0.01em", lineHeight: 1.3, display: "block",
              }}>{d.heading}</span>
            </div>
            <span style={{
              fontFamily: "'REM', sans-serif", fontWeight: 600, fontSize: 36,
              color: C.n200, lineHeight: 1, letterSpacing: "-0.03em",
              marginLeft: 12, flexShrink: 0,
            }}>{d.stat}</span>
          </div>
        </GlassPanel>
      ))}
    </div>
  );
}

/* ───────────────────────────────────────────────────────
   VARIANT D: the divide
   ─────────────────────────────────────────────────────── */
function ChoiceD({ onSelectDetail }) {
  const [entered, setEntered] = useState(false);
  const [hoveredSide, setHoveredSide] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80);
    return () => clearTimeout(t);
  }, []);

  const sides = [
    {
      gradient: "linear-gradient(175deg, rgba(254,242,201,0.35) 0%, rgba(251,185,49,0.08) 40%, transparent 80%)",
      hoverGlow: "radial-gradient(ellipse at 50% 70%, rgba(251,185,49,0.12) 0%, transparent 60%)",
    },
    {
      gradient: "linear-gradient(175deg, rgba(216,219,223,0.3) 0%, rgba(138,143,154,0.06) 40%, transparent 80%)",
      hoverGlow: "radial-gradient(ellipse at 50% 70%, rgba(138,143,154,0.08) 0%, transparent 60%)",
    },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
      <div style={{
        padding: "56px 24px 0",
        opacity: entered ? 1 : 0,
        transition: "opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.15s",
      }}>
        <p style={{
          fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 500, fontSize: 13,
          color: C.n400, margin: 0,
        }}>
          Choose a path.
        </p>
      </div>

      <div style={{
        flex: 1, display: "flex", gap: 1,
        padding: "16px 12px 28px",
      }}>
        {DATA.map((d, i) => {
          const isHovered = hoveredSide === i;
          return (
            <div
              key={i}
              onClick={() => onSelectDetail(i)}
              role="button"
              tabIndex={0}
              aria-label={`Option ${i + 1}`}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelectDetail(i); } }}
              onMouseEnter={() => setHoveredSide(i)}
              onMouseLeave={() => setHoveredSide(null)}
              style={{
                flex: 1, position: "relative", cursor: "pointer",
                borderRadius: 22, overflow: "hidden",
                opacity: entered ? 1 : 0,
                transform: entered
                  ? "translateY(0) scale(1)"
                  : `translateX(${i === 0 ? -20 : 20}px) scale(0.95)`,
                transition: `opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${250 + i * 120}ms, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${250 + i * 120}ms`,
                willChange: "transform, opacity",
              }}
            >
              <div style={{
                position: "absolute", inset: 0,
                background: sides[i].gradient,
                transition: "opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }} />

              <div style={{
                position: "absolute", inset: 0,
                background: sides[i].hoverGlow,
                opacity: isHovered ? 1 : 0,
                transition: "opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                pointerEvents: "none",
              }} />

              <div style={{
                position: "absolute", inset: 0, borderRadius: 22,
                background: "rgba(255,255,255,0.35)",
                backdropFilter: "blur(12px) saturate(1.2)",
                WebkitBackdropFilter: "blur(12px) saturate(1.2)",
                border: "1px solid rgba(255,255,255,0.7)",
                boxShadow: isHovered
                  ? "0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.5)"
                  : "0 2px 12px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.4)",
                transition: "box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }} />

              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 1.5,
                borderRadius: "22px 22px 0 0",
                background: "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, transparent 100%)",
                pointerEvents: "none",
              }} />

              <NoiseOverlay opacity={0.03} />

              <div style={{
                position: "relative", zIndex: 2, height: "100%",
                display: "flex", flexDirection: "column",
                justifyContent: "space-between",
                padding: "24px 16px 20px",
              }}>
                <div>
                  <span style={{
                    fontFamily: "'REM', sans-serif", fontWeight: 600,
                    fontSize: 56, lineHeight: 1, color: C.n950,
                    letterSpacing: "-0.03em", display: "block",
                    textShadow: "0 2px 12px rgba(0,0,0,0.05)",
                    opacity: entered ? 1 : 0,
                    transform: entered ? "translateY(0)" : "translateY(12px)",
                    transition: `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${450 + i * 100}ms`,
                  }}>{d.stat}</span>
                </div>

                <div>
                  <span style={{
                    fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 500, fontSize: 11,
                    color: C.n600, letterSpacing: "0.01em", display: "block", marginBottom: 4,
                    opacity: entered ? 1 : 0,
                    transition: `opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${550 + i * 100}ms`,
                  }}>{d.label}</span>
                  <span style={{
                    fontFamily: "'REM', sans-serif", fontWeight: 600, fontSize: 15,
                    color: C.n950, letterSpacing: "-0.01em", lineHeight: 1.25,
                    display: "block", marginBottom: 12,
                    opacity: entered ? 1 : 0,
                    transition: `opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${600 + i * 100}ms`,
                  }}>{d.heading}</span>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    opacity: entered ? 1 : 0,
                    transition: `opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${700 + i * 100}ms`,
                  }}>
                    <span style={{
                      fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12, fontWeight: 500, color: C.n400,
                    }}>Explore</span>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={i === 0 ? C.amber : C.n400} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── entry ── */
const CHOICE_BY_VARIANT = { B: ChoiceB, D: ChoiceD };

export default function Step10CurrentOptionsPlayground({ variant } = {}) {
  const Choice = CHOICE_BY_VARIANT[variant] ?? ChoiceB;
  const [phase, setPhase] = useState("choice");
  const [selected, setSelected] = useState(null);
  const [detailKey, setDetailKey] = useState(0);

  useEffect(() => {
    // reset when variant changes
    setPhase("choice");
    setSelected(null);
  }, [variant]);

  const selectDetail = useCallback((i) => {
    setSelected(i);
    setDetailKey(k => k + 1);
    setPhase("detail");
  }, []);
  const back = useCallback(() => {
    setSelected(null);
    setPhase("choice");
  }, []);

  return (
    <div data-proto="step-10-v6" style={{
      minHeight: "100vh", background: "#EDEEF1",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24, fontFamily: "'Noto Sans JP', sans-serif",
    }}>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-proto="step-10-v6"] *,
          [data-proto="step-10-v6"] *::before,
          [data-proto="step-10-v6"] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=REM:wght@600&family=Noto+Sans+JP:wght@400;500;600&display=swap" rel="stylesheet" />
      <NoiseDefs />
      <div style={{ position: "relative", width: 393, height: 852, borderRadius: 55, overflow: "hidden", background: "#1A1A1E", boxShadow: "0 0 0 1px rgba(255,255,255,0.08) inset" }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 55, border: "2.5px solid transparent",
          background: "linear-gradient(135deg,rgba(255,255,255,0.2) 0%,rgba(255,255,255,0.05) 50%,rgba(255,255,255,0.15) 100%) border-box",
          WebkitMask: "linear-gradient(#fff 0 0) padding-box,linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude",
          zIndex: 50, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 6, left: 6, right: 6, bottom: 6, borderRadius: 49, overflow: "hidden", background: C.bg }}>
          <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: 126, height: 37, borderRadius: 20, background: "#000", zIndex: 100 }} />
          <MeshBg />
          {phase === "choice" && <Choice onSelectDetail={selectDetail} />}
          {phase === "detail" && selected !== null && (
            <DetailView key={detailKey} index={selected} onBack={back} />
          )}
          <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", width: 134, height: 5, borderRadius: 3, background: "rgba(0,0,0,0.2)", zIndex: 100 }} />
        </div>
      </div>
    </div>
  );
}

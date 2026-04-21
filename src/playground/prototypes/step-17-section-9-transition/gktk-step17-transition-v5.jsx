import { useState, useRef, useCallback } from "react";

const COLORS = {
  neutral950: "#25272C",
  neutral900: "#383A42",
  neutral800: "#40444C",
  neutral600: "#5B616E",
  neutral200: "#D8DBDF",
  neutral100: "#EDEEF1",
  base: "#F9F9F9",
  white: "#FEFEFE",
  amber: "#FBB931",
  amber50: "#FFFBEc",
  amber100: "#FEF2C9",
};

const EASING = {
  gentle: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  settle: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  sharp: "cubic-bezier(0.4, 0, 0.2, 1)",
};

const MeshGradientBg = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: COLORS.base,
      zIndex: 0,
    }}
  />
);

const GlassPanel = ({ children, style = {}, panelRef }) => (
  <div
    ref={panelRef}
    style={{
      position: "relative",
      background:"#F9F9F9",
      border: "1px solid rgba(0,0,0,0.06)",
      borderRadius: 28,
      boxShadow:
        "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
      padding: "32px 24px",
      zIndex: 5,
      ...style,
    }}
  >
    <div style={{ position: "relative", zIndex: 4 }}>{children}</div>
  </div>
);

const GhostFinancials = ({ containerRef, headerRef, rowRefs }) => {
  const rows = [
    { label: "Post-tax IRR", value: "18.4%", highlight: true },
    { label: "Equity multiple", value: "2.1x" },
    { label: "Cash-on-cash (yr 3)", value: "8.7%" },
    { label: "Payback period", value: "5.2 yrs" },
    { label: "Exit cap rate", value: "4.8%" },
    { label: "Net operating income", value: "¥48.2M" },
  ];

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 60,
        left: 0,
        right: 0,
        bottom: 0,
        padding: "24px 20px",
        zIndex: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div ref={headerRef} style={{ marginBottom: 20 }}>
        <div
          style={{
            fontFamily: "'REM', sans-serif",
            fontWeight: 600,
            fontSize: 22,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: COLORS.neutral950,
            marginBottom: 6,
          }}
        >
          Financial projections
        </div>
        <div
          style={{
            fontFamily: "'Noto Sans JP', sans-serif",
            fontSize: 13,
            lineHeight: 1.4,
            letterSpacing: "0.01em",
            fontWeight: 500,
            color: COLORS.neutral600,
          }}
        >
          Base scenario, 7-year hold
        </div>
      </div>

      <div
        style={{
          position: "relative",
          background:"#F9F9F9",
          border: "1px solid rgba(0,0,0,0.06)",
          borderRadius: 20,
          boxShadow: "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
          overflow: "hidden",
        }}
      >
        {rows.map((row, i) => (
          <div
            key={row.label}
            ref={(el) => { if (rowRefs) rowRefs.current[i] = el; }}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "14px 20px",
              borderBottom: i < rows.length - 1 ? `1px solid ${COLORS.neutral100}` : "none",
              background: row.highlight ? COLORS.amber50 : "transparent",
              position: "relative",
              zIndex: 2,
            }}
          >
            <span
              style={{
                fontFamily: "'Noto Sans JP', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.01em",
                color: COLORS.neutral600,
              }}
            >
              {row.label}
            </span>
            <span
              style={{
                fontFamily: "'REM', sans-serif",
                fontWeight: 600,
                fontSize: row.highlight ? 22 : 16,
                color: COLORS.neutral950,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ResolveContent = () => (
  <div
    style={{
      fontFamily: "'Noto Sans JP', sans-serif",
      fontSize: 16,
      lineHeight: 1.65,
      color: COLORS.neutral800,
      textAlign: "left",
    }}
  >
    Every investment carries risk. Here is how this one is structured to mitigate them.
  </div>
);

const TapPrompt = ({ visible, label = "Tap to continue" }) => (
  <div
    aria-live="polite"
    style={{
      position: "absolute",
      bottom: 32,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
      zIndex: 10,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(8px)",
      transition: `opacity 500ms ${EASING.smooth}, transform 500ms ${EASING.smooth}`,
      pointerEvents: "none",
    }}
  >
    <span
      style={{
        fontFamily: "'Noto Sans JP', sans-serif",
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: "0.01em",
        color: COLORS.neutral600,
      }}
    >
      {label}
    </span>
  </div>
);

const an = (el, keyframes, options) => {
  if (!el) return Promise.resolve();
  return el.animate(keyframes, { fill: "forwards", ...options }).finished;
};
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const VariantRecede = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const rowRefs = useRef([]);
  const resolveRef = useRef(null);
  const [showTap, setShowTap] = useState(false);
  const [resolveVisible, setResolveVisible] = useState(false);
  const running = useRef(false);

  const run = useCallback(async () => {
    if (running.current) return;
    running.current = true;

    if (containerRef.current) {
      await an(
        containerRef.current,
        [
          { opacity: 1, transform: "scale(1) translateY(0)" },
          { opacity: 0.5, transform: "scale(0.92) translateY(-10px)", offset: 0.5 },
          { opacity: 0.15, transform: "scale(0.85) translateY(-18px)", offset: 0.8 },
          { opacity: 0, transform: "scale(0.82) translateY(-22px)" },
        ],
        { duration: 1100, easing: EASING.gentle }
      );
    }

    await wait(500);

    setResolveVisible(true);
    await wait(30);
    if (resolveRef.current) {
      await an(
        resolveRef.current,
        [
          { opacity: 0, transform: "scale(0.95) translateY(10px)" },
          { opacity: 0.6, transform: "scale(0.98) translateY(4px)", offset: 0.5 },
          { opacity: 1, transform: "scale(1) translateY(0)" },
        ],
        { duration: 700, easing: EASING.settle }
      );
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
      <MeshGradientBg />
      <GhostFinancials containerRef={containerRef} headerRef={headerRef} rowRefs={rowRefs} />
      {resolveVisible && (
        <div style={{ position: "absolute", top: "50%", left: 20, right: 20, transform: "translateY(-50%)", zIndex: 6 }}>
          <GlassPanel panelRef={resolveRef} style={{ opacity: 0 }}>
            <ResolveContent />
          </GlassPanel>
        </div>
      )}
      <TapPrompt visible={!running.current && !resolveVisible} label="Tap to see transition" />
      <TapPrompt visible={showTap} />
    </div>
  );
};

const VariantShutter = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const rowRefs = useRef([]);
  const resolveRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const [showTap, setShowTap] = useState(false);
  const [resolveVisible, setResolveVisible] = useState(false);
  const [showBands, setShowBands] = useState(false);
  const running = useRef(false);

  const run = useCallback(async () => {
    if (running.current) return;
    running.current = true;

    setResolveVisible(true);
    setShowBands(true);
    await wait(30);

    const t = topRef.current
      ? an(topRef.current, [{ transform: "translateY(-100%)" }, { transform: "translateY(0)" }], {
          duration: 750,
          easing: EASING.gentle,
        })
      : Promise.resolve();
    const b = bottomRef.current
      ? an(bottomRef.current, [{ transform: "translateY(100%)" }, { transform: "translateY(0)" }], {
          duration: 750,
          easing: EASING.gentle,
        })
      : Promise.resolve();
    await Promise.all([t, b]);

    if (containerRef.current) containerRef.current.style.opacity = "0";

    if (topRef.current) {
      an(
        topRef.current,
        [
          { boxShadow: "0 2px 0 rgba(251,185,49,0.6), 0 2px 16px rgba(251,185,49,0.2)" },
          { boxShadow: "0 2px 0 rgba(251,185,49,0.8), 0 2px 36px rgba(251,185,49,0.45)" },
          { boxShadow: "0 2px 0 rgba(251,185,49,0.6), 0 2px 16px rgba(251,185,49,0.2)" },
        ],
        { duration: 500, easing: EASING.smooth }
      );
    }
    if (bottomRef.current) {
      an(
        bottomRef.current,
        [
          { boxShadow: "0 -2px 0 rgba(251,185,49,0.6), 0 -2px 16px rgba(251,185,49,0.2)" },
          { boxShadow: "0 -2px 0 rgba(251,185,49,0.8), 0 -2px 36px rgba(251,185,49,0.45)" },
          { boxShadow: "0 -2px 0 rgba(251,185,49,0.6), 0 -2px 16px rgba(251,185,49,0.2)" },
        ],
        { duration: 500, easing: EASING.smooth }
      );
    }
    await wait(550);

    const tOpen = topRef.current
      ? an(topRef.current, [{ transform: "translateY(0)" }, { transform: "translateY(-102%)" }], {
          duration: 650,
          easing: EASING.gentle,
        })
      : Promise.resolve();
    const bOpen = bottomRef.current
      ? an(bottomRef.current, [{ transform: "translateY(0)" }, { transform: "translateY(102%)" }], {
          duration: 650,
          easing: EASING.gentle,
        })
      : Promise.resolve();

    await wait(120);
    if (resolveRef.current) {
      an(
        resolveRef.current,
        [
          { opacity: 0, transform: "scale(0.97)" },
          { opacity: 1, transform: "scale(1)" },
        ],
        { duration: 600, easing: EASING.settle }
      );
    }
    await Promise.all([tOpen, bOpen]);

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
      <MeshGradientBg />
      <GhostFinancials containerRef={containerRef} headerRef={headerRef} rowRefs={rowRefs} />

      {resolveVisible && (
        <div style={{ position: "absolute", top: "50%", left: 20, right: 20, transform: "translateY(-50%)", zIndex: 6 }}>
          <GlassPanel panelRef={resolveRef} style={{ opacity: 0, transform: "scale(0.97)" }}>
            <ResolveContent />
          </GlassPanel>
        </div>
      )}

      {showBands && (
        <>
          <div
            ref={topRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "50%",
              background: `linear-gradient(180deg, ${COLORS.neutral100} 0%, ${COLORS.base} 80%)`,
              zIndex: 12,
              transform: "translateY(-100%)",
              boxShadow: "0 2px 0 rgba(251,185,49,0.6), 0 2px 16px rgba(251,185,49,0.2)",
            }}
          >
          </div>
          <div
            ref={bottomRef}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50%",
              background: `linear-gradient(0deg, ${COLORS.neutral100} 0%, ${COLORS.base} 80%)`,
              zIndex: 12,
              transform: "translateY(100%)",
              boxShadow: "0 -2px 0 rgba(251,185,49,0.6), 0 -2px 16px rgba(251,185,49,0.2)",
            }}
          >
          </div>
        </>
      )}

      <TapPrompt visible={!running.current && !resolveVisible} label="Tap to see transition" />
      <TapPrompt visible={showTap} />
    </div>
  );
};

const IPhoneFrame = ({ children }) => (
  <div
    style={{
      position: "relative",
      width: 393,
      height: 852,
      background: "#1A1A1C",
      borderRadius: 54,
      flexShrink: 0,
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: -1,
        borderRadius: 55,
        background: "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0.15) 100%)",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        width: 126,
        height: 37,
        background: "#000",
        borderRadius: 20,
        zIndex: 20,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: 18,
          transform: "translateY(-50%)",
          width: 11,
          height: 11,
          borderRadius: "50%",
          background: "radial-gradient(circle at 40% 40%, #2a2a3a 0%, #111 60%, #000 100%)",
          boxShadow: "inset 0 0 2px rgba(255,255,255,0.15)",
        }}
      />
    </div>
    <div style={{ position: "absolute", top: 180, right: -3, width: 4, height: 80, background: "#2a2a2c", borderRadius: "0 3px 3px 0" }} />
    <div style={{ position: "absolute", top: 150, left: -3, width: 4, height: 36, background: "#2a2a2c", borderRadius: "3px 0 0 3px" }} />
    <div style={{ position: "absolute", top: 200, left: -3, width: 4, height: 36, background: "#2a2a2c", borderRadius: "3px 0 0 3px" }} />
    <div style={{ position: "absolute", top: 115, left: -3, width: 4, height: 18, background: "#2a2a2c", borderRadius: "3px 0 0 3px" }} />
    <div
      style={{
        position: "absolute",
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        borderRadius: 44,
        overflow: "hidden",
        background: COLORS.base,
      }}
    >
      {children}
    </div>
  </div>
);

const VARIANT_MAP = { recede: VariantRecede, shutter: VariantShutter };

export default function Step17TransitionV5({ variant } = {}) {
  const resolved = VARIANT_MAP[variant] ? variant : "recede";
  const Comp = VARIANT_MAP[resolved];

  return (
    <div
      data-proto="step-17"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        minHeight: "100vh",
        background: "#EDEEF1",
        fontFamily: "'Noto Sans JP', 'Inter', system-ui, sans-serif",
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-proto="step-17"] *,
          [data-proto="step-17"] *::before,
          [data-proto="step-17"] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
      `}</style>

      <IPhoneFrame>
        <Comp key={resolved} />
      </IPhoneFrame>
    </div>
  );
}

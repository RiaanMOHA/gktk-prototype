import { useState, useEffect, useRef, useCallback } from "react";

const AMBER = "#FBB931";
const NEUTRAL_950 = "#25272C";
const NEUTRAL_800 = "#40444C";
const NEUTRAL_600 = "#5B616E";
const NEUTRAL_200 = "#D8DBDF";
const BASE_BG = "#F9F9F9";

const mkNoise = (f, o) => `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' aria-hidden="true"><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${f}' numOctaves='4' stitchTiles='stitch'/></filter><rect width='300' height='300' filter='url(#n)' opacity='${o}'/></svg>`)}")`;
const NOISE = mkNoise(0.75, 0.04);
const BG_NOISE = mkNoise(0.6, 0.03);
const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

// ─── mesh background ────────────────────────────────────────
function MeshBG({ phase = 0 }) {
  const w = 0.07 + phase * 0.07;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
      <div style={{ position: "absolute", inset: 0, background: BASE_BG }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 60% at 25% 18%, rgba(254,242,201,${w}) 0%, transparent 70%), radial-gradient(ellipse 55% 75% at 78% 72%, rgba(251,185,49,${w * 0.5}) 0%, transparent 60%), radial-gradient(ellipse 90% 45% at 45% 55%, rgba(255,148,36,${w * 0.25}) 0%, transparent 65%), radial-gradient(ellipse 65% 65% at 62% 28%, rgba(255,255,255,0.45) 0%, transparent 50%)`, transition: "background 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: BG_NOISE, backgroundRepeat: "repeat", mixBlendMode: "overlay", opacity: 0.6, pointerEvents: "none" }} />
    </div>
  );
}

// ─── glass panel ────────────────────────────────────────────
function Glass({ children, level = 2, z = 30, rx = 0, ry = 0, style = {} }) {
  const L2 = level === 2;
  return (
    <div style={{
      position: "relative",
      transform: `translateZ(${z}px) rotateX(${rx}deg) rotateY(${ry}deg)`,
      transformStyle: "preserve-3d",
      background: L2 ? "#F9F9F9" : "#F9F9F9",
                  border: `1px solid ${L2 ? "#F9F9F9" : "#F9F9F9"}`,
      boxShadow: `0 ${8 + z * 0.2}px ${32 + z}px rgba(0,0,0,${0.08 + z * 0.001}), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.6)`,
      borderRadius: "16px", overflow: "hidden",
      transition: "transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      ...style,
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: L2 ? "2px" : "1.5px", background: "linear-gradient(90deg, rgba(255,255,255,0) 5%, rgba(255,255,255,0.92) 30%, rgba(255,255,255,0.96) 50%, rgba(255,255,255,0.92) 70%, rgba(255,255,255,0) 95%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: "8%", right: "8%", height: "45%", background: "radial-gradient(ellipse 100% 100% at 50% 0%, rgba(255,255,255,0.4) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: NOISE, backgroundRepeat: "repeat", mixBlendMode: "overlay", opacity: 0.7, pointerEvents: "none", borderRadius: "inherit" }} />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

function DNum({ children, arrived = false, glow = false, z = 50, style = {} }) {
  return (
    <div style={{ transform: `translateZ(${arrived ? z : z - 20}px) scale(${arrived ? 1 : 0.88})`, transformStyle: "preserve-3d", transition: "transform 0.65s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)", opacity: arrived ? 1 : 0, filter: arrived ? "none" : "blur(2px)", position: "relative" }}>
      <span style={{ display: "inline-block", fontFamily: "'REM', sans-serif", fontWeight: 600, fontSize: "4.5rem", lineHeight: 1.05, letterSpacing: "-0.03em", color: NEUTRAL_950, textShadow: arrived ? "0 1px 0 rgba(255,255,255,0.5), 0 4px 8px rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.04)" : "none", ...style }}>{children}</span>
      {glow && <span style={{ position: "absolute", inset: "-24px", borderRadius: "50%", background: "radial-gradient(circle, rgba(251,185,49,0.22) 0%, transparent 70%)", pointerEvents: "none", animation: "bloomPulse 0.9s ease-out forwards" }} />}
    </div>
  );
}

function Cap({ children, vis = false, delay = 0, z = 10, style = {} }) {
  return (
    <div style={{ transform: `translateZ(${z}px) translateY(${vis ? 0 : 5}px)`, transformStyle: "preserve-3d", opacity: vis ? 1 : 0, transition: `opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s, transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s` }}>
      <p style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 400, fontSize: "0.875rem", lineHeight: 1.6, color: NEUTRAL_600, letterSpacing: "0.015em", margin: 0, ...style }}>{children}</p>
    </div>
  );
}

function ALine({ progress = 1, width = "100%", z = 15, style = {} }) {
  return (
    <div style={{ transform: `translateZ(${z}px)`, ...style }}>
      <svg width={width} height="3" viewBox="0 0 200 3" preserveAspectRatio="none" style={{ display: "block", filter: "drop-shadow(0 0 5px rgba(251,185,49,0.35))" }}>
        <defs><linearGradient id="al" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={AMBER} stopOpacity="0" /><stop offset="15%" stopColor={AMBER} stopOpacity="0.85" /><stop offset="85%" stopColor={AMBER} stopOpacity="0.85" /><stop offset="100%" stopColor={AMBER} stopOpacity="0" /></linearGradient></defs>
        <rect x="0" y="0.5" width={200 * progress} height="2" rx="1" fill="url(#al)" />
      </svg>
    </div>
  );
}

function ZLayer({ z = 0, children, style = {} }) {
  return <div style={{ transform: `translateZ(${z}px)`, transformStyle: "preserve-3d", ...style }}>{children}</div>;
}

// ───────────────────────────────────────────────────────────
// AMBER DESTINATION SCREEN (proves trigger fired)
// ───────────────────────────────────────────────────────────
function AmberScreen({ visible }) {
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 50,
      background: `linear-gradient(135deg, ${AMBER}, #FF9424)`,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(100%)",
      transition: "opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
      display: "flex", flexDirection: "column", alignItems: "flex-start",
      justifyContent: "center", padding: "48px 28px",
    }}>
      <p style={{ fontFamily: "'REM', sans-serif", fontWeight: 600, fontSize: "2rem", color: "#fff", lineHeight: 1.15, marginBottom: "12px" }}>
        Enter Kumamoto
      </p>
      <p style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: "0.875rem", color: "#F9F9F9", lineHeight: 1.6 }}>
        Trigger fired successfully. This is where the next section begins.
      </p>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// TRIGGERS
// ───────────────────────────────────────────────────────────

function TriggerTap({ visible, onFire }) {
  const [ripple, setRipple] = useState(false);
  return (
    <div style={{
      position: "absolute", bottom: "28px", right: "24px", zIndex: 35,
      opacity: visible ? 1 : 0, transform: `scale(${visible ? 1 : 0.6})`,
      transition: "opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
      pointerEvents: visible ? "auto" : "none",
    }}>
      <div
        onClick={() => { setRipple(true); setTimeout(() => onFire?.(), 250); }}
        style={{
          width: "48px", height: "48px", borderRadius: "14px",
          position: "relative", cursor: "pointer", overflow: "hidden",
          background:"#F9F9F9",
          
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <div style={{ position: "absolute", inset: 0, borderRadius: "inherit", backgroundImage: NOISE, backgroundRepeat: "repeat", mixBlendMode: "overlay", opacity: 0.5 }} />
        {ripple && <div style={{ position: "absolute", inset: "-50%", borderRadius: "50%", background: `radial-gradient(circle, rgba(251,185,49,0.4) 0%, transparent 60%)`, animation: "rippleOut 0.5s ease-out forwards" }} />}
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ position: "relative", zIndex: 2 }}>
          <path d="M6.5 3.5L12 9L6.5 14.5" stroke={NEUTRAL_800} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

function TriggerSwipe({ visible, onFire }) {
  const dragY = useRef(0);
  const [displayY, setDisplayY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startY = useRef(0);
  const TH = 70;

  const onS = (y) => { setDragging(true); startY.current = y; dragY.current = 0; setDisplayY(0); };
  const onM = (y) => { if (!dragging) return; const d = Math.max(0, startY.current - y); dragY.current = Math.min(120, d); setDisplayY(dragY.current); };
  const onE = () => {
    if (!dragging) return; setDragging(false);
    if (dragY.current >= TH) { setDisplayY(120); onFire?.(); }
    else { setDisplayY(0); dragY.current = 0; }
  };
  const p = Math.min(1, displayY / TH);

  return (
    <div
      onMouseDown={e => { e.preventDefault(); onS(e.clientY); }}
      onMouseMove={e => onM(e.clientY)}
      onMouseUp={onE} onMouseLeave={() => { if (dragging) onE(); }}
      onTouchStart={e => onS(e.touches[0].clientY)}
      onTouchMove={e => onM(e.touches[0].clientY)}
      onTouchEnd={onE} onTouchCancel={onE}
      style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "120px", zIndex: 35,
        opacity: visible ? 1 : 0, transition: "opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        pointerEvents: visible ? "auto" : "none",
        cursor: "grab", touchAction: "none", userSelect: "none",
      }}
    >
      <div style={{ position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
        <div style={{
          transform: `translateY(${-displayY * 0.25}px)`,
          transition: dragging ? "none" : "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
          animation: visible && !dragging ? "chevronBounce 1.5s ease-in-out infinite" : "none",
        }}>
          <svg width="28" height="14" viewBox="0 0 24 14" fill="none">
            <path d="M4 12L12 4L20 12" stroke={p > 0.8 ? AMBER : "rgba(37,39,44,0.5)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.15s" }} />
          </svg>
        </div>
        <div style={{ width: "48px", height: "3px", background: "rgba(0,0,0,0.08)", borderRadius: "2px", overflow: "hidden" }}>
          <div style={{ width: `${p * 100}%`, height: "100%", background: AMBER, borderRadius: "2px", transition: dragging ? "none" : "width 0.3s ease", boxShadow: p > 0.5 ? "0 0 8px rgba(251,185,49,0.4)" : "none" }} />
        </div>
        <p style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: "0.6875rem", color: NEUTRAL_600, opacity: 0.5, margin: 0 }}>swipe up</p>
      </div>
    </div>
  );
}

function TriggerAuto({ visible, onFire }) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);
  const firedRef = useRef(false);
  const DUR = 2400;

  useEffect(() => {
    if (!visible) { setProgress(0); firedRef.current = false; cancelAnimationFrame(rafRef.current); return; }
    const delay = setTimeout(() => {
      let start = null;
      const a = ts => {
        if (!start) start = ts;
        const p = Math.min(1, (ts - start) / DUR);
        setProgress(p);
        if (p >= 1 && !firedRef.current) { firedRef.current = true; onFire?.(); return; }
        if (p < 1) rafRef.current = requestAnimationFrame(a);
      };
      rafRef.current = requestAnimationFrame(a);
    }, 500);
    return () => { clearTimeout(delay); cancelAnimationFrame(rafRef.current); };
  }, [visible, onFire]);

  const r = 18; const circ = 2 * Math.PI * r;
  const secs = Math.max(0, Math.ceil((1 - progress) * (DUR / 1000)));

  return (
    <div style={{
      position: "absolute", bottom: "28px", right: "24px", zIndex: 35,
      opacity: visible ? 1 : 0, transform: `scale(${visible ? 1 : 0.6})`,
      transition: "opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
      display: "flex", flexDirection: "column", alignItems: "center", gap: "5px",
    }}>
      <div style={{ position: "relative", width: "44px", height: "44px" }}>
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background:"#F9F9F9", 
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: `0 2px 10px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.5)${progress > 0.5 ? `, 0 0 ${progress * 16}px rgba(251,185,49,${progress * 0.25})` : ""}`,
        }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "inherit", backgroundImage: NOISE, backgroundRepeat: "repeat", mixBlendMode: "overlay", opacity: 0.5 }} />
        </div>
        <svg width="44" height="44" style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}>
          <circle cx="22" cy="22" r={r} fill="none" stroke={AMBER} strokeWidth="2.5"
            strokeDasharray={circ} strokeDashoffset={circ * (1 - progress)} strokeLinecap="round"
            style={{ filter: progress > 0.3 ? `drop-shadow(0 0 4px rgba(251,185,49,${progress * 0.6}))` : "none" }} />
        </svg>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 1 }}>
          <path d="M5.5 3L10.5 8L5.5 13" stroke={progress >= 1 ? AMBER : NEUTRAL_800} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <p style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: "0.625rem", color: NEUTRAL_600, opacity: 0.5, margin: 0, fontVariantNumeric: "tabular-nums" }}>
        {progress >= 1 ? "done" : `${secs}s`}
      </p>
    </div>
  );
}

function TriggerPull({ visible, onFire }) {
  const dragY = useRef(0);
  const [displayY, setDisplayY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startY = useRef(0);
  const TH = 55;

  const onS = y => { setDragging(true); startY.current = y; dragY.current = 0; setDisplayY(0); };
  const onM = y => { if (!dragging) return; const d = Math.max(0, startY.current - y); dragY.current = Math.min(100, d); setDisplayY(dragY.current); };
  const onE = () => {
    if (!dragging) return; setDragging(false);
    if (dragY.current >= TH) { setDisplayY(100); onFire?.(); }
    else { setDisplayY(0); dragY.current = 0; }
  };
  const p = Math.min(1, displayY / TH);

  return (
    <>
      {/* peek of next section */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 32,
        height: `${displayY * 1.2}px`,
        background: "linear-gradient(180deg, rgba(237,238,241,0.95), rgba(249,249,249,1))",
        borderTop: displayY > 2 ? "1px solid rgba(0,0,0,0.06)" : "none",
        transition: dragging ? "none" : "height 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        overflow: "hidden", display: "flex", alignItems: "center", padding: "0 24px",
      }}>
        {displayY > 15 && (
          <p style={{
            fontFamily: "'REM', sans-serif", fontWeight: 600, fontSize: "1.1rem", color: NEUTRAL_950,
            opacity: Math.min(1, (displayY - 15) / 35),
          }}>
            Enter Kumamoto
          </p>
        )}
      </div>
      {/* drag handle */}
      <div
        onMouseDown={e => { e.preventDefault(); onS(e.clientY); }}
        onMouseMove={e => onM(e.clientY)}
        onMouseUp={onE} onMouseLeave={() => { if (dragging) onE(); }}
        onTouchStart={e => onS(e.touches[0].clientY)}
        onTouchMove={e => onM(e.touches[0].clientY)}
        onTouchEnd={onE} onTouchCancel={onE}
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "80px", zIndex: 35,
          opacity: visible ? 1 : 0, transition: "opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          pointerEvents: visible ? "auto" : "none",
          cursor: "grab", touchAction: "none", userSelect: "none",
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "flex-end", paddingBottom: "12px",
        }}
      >
        <div style={{
          width: "40px", height: "4px", borderRadius: "2px",
          background: p > 0.8 ? AMBER : NEUTRAL_200,
          boxShadow: p > 0.5 ? `0 0 10px rgba(251,185,49,${p * 0.5})` : "none",
          transition: "background 0.2s, box-shadow 0.2s", marginBottom: "5px",
        }} />
        <p style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: "0.625rem", color: NEUTRAL_600, opacity: 0.5, margin: 0 }}>pull up</p>
      </div>
    </>
  );
}

// ───────────────────────────────────────────────────────────
// BRIDGE OPTIONS
// ───────────────────────────────────────────────────────────

function BridgeA({ playing, onDone }) {
  const [count10, setCount10] = useState(0);
  const [count47, setCount47] = useState(0);
  const [beat, setBeat] = useState(0);
  const [lineP, setLineP] = useState(0);
  const raf = useRef(null); const fired = useRef(false);

  useEffect(() => {
    if (!playing) { setCount10(0); setCount47(0); setBeat(0); setLineP(0); fired.current = false; return; }
    let s = null;
    const a = ts => {
      if (!s) s = ts; const e = ts - s;
      if (e < 1200) { setCount10(Math.round(easeOutCubic(Math.min(1, e / 1000)) * 10)); if (e > 200) setBeat(1); }
      else if (e < 1600) { setCount10(10); setBeat(1); }
      else if (e < 2800) { setBeat(2); setCount47(Math.round(easeOutCubic(Math.min(1, (e - 1600) / 1000)) * 47000)); }
      else if (e < 3200) { setCount47(47000); setBeat(3); }
      else { setBeat(4); setLineP(easeOutCubic(Math.min(1, (e - 3200) / 600)));
        if (e > 3900 && !fired.current) { fired.current = true; onDone(); } if (e > 4200) return; }
      raf.current = requestAnimationFrame(a);
    };
    raf.current = requestAnimationFrame(a);
    return () => cancelAnimationFrame(raf.current);
  }, [playing, onDone]);

  return (
    <div style={{ padding: "48px 24px 90px", display: "flex", flexDirection: "column", gap: "20px", height: "100%", justifyContent: "center", perspective: "1200px", perspectiveOrigin: "50% 45%", transformStyle: "preserve-3d" }}>
      <Glass level={2} z={40} rx={1.2} ry={-0.5} style={{ padding: "24px" }}>
        <div role="group" aria-live="polite" aria-label={`${count10} trillion yen. Japan is rebuilding its chip industry.`}>
          <DNum arrived={beat >= 1} glow={beat === 1 && count10 === 10} z={55}>{count10 > 0 ? `${count10}` : "0"}</DNum>
          <Cap vis={beat >= 1} delay={0.2} z={12} style={{ marginTop: "8px" }}>trillion yen. Japan is rebuilding its chip industry.</Cap>
        </div>
      </Glass>
      <Glass level={2} z={25} rx={0.8} ry={0.4} style={{ padding: "24px", opacity: beat >= 2 ? 1 : 0 }}>
        <div role="group" aria-live="polite" aria-label={`${count47.toLocaleString()} jobs being created. Kumamoto is set to attract waves of high-income engineers.`}>
          <DNum arrived={beat >= 3} glow={beat === 3} z={50}>{count47.toLocaleString()}</DNum>
          <Cap vis={beat >= 3} delay={0.15} z={10} style={{ marginTop: "8px" }}>jobs being created. Kumamoto is set to attract waves of high-income engineers.</Cap>
        </div>
      </Glass>
      <ZLayer z={10}>
        <div style={{ opacity: beat >= 4 ? 1 : 0, transform: beat >= 4 ? "translateY(0)" : "translateY(14px)", transition: "all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)", paddingLeft: "4px" }}>
          <ALine progress={lineP} width="60%" z={5} />
          <Cap vis={beat >= 4} delay={0.3} z={5} style={{ marginTop: "12px" }}>High-income engineers are arriving. Housing demand will follow.</Cap>
        </div>
      </ZLayer>
    </div>
  );
}

function TD({ target, rolling, duration = 1000, delay = 0 }) {
  const [d, setD] = useState(0); const r = useRef(null);
  useEffect(() => {
    if (!rolling) { setD(0); return; }
    let s = null; const rp = Math.random() * 80;
    const a = ts => {
      if (!s) s = ts; const e = ts - s - delay;
      if (e < 0) { r.current = requestAnimationFrame(a); return; }
      const t = Math.min(1, e / duration);
      if (t < 0.65) setD(Math.floor((Math.sin(e * 0.035 + rp) + 1) * 5) % 10);
      else if (t < 0.85) setD(Math.floor(Math.random() * 10));
      else setD(target);
      if (t < 1) r.current = requestAnimationFrame(a); else setD(target);
    };
    r.current = requestAnimationFrame(a);
    return () => cancelAnimationFrame(r.current);
  }, [rolling, target, duration, delay]);
  return <span style={{ display: "inline-block", fontFamily: "'REM', sans-serif", fontWeight: 600, fontVariantNumeric: "tabular-nums", minWidth: "0.62em", textAlign: "center" }}>{d}</span>;
}
function TN({ value, rolling, db = 0 }) {
  return <span>{String(value).split("").map((c, i) => c === "," ? <span key={i} style={{ fontFamily: "'REM', sans-serif", fontWeight: 600 }}>,</span> : <TD key={i} target={parseInt(c)} rolling={rolling} duration={900 + i * 80} delay={db + i * 55} />)}</span>;
}
function TW({ text, active, speed = 28, delay = 0 }) {
  const [ch, setCh] = useState(0);
  useEffect(() => {
    if (!active) { setCh(0); return; }
    let to, i = 0;
    const sd = setTimeout(() => { const fn = () => { if (i <= text.length) { setCh(i); i++; to = setTimeout(fn, speed); } }; fn(); }, delay);
    return () => { clearTimeout(sd); clearTimeout(to); };
  }, [active, text, speed, delay]);
  return <span>{text.slice(0, ch)}{ch < text.length && active && <span style={{ display: "inline-block", width: "2px", height: "1em", background: AMBER, marginLeft: "1px", animation: "cursorBlink 0.5s step-end infinite", verticalAlign: "text-bottom", boxShadow: "0 0 6px rgba(251,185,49,0.5)" }} />}</span>;
}

function BridgeF({ playing, onDone }) {
  const [beat, setBeat] = useState(0);
  const [barP, setBarP] = useState(0);
  const fired = useRef(false);
  useEffect(() => {
    if (!playing) { setBeat(0); setBarP(0); fired.current = false; return; }
    const ts = [setTimeout(() => setBeat(1), 100), setTimeout(() => setBeat(2), 1400), setTimeout(() => setBeat(3), 1800), setTimeout(() => setBeat(4), 3200), setTimeout(() => setBeat(5), 3600)];
    let r, s = null;
    const a = t => { if (!s) s = t; const e = t - s;
      if (e > 3600) { setBarP(easeOutCubic(Math.min(1, (e - 3600) / 500)));
        if (e > 4200 && !fired.current) { fired.current = true; onDone(); } }
      if (e < 4500) r = requestAnimationFrame(a);
    };
    r = requestAnimationFrame(a);
    return () => { ts.forEach(clearTimeout); cancelAnimationFrame(r); };
  }, [playing, onDone]);

  return (
    <div style={{ padding: "48px 24px 90px", display: "flex", flexDirection: "column", gap: "20px", height: "100%", justifyContent: "center", perspective: "1200px", perspectiveOrigin: "50% 45%", transformStyle: "preserve-3d" }}>
      <Glass level={2} z={45} rx={1} ry={-0.3} style={{ padding: "24px", opacity: beat >= 1 ? 1 : 0 }}>
        <div role="group" aria-live="polite" aria-label="10 trillion yen committed to semiconductor sovereignty.">
          <DNum arrived={beat >= 2} z={60}><TN value="10" rolling={beat >= 1} /></DNum>
          <Cap vis={beat >= 2} delay={0.1} z={15} style={{ marginTop: "8px" }}><TW text="trillion yen committed to semiconductor sovereignty." active={beat >= 2} delay={200} /></Cap>
        </div>
      </Glass>
      <Glass level={2} z={30} rx={0.6} ry={0.5} style={{ padding: "24px", opacity: beat >= 3 ? 1 : 0 }}>
        <div role="group" aria-live="polite" aria-label="47,000 new jobs. The largest workforce migration in decades.">
          <DNum arrived={beat >= 4} z={50}><TN value="47,000" rolling={beat >= 3} /></DNum>
          <Cap vis={beat >= 4} delay={0.1} z={10} style={{ marginTop: "8px" }}><TW text="new jobs. The largest workforce migration in decades." active={beat >= 4} delay={200} /></Cap>
        </div>
      </Glass>
      <ZLayer z={12}>
        <div style={{ opacity: beat >= 5 ? 1 : 0, transition: "opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)", paddingLeft: "4px" }}>
          <div style={{ width: "100%", height: "3px", background: NEUTRAL_200, borderRadius: "2px", overflow: "hidden" }}>
            <div style={{ width: `${barP * 100}%`, height: "100%", background: `linear-gradient(90deg, transparent, ${AMBER})`, borderRadius: "2px", boxShadow: "0 0 8px rgba(251,185,49,0.4)" }} />
          </div>
          <Cap vis={beat >= 5} delay={0.3} z={5} style={{ marginTop: "12px" }}>Kumamoto is set to attract waves of high-income engineers.</Cap>
        </div>
      </ZLayer>
    </div>
  );
}

function BridgeG({ playing, onDone }) {
  const [as, setAs] = useState(-1);
  const fired = useRef(false);
  const slides = [
    { number: null, text: "The COVID-era chip shortage exposed a hard truth.", label: "context" },
    { number: "10", suffix: " trillion", text: "Japan is rebuilding its chip industry.", label: "investment" },
    { number: "47,000", suffix: "", text: "Jobs being created in Kumamoto alone.", label: "workforce" },
    { number: null, text: "High-income engineers need housing. That is the opportunity.", label: "thesis" },
  ];
  useEffect(() => {
    if (!playing) { setAs(-1); fired.current = false; return; }
    const ts = [
      setTimeout(() => setAs(0), 200), setTimeout(() => setAs(1), 1800),
      setTimeout(() => setAs(2), 3400),
      setTimeout(() => { setAs(3); if (!fired.current) { fired.current = true; setTimeout(() => onDone(), 800); } }, 5000),
    ];
    return () => ts.forEach(clearTimeout);
  }, [playing, onDone]);

  return (
    <div style={{ padding: "48px 24px 90px", display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", perspective: "1200px", perspectiveOrigin: "50% 45%", transformStyle: "preserve-3d" }}>
      <ZLayer z={20} style={{ marginBottom: "20px", paddingLeft: "4px" }}>
        <div style={{ display: "flex", gap: "8px" }}>
          {slides.map((_, i) => <div key={i} style={{ width: as === i ? "24px" : "6px", height: "6px", borderRadius: "3px", background: as >= i ? AMBER : NEUTRAL_200, boxShadow: as === i ? "0 0 10px rgba(251,185,49,0.5)" : "none", transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)" }} />)}
        </div>
      </ZLayer>
      <div style={{ position: "relative", minHeight: "220px", transformStyle: "preserve-3d" }}>
        {slides.map((sl, i) => {
          const act = as === i, past = as > i;
          return (
            <div key={i} style={{ position: "absolute", inset: 0, transform: `translateZ(${act ? 45 : past ? -10 : 20}px) rotateX(${act ? 0.8 : past ? -2 : 2}deg) scale(${act ? 1 : 0.92})`, opacity: act ? 1 : 0, filter: act ? "none" : "blur(6px)", transition: "all 0.65s cubic-bezier(0.34,1.56,0.64,1)", pointerEvents: act ? "auto" : "none", transformStyle: "preserve-3d" }}>
              <Glass level={2} z={0} rx={0} style={{ padding: "28px" }}>
                <ZLayer z={20}>
                  <div style={{ display: "inline-block", padding: "3px 10px", borderRadius: "8px", background: "rgba(251,185,49,0.1)", border: "1px solid rgba(251,185,49,0.2)", marginBottom: "16px" }}>
                    <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: "0.75rem", fontWeight: 500, color: NEUTRAL_600, letterSpacing: "0.02em" }}>{sl.label}</span>
                  </div>
                </ZLayer>
                <div role="group" aria-live="polite" aria-label={sl.number ? `${sl.number}${sl.suffix || ""}. ${sl.text}` : sl.text}>
                  {sl.number && (
                    <DNum arrived={act} glow={act} z={40}>
                      {sl.number}{sl.suffix && <span style={{ fontFamily: "'REM', sans-serif", fontWeight: 600, fontSize: "2rem", color: NEUTRAL_800, marginLeft: "4px" }}>{sl.suffix}</span>}
                    </DNum>
                  )}
                  <Cap vis={act} delay={0.2} z={8}>{sl.text}</Cap>
                </div>
              </Glass>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// MAIN
// ───────────────────────────────────────────────────────────
const BRIDGE_BY_VARIANT = { A: BridgeA, F: BridgeF, G: BridgeG };
const TRIGGERS = { "1": TriggerTap, "2": TriggerSwipe, "3": TriggerAuto, "4": TriggerPull };

export default function App({ variant } = {}) {
  const Comp = BRIDGE_BY_VARIANT[variant] ?? BridgeA;
  const Trig = TRIGGERS["1"]; // default trigger — tap

  const [playing, setPlaying] = useState(false);
  const [animKey] = useState(0);
  const [animDone, setAnimDone] = useState(false);
  const [transitioned, setTransitioned] = useState(false);

  useEffect(() => { const t = setTimeout(() => setPlaying(true), 400); return () => clearTimeout(t); }, []);

  const handleDone = useCallback(() => setAnimDone(true), []);
  const handleFire = useCallback(() => setTransitioned(true), []);

  return (
    <div data-proto="step-4" style={{ minHeight: "100vh", background: "#EDEEF1", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "'Noto Sans JP', sans-serif" }}>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-proto="step-4"] *,
          [data-proto="step-4"] *::before,
          [data-proto="step-4"] *::after {
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
        @keyframes bloomPulse { 0%{opacity:0;transform:scale(0.5)} 40%{opacity:1;transform:scale(1)} 100%{opacity:0;transform:scale(1.4)} }
        @keyframes cursorBlink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes rippleOut { 0%{opacity:1;transform:scale(0.3)} 100%{opacity:0;transform:scale(2.5)} }
        @keyframes chevronBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
      `}</style>

      {/* iPhone frame */}
      <div style={{
        width: 393, height: 852, borderRadius: 55, overflow: "hidden", position: "relative",
        background: "#1A1A1E",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.08) inset",
      }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 55, border: "2.5px solid transparent",
          background: "linear-gradient(135deg,rgba(255,255,255,0.2) 0%,rgba(255,255,255,0.05) 50%,rgba(255,255,255,0.15) 100%) border-box",
          WebkitMask: "linear-gradient(#fff 0 0) padding-box,linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude",
          zIndex: 50, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 6, left: 6, right: 6, bottom: 6, borderRadius: 49, overflow: "hidden", background: BASE_BG }}>
          <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: 126, height: 37, borderRadius: 20, background: "#000", zIndex: 100 }} />
          {/* bg */}
          <MeshBG phase={animDone ? 1 : 0.3} />
          {/* bridge content */}
          <div style={{ position: "relative", zIndex: 1, height: "100%" }}>
            <Comp key={`${variant ?? "A"}-${animKey}`} playing={playing} onDone={handleDone} />
          </div>
          {/* trigger layer */}
          <Trig key={`t-${animKey}`} visible={animDone && !transitioned} onFire={handleFire} />
          {/* amber destination */}
          <AmberScreen visible={transitioned} />
          <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", width: 134, height: 5, borderRadius: 3, background: "rgba(0,0,0,0.2)", zIndex: 100 }} />
        </div>
      </div>
    </div>
  );
}

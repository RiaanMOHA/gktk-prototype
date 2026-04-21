import { useState, useRef, useEffect, useCallback } from "react";

const C = {
  bg: "#F9F9F9", n950: "#25272C", n900: "#383A42", n800: "#40444C",
  n600: "#5B616E", n400: "#8B8F98", n200: "#D8DBDF", n100: "#EDEEF1",
  amber: "#FBB931", a50: "#FFFBEc", a100: "#FEF2C9",
  pBg:"#F9F9F9", pBd:"rgba(0,0,0,0.06)",
  pSh: "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
  eBg:"#F9F9F9", eBd:"rgba(0,0,0,0.06)",
  eSh: "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
};
const F = { h: "'REM', sans-serif", b: "'Noto Sans JP', sans-serif" };
const E = { s: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" };
const GAPS = ["Medical navigation", "Mental health support", "Education integration", "Spouse career support", "Operational friction"];
const VARIANTS = [
  { id: "A", label: "A: the flip" },
  { id: "B", label: "B: the cascade" },
  { id: "C", label: "C: the card" },
  { id: "D", label: "D: the sweep" },
];

function Glass({ children, style, elev, innerRef }) {
  const b = elev ? { background: C.eBg, border: `1px solid ${C.eBd}`, boxShadow: C.eSh } : { background: C.pBg, border: `1px solid ${C.pBd}`, boxShadow: C.pSh };
  return (<div ref={innerRef} style={{ borderRadius: 20, position: "relative", overflow: "hidden", ...b, ...style }}>
    <div style={{ position: "relative", zIndex: 3 }}>{children}</div>
  </div>);
}
function Phone({ children }) {
  return (<div style={{ width: 393, height: 852, borderRadius: 55, background: "#1A1A1E", overflow: "hidden", position: "relative", boxShadow: "0 0 0 1px rgba(255,255,255,0.08) inset" }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 55, border: "1px solid rgba(0,0,0,0.06)", pointerEvents: "none", zIndex: 10 }} />
    <div style={{ position: "absolute", left: -2.5, top: 140, width: 3, height: 32, background: "#2A2A2E", borderRadius: "2px 0 0 2px" }} /><div style={{ position: "absolute", left: -2.5, top: 185, width: 3, height: 52, background: "#2A2A2E", borderRadius: "2px 0 0 2px" }} /><div style={{ position: "absolute", left: -2.5, top: 245, width: 3, height: 52, background: "#2A2A2E", borderRadius: "2px 0 0 2px" }} /><div style={{ position: "absolute", right: -2.5, top: 185, width: 3, height: 52, background: "#2A2A2E", borderRadius: "2px 0 0 2px" }} />
    <div style={{ position: "absolute", inset: 6, borderRadius: 49, overflow: "hidden", background: C.bg }}>
      <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 126, height: 36, background: "#000", borderRadius: 20, zIndex: 50 }} />
      {children}
    </div>
  </div>);
}
function Img({ label, h, innerRef, style }) {
  return (<div ref={innerRef} style={{ width: "100%", height: h, borderRadius: 12, background: C.n100, border: `1px dashed ${C.n200}`, display: "flex", alignItems: "center", justifyContent: "center", ...style }}>
    <span style={{ fontFamily: F.b, fontSize: 13, color: C.n400, fontWeight: 500 }}>{label}</span>
  </div>);
}
function an(el, kf, o) { if (!el) return Promise.resolve(); return el.animate(kf, { fill: "forwards", ...o }).finished; }
function w(ms) { return new Promise(r => setTimeout(r, ms)); }
function Dots({ b, t }) { return (<div style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6, zIndex: 41 }}>{Array.from({ length: t }).map((_, i) => (<div key={i} style={{ width: i === b ? 8 : 5, height: i === b ? 8 : 5, borderRadius: 9999, background: i === b ? C.n800 : C.n200, transition: "all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }} />))}</div>); }
function XMark() { return (<span style={{ fontFamily: F.b, fontSize: 14, fontWeight: 600, color: C.n400, lineHeight: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 20, height: 20, borderRadius: 6, background: C.n100, flexShrink: 0 }}>{"\u2715"}</span>); }
function AmberDot({ size = 10 }) { return (<div style={{ width: size, height: size, borderRadius: 9999, background: C.amber, flexShrink: 0 }} />); }

// ─── CTA button ──────────────────────────────────────────────────────────────
function CtaButton({ innerRef }) {
  return (
    <div ref={innerRef} style={{ opacity: 0 }}>
      <button className="step-10-cta" style={{ width: "100%", padding: "14px 0", borderRadius: 12, border: "none", background: C.amber, fontFamily: F.h, fontSize: 16, fontWeight: 600, color: C.n950, cursor: "pointer", letterSpacing: "-0.01em" }}>
        View Moha Map
      </button>
    </div>
  );
}

// ─── shared beat animations ──────────────────────────────────────────────────

async function animB0($) {
  if ($.q) $.q.style.opacity = "0";
  await an($.q, [{ opacity: 0, transform: "scale(1.03)" }, { opacity: 1, transform: "scale(1)" }], { duration: 800, easing: E.s });
}
async function animB1($) {
  ["1l","1i","1s","1h","1b","1p"].forEach(k => { if ($[k]) $[k].style.opacity = "0"; });
  await an($["1l"], [{ opacity: 0 }, { opacity: 1 }], { duration: 250, easing: E.s });
  await an($["1i"], [{ opacity: 0, transform: "scale(0.97)" }, { opacity: 1, transform: "scale(1)" }], { duration: 500, easing: E.s });
  await w(100);
  await an($["1s"], [{ opacity: 0, transform: "translateY(8px) scale(0.9)" }, { opacity: 1, transform: "translateY(0) scale(1)" }], { duration: 500, easing: E.s });
  await w(150);
  await an($["1h"], [{ opacity: 0 }, { opacity: 1 }], { duration: 300, easing: E.s });
  await an($["1b"], [{ opacity: 0 }, { opacity: 1 }], { duration: 250, easing: E.s });
  await w(250);
  await an($["1p"], [{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 500, easing: E.s });
}
async function animB2($) {
  ["2l","2h","2i","2s","2t"].forEach(k => { if ($[k]) $[k].style.opacity = "0"; });
  await an($["2l"], [{ opacity: 0 }, { opacity: 1 }], { duration: 250, easing: E.s });
  await an($["2h"], [{ opacity: 0, transform: "translateY(4px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 450, easing: E.s });
  await an($["2i"], [{ opacity: 0, transform: "scale(0.97)" }, { opacity: 1, transform: "scale(1)" }], { duration: 550, easing: E.s });
  await w(100);
  await an($["2s"], [{ opacity: 0, transform: "translateY(10px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 450, easing: E.s });
  await w(100);
  await an($["2t"], [{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 500, easing: E.s });
}

// ─── shared beat renders ─────────────────────────────────────────────────────

function renderB0(s) {
  return (<div style={{ position: "absolute", inset: 0, padding: "68px 24px 70px", display: "flex", alignItems: "center" }}>
    <h1 ref={s("q")} style={{ opacity: 0, fontFamily: F.h, fontSize: 32, fontWeight: 600, color: C.n950, lineHeight: 1.2, letterSpacing: "-0.02em", margin: 0 }}>What are the current options?</h1>
  </div>);
}

function renderB1(s) {
  return (<div style={{ position: "absolute", inset: 0, padding: "56px 20px 44px", display: "flex", flexDirection: "column" }}>
    <span ref={s("1l")} style={{ opacity: 0, fontFamily: F.b, fontSize: 12, fontWeight: 500, color: C.n600, letterSpacing: "0.03em", display: "block", marginBottom: 8 }}>Market proof</span>
    <div style={{ position: "relative", marginBottom: 28 }}>
      <Img label="Kusunoki apartment complex" h={200} innerRef={s("1i")} style={{ opacity: 0 }} />
      <div ref={s("1s")} style={{ opacity: 0, position: "absolute", bottom: -20, right: 12 }}>
        <Glass elev style={{ padding: "8px 16px", borderRadius: 12, display: "flex", alignItems: "baseline", gap: 6 }}>
          <span role="group" aria-label="42 units" style={{ display: "contents" }}>
            <span style={{ fontFamily: F.h, fontSize: 48, fontWeight: 600, color: C.n950, lineHeight: 1, letterSpacing: "-0.02em" }}>42</span>
            <span style={{ fontFamily: F.b, fontSize: 13, fontWeight: 500, color: C.n600 }}>units</span>
          </span>
        </Glass>
      </div>
    </div>
    <p ref={s("1h")} style={{ opacity: 0, fontFamily: F.h, fontSize: 18, fontWeight: 600, color: C.n950, margin: "0 0 2px", lineHeight: 1.25 }}>Fully reserved before completion.</p>
    <p ref={s("1b")} style={{ opacity: 0, fontFamily: F.b, fontSize: 12, color: C.n600, margin: "0 0 16px", lineHeight: 1.4 }}>Kusunoki complex. Bulk-leased by JASM.</p>
    <div ref={s("1p")} style={{ opacity: 0 }}>
      <Glass elev style={{ padding: "14px 16px" }}>
        <p style={{ fontFamily: F.h, fontSize: 16, fontWeight: 600, color: C.n950, margin: 0, lineHeight: 1.3 }}>The B2B bulk-lease model works. Demand is proven.</p>
      </Glass>
    </div>
  </div>);
}

function renderB2(s) {
  return (<div style={{ position: "absolute", inset: 0, padding: "56px 20px 44px", display: "flex", flexDirection: "column" }}>
    <span ref={s("2l")} style={{ opacity: 0, fontFamily: F.b, fontSize: 12, fontWeight: 500, color: C.n600, letterSpacing: "0.03em", display: "block", marginBottom: 8 }}>Closest competitor</span>
    <h2 ref={s("2h")} style={{ opacity: 0, fontFamily: F.h, fontSize: 22, fontWeight: 600, color: C.n950, margin: "0 0 12px", lineHeight: 1.2 }}>Current options: housing without solutions</h2>
    <div style={{ position: "relative", marginBottom: 28 }}>
      <Img label="Formosa Hills" h={300} innerRef={s("2i")} style={{ opacity: 0 }} />
      <div ref={s("2s")} style={{ opacity: 0, position: "absolute", bottom: -18, left: 12, right: 12, display: "flex", gap: 8 }}>
        <Glass elev style={{ padding: "8px 12px", flex: 1, borderRadius: 12 }}>
          <span role="group" aria-label="65 units" style={{ display: "contents" }}>
            <span style={{ fontFamily: F.h, fontSize: 32, fontWeight: 600, color: C.n950, display: "block", lineHeight: 1, letterSpacing: "-0.02em" }}>65</span>
            <span style={{ fontFamily: F.b, fontSize: 12, color: C.n600, fontWeight: 500 }}>units</span>
          </span>
        </Glass>
        <Glass elev style={{ padding: "8px 12px", flex: 1, borderRadius: 12 }}>
          <span role="group" aria-label="80 percent Taiwanese guests" style={{ display: "contents" }}>
            <span style={{ fontFamily: F.h, fontSize: 32, fontWeight: 600, color: C.n950, display: "block", lineHeight: 1, letterSpacing: "-0.02em" }}>80%</span>
            <span style={{ fontFamily: F.b, fontSize: 12, color: C.n600, fontWeight: 500 }}>Taiwanese guests</span>
          </span>
        </Glass>
      </div>
    </div>
    <div ref={s("2t")} style={{ opacity: 0 }}>
      <Glass elev style={{ padding: "14px 16px" }}>
        <p style={{ fontFamily: F.h, fontSize: 16, fontWeight: 600, color: C.n950, margin: 0, lineHeight: 1.3 }}>Bilingual management, mail handling, meeting facilities.</p>
      </Glass>
    </div>
  </div>);
}

// ─── the transform beat (shared across variants) ─────────────────────────────
// Both X marks and amber dots exist. Tapping animates each X out and amber in, staggered.

function TransformBeat({ solved, onSolve, s, ctaRef }) {
  return (
    <div style={{ position: "absolute", inset: 0, padding: "56px 20px 44px", display: "flex", flexDirection: "column" }}>
      {/* image swaps: competitor when unsolved, MoreHarvest when solved */}
      <div ref={s("imgWrap")} style={{ marginBottom: 14, position: "relative" }}>
        {!solved && <Img label="Formosa Hills" h={120} style={{ opacity: 0.25, filter: "grayscale(0.6)" }} />}
        {solved && <Img label="MoreHarvest residence" h={120} style={{ opacity: 1 }} />}
      </div>

      {/* heading: unsolved is visible by default, solved fades in on top */}
      <div aria-live="polite" style={{ position: "relative", marginBottom: 16, minHeight: 28 }}>
        <p ref={s("thOld")} style={{ fontFamily: F.b, fontSize: 12, fontWeight: 500, color: C.n600, margin: 0, letterSpacing: "0.02em", position: "absolute", top: 0, left: 0 }}>What they do not solve</p>
        <p ref={s("thNew")} style={{ opacity: 0, fontFamily: F.h, fontSize: 22, fontWeight: 600, color: C.n950, margin: 0, lineHeight: 1.2, position: "absolute", top: 0, left: 0 }}>MoreHarvest solves all five.</p>
      </div>

      <div style={{ flex: 1 }}>
        {GAPS.map((g, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderBottom: i < 4 ? `1px solid ${C.n100}` : "none", position: "relative" }}>
            {/* X mark — visible initially */}
            <div ref={s(`x${i}`)} style={{ position: "absolute", left: 0 }}><XMark /></div>
            {/* Amber dot — hidden initially */}
            <div ref={s(`a${i}`)} style={{ opacity: 0, position: "absolute", left: 5 }}><AmberDot size={10} /></div>
            {/* text — offset by indicator width */}
            <span ref={s(`r${i}`)} style={{ fontFamily: F.h, fontSize: 16, fontWeight: 600, color: C.n950, marginLeft: 32 }}>{g}</span>
          </div>
        ))}
      </div>

      {/* CTA — hidden until solved */}
      <CtaButton innerRef={ctaRef} />

      {/* tap to transform — only when unsolved */}
      {!solved && (
        <div
          className="step-10-tap"
          onClick={onSolve}
          role="button"
          tabIndex={0}
          aria-label="Tap to continue"
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSolve(e); } }}
          style={{ position: "absolute", bottom: 28, left: 0, right: 0, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 40 }}
        >
          <span style={{ fontFamily: F.b, fontSize: 12, color: C.n400 }}>Tap to continue</span>
        </div>
      )}
    </div>
  );
}

// ─── shared slow transform animation ─────────────────────────────────────────
async function slowTransform($, setSolved) {
  // 1. fade out old heading
  await an($["thOld"], [{ opacity: 1 }, { opacity: 0 }], { duration: 400, easing: E.s });
  await w(300);
  // 2. fade in new heading
  await an($["thNew"], [{ opacity: 0, transform: "translateY(4px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 600, easing: E.s });
  await w(400);
  // 3. transform each X to amber dot, one at a time, SLOW
  for (let i = 0; i < GAPS.length; i++) {
    // fade out X
    an($[`x${i}`], [{ opacity: 1 }, { opacity: 0 }], { duration: 300, easing: E.s });
    await w(200);
    // fade in amber dot
    await an($[`a${i}`], [{ opacity: 0, transform: "scale(0.5)" }, { opacity: 1, transform: "scale(1)" }], { duration: 400, easing: E.s });
    await w(350);
  }
  setSolved(true);
  await w(400);
  // 4. fade in CTA
  if ($["4cta"]) await an($["4cta"], [{ opacity: 0, transform: "translateY(4px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 400, easing: E.s });
}

// ─── variant A: the flip ─────────────────────────────────────────────────────
// X marks to amber dots with a quick per-row stagger animation

function VA({ playing }) {
  const [beat, setBeat] = useState(0);
  const [solved, setSolved] = useState(false);
  const r = useRef({}); const s = (k) => (el) => { r.current[k] = el; };

  const advanceBeat = useCallback(() => {
    if (beat < 2) setBeat(b => b + 1);
    else if (beat === 2) setBeat(3);
  }, [beat]);

  const handleSolve = useCallback(async () => { await slowTransform(r.current, setSolved); }, []);

  useEffect(() => {
    if (!playing) return;
    const $ = r.current;
    (async () => {
      if (beat === 0) await animB0($);
      if (beat === 1) await animB1($);
      if (beat === 2) await animB2($);
      if (beat === 3 && !solved) {
        GAPS.forEach((_, i) => { if ($[`r${i}`]) $[`r${i}`].style.opacity = "0"; });
        if ($.thOld) $.thOld.style.opacity = "0";
        await an($.thOld, [{ opacity: 0 }, { opacity: 1 }], { duration: 350, easing: E.s });
        await w(150);
        for (let i = 0; i < GAPS.length; i++) {
          await an($[`r${i}`], [{ opacity: 0, transform: "translateX(-6px)" }, { opacity: 1, transform: "translateX(0)" }], { duration: 280, easing: E.s });
          await w(140);
        }
      }
    })();
  }, [playing, beat, solved]);

  if (!playing) return null;
  const totalDots = 4;
  return (
    <>
      <Dots b={Math.min(beat, totalDots - 1)} t={totalDots} />
      {beat < 3 && (
        <div
          className="step-10-tap"
          onClick={advanceBeat}
          role="button"
          tabIndex={0}
          aria-label="Tap to continue"
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); advanceBeat(); } }}
          style={{ position: "absolute", bottom: 28, left: 0, right: 0, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 40 }}
        >
          <span style={{ fontFamily: F.b, fontSize: 12, color: C.n400 }}>Tap to continue</span>
        </div>
      )}
      {beat === 0 && renderB0(s)}
      {beat === 1 && renderB1(s)}
      {beat === 2 && renderB2(s)}
      {beat === 3 && (
        <TransformBeat solved={solved} onSolve={handleSolve} s={s} variant="A" ctaRef={(el) => { r.current["4cta"] = el; }} />
      )}
    </>
  );
}

function VB({ playing }) {
  const [beat, setBeat] = useState(0);
  const [solved, setSolved] = useState(false);
  const r = useRef({}); const s = (k) => (el) => { r.current[k] = el; };
  const advanceBeat = useCallback(() => { if (beat < 3) setBeat(b => b + 1); }, [beat]);
  const handleSolve = useCallback(async () => { await slowTransform(r.current, setSolved); }, []);
  useEffect(() => { if (!playing) return; const $ = r.current; (async () => {
    if (beat === 0) await animB0($);
    if (beat === 1) await animB1($);
    if (beat === 2) await animB2($);
    if (beat === 3 && !solved) {
      GAPS.forEach((_, i) => { if ($[`r${i}`]) $[`r${i}`].style.opacity = "0"; });
      if ($.thOld) $.thOld.style.opacity = "0";
      await an($.thOld, [{ opacity: 0 }, { opacity: 1 }], { duration: 350, easing: E.s });
      await w(200);
      for (let i = 0; i < GAPS.length; i++) {
        await an($[`r${i}`], [{ opacity: 0 }, { opacity: 1 }], { duration: 350, easing: E.s });
        await w(200);
      }
    }
  })(); }, [playing, beat, solved]);
  if (!playing) return null;
  return (<><Dots b={Math.min(beat, 3)} t={4} />
    {beat < 3 && <div className="step-10-tap" onClick={advanceBeat} role="button" tabIndex={0} aria-label="Tap to continue" onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); advanceBeat(); } }} style={{ position: "absolute", bottom: 28, left: 0, right: 0, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 40 }}><span style={{ fontFamily: F.b, fontSize: 12, color: C.n400 }}>Tap to continue</span></div>}
    {beat === 0 && renderB0(s)}{beat === 1 && renderB1(s)}{beat === 2 && renderB2(s)}
    {beat === 3 && <TransformBeat solved={solved} onSolve={handleSolve} s={s} variant="B" ctaRef={(el) => { r.current["4cta"] = el; }} />}
  </>);
}

function VC({ playing }) {
  const [beat, setBeat] = useState(0);
  const [solved, setSolved] = useState(false);
  const r = useRef({}); const s = (k) => (el) => { r.current[k] = el; };
  const advanceBeat = useCallback(() => { if (beat < 3) setBeat(b => b + 1); }, [beat]);
  const handleSolve = useCallback(async () => { await slowTransform(r.current, setSolved); }, []);
  useEffect(() => { if (!playing) return; const $ = r.current; (async () => {
    if (beat === 0) await animB0($);
    if (beat === 1) await animB1($);
    if (beat === 2) await animB2($);
    if (beat === 3 && !solved) {
      GAPS.forEach((_, i) => { if ($[`r${i}`]) $[`r${i}`].style.opacity = "0"; });
      if ($.thOld) $.thOld.style.opacity = "0";
      await an($.thOld, [{ opacity: 0, transform: "translateY(4px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 400, easing: E.s });
      await w(200);
      for (let i = 0; i < GAPS.length; i++) {
        await an($[`r${i}`], [{ opacity: 0, transform: "translateY(4px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 300, easing: E.s });
        await w(160);
      }
    }
  })(); }, [playing, beat, solved]);
  if (!playing) return null;
  return (<><Dots b={Math.min(beat, 3)} t={4} />
    {beat < 3 && <div className="step-10-tap" onClick={advanceBeat} role="button" tabIndex={0} aria-label="Tap to continue" onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); advanceBeat(); } }} style={{ position: "absolute", bottom: 28, left: 0, right: 0, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 40 }}><span style={{ fontFamily: F.b, fontSize: 12, color: C.n400 }}>Tap to continue</span></div>}
    {beat === 0 && renderB0(s)}{beat === 1 && renderB1(s)}{beat === 2 && renderB2(s)}
    {beat === 3 && <TransformBeat solved={solved} onSolve={handleSolve} s={s} variant="C" ctaRef={(el) => { r.current["4cta"] = el; }} />}
  </>);
}

function VD({ playing }) {
  const [beat, setBeat] = useState(0);
  const [solved, setSolved] = useState(false);
  const r = useRef({}); const s = (k) => (el) => { r.current[k] = el; };
  const advanceBeat = useCallback(() => { if (beat < 3) setBeat(b => b + 1); }, [beat]);
  const handleSolve = useCallback(async () => { await slowTransform(r.current, setSolved); }, []);
  useEffect(() => { if (!playing) return; const $ = r.current; (async () => {
    if (beat === 0) await animB0($);
    if (beat === 1) await animB1($);
    if (beat === 2) await animB2($);
    if (beat === 3 && !solved) {
      GAPS.forEach((_, i) => { if ($[`r${i}`]) $[`r${i}`].style.opacity = "0"; });
      if ($.thOld) $.thOld.style.opacity = "0";
      await an($.thOld, [{ opacity: 0 }, { opacity: 1 }], { duration: 350, easing: E.s });
      await w(250);
      for (let i = 0; i < GAPS.length; i++) {
        await an($[`r${i}`], [{ opacity: 0, transform: "translateX(-8px)" }, { opacity: 1, transform: "translateX(0)" }], { duration: 280 + i * 20, easing: E.s });
        await w(180 + i * 30);
      }
    }
  })(); }, [playing, beat, solved]);
  if (!playing) return null;
  return (<><Dots b={Math.min(beat, 3)} t={4} />
    {beat < 3 && <div className="step-10-tap" onClick={advanceBeat} role="button" tabIndex={0} aria-label="Tap to continue" onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); advanceBeat(); } }} style={{ position: "absolute", bottom: 28, left: 0, right: 0, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 40 }}><span style={{ fontFamily: F.b, fontSize: 12, color: C.n400 }}>Tap to continue</span></div>}
    {beat === 0 && renderB0(s)}{beat === 1 && renderB1(s)}{beat === 2 && renderB2(s)}
    {beat === 3 && <TransformBeat solved={solved} onSolve={handleSolve} s={s} variant="D" ctaRef={(el) => { r.current["4cta"] = el; }} />}
  </>);
}

// ─── main ────────────────────────────────────────────────────────────────────
// VARIANTS kept as the canonical list of variant ids/labels even though the
// in-prototype chip selector is removed (the playground supplies the variant).
const MAP = { A: VA, B: VB, C: VC, D: VD };
export { VARIANTS };

export default function Step10V19({ variant }) {
  const v = variant && MAP[variant] ? variant : "A";
  const Comp = MAP[v];
  return (
    <div data-proto="step-10" style={{ minHeight: "100vh", background: "#EDEEF1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 0, fontFamily: F.b }}>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-proto="step-10"] *,
          [data-proto="step-10"] *::before,
          [data-proto="step-10"] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
        .step-10-cta { transition: transform 120ms cubic-bezier(0.4, 0, 0.2, 1); }
        .step-10-cta:active { transform: scale(0.97); }
        .step-10-tap { transition: transform 120ms cubic-bezier(0.4, 0, 0.2, 1); }
        .step-10-tap:active { transform: scale(0.97); }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=REM:wght@600&family=Noto+Sans+JP:wght@400;500;600&display=swap" rel="stylesheet" />
      <Phone><Comp key={v} playing={true} /></Phone>
    </div>
  );
}

import { useState, useEffect, useRef, useCallback } from "react";

const C = {
  bg: "#F9F9F9", n100: "#EDEEF1", n200: "#D8DBDF", n400: "#8A8F9A",
  n600: "#5B616E", n800: "#40444C", n900: "#383A42", n950: "#25272C",
  amber: "#FBB931", amber100: "#FEF2C9", orange: "#FF9424",
};

const GENTLE = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
const SETTLE = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";

const an = (el, kf, opts) => {
  if (!el) return Promise.resolve();
  return el.animate(kf, opts).finished;
};
const wait = (ms) => new Promise(r => setTimeout(r, ms));

const NOISE_ID = "gktk-noise";
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

function GlassPanel({ level = 1, borderRadius = 20, children, style = {}, innerRef, ...props }) {
  const isL2 = level === 2;
  return (
    <div ref={innerRef} style={{
      position: "relative", borderRadius,
      background:  "#F9F9F9",
                  border: isL2 ? "1px solid rgba(0,0,0,0.06)" : "1px solid rgba(0,0,0,0.06)",
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

const GlowDot = ({ size = 6, style = {} }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%", background: C.amber,
    boxShadow: `0 0 ${size * 2}px rgba(251,185,49,0.5), 0 0 ${size * 4}px rgba(251,185,49,0.2)`,
    ...style,
  }} />
);

function ReadyPrompt() {
  return (
    <div style={{
      position: "absolute", bottom: 48, left: 32, right: 32,
      display: "flex", alignItems: "center", gap: 8, zIndex: 10,
    }}>
      <GlowDot size={5} />
      <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 500, fontSize: 13, color: C.n400 }}>
        Tap to continue</span>
    </div>
  );
}

function GhostBridge() {
  return (
    <div style={{ position: "absolute", inset: 0, padding: "72px 24px 48px" }}>
      <div style={{
        position: "absolute", top: "30%", left: "50%", transform: "translate(-50%, -50%)",
        width: 280, height: 280, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(251,185,49,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <GlassPanel level={2} style={{ padding: "28px 24px", marginBottom: 16 }}>
        <p style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 11, fontWeight: 500, color: C.n400, margin: "0 0 8px", letterSpacing: "0.04em" }}>
          Semiconductor investment corridor</p>
        <p style={{ fontFamily: "'REM', sans-serif", fontWeight: 600, fontSize: 48, color: C.n950, margin: "0 0 4px", letterSpacing: "-0.03em", lineHeight: 1 }}>
          10T</p>
        <p style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 14, fontWeight: 500, color: C.n600, margin: 0 }}>
          yen in confirmed investment</p>
      </GlassPanel>
      <GlassPanel level={1} style={{ padding: "20px 24px", marginBottom: 16 }}>
        <p style={{ fontFamily: "'REM', sans-serif", fontWeight: 600, fontSize: 32, color: C.n950, margin: "0 0 4px", letterSpacing: "-0.02em", lineHeight: 1 }}>
          47,000</p>
        <p style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 13, fontWeight: 500, color: C.n600, margin: 0 }}>
          new jobs projected by 2027</p>
      </GlassPanel>
      {["TSMC / JASM fab complex", "Sony semiconductor expansion", "Government infrastructure program"].map((t, i) => (
        <GlassPanel key={i} level={1} borderRadius={14} style={{ padding: "14px 20px", marginBottom: 8, opacity: 0.7 - i * 0.1 }}>
          <p style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12, fontWeight: 500, color: C.n800, margin: 0 }}>{t}</p>
        </GlassPanel>
      ))}
    </div>
  );
}

function MapDestination({ onReplay, animate = true }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (animate && mapRef.current) {
      mapRef.current.animate([
        { opacity: 0, filter: "blur(6px)" },
        { opacity: 0.5, filter: "blur(3px)" },
        { opacity: 0.9, filter: "blur(1px)" },
        { opacity: 1, filter: "blur(0px)" },
      ], { duration: 600, easing: SETTLE, fill: "forwards" });
    }
  }, [animate]);

  return (
    <div ref={mapRef} style={{ position: "absolute", inset: 0, opacity: animate ? 0 : 1 }}>
      <div style={{ position: "absolute", inset: 0, background: "#1C1E22", overflow: "hidden" }}>
        <svg width="100%" height="100%" viewBox="0 0 375 812" fill="none" xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", inset: 0 }}>
          {[180, 260, 340, 420, 500, 580].map((y, i) => (
            <path key={`c${i}`}
              d={`M0 ${y} Q90 ${y - 20 - i * 5} 187 ${y - 10 + (i % 2) * 15} Q280 ${y + 10 - i * 3} 375 ${y - 5}`}
              stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
          ))}
          <line x1="60" y1="0" x2="120" y2="812" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <line x1="200" y1="0" x2="260" y2="812" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <line x1="0" y1="350" x2="375" y2="380" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <line x1="0" y1="500" x2="375" y2="470" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <rect x="130" y="280" width="120" height="200" rx="8"
            fill="rgba(251,185,49,0.08)" stroke="rgba(251,185,49,0.25)" strokeWidth="1" />
          {[
            { x: 160, y: 320, active: true }, { x: 210, y: 370, active: false },
            { x: 190, y: 420, active: false }, { x: 230, y: 350, active: true },
            { x: 170, y: 390, active: false },
          ].map((p, i) => (
            <g key={`p${i}`}>
              <circle cx={p.x} cy={p.y} r={p.active ? 5 : 3.5}
                fill={p.active ? C.amber : C.orange} opacity={p.active ? 0.9 : 0.5} />
              {p.active && <circle cx={p.x} cy={p.y} r={10} fill="none" stroke={C.amber} strokeWidth="1" opacity="0.3" />}
            </g>
          ))}
          <defs>
            <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="375" height="812" fill="url(#mapGrid)" />
        </svg>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, rgba(0,0,0,0.3) 100%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "35%", left: "40%", width: 120, height: 160, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(251,185,49,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
      </div>

      <button onClick={onReplay} style={{
        position: "absolute", top: 52, right: 16, zIndex: 200,
        background:"#F9F9F9", 
        
        border: "1px solid rgba(0,0,0,0.06)", borderRadius: 10,
        padding: "6px 10px", cursor: "pointer",
        fontFamily: "'Noto Sans JP', sans-serif", fontSize: 11, fontWeight: 500,
        color: "#F9F9F9", boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      }}>Replay</button>
    </div>
  );
}

function GravityWellTransition({ onComplete }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const [phase, setPhase] = useState("ready");
  const particlesRef = useRef(null);

  useEffect(() => {
    const particles = [];
    for (let i = 0; i < 200; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 60 + Math.random() * 350;
      particles.push({
        origX: Math.cos(angle) * dist,
        origY: Math.sin(angle) * dist,
        size: 1 + Math.random() * 2.5,
        speed: 0.3 + Math.random() * 0.7,
        brightness: 0.2 + Math.random() * 0.5,
        isAmber: Math.random() < 0.25,
      });
    }
    particlesRef.current = particles;
  }, []);

  const startCollapse = useCallback(() => {
    if (phase !== "ready") return;
    setPhase("collapsing");

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H * 0.45;
    const particles = particlesRef.current;
    const duration = 3800;
    const start = performance.now();

    const draw = (now) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      ctx.clearRect(0, 0, W, H);

      let collapse;
      if (t < 0.15) collapse = (t / 0.15) * 0.05;
      else if (t < 0.55) collapse = 0.05 + ((t - 0.15) / 0.40) * 0.55;
      else if (t < 0.82) collapse = 0.60 + ((t - 0.55) / 0.27) * 0.35;
      else collapse = 0.95 + ((t - 0.82) / 0.18) * 0.05;

      if (t > 0.1 && t < 0.85) {
        const distT = (t - 0.1) / 0.75;
        for (let r = 0; r < 5; r++) {
          const radius = (1 - distT * 0.7) * (80 + r * 55);
          const alpha = Math.sin(distT * Math.PI) * 0.06 * (1 - r / 5);
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(237,238,241,${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      for (const p of particles) {
        const pull = collapse * p.speed;
        const px = p.origX * (1 - pull);
        const py = p.origY * (1 - pull);
        const sx = cx + px, sy = cy + py;

        if (collapse > 0.2) {
          const tx = cx + px * (1 + collapse * 0.08);
          const ty = cy + py * (1 + collapse * 0.08);
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(tx, ty);
          ctx.strokeStyle = p.isAmber
            ? `rgba(251,185,49,${p.brightness * 0.3 * Math.min(collapse, 0.8)})`
            : `rgba(138,143,154,${p.brightness * 0.3 * Math.min(collapse, 0.8)})`;
          ctx.lineWidth = p.size * 0.5;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(sx, sy, p.size * (1 - collapse * 0.6), 0, Math.PI * 2);
        ctx.fillStyle = p.isAmber
          ? `rgba(251,185,49,${p.brightness * (1 - collapse * 0.5)})`
          : `rgba(169,169,175,${p.brightness * (1 - collapse * 0.5)})`;
        ctx.fill();
      }

      const glowAlpha = collapse * collapse * 0.4;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 20 + collapse * 100);
      grad.addColorStop(0, `rgba(255,255,255,${glowAlpha})`);
      grad.addColorStop(0.4, `rgba(251,185,49,${glowAlpha * 0.3})`);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      if (t > 0.82) {
        const flashAlpha = ((t - 0.82) / 0.18) ** 2;
        ctx.fillStyle = `rgba(249,249,249,${flashAlpha * 0.95})`;
        ctx.fillRect(0, 0, W, H);
      }

      if (t < 1) animRef.current = requestAnimationFrame(draw);
      else { setPhase("done"); }
    };
    animRef.current = requestAnimationFrame(draw);
  }, [phase]);

  useEffect(() => () => { if (animRef.current) cancelAnimationFrame(animRef.current); }, []);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}
      onClick={phase === "ready" ? startCollapse : undefined} role="button" tabIndex={0}>
      {(phase === "ready" || phase === "collapsing") && (
        <div style={{ position: "absolute", inset: 0, opacity: phase === "collapsing" ? 0 : 1, transition: "opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}>
          <GhostBridge />
        </div>
      )}
      <canvas ref={canvasRef} width={375} height={812} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />
      {phase === "ready" && <ReadyPrompt />}
      {phase === "done" && <MapDestination onReplay={onComplete} />}
    </div>
  );
}

function ShutterTransition({ onComplete }) {
  const [phase, setPhase] = useState("ready");
  const ghostRef = useRef(null);
  const topBandRef = useRef(null);
  const botBandRef = useRef(null);
  const seamRef = useRef(null);

  const startShutter = useCallback(async () => {
    if (phase !== "ready") return;
    setPhase("closing");

    await an(ghostRef.current, [
      { opacity: 1, filter: "blur(0px)" },
      { opacity: 0.6, filter: "blur(2px)" },
      { opacity: 0.3, filter: "blur(5px)" },
      { opacity: 0, filter: "blur(8px)" },
    ], { duration: 600, easing: GENTLE, fill: "forwards" });

    await wait(200);

    an(topBandRef.current, [
      { transform: "translateY(-100%)" }, { transform: "translateY(0%)" },
    ], { duration: 750, easing: SETTLE, fill: "forwards" });
    await an(botBandRef.current, [
      { transform: "translateY(100%)" }, { transform: "translateY(0%)" },
    ], { duration: 750, easing: SETTLE, fill: "forwards" });

    await an(seamRef.current, [
      { opacity: 0, boxShadow: "0 0 0px rgba(251,185,49,0)" },
      { opacity: 0.6, boxShadow: "0 0 30px rgba(251,185,49,0.3)" },
      { opacity: 0.8, boxShadow: "0 0 50px rgba(251,185,49,0.4)" },
      { opacity: 0.6, boxShadow: "0 0 30px rgba(251,185,49,0.2)" },
      { opacity: 0, boxShadow: "0 0 0px rgba(251,185,49,0)" },
    ], { duration: 500, easing: "ease-in-out", fill: "forwards" });

    await wait(150);

    setPhase("opening");
    an(topBandRef.current, [
      { transform: "translateY(0%)" }, { transform: "translateY(-100%)" },
    ], { duration: 650, easing: SETTLE, fill: "forwards" });
    await an(botBandRef.current, [
      { transform: "translateY(0%)" }, { transform: "translateY(100%)" },
    ], { duration: 650, easing: SETTLE, fill: "forwards" });

    await wait(200);
    setPhase("done");
  }, [phase]);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}
      onClick={phase === "ready" ? startShutter : undefined} role="button" tabIndex={0}>

      <div ref={ghostRef} style={{ position: "absolute", inset: 0 }}>
        <GhostBridge />
      </div>

      <div ref={topBandRef} style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "50%",
        background: `linear-gradient(180deg, ${C.n200} 0%, ${C.n100} 70%, rgba(237,238,241,0.95) 100%)`,
        transform: "translateY(-100%)", zIndex: 20, boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}><NoiseOverlay opacity={0.03} /></div>

      <div ref={botBandRef} style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
        background: `linear-gradient(0deg, ${C.n200} 0%, ${C.n100} 70%, rgba(237,238,241,0.95) 100%)`,
        transform: "translateY(100%)", zIndex: 20, boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
      }}><NoiseOverlay opacity={0.03} /></div>

      <div ref={seamRef} style={{
        position: "absolute", top: "50%", left: 0, right: 0,
        height: 2, transform: "translateY(-50%)",
        background: C.amber, opacity: 0, zIndex: 25,
      }} />

      {phase === "ready" && <ReadyPrompt />}
      {phase === "done" && <MapDestination onReplay={onComplete} />}
    </div>
  );
}

function ApproachTransition({ onComplete }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const [phase, setPhase] = useState("ready");
  const linesRef = useRef(null);

  useEffect(() => {
    const lines = [];
    for (let i = 0; i < 300; i++) {
      lines.push({
        angle: Math.random() * Math.PI * 2,
        baseDist: 20 + Math.random() * 80,
        speedMult: 0.5 + Math.random() * 1.5,
        maxDist: 300 + Math.random() * 400,
        isAmber: Math.random() < 0.35,
        brightness: 0.4 + Math.random() * 0.6,
        thickness: 0.5 + Math.random() * 1.5,
      });
    }
    linesRef.current = lines;
  }, []);

  const startWarp = useCallback(() => {
    if (phase !== "ready") return;
    setPhase("warping");

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H * 0.42;
    const lines = linesRef.current;
    const duration = 4000;
    const start = performance.now();

    const draw = (now) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      ctx.clearRect(0, 0, W, H);

      let accel, lineAlpha;
      if (t < 0.20) { const p = t / 0.20; accel = p * 0.03; lineAlpha = p * 0.15; }
      else if (t < 0.40) { const p = (t - 0.20) / 0.20; accel = 0.03 + p * 0.07; lineAlpha = 0.15 + p * 0.15; }
      else if (t < 0.60) { const p = (t - 0.40) / 0.20; accel = 0.10 + p * 0.25; lineAlpha = 0.30 + p * 0.2; }
      else if (t < 0.78) { const p = (t - 0.60) / 0.18; accel = 0.35 + p * 0.35; lineAlpha = 0.50 + p * 0.25; }
      else if (t < 0.90) { const p = (t - 0.78) / 0.12; accel = 0.70 + p * 0.30; lineAlpha = 0.75 + p * 0.25; }
      else { accel = 1.0; lineAlpha = 1.0; }

      const coolMix = Math.min(t * 1.2, 1);

      if (t > 0.2 && t < 0.92) {
        const vigT = (t - 0.2) / 0.72;
        const vigAlpha = Math.sin(vigT * Math.PI) * 0.35;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.6);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.5, `rgba(237,238,241,${vigAlpha * 0.2})`);
        grad.addColorStop(1, `rgba(216,219,223,${vigAlpha * 0.4})`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
      }

      for (const line of lines) {
        const dist = line.baseDist + accel * line.speedMult * line.maxDist;
        const len = 2 + accel * line.speedMult * 60;
        const x1 = cx + Math.cos(line.angle) * dist;
        const y1 = cy + Math.sin(line.angle) * dist;
        const x2 = cx + Math.cos(line.angle) * (dist - len);
        const y2 = cy + Math.sin(line.angle) * (dist - len);

        let r, g, b;
        if (line.isAmber) {
          r = Math.round(251 - coolMix * 82);
          g = Math.round(185 - coolMix * 16);
          b = Math.round(49 + coolMix * 120);
        } else {
          r = Math.round(169 - coolMix * 20);
          g = Math.round(169 - coolMix * 15);
          b = Math.round(169 + coolMix * 10);
        }

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(${r},${g},${b},${lineAlpha * line.brightness * 0.6})`;
        ctx.lineWidth = line.thickness;
        ctx.stroke();
      }

      const glowIntensity = accel * accel;
      const grad2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 100 + accel * 80);
      grad2.addColorStop(0, coolMix < 0.6
        ? `rgba(251,185,49,${glowIntensity * 0.2})`
        : `rgba(200,195,185,${glowIntensity * 0.15})`);
      grad2.addColorStop(1, "transparent");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, W, H);

      if (t > 0.90) {
        const flashAlpha = ((t - 0.90) / 0.10) ** 3;
        ctx.fillStyle = `rgba(249,249,249,${flashAlpha * 0.95})`;
        ctx.fillRect(0, 0, W, H);
      }

      if (t < 1) animRef.current = requestAnimationFrame(draw);
      else setPhase("done");
    };
    animRef.current = requestAnimationFrame(draw);
  }, [phase]);

  useEffect(() => () => { if (animRef.current) cancelAnimationFrame(animRef.current); }, []);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}
      onClick={phase === "ready" ? startWarp : undefined} role="button" tabIndex={0}>
      {(phase === "ready" || phase === "warping") && (
        <div style={{ position: "absolute", inset: 0, opacity: phase === "warping" ? 0 : 1, transition: "opacity 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}>
          <GhostBridge />
        </div>
      )}
      <canvas ref={canvasRef} width={375} height={812} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />
      {phase === "ready" && <ReadyPrompt />}
      {phase === "done" && <MapDestination onReplay={onComplete} />}
    </div>
  );
}

function RecedeTransition({ onComplete }) {
  const [phase, setPhase] = useState("ready");
  const ghostRef = useRef(null);

  const startRecede = useCallback(async () => {
    if (phase !== "ready") return;
    setPhase("receding");

    await an(ghostRef.current, [
      { transform: "scale(1) translateZ(0px)", opacity: 1, filter: "blur(0px)" },
      { transform: "scale(0.92) translateZ(-60px)", opacity: 0.7, filter: "blur(2px)" },
      { transform: "scale(0.78) translateZ(-150px)", opacity: 0.35, filter: "blur(5px)" },
      { transform: "scale(0.6) translateZ(-280px)", opacity: 0, filter: "blur(8px)" },
    ], { duration: 1100, easing: GENTLE, fill: "forwards" });

    await wait(500);
    setPhase("done");
  }, [phase]);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}
      onClick={phase === "ready" ? startRecede : undefined} role="button" tabIndex={0}>
      <div style={{ position: "absolute", inset: 0, perspective: "800px", perspectiveOrigin: "50% 45%" }}>
        <div ref={ghostRef} style={{
          position: "absolute", inset: 0,
          transformStyle: "preserve-3d", transformOrigin: "50% 45%",
        }}>
          <GhostBridge />
        </div>
      </div>
      {phase === "ready" && <ReadyPrompt />}
      {phase === "done" && <MapDestination onReplay={onComplete} />}
    </div>
  );
}

function IPhoneFrame({ children }) {
  return (
    <div style={{
      position: "relative", width: 393, height: 852, borderRadius: 55,
      overflow: "hidden", background: "#1A1A1E",
      boxShadow: "0 0 0 1px rgba(255,255,255,0.08) inset",
    }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 55, border: "1px solid rgba(0,0,0,0.06)", pointerEvents: "none" }} />
      {[120, 172, 224].map((top, i) => (
        <div key={`l${i}`} style={{
          position: "absolute", left: -2, top, width: 3, height: i === 0 ? 24 : 44,
          background: "linear-gradient(180deg, #3A3A3C, #2A2A2C)", borderRadius: "2px 0 0 2px",
          boxShadow: "-1px 0 2px rgba(0,0,0,0.3)",
        }} />
      ))}
      <div style={{
        position: "absolute", right: -2, top: 186, width: 3, height: 64,
        background: "linear-gradient(180deg, #3A3A3C, #2A2A2C)", borderRadius: "0 2px 2px 0",
        boxShadow: "1px 0 2px rgba(0,0,0,0.3)",
      }} />
      <div style={{
        position: "absolute", inset: 6, borderRadius: 49, overflow: "hidden", background: C.bg,
      }}>
        <MeshBg />
        <div style={{
          position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)",
          width: 126, height: 36, background: "#000", borderRadius: 20, zIndex: 100,
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }}>
          <div style={{
            position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
            width: 10, height: 10, borderRadius: "50%",
            background: "radial-gradient(circle at 40% 40%, #1a1a2e 0%, #0a0a0e 100%)",
            border: "1px solid rgba(0,0,0,0.06)",
          }} />
        </div>
        {children}
      </div>
    </div>
  );
}

const VARIANTS = [
  { key: "A", label: "A: the gravity well", Component: GravityWellTransition },
  { key: "C", label: "C: the shutter", Component: ShutterTransition },
  { key: "D", label: "D: the approach", Component: ApproachTransition },
  { key: "E", label: "E: the recede", Component: RecedeTransition },
];

export default function Step5TransitionV3({ variant } = {}) {
  const resolved = VARIANTS.find(v => v.key === variant) ? variant : "D";
  const [flowKey, setFlowKey] = useState(0);
  const current = VARIANTS.find(v => v.key === resolved);

  return (
    <div data-proto="step-5" style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: 24, fontFamily: "'Noto Sans JP', sans-serif",
      background: "#EDEEF1", minHeight: "100vh",
    }}>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-proto="step-5"] *,
          [data-proto="step-5"] *::before,
          [data-proto="step-5"] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
      `}</style>
      <NoiseDefs />
      <IPhoneFrame>
        <current.Component key={`${resolved}-${flowKey}`} onComplete={() => setFlowKey(k => k + 1)} />
      </IPhoneFrame>
    </div>
  );
}

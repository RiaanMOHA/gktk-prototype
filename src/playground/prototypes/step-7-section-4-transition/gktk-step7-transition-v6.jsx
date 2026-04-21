import { useState, useRef, useEffect } from "react";

/* ───────────────────────────────────────────────────────
   GKTK step-7-section-4-transition — v6
   Refined B: descent, D: warp
   Slower, more dramatic 3D spatial movement
   ─────────────────────────────────────────────────────── */

const EASING = {
  gentle: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  settle: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  power: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  heavy: "cubic-bezier(0.4, 0, 0.2, 1)",
};

const C = {
  bg:"#F9F9F9", heading:"#25272C", sub:"#383A42",
  body:"#40444C", caption:"#5B616E", amber:"#FBB931",
  amber50:"#FFFBEc", amber100:"#FEF2C9",
};

const an = (el, kf, opts) => {
  if (!el) return Promise.resolve();
  return el.animate(kf, { fill:"forwards", ...opts }).finished;
};
const wait = ms => new Promise(r => setTimeout(r, ms));

const Noise = () => (
  <svg width="0" height="0" style={{position:"absolute"}} aria-hidden="true">
    <defs>
      <filter id="ng">
        <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer><feFuncA type="linear" slope="0.08" /></feComponentTransfer>
        <feBlend in="SourceGraphic" mode="overlay" />
      </filter>
    </defs>
  </svg>
);

const MeshBg = () => (
  <div style={{
    position:"absolute",inset:0,zIndex:0,
    background: C.bg,
  }} />
);

const Glass = ({ children, style={}, innerRef }) => (
  <div ref={innerRef} style={{
    background:"#F9F9F9",
    border:"1px solid rgba(0,0,0,0.06)",
    borderRadius:28,position:"relative",overflow:"hidden",
    boxShadow:"0 8px 32px rgba(0,0,0,0.10),0 2px 8px rgba(0,0,0,0.06)",
    ...style,
  }}>
    <div style={{position:"relative",zIndex:4}}>{children}</div>
  </div>
);

const Resolve = ({ innerRef, headingRef, bodyRef }) => (
  <div ref={innerRef} style={{
    position:"absolute",inset:0,zIndex:12,display:"flex",flexDirection:"column",
    justifyContent:"center",padding:"0 24px",opacity:0,
  }}>
    <MeshBg />
    <Glass style={{padding:"28px 24px",position:"relative",zIndex:2}}>
      <div ref={headingRef} style={{fontFamily:"REM,sans-serif",fontWeight:600,fontSize:32,lineHeight:1.1,
        letterSpacing:"-0.02em",color:C.heading,marginBottom:12,opacity:0}}>
        3 to 5 million yen
      </div>
      <div ref={bodyRef} style={{fontFamily:"Noto Sans JP,sans-serif",fontWeight:400,fontSize:16,lineHeight:1.6,
        color:C.body,maxWidth:"72ch",opacity:0}}>
        Estimated replacement cost per engineer who repatriates early due to family maladjustment.
      </div>
    </Glass>
  </div>
);

const Tap = ({ innerRef }) => (
  <div ref={innerRef} style={{
    position:"absolute",bottom:48,left:0,right:0,display:"flex",
    justifyContent:"center",zIndex:20,opacity:0,
  }}>
    <div style={{fontFamily:"Noto Sans JP,sans-serif",fontSize:13,color:C.caption,letterSpacing:"0.01em"}}>
      Tap to continue
    </div>
  </div>
);

const reveal = async (res, tap, heading, body) => {
  // Panel enters
  await an(res,[
    {opacity:0,transform:"translateY(30px) scale(0.97)"},
    {opacity:0.4,transform:"translateY(15px) scale(0.985)"},
    {opacity:1,transform:"translateY(0) scale(1)"},
  ],{duration:700,easing:EASING.settle});
  await wait(200);
  // Heading animates: scale up from smaller, blur to sharp
  if (heading) {
    await an(heading,[
      {opacity:0,transform:"translateY(12px) scale(0.94)"},
      {opacity:0.6,transform:"translateY(5px) scale(0.98)"},
      {opacity:1,transform:"translateY(0) scale(1)"},
    ],{duration:600,easing:EASING.settle});
  }
  await wait(150);
  // Body text fades in, slight rise
  if (body) {
    await an(body,[
      {opacity:0,transform:"translateY(8px)"},
      {opacity:1,transform:"translateY(0)"},
    ],{duration:450,easing:EASING.settle});
  }
  await wait(300);
  if(tap) an(tap,[{opacity:0},{opacity:1}],{duration:400,easing:EASING.smooth});
};

const PlayBtn = () => (
  <div style={{
    position:"absolute",inset:0,zIndex:15,display:"flex",
    alignItems:"center",justifyContent:"center",cursor:"pointer",
  }}>
    <div style={{
      width:64,height:64,borderRadius:"50%",
      background:"rgba(251,185,49,0.15)",border:"2px solid rgba(251,185,49,0.4)",
      display:"flex",alignItems:"center",justifyContent:"center",
      boxShadow:"0 0 24px rgba(251,185,49,0.2)",
    }}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M6 4L16 10L6 16V4Z" fill="rgba(251,185,49,0.8)" />
      </svg>
    </div>
  </div>
);

// ─── Map face (placeholder, as instructed keep as-is) ───
const MapFace = ({ style={} }) => (
  <div style={{
    position:"absolute",width:"100%",height:"100%",overflow:"hidden",
    background:"linear-gradient(170deg,#1a1d23 0%,#252830 30%,#1e2128 60%,#16181d 100%)",
    ...style,
  }}>
    <svg viewBox="0 0 390 844" style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.13}}>
      {[100,180,260,340,420,500,580,660,740].map((y,i)=>(
        <path key={i} d={`M 0 ${y} Q ${90+i*18} ${y-25-i*7} 195 ${y-10+i*4} T 390 ${y+8}`}
          fill="none" stroke="#5B616E" strokeWidth={0.8} />
      ))}
    </svg>
    <svg viewBox="0 0 390 844" style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.15}}>
      <path d="M 50 0 L 50 280 Q 50 310 80 310 L 180 310 Q 210 310 210 340 L 210 844" fill="none" stroke="#9CA3AF" strokeWidth={2} />
      <path d="M 0 420 L 390 420" fill="none" stroke="#9CA3AF" strokeWidth={2.5} />
      <path d="M 280 0 L 280 180 Q 280 210 260 230 L 180 380" fill="none" stroke="#5B616E" strokeWidth={1} />
    </svg>
    <div style={{position:"absolute",top:"28%",left:"15%",width:"55%",height:"22%",
      background:"rgba(251,185,49,0.08)",border:"1px solid rgba(251,185,49,0.25)",borderRadius:8}} />
    {[{x:"25%",y:"32%",s:10,a:1},{x:"40%",y:"36%",s:8},{x:"55%",y:"34%",s:10,a:1},
      {x:"35%",y:"42%",s:7},{x:"60%",y:"40%",s:9},{x:"48%",y:"30%",s:8,a:1},
      {x:"70%",y:"38%",s:7},{x:"30%",y:"55%",s:6},{x:"50%",y:"52%",s:8},
    ].map((p,i)=>(
      <div key={i} style={{
        position:"absolute",left:p.x,top:p.y,width:p.s,height:p.s,borderRadius:"50%",
        background:p.a?C.amber:"#FF9424",
        transform:"translate(-50%,-50%)",
      }} />
    ))}
    <div style={{
      position:"absolute",bottom:"18%",left:"5%",width:"52%",
      background:"#F9F9F9",
      border:"1px solid rgba(0,0,0,0.06)",borderRadius:12,padding:"12px",
      boxShadow:"0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
    }}>
      <div style={{fontSize:12,color: C.caption,fontFamily:"Noto Sans JP,sans-serif",letterSpacing:"0.01em",marginBottom:4}}>
        Kumamoto semiconductor corridor
      </div>
      <div style={{display:"flex",gap:16}}>
        {[["JASM","12,800"],["TSMC","Phase 2"],["Workers","47,000"]].map(([l,v],i)=>(
          <div key={i}>
            <div style={{fontSize:12,color: C.caption,fontFamily:"Noto Sans JP,sans-serif"}}>{l}</div>
            <div style={{fontSize:12,color: C.heading,fontFamily:"REM,sans-serif",fontWeight:600}}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);


// ───────────────────────────────────────────────────────
// B: THE DESCENT (refined)
// Much slower. Camera lingers on the tilt. The drop
// has weight. Emergence into light is a moment.
// ───────────────────────────────────────────────────────
const Descent = ({ resolveRef, tapRef, headingRef, bodyRef, started }) => {
  const sceneRef = useRef(null);
  const flashRef = useRef(null);

  useEffect(() => {
    if (!started) return;
    const scene = sceneRef.current;
    const flash = flashRef.current;
    const res = resolveRef.current;
    const tap = tapRef.current;
    const h = headingRef?.current;
    const b = bodyRef?.current;
    if (!scene || !res) return;

    (async () => {
      // Phase 1: slow ominous tilt (1.2s of just tilting, building tension)
      await an(scene, [
        { transform: "rotateX(0deg) translateY(0px) translateZ(0px)", offset: 0 },
        // Barely perceptible tilt starts
        { transform: "rotateX(3deg) translateY(0px) translateZ(0px)", offset: 0.06 },
        // Tilt builds slowly... something is about to happen
        { transform: "rotateX(8deg) translateY(5px) translateZ(10px)", offset: 0.14 },
        { transform: "rotateX(14deg) translateY(15px) translateZ(20px)", offset: 0.22 },
        // Tilt commits — the floor gives way
        { transform: "rotateX(22deg) translateY(40px) translateZ(40px)", offset: 0.30 },

        // Phase 2: the drop — gravity takes over, accelerating
        { transform: "rotateX(35deg) translateY(150px) translateZ(80px)", offset: 0.40 },
        { transform: "rotateX(50deg) translateY(400px) translateZ(150px)", offset: 0.50 },
        { transform: "rotateX(62deg) translateY(800px) translateZ(220px)", offset: 0.58 },
        // Freefall — maximum speed
        { transform: "rotateX(70deg) translateY(1300px) translateZ(280px)", offset: 0.65 },
        { transform: "rotateX(72deg) translateY(1800px) translateZ(300px)", offset: 0.72 },

        // Phase 3: deceleration — approaching the light
        { transform: "rotateX(65deg) translateY(2200px) translateZ(280px)", offset: 0.78 },
        // Leveling out
        { transform: "rotateX(50deg) translateY(2500px) translateZ(240px)", offset: 0.84 },
        { transform: "rotateX(30deg) translateY(2700px) translateZ(180px)", offset: 0.90 },
        // Gentle settle into the light world
        { transform: "rotateX(12deg) translateY(2850px) translateZ(100px)", offset: 0.95 },
        { transform: "rotateX(0deg) translateY(3000px) translateZ(0px)", offset: 1.0 },
      ], { duration: 4200, easing: "linear" }); // linear because the keyframes themselves define the easing

      // Light wash
      if (flash) {
        await an(flash, [
          { opacity: 0 },
          { opacity: 0.7, offset: 0.35 },
          { opacity: 0.9, offset: 0.6 },
          { opacity: 0 },
        ], { duration: 800, easing: EASING.smooth });
      }

      await wait(500);
      await reveal(res, tap, h, b);
    })();
  }, [started, resolveRef, tapRef, headingRef, bodyRef]);

  return (
    <div style={{
      position: "absolute", inset: 0, overflow: "hidden",
      perspective: "500px", perspectiveOrigin: "50% 25%",
      background: "#0c0e13",
    }}>
      <div ref={sceneRef} style={{
        position: "absolute",
        width: "100%", height: "400%", top: 0, left: 0,
        transformStyle: "preserve-3d",
        transformOrigin: "50% 0%",
        transform: "rotateX(0deg) translateY(0px) translateZ(0px)",
      }}>
        {/* ── Layer 0: map surface (top quarter) ── */}
        <div style={{
          position: "absolute", top: 0, left: 0,
          width: "100%", height: "25%",
          transformStyle: "preserve-3d",
        }}>
          <MapFace />
          {/* Crack/fracture hint at bottom edge just before drop */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
            background: `linear-gradient(90deg, transparent 10%, rgba(251,185,49,0.4) 30%, rgba(251,185,49,0.6) 50%, rgba(251,185,49,0.4) 70%, transparent 90%)`,
            boxShadow: "0 0 20px rgba(251,185,49,0.3), 0 2px 40px rgba(251,185,49,0.15)",
          }} />
        </div>

        {/* ── Layer 1: upper void (falling through) ── */}
        <div style={{
          position: "absolute", top: "25%", left: 0,
          width: "100%", height: "25%",
          background: "linear-gradient(180deg, #080a0f 0%, #060810 50%, #0a0c12 100%)",
          overflow: "hidden",
        }}>
          {/* Horizontal data streams — wider, more visible */}
          {Array.from({length: 40}, (_, i) => {
            const y = i * 2.5;
            const isAmber = i % 5 === 0;
            return (
              <div key={i} style={{
                position: "absolute",
                top: `${y}%`,
                left: 0, width: "100%", height: isAmber ? 2 : 1,
                background: isAmber
                  ? `linear-gradient(90deg, transparent ${5 + (i%4)*8}%, rgba(251,185,49,0.12) ${25+(i%3)*10}%, rgba(251,185,49,0.2) 50%, rgba(251,185,49,0.12) ${65+(i%3)*5}%, transparent ${90-(i%4)*3}%)`
                  : `linear-gradient(90deg, transparent ${10+(i%4)*5}%, rgba(107,114,128,0.08) ${30+(i%3)*10}%, transparent ${70+(i%5)*6}%)`,
              }} />
            );
          })}

          {/* Floating data fragments — larger, more visible */}
          {Array.from({length: 20}, (_, i) => {
            const isAmber = i % 3 === 0;
            return (
              <div key={`f${i}`} style={{
                position: "absolute",
                left: `${8 + Math.random() * 84}%`,
                top: `${5 + Math.random() * 90}%`,
                width: 30 + Math.random() * 60,
                height: 12 + Math.random() * 24,
                background: isAmber ? "rgba(251,185,49,0.06)" : "rgba(107,114,128,0.04)",
                border: `1px solid ${isAmber ? "rgba(251,185,49,0.1)" : "rgba(107,114,128,0.06)"}`,
                borderRadius: 6,
              }} />
            );
          })}

          {/* Depth fog at top (transition from map) */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "30%",
            background: "linear-gradient(180deg, rgba(8,10,15,0.95) 0%, transparent 100%)",
          }} />
        </div>

        {/* ── Layer 2: deep void (maximum depth) ── */}
        <div style={{
          position: "absolute", top: "50%", left: 0,
          width: "100%", height: "25%",
          background: "#050710",
          overflow: "hidden",
        }}>
          {/* Sparse amber particles — the only light in the deep */}
          {Array.from({length: 15}, (_, i) => (
            <div key={i} style={{
              position: "absolute",
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              width: 3 + Math.random() * 5,
              height: 3 + Math.random() * 5,
              borderRadius: "50%",
              background: C.amber,
              opacity: 0.08 + Math.random() * 0.12,
            }} />
          ))}

          {/* Light beginning to appear from below */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
            background: "linear-gradient(180deg, transparent 0%, rgba(249,249,249,0.03) 50%, rgba(249,249,249,0.1) 100%)",
          }} />
        </div>

        {/* ── Layer 3: bright world (destination) ── */}
        <div style={{
          position: "absolute", top: "75%", left: 0,
          width: "100%", height: "25%",
          background: C.bg,
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: C.bg,
          }} />
          {/* Warmth gradient removed per flat-design mandate (no radial gradients, no amber washes) */}
        </div>
      </div>

      {/* Light wash overlay at transition point (flattened to solid neutral) */}
      <div ref={flashRef} style={{
        position: "absolute", inset: 0, zIndex: 10, opacity: 0,
        background: C.bg,
      }} />
    </div>
  );
};


// ───────────────────────────────────────────────────────
// D: THE WARP (refined)
// Much slower buildup. Speed lines start barely
// visible, build for 2 full seconds before the
// acceleration kicks. Longer hang time at peak.
// ───────────────────────────────────────────────────────
const Warp = ({ resolveRef, tapRef, headingRef, bodyRef, started }) => {
  const canvasRef = useRef(null);
  const mapOverRef = useRef(null);

  useEffect(() => {
    if (!started) return;
    const canvas = canvasRef.current;
    const mapOver = mapOverRef.current;
    const res = resolveRef.current;
    const tap = tapRef.current;
    const h = headingRef?.current;
    const b = bodyRef?.current;
    if (!canvas || !res) return;

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.width = canvas.offsetWidth * dpr;
    const H = canvas.height = canvas.offsetHeight * dpr;
    const ctx = canvas.getContext("2d");
    const cx = W / 2, cy = H * 0.42;

    // Speed lines — more of them, varied properties
    const lines = Array.from({ length: 300 }, () => {
      const isAmber = Math.random() > 0.65;
      return {
        angle: Math.random() * Math.PI * 2,
        baseDist: 15 + Math.random() * 60,
        speed: 0.3 + Math.random() * 2.5,
        maxDist: 200 + Math.random() * 400,
        hue: isAmber ? (38 + Math.random() * 10) : (215 + Math.random() * 25),
        isAmber,
        brightness: 0.2 + Math.random() * 0.6,
        thickness: isAmber ? (1.5 + Math.random() * 1.5) : (0.5 + Math.random() * 1),
      };
    });

    // Map fade: starts visible, fades over the first 40%
    let mapFaded = false;

    const DUR = 4000;
    const t0 = performance.now();

    const loop = (now) => {
      const t = Math.min((now - t0) / DUR, 1);
      ctx.clearRect(0, 0, W, H);

      // ── Background: dark, then brightens at the very end ──
      const bgBright = t > 0.82 ? ((t - 0.82) / 0.18) : 0;
      const bgR = Math.round(13 + bgBright * 236);
      const bgG = Math.round(15 + bgBright * 234);
      const bgB = Math.round(20 + bgBright * 229);
      ctx.fillStyle = `rgb(${bgR},${bgG},${bgB})`;
      ctx.fillRect(0, 0, W, H);

      // ── Fade the map underneath ──
      if (!mapFaded && mapOver) {
        const mapOpacity = Math.max(0, 1 - t / 0.35);
        mapOver.style.opacity = String(mapOpacity);
        if (mapOpacity <= 0) mapFaded = true;
      }

      // ── Acceleration curve ──
      // 0-0.25: barely anything (tension building)
      // 0.25-0.50: lines start appearing, slow drift
      // 0.50-0.75: acceleration, lines stretch
      // 0.75-0.90: full speed, everything streaming
      // 0.90-1.00: white out
      let accel, lineAlpha;
      if (t < 0.20) {
        // Almost nothing. Just a whisper.
        accel = t / 0.20 * 0.03;
        lineAlpha = t / 0.20 * 0.15;
      } else if (t < 0.40) {
        // Lines become visible, very slow drift
        const lt = (t - 0.20) / 0.20;
        accel = 0.03 + lt * 0.08;
        lineAlpha = 0.15 + lt * 0.3;
      } else if (t < 0.60) {
        // Noticeable movement now
        const lt = (t - 0.40) / 0.20;
        accel = 0.11 + lt * 0.2;
        lineAlpha = 0.45 + lt * 0.25;
      } else if (t < 0.78) {
        // Real acceleration — the jump is happening
        const lt = (t - 0.60) / 0.18;
        accel = 0.31 + lt * 0.4;
        lineAlpha = 0.7 + lt * 0.2;
      } else if (t < 0.90) {
        // Full speed — streaking
        const lt = (t - 0.78) / 0.12;
        accel = 0.71 + lt * 0.29;
        lineAlpha = 0.9 + lt * 0.1;
      } else {
        // White out
        accel = 1.0;
        lineAlpha = 1.0 - (t - 0.90) / 0.10;
      }

      // ── Draw speed lines ──
      for (const line of lines) {
        const currentDist = line.baseDist + accel * line.maxDist * line.speed;
        const lineLength = 1 + accel * 120 * line.speed;

        const x1 = cx + Math.cos(line.angle) * currentDist;
        const y1 = cy + Math.sin(line.angle) * currentDist;
        const x2 = cx + Math.cos(line.angle) * (currentDist + lineLength);
        const y2 = cy + Math.sin(line.angle) * (currentDist + lineLength);

        const alpha = line.brightness * lineAlpha;
        if (alpha < 0.01) continue;

        if (line.isAmber) {
          ctx.strokeStyle = `rgba(251,185,49,${alpha * 0.8})`;
        } else {
          ctx.strokeStyle = `rgba(140,150,170,${alpha * 0.45})`;
        }
        ctx.lineWidth = line.thickness * dpr * (0.5 + accel * 0.5);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // ── Central glow — builds slowly, intensifies at peak ──
      const glowIntensity = accel * accel; // quadratic for dramatic ramp
      const glowR = 30 + glowIntensity * 300;
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
      grd.addColorStop(0, `rgba(251,185,49,${glowIntensity * 0.5})`);
      grd.addColorStop(0.3, `rgba(251,185,49,${glowIntensity * 0.2})`);
      grd.addColorStop(0.6, `rgba(200,200,220,${glowIntensity * 0.08})`);
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      // ── Tunnel vignette — edges darken during the middle, lighten at end ──
      if (t > 0.3 && t < 0.85) {
        const vigT = t < 0.6 ? (t - 0.3) / 0.3 : 1 - (t - 0.6) / 0.25;
        const vigGrd = ctx.createRadialGradient(cx, cy, W * 0.2, cx, cy, W * 0.7);
        vigGrd.addColorStop(0, "transparent");
        vigGrd.addColorStop(1, `rgba(5,7,16,${vigT * 0.5})`);
        ctx.fillStyle = vigGrd;
        ctx.fillRect(0, 0, W, H);
      }

      // ── White flash at the very end ──
      if (t > 0.88) {
        const flashT = (t - 0.88) / 0.12;
        // Smooth in, not instant
        const flashAlpha = flashT * flashT * flashT;
        ctx.fillStyle = `rgba(249,249,249,${flashAlpha})`;
        ctx.fillRect(0, 0, W, H);
      }

      if (t < 1) {
        requestAnimationFrame(loop);
      } else {
        ctx.clearRect(0, 0, W, H);
        if (mapOver) mapOver.style.display = "none";
        canvas.style.display = "none";
        (async () => {
          await wait(500);
          await reveal(res, tap, h, b);
        })();
      }
    };

    requestAnimationFrame(loop);
  }, [started, resolveRef, tapRef, headingRef, bodyRef]);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#0d0f14" }}>
      <div ref={mapOverRef} style={{ position: "absolute", inset: 0, zIndex: 1, transition: "none" }}>
        <MapFace />
      </div>
      <canvas ref={canvasRef} style={{
        position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 5,
      }} />
    </div>
  );
};


// ─── iPhone frame ───
const Phone = ({ children }) => (
  <div style={{
    position:"relative",width:393,height:852,borderRadius:55,background:"#1A1A1E",overflow:"hidden",
    boxShadow:"0 0 0 1px rgba(255,255,255,0.08) inset",
  }}>
    <div style={{position:"absolute",inset:-1,borderRadius:56,
      background:"linear-gradient(135deg,#555 0%,#333 30%,#444 50%,#2a2a2a 70%,#555 100%)",zIndex:-1}} />
    <div style={{position:"absolute",inset:6,borderRadius:49,overflow:"hidden",background:C.bg}}>
      <div style={{position:"absolute",top:10,left:"50%",transform:"translateX(-50%)",width:126,height:36,borderRadius:20,background:"#000",zIndex:30}} />
      <div style={{
        position:"absolute",top:14,left:24,right:24,display:"flex",justifyContent:"space-between",
        zIndex:25,fontSize:13,fontWeight:600,fontFamily:"-apple-system,sans-serif",
        color: "#F9F9F9",mixBlendMode:"difference",
      }}>
        <span>9:41</span><span style={{fontSize:11}}>5G</span>
      </div>
      <div style={{
        position:"absolute",bottom:8,left:"50%",transform:"translateX(-50%)",
        width:134,height:5,borderRadius:3,background:"#F9F9F9",zIndex:25,mixBlendMode:"difference",
      }} />
      {children}
    </div>
    <div style={{position:"absolute",right:-2,top:160,width:3,height:36,background:"#333",borderRadius:"0 2px 2px 0"}} />
    <div style={{position:"absolute",left:-2,top:140,width:3,height:28,background:"#333",borderRadius:"2px 0 0 2px"}} />
    <div style={{position:"absolute",left:-2,top:200,width:3,height:56,background:"#333",borderRadius:"2px 0 0 2px"}} />
    <div style={{position:"absolute",left:-2,top:264,width:3,height:56,background:"#333",borderRadius:"2px 0 0 2px"}} />
  </div>
);

// ─── MAIN ───
const VARIANT_INDEX = { B: 0, D: 1 };

export default function Step7V6({ variant } = {}) {
  const v = VARIANT_INDEX[variant] ?? 0;
  const [go, setGo] = useState(false);
  const [k] = useState(0);

  const rB=useRef(null), rD=useRef(null);
  const tB=useRef(null), tD=useRef(null);
  const hB=useRef(null), hD=useRef(null);
  const bB=useRef(null), bD=useRef(null);

  const tap = () => { if (!go) setGo(true); };

  return (
    <div data-proto="step-7" style={{
      minHeight:"100vh",background:"#EDEEF1",display:"flex",flexDirection:"column",
      alignItems:"center",justifyContent:"center",padding:24,
      fontFamily:"Noto Sans JP,sans-serif",
    }}>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-proto="step-7"] *,
          [data-proto="step-7"] *::before,
          [data-proto="step-7"] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
      `}</style>
      <Noise />
      <Phone key={`${variant ?? "B"}-${k}`}>
        {v===0 && (
          <div
            style={{position:"absolute",inset:0}}
            onClick={tap}
            role="button"
            tabIndex={0}
            aria-label="Continue"
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); tap(); } }}
          >
            <MeshBg />
            <Descent resolveRef={rB} tapRef={tB} headingRef={hB} bodyRef={bB} started={go} />
            <Resolve innerRef={rB} headingRef={hB} bodyRef={bB} />
            <Tap innerRef={tB} />
            {!go && <PlayBtn />}
          </div>
        )}
        {v===1 && (
          <div
            style={{position:"absolute",inset:0}}
            onClick={tap}
            role="button"
            tabIndex={0}
            aria-label="Continue"
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); tap(); } }}
          >
            <MeshBg />
            <Warp resolveRef={rD} tapRef={tD} headingRef={hD} bodyRef={bD} started={go} />
            <Resolve innerRef={rD} headingRef={hD} bodyRef={bD} />
            <Tap innerRef={tD} />
            {!go && <PlayBtn />}
          </div>
        )}
      </Phone>
    </div>
  );
}

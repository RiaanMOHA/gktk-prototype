import { useState, useRef, useEffect, useCallback } from "react";

const VARIANTS = [
  { id: "A", label: "A: the beacon" },
  { id: "C", label: "C: the ledger" },
];

const DATA = {
  bull:   { 3:{ip:18.29,ipo:14.89,ep:1.62,epo:1.50,rp:1624447742,rpo:1496935513}, 4:{ip:15.06,ipo:12.31,ep:1.70,epo:1.56,rp:1700303136,rpo:1557301236}, 5:{ip:13.16,ipo:10.77,ep:1.78,epo:1.62,rp:1776285098,rpo:1617767681}, 6:{ip:11.90,ipo:9.76,ep:1.85,epo:1.68,rp:1853120274,rpo:1678913114} },
  normal: { 3:{ip:14.77,ipo:12.00,ep:1.50,epo:1.40,rp:1496447742,rpo:1395073113}, 4:{ip:12.15,ipo:9.91,ep:1.56,epo:1.44,rp:1556303136,rpo:1442706036}, 5:{ip:10.60,ipo:8.66,ep:1.62,epo:1.49,rp:1616285098,rpo:1490439681}, 6:{ip:9.57,ipo:7.84,ep:1.68,epo:1.54,rp:1677120274,rpo:1538852314} },
  bear:   { 3:{ip:11.14,ipo:9.03,ep:1.37,epo:1.29,rp:1368447742,rpo:1293210713}, 4:{ip:9.16,ipo:7.45,ep:1.41,epo:1.33,rp:1412303136,rpo:1328110836}, 5:{ip:7.97,ipo:6.50,ep:1.46,epo:1.36,rp:1456285098,rpo:1363111681}, 6:{ip:7.18,ipo:5.87,ep:1.50,epo:1.40,rp:1501120274,rpo:1398791514} },
};

const fmtIrr = v=>`${v.toFixed(2)}%`;
const fmtEm = v=>`${v.toFixed(2)}x`;
const fmtYen = v=>`Â¥${(v/1e9).toFixed(2)}B`;

const EASE = {
  gentle:"cubic-bezier(0.23,0.86,0.39,0.96)",
  settle:"cubic-bezier(0.22,1,0.36,1)",
  smooth:"cubic-bezier(0.25,0.46,0.45,0.94)",
  spring:"cubic-bezier(0.34,1.56,0.64,1)",
};

const NoiseGrain = ({opacity=0.035,id="nf"})=>(
  <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",mixBlendMode:"overlay",opacity,zIndex:90}}>
    <filter id={id}><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch"/></filter>
    <rect width="100%" height="100%" filter={`url(#${id})`}/>
  </svg>
);

const MeshGradient = ({warm=false})=>(
  <div style={{position:"absolute",inset:0,zIndex:0,
    background:warm
      ?`radial-gradient(ellipse 80% 60% at 30% 70%,rgba(255,251,236,0.6) 0%,transparent 60%),radial-gradient(ellipse 60% 50% at 70% 40%,rgba(251,185,49,0.08) 0%,transparent 50%),#F9F9F9`
      :`radial-gradient(ellipse 80% 60% at 30% 30%,rgba(237,238,241,0.5) 0%,transparent 60%),radial-gradient(ellipse 60% 50% at 70% 60%,rgba(220,222,228,0.3) 0%,transparent 50%),linear-gradient(135deg,#EDEEF1 0%,#F9F9F9 50%)`}}/>
);

const Glass = ({level=1,children,style={}})=>{
  const l2=level===2;
  return(
    <div style={{position:"relative",
      background:l2?"rgba(255,255,255,0.88)":"rgba(255,255,255,0.70)",
      backdropFilter:l2?"blur(24px) saturate(1.6)":"blur(20px) saturate(1.4)",
      WebkitBackdropFilter:l2?"blur(24px) saturate(1.6)":"blur(20px) saturate(1.4)",
      border:l2?"1px solid rgba(255,255,255,0.95)":"1px solid rgba(255,255,255,0.85)",
      boxShadow:l2?"0 8px 32px rgba(0,0,0,0.10),0 2px 8px rgba(0,0,0,0.06),inset 0 1px 0 rgba(255,255,255,0.9)"
        :"0 2px 12px rgba(0,0,0,0.06),0 1px 3px rgba(0,0,0,0.04),inset 0 1px 0 rgba(255,255,255,0.8)",
      borderRadius:20,overflow:"hidden",...style}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:l2?2:1.5,background:"linear-gradient(180deg,rgba(255,255,255,0.9) 0%,transparent 100%)",zIndex:2}}/>
      <div style={{position:"absolute",top:0,left:"10%",right:"10%",height:40,background:"radial-gradient(ellipse 80% 100% at 50% 0%,rgba(255,255,255,0.5) 0%,transparent 100%)",zIndex:1}}/>
      <NoiseGrain opacity={0.025} id={`g${Math.random().toString(36).slice(2,5)}`}/>
      <div style={{position:"relative",zIndex:5}}>{children}</div>
    </div>
  );
};

/* ââ scenario tabs ââ */
const ScenarioTabs = ({scenario,set})=>(
  <div style={{display:"flex",gap:6}}>
    {["bull","normal","bear"].map(s=>(
      <button key={s} onClick={()=>set(s)} style={{
        padding:"7px 18px",borderRadius:12,border:"none",cursor:"pointer",
        fontSize:12,fontWeight:500,fontFamily:"'Noto Sans JP',sans-serif",textTransform:"capitalize",
        background:scenario===s?"rgba(255,255,255,0.88)":"transparent",
        color:scenario===s?"#25272C":"#8E8F8F",
        backdropFilter:scenario===s?"blur(12px)":"none",
        boxShadow:scenario===s?"0 2px 8px rgba(0,0,0,0.06),inset 0 1px 0 rgba(255,255,255,0.8)":"none",
        transition:"all 0.25s cubic-bezier(0.22,1,0.36,1)",
      }}>{s}</button>
    ))}
  </div>
);

/* ââ interactive year slider (refined) ââ */
const YearSlider = ({year,set})=>{
  const years=[3,4,5,6]; const idx=years.indexOf(year); const pct=idx/(years.length-1)*100;
  const trackRef=useRef(null); const dragging=useRef(false);

  const resolve=(e)=>{
    const rect=trackRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x=(clientX-rect.left)/rect.width;
    set(years[Math.max(0,Math.min(years.length-1,Math.round(x*(years.length-1))))]);
  };

  const onDown=(e)=>{dragging.current=true;resolve(e);};
  const onMove=(e)=>{if(dragging.current)resolve(e);};
  const onUp=()=>{dragging.current=false;};

  useEffect(()=>{
    const up=()=>{dragging.current=false;};
    window.addEventListener("mouseup",up); window.addEventListener("touchend",up);
    return()=>{window.removeEventListener("mouseup",up);window.removeEventListener("touchend",up);};
  },[]);

  return(
    <div style={{padding:"0 4px"}}>
      <div ref={trackRef} onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp}
        onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp}
        style={{position:"relative",height:40,cursor:"pointer",touchAction:"none",userSelect:"none"}}>
        <div style={{position:"absolute",top:16,left:0,right:0,height:4,borderRadius:2,background:"rgba(0,0,0,0.06)"}}/>
        <div style={{position:"absolute",top:16,left:0,width:`${pct}%`,height:4,borderRadius:2,
          background:"linear-gradient(90deg,#FBB931 0%,rgba(251,185,49,0.6) 100%)",
          boxShadow:"0 0 6px rgba(251,185,49,0.2)",
          transition:"width 0.25s cubic-bezier(0.22,1,0.36,1)"}}/>
        <div style={{
          position:"absolute",top:6,left:`${pct}%`,transform:"translateX(-50%)",
          width:24,height:24,borderRadius:12,
          background:"#FBB931",border:"3px solid #FEFEFE",
          boxShadow:"0 2px 10px rgba(251,185,49,0.4),0 1px 3px rgba(0,0,0,0.1)",
          transition:"left 0.25s cubic-bezier(0.22,1,0.36,1)",
        }}/>
        {years.map((y,i)=>(
          <div key={y} style={{
            position:"absolute",top:30,left:`${i/(years.length-1)*100}%`,transform:"translateX(-50%)",
            fontFamily:"'Noto Sans JP',sans-serif",fontSize:11,fontWeight:year===y?600:400,
            color:year===y?"#25272C":"#8E8F8F",
            transition:"all 0.25s cubic-bezier(0.22,1,0.36,1)",
          }}>{y}Y</div>
        ))}
      </div>
    </div>
  );
};

/* ââ animated value display ââ */
const AnimVal = ({value,size=56,color="#25272C"})=>{
  const ref=useRef(null);
  const prev=useRef(value);
  useEffect(()=>{
    if(prev.current!==value && ref.current){
      ref.current.animate([
        {opacity:0.3,transform:"translateY(4px)"},
        {opacity:1,transform:"translateY(0)"},
      ],{duration:150,easing:EASE.sharp,fill:"forwards"});
      prev.current=value;
    }
  },[value]);
  return <div ref={ref} style={{fontFamily:"REM,sans-serif",fontWeight:600,fontSize:size,color,
    letterSpacing:"-0.02em",lineHeight:1,fontVariantNumeric:"tabular-nums"}}>{value}</div>;
};

/* ââ bear case reveal ââ */
const BearReveal = ({scenario,data})=>{
  const [shown,setShown]=useState(false);
  const [visible,setVisible]=useState(false);
  useEffect(()=>{
    if(scenario==="bear"&&!shown){setShown(true);setVisible(true);const t=setTimeout(()=>setVisible(false),4000);return()=>clearTimeout(t);}
  },[scenario,shown]);
  if(!visible)return null;
  return(
    <div style={{padding:"10px 14px",borderRadius:12,marginTop:10,
      background:"rgba(251,185,49,0.08)",border:"1px solid rgba(251,185,49,0.15)",
      fontFamily:"'Noto Sans JP',sans-serif",fontSize:11,color:"#40444C",lineHeight:1.5,
      animation:"bearFade 4s ease-in-out forwards"}}>
      The bear case still returns {fmtIrr(data.ipo)} IRR post-tax. That is not a hedge, that is the floor.
    </div>
  );
};

/* ââ deal terms (50% reduced, merged) ââ */
const DealTerms = ({expanded,set})=>(
  <div style={{marginTop:12}}>
    <button onClick={()=>set(!expanded)} style={{background:"none",border:"none",cursor:"pointer",
      fontFamily:"'Noto Sans JP',sans-serif",fontSize:11,color:"#5B616E",display:"flex",alignItems:"center",gap:4,padding:0}}>
      <span style={{transform:expanded?"rotate(90deg)":"rotate(0)",transition:"transform 0.25s cubic-bezier(0.22,1,0.36,1)",display:"inline-block",fontSize:8}}>&#9654;</span>
      Fund terms and structure
    </button>
    {expanded&&(
      <Glass level={1} style={{padding:14,borderRadius:14,marginTop:10}}>
        {[
          ["Total project","Â¥2B (50/50 debt-equity)"],
          ["Tax rate","20.42% (GK-TK pass-through)"],
          ["Fund size","USD 30M (min 6M)"],
          ["Target yield","8-11% p.a. over 5 years"],
          ["Hurdle rate","7% p.a."],
        ].map(([k,v],i)=>(
          <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",
            padding:"5px 0",borderBottom:i<4?"1px solid rgba(0,0,0,0.04)":"none"}}>
            <span style={{fontFamily:"'Noto Sans JP',sans-serif",fontSize:10,color:"#5B616E"}}>{k}</span>
            <span style={{fontFamily:"'Noto Sans JP',sans-serif",fontSize:10,color:"#25272C",fontWeight:500,fontVariantNumeric:"tabular-nums",textAlign:"right"}}>{v}</span>
          </div>
        ))}
        <div style={{fontFamily:"'Noto Sans JP',sans-serif",fontSize:9,color:"#8E8F8F",marginTop:8}}>
          Indicative. Subject to final investor agreement.
        </div>
      </Glass>
    )}
  </div>
);

/* ââ intro transition (step 15 B: precision) ââ */
const IntroTransition = ({onComplete})=>{
  const elemRefs=useRef([]); const datumRef=useRef(null);
  const resolveRef=useRef(null);
  const containerRef=useRef(null);

  useEffect(()=>{
    let cancelled=false;
    const run=async()=>{
      const elems=elemRefs.current.filter(Boolean);
      const datum=datumRef.current; const h=resolveRef.current;
      if(!h)return;
      await new Promise(r=>setTimeout(r,400));

      for(let i=0;i<elems.length;i++){
        elems[i].animate([
          {transform:"translateX(0) translateY(0) scale(1)",borderRadius:"12px"},
          {transform:`translateX(${(i%3-1)*55}px) translateY(${Math.floor(i/3)*45-20}px) scale(0.65)`,borderRadius:"4px"},
        ],{duration:350,delay:i*50,easing:EASE.smooth,fill:"forwards"});
      }
      await new Promise(r=>setTimeout(r,500));
      if(cancelled)return;

      for(const el of elems){
        el.animate([{opacity:1},{transform:"translateX(0) translateY(0) scale(0.1)",opacity:0}],
          {duration:300,easing:EASE.gentle,fill:"forwards"});
      }
      if(datum){
        await datum.animate([{opacity:0,transform:"translate(-50%,-50%) scale(0)"},{opacity:1,transform:"translate(-50%,-50%) scale(1)"}],
          {duration:250,easing:EASE.spring,fill:"forwards"}).finished;
        await new Promise(r=>setTimeout(r,150));
        datum.animate([{opacity:1,transform:"translate(-50%,-50%) scale(1)"},{opacity:0,transform:"translate(-50%,-50%) scale(3)"}],
          {duration:350,easing:EASE.gentle,fill:"forwards"});
      }
      await new Promise(r=>setTimeout(r,350));
      if(cancelled)return;

      await h.animate([{opacity:0,transform:"translateY(12px)"},{opacity:1,transform:"translateY(0)"}],
        {duration:450,easing:EASE.settle,fill:"forwards"}).finished;
      await new Promise(r=>setTimeout(r,1100));
      if(cancelled)return;

      if(containerRef.current){
        await containerRef.current.animate([{opacity:1},{opacity:0}],
          {duration:350,easing:EASE.gentle,fill:"forwards"}).finished;
      }
      if(!cancelled)onComplete();
    };
    run();
    return()=>{cancelled=true;};
  },[onComplete]);

  return(
    <div ref={containerRef} style={{position:"absolute",inset:0,zIndex:50}}>
      <MeshGradient warm={true}/><NoiseGrain opacity={0.035} id="nIn"/>
      <div style={{position:"relative",zIndex:5,paddingTop:80,display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
        {["Property secretary","Medical navigation","Education support","Admin support","Mental wellness","Cultural program"].map((s,i)=>(
          <div key={i} ref={el=>elemRefs.current[i]=el} style={{
            background:"rgba(255,255,255,0.70)",backdropFilter:"blur(20px) saturate(1.4)",
            border:"1px solid rgba(255,255,255,0.85)",
            boxShadow:"0 2px 12px rgba(0,0,0,0.06),inset 0 1px 0 rgba(255,255,255,0.8)",
            borderRadius:12,padding:"9px 18px",fontFamily:"'Noto Sans JP',sans-serif",fontSize:11,color:"#40444C",
          }}>{s}</div>
        ))}
      </div>
      <div ref={datumRef} style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%) scale(0)",
        width:8,height:8,borderRadius:"50%",background:"#FBB931",boxShadow:"0 0 20px rgba(251,185,49,0.5)",zIndex:10,opacity:0}}/>
      <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 32px",zIndex:20}}>
        <div style={{textAlign:"left",maxWidth:280}}>
          <div ref={resolveRef} style={{fontFamily:"REM,sans-serif",fontWeight:600,fontSize:24,color:"#25272C",letterSpacing:"-0.02em",lineHeight:1.15,opacity:0}}>The investment case.</div>
        </div>
      </div>
    </div>
  );
};

const WithIntro = ({children})=>{
  const [introPlayed,setIntroPlayed]=useState(false);
  const contentRef=useRef(null);
  const handleComplete=useCallback(()=>{
    setIntroPlayed(true);
    setTimeout(()=>{
      contentRef.current?.animate([
        {opacity:0,transform:"translateY(20px) scale(0.98)"},
        {opacity:1,transform:"translateY(0) scale(1)"},
      ],{duration:450,easing:EASE.settle,fill:"forwards"});
    },50);
  },[]);
  return(
    <div style={{position:"relative",width:"100%",height:"100%"}}>
      <MeshGradient warm={false}/><NoiseGrain opacity={0.04} id="nBs"/>
      {!introPlayed&&<IntroTransition onComplete={handleComplete}/>}
      <div ref={contentRef} style={{position:"relative",zIndex:5,opacity:introPlayed?undefined:0,height:"100%"}}>{children}</div>
    </div>
  );
};

/* ââââââââââââââââââââââââââââââââââââââââââ
   VARIANT A: THE BEACON (refined)
   Giant IRR hero. Smoother value transitions.
   ââââââââââââââââââââââââââââââââââââââââââ */
const VariantA = ()=>{
  const [scenario,setScenario]=useState("normal");
  const [year,setYear]=useState(5);
  const [expanded,setExpanded]=useState(false);
  const d=DATA[scenario][year];

  return(
    <WithIntro>
      <div style={{padding:"70px 20px 40px",overflow:"auto",height:"100%",boxSizing:"border-box"}}>
        <div style={{fontFamily:"REM,sans-serif",fontWeight:600,fontSize:17,color:"#25272C",letterSpacing:"-0.01em",marginBottom:16}}>Return projections</div>

        <div style={{marginBottom:14}}><ScenarioTabs scenario={scenario} set={setScenario}/></div>
        <div style={{marginBottom:24}}><YearSlider year={year} set={setYear}/></div>

        <Glass level={2} style={{padding:"28px 24px",borderRadius:24,marginBottom:16}}>
          <div style={{fontFamily:"'Noto Sans JP',sans-serif",fontSize:11,color:"#5B616E",marginBottom:8}}>Estimated IRR (pre-tax)</div>
          <AnimVal value={fmtIrr(d.ip)} size={56}/>
          <div style={{fontFamily:"'Noto Sans JP',sans-serif",fontSize:12,color:"#5B616E",marginTop:8,fontVariantNumeric:"tabular-nums",
            transition:"all 0.15s"}}>
            {fmtIrr(d.ipo)} post-tax
          </div>
          <div style={{marginTop:18,height:3,borderRadius:2,
            width:`${Math.min(d.ip/20*100,100)}%`,
            background:"linear-gradient(90deg,#FBB931 0%,rgba(251,185,49,0.3) 100%)",
            boxShadow:"0 0 8px rgba(251,185,49,0.2)",
            transition:"width 0.35s cubic-bezier(0.22,1,0.36,1)"}}/>
        </Glass>

        <div style={{display:"flex",gap:8,marginBottom:10}}>
          <Glass level={1} style={{flex:1,padding:"14px 16px",borderRadius:14}}>
            <div style={{fontFamily:"'Noto Sans JP',sans-serif",fontSize:10,color:"#5B616E",marginBottom:4}}>Equity multiple</div>
            <AnimVal value={fmtEm(d.ep)} size={20}/>
            <div style={{fontFamily:"'Noto Sans JP',sans-serif",fontSize:10,color:"#8E8F8F",marginTop:3,fontVariantNumeric:"tabular-nums",
              transition:"all 0.15s"}}>{fmtEm(d.epo)} post-tax</div>
          </Glass>
          <Glass level={1} style={{flex:1,padding:"14px 16px",borderRadius:14}}>
            <div style={{fontFamily:"'Noto Sans JP',sans-serif",fontSize:10,color:"#5B616E",marginBottom:4}}>Total return</div>
            <AnimVal value={fmtYen(d.rp)} size={20}/>
            <div style={{fontFamily:"'Noto Sans JP',sans-serif",fontSize:10,color:"#8E8F8F",marginTop:3,fontVariantNumeric:"tabular-nums",
              transition:"all 0.15s"}}>{fmtYen(d.rpo)} post-tax</div>
          </Glass>
        </div>

        <BearReveal scenario={scenario} data={d}/>
        <DealTerms expanded={expanded} set={setExpanded}/>
      </div>
    </WithIntro>
  );
};

/* ââââââââââââââââââââââââââââââââââââââââââ
   VARIANT C: THE LEDGER (refined)
   Clean rows. IRR highlighted. Smoother.
   ââââââââââââââââââââââââââââââââââââââââââ */
const VariantC = ()=>{
  const [scenario,setScenario]=useState("normal");
  const [year,setYear]=useState(5);
  const [expanded,setExpanded]=useState(false);
  const d=DATA[scenario][year];
  const rows=[
    {label:"Estimated IRR",pre:fmtIrr(d.ip),post:fmtIrr(d.ipo),hero:true},
    {label:"Equity multiple",pre:fmtEm(d.ep),post:fmtEm(d.epo),hero:false},
    {label:"Total return",pre:fmtYen(d.rp),post:fmtYen(d.rpo),hero:false},
  ];

  return(
    <WithIntro>
      <div style={{padding:"70px 20px 40px",overflow:"auto",height:"100%",boxSizing:"border-box"}}>
        <div style={{fontFamily:"REM,sans-serif",fontWeight:600,fontSize:17,color:"#25272C",letterSpacing:"-0.01em",marginBottom:16}}>Return projections</div>

        <div style={{marginBottom:14}}><ScenarioTabs scenario={scenario} set={setScenario}/></div>
        <div style={{marginBottom:24}}><YearSlider year={year} set={setYear}/></div>

        <Glass level={2} style={{padding:"6px 0",borderRadius:20,marginBottom:14}}>
          <div style={{display:"flex",padding:"8px 18px",borderBottom:"1px solid rgba(0,0,0,0.05)"}}>
            <div style={{flex:1,fontFamily:"'Noto Sans JP',sans-serif",fontSize:10,color:"#8E8F8F"}}>Metric</div>
            <div style={{width:80,textAlign:"right",fontFamily:"'Noto Sans JP',sans-serif",fontSize:10,color:"#8E8F8F"}}>Pre-tax</div>
            <div style={{width:80,textAlign:"right",fontFamily:"'Noto Sans JP',sans-serif",fontSize:10,color:"#8E8F8F"}}>Post-tax</div>
          </div>
          {rows.map((r,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",
              padding:r.hero?"14px 18px":"10px 18px",
              background:r.hero?"rgba(251,185,49,0.06)":"transparent",
              borderBottom:i<rows.length-1?"1px solid rgba(0,0,0,0.04)":"none",
              transition:"background 0.25s"}}>
              <div style={{flex:1,fontFamily:"'Noto Sans JP',sans-serif",fontSize:r.hero?12:11,color:"#40444C",fontWeight:r.hero?500:400}}>{r.label}</div>
              <div style={{width:80,textAlign:"right"}}>
                <AnimVal value={r.pre} size={r.hero?22:14}/>
              </div>
              <div style={{width:80,textAlign:"right",fontVariantNumeric:"tabular-nums",fontFamily:"'Noto Sans JP',sans-serif",
                fontSize:r.hero?13:11,color:"#5B616E",transition:"all 0.15s"}}>{r.post}</div>
            </div>
          ))}
        </Glass>

        <div style={{fontFamily:"'Noto Sans JP',sans-serif",fontSize:10,color:"#8E8F8F",marginBottom:10,lineHeight:1.5}}>
          Based on 1 billion yen equity in a 2 billion yen project.
        </div>

        <BearReveal scenario={scenario} data={d}/>
        <DealTerms expanded={expanded} set={setExpanded}/>
      </div>
    </WithIntro>
  );
};

/* ââ iPhone 17 Pro frame ââ */
const IPhoneFrame = ({children})=>(
  <div style={{position:"relative",width:393,height:852,borderRadius:55,overflow:"hidden",background:"#1A1A1E",
    boxShadow:"0 0 0 1px rgba(255,255,255,0.15),0 0 0 2px #1A1A1E,0 0 0 3px rgba(255,255,255,0.08)"}}>
    <div style={{position:"absolute",inset:0,borderRadius:55,border:"2.5px solid transparent",
      background:"linear-gradient(135deg,rgba(255,255,255,0.2) 0%,rgba(255,255,255,0.05) 50%,rgba(255,255,255,0.15) 100%) border-box",
      WebkitMask:"linear-gradient(#fff 0 0) padding-box,linear-gradient(#fff 0 0)",WebkitMaskComposite:"xor",maskComposite:"exclude",
      zIndex:50,pointerEvents:"none"}}/>
    <div style={{position:"absolute",top:6,left:6,right:6,bottom:6,borderRadius:49,overflow:"hidden",background:"#F9F9F9"}}>
      <div style={{position:"absolute",top:12,left:"50%",transform:"translateX(-50%)",width:126,height:37,borderRadius:20,background:"#000",zIndex:100}}/>
      <div style={{position:"absolute",inset:0}}>{children}</div>
      <div style={{position:"absolute",bottom:8,left:"50%",transform:"translateX(-50%)",width:134,height:5,borderRadius:3,background:"rgba(0,0,0,0.2)",zIndex:100}}/>
    </div>
    <div style={{position:"absolute",left:-2.5,top:180,width:3,height:32,borderRadius:"2px 0 0 2px",background:"#2A2A2E"}}/>
    <div style={{position:"absolute",left:-2.5,top:240,width:3,height:60,borderRadius:"2px 0 0 2px",background:"#2A2A2E"}}/>
    <div style={{position:"absolute",left:-2.5,top:310,width:3,height:60,borderRadius:"2px 0 0 2px",background:"#2A2A2E"}}/>
    <div style={{position:"absolute",right:-2.5,top:260,width:3,height:80,borderRadius:"0 2px 2px 0",background:"#2A2A2E"}}/>
  </div>
);

export default function Step16FinancialsV3(){
  const [variant,setVariant]=useState("A");
  const C={A:VariantA,C:VariantC}[variant];
  return(
    <div style={{minHeight:"100vh",background:"#EDEEF1",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
      padding:24,gap:24,fontFamily:"'Noto Sans JP',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=REM:wght@600&family=Noto+Sans+JP:wght@400;500;600&display=swap');
        @keyframes bearFade{0%{opacity:0;transform:translateY(8px)}10%{opacity:1;transform:translateY(0)}80%{opacity:1}100%{opacity:0}}
        ::-webkit-scrollbar{display:none} *{scrollbar-width:none}
      `}</style>
      <div style={{display:"flex",gap:8}}>
        {VARIANTS.map(v=>(
          <button key={v.id} onClick={()=>setVariant(v.id)} style={{
            padding:"8px 16px",borderRadius:20,border:"none",cursor:"pointer",
            fontSize:12,fontWeight:500,fontFamily:"'Noto Sans JP',sans-serif",
            background:variant===v.id?"#FBB931":"rgba(0,0,0,0.06)",
            color:variant===v.id?"#1A1A1E":"#5B616E",transition:"all 0.2s",
          }}>{v.label}</button>
        ))}
      </div>
      <IPhoneFrame key={variant}><C/></IPhoneFrame>
    </div>
  );
}

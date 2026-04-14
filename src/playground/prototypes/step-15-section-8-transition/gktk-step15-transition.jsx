import { useState, useRef, useCallback } from "react";

const EASE = {
  gentle:"cubic-bezier(0.23,0.86,0.39,0.96)",
  settle:"cubic-bezier(0.22,1,0.36,1)",
  smooth:"cubic-bezier(0.25,0.46,0.45,0.94)",
  spring:"cubic-bezier(0.34,1.56,0.64,1)",
};

const NoiseGrain = ({opacity=0.035,id="ng"})=>(
  <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",mixBlendMode:"overlay",opacity,zIndex:90}}>
    <filter id={id}><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch"/></filter>
    <rect width="100%" height="100%" filter={`url(#${id})`}/>
  </svg>
);

const MeshGradient = ({warm=false})=>(
  <div style={{position:"absolute",inset:0,zIndex:0,
    background:warm
      ?`radial-gradient(ellipse 80% 60% at 30% 70%,rgba(255,251,236,0.6) 0%,transparent 60%),radial-gradient(ellipse 60% 50% at 70% 40%,rgba(251,185,49,0.08) 0%,transparent 50%),radial-gradient(ellipse 90% 70% at 50% 50%,rgba(254,242,201,0.3) 0%,transparent 70%),#F9F9F9`
      :`radial-gradient(ellipse 80% 60% at 30% 30%,rgba(237,238,241,0.5) 0%,transparent 60%),radial-gradient(ellipse 60% 50% at 70% 60%,rgba(220,222,228,0.3) 0%,transparent 50%),linear-gradient(135deg,#EDEEF1 0%,#F9F9F9 50%)`,
  }}/>
);

export default function Step15TransitionV4(){
  const headingRef=useRef(null);
  const elemRefs=useRef([]);
  const datumRef=useRef(null);
  const [phase,setPhase]=useState("ready");
  const [showTap,setShowTap]=useState(false);
  const running=useRef(false);

  const play=useCallback(async()=>{
    if(running.current)return; running.current=true; setPhase("playing");
    const elems=elemRefs.current.filter(Boolean);
    const datum=datumRef.current;
    const h=headingRef.current;

    // Beat 1: snap to grid
    for(let i=0;i<elems.length;i++){
      elems[i].animate([
        {transform:"translateX(0) translateY(0) scale(1)",borderRadius:"12px"},
        {transform:`translateX(${(i%3-1)*60}px) translateY(${Math.floor(i/3)*50-25}px) scale(0.7)`,borderRadius:"4px"},
      ],{duration:400,delay:i*60,easing:EASE.smooth,fill:"forwards"});
    }
    await new Promise(r=>setTimeout(r,600));

    // Beat 2: compress to center
    for(const el of elems){
      el.animate([{opacity:1},{transform:"translateX(0) translateY(0) scale(0.1)",opacity:0}],
        {duration:350,easing:EASE.gentle,fill:"forwards"});
    }
    if(datum){
      await datum.animate([{opacity:0,transform:"translate(-50%,-50%) scale(0)"},{opacity:1,transform:"translate(-50%,-50%) scale(1)"}],
        {duration:300,easing:EASE.spring,fill:"forwards"}).finished;
      await new Promise(r=>setTimeout(r,200));
      datum.animate([{opacity:1,transform:"translate(-50%,-50%) scale(1)"},{opacity:0,transform:"translate(-50%,-50%) scale(3)"}],
        {duration:400,easing:EASE.gentle,fill:"forwards"});
    }
    await new Promise(r=>setTimeout(r,400));

    // Beat 3: resolve text
    if(h){
      await h.animate([{opacity:0,transform:"translateY(12px)"},{opacity:1,transform:"translateY(0)"}],
        {duration:500,easing:EASE.settle,fill:"forwards"}).finished;
    }
    await new Promise(r=>setTimeout(r,600));
    setShowTap(true);
  },[]);

  const reset=()=>{
    running.current=false;setPhase("ready");setShowTap(false);
    [...elemRefs.current,datumRef.current,headingRef.current].forEach(r=>r?.getAnimations().forEach(a=>a.cancel()));
  };

  return(
    <div style={{minHeight:"100vh",background:"#0A0A0C",display:"flex",flexDirection:"column",alignItems:"center",
      paddingTop:32,paddingBottom:48,fontFamily:"'Noto Sans JP',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=REM:wght@600&family=Noto+Sans+JP:wght@400;500;600&display=swap');
        @keyframes tapPulse{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.5)}}
      `}</style>
      <div style={{color:"#5B616E",fontSize:13,fontWeight:500,marginBottom:4}}>step-15-section-8-transition</div>
      <div style={{color:"#8E8F8F",fontSize:11,marginBottom:20}}>B: the precision (locked)</div>

      {/* iPhone 17 Pro */}
      <div style={{position:"relative",width:393,height:852,borderRadius:55,overflow:"hidden",background:"#1A1A1E",
        boxShadow:"0 0 0 1px rgba(255,255,255,0.15),0 0 0 2px #1A1A1E,0 0 0 3px rgba(255,255,255,0.08)"}}>
        <div style={{position:"absolute",inset:0,borderRadius:55,border:"2.5px solid transparent",
          background:"linear-gradient(135deg,rgba(255,255,255,0.2) 0%,rgba(255,255,255,0.05) 50%,rgba(255,255,255,0.15) 100%) border-box",
          WebkitMask:"linear-gradient(#fff 0 0) padding-box,linear-gradient(#fff 0 0)",WebkitMaskComposite:"xor",maskComposite:"exclude",
          zIndex:50,pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:6,left:6,right:6,bottom:6,borderRadius:49,overflow:"hidden",background:"#F9F9F9"}}>
          <div style={{position:"absolute",top:12,left:"50%",transform:"translateX(-50%)",width:126,height:37,borderRadius:20,background:"#000",zIndex:100}}/>

          {/* content */}
          <div style={{position:"absolute",inset:0}} onClick={phase==="ready"?play:reset}>
            <MeshGradient warm={phase==="ready"}/>
            <NoiseGrain opacity={0.035} id="nB"/>

            {/* software ghost elements */}
            <div style={{position:"relative",zIndex:5,paddingTop:80,display:"flex",flexDirection:"column",alignItems:"center",gap:10}}>
              {["Property secretary","Medical navigation","Education support","Admin support","Mental wellness","Cultural program"].map((s,i)=>(
                <div key={i} ref={el=>elemRefs.current[i]=el} style={{
                  background:"rgba(255,255,255,0.70)",backdropFilter:"blur(20px) saturate(1.4)",border:"1px solid rgba(255,255,255,0.85)",
                  boxShadow:"0 2px 12px rgba(0,0,0,0.06),inset 0 1px 0 rgba(255,255,255,0.8)",
                  borderRadius:12,padding:"10px 20px",fontFamily:"'Noto Sans JP',sans-serif",fontSize:11,color:"#40444C",
                }}>{s}</div>
              ))}
            </div>

            {/* datum point */}
            <div ref={datumRef} style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%) scale(0)",
              width:8,height:8,borderRadius:"50%",background:"#FBB931",boxShadow:"0 0 20px rgba(251,185,49,0.5)",zIndex:10,opacity:0}}/>

            {/* resolve */}
            <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 32px",zIndex:20,pointerEvents:phase==="playing"?"auto":"none"}}>
              <div ref={headingRef} style={{fontFamily:"REM,sans-serif",fontWeight:600,fontSize:24,color:"#25272C",letterSpacing:"-0.02em",lineHeight:1.15,opacity:0,textAlign:"left",maxWidth:280}}>
                The investment case.
              </div>
            </div>

            {/* tap indicator */}
            <div style={{position:"absolute",bottom:32,left:"50%",transform:"translateX(-50%)",zIndex:30,opacity:showTap?1:0,transition:"opacity 0.4s",display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
              <div style={{fontFamily:"'Noto Sans JP',sans-serif",fontSize:11,color:"#8E8F8F",letterSpacing:"0.015em"}}>Tap to continue</div>
              <div style={{width:4,height:4,borderRadius:"50%",background:"#FBB931",boxShadow:"0 0 8px rgba(251,185,49,0.4)",animation:"tapPulse 2s ease-in-out infinite"}}/>
            </div>

            {phase==="ready"&&<div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:25}}>
              <div style={{fontFamily:"'Noto Sans JP',sans-serif",fontSize:12,color:"#8E8F8F"}}>Tap to play transition</div></div>}
          </div>

          <div style={{position:"absolute",bottom:8,left:"50%",transform:"translateX(-50%)",width:134,height:5,borderRadius:3,background:"rgba(0,0,0,0.2)",zIndex:100}}/>
        </div>
        <div style={{position:"absolute",left:-2.5,top:180,width:3,height:32,borderRadius:"2px 0 0 2px",background:"#2A2A2E"}}/>
        <div style={{position:"absolute",left:-2.5,top:240,width:3,height:60,borderRadius:"2px 0 0 2px",background:"#2A2A2E"}}/>
        <div style={{position:"absolute",left:-2.5,top:310,width:3,height:60,borderRadius:"2px 0 0 2px",background:"#2A2A2E"}}/>
        <div style={{position:"absolute",right:-2.5,top:260,width:3,height:80,borderRadius:"0 2px 2px 0",background:"#2A2A2E"}}/>
      </div>

      <div style={{color:"#5B616E",fontSize:11,marginTop:20,textAlign:"center",maxWidth:300,lineHeight:1.5}}>
        Tap the screen to play. Tap again to reset.
      </div>
    </div>
  );
}

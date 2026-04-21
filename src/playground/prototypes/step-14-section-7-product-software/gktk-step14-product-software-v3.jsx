import { useState, useEffect, useRef } from "react";

// ─── constants ──────────────────────────────────────────────────────
const AMBER = "#FBB931";
const BG = "#F9F9F9";
const N950 = "#25272C";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const N900 = "#383A42";
const N800 = "#40444C";
const N600 = "#5B616E";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const N200 = "#D8DBDF";
const N100 = "#EDEEF1";

const variants = [
  { id: "A", label: "The lock screen" },
  { id: "B", label: "The thread" },
];

// ─── notification data ──────────────────────────────────────────────
const YEAR_1 = {
  label: "Year 1", sub: "Landing", tag: "Included",
  notifications: [
    { from: "Lin Wei-Chen", msg: "Your SoftBank appointment is confirmed for Thursday, 2:00 PM. I will meet you at the entrance.", time: "9:41 AM" },
    { from: "Maintenance", msg: "Delta AC unit in 4F serviced. Everything is running normally.", time: "2:15 PM" },
    { from: "MoreHarvest", msg: "Your residence guide is ready. Available in Chinese and Japanese.", time: "10:00 AM" },
  ],
};
const YEAR_2 = {
  label: "Year 2", sub: "Family", tag: "Add-on",
  notifications: [
    { from: "Medical nav", msg: "Dr. Tanaka appointment confirmed. Chinese interpreter arranged for 10:30 AM.", time: "8:20 AM" },
    { from: "Education", msg: "KIS school bus: Monday pickup at Building A, 7:45 AM. Driver is Mr. Oda.", time: "7:00 PM" },
    { from: "Community", msg: "Lunar New Year dinner at the residents lounge, January 25. RSVP open.", time: "3:30 PM" },
  ],
};
const YEAR_3 = {
  label: "Year 3+", sub: "Wellness", tag: "Premium",
  notifications: [
    { from: "Wellness", msg: "Your wellness check-in is Tuesday at 3:00 PM. Counselor Chen is available in Chinese.", time: "11:00 AM" },
    { from: "Concierge", msg: "Golf reservation confirmed. Aso Grand Vrio, Saturday 7:30 AM. Shuttle arranged.", time: "6:45 PM" },
    { from: "Culture", msg: "New: Kumamoto pottery workshop series. 4 sessions starting March 8.", time: "9:15 AM" },
  ],
};
const ALL_YEARS = [YEAR_1, YEAR_2, YEAR_3];

// ─── shared components ──────────────────────────────────────────────
const GlassPanel = ({ children, style = {}, level = 1 }) => {
  const bg = "#F9F9F9";
  const bdr = "1px solid rgba(0,0,0,0.06)";
  const shd = level === 2
    ? "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)"
    : "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)";
  return (
    <div style={{ borderRadius: 20, overflow: "hidden", position: "relative", background: bg, border: bdr, boxShadow: shd, ...style }}>
      <div style={{ position: "relative", zIndex: 4 }}>{children}</div>
    </div>
  );
};

const MeshGradient = () => (
  <div style={{ position: "absolute", inset: 0, zIndex: 0, background: BG }} />
);

const StatusBar = () => (
  <div style={{ position: "absolute", top: 14, left: 24, right: 24, display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 30, color: N800, fontSize: 13, fontWeight: 600, fontFamily: "'Noto Sans JP', sans-serif" }}>
    <span>9:41</span>
    <span style={{ display: "flex", gap: 4, alignItems: "center" }}>
      <span style={{ fontSize: 11 }}>5G</span>
      <svg width="16" height="12" viewBox="0 0 16 12"><rect x="0" y="4" width="3" height="8" rx="0.5" fill="currentColor" /><rect x="4.5" y="2.5" width="3" height="9.5" rx="0.5" fill="currentColor" /><rect x="9" y="0.5" width="3" height="11.5" rx="0.5" fill="currentColor" /><rect x="13" y="0" width="3" height="12" rx="0.5" fill="currentColor" /></svg>
    </span>
  </div>
);

const IPhoneFrame = ({ children }) => (
  <div style={{ width: 393, height: 852, borderRadius: 55, position: "relative", overflow: "hidden", background: "#1A1A1E", boxShadow: "0 0 0 1px rgba(255,255,255,0.08) inset", flexShrink: 0 }}>
    <div style={{ position: "absolute", left: -3, top: 160, width: 3, height: 32, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
    <div style={{ position: "absolute", left: -3, top: 110, width: 3, height: 24, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
    <div style={{ position: "absolute", right: -3, top: 140, width: 3, height: 50, background: "#2a2a2a", borderRadius: "0 2px 2px 0" }} />
    <div style={{ position: "absolute", inset: 0, borderRadius: 55, border: "1px solid rgba(0,0,0,0.06)", pointerEvents: "none", zIndex: 50 }} />
    <div style={{ position: "absolute", inset: 6, borderRadius: 49, overflow: "hidden", background: BG }}>
      <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 126, height: 37, background: "#000", borderRadius: 24, zIndex: 40 }} />
      {children}
    </div>
  </div>
);

// ─── smooth notification entrance (Web Animations API) ──────────────
const useNotifEntrance = (ref, visible) => {
  useEffect(() => {
    if (!ref.current || !visible) return;
    const el = ref.current;
    el.animate([
      { opacity: 0, transform: "translateY(24px) scale(0.98)" },
      { opacity: 0.4, transform: "translateY(12px) scale(0.99)", offset: 0.35 },
      { opacity: 0.85, transform: "translateY(4px) scale(0.998)", offset: 0.7 },
      { opacity: 1, transform: "translateY(0) scale(1)" },
    ], { duration: 600, easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", fill: "forwards" });
  }, [visible]);
};

// ─── smooth message entrance (Web Animations API) ───────────────────
const useMsgEntrance = (ref, visible, fromRight = false) => {
  useEffect(() => {
    if (!ref.current || !visible) return;
    const el = ref.current;
    const x = fromRight ? -12 : 12;
    el.animate([
      { opacity: 0, transform: `translateY(16px) translateX(${x}px) scale(0.96)` },
      { opacity: 0.5, transform: `translateY(6px) translateX(${x * 0.3}px) scale(0.985)`, offset: 0.4 },
      { opacity: 1, transform: "translateY(0) translateX(0) scale(1)" },
    ], { duration: 550, easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", fill: "forwards" });
  }, [visible]);
};

// ───────────────────────────────────────────────────────────────────
// INTRO SCREEN
// ───────────────────────────────────────────────────────────────────
const IntroScreen = ({ onContinue }) => (
  <div style={{ position: "absolute", inset: 0, zIndex: 10 }}>
    <MeshGradient />
    <StatusBar />
    <div style={{ position: "absolute", top: 64, left: 24, right: 24, zIndex: 10 }}>
      <h2 style={{ fontFamily: "'REM', sans-serif", fontWeight: 600, fontSize: 22, color: N950, margin: 0, lineHeight: 1.2 }}>Software-defined real estate</h2>
      <p style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 13, color: N800, margin: "10px 0 0", lineHeight: 1.6 }}>
        Taiwanese staff solve all problems, from daily logistics to language barriers. Nothing affects expected quality of life.
      </p>
    </div>
    <div style={{ position: "absolute", top: 185, left: 20, right: 20, zIndex: 10, display: "flex", flexDirection: "column", gap: 10 }}>
      {[
        { year: "Year 1", name: "Landing", tag: "Included", items: "Property secretary. Admin accompaniment. Maintenance." },
        { year: "Year 2", name: "Family", tag: "Add-on", items: "Medical navigation. Education support. Community events." },
        { year: "Year 3+", name: "Wellness", tag: "Premium", items: "Mental health. Health management. Golf, onsen, culture." },
      ].map((tier, i) => (
        <GlassPanel key={i} style={{ padding: "12px 14px", borderRadius: 12}}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontFamily: "'REM', sans-serif", fontWeight: 600, fontSize: 15, color: N950 }}>{tier.year}</span>
              <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12, color: N600 }}>{tier.name}</span>
            </div>
            <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 10, fontWeight: 500, color: N800, background: N100, borderRadius: 6, padding: "2px 7px" }}>{tier.tag}</span>
          </div>
          <p style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12, color: N800, margin: 0, lineHeight: 1.5 }}>{tier.items}</p>
        </GlassPanel>
      ))}
      <div style={{ padding: "6px 4px 0" }}>
        <p style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12, color: N600, margin: 0, lineHeight: 1.5 }}>
          The software layer keeps growing. New modules pushed without modifying buildings.
        </p>
      </div>
    </div>
    <div style={{ position: "absolute", bottom: 40, left: 24, right: 24, zIndex: 10 }}>
      <button className="step-14-cta" onClick={onContinue} style={{ width: "100%", padding: "14px 0", borderRadius: 12, border: "none", background: AMBER, color: N950, fontFamily: "'REM', sans-serif", fontSize: 16, fontWeight: 600, cursor: "pointer" }}>
        See it in action
      </button>
    </div>
  </div>
);

// ───────────────────────────────────────────────────────────────────
// NOTIFICATION CARD (shared by variant A)
// Uses Web Animations API for smooth entrance
// ───────────────────────────────────────────────────────────────────
const NotifCard = ({ from, msg, time }) => {
  const ref = useRef(null);
  useNotifEntrance(ref, true);

  return (
    <div ref={ref} style={{ opacity: 0 }}>
      <GlassPanel style={{ padding: "10px 12px", borderRadius: 12}}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
          <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 600, fontSize: 13, color: N950 }}>{from}</span>
          <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12, color: N600 }}>{time}</span>
        </div>
        <p style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12, color: N800, margin: 0, lineHeight: 1.5 }}>{msg}</p>
      </GlassPanel>
    </div>
  );
};

// ───────────────────────────────────────────────────────────────────
// YEAR HEADER (shared by variant A)
// ───────────────────────────────────────────────────────────────────
const YearHeader = ({ label, sub, tag }) => {
  const ref = useRef(null);
  useNotifEntrance(ref, true);

  return (
    <div ref={ref} style={{ opacity: 0, display: "flex", alignItems: "center", gap: 8, padding: "10px 4px 2px" }}>
      <span style={{ fontFamily: "'REM', sans-serif", fontWeight: 600, fontSize: 14, color: N950 }}>{label}</span>
      <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12, color: N600 }}>{sub}</span>
      <span style={{ marginLeft: "auto", fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12, color: N800, background: N100, borderRadius: 8, padding: "4px 8px", fontWeight: 500 }}>{tag}</span>
    </div>
  );
};

// ───────────────────────────────────────────────────────────────────
// VARIANT A: THE LOCK SCREEN
// ───────────────────────────────────────────────────────────────────
const VariantA = ({ active }) => {
  const [items, setItems] = useState([]);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!active) { setItems([]); return; }
    const flat = ALL_YEARS.flatMap((y, yi) =>
      y.notifications.map((n, ni) => ({ ...n, yearIdx: yi, yearLabel: y.label, yearSub: y.sub, tag: y.tag, key: `${yi}-${ni}` }))
    );
    let idx = 0;
    const show = () => {
      if (idx >= flat.length) return;
      setItems(prev => [...prev, flat[idx]]);
      idx++;
      timerRef.current = setTimeout(show, 1400);
    };
    timerRef.current = setTimeout(show, 700);
    return () => clearTimeout(timerRef.current);
  }, [active]);

  // build grouped list
  const grouped = [];
  let lastYi = -1;
  items.forEach(n => {
    if (n.yearIdx !== lastYi) {
      grouped.push({ type: "year", label: n.yearLabel, sub: n.yearSub, tag: n.tag, yearIdx: n.yearIdx, key: `y${n.yearIdx}` });
      lastYi = n.yearIdx;
    }
    grouped.push({ type: "notif", ...n });
  });

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 10, opacity: active ? 1 : 0, transition: "opacity 400ms" }}>
      <MeshGradient />
      <StatusBar />
      <div style={{ position: "absolute", top: 64, left: 24, right: 24, zIndex: 10 }}>
        <h2 style={{ fontFamily: "'REM', sans-serif", fontWeight: 600, fontSize: 18, color: N950, margin: 0 }}>Software-defined real estate</h2>
        <p style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12, color: N600, margin: "4px 0 0" }}>What your phone looks like as a MoreHarvest resident.</p>
      </div>
      <div style={{ position: "absolute", top: 124, left: 12, right: 12, bottom: 20, zIndex: 10, overflow: "hidden" }}>
        {grouped.map((item) => (
          <div key={item.key} style={{ marginBottom: item.type === "year" ? 4 : 8 }}>
            {item.type === "year" ? (
              <YearHeader label={item.label} sub={item.sub} tag={item.tag} />
            ) : (
              <NotifCard from={item.from} msg={item.msg} time={item.time} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ───────────────────────────────────────────────────────────────────
// CHAT BUBBLE (used by variant B)
// ───────────────────────────────────────────────────────────────────
const ChatBubbleSec = ({ text }) => {
  const ref = useRef(null);
  useMsgEntrance(ref, true, false);
  return (
    <div ref={ref} aria-live="polite" style={{ opacity: 0, maxWidth: "82%", marginRight: "auto" }}>
      <GlassPanel style={{ padding: "12px", borderRadius: "12px 12px 12px 4px" }}>
        <p style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 13, color: N800, margin: 0, lineHeight: 1.5 }}>{text}</p>
      </GlassPanel>
    </div>
  );
};

const ChatBubbleTen = ({ text }) => {
  const ref = useRef(null);
  useMsgEntrance(ref, true, true);
  return (
    <div ref={ref} aria-live="polite" style={{ opacity: 0, maxWidth: "78%", marginLeft: "auto" }}>
      <div style={{ padding: "12px", borderRadius: "12px 12px 4px 12px", background: AMBER }}>
        <p style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 13, color: N950, margin: 0, lineHeight: 1.5 }}>{text}</p>
      </div>
    </div>
  );
};

const ChatDate = ({ text }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.animate([
      { opacity: 0 },
      { opacity: 1 },
    ], { duration: 400, easing: "ease-out", fill: "forwards" });
  }, []);
  return (
    <div ref={ref} style={{ opacity: 0, textAlign: "center", padding: "8px 0 3px" }}>
      <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12, color: N600, background:"#F9F9F9", borderRadius: 8, padding: "3px 10px" }}>{text}</span>
    </div>
  );
};

// ───────────────────────────────────────────────────────────────────
// VARIANT B: THE THREAD
// ───────────────────────────────────────────────────────────────────
const VariantB = ({ active }) => {
  const [messages, setMessages] = useState([]);
  const timerRef = useRef(null);

  const chatData = [
    { type: "date", text: "Year 1 — landing" },
    { type: "sec", text: "Hi, this is Lin Wei-Chen, your property secretary. Welcome to Kumamoto." },
    { type: "sec", text: "I have confirmed your SoftBank appointment for Thursday at 2:00 PM. I will meet you at the entrance." },
    { type: "ten", text: "Thank you. The AC in 4F is making a noise." },
    { type: "sec", text: "Maintenance dispatched. Delta unit serviced, running normally now." },
    { type: "date", text: "Year 2 — family" },
    { type: "sec", text: "Dr. Tanaka can see your daughter Thursday. Chinese interpreter arranged." },
    { type: "sec", text: "KIS school bus confirmed. Monday pickup at Building A, 7:45 AM." },
    { type: "ten", text: "My wife is looking for community events." },
    { type: "sec", text: "Lunar New Year dinner at the residents lounge, January 25. I will send the RSVP link." },
    { type: "date", text: "Year 3+ — wellness" },
    { type: "sec", text: "Your wellness check-in is Tuesday at 3:00 PM. Counselor Chen speaks Chinese." },
    { type: "sec", text: "Golf reservation confirmed. Aso Grand Vrio, Saturday 7:30 AM. Shuttle arranged." },
  ];

  useEffect(() => {
    if (!active) { setMessages([]); return; }
    let idx = 0;
    const show = () => {
      if (idx >= chatData.length) return;
      setMessages(prev => [...prev, chatData[idx]]);
      idx++;
      timerRef.current = setTimeout(show, chatData[idx - 1]?.type === "date" ? 600 : 1200);
    };
    timerRef.current = setTimeout(show, 600);
    return () => clearTimeout(timerRef.current);
  }, [active]);

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 10, opacity: active ? 1 : 0, transition: "opacity 400ms" }}>
      <MeshGradient />
      <StatusBar />
      <div style={{ position: "absolute", top: 54, left: 0, right: 0, zIndex: 20, padding: "10px 16px", borderBottom: `1px solid ${N100}`, background: "rgba(249,249,249,0.85)", }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 18, background: `linear-gradient(135deg, ${AMBER} 0%, #F5A500 100%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#fff", fontWeight: 700, fontFamily: "'REM', sans-serif" }}>M</div>
          <div>
            <div style={{ fontFamily: "'REM', sans-serif", fontWeight: 600, fontSize: 15, color: N950, lineHeight: 1.2 }}>MoreHarvest</div>
            <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12, color: N600 }}>Property secretary</div>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", top: 115, left: 12, right: 12, bottom: 16, zIndex: 10, overflow: "hidden", display: "flex", flexDirection: "column", gap: 7 }}>
        {messages.map((m, i) => (
          <div key={i}>
            {m.type === "date" ? (
              <ChatDate text={m.text} />
            ) : m.type === "sec" ? (
              <ChatBubbleSec text={m.text} />
            ) : (
              <ChatBubbleTen text={m.text} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ───────────────────────────────────────────────────────────────────
// MAIN
// ───────────────────────────────────────────────────────────────────
const VARIANT_MAP = {
  A: VariantA,
  B: VariantB,
};

export default function Step14ProductSoftware({ variant } = {}) {
  const resolved = variants.find(v => v.id === variant) ? variant : "A";
  const [screen, setScreen] = useState("intro");

  useEffect(() => {
    setScreen("intro");
  }, [resolved]);

  const Variant = VARIANT_MAP[resolved];

  return (
    <div data-proto="step-14" style={{ minHeight: "100vh", background: "#EDEEF1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 16px", fontFamily: "'Noto Sans JP', sans-serif" }}>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-proto="step-14"] *,
          [data-proto="step-14"] *::before,
          [data-proto="step-14"] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
        .step-14-cta { transition: transform 120ms cubic-bezier(0.4, 0, 0.2, 1); }
        .step-14-cta:active { transform: scale(0.97); }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=REM:wght@600&family=Noto+Sans+JP:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <IPhoneFrame>
        {screen === "intro" && <IntroScreen onContinue={() => setScreen("demo")} />}
        {screen === "demo" && Variant && <Variant active={screen === "demo"} />}
      </IPhoneFrame>
    </div>
  );
}

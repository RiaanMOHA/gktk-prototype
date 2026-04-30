'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import BackButton from '@/components/shared/BackButton';
import NextButton from '@/components/shared/NextButton';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
}

const C = {
  bg: '#F9F9F9',
  amber: '#FBB931',
  n950: '#25272C',
  n800: '#40444C',
  n600: '#5B616E',
  n200: '#D8DBDF',
  n100: '#EDEEF1',
};

const PANEL_LEVEL_1 = {
  background: C.bg,
  border: '1px solid rgba(0,0,0,0.06)',
  boxShadow: '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
} as const;

const PANEL_LEVEL_2 = {
  background: C.bg,
  border: '1px solid rgba(0,0,0,0.06)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
} as const;

const EASE = {
  smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  settle: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  gentle: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
};

const THESIS =
  'Entering in 2025 is the equivalent of acquiring land in Zhubei in 2007.';

const THESIS_2 =
  'We bring what no developer brought to Hsinchu then: Moha Intel, an AI-native platform that turns every asset into a data-generating node, compounding both NOI and proprietary market intelligence across the portfolio.';

type Stat = { value: string; label: string; sub: string };
const STATS: Stat[] = [
  { value: '1.7x', label: 'Land prices since 2020', sub: 'Prefecture-wide' },
  { value: '33.3%', label: 'Annual gain, #1 in Japan', sub: 'Site 1, 2024' },
  { value: '$20B+', label: 'Combined fab investment', sub: 'JASM Fab 1 and Fab 2' },
  { value: '4T', label: 'Yen economic impact', sub: '10-year estimate' },
  { value: '44', label: 'Companies drawn', sub: 'By TSMC to Kumamoto' },
  { value: '~2x', label: 'Zhubei 5-year growth', sub: 'Hsinchu precedent' },
];

type TimelineEntry = { y: string; t: string; d: string };
const TIMELINE: TimelineEntry[] = [
  {
    y: '2024-2025',
    t: 'Fab 1 opens',
    d: 'Engineers arrive. Supply gap. No premium developer.',
  },
  {
    y: '2026-2028',
    t: 'Fab 2 operational',
    d: 'Supply chain clusters. Investment exceeds $20B.',
  },
  {
    y: '2029-2032',
    t: 'Developer competition',
    d: 'Major developers enter. Early-mover advantage locks.',
  },
  {
    y: '2033-2035',
    t: 'Exit window',
    d: 'REIT threshold. Institutional acquisition.',
  },
];

type FaqEntry = { q: string; a: string };
const FAQ: FaqEntry[] = [
  {
    q: 'What if TSMC slows down or pulls out?',
    a: '44+ companies independently committed. Ecosystem is self-sustaining. 5 to 10 year master leases protect income.',
  },
  {
    q: 'JPY volatility and rising rates?',
    a: 'All debt is local JPY, natural currency hedge. Rent escalation clauses offset rate increases.',
  },
  {
    q: 'Construction over budget or delayed?',
    a: 'Fixed-price contracts with penalty clauses. Chateau Life, 20 years Kumamoto experience. Modular construction.',
  },
  {
    q: 'How is GK-TK structure tax-efficient?',
    a: 'Profits pass through as fees, not dividends. Effective rate: 20.42% versus 30%+ standard corporate.',
  },
  {
    q: 'What stops major hotel chains?',
    a: 'Semiconductor-specific service layer. First-mover tenant relationships. Lower cost basis than hotel conversions.',
  },
  {
    q: 'What governance rights do TK investors have?',
    a: 'Veto rights on asset sales, refinancing, major capex, business plan changes. CapitaLand co-investment as firewall.',
  },
];

const EXIT_DELAY_MS = 150;
const EXIT_DURATION_MS = 350;

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const animate = (
  el: Element | null | undefined,
  keyframes: Keyframe[],
  options: KeyframeAnimationOptions
): Promise<void> => {
  if (!el) return Promise.resolve();
  return new Promise((resolve) => {
    const a = el.animate(keyframes, { fill: 'forwards', ...options });
    a.finished.then(() => resolve()).catch(() => resolve());
  });
};

function BeatShell({
  refEl,
  visible,
  children,
}: {
  refEl: React.Ref<HTMLDivElement>;
  visible: boolean;
  children: ReactNode;
}) {
  return (
    <div
      ref={refEl}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: visible ? 5 : 1,
        visibility: visible ? 'visible' : 'hidden',
        opacity: 0,
      }}
    >
      {children}
    </div>
  );
}

function BeatLabel({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 500,
        fontSize: 12,
        color: C.n600,
        letterSpacing: '0.01em',
        marginBottom: 14,
      }}
    >
      {children}
    </div>
  );
}

function Beat1Thesis() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        padding:
          'calc(68px + env(safe-area-inset-top, 0px)) 24px calc(60px + env(safe-area-inset-bottom, 0px))',
      }}
    >
      <BeatLabel>Kumamoto semiconductor corridor, 2024 to 2035</BeatLabel>
      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 600,
          fontSize: 26,
          lineHeight: 1.12,
          color: C.n950,
          letterSpacing: '-0.025em',
          margin: 0,
        }}
      >
        {THESIS}
      </h2>
    </div>
  );
}

function Beat2Stats({
  tileRefs,
}: {
  tileRefs: React.MutableRefObject<Array<HTMLDivElement | null>>;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding:
          'calc(68px + env(safe-area-inset-top, 0px)) 20px calc(60px + env(safe-area-inset-bottom, 0px))',
      }}
    >
      <BeatLabel>Key data points</BeatLabel>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 10,
        }}
      >
        {STATS.map((s, i) => (
          <div
            key={s.label}
            ref={(el) => {
              tileRefs.current[i] = el;
            }}
            style={{
              ...PANEL_LEVEL_1,
              borderRadius: 20,
              padding: '16px 14px',
              opacity: 0,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: 28,
                lineHeight: 1,
                color: C.n950,
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '-0.02em',
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 12,
                color: C.n800,
                marginTop: 8,
                lineHeight: 1.4,
              }}
            >
              {s.label}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 12,
                color: C.n600,
                marginTop: 2,
                lineHeight: 1.4,
              }}
            >
              {s.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type TlRow = {
  dot: HTMLDivElement | null;
  line: HTMLDivElement | null;
  text: HTMLDivElement | null;
};

function Beat3Timeline({
  rowRefs,
}: {
  rowRefs: React.MutableRefObject<TlRow[]>;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        padding:
          'calc(68px + env(safe-area-inset-top, 0px)) 20px calc(60px + env(safe-area-inset-bottom, 0px))',
      }}
    >
      <BeatLabel>Strategic timing</BeatLabel>
      <div
        style={{
          ...PANEL_LEVEL_1,
          borderRadius: 20,
          padding: '20px 18px',
        }}
      >
        {TIMELINE.map((t, i) => {
          const isLast = i === TIMELINE.length - 1;
          const dotSize = i === 0 ? 14 : 10;
          return (
            <div key={t.y} style={{ display: 'flex', gap: 14 }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flexShrink: 0,
                  width: 20,
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: dotSize,
                    height: dotSize,
                    flexShrink: 0,
                  }}
                >
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 9999,
                      border: `2px solid ${C.n200}`,
                      opacity: 0.35,
                    }}
                  />
                  <div
                    ref={(el) => {
                      if (!rowRefs.current[i])
                        rowRefs.current[i] = { dot: null, line: null, text: null };
                      rowRefs.current[i].dot = el;
                    }}
                    aria-hidden
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 9999,
                      background: C.amber,
                      transform: 'scale(0)',
                    }}
                  />
                </div>
                {!isLast && (
                  <div
                    style={{
                      width: 2,
                      flex: 1,
                      marginTop: 4,
                      position: 'relative',
                      borderRadius: 1,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      aria-hidden
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: C.n200,
                        opacity: 0.2,
                      }}
                    />
                    <div
                      ref={(el) => {
                        if (!rowRefs.current[i])
                          rowRefs.current[i] = {
                            dot: null,
                            line: null,
                            text: null,
                          };
                        rowRefs.current[i].line = el;
                      }}
                      aria-hidden
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: C.amber,
                        transformOrigin: 'top',
                        transform: 'scaleY(0)',
                      }}
                    />
                  </div>
                )}
              </div>
              <div
                ref={(el) => {
                  if (!rowRefs.current[i])
                    rowRefs.current[i] = { dot: null, line: null, text: null };
                  rowRefs.current[i].text = el;
                }}
                style={{
                  paddingBottom: isLast ? 0 : 20,
                  opacity: 0,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 500,
                    fontSize: 12,
                    color: C.n600,
                  }}
                >
                  {t.y}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600,
                    fontSize: 16,
                    lineHeight: 1.25,
                    color: C.n950,
                    marginTop: 3,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {t.t}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 13,
                    lineHeight: 1.55,
                    color: C.n800,
                    marginTop: 3,
                  }}
                >
                  {t.d}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Beat4MohaIntel() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding:
          'calc(68px + env(safe-area-inset-top, 0px)) 20px calc(60px + env(safe-area-inset-bottom, 0px))',
      }}
    >
      <div
        style={{
          ...PANEL_LEVEL_2,
          borderRadius: 28,
          padding: '28px 22px',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            fontSize: 18,
            lineHeight: 1.25,
            color: C.n950,
            marginBottom: 10,
            letterSpacing: '-0.01em',
          }}
        >
          Moha Intel
        </div>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            lineHeight: 1.65,
            color: C.n800,
            margin: 0,
          }}
        >
          {THESIS_2}
        </p>
      </div>
    </div>
  );
}

function Beat5Faq({
  openIdx,
  setOpenIdx,
}: {
  openIdx: number;
  setOpenIdx: (n: number) => void;
}) {
  return (
    <div
      className="step-18-faq-scroll"
      style={{
        position: 'absolute',
        inset: 0,
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'contain',
        scrollbarWidth: 'none',
      }}
    >
      <style>{`.step-18-faq-scroll::-webkit-scrollbar{display:none;}`}</style>
      <div
        style={{
          padding:
            'calc(64px + env(safe-area-inset-top, 0px)) 20px calc(56px + 28px + env(safe-area-inset-bottom, 0px))',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <BeatLabel>Risk factors</BeatLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {FAQ.map((f, i) => {
            const open = openIdx === i;
            const toggle = () => setOpenIdx(open ? -1 : i);
            return (
              <div
                key={f.q}
                role="button"
                tabIndex={0}
                aria-expanded={open}
                aria-label={f.q}
                onClick={(e) => {
                  e.stopPropagation();
                  toggle();
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    toggle();
                  }
                }}
                style={{
                  ...PANEL_LEVEL_1,
                  borderRadius: 20,
                  padding: '12px 14px',
                  cursor: 'pointer',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 8,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 500,
                        fontSize: 13,
                        lineHeight: 1.35,
                        color: C.n950,
                      }}
                    >
                      {f.q}
                    </div>
                    <div
                      style={{
                        maxHeight: open ? 200 : 0,
                        overflow: 'hidden',
                        transition: `max-height 300ms ${EASE.smooth}, opacity 300ms ${EASE.smooth}`,
                        opacity: open ? 1 : 0,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 12,
                          lineHeight: 1.55,
                          color: C.n800,
                          marginTop: 8,
                        }}
                      >
                        {f.a}
                      </div>
                    </div>
                  </div>
                  <div
                    aria-hidden
                    style={{
                      fontSize: 14,
                      color: C.n600,
                      flexShrink: 0,
                      transform: open ? 'rotate(180deg)' : 'rotate(0)',
                      transition: `transform 300ms ${EASE.smooth}`,
                      lineHeight: 1,
                    }}
                  >
                    ▾
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Step18Section9RiskFactors({
  isActive,
  onComplete,
}: StepProps) {
  const [beat, setBeat] = useState(0);
  const [openFaq, setOpenFaq] = useState(-1);
  const [exiting, setExiting] = useState(false);

  const busy = useRef(false);
  const beatRefs = useRef<Array<HTMLDivElement | null>>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const tileRefs = useRef<Array<HTMLDivElement | null>>([]);
  const tlRowRefs = useRef<TlRow[]>([
    { dot: null, line: null, text: null },
    { dot: null, line: null, text: null },
    { dot: null, line: null, text: null },
    { dot: null, line: null, text: null },
  ]);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelledRef = useRef(false);

  const enterBeat = useCallback(async (n: number) => {
    if (cancelledRef.current) return;
    const target = beatRefs.current[n - 1];
    if (!target) return;

    if (reducedMotion()) {
      target.style.opacity = '1';
      target.style.transform = 'none';
      tileRefs.current.forEach((el) => {
        if (el) el.style.opacity = '1';
      });
      tlRowRefs.current.forEach((r) => {
        if (r.dot) r.dot.style.transform = 'scale(1)';
        if (r.line) r.line.style.transform = 'scaleY(1)';
        if (r.text) r.text.style.opacity = '1';
      });
      return;
    }

    if (n === 1) {
      await animate(
        target,
        [
          { opacity: 0, transform: 'scale(1.06)' },
          { opacity: 0.4, transform: 'scale(1.04)', offset: 0.4 },
          { opacity: 0.8, transform: 'scale(1.01)', offset: 0.8 },
          { opacity: 1, transform: 'scale(1)' },
        ],
        { duration: 1000, easing: EASE.settle }
      );
    } else if (n === 2) {
      await animate(
        target,
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 200, easing: EASE.smooth }
      );
      for (let i = 0; i < STATS.length; i++) {
        if (cancelledRef.current) return;
        animate(
          tileRefs.current[i],
          [
            {
              opacity: 0,
              transform: 'translateY(20px) scale(0.97)',
            },
            { opacity: 1, transform: 'translateY(0) scale(1)' },
          ],
          { duration: 400, easing: EASE.spring }
        );
        if (i < STATS.length - 1) await wait(120);
      }
      await wait(400 - 120);
    } else if (n === 3) {
      await animate(
        target,
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 200, easing: EASE.smooth }
      );
      for (let i = 0; i < TIMELINE.length; i++) {
        if (cancelledRef.current) return;
        const r = tlRowRefs.current[i];
        if (r.dot) {
          animate(
            r.dot,
            [
              { transform: 'scale(0)' },
              { transform: 'scale(1.4)', offset: 0.6 },
              { transform: 'scale(1)' },
            ],
            { duration: 350, easing: EASE.spring }
          );
        }
        if (r.text) {
          animate(
            r.text,
            [
              { opacity: 0, transform: 'translateX(-10px)' },
              { opacity: 1, transform: 'translateX(0)' },
            ],
            { duration: 350, easing: EASE.settle }
          );
        }
        await wait(300);
        if (cancelledRef.current) return;
        if (r.line) {
          await animate(
            r.line,
            [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }],
            { duration: 320, easing: EASE.settle }
          );
        }
        await wait(40);
      }
    } else if (n === 4) {
      await animate(
        target,
        [
          { opacity: 0, transform: 'translateY(20px) scale(0.97)' },
          { opacity: 1, transform: 'translateY(0) scale(1)' },
        ],
        { duration: 450, easing: EASE.spring }
      );
    } else if (n === 5) {
      await animate(
        target,
        [
          { opacity: 0, transform: 'translateY(16px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        { duration: 400, easing: EASE.spring }
      );
    }
  }, []);

  const exitBeat = useCallback(async (n: number) => {
    const target = beatRefs.current[n - 1];
    if (!target) return;
    if (reducedMotion()) {
      target.style.opacity = '0';
      return;
    }
    await animate(
      target,
      [
        { opacity: 1, transform: 'scale(1)' },
        { opacity: 0.5, transform: 'scale(0.98)', offset: 0.5 },
        { opacity: 0, transform: 'scale(0.96)' },
      ],
      { duration: 300, easing: EASE.gentle }
    );
  }, []);

  // Auto-start: when isActive flips on, run beat 1 entrance.
  useEffect(() => {
    if (!isActive) {
      cancelledRef.current = true;
      busy.current = false;
      setBeat(0);
      setOpenFaq(-1);
      setExiting(false);
      return;
    }
    cancelledRef.current = false;
    busy.current = true;
    setBeat(1);
    enterBeat(1).then(() => {
      busy.current = false;
    });
    return () => {
      cancelledRef.current = true;
    };
  }, [isActive, enterBeat]);

  const advanceBeat = useCallback(async () => {
    if (busy.current) return;
    if (beat < 1 || beat >= 5) return;
    busy.current = true;
    const current = beat;
    const next = current + 1;
    await exitBeat(current);
    if (cancelledRef.current) {
      busy.current = false;
      return;
    }
    await wait(200);
    if (cancelledRef.current) {
      busy.current = false;
      return;
    }
    setBeat(next);
    await enterBeat(next);
    busy.current = false;
  }, [beat, enterBeat, exitBeat]);

  const reverseBeat = useCallback(async () => {
    if (busy.current) return;
    if (beat <= 1) return;
    busy.current = true;
    setOpenFaq(-1);
    const current = beat;
    const prev = current - 1;
    await exitBeat(current);
    if (cancelledRef.current) {
      busy.current = false;
      return;
    }
    await wait(200);
    if (cancelledRef.current) {
      busy.current = false;
      return;
    }
    setBeat(prev);
    await enterBeat(prev);
    busy.current = false;
  }, [beat, enterBeat, exitBeat]);

  const advanceStep = useCallback(() => {
    if (exiting) return;
    if (exitTimer.current) clearTimeout(exitTimer.current);
    exitTimer.current = setTimeout(() => setExiting(true), EXIT_DELAY_MS);
  }, [exiting]);

  const onForward = useCallback(() => {
    if (beat < 5) advanceBeat();
    else advanceStep();
  }, [beat, advanceBeat, advanceStep]);

  useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(() => onComplete(), EXIT_DURATION_MS);
    return () => clearTimeout(t);
  }, [exiting, onComplete]);

  useEffect(
    () => () => {
      if (exitTimer.current) clearTimeout(exitTimer.current);
    },
    []
  );

  if (!isActive) return null;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: C.bg,
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'scale(0.97)' : 'scale(1)',
        transition: `opacity 350ms ${EASE.smooth}, transform 350ms ${EASE.smooth}`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 393,
            cursor: beat < 5 ? 'pointer' : 'default',
          }}
          role={beat < 5 ? 'button' : undefined}
          tabIndex={beat < 5 ? 0 : -1}
          aria-label={beat < 5 ? 'Tap to continue' : undefined}
          onClick={() => {
            if (beat < 5) advanceBeat();
          }}
          onKeyDown={(e) => {
            if (beat < 5 && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              advanceBeat();
            }
          }}
        >
          <BeatShell
            refEl={(el) => {
              beatRefs.current[0] = el;
            }}
            visible={beat === 1}
          >
            <Beat1Thesis />
          </BeatShell>
          <BeatShell
            refEl={(el) => {
              beatRefs.current[1] = el;
            }}
            visible={beat === 2}
          >
            <Beat2Stats tileRefs={tileRefs} />
          </BeatShell>
          <BeatShell
            refEl={(el) => {
              beatRefs.current[2] = el;
            }}
            visible={beat === 3}
          >
            <Beat3Timeline rowRefs={tlRowRefs} />
          </BeatShell>
          <BeatShell
            refEl={(el) => {
              beatRefs.current[3] = el;
            }}
            visible={beat === 4}
          >
            <Beat4MohaIntel />
          </BeatShell>
          <BeatShell
            refEl={(el) => {
              beatRefs.current[4] = el;
            }}
            visible={beat === 5}
          >
            <Beat5Faq openIdx={openFaq} setOpenIdx={setOpenFaq} />
          </BeatShell>
        </div>
      </div>

      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 'calc(51px + env(safe-area-inset-bottom, 0px))',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          zIndex: 80,
          pointerEvents: 'none',
          opacity: beat >= 1 && !exiting ? 1 : 0,
          transition: `opacity 250ms ${EASE.smooth}`,
        }}
      >
        {Array.from({ length: 5 }, (_, i) => {
          const active = i === beat - 1;
          return (
            <div
              key={i}
              style={{
                width: active ? 10 : 6,
                height: active ? 10 : 6,
                borderRadius: 9999,
                background: active ? C.amber : C.n200,
                transition: `width 200ms ${EASE.spring}, height 200ms ${EASE.spring}, background 200ms ${EASE.smooth}`,
              }}
            />
          );
        })}
      </div>

      <BackButton onClick={reverseBeat} visible={beat >= 2 && !exiting} />
      <NextButton onClick={onForward} visible={beat >= 1 && !exiting} />
    </div>
  );
}

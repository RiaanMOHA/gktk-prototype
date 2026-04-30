'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from 'react';
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
  disabled: '#8E8F8F',
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
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  sharp: 'cubic-bezier(0.4, 0, 0.2, 1)',
};

const SCENARIOS = ['bull', 'normal', 'bear'] as const;
type Scenario = (typeof SCENARIOS)[number];

const YEARS = [3, 4, 5, 6] as const;
type Year = (typeof YEARS)[number];

type Row = {
  ip: number;
  ipo: number;
  ep: number;
  epo: number;
  rp: number;
  rpo: number;
};

const DATA: Record<Scenario, Record<Year, Row>> = {
  bull: {
    3: { ip: 18.29, ipo: 14.89, ep: 1.62, epo: 1.5, rp: 1624447742, rpo: 1496935513 },
    4: { ip: 15.06, ipo: 12.31, ep: 1.7, epo: 1.56, rp: 1700303136, rpo: 1557301236 },
    5: { ip: 13.16, ipo: 10.77, ep: 1.78, epo: 1.62, rp: 1776285098, rpo: 1617767681 },
    6: { ip: 11.9, ipo: 9.76, ep: 1.85, epo: 1.68, rp: 1853120274, rpo: 1678913114 },
  },
  normal: {
    3: { ip: 14.77, ipo: 12.0, ep: 1.5, epo: 1.4, rp: 1496447742, rpo: 1395073113 },
    4: { ip: 12.15, ipo: 9.91, ep: 1.56, epo: 1.44, rp: 1556303136, rpo: 1442706036 },
    5: { ip: 10.6, ipo: 8.66, ep: 1.62, epo: 1.49, rp: 1616285098, rpo: 1490439681 },
    6: { ip: 9.57, ipo: 7.84, ep: 1.68, epo: 1.54, rp: 1677120274, rpo: 1538852314 },
  },
  bear: {
    3: { ip: 11.14, ipo: 9.03, ep: 1.37, epo: 1.29, rp: 1368447742, rpo: 1293210713 },
    4: { ip: 9.16, ipo: 7.45, ep: 1.41, epo: 1.33, rp: 1412303136, rpo: 1328110836 },
    5: { ip: 7.97, ipo: 6.5, ep: 1.46, epo: 1.36, rp: 1456285098, rpo: 1363111681 },
    6: { ip: 7.18, ipo: 5.87, ep: 1.5, epo: 1.4, rp: 1501120274, rpo: 1398791514 },
  },
};

const fmtIrr = (v: number) => `${v.toFixed(2)}%`;
const fmtEm = (v: number) => `${v.toFixed(2)}x`;
const fmtYen = (v: number) => `¥${(v / 1e9).toFixed(2)}B`;

const DEAL_ROWS: Array<[string, string]> = [
  ['Total project', '¥2B (50/50 debt-equity)'],
  ['Tax rate', '20.42% (GK-TK pass-through)'],
  ['Fund size', 'USD 30M (min 6M)'],
  ['Target yield', '8-11% p.a. over 5 years'],
  ['Hurdle rate', '7% p.a.'],
];

const EXIT_DELAY_MS = 150;
const EXIT_DURATION_MS = 350;

function reducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function ScenarioTabs({
  scenario,
  onChange,
}: {
  scenario: Scenario;
  onChange: (s: Scenario) => void;
}) {
  return (
    <div role="tablist" aria-label="Scenario" style={{ display: 'flex', gap: 6 }}>
      {SCENARIOS.map((s) => {
        const active = scenario === s;
        return (
          <button
            key={s}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(s)}
            onPointerDown={(e) => {
              e.currentTarget.style.transform = 'scale(0.97)';
            }}
            onPointerUp={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onPointerLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onPointerCancel={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            style={{
              padding: '8px 20px',
              borderRadius: 12,
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              fontWeight: 500,
              background: active ? C.bg : 'transparent',
              color: active ? C.n950 : C.disabled,
              boxShadow: active ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
              transition: `transform 120ms ${EASE.sharp}, background 250ms ${EASE.smooth}, color 250ms ${EASE.smooth}, box-shadow 250ms ${EASE.smooth}`,
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        );
      })}
    </div>
  );
}

function YearSlider({
  year,
  onChange,
}: {
  year: Year;
  onChange: (y: Year) => void;
}) {
  const idx = YEARS.indexOf(year);
  const pct = (idx / (YEARS.length - 1)) * 100;
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const resolve = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      if (rect.width <= 0) return;
      const x = (clientX - rect.left) / rect.width;
      const i = Math.max(
        0,
        Math.min(YEARS.length - 1, Math.round(x * (YEARS.length - 1)))
      );
      onChange(YEARS[i]);
    },
    [onChange]
  );

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* no-op */
    }
    resolve(e.clientX);
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    resolve(e.clientX);
  };
  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* no-op */
    }
  };

  const onKey = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (idx > 0) onChange(YEARS[idx - 1]);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (idx < YEARS.length - 1) onChange(YEARS[idx + 1]);
    } else if (e.key === 'Home') {
      e.preventDefault();
      onChange(YEARS[0]);
    } else if (e.key === 'End') {
      e.preventDefault();
      onChange(YEARS[YEARS.length - 1]);
    }
  };

  return (
    <div style={{ padding: '0 4px' }}>
      <div
        ref={trackRef}
        role="slider"
        tabIndex={0}
        aria-label="Holding period, years"
        aria-valuemin={YEARS[0]}
        aria-valuemax={YEARS[YEARS.length - 1]}
        aria-valuenow={year}
        aria-valuetext={`${year} years`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKey}
        style={{
          position: 'relative',
          height: 40,
          cursor: 'pointer',
          touchAction: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          outline: 'none',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 16,
            left: 0,
            right: 0,
            height: 4,
            borderRadius: 2,
            background: 'rgba(0,0,0,0.06)',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 16,
            left: 0,
            width: `${pct}%`,
            height: 4,
            borderRadius: 2,
            background:
              'linear-gradient(90deg, #FBB931 0%, rgba(251,185,49,0.6) 100%)',
            boxShadow: '0 0 6px rgba(251,185,49,0.2)',
            transition: `width 250ms ${EASE.smooth}`,
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 6,
            left: `${pct}%`,
            transform: 'translateX(-50%)',
            width: 24,
            height: 24,
            borderRadius: 12,
            background: C.amber,
            border: '3px solid #FEFEFE',
            boxShadow:
              '0 2px 10px rgba(251,185,49,0.4), 0 1px 3px rgba(0,0,0,0.1)',
            transition: `left 250ms ${EASE.smooth}`,
          }}
        />
        {YEARS.map((y, i) => {
          const active = year === y;
          return (
            <div
              key={y}
              aria-hidden
              style={{
                position: 'absolute',
                top: 30,
                left: `${(i / (YEARS.length - 1)) * 100}%`,
                transform: 'translateX(-50%)',
                fontFamily: 'var(--font-body)',
                fontSize: 12,
                fontWeight: active ? 600 : 400,
                color: active ? C.n950 : C.disabled,
                transition: `color 250ms ${EASE.smooth}, font-weight 250ms ${EASE.smooth}`,
              }}
            >
              {y}Y
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AnimVal({
  value,
  size,
  color = C.n950,
}: {
  value: string;
  size: number;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prev = useRef(value);
  useEffect(() => {
    if (prev.current === value) return;
    prev.current = value;
    const el = ref.current;
    if (!el || reducedMotion()) return;
    el.animate(
      [
        { opacity: 0.3, transform: 'translateY(4px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      { duration: 150, easing: EASE.sharp, fill: 'forwards' }
    );
  }, [value]);
  return (
    <div
      ref={ref}
      style={{
        fontFamily: 'var(--font-heading)',
        fontWeight: 600,
        fontSize: size,
        color,
        letterSpacing: '-0.02em',
        lineHeight: 1,
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {value}
    </div>
  );
}

function BearReveal({
  scenario,
  postIrr,
}: {
  scenario: Scenario;
  postIrr: number;
}) {
  const [shown, setShown] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scenario !== 'bear' || shown) return;
    setShown(true);
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(t);
  }, [scenario, shown]);

  useEffect(() => {
    const el = ref.current;
    if (!visible || !el) return;
    if (reducedMotion()) {
      el.style.opacity = '1';
      return;
    }
    el.animate(
      [
        { opacity: 0, transform: 'translateY(8px)', offset: 0 },
        { opacity: 1, transform: 'translateY(0)', offset: 0.1 },
        { opacity: 1, transform: 'translateY(0)', offset: 0.8 },
        { opacity: 0, transform: 'translateY(0)', offset: 1 },
      ],
      { duration: 4000, easing: 'ease-in-out', fill: 'forwards' }
    );
  }, [visible]);

  if (!visible) return null;
  return (
    <div
      ref={ref}
      role="status"
      style={{
        padding: '10px 14px',
        borderRadius: 12,
        marginTop: 10,
        background: 'rgba(251,185,49,0.08)',
        border: '1px solid rgba(251,185,49,0.15)',
        fontFamily: 'var(--font-body)',
        fontSize: 12,
        color: C.n800,
        lineHeight: 1.5,
        opacity: 0,
      }}
    >
      The bear case still returns {fmtIrr(postIrr)} IRR post-tax. That is not a
      hedge, that is the floor.
    </div>
  );
}

function DealTerms({
  expanded,
  onToggle,
}: {
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div style={{ marginTop: 12 }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        onPointerDown={(e) => {
          e.currentTarget.style.transform = 'scale(0.97)';
        }}
        onPointerUp={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
        onPointerLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
        onPointerCancel={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          fontFamily: 'var(--font-body)',
          fontSize: 12,
          color: C.n600,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          transition: `transform 120ms ${EASE.sharp}`,
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <span
          aria-hidden
          style={{
            display: 'inline-block',
            fontSize: 8,
            transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: `transform 250ms ${EASE.smooth}`,
          }}
        >
          ▶
        </span>
        Fund terms and structure
      </button>
      {expanded && (
        <div
          style={{
            ...PANEL_LEVEL_1,
            borderRadius: 14,
            padding: 14,
            marginTop: 10,
          }}
        >
          {DEAL_ROWS.map(([k, v], i) => (
            <div
              key={k}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '5px 0',
                borderBottom:
                  i < DEAL_ROWS.length - 1
                    ? '1px solid rgba(0,0,0,0.04)'
                    : 'none',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  color: C.n600,
                }}
              >
                {k}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 10,
                  color: C.n950,
                  fontWeight: 500,
                  fontVariantNumeric: 'tabular-nums',
                  textAlign: 'right',
                }}
              >
                {v}
              </span>
            </div>
          ))}
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 9,
              color: C.disabled,
              marginTop: 8,
            }}
          >
            Indicative. Subject to final investor agreement.
          </div>
        </div>
      )}
    </div>
  );
}

export default function Step16Section8Financials({
  isActive,
  onComplete,
}: StepProps) {
  const [scenario, setScenario] = useState<Scenario>('normal');
  const [year, setYear] = useState<Year>(5);
  const [expanded, setExpanded] = useState(false);
  const [exiting, setExiting] = useState(false);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const d = DATA[scenario][year];

  useEffect(() => {
    if (!isActive) {
      setScenario('normal');
      setYear(5);
      setExpanded(false);
      setExiting(false);
      return;
    }
    const el = contentRef.current;
    if (!el) return;
    if (reducedMotion()) {
      el.style.opacity = '1';
      return;
    }
    el.animate(
      [
        { opacity: 0, transform: 'translateY(20px) scale(0.98)' },
        { opacity: 1, transform: 'translateY(0) scale(1)' },
      ],
      { duration: 450, easing: EASE.smooth, fill: 'forwards' }
    );
  }, [isActive]);

  const advance = useCallback(() => {
    if (exiting) return;
    if (exitTimer.current) clearTimeout(exitTimer.current);
    exitTimer.current = setTimeout(() => setExiting(true), EXIT_DELAY_MS);
  }, [exiting]);

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

  const heroBarPct = Math.min((d.ip / 20) * 100, 100);

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
          ref={contentRef}
          style={{
            width: '100%',
            maxWidth: 393,
            padding:
              'calc(70px + env(safe-area-inset-top, 0px)) 20px calc(40px + env(safe-area-inset-bottom, 0px))',
            boxSizing: 'border-box',
            opacity: 0,
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              fontSize: 18,
              color: C.n950,
              letterSpacing: '-0.01em',
              margin: 0,
              marginBottom: 16,
              lineHeight: 1.2,
            }}
          >
            Return projections
          </h2>

          <div style={{ marginBottom: 14 }}>
            <ScenarioTabs scenario={scenario} onChange={setScenario} />
          </div>
          <div style={{ marginBottom: 24 }}>
            <YearSlider year={year} onChange={setYear} />
          </div>

          <div
            style={{
              ...PANEL_LEVEL_2,
              borderRadius: 24,
              padding: '28px 24px',
              marginBottom: 16,
            }}
          >
            <div
              role="group"
              aria-label={`Estimated IRR pre-tax: ${fmtIrr(d.ip)}. ${fmtIrr(
                d.ipo
              )} post-tax.`}
            >
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  color: C.n600,
                  marginBottom: 8,
                }}
              >
                Estimated IRR (pre-tax)
              </div>
              <AnimVal value={fmtIrr(d.ip)} size={56} />
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  color: C.n600,
                  marginTop: 8,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {fmtIrr(d.ipo)} post-tax
              </div>
            </div>
            <div
              aria-hidden
              style={{
                marginTop: 18,
                height: 3,
                borderRadius: 2,
                width: `${heroBarPct}%`,
                background:
                  'linear-gradient(90deg, #FBB931 0%, rgba(251,185,49,0.3) 100%)',
                transition: `width 350ms ${EASE.smooth}`,
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <div
              style={{
                ...PANEL_LEVEL_1,
                flex: 1,
                borderRadius: 12,
                padding: '14px 16px',
              }}
            >
              <div
                role="group"
                aria-label={`Equity multiple: ${fmtEm(d.ep)}. ${fmtEm(
                  d.epo
                )} post-tax.`}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 12,
                    color: C.n600,
                    marginBottom: 4,
                  }}
                >
                  Equity multiple
                </div>
                <AnimVal value={fmtEm(d.ep)} size={20} />
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 12,
                    color: C.disabled,
                    marginTop: 3,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {fmtEm(d.epo)} post-tax
                </div>
              </div>
            </div>
            <div
              style={{
                ...PANEL_LEVEL_1,
                flex: 1,
                borderRadius: 12,
                padding: '14px 16px',
              }}
            >
              <div
                role="group"
                aria-label={`Total return: ${fmtYen(d.rp)}. ${fmtYen(
                  d.rpo
                )} post-tax.`}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 12,
                    color: C.n600,
                    marginBottom: 4,
                  }}
                >
                  Total return
                </div>
                <AnimVal value={fmtYen(d.rp)} size={20} />
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 12,
                    color: C.disabled,
                    marginTop: 3,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {fmtYen(d.rpo)} post-tax
                </div>
              </div>
            </div>
          </div>

          <BearReveal scenario={scenario} postIrr={d.ipo} />
          <DealTerms
            expanded={expanded}
            onToggle={() => setExpanded((v) => !v)}
          />
        </div>
      </div>

      <NextButton onClick={advance} visible={!exiting} />
    </div>
  );
}

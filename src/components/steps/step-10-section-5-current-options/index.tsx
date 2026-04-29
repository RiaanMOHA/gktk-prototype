'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import NextButton from '@/components/shared/NextButton';
import BackButton from '@/components/shared/BackButton';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
  onBack?: () => void;
}

const C = {
  bg: '#F9F9F9',
  n950: '#25272C',
  n900: '#383A42',
  n800: '#40444C',
  n600: '#5B616E',
  n400: '#8B8F98',
  n200: '#D8DBDF',
  n100: '#EDEEF1',
  amber: '#FBB931',
  pBd: 'rgba(0,0,0,0.06)',
  pSh: '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
  eBd: 'rgba(0,0,0,0.06)',
  eSh: '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
};

const NAV_BOTTOM_PAD = 100;

const F = {
  h: 'var(--font-heading)',
  b: 'var(--font-body)',
};

const E = { s: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' };

const GAPS = [
  'Medical navigation',
  'Mental health support',
  'Education integration',
  'Spouse career support',
  'Operational friction',
];

const EXIT_DELAY_MS = 150;
const EXIT_DURATION_MS = 350;

function Glass({
  children,
  style,
  elev,
}: {
  children: ReactNode;
  style?: CSSProperties;
  elev?: boolean;
}) {
  const b: CSSProperties = elev
    ? { background: C.bg, border: `1px solid ${C.eBd}`, boxShadow: C.eSh }
    : { background: C.bg, border: `1px solid ${C.pBd}`, boxShadow: C.pSh };
  return (
    <div style={{ borderRadius: 20, position: 'relative', overflow: 'hidden', ...b, ...style }}>
      <div style={{ position: 'relative', zIndex: 3 }}>{children}</div>
    </div>
  );
}

function Img({
  label,
  h,
  innerRef,
  style,
}: {
  label: string;
  h: number;
  innerRef?: (el: HTMLDivElement | null) => void;
  style?: CSSProperties;
}) {
  return (
    <div
      ref={innerRef}
      style={{
        width: '100%',
        height: h,
        borderRadius: 12,
        background: C.n100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: F.b,
          fontSize: 13,
          color: C.n400,
          fontWeight: 500,
          letterSpacing: '0.01em',
        }}
      >
        {label}
      </span>
    </div>
  );
}

function an(el: HTMLElement | null, kf: Keyframe[], o: KeyframeAnimationOptions) {
  if (!el) return Promise.resolve();
  return el.animate(kf, { fill: 'forwards', ...o }).finished;
}
function w(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

function Dots({ b, t }: { b: number; t: number }) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 'calc(14px + env(safe-area-inset-bottom, 0px))',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 6,
        zIndex: 41,
      }}
    >
      {Array.from({ length: t }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === b ? 8 : 5,
            height: i === b ? 8 : 5,
            borderRadius: 9999,
            background: i === b ? C.n800 : C.n200,
            transition: `all 0.25s ${E.s}`,
          }}
        />
      ))}
    </div>
  );
}

function XMark() {
  return (
    <span
      style={{
        fontFamily: F.b,
        fontSize: 14,
        fontWeight: 600,
        color: C.n400,
        lineHeight: 1,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 20,
        height: 20,
        borderRadius: 6,
        background: C.n100,
        flexShrink: 0,
      }}
    >
      {'✕'}
    </span>
  );
}

function AmberDot({ size = 10 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 9999,
        background: C.amber,
        flexShrink: 0,
      }}
    />
  );
}

type RefMap = Record<string, HTMLElement | null>;
type RefSetter = (k: string) => (el: HTMLElement | null) => void;

async function animB0($: RefMap) {
  if ($.q) $.q.style.opacity = '0';
  await an(
    $.q,
    [
      { opacity: 0, transform: 'scale(1.03)' },
      { opacity: 1, transform: 'scale(1)' },
    ],
    { duration: 800, easing: E.s }
  );
}

async function animB1($: RefMap) {
  ['1l', '1i', '1s', '1h', '1b', '1p'].forEach((k) => {
    if ($[k]) $[k]!.style.opacity = '0';
  });
  await an($['1l'], [{ opacity: 0 }, { opacity: 1 }], { duration: 250, easing: E.s });
  await an(
    $['1i'],
    [
      { opacity: 0, transform: 'scale(0.97)' },
      { opacity: 1, transform: 'scale(1)' },
    ],
    { duration: 500, easing: E.s }
  );
  await w(100);
  await an(
    $['1s'],
    [
      { opacity: 0, transform: 'translateY(8px) scale(0.9)' },
      { opacity: 1, transform: 'translateY(0) scale(1)' },
    ],
    { duration: 500, easing: E.s }
  );
  await w(150);
  await an($['1h'], [{ opacity: 0 }, { opacity: 1 }], { duration: 300, easing: E.s });
  await an($['1b'], [{ opacity: 0 }, { opacity: 1 }], { duration: 250, easing: E.s });
  await w(250);
  await an(
    $['1p'],
    [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    { duration: 500, easing: E.s }
  );
}

async function animB2($: RefMap) {
  ['2l', '2h', '2i', '2s', '2t'].forEach((k) => {
    if ($[k]) $[k]!.style.opacity = '0';
  });
  await an($['2l'], [{ opacity: 0 }, { opacity: 1 }], { duration: 250, easing: E.s });
  await an(
    $['2h'],
    [
      { opacity: 0, transform: 'translateY(4px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    { duration: 450, easing: E.s }
  );
  await an(
    $['2i'],
    [
      { opacity: 0, transform: 'scale(0.97)' },
      { opacity: 1, transform: 'scale(1)' },
    ],
    { duration: 550, easing: E.s }
  );
  await w(100);
  await an(
    $['2s'],
    [
      { opacity: 0, transform: 'translateY(10px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    { duration: 450, easing: E.s }
  );
  await w(100);
  await an(
    $['2t'],
    [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    { duration: 500, easing: E.s }
  );
}

async function slowTransform($: RefMap, setSolved: (v: boolean) => void) {
  await an($['thOld'], [{ opacity: 1 }, { opacity: 0 }], { duration: 400, easing: E.s });
  await w(300);
  await an(
    $['thNew'],
    [
      { opacity: 0, transform: 'translateY(4px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    { duration: 600, easing: E.s }
  );
  await w(400);
  for (let i = 0; i < GAPS.length; i++) {
    void an($[`x${i}`], [{ opacity: 1 }, { opacity: 0 }], { duration: 300, easing: E.s });
    await w(200);
    await an(
      $[`a${i}`],
      [
        { opacity: 0, transform: 'scale(0.5)' },
        { opacity: 1, transform: 'scale(1)' },
      ],
      { duration: 400, easing: E.s }
    );
    await w(350);
  }
  setSolved(true);
}

function renderB0(s: RefSetter) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: 'calc(68px + env(safe-area-inset-top, 0px)) 24px calc(70px + env(safe-area-inset-bottom, 0px))',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <h1
        ref={s('q') as (el: HTMLHeadingElement | null) => void}
        style={{
          opacity: 0,
          fontFamily: F.h,
          fontSize: 32,
          fontWeight: 600,
          color: C.n950,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          margin: 0,
        }}
      >
        What are the current options?
      </h1>
    </div>
  );
}

function renderB1(s: RefSetter) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: `calc(56px + env(safe-area-inset-top, 0px)) 24px calc(${NAV_BOTTOM_PAD}px + env(safe-area-inset-bottom, 0px))`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <span
        ref={s('1l') as (el: HTMLSpanElement | null) => void}
        style={{
          opacity: 0,
          fontFamily: F.b,
          fontSize: 13,
          fontWeight: 500,
          color: C.n600,
          letterSpacing: '0.01em',
          lineHeight: 1.4,
          display: 'block',
          marginBottom: 16,
        }}
      >
        Market proof
      </span>
      <div style={{ position: 'relative', marginBottom: 40 }}>
        <Img
          label="Kusunoki apartment complex"
          h={200}
          innerRef={s('1i') as (el: HTMLDivElement | null) => void}
          style={{ opacity: 0 }}
        />
        <div
          ref={s('1s') as (el: HTMLDivElement | null) => void}
          style={{
            opacity: 0,
            position: 'absolute',
            right: 16,
            bottom: 0,
            transform: 'translateY(40%)',
          }}
        >
          <Glass elev style={{ padding: '12px 16px', borderRadius: 12, display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span
              style={{
                fontFamily: F.h,
                fontSize: 48,
                fontWeight: 600,
                color: C.n950,
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
              }}
            >
              42
            </span>
            <span
              style={{
                fontFamily: F.b,
                fontSize: 13,
                fontWeight: 500,
                color: C.n600,
                letterSpacing: '0.01em',
              }}
            >
              units
            </span>
          </Glass>
        </div>
      </div>
      <p
        ref={s('1h') as (el: HTMLParagraphElement | null) => void}
        style={{
          opacity: 0,
          fontFamily: F.h,
          fontSize: 22,
          fontWeight: 600,
          color: C.n950,
          margin: '0 0 8px',
          lineHeight: 1.25,
          letterSpacing: '-0.01em',
        }}
      >
        Fully reserved before completion.
      </p>
      <p
        ref={s('1b') as (el: HTMLParagraphElement | null) => void}
        style={{
          opacity: 0,
          fontFamily: F.b,
          fontSize: 14,
          color: C.n900,
          margin: 0,
          lineHeight: 1.6,
        }}
      >
        Kusunoki complex. Bulk-leased by JASM.
      </p>
      <div
        ref={s('1p') as (el: HTMLDivElement | null) => void}
        style={{ opacity: 0, marginTop: 24 }}
      >
        <Glass elev style={{ padding: '14px 16px' }}>
          <p
            style={{
              fontFamily: F.h,
              fontSize: 16,
              fontWeight: 600,
              color: C.n950,
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            The B2B bulk-lease model works. Demand is proven.
          </p>
        </Glass>
      </div>
    </div>
  );
}

function renderB2(s: RefSetter) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: `calc(56px + env(safe-area-inset-top, 0px)) 24px calc(${NAV_BOTTOM_PAD}px + env(safe-area-inset-bottom, 0px))`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <span
        ref={s('2l') as (el: HTMLSpanElement | null) => void}
        style={{
          opacity: 0,
          fontFamily: F.b,
          fontSize: 13,
          fontWeight: 500,
          color: C.n600,
          letterSpacing: '0.01em',
          lineHeight: 1.4,
          display: 'block',
          marginBottom: 8,
        }}
      >
        Closest competitor
      </span>
      <h2
        ref={s('2h') as (el: HTMLHeadingElement | null) => void}
        style={{
          opacity: 0,
          fontFamily: F.h,
          fontSize: 22,
          fontWeight: 600,
          color: C.n950,
          margin: '0 0 16px',
          lineHeight: 1.25,
          letterSpacing: '-0.01em',
        }}
      >
        Current options: housing without solutions
      </h2>
      <Img
        label="Formosa Hills"
        h={220}
        innerRef={s('2i') as (el: HTMLDivElement | null) => void}
        style={{ opacity: 0, marginBottom: 16 }}
      />
      <div
        ref={s('2s') as (el: HTMLDivElement | null) => void}
        style={{ opacity: 0, marginBottom: 24, display: 'flex', gap: 8 }}
      >
        <Glass elev style={{ padding: '12px 16px', flex: 1, borderRadius: 12 }}>
          <span
            style={{
              fontFamily: F.h,
              fontSize: 32,
              fontWeight: 600,
              color: C.n950,
              display: 'block',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            65
          </span>
          <span
            style={{
              fontFamily: F.b,
              fontSize: 13,
              color: C.n600,
              fontWeight: 500,
              letterSpacing: '0.01em',
            }}
          >
            units
          </span>
        </Glass>
        <Glass elev style={{ padding: '12px 16px', flex: 1, borderRadius: 12 }}>
          <span
            style={{
              fontFamily: F.h,
              fontSize: 32,
              fontWeight: 600,
              color: C.n950,
              display: 'block',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            80%
          </span>
          <span
            style={{
              fontFamily: F.b,
              fontSize: 13,
              color: C.n600,
              fontWeight: 500,
              letterSpacing: '0.01em',
            }}
          >
            Taiwanese guests
          </span>
        </Glass>
      </div>
      <div
        ref={s('2t') as (el: HTMLDivElement | null) => void}
        style={{ opacity: 0, marginTop: 'auto' }}
      >
        <Glass elev style={{ padding: '14px 16px' }}>
          <p
            style={{
              fontFamily: F.h,
              fontSize: 16,
              fontWeight: 600,
              color: C.n950,
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            Bilingual management, mail handling, meeting facilities.
          </p>
        </Glass>
      </div>
    </div>
  );
}

function TransformBeat({ solved, s }: { solved: boolean; s: RefSetter }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: `calc(56px + env(safe-area-inset-top, 0px)) 24px calc(${NAV_BOTTOM_PAD}px + env(safe-area-inset-bottom, 0px))`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ marginBottom: 14, position: 'relative' }}>
        {!solved && (
          <Img label="Formosa Hills" h={120} style={{ opacity: 0.25, filter: 'grayscale(0.6)' }} />
        )}
        {solved && <Img label="MoreHarvest residence" h={120} style={{ opacity: 1 }} />}
      </div>

      <div aria-live="polite" style={{ position: 'relative', marginBottom: 16, minHeight: 28 }}>
        <p
          ref={s('thOld') as (el: HTMLParagraphElement | null) => void}
          style={{
            fontFamily: F.b,
            fontSize: 13,
            fontWeight: 500,
            color: C.n600,
            margin: 0,
            letterSpacing: '0.01em',
            lineHeight: 1.4,
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          What they do not solve
        </p>
        <p
          ref={s('thNew') as (el: HTMLParagraphElement | null) => void}
          style={{
            opacity: 0,
            fontFamily: F.h,
            fontSize: 22,
            fontWeight: 600,
            color: C.n950,
            margin: 0,
            lineHeight: 1.25,
            letterSpacing: '-0.01em',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          MoreHarvest solves all five.
        </p>
      </div>

      <div style={{ flex: 1 }}>
        {GAPS.map((g, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '9px 0',
              borderBottom: i < 4 ? `1px solid ${C.n100}` : 'none',
              position: 'relative',
            }}
          >
            <div ref={s(`x${i}`) as (el: HTMLDivElement | null) => void} style={{ position: 'absolute', left: 0 }}>
              <XMark />
            </div>
            <div
              ref={s(`a${i}`) as (el: HTMLDivElement | null) => void}
              style={{ opacity: 0, position: 'absolute', left: 5 }}
            >
              <AmberDot size={10} />
            </div>
            <span
              ref={s(`r${i}`) as (el: HTMLSpanElement | null) => void}
              style={{
                fontFamily: F.h,
                fontSize: 16,
                fontWeight: 600,
                color: C.n950,
                marginLeft: 32,
              }}
            >
              {g}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Step10Section5CurrentOptions({ isActive, onComplete, onBack }: StepProps) {
  const [beat, setBeat] = useState(0);
  const [solved, setSolved] = useState(false);
  const [transforming, setTransforming] = useState(false);
  const [exiting, setExiting] = useState(false);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const refs = useRef<RefMap>({});
  const s: RefSetter = (k) => (el) => {
    refs.current[k] = el;
  };

  useEffect(() => {
    if (!isActive) return;
    const $ = refs.current;
    let cancelled = false;
    (async () => {
      if (cancelled) return;
      if (beat === 0) await animB0($);
      else if (beat === 1) await animB1($);
      else if (beat === 2) await animB2($);
      else if (beat === 3 && !solved) {
        GAPS.forEach((_, i) => {
          if ($[`r${i}`]) $[`r${i}`]!.style.opacity = '0';
        });
        if ($.thOld) $.thOld.style.opacity = '0';
        if (cancelled) return;
        await an($.thOld, [{ opacity: 0 }, { opacity: 1 }], { duration: 350, easing: E.s });
        await w(150);
        for (let i = 0; i < GAPS.length; i++) {
          if (cancelled) return;
          await an(
            $[`r${i}`],
            [
              { opacity: 0, transform: 'translateX(-6px)' },
              { opacity: 1, transform: 'translateX(0)' },
            ],
            { duration: 280, easing: E.s }
          );
          await w(140);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isActive, beat, solved]);

  const advance = useCallback(() => {
    if (exiting || transforming) return;
    if (beat < 3) {
      setBeat((b) => b + 1);
      return;
    }
    if (beat === 3 && !solved) {
      setTransforming(true);
      void slowTransform(refs.current, setSolved).finally(() => setTransforming(false));
      return;
    }
    if (exitTimer.current) clearTimeout(exitTimer.current);
    exitTimer.current = setTimeout(() => setExiting(true), EXIT_DELAY_MS);
  }, [beat, solved, exiting, transforming]);

  const goBack = useCallback(() => {
    if (exiting || transforming) return;
    if (beat > 0) {
      if (beat === 3) setSolved(false);
      setBeat((b) => b - 1);
      return;
    }
    onBack?.();
  }, [beat, exiting, transforming, onBack]);

  useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(() => onComplete(), EXIT_DURATION_MS);
    return () => clearTimeout(t);
  }, [exiting, onComplete]);

  useEffect(() => {
    return () => {
      if (exitTimer.current) clearTimeout(exitTimer.current);
    };
  }, []);

  if (!isActive) return null;

  return (
    <div className="relative w-full h-full" style={{ background: C.bg }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: exiting ? 0 : 1,
          transform: exiting ? 'scale(0.97)' : 'scale(1)',
          transition: `opacity ${EXIT_DURATION_MS}ms ${E.s}, transform ${EXIT_DURATION_MS}ms ${E.s}`,
        }}
      >
        <Dots b={Math.min(beat, 3)} t={4} />

        {beat === 0 && renderB0(s)}
        {beat === 1 && renderB1(s)}
        {beat === 2 && renderB2(s)}
        {beat === 3 && <TransformBeat solved={solved} s={s} />}

        <BackButton onClick={goBack} visible={!transforming} />
        <NextButton onClick={advance} visible={!transforming} />
      </div>
    </div>
  );
}

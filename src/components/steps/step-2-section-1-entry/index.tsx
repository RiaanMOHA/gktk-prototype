'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
}

const AMBER = '#FBB931';
const N = {
  950: '#25272C',
  900: '#383A42',
  800: '#40444C',
};

const HOLD_DURATION_MS = 800;
const DECAY_DURATION_MS = 400;
const EXIT_DELAY_MS = 150;
const EXIT_DURATION_MS = 350;
const RING_RADIUS = 26;
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const BARS = [
  { label: 'Serviced apartments', width: '78%', elev: 1, delay: 0 },
  { label: 'TSMC / JASM semiconductor hub', width: '92%', elev: 1, delay: 0.08 },
  { label: 'Taiwanese engineers', width: '68%', elev: 1, delay: 0.16 },
  { label: '12-15% IRR', width: '52%', elev: 2, delay: 0.24 },
];

function Logo({ id, size }: { id: string; size: number }) {
  const h = size * (24 / 56);
  return (
    <svg width={size} height={h} viewBox="0 0 56 24" fill="none">
      <path
        d="M11.4499 0.0119694C15.6113 -0.0472805 18.8225 1.72909 21.2495 5.09096C24.5588 9.67532 27.9048 14.2327 31.2296 18.8058C32.4795 20.5248 32.5275 21.4623 31.4681 22.8832C30.431 24.2744 28.131 24.409 27.0638 23.0429C25.3525 20.8525 23.7371 18.5861 22.0689 16.3612C19.9435 13.5269 17.8404 10.6743 15.6611 7.88283C14.2228 6.04046 12.2237 5.62871 10.0574 6.14771C8.0471 6.62921 6.79123 7.98483 6.03273 9.92507C5.13493 12.2227 6.2764 15.1016 8.03892 16.4186C10.0269 17.9039 12.7964 17.9332 14.8814 16.4992C15.9014 15.7976 16.5373 14.7911 16.9745 13.6657C17.2078 13.0653 17.3827 12.9502 17.7846 13.5153C18.6887 14.7862 19.5828 16.0661 20.5326 17.3017C21.0003 17.9103 21.0081 18.4106 20.5542 19.0181C18.1052 22.2963 14.8907 23.9403 10.7865 23.7367C4.09413 23.4037 -0.687161 17.2882 0.0809956 10.2449C0.601025 5.47683 4.73117 1.07584 8.72833 0.275594C9.62613 0.0959692 10.5295 -0.0424055 11.4499 0.0119694V0.0119694Z"
        fill={`url(#p0_${id})`}
      />
      <path
        d="M38.6392 10.6906C37.536 9.15947 36.4132 7.61222 35.3059 6.05372C35.1116 5.78035 35.3036 5.52947 35.4622 5.29923C37.4294 2.44923 40.0638 0.693108 43.5472 0.412984C48.5926 0.00685967 52.3175 2.17098 54.645 6.60572C57.5427 12.1272 55.6505 19.0474 50.3146 22.3118C45.3844 25.3279 38.5382 23.9134 34.9136 18.7992C31.6426 14.1841 28.281 9.63422 24.9699 5.0476C23.7738 3.39085 23.7233 2.53998 24.6742 1.21773C25.6582 -0.15064 28.0515 -0.25039 29.0618 1.09736C32.1433 5.20735 35.187 9.34584 38.2496 13.4705C38.8513 14.2808 39.4583 15.0875 40.082 15.8802C42.2 18.5731 45.8651 18.9582 48.3185 16.7543C51.0208 14.327 51.2043 10.5335 48.7404 8.0431C45.6819 4.95198 40.6306 6.01285 39.0374 10.0778C38.9631 10.2676 38.9981 10.5185 38.6392 10.691V10.6906Z"
        fill={`url(#p1_${id})`}
      />
      <defs>
        <linearGradient
          id={`p0_${id}`}
          x1="32.2182"
          y1="-2.02546e-06"
          x2="-2.35867"
          y2="4.09781"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FBB931" />
          <stop offset="1" stopColor="#FF8660" />
        </linearGradient>
        <linearGradient
          id={`p1_${id}`}
          x1="55.9996"
          y1="0.137327"
          x2="21.6733"
          y2="4.21983"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FBB931" />
          <stop offset="1" stopColor="#FF8660" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Step2Section1Entry({ isActive, onComplete }: StepProps) {
  const [progress, setProgress] = useState(0);
  const [pressing, setPressing] = useState(false);
  const [done, setDone] = useState(false);
  const [exiting, setExiting] = useState(false);
  const raf = useRef<number | null>(null);
  const startT = useRef<number | null>(null);
  const prog = useRef(0);

  const startPress = useCallback(() => {
    if (done) return;
    setPressing(true);
    startT.current = performance.now() - (prog.current / 100) * HOLD_DURATION_MS;
    const tick = (now: number) => {
      if (startT.current == null) return;
      const p = Math.min((now - startT.current) / HOLD_DURATION_MS, 1);
      prog.current = p * 100;
      setProgress(p * 100);
      if (p >= 1) {
        setDone(true);
        setTimeout(() => setExiting(true), EXIT_DELAY_MS);
        return;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [done]);

  const endPress = useCallback(() => {
    setPressing(false);
    if (raf.current) cancelAnimationFrame(raf.current);
    if (done) return;
    const sp = prog.current;
    const t0 = performance.now();
    const decay = (now: number) => {
      const p = Math.max(sp - ((now - t0) / DECAY_DURATION_MS) * sp, 0);
      prog.current = p;
      setProgress(p);
      if (p > 0.1) {
        raf.current = requestAnimationFrame(decay);
      } else {
        prog.current = 0;
        setProgress(0);
      }
    };
    raf.current = requestAnimationFrame(decay);
  }, [done]);

  useEffect(() => {
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  useEffect(() => {
    if (!exiting) return;
    const timer = setTimeout(() => onComplete(), EXIT_DURATION_MS);
    return () => clearTimeout(timer);
  }, [exiting, onComplete]);

  if (!isActive) return null;

  const dashOffset = CIRCUMFERENCE * (1 - progress / 100);

  return (
    <div data-step-2 className="relative w-full h-full" style={{ background: '#F9F9F9' }}>
      <style>{`
        [data-step-2] .entry-h1 {
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 36px;
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: ${N[950]};
          margin: 0 0 8px 0;
        }
        [data-step-2] .entry-sub {
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 400;
          color: ${N[900]};
          line-height: 1.5;
          margin: 0 0 28px 0;
        }
        [data-step-2] .glass-bar {
          padding: 8px 14px;
          border-radius: 12px;
          background: #F9F9F9;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04);
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 400;
          color: ${N[800]};
          line-height: 1.4;
        }
        [data-step-2] .glass-bar.elev2 {
          padding: 10px 16px;
          border: 1px solid rgba(0,0,0,0.08);
          box-shadow: 0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06);
          font-weight: 600;
          color: ${N[950]};
        }
        @keyframes step2BarSlideIn {
          from { opacity: 0; transform: translateX(-16px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: exiting ? 0 : 1,
          transform: exiting ? 'scale(0.97)' : 'scale(1)',
          transition:
            'opacity 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 'calc(60px + env(safe-area-inset-top, 0px))',
            left: 24,
          }}
        >
          <Logo id="step2-layers" size={48} />
        </div>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            padding: '0 24px',
            justifyContent: 'center',
          }}
        >
          <h1 className="entry-h1">
            Why Kumamoto,
            <br />
            Why Now?
          </h1>
          <p className="entry-sub">{"Japan's fastest-rising property market"}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {BARS.map((b, i) => (
              <div
                key={i}
                className={`glass-bar${b.elev === 2 ? ' elev2' : ''}`}
                style={{
                  width: b.width,
                  animation: `step2BarSlideIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${b.delay}s both`,
                }}
              >
                {b.label}
              </div>
            ))}
          </div>
        </div>

        <div
          onPointerDown={(e) => {
            e.preventDefault();
            startPress();
          }}
          onPointerUp={endPress}
          onPointerLeave={endPress}
          onPointerCancel={endPress}
          role="button"
          aria-label="Hold to enter"
          style={{
            position: 'absolute',
            bottom: 'calc(32px + env(safe-area-inset-bottom, 0px))',
            right: 24,
            width: 56,
            height: 56,
            cursor: 'pointer',
            touchAction: 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            transform: pressing ? 'scale(0.92)' : 'scale(1)',
            transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: '#F9F9F9',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: pressing
                ? '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)'
                : '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
              transition: 'box-shadow 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          />
          <svg
            style={{
              position: 'absolute',
              inset: 0,
              transform: 'rotate(-90deg)',
              pointerEvents: 'none',
            }}
            width="56"
            height="56"
          >
            <circle
              cx="28"
              cy="28"
              r={RING_RADIUS}
              fill="none"
              stroke={AMBER}
              strokeWidth="2.5"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              style={{
                transition: pressing
                  ? 'none'
                  : 'stroke-dashoffset 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            />
          </svg>
          <svg
            style={{ position: 'absolute', top: 18, left: 18, pointerEvents: 'none' }}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M7 4l6 6-6 6"
              stroke={N[950]}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

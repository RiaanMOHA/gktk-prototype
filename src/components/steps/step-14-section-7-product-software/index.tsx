'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import NextButton from '@/components/shared/NextButton';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
}

const C = {
  amber: '#FBB931',
  bg: '#F9F9F9',
  n950: '#25272C',
  n800: '#40444C',
  n600: '#5B616E',
  n100: '#EDEEF1',
};

const PANEL_LEVEL_1 = {
  background: C.bg,
  border: '1px solid rgba(0,0,0,0.06)',
  boxShadow:
    '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
};

const TIERS = [
  {
    year: 'Year 1',
    name: 'Landing',
    tag: 'Included',
    items:
      'Property secretary. Admin accompaniment. Maintenance.',
  },
  {
    year: 'Year 2',
    name: 'Family',
    tag: 'Add-on',
    items:
      'Medical navigation. Education support. Community events.',
  },
  {
    year: 'Year 3+',
    name: 'Wellness',
    tag: 'Premium',
    items:
      'Mental health. Health management. Golf, onsen, culture.',
  },
];

type ChatMessage =
  | { type: 'date'; text: string }
  | { type: 'sec'; text: string }
  | { type: 'ten'; text: string };

const CHAT: ChatMessage[] = [
  { type: 'date', text: 'Year 1 — landing' },
  {
    type: 'sec',
    text: 'Hi, this is Lin Wei-Chen, your property secretary. Welcome to Kumamoto.',
  },
  {
    type: 'sec',
    text: 'I have confirmed your SoftBank appointment for Thursday at 2:00 PM. I will meet you at the entrance.',
  },
  { type: 'ten', text: 'Thank you. The AC in 4F is making a noise.' },
  {
    type: 'sec',
    text: 'Maintenance dispatched. Delta unit serviced, running normally now.',
  },
  { type: 'date', text: 'Year 2 — family' },
  {
    type: 'sec',
    text: 'Dr. Tanaka can see your daughter Thursday. Chinese interpreter arranged.',
  },
  {
    type: 'sec',
    text: 'KIS school bus confirmed. Monday pickup at Building A, 7:45 AM.',
  },
  { type: 'ten', text: 'My wife is looking for community events.' },
  {
    type: 'sec',
    text: 'Lunar New Year dinner at the residents lounge, January 25. I will send the RSVP link.',
  },
  { type: 'date', text: 'Year 3+ — wellness' },
  {
    type: 'sec',
    text: 'Your wellness check-in is Tuesday at 3:00 PM. Counselor Chen speaks Chinese.',
  },
  {
    type: 'sec',
    text: 'Golf reservation confirmed. Aso Grand Vrio, Saturday 7:30 AM. Shuttle arranged.',
  },
];

const EASE_SETTLE = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
const EXIT_DELAY_MS = 150;
const EXIT_DURATION_MS = 350;

const useMsgEntrance = (
  ref: React.RefObject<HTMLDivElement | null>,
  fromRight: boolean
) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const x = fromRight ? -12 : 12;
    if (reduced) {
      el.style.opacity = '1';
      return;
    }
    el.animate(
      [
        {
          opacity: 0,
          transform: `translateY(16px) translateX(${x}px) scale(0.96)`,
        },
        {
          opacity: 0.5,
          transform: `translateY(6px) translateX(${x * 0.3}px) scale(0.985)`,
          offset: 0.4,
        },
        { opacity: 1, transform: 'translateY(0) translateX(0) scale(1)' },
      ],
      { duration: 550, easing: EASE_SETTLE, fill: 'forwards' }
    );
  }, [ref, fromRight]);
};

function ChatBubbleSec({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useMsgEntrance(ref, false);
  return (
    <div
      ref={ref}
      aria-live="polite"
      style={{ opacity: 0, maxWidth: '82%', marginRight: 'auto' }}
    >
      <div
        style={{
          ...PANEL_LEVEL_1,
          padding: 12,
          borderRadius: '12px 12px 12px 4px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            color: C.n800,
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}

function ChatBubbleTen({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useMsgEntrance(ref, true);
  return (
    <div
      ref={ref}
      aria-live="polite"
      style={{ opacity: 0, maxWidth: '78%', marginLeft: 'auto' }}
    >
      <div
        style={{
          padding: 12,
          borderRadius: '12px 12px 4px 12px',
          background: C.amber,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            color: C.n950,
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}

function ChatDate({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      el.style.opacity = '1';
      return;
    }
    el.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 400,
      easing: 'ease-out',
      fill: 'forwards',
    });
  }, []);
  return (
    <div
      ref={ref}
      style={{ opacity: 0, textAlign: 'center', padding: '8px 0 3px' }}
    >
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 12,
          color: C.n600,
          background: C.bg,
          borderRadius: 8,
          padding: '3px 10px',
        }}
      >
        {text}
      </span>
    </div>
  );
}

export function IntroScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: C.bg }}>
      <div
        style={{
          position: 'absolute',
          top: 'calc(56px + env(safe-area-inset-top, 0px))',
          left: 24,
          right: 24,
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            fontSize: 22,
            color: C.n950,
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          Software-defined real estate
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            color: C.n800,
            margin: '10px 0 0',
            lineHeight: 1.6,
          }}
        >
          Taiwanese staff solve all problems, from daily logistics to
          language barriers. Nothing affects expected quality of life.
        </p>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 'calc(177px + env(safe-area-inset-top, 0px))',
          left: 20,
          right: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {TIERS.map((tier, i) => (
          <div
            key={i}
            style={{
              ...PANEL_LEVEL_1,
              padding: '12px 14px',
              borderRadius: 12,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                marginBottom: 4,
              }}
            >
              <div
                style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600,
                    fontSize: 15,
                    color: C.n950,
                  }}
                >
                  {tier.year}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 12,
                    color: C.n600,
                  }}
                >
                  {tier.name}
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 10,
                  fontWeight: 500,
                  color: C.n800,
                  background: C.n100,
                  borderRadius: 6,
                  padding: '2px 7px',
                }}
              >
                {tier.tag}
              </span>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 12,
                color: C.n800,
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {tier.items}
            </p>
          </div>
        ))}
        <div style={{ padding: '6px 4px 0' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              color: C.n600,
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            The software layer keeps growing. New modules pushed without
            modifying buildings.
          </p>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 'calc(40px + env(safe-area-inset-bottom, 0px))',
          left: 24,
          right: 24,
        }}
      >
        <button
          type="button"
          onClick={onContinue}
          style={{
            width: '100%',
            padding: '14px 0',
            borderRadius: 12,
            border: 'none',
            background: C.amber,
            color: C.n950,
            fontFamily: 'var(--font-heading)',
            fontSize: 16,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'transform 120ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onPointerDown={(e) => (e.currentTarget.style.transform = 'scale(0.97)')}
          onPointerUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          onPointerLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          See it in action
        </button>
      </div>
    </div>
  );
}

function ChatHeader() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 'calc(env(safe-area-inset-top, 0px) + 8px)',
        left: 0,
        right: 0,
        zIndex: 20,
        padding: '10px 16px',
        borderBottom: `1px solid ${C.n100}`,
        background: C.bg,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img
          src="/logos-and-icons/favicon.svg"
          alt="MoreHarvest"
          style={{
            display: 'block',
            width: 36,
            height: 36,
            borderRadius: 18,
          }}
        />
        <div>
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              fontSize: 15,
              color: C.n950,
              lineHeight: 1.2,
            }}
          >
            MoreHarvest
          </div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              color: C.n600,
            }}
          >
            Property secretary
          </div>
        </div>
      </div>
    </div>
  );
}

function DemoScreen({
  active,
  onAllShown,
}: {
  active: boolean;
  onAllShown: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) {
      setMessages([]);
      return;
    }
    let idx = 0;
    const show = () => {
      if (idx >= CHAT.length) {
        onAllShown();
        return;
      }
      const next = CHAT[idx];
      setMessages((prev) => [...prev, next]);
      idx++;
      const delay = next.type === 'date' ? 600 : 1200;
      timerRef.current = setTimeout(show, delay);
    };
    timerRef.current = setTimeout(show, 600);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, onAllShown]);

  return (
    <div style={{ position: 'absolute', inset: 0, background: C.bg }}>
      <ChatHeader />
      <div
        style={{
          position: 'absolute',
          top: 'calc(env(safe-area-inset-top, 0px) + 70px)',
          left: 12,
          right: 12,
          bottom: 'calc(28px + 56px + env(safe-area-inset-bottom, 0px))',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: 7,
        }}
      >
        {messages.map((m, i) => (
          <div key={i}>
            {m.type === 'date' ? (
              <ChatDate text={m.text} />
            ) : m.type === 'sec' ? (
              <ChatBubbleSec text={m.text} />
            ) : (
              <ChatBubbleTen text={m.text} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Step14Section7ProductSoftware({
  isActive,
  onComplete,
}: StepProps) {
  const [screen, setScreen] = useState<'intro' | 'demo'>('intro');
  const [allShown, setAllShown] = useState(false);
  const [exiting, setExiting] = useState(false);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isActive) {
      setScreen('intro');
      setAllShown(false);
    }
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

  useEffect(() => {
    return () => {
      if (exitTimer.current) clearTimeout(exitTimer.current);
    };
  }, []);

  const handleAllShown = useCallback(() => setAllShown(true), []);

  if (!isActive) return null;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: C.bg,
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'scale(0.97)' : 'scale(1)',
        transition: `opacity 350ms ${EASE_SETTLE}, transform 350ms ${EASE_SETTLE}`,
      }}
    >
      {screen === 'intro' && (
        <IntroScreen onContinue={() => setScreen('demo')} />
      )}
      {screen === 'demo' && (
        <DemoScreen active={true} onAllShown={handleAllShown} />
      )}
      <NextButton
        onClick={advance}
        visible={screen === 'demo' && allShown && !exiting}
      />
    </div>
  );
}

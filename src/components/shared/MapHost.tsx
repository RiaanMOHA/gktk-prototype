'use client';

/* MapHost — a single, persistent map iframe wrapped in the descent
   3D scene structure. Owned by the orchestrator and rendered behind
   every step at z-index 0. Steps 6 and 7 read the host through
   useMapHost() and command it (toggle chromeless, run descent, etc.).

   Why this exists: previously each of step-6 and step-7 mounted its
   own iframe, so transitioning from 6→7 destroyed and reloaded the
   map (a visible blank screen). MapHost keeps the SAME iframe DOM
   node alive across the boundary. The user only ever sees one map
   load. */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

const C = {
  bg: '#F9F9F9',
  amber: '#FBB931',
};

type MapEvent =
  | { type: 'ready' }
  | { type: 'complete' }
  | { type: 'back-to-content' };

type MapHostApi = {
  isReady: boolean;
  setChromeless: (value: boolean) => void;
  runDescent: () => Promise<void>;
  resetScene: () => void;
  subscribe: (listener: (event: MapEvent) => void) => () => void;
};

const MapHostContext = createContext<MapHostApi | null>(null);

export function useMapHost(): MapHostApi | null {
  return useContext(MapHostContext);
}

const VALID_MAP_STEPS = new Set([
  'government-support',
  'corporate-investment',
  'transport-access',
]);

function buildMapUrl(): string {
  let stepId: string | null = null;
  if (typeof window !== 'undefined') {
    try {
      stepId = window.localStorage.getItem('gktk-last-map-step');
    } catch {
      stepId = null;
    }
  }
  // Always load the full step list so the iframe doesn't have to
  // reload to reach a different internal step. The bundle reads
  // ?steps= once at module load — passing all three keeps every
  // internal step navigable via postMessage if we ever need that.
  const params = new URLSearchParams({
    embed: '1',
    lang: 'en',
    steps: 'government-support,corporate-investment,transport-access',
  });
  // Persist last step for step-7 to read; the bundle itself starts
  // at step 1 (government-support) by default.
  void stepId;
  return `/playground/prototypes/step-6-section-3-map/map-prototype-v1/index.html?${params.toString()}`;
}

interface MapHostProviderProps {
  visible: boolean;
  children: ReactNode;
}

export function MapHostProvider({ visible, children }: MapHostProviderProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isReady, setIsReady] = useState(false);
  const listenersRef = useRef<Set<(event: MapEvent) => void>>(new Set());
  // Hold a stable URL across renders so React doesn't reload the
  // iframe. Only computed on first mount.
  const [mapUrl] = useState(() => buildMapUrl());

  // Listen to messages from the iframe and dispatch to subscribers.
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      const data = event.data;
      if (!data || typeof data !== 'object') return;
      if (data.type === 'gktk-map-ready') {
        setIsReady(true);
        listenersRef.current.forEach((l) => l({ type: 'ready' }));
      } else if (data.type === 'gktk-map-complete') {
        listenersRef.current.forEach((l) => l({ type: 'complete' }));
      } else if (data.type === 'gktk-map-back-to-content') {
        listenersRef.current.forEach((l) => l({ type: 'back-to-content' }));
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  const setChromeless = useCallback((value: boolean) => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;
    try {
      iframe.contentWindow.postMessage(
        { type: 'gktk-set-chromeless', value },
        '*'
      );
    } catch {
      /* swallow — iframe may not be ready yet */
    }
  }, []);

  const resetScene = useCallback(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    scene.style.transform = '';
  }, []);

  const runDescent = useCallback(async () => {
    const scene = sceneRef.current;
    if (!scene) return;
    await scene.animate(
      [
        { transform: 'rotateX(0deg) translateY(0px) translateZ(0px)', offset: 0 },
        { transform: 'rotateX(3deg) translateY(0px) translateZ(0px)', offset: 0.06 },
        { transform: 'rotateX(8deg) translateY(5px) translateZ(10px)', offset: 0.14 },
        { transform: 'rotateX(14deg) translateY(15px) translateZ(20px)', offset: 0.22 },
        { transform: 'rotateX(22deg) translateY(40px) translateZ(40px)', offset: 0.30 },
        { transform: 'rotateX(35deg) translateY(150px) translateZ(80px)', offset: 0.40 },
        { transform: 'rotateX(50deg) translateY(400px) translateZ(150px)', offset: 0.50 },
        { transform: 'rotateX(62deg) translateY(800px) translateZ(220px)', offset: 0.58 },
        { transform: 'rotateX(70deg) translateY(1300px) translateZ(280px)', offset: 0.65 },
        { transform: 'rotateX(72deg) translateY(1800px) translateZ(300px)', offset: 0.72 },
        { transform: 'rotateX(65deg) translateY(2200px) translateZ(280px)', offset: 0.78 },
        { transform: 'rotateX(50deg) translateY(2500px) translateZ(240px)', offset: 0.84 },
        { transform: 'rotateX(30deg) translateY(2700px) translateZ(180px)', offset: 0.90 },
        { transform: 'rotateX(12deg) translateY(2850px) translateZ(100px)', offset: 0.95 },
        { transform: 'rotateX(0deg) translateY(3000px) translateZ(0px)', offset: 1.0 },
      ],
      { duration: 4200, easing: 'linear', fill: 'forwards' }
    ).finished;
  }, []);

  const subscribe = useCallback(
    (listener: (event: MapEvent) => void) => {
      listenersRef.current.add(listener);
      return () => {
        listenersRef.current.delete(listener);
      };
    },
    []
  );

  const api: MapHostApi = {
    isReady,
    setChromeless,
    runDescent,
    resetScene,
    subscribe,
  };

  // Lazy random arrays for the descent layers (computed once,
  // stable across renders).
  const [streams] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      y: i * 2.5,
      isAmber: i % 5 === 0,
      o1: 5 + (i % 4) * 8,
      o2: 25 + (i % 3) * 10,
      o3: 65 + (i % 3) * 5,
      o4: 90 - (i % 4) * 3,
      o5: 10 + (i % 4) * 5,
      o6: 30 + (i % 3) * 10,
      o7: 70 + (i % 5) * 6,
    }))
  );
  const [fragments] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      isAmber: i % 3 === 0,
      left: 8 + Math.random() * 84,
      top: 5 + Math.random() * 90,
      width: 30 + Math.random() * 60,
      height: 12 + Math.random() * 24,
    }))
  );
  const [particles] = useState(() =>
    Array.from({ length: 15 }, () => ({
      left: 10 + Math.random() * 80,
      top: 10 + Math.random() * 80,
      size: 3 + Math.random() * 5,
      opacity: 0.08 + Math.random() * 0.12,
    }))
  );

  return (
    <MapHostContext.Provider value={api}>
      {visible && (
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 0,
            overflow: 'hidden',
            background: C.bg,
            perspective: '500px',
            perspectiveOrigin: '50% 25%',
          }}
        >
          <div
            ref={sceneRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '400%',
              transformStyle: 'preserve-3d',
              transformOrigin: '50% 0%',
            }}
          >
            {/* Layer 0: live iframe map */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '25%',
                transformStyle: 'preserve-3d',
                background: C.bg,
              }}
            >
              <iframe
                ref={iframeRef}
                src={mapUrl}
                title="Kumamoto map"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  border: 0,
                  display: 'block',
                }}
                allow="accelerometer; gyroscope"
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background:
                    'linear-gradient(90deg, transparent 10%, rgba(251,185,49,0.4) 30%, rgba(251,185,49,0.6) 50%, rgba(251,185,49,0.4) 70%, transparent 90%)',
                  boxShadow:
                    '0 0 20px rgba(251,185,49,0.3), 0 2px 40px rgba(251,185,49,0.15)',
                }}
              />
            </div>

            {/* Layer 1 — upper drift */}
            <div
              style={{
                position: 'absolute',
                top: '25%',
                left: 0,
                width: '100%',
                height: '25%',
                background: C.bg,
                overflow: 'hidden',
              }}
            >
              {streams.map((s, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: `${s.y}%`,
                    left: 0,
                    width: '100%',
                    height: s.isAmber ? 2 : 1,
                    background: s.isAmber
                      ? `linear-gradient(90deg, transparent ${s.o1}%, rgba(251,185,49,0.12) ${s.o2}%, rgba(251,185,49,0.2) 50%, rgba(251,185,49,0.12) ${s.o3}%, transparent ${s.o4}%)`
                      : `linear-gradient(90deg, transparent ${s.o5}%, rgba(107,114,128,0.08) ${s.o6}%, transparent ${s.o7}%)`,
                  }}
                />
              ))}
              {fragments.map((f, i) => (
                <div
                  key={`f${i}`}
                  style={{
                    position: 'absolute',
                    left: `${f.left}%`,
                    top: `${f.top}%`,
                    width: f.width,
                    height: f.height,
                    background: f.isAmber
                      ? 'rgba(251,185,49,0.06)'
                      : 'rgba(107,114,128,0.04)',
                    border: `1px solid ${
                      f.isAmber ? 'rgba(251,185,49,0.1)' : 'rgba(107,114,128,0.06)'
                    }`,
                    borderRadius: 6,
                  }}
                />
              ))}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '30%',
                  background:
                    'linear-gradient(180deg, rgba(249,249,249,0.95) 0%, transparent 100%)',
                }}
              />
            </div>

            {/* Layer 2 — deep drift */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                width: '100%',
                height: '25%',
                background: C.bg,
                overflow: 'hidden',
              }}
            >
              {particles.map((p, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: `${p.left}%`,
                    top: `${p.top}%`,
                    width: p.size,
                    height: p.size,
                    borderRadius: '50%',
                    background: C.amber,
                    opacity: p.opacity,
                  }}
                />
              ))}
            </div>

            {/* Layer 3 — bright destination */}
            <div
              style={{
                position: 'absolute',
                top: '75%',
                left: 0,
                width: '100%',
                height: '25%',
                background: C.bg,
              }}
            />
          </div>
        </div>
      )}
      {children}
    </MapHostContext.Provider>
  );
}

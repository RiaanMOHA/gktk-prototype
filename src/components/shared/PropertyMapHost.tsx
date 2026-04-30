'use client';

/* PropertyMapHost — a single, persistent map iframe for the property
   map (steps 11–12). Mirrors the role of MapHost for steps 5–7: the
   iframe is mounted by the orchestrator behind every step in the
   range so it preloads during step-11's transition and is already
   live when step-12 mounts. Step-12 reads the host through
   usePropertyMapHost() and commands it (toggle chromeless, etc.). */

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
};

type MapEvent =
  | { type: 'ready' }
  | { type: 'complete' }
  | { type: 'back-to-content' };

type PropertyMapHostApi = {
  isReady: boolean;
  setChromeless: (value: boolean) => void;
  subscribe: (listener: (event: MapEvent) => void) => () => void;
  getWrapper: () => HTMLDivElement | null;
};

const PropertyMapHostContext = createContext<PropertyMapHostApi | null>(null);

export function usePropertyMapHost(): PropertyMapHostApi | null {
  return useContext(PropertyMapHostContext);
}

// chromeless=1 starts the iframe with the sheet hidden so step 11 can
// use the opaque tilt cover without the sheet pre-revealing under it,
// and step 12's setChromeless(false) becomes the cue that plays the
// slide-up animation right when the user lands on step 12.
const MAP_URL =
  '/playground/prototypes/step-12-section-6-product-hardware/map-prototype-v1/index.html?embed=1&lang=en&steps=properties&chromeless=1&v=101';

interface PropertyMapHostProviderProps {
  visible: boolean;
  children: ReactNode;
}

export function PropertyMapHostProvider({
  visible,
  children,
}: PropertyMapHostProviderProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const listenersRef = useRef<Set<(event: MapEvent) => void>>(new Set());

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

  const subscribe = useCallback(
    (listener: (event: MapEvent) => void) => {
      listenersRef.current.add(listener);
      return () => {
        listenersRef.current.delete(listener);
      };
    },
    []
  );

  const getWrapper = useCallback(() => wrapperRef.current, []);

  const api: PropertyMapHostApi = {
    isReady,
    setChromeless,
    subscribe,
    getWrapper,
  };

  return (
    <PropertyMapHostContext.Provider value={api}>
      {visible && (
        <div
          ref={wrapperRef}
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 0,
            overflow: 'hidden',
            background: C.bg,
          }}
        >
          <iframe
            ref={iframeRef}
            src={MAP_URL}
            title="Kumamoto property map"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              border: 0,
              display: 'block',
            }}
            allow="accelerometer; gyroscope; xr-spatial-tracking"
          />
        </div>
      )}
      {children}
    </PropertyMapHostContext.Provider>
  );
}

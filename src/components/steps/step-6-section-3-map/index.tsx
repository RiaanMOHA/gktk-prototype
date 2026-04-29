'use client';

import { useEffect } from 'react';
import { useMapHost } from '../../shared/MapHost';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
  onBack?: () => void;
}

export default function Step6Section3Map({ isActive, onComplete, onBack }: StepProps) {
  const mapHost = useMapHost();

  // Step 6 shows the shared map iframe with full chrome. Forward and
  // back-to-content events are emitted by the iframe (via postMessage)
  // and dispatched to subscribers by MapHost.
  useEffect(() => {
    if (!isActive || !mapHost) return;
    mapHost.setChromeless(false);
    mapHost.resetScene();
    const unsub = mapHost.subscribe((event) => {
      if (event.type === 'complete') {
        onComplete();
      } else if (event.type === 'back-to-content') {
        onBack?.();
      }
    });
    return unsub;
  }, [isActive, mapHost, onComplete, onBack]);

  // The map itself is rendered by MapHost behind every step. Step 6
  // contributes no foreground UI — the prototype's sheet, nav arrows,
  // and 2D/3D toggle live inside the iframe.
  return null;
}

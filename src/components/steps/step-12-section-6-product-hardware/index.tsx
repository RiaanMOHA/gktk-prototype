'use client';

import { useEffect } from 'react';
import { usePropertyMapHost } from '../../shared/PropertyMapHost';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
  onBack?: () => void;
}

export default function Step12Section6ProductHardware({
  isActive,
  onComplete,
  onBack,
}: StepProps) {
  const propertyMapHost = usePropertyMapHost();

  // Step 12 shows the shared property-map iframe with full chrome.
  // Forward and back-to-content events are emitted by the iframe
  // (via postMessage) and dispatched to subscribers by
  // PropertyMapHost. Sheet presentation is driven by the iframe
  // itself (identical to step-6's pattern) — no parent timing.
  useEffect(() => {
    if (!isActive || !propertyMapHost) return;
    propertyMapHost.setChromeless(false);
    const unsub = propertyMapHost.subscribe((event) => {
      if (event.type === 'complete') {
        onComplete();
      } else if (event.type === 'back-to-content') {
        onBack?.();
      }
    });
    return unsub;
  }, [isActive, propertyMapHost, onComplete, onBack]);

  // The map itself is rendered by PropertyMapHost behind every step
  // in the 11–12 range. Step 12 contributes no foreground UI — the
  // prototype's sheet, nav arrows, and 2D/3D toggle live inside the
  // iframe.
  return null;
}

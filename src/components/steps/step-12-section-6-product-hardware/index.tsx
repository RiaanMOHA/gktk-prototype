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
  // (via postMessage) and dispatched to subscribers by PropertyMapHost.
  //
  // Sheet reveal: the iframe loads chromeless (sheet hidden) and is
  // held that way through step 11. setChromeless(false) is the cue
  // that triggers the iframe's slide-up animation, so it must fire
  // here on step-12 entry — but only once the iframe is actually
  // ready, otherwise the postMessage lands before the iframe's
  // listener is bound and the reveal never plays. Both paths handled:
  //   - persistent (11 → 12): isReady is already true, fire immediately.
  //   - fresh (direct jump to 12): wait for the ready event, then fire.
  useEffect(() => {
    if (!isActive || !propertyMapHost) return;
    if (propertyMapHost.isReady) {
      propertyMapHost.setChromeless(false);
    }
    const unsub = propertyMapHost.subscribe((event) => {
      if (event.type === 'ready') {
        propertyMapHost.setChromeless(false);
      } else if (event.type === 'complete') {
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

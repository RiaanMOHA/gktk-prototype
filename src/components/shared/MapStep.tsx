'use client';

import { useEffect } from 'react';

interface MapStepProps {
  isActive: boolean;
  onComplete: () => void;
  src: string;
  title: string;
}

export default function MapStep({ isActive, onComplete, src, title }: MapStepProps) {
  useEffect(() => {
    if (!isActive) return;
    const onMessage = (event: MessageEvent) => {
      if (event.source !== window.parent && event.origin !== window.location.origin) return;
      const data = event.data;
      if (data && typeof data === 'object' && data.type === 'gktk-map-complete') {
        onComplete();
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="relative w-full h-full bg-base-bg">
      <iframe
        src={src}
        title={title}
        className="absolute inset-0 w-full h-full border-0"
        allow="accelerometer; gyroscope; xr-spatial-tracking"
      />
    </div>
  );
}

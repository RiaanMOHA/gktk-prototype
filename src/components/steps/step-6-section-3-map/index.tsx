'use client';

import MapStep from '../../shared/MapStep';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
}

const MAP_URL =
  '/playground/prototypes/step-6-section-3-map/map-prototype-v1/index.html?embed=1&lang=en&steps=government-support,corporate-investment,transport-access,future-outlook';

export default function Step6Section3Map({ isActive, onComplete }: StepProps) {
  return (
    <MapStep
      isActive={isActive}
      onComplete={onComplete}
      src={MAP_URL}
      title="Kumamoto investment map"
    />
  );
}

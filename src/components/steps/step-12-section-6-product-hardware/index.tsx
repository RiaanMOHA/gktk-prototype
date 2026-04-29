'use client';

import MapStep from '../../shared/MapStep';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
}

const MAP_URL =
  '/playground/prototypes/step-12-section-6-product-hardware/map-prototype-v1/index.html?embed=1&lang=en&steps=properties';

export default function Step12Section6ProductHardware({ isActive, onComplete }: StepProps) {
  return (
    <MapStep
      isActive={isActive}
      onComplete={onComplete}
      src={MAP_URL}
      title="Kumamoto property map"
    />
  );
}

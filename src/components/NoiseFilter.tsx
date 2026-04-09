export function NoiseFilter() {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        overflow: "hidden",
      }}
    >
      <defs>
        <filter id="meshNoise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves={4}
            stitchTiles="stitch"
          />
        </filter>
        <filter id="surfaceNoise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.7"
            numOctaves={4}
            stitchTiles="stitch"
          />
        </filter>
      </defs>
    </svg>
  );
}

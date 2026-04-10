export interface MapStep {
  id: number;
  title: string;
  body: string;
}

export const MAP_STEPS: MapStep[] = [
  {
    id: 1,
    title: 'Government support',
    body: "Japan's 10 trillion+ yen semiconductor subsidy program, backed by METI and Kumamoto prefecture, is funding infrastructure across the corridor, including roads, water systems, and power grid expansion.",
  },
  {
    id: 2,
    title: 'Corporate investment',
    body: 'TSMC, Sony, Tokyo Electron, ASML, and 44+ supply chain companies have committed to Kumamoto. This is not a single-company bet. It is an ecosystem.',
  },
  {
    id: 3,
    title: 'Science park and grand airport',
    body: 'Kumamoto is building a dedicated science park zone and expanding its airport. The long-term vision: a self-sustaining semiconductor ecosystem, not just a factory town.',
  },
  {
    id: 4,
    title: 'Future outlook',
    body: '47,000+ new jobs. Population growth accelerating. Rental demand forecasts rising for decades. This is where the real estate opportunity begins.',
  },
];

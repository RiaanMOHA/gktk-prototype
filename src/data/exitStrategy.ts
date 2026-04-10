export interface ExitPath {
  id: number;
  title: string;
  body: string;
}

export const EXIT_PATHS: ExitPath[] = [
  {
    id: 1,
    title: 'CapitaLand REIT injection',
    body: 'Operationally stable industrial real estate is exactly what CapitaLand REITs (e.g., Ascott Residence Trust) favor. CapitaLand has a contractual right of first refusal (ROFR) with a 2 to 3% discount on market valuation baked into the deal structure. This provides a clear, pre-negotiated exit pipeline.',
  },
  {
    id: 2,
    title: 'Open market sale with master lease',
    body: 'Large real estate funds prefer assets with strong rigid industrial demand and stable operations. A master lease in place at time of sale de-risks the acquisition for buyers, supporting premium valuation.',
  },
];

export const BUILT_IN_OPTIONALITY = 'The serviced apartment design can pivot to business hotel or high-end rental apartments if semiconductor demand saturates. The physical infrastructure supports multiple use cases without structural modification.';

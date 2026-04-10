export interface RiskEvidence {
  label: string;
  stat: string;
  description: string;
  list: string[];
}

export interface RiskPanel {
  id: number;
  title: string;
  question: string;
  answer: string;
  evidence: RiskEvidence;
}

export const RISK_PANELS: RiskPanel[] = [
  {
    id: 1,
    title: 'TSMC concentration',
    question: 'What if TSMC slows down or pulls out of Kumamoto?',
    answer: 'The cluster effect. Sony, Tokyo Electron, ASML, and 44+ companies have independently committed to Kumamoto. Even if TSMC scaled back, the ecosystem is self-sustaining. Additionally, 5 to 10 year master lease structures protect rental income regardless of short-term demand fluctuations.',
    evidence: {
      label: 'Supporting evidence',
      stat: '44+',
      description: 'Companies committed to the Kumamoto corridor',
      list: ['Sony Semiconductor Solutions', 'Tokyo Electron', 'ASML Japan', 'Sumco', 'JSR Corporation', 'Renesas Electronics'],
    },
  },
  {
    id: 2,
    title: 'Interest rate and currency',
    question: 'What about JPY volatility and rising rates?',
    answer: 'All debt is local JPY financing, creating a natural currency hedge. Rent escalation clauses are built into lease agreements to offset rate increases. Investors with JPY-denominated liabilities face no conversion risk.',
    evidence: {
      label: 'Structure',
      stat: '100%',
      description: 'Local JPY debt financing',
      list: ['Natural currency hedge via local borrowing', 'Rent escalation clauses in all leases', 'No cross-currency conversion risk'],
    },
  },
  {
    id: 3,
    title: 'Construction cost and delay',
    question: 'Construction costs in Japan have been rising. What if the project goes over budget or gets delayed?',
    answer: 'MoreHarvest partners with Chateau Life, a Japanese construction partner with 20 years of experience. Fixed-price contracts with penalty clauses for delays. Modular construction techniques reduce both cost volatility and timeline risk.',
    evidence: {
      label: 'Partner track record',
      stat: '20 yrs',
      description: 'Chateau Life construction experience in Kumamoto',
      list: ['Fixed-price contracts with penalty clauses', 'Modular construction for cost control', '5 completed properties in the corridor'],
    },
  },
  {
    id: 4,
    title: 'Tax efficiency',
    question: 'How is the GK-TK structure tax-efficient?',
    answer: "The GK-TK (Godo Kaisha, Tokumei Kumiai) structure distributes profits to TK investors as 'anonymous partnership distributions,' treated as fees rather than dividends. This avoids corporate-level double taxation. The effective tax rate on distributions is 20.42%.",
    evidence: {
      label: 'Tax comparison',
      stat: '20.42%',
      description: 'Effective tax rate on distributions',
      list: ['Standard corporate tax: 30%+', 'GK-TK pass-through rate: 20.42%', 'Savings: approximately 10% on every distribution'],
    },
  },
  {
    id: 5,
    title: 'Competition from Japanese majors',
    question: 'What stops Toyoko Inn, APA, or Daiwa House from doing this?',
    answer: "Three structural advantages. First, deep semiconductor ecosystem integration: MoreHarvest's service layer is built specifically for Taiwanese expatriates, not generic business travelers. Second, first-mover advantage: by the time major chains identify and target this niche, MoreHarvest will have established tenant relationships and operational data. Third, lower book value: purpose-built serviced apartments have a fundamentally different cost basis than hotel conversions.",
    evidence: {
      label: 'Competitive moat',
      stat: '3',
      description: 'Structural advantages vs. hotel chains',
      list: ['Semiconductor-specific service layer (SDRE)', 'First-mover tenant relationships', 'Lower cost basis vs. hotel conversions'],
    },
  },
  {
    id: 6,
    title: 'Governance rights',
    question: 'As a TK (silent partner) investor, what governance rights do I have?',
    answer: "TK investors receive negative covenants and veto rights on material events: asset sales, refinancing, major capex above threshold, changes to business plan. CapitaLand's involvement as co-investor serves as a 'second firewall' as their institutional governance standards apply to the partnership structure.",
    evidence: {
      label: 'Governance protections',
      stat: '2-layer',
      description: 'Dual governance firewall',
      list: ['Veto on asset sales and refinancing', 'Capex threshold controls', 'CapitaLand institutional oversight', 'Business plan change approval required'],
    },
  },
];

export interface TimelinePhase {
  period: string;
  description: string;
}

export interface HsinchiuParallel {
  kumamoto: {
    phases: TimelinePhase[];
    metrics: { label: string; value: string }[];
  };
  hsinchu: {
    phases: TimelinePhase[];
    metrics: { label: string; value: string }[];
  };
  positioningStatement: string;
}

export const HSINCHU_PARALLEL: HsinchiuParallel = {
  kumamoto: {
    phases: [
      { period: '2024-2025', description: 'JASM Fab 1 opens. Taiwanese engineers arrive. TSMC draws 44 additional companies to Kumamoto. Residential supply gap emerges, no premium developer has entered.' },
      { period: '2026-2028', description: 'Fab 2 operational. Combined two-fab investment exceeds $20B. Supply chain clusters form. Economic impact estimated at 4 trillion yen over 10 years.' },
      { period: '2029-2032', description: 'Developer competition. Major Japanese developers enter. Early-mover land cost advantage becomes unreplicable.' },
      { period: '2033-2035', description: 'Exit window opens. Portfolio reaches REIT threshold. Institutional acquisition or listed-vehicle exit at mature market valuations.' },
    ],
    metrics: [
      { label: 'Prefecture-wide land prices since 2020', value: '+1.7x' },
      { label: 'Ozu annual gain, #1 in Japan 2024', value: '+33.3%' },
    ],
  },
  hsinchu: {
    phases: [
      { period: '2004-2006', description: 'TSMC 12-inch fab expansion. Science Park workforce surpassed 140,000. Hsinchu entered the top 3 highest household income areas in Taiwan.' },
      { period: '2007-2009', description: 'Acute residential supply gap. Senior engineers housed in hotels and serviced units for lack of premium alternatives. Demand far outpaced new supply.' },
      { period: '2010-2012', description: 'Institutional developers enter. Far Glory, Cathay Real Estate begin land acquisition. Early movers had already locked the best sites and lowest land basis.' },
      { period: '2013-2018', description: 'Market matures. Zhubei prices nearly doubled over 5 years. Hsinchu County 10-year cumulative appreciation of +60%.' },
    ],
    metrics: [
      { label: 'Zhubei 5-year price appreciation', value: '~2x' },
      { label: 'Baoshan TSMC zone 3-year growth', value: '+120%' },
    ],
  },
  positioningStatement: 'Entering in 2025 is the equivalent of acquiring land in Zhubei in 2007. We bring what no developer brought to Hsinchu then: Moha Intel, an AI-native platform that turns every asset into a data-generating node, compounding both NOI and proprietary market intelligence across the portfolio.',
};

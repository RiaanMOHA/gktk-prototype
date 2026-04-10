export interface ScenarioYear {
  return_pre: number;
  return_post: number;
  em_pre: number;
  em_post: number;
  irr_pre: string;
  irr_post: string;
}

export type Scenario = 'bull' | 'normal' | 'bear';
export type ExitYear = '3Y' | '4Y' | '5Y' | '6Y';

export const FINANCIAL_DATA: Record<Scenario, Record<ExitYear, ScenarioYear>> = {
  bull: {
    '3Y': { return_pre: 1_624_447_742, return_post: 1_496_935_513, em_pre: 1.62, em_post: 1.50, irr_pre: '18.29%', irr_post: '14.89%' },
    '4Y': { return_pre: 1_700_303_136, return_post: 1_557_301_236, em_pre: 1.70, em_post: 1.56, irr_pre: '15.06%', irr_post: '12.31%' },
    '5Y': { return_pre: 1_776_285_098, return_post: 1_617_767_681, em_pre: 1.78, em_post: 1.62, irr_pre: '13.16%', irr_post: '10.77%' },
    '6Y': { return_pre: 1_853_120_274, return_post: 1_678_913_114, em_pre: 1.85, em_post: 1.68, irr_pre: '11.90%', irr_post: '9.76%' },
  },
  normal: {
    '3Y': { return_pre: 1_496_447_742, return_post: 1_395_073_113, em_pre: 1.50, em_post: 1.40, irr_pre: '14.77%', irr_post: '12.00%' },
    '4Y': { return_pre: 1_556_303_136, return_post: 1_442_706_036, em_pre: 1.56, em_post: 1.44, irr_pre: '12.15%', irr_post: '9.91%' },
    '5Y': { return_pre: 1_616_285_098, return_post: 1_490_439_681, em_pre: 1.62, em_post: 1.49, irr_pre: '10.60%', irr_post: '8.66%' },
    '6Y': { return_pre: 1_677_120_274, return_post: 1_538_852_314, em_pre: 1.68, em_post: 1.54, irr_pre: '9.57%', irr_post: '7.84%' },
  },
  bear: {
    '3Y': { return_pre: 1_368_447_742, return_post: 1_293_210_713, em_pre: 1.37, em_post: 1.29, irr_pre: '11.14%', irr_post: '9.03%' },
    '4Y': { return_pre: 1_412_303_136, return_post: 1_328_110_836, em_pre: 1.41, em_post: 1.33, irr_pre: '9.16%', irr_post: '7.45%' },
    '5Y': { return_pre: 1_456_285_098, return_post: 1_363_111_681, em_pre: 1.46, em_post: 1.36, irr_pre: '7.97%', irr_post: '6.50%' },
    '6Y': { return_pre: 1_501_120_274, return_post: 1_398_791_514, em_pre: 1.50, em_post: 1.40, irr_pre: '7.18%', irr_post: '5.87%' },
  },
};

export const DEAL_STRUCTURE = {
  totalProject: 2_000_000_000,
  debtEquityRatio: '50 / 50',
  debtAmount: 1_000_000_000,
  equityAmount: 1_000_000_000,
  equitySplit: [
    { investor: 'CapitaLand', percentage: 20, amount: 200_000_000 },
    { investor: 'SFO / family office', percentage: 70, amount: 700_000_000 },
    { investor: 'MoreHarvest GP', percentage: 10, amount: 100_000_000 },
  ],
  preferredReturn: '8%',
  gpPromote: '20%',
  taxRate: '20.42%',
} as const;

export const FUND_TERMS = {
  size: 'USD 30 million (minimum 6 million)',
  tenor: '5 years',
  investmentPeriod: '2 years',
  structure: 'Variable Capital Company sub-fund (Singapore)',
  fundManager: 'Oakwater Capital Pte. Ltd. (Singapore)',
  investmentRecipient: 'MKGF GT-TK Vehicle (Japan)',
  investmentManager: 'MoreHarvest (Japan)',
  rentalYieldTarget: '5% to 6% p.a.',
  propertyExitYieldTarget: '15% to 25%',
  totalYieldTarget: '8% to 11% p.a. (over 5 years)',
  managementFees: '1% p.a.',
  performanceFees: '20% above hurdle rate (at maturity)',
  hurdleRate: '7% p.a.',
} as const;

export type StepType = 'transition' | 'content';

export interface StepConfig {
  id: number;
  name: string;
  type: StepType;
  section?: number;
  label: string;
}

export const STEPS: StepConfig[] = [
  { id: 1,  name: 'step-1-opening-transition',            type: 'transition', section: undefined, label: 'Opening' },
  { id: 2,  name: 'step-2-section-1-entry',               type: 'content',    section: 1,         label: 'Entry' },
  { id: 3,  name: 'step-3-section-2-transition',           type: 'transition', section: 2,         label: 'Bridge transition' },
  { id: 4,  name: 'step-4-section-2-bridge',               type: 'content',    section: 2,         label: 'Bridge' },
  { id: 5,  name: 'step-5-section-3-transition',           type: 'transition', section: 3,         label: 'Map transition' },
  { id: 6,  name: 'step-6-section-3-map',                  type: 'content',    section: 3,         label: 'Map' },
  { id: 7,  name: 'step-7-section-4-transition',           type: 'transition', section: 4,         label: 'Persona transition' },
  { id: 8,  name: 'step-8-section-4-persona',              type: 'content',    section: 4,         label: 'Persona' },
  { id: 9,  name: 'step-9-section-5-transition',           type: 'transition', section: 5,         label: 'Current options transition' },
  { id: 10, name: 'step-10-section-5-current-options',     type: 'content',    section: 5,         label: 'Current options' },
  { id: 11, name: 'step-11-section-6-transition',          type: 'transition', section: 6,         label: 'Product hardware transition' },
  { id: 12, name: 'step-12-section-6-product-hardware',    type: 'content',    section: 6,         label: 'Product hardware' },
  { id: 13, name: 'step-13-section-7-transition',          type: 'transition', section: 7,         label: 'Product software transition' },
  { id: 14, name: 'step-14-section-7-product-software',    type: 'content',    section: 7,         label: 'Product software' },
  { id: 15, name: 'step-15-section-8-transition',          type: 'transition', section: 8,         label: 'Financials transition' },
  { id: 16, name: 'step-16-section-8-financials',          type: 'content',    section: 8,         label: 'Financials' },
  { id: 17, name: 'step-17-section-9-transition',          type: 'transition', section: 9,         label: 'Risk factors transition' },
  { id: 18, name: 'step-18-section-9-risk-factors',        type: 'content',    section: 9,         label: 'Risk factors' },
  { id: 19, name: 'step-19-section-10-transition',         type: 'transition', section: 10,        label: 'Exit strategy transition' },
  { id: 20, name: 'step-20-section-10-exit-strategy',      type: 'content',    section: 10,        label: 'Exit strategy' },
];

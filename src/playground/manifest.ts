import type { ComponentType } from "react";
import dynamic from "next/dynamic";

export type PrototypeVariant = {
  /** URL-safe id passed to the prototype via ?variant=<id>. */
  id: string;
  /** Chip label shown in the playground header. */
  label: string;
};

/* ───────────────────────────────────────────────────────
   Playground manifest
   Single source of truth for every step's status and
   the prototype files stored in its drawer.

   When a new prototype is added, register it here with
   its exact original filename and a dynamic import.
   ─────────────────────────────────────────────────────── */

export type StepStatus =
  | "locked"
  | "blocked"
  | "blocked-3d"
  | "available"
  | "in-test";

export type PrototypeFile = {
  /** Original filename, kept exactly as authored. */
  filename: string;
  /** "jsx" renders as a mounted React component. "html" iframes a static file in /public. */
  kind: "jsx" | "html";
  /** Only for kind === "jsx". Lazy component loader. May accept a `variant` prop. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: ComponentType<any>;
  /** Only for kind === "html". Absolute URL path under /public. */
  publicPath?: string;
  /**
   * Optional variant list. When present the playground renders chips in its
   * header and passes the selected id to the prototype via ?variant=<id>.
   * The prototype is responsible for reading the prop and rendering the
   * matching variant. Internal chips inside the prototype should be removed.
   */
  variants?: PrototypeVariant[];
};

export type StepDrawer = {
  index: number;
  id: string;
  label: string;
  status: StepStatus;
  prototypes: PrototypeFile[];
};

const Step1OpeningTransition = dynamic(
  () =>
    import(
      "./prototypes/step-1-opening-transition/step-1-opening-transition.jsx"
    ),
  { ssr: false }
);

const Step2EntryTransitions = dynamic(
  () =>
    import(
      "./prototypes/step-2-section-1-entry/gktk-entry-transitions-5.jsx"
    ),
  { ssr: false }
);

const Step3Transition = dynamic(
  () =>
    import(
      "./prototypes/step-3-section-2-transition/gktk-step3-transition-v1.jsx"
    ),
  { ssr: false }
);

const Step4Bridge = dynamic(
  () =>
    import(
      "./prototypes/step-4-section-2-bridge/gktk-bridge-v11.jsx"
    ),
  { ssr: false }
);

const Step7Transition = dynamic(
  () =>
    import(
      "./prototypes/step-7-section-4-transition/gktk-step7-transition-v6.jsx"
    ),
  { ssr: false }
);

const Step9Transition = dynamic(
  () =>
    import(
      "./prototypes/step-9-section-5-transition/gktk-step9-transition-v6.jsx"
    ),
  { ssr: false }
);

const Step10CurrentOptions = dynamic(
  () =>
    import(
      "./prototypes/step-10-section-5-current-options/gktk-step10-current-options-v6.jsx"
    ),
  { ssr: false }
);

const Step15Transition = dynamic(
  () =>
    import(
      "./prototypes/step-15-section-8-transition/gktk-step15-transition.jsx"
    ),
  { ssr: false }
);

const Step16Financials = dynamic(
  () =>
    import(
      "./prototypes/step-16-section-8-financials/gktk-step16-financials.jsx"
    ),
  { ssr: false }
);

export const STEPS: StepDrawer[] = [
  {
    index: 1,
    id: "step-1-opening-transition",
    label: "Opening transition",
    status: "locked",
    prototypes: [
      {
        filename: "step-1-opening-transition.jsx",
        kind: "jsx",
        component: Step1OpeningTransition,
      },
    ],
  },
  {
    index: 2,
    id: "step-2-section-1-entry",
    label: "Section 1 — entry",
    status: "locked",
    prototypes: [
      {
        filename: "gktk-entry-transitions-5.jsx",
        kind: "jsx",
        component: Step2EntryTransitions,
        variants: [
          { id: "A", label: "A: the warmth" },
          { id: "B", label: "B: the layers" },
          { id: "C", label: "C: the signal" },
          { id: "D", label: "D: the stagger" },
        ],
      },
    ],
  },
  {
    index: 3,
    id: "step-3-section-2-transition",
    label: "Section 2 — transition",
    status: "locked",
    prototypes: [
      {
        filename: "gktk-step3-transition-v1.jsx",
        kind: "jsx",
        component: Step3Transition,
        variants: [
          { id: "1", label: "1: the sweep" },
          { id: "2", label: "2: the scatter" },
          { id: "3", label: "3: the dissolve" },
          { id: "4", label: "4: the drop" },
        ],
      },
    ],
  },
  {
    index: 4,
    id: "step-4-section-2-bridge",
    label: "Section 2 — bridge",
    status: "locked",
    prototypes: [
      {
        filename: "gktk-bridge-v11.jsx",
        kind: "jsx",
        component: Step4Bridge,
        variants: [
          { id: "A", label: "A: the counter" },
          { id: "F", label: "F: the ticker" },
          { id: "G", label: "G: the presence" },
        ],
      },
    ],
  },
  {
    index: 5,
    id: "step-5-section-3-transition",
    label: "Section 3 — transition",
    status: "blocked",
    prototypes: [],
  },
  {
    index: 6,
    id: "step-6-section-3-map",
    label: "Section 3 — map",
    status: "blocked",
    prototypes: [],
  },
  {
    index: 7,
    id: "step-7-section-4-transition",
    label: "Section 4 — transition",
    status: "locked",
    prototypes: [
      {
        filename: "gktk-step7-transition-v6.jsx",
        kind: "jsx",
        component: Step7Transition,
        variants: [
          { id: "B", label: "B: the descent" },
          { id: "D", label: "D: the warp" },
        ],
      },
    ],
  },
  {
    index: 8,
    id: "step-8-section-4-persona",
    label: "Section 4 — persona",
    status: "blocked-3d",
    prototypes: [],
  },
  {
    index: 9,
    id: "step-9-section-5-transition",
    label: "Section 5 — transition",
    status: "locked",
    prototypes: [
      {
        filename: "gktk-step9-transition-v6.jsx",
        kind: "jsx",
        component: Step9Transition,
      },
    ],
  },
  {
    index: 10,
    id: "step-10-section-5-current-options",
    label: "Section 5 — current options",
    status: "locked",
    prototypes: [
      {
        filename: "gktk-step10-current-options-v6.jsx",
        kind: "jsx",
        component: Step10CurrentOptions,
        variants: [
          { id: "B", label: "B: the stack" },
          { id: "D", label: "D: the divide" },
        ],
      },
    ],
  },
  {
    index: 11,
    id: "step-11-section-6-transition",
    label: "Section 6 — transition",
    status: "blocked",
    prototypes: [],
  },
  {
    index: 12,
    id: "step-12-section-6-product-hardware",
    label: "Section 6 — product hardware",
    status: "blocked",
    prototypes: [],
  },
  {
    index: 13,
    id: "step-13-section-7-transition",
    label: "Section 7 — transition",
    status: "blocked",
    prototypes: [],
  },
  {
    index: 14,
    id: "step-14-section-7-product-software",
    label: "Section 7 — product software",
    status: "available",
    prototypes: [],
  },
  {
    index: 15,
    id: "step-15-section-8-transition",
    label: "Section 8 — transition",
    status: "in-test",
    prototypes: [
      {
        filename: "gktk-step15-transition.jsx",
        kind: "jsx",
        component: Step15Transition,
      },
    ],
  },
  {
    index: 16,
    id: "step-16-section-8-financials",
    label: "Section 8 — financials",
    status: "in-test",
    prototypes: [
      {
        filename: "gktk-step16-financials.jsx",
        kind: "jsx",
        component: Step16Financials,
        variants: [
          { id: "A", label: "A: the beacon" },
          { id: "C", label: "C: the ledger" },
        ],
      },
    ],
  },
  {
    index: 17,
    id: "step-17-section-9-transition",
    label: "Section 9 — transition",
    status: "locked",
    prototypes: [],
  },
  {
    index: 18,
    id: "step-18-section-9-risk-factors",
    label: "Section 9 — risk factors",
    status: "available",
    prototypes: [],
  },
  {
    index: 19,
    id: "step-19-section-10-transition",
    label: "Section 10 — transition",
    status: "available",
    prototypes: [],
  },
  {
    index: 20,
    id: "step-20-section-10-exit-strategy",
    label: "Section 10 — exit strategy",
    status: "available",
    prototypes: [],
  },
];

export function findStep(id: string): StepDrawer | undefined {
  return STEPS.find((s) => s.id === id);
}

export function findPrototype(
  stepId: string,
  filename: string
): PrototypeFile | undefined {
  return findStep(stepId)?.prototypes.find((p) => p.filename === filename);
}

export const STATUS_LABEL: Record<StepStatus, string> = {
  locked: "Locked",
  blocked: "Blocked",
  "blocked-3d": "Blocked (3D)",
  available: "Available",
  "in-test": "In test",
};

export const STATUS_COLOR: Record<
  StepStatus,
  { bg: string; fg: string; dot: string }
> = {
  locked: { bg: "rgba(25,182,78,0.12)", fg: "#0D8A3A", dot: "#19B64E" },
  blocked: { bg: "rgba(208,49,49,0.10)", fg: "#A3282A", dot: "#D03131" },
  "blocked-3d": { bg: "rgba(208,49,49,0.10)", fg: "#A3282A", dot: "#D03131" },
  available: { bg: "rgba(251,185,49,0.16)", fg: "#8C5E00", dot: "#FBB931" },
  "in-test": { bg: "rgba(37,39,44,0.08)", fg: "#25272C", dot: "#5B616E" },
};

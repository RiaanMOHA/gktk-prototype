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
  | "in-progress";

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

const Step5Transition = dynamic(
  () =>
    import(
      "./prototypes/step-5-section-3-transition/gktk-step5-transition-v3.jsx"
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

const Step11Transition = dynamic(
  () =>
    import(
      "./prototypes/step-11-section-6-transition/gktk-step11-transition-v2.jsx"
    ),
  { ssr: false }
);

const Step13Transition = dynamic(
  () =>
    import(
      "./prototypes/step-13-section-7-transition/gktk-step13-transition-v2.jsx"
    ),
  { ssr: false }
);

const Step14ProductSoftware = dynamic(
  () =>
    import(
      "./prototypes/step-14-section-7-product-software/gktk-step14-product-software-v3.jsx"
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

const Step17Transition = dynamic(
  () =>
    import(
      "./prototypes/step-17-section-9-transition/gktk-step17-transition-v5.jsx"
    ),
  { ssr: false }
);

const Step19Transition = dynamic(
  () =>
    import(
      "./prototypes/step-19-section-10-transition/gktk-step19-transition-v6.jsx"
    ),
  { ssr: false }
);

const Step18RiskFactors = dynamic(
  () =>
    import(
      "./prototypes/step-18-section-9-risk-factors/gktk-step18-risk-factors-v8.jsx"
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
    status: "locked",
    prototypes: [
      {
        filename: "gktk-step5-transition-v3.jsx",
        kind: "jsx",
        component: Step5Transition,
        variants: [
          { id: "A", label: "A: the gravity well" },
          { id: "C", label: "C: the shutter" },
          { id: "D", label: "D: the approach" },
          { id: "E", label: "E: the recede" },
        ],
      },
    ],
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
    status: "blocked",
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
    status: "locked",
    prototypes: [
      {
        filename: "gktk-step11-transition-v2.jsx",
        kind: "jsx",
        component: Step11Transition,
        variants: [
          { id: "B", label: "B: the tilt" },
          { id: "C", label: "C: the corridor" },
        ],
      },
    ],
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
    status: "locked",
    prototypes: [
      {
        filename: "gktk-step13-transition-v2.jsx",
        kind: "jsx",
        component: Step13Transition,
        variants: [
          { id: "B", label: "B: the lift" },
          { id: "D", label: "D: the push" },
        ],
      },
    ],
  },
  {
    index: 14,
    id: "step-14-section-7-product-software",
    label: "Section 7 — product software",
    status: "locked",
    prototypes: [
      {
        filename: "gktk-step14-product-software-v3.jsx",
        kind: "jsx",
        component: Step14ProductSoftware,
        variants: [
          { id: "A", label: "A: the lock screen" },
          { id: "B", label: "B: the thread" },
        ],
      },
    ],
  },
  {
    index: 15,
    id: "step-15-section-8-transition",
    label: "Section 8 — transition",
    status: "locked",
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
    status: "locked",
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
    prototypes: [
      {
        filename: "gktk-step17-transition-v5.jsx",
        kind: "jsx",
        component: Step17Transition,
        variants: [
          { id: "recede", label: "C: the recede" },
          { id: "shutter", label: "D: the shutter" },
        ],
      },
    ],
  },
  {
    index: 18,
    id: "step-18-section-9-risk-factors",
    label: "Section 9 — risk factors",
    status: "locked",
    prototypes: [
      {
        filename: "gktk-step18-risk-factors-v8.jsx",
        kind: "jsx",
        component: Step18RiskFactors,
        variants: [
          { id: "A", label: "A: the crescendo" },
          { id: "D", label: "D: the parallax" },
        ],
      },
    ],
  },
  {
    index: 19,
    id: "step-19-section-10-transition",
    label: "Section 10 — transition",
    status: "locked",
    prototypes: [
      {
        filename: "gktk-step19-transition-v6.jsx",
        kind: "jsx",
        component: Step19Transition,
        variants: [
          { id: "A", label: "A: the lift" },
          { id: "B", label: "B: the settle" },
        ],
      },
    ],
  },
  {
    index: 20,
    id: "step-20-section-10-exit-strategy",
    label: "Section 10 — exit strategy",
    status: "in-progress",
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
  "in-progress": "In progress",
};

export const STATUS_COLOR: Record<
  StepStatus,
  { bg: string; fg: string; dot: string }
> = {
  locked: { bg: "rgba(25,182,78,0.12)", fg: "#0D8A3A", dot: "#19B64E" },
  blocked: { bg: "rgba(208,49,49,0.10)", fg: "#A3282A", dot: "#D03131" },
  "in-progress": { bg: "rgba(251,185,49,0.16)", fg: "#8C5E00", dot: "#FBB931" },
};

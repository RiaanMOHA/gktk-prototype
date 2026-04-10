export interface PainPoint {
  id: number;
  category: 'physical' | 'mental';
  title: string;
  description: string;
  companies: string[];
}

export const PAIN_POINTS: PainPoint[] = [
  {
    id: 1,
    category: 'physical',
    title: 'Traffic congestion',
    description: 'Senior managers commuting from Kumamoto City to the fab corridor face up to 3 hours daily. Land prices within the JASM corridor have surged 40 to 80%, pushing workers further from their worksite.',
    companies: ['Topco', 'Marketech', 'Wholetech'],
  },
  {
    id: 2,
    category: 'physical',
    title: 'No Chinese-speaking support',
    description: 'Expatriates face Japanese-only property management, requiring 2 to 3 weeks to activate utilities, gas, and internet. Budgets of 200,000 to 300,000 yen find almost no furnished options with Chinese-language support.',
    companies: ['JASM', 'ASE', 'Elan Microelectronics'],
  },
  {
    id: 3,
    category: 'physical',
    title: 'Administrative burden',
    description: 'HR departments must handle guarantor requirements, waste disposal procedures, furniture procurement, utility setup, and resident registration. The Japanese rental market is unfriendly to foreign nationals and nothing is turnkey.',
    companies: ['UIS', 'G2C Alliance'],
  },
  {
    id: 4,
    category: 'physical',
    title: 'Housing quality anxiety',
    description: 'Dependents commonly report anxiety about water quality (skin issues) and Mt. Aso volcanic ash cleanup. No professional property management buffer means frequent daily-life disputes including garbage sorting and noise.',
    companies: ['G2C Alliance'],
  },
  {
    id: 5,
    category: 'mental',
    title: 'Limited medical access',
    description: 'There are almost no Chinese-speaking medical services in the Kumamoto corridor. Families face emergencies without an interpreter, prenatal checkups with no language support, and childhood vaccination schedules they cannot navigate alone.',
    companies: ['Topco', 'MA-tek'],
  },
  {
    id: 6,
    category: 'mental',
    title: 'Mental health strain',
    description: "The combination of demanding fab schedules, spousal isolation, and children's education anxiety creates compounding mental health pressure. There are no Chinese-language counseling or psychiatry services in the Kumamoto area.",
    companies: ['JASM', 'MA-tek', 'LCY'],
  },
  {
    id: 7,
    category: 'mental',
    title: "Children's education gaps",
    description: "Families worry their children cannot keep up with Japanese schools or will not be able to reintegrate into Taiwan's curriculum upon return. KIS slots are extremely limited in 2026.",
    companies: ['Topco', 'MA-tek'],
  },
  {
    id: 8,
    category: 'mental',
    title: 'Adapting to Kumamoto lifestyle',
    description: 'Dependents living in standard Japanese housing lack social interaction and Chinese-language support. Highly educated spouses without a social life often pressure employees to repatriate early.',
    companies: ['JASM', 'MA-tek', 'LCY', 'G2C Alliance'],
  },
];

export const PERSONA_STAT = {
  value: '3 to 5 million yen',
  label: 'estimated replacement cost per engineer who repatriates early due to family maladjustment.',
};

export const PERSONA_HEADING = '47,000 engineers need a home';

export const PERSONA_CONCEPT = "Semiconductor companies need housing solutions for relocated staff. An ideal solution goes beyond location and must be fully move-in ready. Our property management team includes Taiwanese staff, effectively reducing language barriers and day-to-day friction. We tailor our services to engineers' working schedules, helping them quickly adapt to living abroad.";

export const PERSONA_MESSAGE = 'Tenants are employees from semiconductor companies on short- to long-term assignments. They need to settle in quickly and need move-in-ready accommodations to adapt to a new environment. This includes fully furnished units, reliable property management, and local support to minimize inconveniences caused by language and cultural differences. An ideal home allows them to focus on work without being distracted by day-to-day matters.';

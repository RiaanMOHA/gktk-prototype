export interface ProductSpec {
  label: string;
  value: string;
}

export const HARDWARE_SPECS: ProductSpec[] = [
  { label: 'Target location', value: 'JASM corridor, within 15 min of fab' },
  { label: 'Total units', value: '100 units' },
  { label: 'Site size', value: 'Approximately 1,000 tsubo' },
  { label: 'Unit type', value: '3LDK, family-oriented' },
  { label: 'Air quality', value: 'Hanke HEPA filtration system' },
  { label: 'Water', value: 'Soft water plumbing throughout' },
  { label: 'EV charging', value: 'Delta EV charging stations' },
  { label: 'Lease model', value: 'B2B bulk lease to semiconductor companies' },
];

export const INVESTMENT_PROPERTIES = [
  'Site 1',
  'Site 2',
  'Site 3',
  'Site 4',
  'Site 5',
];

export interface VirtualTourRoom {
  id: number;
  name: string;
  note?: string;
}

export const VIRTUAL_TOUR_ROOMS: VirtualTourRoom[] = [
  { id: 1, name: 'Building exterior' },
  { id: 2, name: 'Lobby / common area' },
  { id: 3, name: 'Living room', note: 'Hanke HEPA air filtration system' },
  { id: 4, name: 'Kitchen' },
  { id: 5, name: 'Bedroom' },
  { id: 6, name: 'Bathroom', note: 'Soft water plumbing throughout' },
];

export interface ServiceTier {
  year: string;
  label: string;
  pricing: string;
  services: string[];
}

export const SERVICE_TIERS: ServiceTier[] = [
  {
    year: 'Year 1',
    label: 'Essential landing services',
    pricing: 'Included in base fees',
    services: [
      'Chinese-speaking property secretary',
      'Administrative accompaniment (bank, phone, registration)',
      'Hardware maintenance (Hanke, Delta)',
    ],
  },
  {
    year: 'Year 2',
    label: 'Family stability services',
    pricing: 'Subscription add-on',
    services: [
      'Medical navigation (24/7 Chinese-language booking, accompanied interpretation)',
      'Education support (KIS school bus, after-school tutoring)',
      'Spouse community events',
    ],
  },
  {
    year: 'Year 3+',
    label: 'Lifestyle and wellness services',
    pricing: 'Premium membership',
    services: [
      'Mental wellness (counseling, psychiatry referrals in Chinese)',
      'Health management (environmental data, nutritionist)',
      'Golf and onsen concierge',
      'Deep Kumamoto cultural experiences',
    ],
  },
  {
    year: 'Beyond',
    label: 'Continuous upgrades',
    pricing: '',
    services: [
      'Digital platform pushes new service modules without modifying buildings',
      'Roadmap expands based on tenant feedback and operational data',
    ],
  },
];

export interface PhoneFrame {
  id: number;
  content: string;
  type: 'notification' | 'chat' | 'card' | 'final';
}

export const PHONE_FRAMES: PhoneFrame[] = [
  { id: 1, type: 'notification', content: "Reminder: your child's vaccination appointment is tomorrow at 9:00 AM." },
  { id: 2, type: 'chat', content: 'Hi! I will accompany you tomorrow. I have confirmed the appointment with Dr. Tanaka at the clinic. I will meet you in the lobby at 8:30.' },
  { id: 3, type: 'card', content: "Translation card: child's medical history (Japanese translation prepared by secretary)." },
  { id: 4, type: 'chat', content: 'Dr. Tanaka says everything looks great. Next appointment is in 3 months. I will remind you then.' },
  { id: 5, type: 'final', content: 'One scenario. Zero friction. That is SDRE.' },
];

import { StyleSheet } from '@react-pdf/renderer';
import { BRAND } from './brand';

const W = BRAND.page.width;
const H = BRAND.page.height;
const C = BRAND.colors;

/**
 * Shared styles used across multiple PDF pages.
 * Page-specific styles are still defined locally in each page file.
 */
export const shared = StyleSheet.create({
  // Layout
  page: { position: 'relative', width: W, height: H, backgroundColor: C.background },
  content: { position: 'absolute', top: 80, left: 80, right: 80, bottom: 40 },
  twoCol: { flexDirection: 'row', gap: 40 },
  col: { flex: 1 },

  // Typography
  heading: { fontFamily: 'REM', fontWeight: 600, fontSize: 18, color: C.heading, marginBottom: 6 },
  subheading: { fontFamily: 'Noto Sans JP', fontSize: 9, color: C.caption, marginBottom: 20 },
  body: { fontFamily: 'Noto Sans JP', fontSize: 9, lineHeight: 1.55, color: C.body, marginBottom: 12 },

  // Stat boxes
  statBox: { backgroundColor: C.amber50, borderRadius: 4, padding: 12, marginBottom: 10 },
  statValue: { fontFamily: 'REM', fontWeight: 600, fontSize: 18, color: C.heading, marginBottom: 2 },
  statLabel: { fontFamily: 'Noto Sans JP', fontSize: 8, color: C.caption },
});

export { BRAND, C, W, H };

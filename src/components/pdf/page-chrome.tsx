import { View, Text, Font, StyleSheet } from '@react-pdf/renderer';
import LogoPDF from './logo-pdf';
import { BRAND } from './brand';

const W = BRAND.page.width;

/* ── Font registration (once, at module level) ── */
Font.register({
  family: 'REM',
  src: '/fonts/REM-SemiBold.ttf',
  fontWeight: 600,
});

Font.register({
  family: 'Noto Sans JP',
  src: '/fonts/NotoSansJP-Regular.ttf',
  fontWeight: 400,
});

Font.registerHyphenationCallback((word) => [word]);

/* ── Styles matching Oakwater deck exactly ── */
const s = StyleSheet.create({
  // Header bar: full width, logo left, year right, amber rule below
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: W,
    height: 56,
  },
  logo: {
    position: 'absolute',
    left: 40,
    top: 14,
  },
  sectionLabel: {
    position: 'absolute',
    left: 40,
    top: 40,
    fontFamily: 'Noto Sans JP',
    fontWeight: 400,
    fontSize: 9,
    color: BRAND.colors.caption,
  },
  year: {
    position: 'absolute',
    right: 40,
    top: 18,
    fontFamily: 'Noto Sans JP',
    fontWeight: 400,
    fontSize: 12,
    color: BRAND.colors.caption,
  },
  // Amber rule: spans full width, sits at y=56
  rule: {
    position: 'absolute',
    top: 56,
    left: 0,
    width: W,
    height: 2,
    backgroundColor: BRAND.colors.amber,
  },
  // Page number: bottom center
  pageNumber: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: 'Noto Sans JP',
    fontWeight: 400,
    fontSize: 8,
    color: BRAND.colors.muted,
  },
});

/* ── Header: logo + section label + year + amber rule ── */
export function PageHeader({ sectionLabel }: { sectionLabel: string }) {
  return (
    <>
      <View style={s.header}>
        <View style={s.logo}>
          <LogoPDF height={22} />
        </View>
        {sectionLabel ? <Text style={s.sectionLabel}>{sectionLabel}</Text> : null}
        <Text style={s.year}>{BRAND.year}</Text>
      </View>
      <View style={s.rule} />
    </>
  );
}

/* ── Footer: page number ── */
export function PageFooter({ pageNumber }: { pageNumber: number }) {
  return <Text style={s.pageNumber}>{pageNumber}</Text>;
}

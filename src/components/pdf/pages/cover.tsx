import { View, Text, StyleSheet } from '@react-pdf/renderer';
import LogoPDF from '../logo-pdf';
import { BRAND } from '../brand';

const W = BRAND.page.width;
const H = BRAND.page.height;

const s = StyleSheet.create({
  page: {
    position: 'relative',
    width: W,
    height: H,
    backgroundColor: BRAND.colors.background,
    overflow: 'hidden',
  },
  // Header bar matching Oakwater cover exactly
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
  year: {
    position: 'absolute',
    right: 40,
    top: 18,
    fontFamily: 'Noto Sans JP',
    fontSize: 12,
    color: BRAND.colors.caption,
  },
  rule: {
    position: 'absolute',
    top: 56,
    left: 0,
    width: W,
    height: 2,
    backgroundColor: BRAND.colors.amber,
  },
  // Large headline left-aligned, vertically centered
  headline: {
    position: 'absolute',
    left: 80,
    top: 200,
    maxWidth: 480,
    fontFamily: 'REM',
    fontWeight: 600,
    fontSize: 38,
    lineHeight: 1.2,
    color: BRAND.colors.heading,
  },
  // Circular placeholder on right (matching Oakwater cover image)
  circle: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    right: 100,
    top: 140,
    backgroundColor: BRAND.colors.neutral100,
  },
});

export default function CoverPage() {
  return (
    <View style={s.page}>
      {/* Header */}
      <View style={s.header}>
        <View style={s.logo}>
          <LogoPDF height={28} />
        </View>
        <Text style={s.year}>{BRAND.year}</Text>
      </View>
      <View style={s.rule} />

      {/* Headline */}
      <Text style={s.headline}>
        Kumamoto{'\n'}semiconductor corridor{'\n'}serviced apartments.
      </Text>

      {/* Circular image placeholder */}
      <View style={s.circle} />
    </View>
  );
}

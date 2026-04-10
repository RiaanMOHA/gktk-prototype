import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { BRAND } from '../brand';

const s = StyleSheet.create({
  page: {
    position: 'relative',
    width: BRAND.page.width,
    height: BRAND.page.height,
    backgroundColor: BRAND.colors.background,
  },
  // Centered group matching Oakwater: "Section A" label, number, amber bar, title
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  leftCol: {
    alignItems: 'flex-end',
    marginRight: 16,
  },
  sectionLabel: {
    fontFamily: 'REM',
    fontWeight: 600,
    fontSize: 12,
    color: BRAND.colors.heading,
    marginBottom: 2,
  },
  number: {
    fontFamily: 'Noto Sans JP',
    fontSize: 28,
    color: BRAND.colors.heading,
  },
  bar: {
    width: 6,
    height: 80,
    backgroundColor: BRAND.colors.amber,
    borderRadius: 3,
    marginRight: 20,
  },
  title: {
    fontFamily: 'Noto Sans JP',
    fontSize: 22,
    color: BRAND.colors.body,
  },
});

interface SectionDividerProps {
  sectionGroup?: string; // e.g. "Section A"
  number: string;        // e.g. "01"
  title: string;         // e.g. "Executive summary"
}

export default function SectionDividerPage({ sectionGroup, number, title }: SectionDividerProps) {
  return (
    <View style={s.page}>
      <View style={s.container}>
        <View style={s.leftCol}>
          {sectionGroup ? <Text style={s.sectionLabel}>{sectionGroup}</Text> : null}
          <Text style={s.number}>{number}</Text>
        </View>
        <View style={s.bar} />
        <Text style={s.title}>{title}</Text>
      </View>
    </View>
  );
}

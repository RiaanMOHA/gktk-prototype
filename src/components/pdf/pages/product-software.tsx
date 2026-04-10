import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { PageHeader, PageFooter } from '../page-chrome';
import { BRAND } from '../brand';
import { SERVICE_TIERS, PHONE_FRAMES } from '@/data/productSpecs';

const W = BRAND.page.width;
const H = BRAND.page.height;
const C = BRAND.colors;

const s = StyleSheet.create({
  page: { position: 'relative', width: W, height: H, backgroundColor: C.background },
  content: { position: 'absolute', top: 80, left: 80, right: 80, bottom: 40 },
  heading: { fontFamily: 'REM', fontWeight: 600, fontSize: 18, color: C.heading, marginBottom: 6 },
  subheading: { fontFamily: 'Noto Sans JP', fontSize: 9, lineHeight: 1.5, color: C.body, marginBottom: 16 },
  twoCol: { flexDirection: 'row', gap: 40 },
  col: { flex: 1 },
  tierYear: { fontFamily: 'REM', fontWeight: 600, fontSize: 10, color: C.heading, marginBottom: 2 },
  tierLabel: { fontFamily: 'REM', fontWeight: 600, fontSize: 8, color: C.subheading, marginBottom: 2 },
  tierPricing: { fontFamily: 'Noto Sans JP', fontSize: 7, color: C.caption, marginBottom: 4 },
  tierService: { fontFamily: 'Noto Sans JP', fontSize: 8, lineHeight: 1.45, color: C.body, paddingLeft: 8, marginBottom: 2 },
  tierBlock: { marginBottom: 12 },
  frameBox: { backgroundColor: C.background, borderRadius: 3, padding: 8, marginBottom: 6, borderWidth: 0.5, borderColor: C.neutral200 },
  frameType: { fontFamily: 'Noto Sans JP', fontSize: 7, color: C.caption, marginBottom: 2 },
  frameContent: { fontFamily: 'Noto Sans JP', fontSize: 8, lineHeight: 1.45, color: C.body },
  frameFinal: { backgroundColor: C.amber50, borderRadius: 3, padding: 8, marginBottom: 6 },
  scenarioHeading: { fontFamily: 'REM', fontWeight: 600, fontSize: 9, color: C.heading, marginBottom: 8 },
});

export default function ProductSoftwarePage() {
  return (
    <View style={s.page}>
      <PageHeader sectionLabel="06 | Product: software" />
      <View style={s.content}>
        <Text style={s.heading}>Software-defined real estate</Text>
        <Text style={s.subheading}>
          We have Taiwanese staff to solve all problems, including daily life scenarios and language barriers, so nothing affects their expected quality of life.
        </Text>
        <View style={s.twoCol}>
          <View style={s.col}>
            {SERVICE_TIERS.map((tier) => (
              <View key={tier.year} style={s.tierBlock}>
                <Text style={s.tierYear}>{tier.year}</Text>
                <Text style={s.tierLabel}>{tier.label}</Text>
                {tier.pricing ? <Text style={s.tierPricing}>{tier.pricing}</Text> : null}
                {tier.services.map((svc, i) => (
                  <Text key={i} style={s.tierService}>- {svc}</Text>
                ))}
              </View>
            ))}
          </View>
          <View style={s.col}>
            <Text style={s.scenarioHeading}>Scenario: vaccination appointment</Text>
            {PHONE_FRAMES.map((frame) => (
              <View key={frame.id} style={frame.type === 'final' ? s.frameFinal : s.frameBox}>
                <Text style={s.frameType}>{frame.type}</Text>
                <Text style={s.frameContent}>{frame.content}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      <PageFooter pageNumber={14} />
    </View>
  );
}

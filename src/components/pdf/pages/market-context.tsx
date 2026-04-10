import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { PageHeader, PageFooter } from '../page-chrome';
import { BRAND } from '../brand';
import { MAP_STEPS } from '@/data/mapSteps';

const W = BRAND.page.width;
const H = BRAND.page.height;
const C = BRAND.colors;

const s = StyleSheet.create({
  page: { position: 'relative', width: W, height: H, backgroundColor: C.background },
  content: { position: 'absolute', top: 80, left: 80, right: 80, bottom: 40 },
  heading: { fontFamily: 'REM', fontWeight: 600, fontSize: 18, color: C.heading, marginBottom: 6 },
  subheading: { fontFamily: 'Noto Sans JP', fontSize: 10, color: C.caption, marginBottom: 20 },
  twoCol: { flexDirection: 'row', gap: 40 },
  col: { flex: 1 },
  stepTitle: { fontFamily: 'REM', fontWeight: 600, fontSize: 11, color: C.heading, marginBottom: 4 },
  stepBody: { fontFamily: 'Noto Sans JP', fontSize: 9, lineHeight: 1.55, color: C.body, marginBottom: 14 },
  statBox: { backgroundColor: C.amber50, borderRadius: 4, padding: 12, marginBottom: 10 },
  statValue: { fontFamily: 'REM', fontWeight: 600, fontSize: 20, color: C.heading, marginBottom: 2 },
  statLabel: { fontFamily: 'Noto Sans JP', fontSize: 8, color: C.caption },
});

export default function MarketContextPage() {
  return (
    <View style={s.page}>
      <PageHeader sectionLabel="02 | Market context" />
      <View style={s.content}>
        <Text style={s.heading}>Kumamoto semiconductor corridor</Text>
        <Text style={s.subheading}>Four pillars of the investment thesis</Text>
        <View style={s.twoCol}>
          <View style={s.col}>
            {MAP_STEPS.map((step) => (
              <View key={step.id}>
                <Text style={s.stepTitle}>{step.title}</Text>
                <Text style={s.stepBody}>{step.body}</Text>
              </View>
            ))}
          </View>
          <View style={s.col}>
            <View style={s.statBox}>
              <Text style={s.statValue}>47,000+</Text>
              <Text style={s.statLabel}>New jobs being created in the corridor</Text>
            </View>
            <View style={s.statBox}>
              <Text style={s.statValue}>10T+ yen</Text>
              <Text style={s.statLabel}>Government semiconductor subsidy program</Text>
            </View>
            <View style={s.statBox}>
              <Text style={s.statValue}>44+</Text>
              <Text style={s.statLabel}>Supply chain companies committed to Kumamoto</Text>
            </View>
            <View style={s.statBox}>
              <Text style={s.statValue}>12-15%</Text>
              <Text style={s.statLabel}>Target IRR over 4-5 years</Text>
            </View>
          </View>
        </View>
      </View>
      <PageFooter pageNumber={5} />
    </View>
  );
}

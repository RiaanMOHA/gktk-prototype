import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { PageHeader, PageFooter } from '../page-chrome';
import { shared, C } from '../page-styles';
import { MAP_STEPS } from '@/data/mapSteps';

const s = StyleSheet.create({
  ...shared,
  subheading: { fontFamily: 'Noto Sans JP', fontSize: 10, color: C.caption, marginBottom: 20 },
  stepTitle: { fontFamily: 'REM', fontWeight: 600, fontSize: 11, color: C.heading, marginBottom: 4 },
  stepBody: { fontFamily: 'Noto Sans JP', fontSize: 9, lineHeight: 1.55, color: C.body, marginBottom: 14 },
  statValue: { ...shared.statValue, fontSize: 20 },
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

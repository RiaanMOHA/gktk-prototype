import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { PageHeader, PageFooter } from '../page-chrome';
import { shared, C } from '../page-styles';

const s = StyleSheet.create({
  ...shared,
  heading: { ...shared.heading, fontSize: 24, marginBottom: 8 },
  subheading: { fontFamily: 'REM', fontWeight: 600, fontSize: 14, color: C.subheading, marginBottom: 20 },
  bodyCol: { flexDirection: 'row', gap: 40 },
  body: { ...shared.body, fontSize: 10, lineHeight: 1.65, marginBottom: 0 },
  statsRow: { flexDirection: 'row', gap: 20, marginTop: 24 },
  statBox: { ...shared.statBox, flex: 1, padding: 14, marginBottom: 0 },
  statValue: { ...shared.statValue, fontSize: 22, marginBottom: 4 },
});

export default function ExecutiveSummaryPage() {
  return (
    <View style={s.page}>
      <PageHeader sectionLabel="01 | Executive summary" />

      <View style={s.content}>
        <Text style={s.heading}>Why Kumamoto, why now?</Text>
        <Text style={s.subheading}>Japan{"'"}s fastest-rising property market</Text>

        <View style={s.bodyCol}>
          <View style={s.col}>
            <Text style={s.body}>
              High-yield serviced apartments in Kumamoto{"'"}s TSMC / JASM semiconductor hub, housing Taiwanese engineers, targeting 12-15% IRR in 4-5 years.
            </Text>
          </View>
          <View style={s.col}>
            <Text style={s.body}>
              The COVID-era chip shortage exposed a hard truth: semiconductor security is national security. Now, Japan is investing over 10 trillion yen to rebuild its chip industry. With over 47,000 jobs being created, Kumamoto is set to attract waves of high-income engineers, fueling real estate growth for decades.
            </Text>
          </View>
        </View>

        <View style={s.statsRow}>
          <View style={s.statBox}>
            <Text style={s.statValue}>10T+ yen</Text>
            <Text style={s.statLabel}>Government semiconductor subsidy</Text>
          </View>
          <View style={s.statBox}>
            <Text style={s.statValue}>47,000+</Text>
            <Text style={s.statLabel}>New jobs in the corridor</Text>
          </View>
          <View style={s.statBox}>
            <Text style={s.statValue}>12-15%</Text>
            <Text style={s.statLabel}>Target IRR</Text>
          </View>
          <View style={s.statBox}>
            <Text style={s.statValue}>100 units</Text>
            <Text style={s.statLabel}>Serviced apartments</Text>
          </View>
        </View>
      </View>

      <PageFooter pageNumber={3} />
    </View>
  );
}

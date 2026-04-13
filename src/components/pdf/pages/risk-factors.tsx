import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { PageHeader, PageFooter } from '../page-chrome';
import { shared, C } from '../page-styles';
import { RISK_PANELS, HSINCHU_PARALLEL } from '@/data/riskPanels';

const s = StyleSheet.create({
  ...shared,
  subheading: { fontFamily: 'Noto Sans JP', fontSize: 8, color: C.caption, marginBottom: 12 },
  twoCol: { flexDirection: 'row', gap: 30 },
  colHeading: { fontFamily: 'REM', fontWeight: 600, fontSize: 10, color: C.amber600, marginBottom: 8 },
  phaseYear: { fontFamily: 'REM', fontWeight: 600, fontSize: 8, color: C.heading, marginBottom: 2 },
  phaseBody: { fontFamily: 'Noto Sans JP', fontSize: 7, lineHeight: 1.45, color: C.body, marginBottom: 8 },
  metricBox: { backgroundColor: C.amber50, borderRadius: 3, padding: 6, marginBottom: 4 },
  metricBoxAlt: { backgroundColor: C.neutral100, borderRadius: 3, padding: 6, marginBottom: 4 },
  metricValue: { fontFamily: 'REM', fontWeight: 600, fontSize: 14, color: C.heading },
  metricLabel: { fontFamily: 'Noto Sans JP', fontSize: 7, color: C.caption },
  positionBox: { backgroundColor: C.amber50, borderRadius: 4, padding: 10, marginTop: 8 },
  positionText: { fontFamily: 'Noto Sans JP', fontSize: 8, lineHeight: 1.5, color: C.body },
  // Risk panels page
  riskGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  riskCard: { width: '48%', borderWidth: 0.5, borderColor: C.neutral200, borderRadius: 4, padding: 8, marginBottom: 4 },
  riskTitle: { fontFamily: 'REM', fontWeight: 600, fontSize: 8, color: C.heading, marginBottom: 3 },
  riskQ: { fontFamily: 'REM', fontWeight: 600, fontSize: 7, color: C.heading, marginBottom: 3 },
  riskA: { fontFamily: 'Noto Sans JP', fontSize: 7, lineHeight: 1.4, color: C.body, marginBottom: 4 },
  evidenceBox: { backgroundColor: C.amber50, borderRadius: 3, padding: 5 },
  evidenceLabel: { fontFamily: 'Noto Sans JP', fontSize: 6, color: C.caption, marginBottom: 1 },
  evidenceStat: { fontFamily: 'REM', fontWeight: 600, fontSize: 12, color: C.heading, marginBottom: 1 },
  evidenceDesc: { fontFamily: 'Noto Sans JP', fontSize: 6, color: C.caption },
});

export function RiskHsinchuPage() {
  return (
    <View style={s.page}>
      <PageHeader sectionLabel="08 | Risk factors - Hsinchu precedent" />
      <View style={s.content}>
        <Text style={s.heading}>Kumamoto-Hsinchu parallel timeline</Text>
        <View style={s.twoCol}>
          <View style={s.col}>
            <Text style={s.colHeading}>Kumamoto (2024-2035)</Text>
            {HSINCHU_PARALLEL.kumamoto.phases.map((p, i) => (
              <View key={i}>
                <Text style={s.phaseYear}>{p.period}</Text>
                <Text style={s.phaseBody}>{p.description}</Text>
              </View>
            ))}
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {HSINCHU_PARALLEL.kumamoto.metrics.map((m, i) => (
                <View key={i} style={[s.metricBox, { flex: 1 }]}>
                  <Text style={s.metricValue}>{m.value}</Text>
                  <Text style={s.metricLabel}>{m.label}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={s.col}>
            <Text style={[s.colHeading, { color: C.caption }]}>Hsinchu (2004-2018)</Text>
            {HSINCHU_PARALLEL.hsinchu.phases.map((p, i) => (
              <View key={i}>
                <Text style={s.phaseYear}>{p.period}</Text>
                <Text style={s.phaseBody}>{p.description}</Text>
              </View>
            ))}
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {HSINCHU_PARALLEL.hsinchu.metrics.map((m, i) => (
                <View key={i} style={[s.metricBoxAlt, { flex: 1 }]}>
                  <Text style={s.metricValue}>{m.value}</Text>
                  <Text style={s.metricLabel}>{m.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={s.positionBox}>
          <Text style={s.positionText}>{HSINCHU_PARALLEL.positioningStatement}</Text>
        </View>
      </View>
      <PageFooter pageNumber={19} />
    </View>
  );
}

export function RiskPanelsPage() {
  return (
    <View style={s.page}>
      <PageHeader sectionLabel="08 | Risk factors and hedges" />
      <View style={s.content}>
        <Text style={s.heading}>Risk factors and hedges</Text>
        <Text style={s.subheading}>Every investment carries risk. Here is how this one is structured to mitigate them.</Text>
        <View style={s.riskGrid}>
          {RISK_PANELS.map((panel) => (
            <View key={panel.id} style={s.riskCard}>
              <Text style={s.riskTitle}>{panel.title}</Text>
              <Text style={s.riskQ}>{panel.question}</Text>
              <Text style={s.riskA}>{panel.answer}</Text>
              <View style={s.evidenceBox}>
                <Text style={s.evidenceLabel}>{panel.evidence.label}</Text>
                <Text style={s.evidenceStat}>{panel.evidence.stat}</Text>
                <Text style={s.evidenceDesc}>{panel.evidence.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      <PageFooter pageNumber={20} />
    </View>
  );
}

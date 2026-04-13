import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { PageHeader, PageFooter } from '../page-chrome';
import { shared, C } from '../page-styles';
import { PAIN_POINTS, PERSONA_STAT, PERSONA_HEADING, PERSONA_CONCEPT, PERSONA_MESSAGE } from '@/data/painPoints';

const s = StyleSheet.create({
  ...shared,
  categoryLabel: { fontFamily: 'REM', fontWeight: 600, fontSize: 10, color: C.amber600, marginBottom: 10 },
  painTitle: { fontFamily: 'REM', fontWeight: 600, fontSize: 9, color: C.heading, marginBottom: 2 },
  painBody: { fontFamily: 'Noto Sans JP', fontSize: 8, lineHeight: 1.5, color: C.body, marginBottom: 2 },
  painCompanies: { fontFamily: 'Noto Sans JP', fontSize: 7, color: C.caption, marginBottom: 10 },
  statBox: { ...shared.statBox, marginBottom: 16 },
});

export function TargetTenantPage1() {
  return (
    <View style={s.page}>
      <PageHeader sectionLabel="03 | Target tenant" />
      <View style={s.content}>
        <View style={s.statBox}>
          <Text style={s.statValue}>{PERSONA_STAT.value}</Text>
          <Text style={s.statLabel}>{PERSONA_STAT.label}</Text>
        </View>
        <Text style={s.heading}>{PERSONA_HEADING}</Text>
        <View style={s.twoCol}>
          <View style={s.col}>
            <Text style={s.body}>{PERSONA_CONCEPT}</Text>
          </View>
          <View style={s.col}>
            <Text style={s.body}>{PERSONA_MESSAGE}</Text>
          </View>
        </View>
      </View>
      <PageFooter pageNumber={7} />
    </View>
  );
}

export function TargetTenantPage2() {
  const physical = PAIN_POINTS.filter((p) => p.category === 'physical');
  const mental = PAIN_POINTS.filter((p) => p.category === 'mental');

  return (
    <View style={s.page}>
      <PageHeader sectionLabel="03 | Target tenant - pain points" />
      <View style={s.content}>
        <Text style={s.heading}>Pain points</Text>
        <View style={s.twoCol}>
          <View style={s.col}>
            <Text style={s.categoryLabel}>Physical</Text>
            {physical.map((p) => (
              <View key={p.id}>
                <Text style={s.painTitle}>{p.title}</Text>
                <Text style={s.painBody}>{p.description}</Text>
                <Text style={s.painCompanies}>Companies: {p.companies.join(', ')}</Text>
              </View>
            ))}
          </View>
          <View style={s.col}>
            <Text style={s.categoryLabel}>Mental</Text>
            {mental.map((p) => (
              <View key={p.id}>
                <Text style={s.painTitle}>{p.title}</Text>
                <Text style={s.painBody}>{p.description}</Text>
                <Text style={s.painCompanies}>Companies: {p.companies.join(', ')}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      <PageFooter pageNumber={8} />
    </View>
  );
}

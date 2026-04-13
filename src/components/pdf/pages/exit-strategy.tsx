import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { PageHeader, PageFooter } from '../page-chrome';
import { shared, C } from '../page-styles';
import { EXIT_PATHS, BUILT_IN_OPTIONALITY } from '@/data/exitStrategy';

const s = StyleSheet.create({
  ...shared,
  subheading: { fontFamily: 'Noto Sans JP', fontSize: 9, color: C.caption, marginBottom: 20 },
  pathBox: { backgroundColor: C.amber50, borderRadius: 4, padding: 16 },
  pathTitle: { fontFamily: 'REM', fontWeight: 600, fontSize: 11, color: C.heading, marginBottom: 8 },
  pathBody: { fontFamily: 'Noto Sans JP', fontSize: 9, lineHeight: 1.55, color: C.body },
  optionalitySection: { marginTop: 24, borderTopWidth: 0.5, borderTopColor: C.neutral200, paddingTop: 16 },
  optionalityHeading: { fontFamily: 'REM', fontWeight: 600, fontSize: 11, color: C.heading, marginBottom: 8 },
  optionalityBody: { fontFamily: 'Noto Sans JP', fontSize: 9, lineHeight: 1.55, color: C.body },
});

export default function ExitStrategyPage() {
  return (
    <View style={s.page}>
      <PageHeader sectionLabel="09 | Exit strategy" />
      <View style={s.content}>
        <Text style={s.heading}>Exit strategy</Text>
        <Text style={s.subheading}>Two structured paths to liquidity, plus built-in asset flexibility.</Text>
        <View style={s.twoCol}>
          {EXIT_PATHS.map((path) => (
            <View key={path.id} style={s.col}>
              <View style={s.pathBox}>
                <Text style={s.pathTitle}>Path {path.id}: {path.title}</Text>
                <Text style={s.pathBody}>{path.body}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={s.optionalitySection}>
          <Text style={s.optionalityHeading}>Built-in optionality</Text>
          <Text style={s.optionalityBody}>{BUILT_IN_OPTIONALITY}</Text>
        </View>
      </View>
      <PageFooter pageNumber={22} />
    </View>
  );
}

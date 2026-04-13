import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { PageHeader, PageFooter } from '../page-chrome';
import { shared, C } from '../page-styles';
import { CURRENT_OPTIONS } from '@/data/dealStructure';

const s = StyleSheet.create({
  ...shared,
  heading: { ...shared.heading, marginBottom: 16 },
  subheading: { fontFamily: 'REM', fontWeight: 600, fontSize: 12, color: C.heading, marginBottom: 8 },
  body: { ...shared.body, marginBottom: 10 },
  takeaway: { backgroundColor: C.amber50, borderRadius: 4, padding: 10, marginTop: 8 },
  takeawayText: { fontFamily: 'REM', fontWeight: 600, fontSize: 9, color: C.heading },
  gapHeading: { fontFamily: 'REM', fontWeight: 600, fontSize: 10, color: C.heading, marginTop: 12, marginBottom: 6 },
});

export default function CurrentOptionsPage() {
  return (
    <View style={s.page}>
      <PageHeader sectionLabel="04 | Current options" />
      <View style={s.content}>
        <Text style={s.heading}>Current market landscape</Text>
        <View style={s.twoCol}>
          <View style={s.col}>
            <Text style={s.subheading}>{CURRENT_OPTIONS.marketProof.heading}</Text>
            <Text style={s.body}>{CURRENT_OPTIONS.marketProof.body}</Text>
            <View style={s.takeaway}>
              <Text style={s.takeawayText}>{CURRENT_OPTIONS.marketProof.takeaway}</Text>
            </View>
          </View>
          <View style={s.col}>
            <Text style={s.subheading}>{CURRENT_OPTIONS.closestCompetitor.heading}</Text>
            <Text style={s.body}>{CURRENT_OPTIONS.closestCompetitor.body}</Text>
            <Text style={s.gapHeading}>Gap analysis</Text>
            <Text style={s.body}>{CURRENT_OPTIONS.closestCompetitor.gapAnalysis}</Text>
          </View>
        </View>
      </View>
      <PageFooter pageNumber={10} />
    </View>
  );
}

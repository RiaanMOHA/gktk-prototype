import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { PageHeader, PageFooter } from '../page-chrome';
import { shared, C } from '../page-styles';
import { FINANCIAL_DATA, DEAL_STRUCTURE, FUND_TERMS, type Scenario, type ExitYear } from '@/data/financials';

function formatYen(n: number): string {
  return '¥' + n.toLocaleString('en-US');
}

const s = StyleSheet.create({
  ...shared,
  heading: { ...shared.heading, marginBottom: 4 },
  subheading: { fontFamily: 'Noto Sans JP', fontSize: 8, color: C.caption, marginBottom: 12 },
  twoCol: { flexDirection: 'row', gap: 30 },
  // Table
  tHeader: { flexDirection: 'row', backgroundColor: C.amber, borderTopLeftRadius: 3, borderTopRightRadius: 3 },
  tHeaderCell: { fontFamily: 'REM', fontWeight: 600, fontSize: 7, color: C.black, padding: 4 },
  tRow: { flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: C.neutral100 },
  tRowHL: { flexDirection: 'row', backgroundColor: C.amber50, borderBottomWidth: 0.5, borderBottomColor: C.amber100 },
  tCell: { fontFamily: 'Noto Sans JP', fontSize: 7, color: C.body, padding: 4 },
  tCellBold: { fontFamily: 'REM', fontWeight: 600, fontSize: 7, color: C.heading, padding: 4 },
  // Deal structure
  dsHeading: { fontFamily: 'REM', fontWeight: 600, fontSize: 12, color: C.heading, marginBottom: 8 },
  dsRow: { flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: C.neutral100, paddingVertical: 4 },
  dsLabel: { fontFamily: 'Noto Sans JP', fontSize: 8, color: C.body, width: '55%' },
  dsValue: { fontFamily: 'REM', fontWeight: 600, fontSize: 8, color: C.heading, width: '45%', textAlign: 'right' },
  dsValueNormal: { fontFamily: 'Noto Sans JP', fontSize: 8, color: C.body, width: '45%', textAlign: 'right' },
  footer: { fontFamily: 'Noto Sans JP', fontSize: 7, color: C.caption, marginTop: 8 },
});

const scenarios: Scenario[] = ['bull', 'normal', 'bear'];
const years: ExitYear[] = ['3Y', '4Y', '5Y', '6Y'];
const cw = { s: '9%', y: '7%', rPre: '15%', rPost: '15%', emPre: '9%', emPost: '9%', iPre: '11%', iPost: '11%' };

export function FinancialsPage1() {
  return (
    <View style={s.page}>
      <PageHeader sectionLabel="07 | Financial projections" />
      <View style={s.content}>
        <Text style={s.heading}>Return projections</Text>
        <Text style={s.subheading}>Based on 1 billion yen equity investment in a 2 billion yen project (50/50 debt-equity structure).</Text>
        <View>
          <View style={s.tHeader}>
            <Text style={[s.tHeaderCell, { width: cw.s }]}>Scenario</Text>
            <Text style={[s.tHeaderCell, { width: cw.y }]}>Exit</Text>
            <Text style={[s.tHeaderCell, { width: cw.rPre, textAlign: 'right' }]}>Return (pre)</Text>
            <Text style={[s.tHeaderCell, { width: cw.rPost, textAlign: 'right' }]}>Return (post)</Text>
            <Text style={[s.tHeaderCell, { width: cw.emPre, textAlign: 'right' }]}>EM (pre)</Text>
            <Text style={[s.tHeaderCell, { width: cw.emPost, textAlign: 'right' }]}>EM (post)</Text>
            <Text style={[s.tHeaderCell, { width: cw.iPre, textAlign: 'right' }]}>IRR (pre)</Text>
            <Text style={[s.tHeaderCell, { width: cw.iPost, textAlign: 'right' }]}>IRR (post)</Text>
          </View>
          {scenarios.map((sc) =>
            years.map((yr, yi) => {
              const d = FINANCIAL_DATA[sc][yr];
              const isHL = sc === 'normal' && yr === '5Y';
              return (
                <View key={`${sc}-${yr}`} style={isHL ? s.tRowHL : s.tRow}>
                  <Text style={[s.tCellBold, { width: cw.s }]}>{yi === 0 ? sc : ''}</Text>
                  <Text style={[s.tCell, { width: cw.y }]}>{yr}</Text>
                  <Text style={[s.tCell, { width: cw.rPre, textAlign: 'right' }]}>{formatYen(d.return_pre)}</Text>
                  <Text style={[s.tCell, { width: cw.rPost, textAlign: 'right' }]}>{formatYen(d.return_post)}</Text>
                  <Text style={[s.tCell, { width: cw.emPre, textAlign: 'right' }]}>{d.em_pre.toFixed(2)}x</Text>
                  <Text style={[s.tCell, { width: cw.emPost, textAlign: 'right' }]}>{d.em_post.toFixed(2)}x</Text>
                  <Text style={[s.tCellBold, { width: cw.iPre, textAlign: 'right' }]}>{d.irr_pre}</Text>
                  <Text style={[s.tCellBold, { width: cw.iPost, textAlign: 'right' }]}>{d.irr_post}</Text>
                </View>
              );
            })
          )}
        </View>
      </View>
      <PageFooter pageNumber={16} />
    </View>
  );
}

export function FinancialsPage2() {
  return (
    <View style={s.page}>
      <PageHeader sectionLabel="07 | Deal structure and fund terms" />
      <View style={s.content}>
        <View style={s.twoCol}>
          <View style={s.col}>
            <Text style={s.dsHeading}>Deal structure</Text>
            <View style={s.dsRow}>
              <Text style={s.dsLabel}>Total project</Text>
              <Text style={s.dsValue}>{formatYen(DEAL_STRUCTURE.totalProject)}</Text>
            </View>
            <View style={s.dsRow}>
              <Text style={s.dsLabel}>Debt / equity</Text>
              <Text style={s.dsValueNormal}>{DEAL_STRUCTURE.debtEquityRatio}</Text>
            </View>
            {DEAL_STRUCTURE.equitySplit.map((split, i) => (
              <View key={i} style={s.dsRow}>
                <Text style={s.dsLabel}>{split.investor} ({split.percentage}%)</Text>
                <Text style={s.dsValue}>{formatYen(split.amount)}</Text>
              </View>
            ))}
            <View style={s.dsRow}>
              <Text style={s.dsLabel}>Preferred return</Text>
              <Text style={s.dsValueNormal}>{DEAL_STRUCTURE.preferredReturn}</Text>
            </View>
            <View style={s.dsRow}>
              <Text style={s.dsLabel}>GP promote</Text>
              <Text style={s.dsValueNormal}>{DEAL_STRUCTURE.gpPromote}</Text>
            </View>
            <View style={[s.dsRow, { backgroundColor: C.amber50 }]}>
              <Text style={s.dsLabel}>Effective tax rate</Text>
              <Text style={s.dsValue}>{DEAL_STRUCTURE.taxRate}</Text>
            </View>
          </View>
          <View style={s.col}>
            <Text style={s.dsHeading}>Indicative fund terms (Oakwater)</Text>
            {Object.entries(FUND_TERMS).map(([key, val]) => (
              <View key={key} style={s.dsRow}>
                <Text style={s.dsLabel}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())}</Text>
                <Text style={s.dsValueNormal}>{val}</Text>
              </View>
            ))}
            <Text style={s.footer}>Indicative only. Terms are subject to change and final investor agreement.</Text>
          </View>
        </View>
      </View>
      <PageFooter pageNumber={17} />
    </View>
  );
}

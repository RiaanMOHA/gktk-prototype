import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { PageHeader, PageFooter } from '../page-chrome';
import { shared, C } from '../page-styles';
import { HARDWARE_SPECS, INVESTMENT_PROPERTIES, VIRTUAL_TOUR_ROOMS } from '@/data/productSpecs';

const s = StyleSheet.create({
  ...shared,
  heading: { ...shared.heading, marginBottom: 16 },
  // Table
  tableHeader: { flexDirection: 'row', backgroundColor: C.amber, borderTopLeftRadius: 3, borderTopRightRadius: 3 },
  tableHeaderCell: { fontFamily: 'REM', fontWeight: 600, fontSize: 8, color: C.black, padding: 6 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: C.neutral100 },
  tableRowAlt: { flexDirection: 'row', backgroundColor: C.amber50, borderBottomWidth: 0.5, borderBottomColor: C.neutral100 },
  cellLabel: { fontFamily: 'REM', fontWeight: 600, fontSize: 8, color: C.heading, padding: 6, width: '35%' },
  cellValue: { fontFamily: 'Noto Sans JP', fontSize: 8, color: C.body, padding: 6, width: '65%' },
  // Properties
  subheading: { fontFamily: 'REM', fontWeight: 600, fontSize: 11, color: C.heading, marginBottom: 8 },
  propertyName: { fontFamily: 'Noto Sans JP', fontSize: 9, color: C.body, marginBottom: 4 },
  roomName: { fontFamily: 'Noto Sans JP', fontSize: 8, color: C.body, marginBottom: 3 },
  roomNote: { fontFamily: 'Noto Sans JP', fontSize: 7, color: C.caption },
});

export default function ProductHardwarePage() {
  return (
    <View style={s.page}>
      <PageHeader sectionLabel="05 | Product: hardware" />
      <View style={s.content}>
        <Text style={s.heading}>Hardware</Text>
        <View style={s.twoCol}>
          <View style={s.col}>
            <View>
              <View style={s.tableHeader}>
                <Text style={[s.tableHeaderCell, { width: '35%' }]}>Specification</Text>
                <Text style={[s.tableHeaderCell, { width: '65%' }]}>Detail</Text>
              </View>
              {HARDWARE_SPECS.map((spec, i) => (
                <View key={i} style={i % 2 === 0 ? s.tableRow : s.tableRowAlt}>
                  <Text style={s.cellLabel}>{spec.label}</Text>
                  <Text style={s.cellValue}>{spec.value}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={s.col}>
            <Text style={s.subheading}>Investment properties</Text>
            {INVESTMENT_PROPERTIES.map((name, i) => (
              <Text key={i} style={s.propertyName}>{name}</Text>
            ))}
            <Text style={[s.subheading, { marginTop: 16 }]}>Virtual tour rooms</Text>
            {VIRTUAL_TOUR_ROOMS.map((room) => (
              <View key={room.id} style={{ marginBottom: 4 }}>
                <Text style={s.roomName}>{room.name}</Text>
                {room.note ? <Text style={s.roomNote}>{room.note}</Text> : null}
              </View>
            ))}
          </View>
        </View>
      </View>
      <PageFooter pageNumber={12} />
    </View>
  );
}

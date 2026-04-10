import { View, Text, StyleSheet } from '@react-pdf/renderer';
import LogoPDF from '../logo-pdf';
import LogoMarkPDF from '../logo-mark-pdf';
import { BRAND } from '../brand';

const s = StyleSheet.create({
  page: {
    position: 'relative',
    width: BRAND.page.width,
    height: BRAND.page.height,
    backgroundColor: BRAND.colors.background,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: BRAND.page.width,
    height: 56,
    borderBottomWidth: 1.5,
    borderBottomColor: BRAND.colors.amber,
  },
  logoHeader: {
    position: 'absolute',
    left: 40,
    top: 13,
  },
  yearTop: {
    position: 'absolute',
    right: 40,
    top: 18,
    fontFamily: 'Noto Sans JP',
    fontSize: 12,
    color: BRAND.colors.caption,
  },
  center: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: BRAND.colors.neutral200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contact: {
    position: 'absolute',
    left: 80,
    bottom: 40,
  },
  companyName: {
    fontFamily: 'REM',
    fontWeight: 600,
    fontSize: 12,
    color: BRAND.colors.heading,
    marginBottom: 4,
  },
  contactLine: {
    fontFamily: 'Noto Sans JP',
    fontSize: 9,
    color: BRAND.colors.caption,
    marginBottom: 2,
  },
  disclaimer: {
    position: 'absolute',
    right: 80,
    bottom: 40,
    fontFamily: 'Noto Sans JP',
    fontSize: 9,
    color: BRAND.colors.caption,
  },
});

export default function BackPage() {
  return (
    <View style={s.page}>
      <View style={s.header}>
        <View style={s.logoHeader}>
          <LogoPDF height={24} />
        </View>
        <Text style={s.yearTop}>{BRAND.year}</Text>
      </View>

      <View style={s.center}>
        <View style={s.logoCircle}>
          <LogoMarkPDF size={70} />
        </View>
      </View>

      <View style={s.contact}>
        <Text style={s.companyName}>MoreHarvest</Text>
        <Text style={s.contactLine}>Hello@moreharvest.com</Text>
        <Text style={s.contactLine}>www.moreharvest.com</Text>
      </View>

      <Text style={s.disclaimer}>Confidential. For qualified investors only.</Text>
    </View>
  );
}

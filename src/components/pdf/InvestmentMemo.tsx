import { Document, Page } from '@react-pdf/renderer';
import { BRAND } from './brand';
import CoverPage from './pages/cover';
import SectionDividerPage from './pages/section-divider';
import ExecutiveSummaryPage from './pages/executive-summary';
import MarketContextPage from './pages/market-context';
import { TargetTenantPage1, TargetTenantPage2 } from './pages/target-tenant';
import CurrentOptionsPage from './pages/current-options';
import ProductHardwarePage from './pages/product-hardware';
import ProductSoftwarePage from './pages/product-software';
import { FinancialsPage1, FinancialsPage2 } from './pages/financials';
import { RiskHsinchuPage, RiskPanelsPage } from './pages/risk-factors';
import ExitStrategyPage from './pages/exit-strategy';
import BackPage from './pages/back-page';

const SIZE: [number, number] = [BRAND.page.width, BRAND.page.height];
const pageStyle = { width: BRAND.page.width, height: BRAND.page.height };

export default function InvestmentMemo() {
  return (
    <Document title="MoreHarvest Investment Memo - Kumamoto" author="MoreHarvest">
      {/* 1. Cover */}
      <Page size={SIZE} style={pageStyle}><CoverPage /></Page>

      {/* 2. Executive summary */}
      <Page size={SIZE} style={pageStyle}><SectionDividerPage number="01" title="Executive summary" /></Page>
      <Page size={SIZE} style={pageStyle}><ExecutiveSummaryPage /></Page>

      {/* 3. Market context */}
      <Page size={SIZE} style={pageStyle}><SectionDividerPage number="02" title="Market context" /></Page>
      <Page size={SIZE} style={pageStyle}><MarketContextPage /></Page>

      {/* 4. Target tenant */}
      <Page size={SIZE} style={pageStyle}><SectionDividerPage number="03" title="Target tenant" /></Page>
      <Page size={SIZE} style={pageStyle}><TargetTenantPage1 /></Page>
      <Page size={SIZE} style={pageStyle}><TargetTenantPage2 /></Page>

      {/* 5. Current options */}
      <Page size={SIZE} style={pageStyle}><SectionDividerPage number="04" title="Current options" /></Page>
      <Page size={SIZE} style={pageStyle}><CurrentOptionsPage /></Page>

      {/* 6. Product: hardware */}
      <Page size={SIZE} style={pageStyle}><SectionDividerPage number="05" title="Product: hardware" /></Page>
      <Page size={SIZE} style={pageStyle}><ProductHardwarePage /></Page>

      {/* 7. Product: software */}
      <Page size={SIZE} style={pageStyle}><SectionDividerPage number="06" title="Product: software" /></Page>
      <Page size={SIZE} style={pageStyle}><ProductSoftwarePage /></Page>

      {/* 8. Financial projections */}
      <Page size={SIZE} style={pageStyle}><SectionDividerPage number="07" title="Financial projections" /></Page>
      <Page size={SIZE} style={pageStyle}><FinancialsPage1 /></Page>
      <Page size={SIZE} style={pageStyle}><FinancialsPage2 /></Page>

      {/* 9. Risk factors */}
      <Page size={SIZE} style={pageStyle}><SectionDividerPage number="08" title="Risk factors" /></Page>
      <Page size={SIZE} style={pageStyle}><RiskHsinchuPage /></Page>
      <Page size={SIZE} style={pageStyle}><RiskPanelsPage /></Page>

      {/* 10. Exit strategy */}
      <Page size={SIZE} style={pageStyle}><SectionDividerPage number="09" title="Exit strategy" /></Page>
      <Page size={SIZE} style={pageStyle}><ExitStrategyPage /></Page>

      {/* 11. Back page */}
      <Page size={SIZE} style={pageStyle}><BackPage /></Page>
    </Document>
  );
}

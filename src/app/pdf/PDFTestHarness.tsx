'use client';

import { useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import InvestmentMemo from '@/components/pdf/InvestmentMemo';
import { generatePDF } from '@/components/pdf/generatePDF';

export default function PDFTestHarness() {
  const [downloading, setDownloading] = useState(false);

  async function handleDownload() {
    setDownloading(true);
    try {
      await generatePDF();
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '8px 16px', background: '#1E1F20', display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontFamily: 'sans-serif', fontSize: '12px', color: '#8E8F8F' }}>PDF test harness</span>
        <button
          onClick={handleDownload}
          disabled={downloading}
          style={{
            background: downloading ? '#5B616E' : '#FBB931',
            color: downloading ? '#8E8F8F' : '#1E1F20',
            border: 'none',
            borderRadius: 6,
            padding: '6px 16px',
            fontSize: '12px',
            fontFamily: 'sans-serif',
            cursor: downloading ? 'not-allowed' : 'pointer',
          }}
        >
          {downloading ? 'Generating...' : 'Download PDF'}
        </button>
      </div>
      <PDFViewer style={{ flex: 1, border: 'none' }} showToolbar={false}>
        <InvestmentMemo />
      </PDFViewer>
    </div>
  );
}

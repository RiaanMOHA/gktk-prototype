'use client';

import dynamic from 'next/dynamic';

const PDFTestHarness = dynamic(() => import('./PDFTestHarness'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F9F9F9' }}>
      <p style={{ fontFamily: 'sans-serif', fontSize: '14px', color: '#5B616E' }}>Loading PDF...</p>
    </div>
  ),
});

export default function PDFTestPage() {
  return <PDFTestHarness />;
}

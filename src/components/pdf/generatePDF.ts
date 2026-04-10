import { pdf } from '@react-pdf/renderer';
import { createElement } from 'react';
import InvestmentMemo from './InvestmentMemo';

export async function generatePDF(): Promise<void> {
  const doc = createElement(InvestmentMemo);
  const blob = await pdf(doc).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'MoreHarvest-Investment-Memo-Kumamoto.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

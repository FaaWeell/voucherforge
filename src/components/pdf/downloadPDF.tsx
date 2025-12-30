'use client';

import { pdf } from '@react-pdf/renderer';
import { InvoiceDocument } from './InvoiceDocument';
import { InvoiceFormData } from '@/types/invoice';

/**
 * Generate and download PDF
 */
export async function downloadPDF(data: InvoiceFormData): Promise<void> {
    const blob = await pdf(<InvoiceDocument data={data} />).toBlob();

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.invoiceNumber || 'invoice'}.pdf`;

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

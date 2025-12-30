'use client';

import { useState } from 'react';
import { Header } from '@/components/ui/Header';
import { PrivacyNotice } from '@/components/ui/PrivacyNotice';
import { CompanyForm } from '@/components/editor/CompanyForm';
import { ClientForm } from '@/components/editor/ClientForm';
import { InvoiceMetaForm } from '@/components/editor/InvoiceMetaForm';
import { ItemsTable } from '@/components/editor/ItemsTable';
import { FinancialsForm } from '@/components/editor/FinancialsForm';
import { NotesForm } from '@/components/editor/NotesForm';
import { PDFPreview } from '@/components/pdf/PDFPreview';
import { downloadPDF } from '@/components/pdf/downloadPDF';
import { useInvoiceStore } from '@/stores/invoiceStore';

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { formData } = useInvoiceStore();

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await downloadPDF(formData);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('Gagal membuat PDF. Silakan coba lagi.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="app-container">
      {/* Editor Panel */}
      <div className="editor-panel">
        <Header onDownload={handleDownload} isGenerating={isGenerating} />

        <InvoiceMetaForm />
        <CompanyForm />
        <ClientForm />
        <ItemsTable />
        <FinancialsForm />
        <NotesForm />
      </div>

      {/* Preview Panel */}
      <div className="preview-panel">
        <div className="preview-header" style={{ width: '100%', marginBottom: '1rem' }}>
          <h2 className="preview-title">Live Preview</h2>
        </div>
        <PDFPreview />
      </div>

      {/* Privacy Notice */}
      <PrivacyNotice />
    </div>
  );
}

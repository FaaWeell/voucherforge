'use client';

import { FileText, RotateCcw, Download, Sparkles } from 'lucide-react';
import { useInvoiceStore } from '@/stores/invoiceStore';

interface HeaderProps {
    onDownload: () => void;
    isGenerating: boolean;
}

export function Header({ onDownload, isGenerating }: HeaderProps) {
    const { loadDemoData, resetForm } = useInvoiceStore();

    return (
        <header className="app-header">
            <div className="app-logo">
                <FileText size={24} strokeWidth={2} />
                <h1>VoucherForge</h1>
                <span>PDF Invoice Generator</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-secondary btn-sm" onClick={loadDemoData}>
                    <Sparkles size={14} />
                    Demo Data
                </button>
                <button className="btn btn-secondary btn-sm" onClick={resetForm}>
                    <RotateCcw size={14} />
                    Reset
                </button>
                <button
                    className="btn btn-primary btn-sm"
                    onClick={onDownload}
                    disabled={isGenerating}
                >
                    <Download size={14} />
                    {isGenerating ? 'Generating...' : 'Download PDF'}
                </button>
            </div>
        </header>
    );
}

'use client';

import React, { useState, useEffect } from 'react';
import { useInvoiceStore } from '@/stores/invoiceStore';
import { FileWarning, Loader2 } from 'lucide-react';
import { InvoiceFormData } from '@/types/invoice';

function PreviewLoading() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                minHeight: '600px',
                color: 'var(--color-text-secondary)',
            }}
        >
            <Loader2 size={32} className="animate-spin" />
            <p style={{ marginTop: '1rem', fontSize: '0.875rem' }}>Loading preview...</p>
        </div>
    );
}

function PreviewError() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                minHeight: '600px',
                color: 'var(--color-text-secondary)',
                padding: '2rem',
                textAlign: 'center',
            }}
        >
            <FileWarning size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                Preview tidak tersedia
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                Silakan isi data invoice untuk melihat preview
            </p>
        </div>
    );
}

// Separate component that lazily loads PDF viewer
function LazyPDFViewer({ data }: { data: InvoiceFormData }) {
    const [PDFViewerComponent, setPDFViewerComponent] = useState<React.ComponentType<any> | null>(null);
    const [InvoiceDocComponent, setInvoiceDocComponent] = useState<React.ComponentType<{ data: InvoiceFormData }> | null>(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        async function loadPDFComponents() {
            try {
                // Import modules separately
                const rendererModule = await import('@react-pdf/renderer');
                const documentModule = await import('./InvoiceDocument');

                if (mounted) {
                    setPDFViewerComponent(() => rendererModule.PDFViewer);
                    setInvoiceDocComponent(() => documentModule.InvoiceDocument);
                    setLoading(false);
                }
            } catch (err) {
                console.error('Failed to load PDF components:', err);
                if (mounted) {
                    setError(true);
                    setLoading(false);
                }
            }
        }

        loadPDFComponents();

        return () => {
            mounted = false;
        };
    }, []);

    if (loading) {
        return <PreviewLoading />;
    }

    if (error || !PDFViewerComponent || !InvoiceDocComponent) {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    minHeight: '600px',
                    color: 'var(--color-text-secondary)',
                    padding: '2rem',
                    textAlign: 'center',
                }}
            >
                <FileWarning size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                <p style={{ fontSize: '0.875rem' }}>Gagal memuat preview PDF</p>
            </div>
        );
    }

    const PDFViewer = PDFViewerComponent;
    const InvoiceDocument = InvoiceDocComponent;

    return (
        <PDFViewer
            style={{
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: '0.5rem',
            }}
            showToolbar={false}
        >
            <InvoiceDocument data={data} />
        </PDFViewer>
    );
}

export function PDFPreview() {
    const { formData } = useInvoiceStore();
    const [isClient, setIsClient] = useState(false);
    const [debouncedData, setDebouncedData] = useState(formData);

    // Ensure we're on client side
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Debounce form data updates to prevent excessive re-renders
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedData(formData);
        }, 500);

        return () => clearTimeout(timer);
    }, [formData]);

    if (!isClient) {
        return <PreviewLoading />;
    }

    // Check if we have minimum data to show preview
    const hasMinimumData = debouncedData.items.some(
        (item) => item.description || item.unitPrice > 0
    );

    if (!hasMinimumData) {
        return <PreviewError />;
    }

    return (
        <div className="preview-container" style={{ height: '100%', minHeight: '800px' }}>
            <LazyPDFViewer data={debouncedData} />
        </div>
    );
}

'use client';

import { FileText, Calendar } from 'lucide-react';
import { useInvoiceStore } from '@/stores/invoiceStore';

export function InvoiceMetaForm() {
    const { formData, setFormData } = useInvoiceStore();

    return (
        <div className="card">
            <div className="card-header">
                <FileText size={16} />
                <h3 className="card-title">Detail Invoice</h3>
            </div>

            <div className="form-row-3">
                <div className="form-group">
                    <label className="form-label">Nomor Invoice</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="INV-2025-001"
                        value={formData.invoiceNumber}
                        onChange={(e) => setFormData({ invoiceNumber: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Tanggal</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="date"
                            className="form-input"
                            value={formData.createdDate}
                            onChange={(e) => setFormData({ createdDate: e.target.value })}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Jatuh Tempo</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="date"
                            className="form-input"
                            value={formData.dueDate}
                            onChange={(e) => setFormData({ dueDate: e.target.value })}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

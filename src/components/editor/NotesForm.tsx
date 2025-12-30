'use client';

import { StickyNote } from 'lucide-react';
import { useInvoiceStore } from '@/stores/invoiceStore';

export function NotesForm() {
    const { formData, setFormData } = useInvoiceStore();

    return (
        <div className="card">
            <div className="card-header">
                <StickyNote size={16} />
                <h3 className="card-title">Informasi Tambahan</h3>
            </div>

            <div className="form-group">
                <label className="form-label">Syarat Pembayaran</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="Net 30 hari"
                    value={formData.paymentTerms || ''}
                    onChange={(e) => setFormData({ paymentTerms: e.target.value })}
                />
            </div>

            <div className="form-row-3">
                <div className="form-group">
                    <label className="form-label">Nama Bank</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="BCA"
                        value={formData.bankName || ''}
                        onChange={(e) => setFormData({ bankName: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Nomor Rekening</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="1234567890"
                        value={formData.bankAccount || ''}
                        onChange={(e) => setFormData({ bankAccount: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Atas Nama</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="PT Example"
                        value={formData.accountHolder || ''}
                        onChange={(e) => setFormData({ accountHolder: e.target.value })}
                    />
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Catatan</label>
                <textarea
                    className="form-input"
                    rows={3}
                    placeholder="Terima kasih atas kepercayaan Anda..."
                    value={formData.notes || ''}
                    onChange={(e) => setFormData({ notes: e.target.value })}
                    style={{ resize: 'vertical' }}
                />
            </div>
        </div>
    );
}

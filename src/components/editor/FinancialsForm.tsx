'use client';

import { Calculator } from 'lucide-react';
import { useInvoiceStore } from '@/stores/invoiceStore';
import { calculateInvoiceTotals } from '@/lib/calculations';
import { formatRupiah } from '@/lib/formatters';

export function FinancialsForm() {
    const { formData, setFormData, setDiscount, setTaxRate } = useInvoiceStore();

    // Calculate totals
    const totals = calculateInvoiceTotals(
        formData.items,
        formData.taxRate,
        formData.discountType,
        formData.discountValue
    );

    const handleDiscountValueChange = (value: string) => {
        const numValue = parseFloat(value.replace(/[^\d]/g, '')) || 0;
        setDiscount(formData.discountType, numValue);
    };

    return (
        <div className="card">
            <div className="card-header">
                <Calculator size={16} />
                <h3 className="card-title">Kalkulasi</h3>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label className="form-label">Pajak (%)</label>
                    <input
                        type="number"
                        className="form-input"
                        placeholder="11"
                        min="0"
                        max="100"
                        value={formData.taxRate}
                        onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Tipe Diskon</label>
                    <select
                        className="form-select"
                        value={formData.discountType}
                        onChange={(e) =>
                            setDiscount(e.target.value as 'flat' | 'percentage', formData.discountValue)
                        }
                    >
                        <option value="flat">Nominal (Rp)</option>
                        <option value="percentage">Persentase (%)</option>
                    </select>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">
                    Nilai Diskon {formData.discountType === 'percentage' ? '(%)' : '(Rp)'}
                </label>
                <input
                    type="number"
                    className="form-input"
                    placeholder="0"
                    min="0"
                    max={formData.discountType === 'percentage' ? 100 : undefined}
                    value={formData.discountValue || ''}
                    onChange={(e) => handleDiscountValueChange(e.target.value)}
                />
            </div>

            {/* Summary */}
            <div
                style={{
                    marginTop: '1rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--color-border)',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '0.5rem',
                        fontSize: '0.875rem',
                    }}
                >
                    <span style={{ color: 'var(--color-text-secondary)' }}>Subtotal</span>
                    <span>{formatRupiah(totals.subtotal)}</span>
                </div>

                {totals.discountAmount > 0 && (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '0.5rem',
                            fontSize: '0.875rem',
                            color: 'var(--color-success)',
                        }}
                    >
                        <span>Diskon</span>
                        <span>- {formatRupiah(totals.discountAmount)}</span>
                    </div>
                )}

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '0.5rem',
                        fontSize: '0.875rem',
                    }}
                >
                    <span style={{ color: 'var(--color-text-secondary)' }}>
                        Pajak ({formData.taxRate}%)
                    </span>
                    <span>{formatRupiah(totals.taxAmount)}</span>
                </div>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingTop: '0.75rem',
                        borderTop: '2px solid var(--color-text-primary)',
                        fontWeight: '600',
                        fontSize: '1rem',
                    }}
                >
                    <span>Total</span>
                    <span>{formatRupiah(totals.grandTotal)}</span>
                </div>
            </div>
        </div>
    );
}

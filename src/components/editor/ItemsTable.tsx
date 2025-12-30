'use client';

import { Package, Plus, Trash2 } from 'lucide-react';
import { useInvoiceStore } from '@/stores/invoiceStore';
import { formatNumber } from '@/lib/formatters';

export function ItemsTable() {
    const { formData, addItem, removeItem, updateItem } = useInvoiceStore();
    const items = formData.items;

    const handleQuantityChange = (id: string, value: string) => {
        const qty = parseInt(value) || 0;
        updateItem(id, { quantity: Math.max(0, qty) });
    };

    const handlePriceChange = (id: string, value: string) => {
        const price = parseFloat(value.replace(/[^\d]/g, '')) || 0;
        updateItem(id, { unitPrice: Math.max(0, price) });
    };

    return (
        <div className="card">
            <div className="card-header">
                <Package size={16} />
                <h3 className="card-title">Item / Jasa</h3>
            </div>

            <div className="items-table">
                <div className="items-header">
                    <span>Deskripsi</span>
                    <span>Qty</span>
                    <span>Harga Satuan</span>
                    <span></span>
                </div>

                {items.map((item) => (
                    <div key={item.id} className="item-row">
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Nama item atau jasa"
                            value={item.description}
                            onChange={(e) => updateItem(item.id, { description: e.target.value })}
                        />
                        <input
                            type="number"
                            className="form-input"
                            placeholder="1"
                            min="1"
                            value={item.quantity || ''}
                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        />
                        <input
                            type="text"
                            className="form-input"
                            placeholder="0"
                            value={item.unitPrice ? formatNumber(item.unitPrice) : ''}
                            onChange={(e) => handlePriceChange(item.id, e.target.value)}
                        />
                        <button
                            className="btn btn-icon btn-danger"
                            onClick={() => removeItem(item.id)}
                            disabled={items.length <= 1}
                            title="Hapus item"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>

            <button className="btn btn-secondary" onClick={addItem} style={{ marginTop: '0.5rem' }}>
                <Plus size={16} />
                Tambah Item
            </button>
        </div>
    );
}

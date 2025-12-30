'use client';

import { User } from 'lucide-react';
import { useInvoiceStore } from '@/stores/invoiceStore';

export function ClientForm() {
    const { formData, setClient } = useInvoiceStore();
    const client = formData.client;

    return (
        <div className="card">
            <div className="card-header">
                <User size={16} />
                <h3 className="card-title">Informasi Klien</h3>
            </div>

            <div className="form-group">
                <label className="form-label">Nama Klien / Perusahaan</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="CV Nama Klien"
                    value={client.name}
                    onChange={(e) => setClient({ name: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Alamat</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="Jl. Contoh No. 456"
                    value={client.address}
                    onChange={(e) => setClient({ address: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Kota</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="Bandung, 40123"
                    value={client.city}
                    onChange={(e) => setClient({ city: e.target.value })}
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label className="form-label">Email (Opsional)</label>
                    <input
                        type="email"
                        className="form-input"
                        placeholder="email@klien.com"
                        value={client.email || ''}
                        onChange={(e) => setClient({ email: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Telepon (Opsional)</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="022-1234567"
                        value={client.phone || ''}
                        onChange={(e) => setClient({ phone: e.target.value })}
                    />
                </div>
            </div>
        </div>
    );
}

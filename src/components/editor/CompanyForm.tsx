'use client';

import { Building2 } from 'lucide-react';
import { useInvoiceStore } from '@/stores/invoiceStore';

export function CompanyForm() {
    const { formData, setCompany } = useInvoiceStore();
    const company = formData.company;

    return (
        <div className="card">
            <div className="card-header">
                <Building2 size={16} />
                <h3 className="card-title">Informasi Perusahaan</h3>
            </div>

            <div className="form-group">
                <label className="form-label">Nama Perusahaan</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="PT Nama Perusahaan"
                    value={company.name}
                    onChange={(e) => setCompany({ name: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Alamat</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="Jl. Contoh No. 123"
                    value={company.address}
                    onChange={(e) => setCompany({ address: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Kota</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="Jakarta, 12345"
                    value={company.city}
                    onChange={(e) => setCompany({ city: e.target.value })}
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label className="form-label">Telepon</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="021-1234567"
                        value={company.phone}
                        onChange={(e) => setCompany({ phone: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-input"
                        placeholder="email@perusahaan.com"
                        value={company.email}
                        onChange={(e) => setCompany({ email: e.target.value })}
                    />
                </div>
            </div>
        </div>
    );
}

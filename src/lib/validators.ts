import { z } from 'zod';

/**
 * Validation schemas for invoice form
 */

export const companyInfoSchema = z.object({
    name: z.string().min(1, 'Nama perusahaan wajib diisi'),
    address: z.string().min(1, 'Alamat wajib diisi'),
    city: z.string().min(1, 'Kota wajib diisi'),
    phone: z.string().min(1, 'Nomor telepon wajib diisi'),
    email: z.string().email('Email tidak valid'),
    logo: z.string().optional(),
});

export const clientInfoSchema = z.object({
    name: z.string().min(1, 'Nama klien wajib diisi'),
    address: z.string().min(1, 'Alamat klien wajib diisi'),
    city: z.string().min(1, 'Kota wajib diisi'),
    email: z.string().email('Email tidak valid').optional().or(z.literal('')),
    phone: z.string().optional(),
});

export const invoiceItemSchema = z.object({
    id: z.string(),
    description: z.string().min(1, 'Deskripsi item wajib diisi'),
    quantity: z
        .number({ invalid_type_error: 'Kuantitas harus berupa angka' })
        .min(1, 'Minimal 1 item')
        .max(9999, 'Maksimal 9999 item'),
    unitPrice: z
        .number({ invalid_type_error: 'Harga harus berupa angka' })
        .min(0, 'Harga tidak boleh negatif')
        .max(999999999999, 'Harga terlalu besar'),
});

export const invoiceFormSchema = z.object({
    invoiceNumber: z
        .string()
        .min(1, 'Nomor invoice wajib diisi')
        .regex(/^INV-\d{4}-\d{3}$/, 'Format: INV-2025-001'),
    createdDate: z.string().min(1, 'Tanggal wajib diisi'),
    dueDate: z.string().min(1, 'Tanggal jatuh tempo wajib diisi'),
    company: companyInfoSchema,
    client: clientInfoSchema,
    items: z.array(invoiceItemSchema).min(1, 'Minimal harus ada 1 item'),
    taxRate: z
        .number({ invalid_type_error: 'Pajak harus berupa angka' })
        .min(0, 'Pajak minimal 0%')
        .max(100, 'Pajak maksimal 100%'),
    discountType: z.enum(['flat', 'percentage']),
    discountValue: z
        .number({ invalid_type_error: 'Diskon harus berupa angka' })
        .min(0, 'Diskon tidak boleh negatif'),
    notes: z.string().optional(),
    paymentTerms: z.string().optional(),
    bankName: z.string().optional(),
    bankAccount: z.string().optional(),
    accountHolder: z.string().optional(),
});

export type InvoiceFormSchema = z.infer<typeof invoiceFormSchema>;

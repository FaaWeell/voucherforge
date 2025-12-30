import { create } from 'zustand';
import {
    InvoiceFormData,
    defaultInvoiceFormData,
    createEmptyItem,
    InvoiceItemInput,
} from '@/types/invoice';
import { generateInvoiceNumber, getDefaultDueDate, getTodayDate } from '@/lib/formatters';

interface InvoiceStore {
    // Form data
    formData: InvoiceFormData;

    // Actions
    setFormData: (data: Partial<InvoiceFormData>) => void;
    setCompany: (company: Partial<InvoiceFormData['company']>) => void;
    setClient: (client: Partial<InvoiceFormData['client']>) => void;
    addItem: () => void;
    removeItem: (id: string) => void;
    updateItem: (id: string, item: Partial<InvoiceItemInput>) => void;
    setTaxRate: (rate: number) => void;
    setDiscount: (type: 'flat' | 'percentage', value: number) => void;
    resetForm: () => void;
    loadDemoData: () => void;
}

const initialFormData: InvoiceFormData = {
    ...defaultInvoiceFormData,
    invoiceNumber: generateInvoiceNumber(1),
    createdDate: getTodayDate(),
    dueDate: getDefaultDueDate(),
};

export const useInvoiceStore = create<InvoiceStore>((set) => ({
    formData: initialFormData,

    setFormData: (data) =>
        set((state) => ({
            formData: { ...state.formData, ...data },
        })),

    setCompany: (company) =>
        set((state) => ({
            formData: {
                ...state.formData,
                company: { ...state.formData.company, ...company },
            },
        })),

    setClient: (client) =>
        set((state) => ({
            formData: {
                ...state.formData,
                client: { ...state.formData.client, ...client },
            },
        })),

    addItem: () =>
        set((state) => ({
            formData: {
                ...state.formData,
                items: [...state.formData.items, createEmptyItem()],
            },
        })),

    removeItem: (id) =>
        set((state) => ({
            formData: {
                ...state.formData,
                items: state.formData.items.filter((item) => item.id !== id),
            },
        })),

    updateItem: (id, updates) =>
        set((state) => ({
            formData: {
                ...state.formData,
                items: state.formData.items.map((item) =>
                    item.id === id ? { ...item, ...updates } : item
                ),
            },
        })),

    setTaxRate: (rate) =>
        set((state) => ({
            formData: { ...state.formData, taxRate: rate },
        })),

    setDiscount: (type, value) =>
        set((state) => ({
            formData: {
                ...state.formData,
                discountType: type,
                discountValue: value,
            },
        })),

    resetForm: () =>
        set({
            formData: {
                ...initialFormData,
                invoiceNumber: generateInvoiceNumber(1),
                createdDate: getTodayDate(),
                dueDate: getDefaultDueDate(),
                items: [createEmptyItem()],
            },
        }),

    loadDemoData: () =>
        set({
            formData: {
                invoiceNumber: generateInvoiceNumber(1),
                createdDate: getTodayDate(),
                dueDate: getDefaultDueDate(),
                company: {
                    name: 'PT Teknologi Nusantara',
                    address: 'Jl. Sudirman No. 123, Gedung Menara Cyber Lt. 15',
                    city: 'Jakarta Selatan, 12190',
                    phone: '021-5551234',
                    email: 'billing@teknologinusantara.co.id',
                },
                client: {
                    name: 'CV Maju Bersama',
                    address: 'Jl. Gatot Subroto No. 456',
                    city: 'Bandung, 40112',
                    email: 'finance@majubersama.com',
                    phone: '022-7891234',
                },
                items: [
                    {
                        id: crypto.randomUUID(),
                        description: 'Jasa Pengembangan Website E-commerce',
                        quantity: 1,
                        unitPrice: 15000000,
                    },
                    {
                        id: crypto.randomUUID(),
                        description: 'Desain UI/UX (10 Halaman)',
                        quantity: 10,
                        unitPrice: 500000,
                    },
                    {
                        id: crypto.randomUUID(),
                        description: 'Setup & Konfigurasi Server VPS',
                        quantity: 1,
                        unitPrice: 2500000,
                    },
                    {
                        id: crypto.randomUUID(),
                        description: 'Maintenance Bulanan (3 Bulan)',
                        quantity: 3,
                        unitPrice: 1000000,
                    },
                ],
                taxRate: 11,
                discountType: 'percentage',
                discountValue: 5,
                notes: 'Terima kasih atas kepercayaan Anda. Pembayaran dapat dilakukan melalui transfer bank.',
                paymentTerms: 'Net 30 hari',
                bankName: 'Bank Central Asia (BCA)',
                bankAccount: '1234567890',
                accountHolder: 'PT Teknologi Nusantara',
            },
        }),
}));

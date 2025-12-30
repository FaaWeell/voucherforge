// Invoice Data Types
// All monetary values are stored in cents (integer) to avoid floating point errors

export interface CompanyInfo {
    name: string;
    address: string;
    city: string;
    phone: string;
    email: string;
    logo?: string; // base64 encoded image
}

export interface ClientInfo {
    name: string;
    address: string;
    city: string;
    email?: string;
    phone?: string;
}

export interface InvoiceItem {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number; // in cents
    total: number; // computed: quantity * unitPrice (in cents)
}

export type DiscountType = 'flat' | 'percentage';

export interface InvoiceData {
    // Metadata
    invoiceNumber: string;
    createdDate: string; // ISO date string
    dueDate: string; // ISO date string

    // Parties
    company: CompanyInfo;
    client: ClientInfo;

    // Items
    items: InvoiceItem[];

    // Financials (all in cents except rates which are percentages)
    subtotal: number;
    taxRate: number; // percentage 0-100
    taxAmount: number;
    discountType: DiscountType;
    discountValue: number; // flat: in cents, percentage: 0-100
    discountAmount: number;
    grandTotal: number;

    // Additional
    notes?: string;
    paymentTerms?: string;
    bankName?: string;
    bankAccount?: string;
    accountHolder?: string;
}

// Form input types (before conversion to cents)
export interface InvoiceItemInput {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number; // in rupiah (will be converted to cents)
}

export interface InvoiceFormData {
    invoiceNumber: string;
    createdDate: string;
    dueDate: string;
    company: CompanyInfo;
    client: ClientInfo;
    items: InvoiceItemInput[];
    taxRate: number;
    discountType: DiscountType;
    discountValue: number;
    notes?: string;
    paymentTerms?: string;
    bankName?: string;
    bankAccount?: string;
    accountHolder?: string;
}

// Default values for initializing forms
export const defaultCompanyInfo: CompanyInfo = {
    name: '',
    address: '',
    city: '',
    phone: '',
    email: '',
};

export const defaultClientInfo: ClientInfo = {
    name: '',
    address: '',
    city: '',
};

export const createEmptyItem = (): InvoiceItemInput => ({
    id: crypto.randomUUID(),
    description: '',
    quantity: 1,
    unitPrice: 0,
});

export const defaultInvoiceFormData: InvoiceFormData = {
    invoiceNumber: '',
    createdDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    company: defaultCompanyInfo,
    client: defaultClientInfo,
    items: [createEmptyItem()],
    taxRate: 11, // Indonesian VAT
    discountType: 'flat',
    discountValue: 0,
    notes: '',
    paymentTerms: 'Net 30 days',
    bankName: '',
    bankAccount: '',
    accountHolder: '',
};

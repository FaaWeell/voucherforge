'use client';

import React from 'react';
import { Document, Page, View, Text } from '@react-pdf/renderer';
import { pdfStyles as styles } from './styles';
import { InvoiceFormData } from '@/types/invoice';
import { calculateInvoiceTotals, rupiahToCents, calculateLineTotal } from '@/lib/calculations';
import { formatRupiah, formatDateShort } from '@/lib/formatters';

interface InvoiceDocumentProps {
    data: InvoiceFormData;
}

export function InvoiceDocument({ data }: InvoiceDocumentProps) {
    // Calculate totals
    const totals = calculateInvoiceTotals(
        data.items,
        data.taxRate,
        data.discountType,
        data.discountValue
    );

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.companyInfo}>
                        <Text style={styles.companyName}>{data.company.name || 'Nama Perusahaan'}</Text>
                        <Text style={styles.companyDetail}>{data.company.address}</Text>
                        <Text style={styles.companyDetail}>{data.company.city}</Text>
                        <Text style={styles.companyDetail}>{data.company.phone}</Text>
                        <Text style={styles.companyDetail}>{data.company.email}</Text>
                    </View>
                    <View style={styles.invoiceMeta}>
                        <Text style={styles.invoiceTitle}>INVOICE</Text>
                        <Text style={styles.invoiceNumber}>{data.invoiceNumber || 'INV-XXXX-XXX'}</Text>
                        <Text style={styles.invoiceDate}>
                            Tanggal: {formatDateShort(data.createdDate)}
                        </Text>
                        <Text style={styles.invoiceDate}>
                            Jatuh Tempo: {formatDateShort(data.dueDate)}
                        </Text>
                    </View>
                </View>

                {/* Client Section */}
                <View style={styles.clientSection}>
                    <View style={styles.billTo}>
                        <Text style={styles.sectionLabel}>Tagihan Kepada</Text>
                        <Text style={styles.clientName}>{data.client.name || 'Nama Klien'}</Text>
                        <Text style={styles.clientDetail}>{data.client.address}</Text>
                        <Text style={styles.clientDetail}>{data.client.city}</Text>
                        {data.client.email && <Text style={styles.clientDetail}>{data.client.email}</Text>}
                        {data.client.phone && <Text style={styles.clientDetail}>{data.client.phone}</Text>}
                    </View>
                </View>

                {/* Items Table */}
                <View style={styles.table}>
                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableHeaderCell, styles.colDescription]}>Deskripsi</Text>
                        <Text style={[styles.tableHeaderCell, styles.colQty]}>Qty</Text>
                        <Text style={[styles.tableHeaderCell, styles.colUnitPrice]}>Harga Satuan</Text>
                        <Text style={[styles.tableHeaderCell, styles.colTotal]}>Jumlah</Text>
                    </View>

                    {/* Table Rows */}
                    {data.items.map((item, index) => {
                        const lineTotal = calculateLineTotal(item.quantity, rupiahToCents(item.unitPrice));
                        return (
                            <View key={item.id || index} style={styles.tableRow} wrap={false}>
                                <Text style={[styles.tableCell, styles.colDescription]}>
                                    {item.description || '-'}
                                </Text>
                                <Text style={[styles.tableCell, styles.colQty]}>{item.quantity}</Text>
                                <Text style={[styles.tableCell, styles.colUnitPrice]}>
                                    {formatRupiah(rupiahToCents(item.unitPrice))}
                                </Text>
                                <Text style={[styles.tableCell, styles.colTotal]}>{formatRupiah(lineTotal)}</Text>
                            </View>
                        );
                    })}
                </View>

                {/* Summary */}
                <View style={styles.summarySection}>
                    <View style={styles.summaryBox}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Subtotal</Text>
                            <Text style={styles.summaryValue}>{formatRupiah(totals.subtotal)}</Text>
                        </View>

                        {totals.discountAmount > 0 && (
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>
                                    Diskon{' '}
                                    {data.discountType === 'percentage' ? `(${data.discountValue}%)` : ''}
                                </Text>
                                <Text style={[styles.summaryValue, styles.summaryDiscount]}>
                                    - {formatRupiah(totals.discountAmount)}
                                </Text>
                            </View>
                        )}

                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Pajak ({data.taxRate}%)</Text>
                            <Text style={styles.summaryValue}>{formatRupiah(totals.taxAmount)}</Text>
                        </View>

                        <View style={styles.grandTotalRow}>
                            <Text style={styles.grandTotalLabel}>TOTAL</Text>
                            <Text style={styles.grandTotalValue}>{formatRupiah(totals.grandTotal)}</Text>
                        </View>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    {/* Payment Info */}
                    {(data.bankName || data.bankAccount) && (
                        <View style={styles.paymentInfo}>
                            <Text style={styles.paymentTitle}>Informasi Pembayaran</Text>
                            {data.paymentTerms && (
                                <Text style={styles.paymentDetail}>Syarat: {data.paymentTerms}</Text>
                            )}
                            {data.bankName && <Text style={styles.paymentDetail}>Bank: {data.bankName}</Text>}
                            {data.bankAccount && (
                                <Text style={styles.paymentDetail}>No. Rekening: {data.bankAccount}</Text>
                            )}
                            {data.accountHolder && (
                                <Text style={styles.paymentDetail}>Atas Nama: {data.accountHolder}</Text>
                            )}
                        </View>
                    )}

                    {/* Notes */}
                    {data.notes && (
                        <View style={styles.notes}>
                            <Text style={styles.notesLabel}>Catatan</Text>
                            <Text style={styles.notesText}>{data.notes}</Text>
                        </View>
                    )}
                </View>

                {/* Branding */}
                <Text style={styles.branding}>Generated by VoucherForge</Text>
            </Page>
        </Document>
    );
}

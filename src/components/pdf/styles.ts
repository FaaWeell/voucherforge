import { StyleSheet, Font } from '@react-pdf/renderer';

// Register fonts (using system fonts for now)
// You can add custom fonts later

export const colors = {
    primary: '#1a1a1a',
    secondary: '#6b7280',
    muted: '#9ca3af',
    accent: '#2563eb',
    border: '#e5e7eb',
    background: '#f9fafb',
    white: '#ffffff',
};

export const pdfStyles = StyleSheet.create({
    // Page
    page: {
        padding: 40,
        fontSize: 10,
        fontFamily: 'Helvetica',
        color: colors.primary,
        backgroundColor: colors.white,
    },

    // Header Section
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },

    companyInfo: {
        maxWidth: '50%',
    },

    companyName: {
        fontSize: 16,
        fontFamily: 'Helvetica-Bold',
        marginBottom: 6,
        color: colors.primary,
    },

    companyDetail: {
        fontSize: 9,
        color: colors.secondary,
        marginBottom: 2,
        lineHeight: 1.4,
    },

    invoiceMeta: {
        alignItems: 'flex-end',
    },

    invoiceTitle: {
        fontSize: 24,
        fontFamily: 'Helvetica-Bold',
        color: colors.accent,
        marginBottom: 10,
    },

    invoiceNumber: {
        fontSize: 11,
        fontFamily: 'Helvetica-Bold',
        marginBottom: 4,
    },

    invoiceDate: {
        fontSize: 9,
        color: colors.secondary,
        marginBottom: 2,
    },

    // Client Section
    clientSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },

    billTo: {
        maxWidth: '45%',
    },

    sectionLabel: {
        fontSize: 8,
        fontFamily: 'Helvetica-Bold',
        color: colors.muted,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 6,
    },

    clientName: {
        fontSize: 11,
        fontFamily: 'Helvetica-Bold',
        marginBottom: 4,
    },

    clientDetail: {
        fontSize: 9,
        color: colors.secondary,
        marginBottom: 2,
        lineHeight: 1.4,
    },

    // Table
    table: {
        marginBottom: 20,
    },

    tableHeader: {
        flexDirection: 'row',
        backgroundColor: colors.background,
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },

    tableHeaderCell: {
        fontSize: 8,
        fontFamily: 'Helvetica-Bold',
        color: colors.secondary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },

    tableRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },

    tableCell: {
        fontSize: 9,
        color: colors.primary,
    },

    // Column widths
    colDescription: {
        width: '45%',
    },

    colQty: {
        width: '10%',
        textAlign: 'center',
    },

    colUnitPrice: {
        width: '22%',
        textAlign: 'right',
    },

    colTotal: {
        width: '23%',
        textAlign: 'right',
    },

    // Summary
    summarySection: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 30,
    },

    summaryBox: {
        width: 220,
    },

    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 6,
        paddingHorizontal: 10,
    },

    summaryLabel: {
        fontSize: 9,
        color: colors.secondary,
    },

    summaryValue: {
        fontSize: 9,
        fontFamily: 'Helvetica-Bold',
        color: colors.primary,
    },

    summaryDiscount: {
        color: '#10b981',
    },

    grandTotalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: colors.primary,
        borderRadius: 4,
        marginTop: 4,
    },

    grandTotalLabel: {
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
        color: colors.white,
    },

    grandTotalValue: {
        fontSize: 12,
        fontFamily: 'Helvetica-Bold',
        color: colors.white,
    },

    // Footer / Notes
    footer: {
        marginTop: 'auto',
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },

    paymentInfo: {
        marginBottom: 15,
    },

    paymentTitle: {
        fontSize: 9,
        fontFamily: 'Helvetica-Bold',
        marginBottom: 6,
        color: colors.primary,
    },

    paymentDetail: {
        fontSize: 9,
        color: colors.secondary,
        marginBottom: 2,
    },

    notes: {
        marginTop: 15,
    },

    notesLabel: {
        fontSize: 8,
        fontFamily: 'Helvetica-Bold',
        color: colors.muted,
        textTransform: 'uppercase',
        marginBottom: 4,
    },

    notesText: {
        fontSize: 9,
        color: colors.secondary,
        lineHeight: 1.5,
    },

    // Watermark / Branding
    branding: {
        position: 'absolute',
        bottom: 20,
        right: 40,
        fontSize: 7,
        color: colors.muted,
    },
});

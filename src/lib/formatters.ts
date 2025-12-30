/**
 * Formatting utilities for invoice display
 */

/**
 * Format cents to Indonesian Rupiah string
 * @param cents - amount in cents
 * @returns formatted string like "Rp 1.000.000"
 */
export function formatRupiah(cents: number): string {
    const rupiah = cents / 100;
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(rupiah);
}

/**
 * Format rupiah number (not cents) to display string
 * Used for form display where values are in rupiah
 */
export function formatRupiahFromNumber(rupiah: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(rupiah);
}

/**
 * Format number with thousand separators (Indonesian format)
 */
export function formatNumber(value: number): string {
    return new Intl.NumberFormat('id-ID').format(value);
}

/**
 * Parse formatted number string back to number
 * Handles Indonesian format (dot as thousand separator)
 */
export function parseFormattedNumber(value: string): number {
    // Remove currency symbol, spaces, and thousand separators
    const cleaned = value.replace(/[Rp\s.]/g, '').replace(/,/g, '.');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
}

/**
 * Format date to Indonesian locale
 */
export function formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);
}

/**
 * Format date for display in PDF (shorter format)
 */
export function formatDateShort(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(date);
}

/**
 * Generate invoice number
 * Format: INV-YYYY-NNN
 */
export function generateInvoiceNumber(sequence: number = 1): string {
    const year = new Date().getFullYear();
    const paddedSequence = String(sequence).padStart(3, '0');
    return `INV-${year}-${paddedSequence}`;
}

/**
 * Get due date (30 days from now)
 */
export function getDefaultDueDate(): string {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date.toISOString().split('T')[0];
}

/**
 * Get today's date in YYYY-MM-DD format
 */
export function getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
}

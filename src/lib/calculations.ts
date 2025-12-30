/**
 * Calculation utilities for invoice
 * All internal calculations use cents (integer) to avoid floating point errors
 */

const CENTS_MULTIPLIER = 100;

/**
 * Convert rupiah to cents
 */
export function rupiahToCents(rupiah: number): number {
    return Math.round(rupiah * CENTS_MULTIPLIER);
}

/**
 * Convert cents to rupiah
 */
export function centsToRupiah(cents: number): number {
    return cents / CENTS_MULTIPLIER;
}

/**
 * Calculate line total (quantity * unit price)
 * Both inputs and output are in cents
 */
export function calculateLineTotal(quantity: number, unitPriceInCents: number): number {
    return Math.round(quantity * unitPriceInCents);
}

/**
 * Calculate subtotal from array of line totals (in cents)
 */
export function calculateSubtotal(lineTotals: number[]): number {
    return lineTotals.reduce((sum, total) => sum + total, 0);
}

/**
 * Calculate discount amount
 * @param subtotal - in cents
 * @param discountType - 'flat' or 'percentage'
 * @param discountValue - flat: in cents, percentage: 0-100
 * @returns discount amount in cents
 */
export function calculateDiscount(
    subtotal: number,
    discountType: 'flat' | 'percentage',
    discountValue: number
): number {
    if (discountType === 'flat') {
        // Flat discount is already in cents
        return Math.min(discountValue, subtotal); // Can't discount more than subtotal
    } else {
        // Percentage discount
        return Math.round(subtotal * (discountValue / 100));
    }
}

/**
 * Calculate tax amount
 * @param amountAfterDiscount - amount after discount in cents
 * @param taxRate - percentage 0-100
 * @returns tax amount in cents
 */
export function calculateTax(amountAfterDiscount: number, taxRate: number): number {
    return Math.round(amountAfterDiscount * (taxRate / 100));
}

/**
 * Calculate grand total
 * @param subtotal - in cents
 * @param discountAmount - in cents
 * @param taxAmount - in cents
 * @returns grand total in cents
 */
export function calculateGrandTotal(
    subtotal: number,
    discountAmount: number,
    taxAmount: number
): number {
    return subtotal - discountAmount + taxAmount;
}

/**
 * Full invoice calculation
 * Takes items with prices in rupiah, returns all totals in cents
 */
export interface CalculationResult {
    lineTotals: number[]; // in cents
    subtotal: number; // in cents
    discountAmount: number; // in cents
    amountAfterDiscount: number; // in cents
    taxAmount: number; // in cents
    grandTotal: number; // in cents
}

export function calculateInvoiceTotals(
    items: Array<{ quantity: number; unitPrice: number }>, // unitPrice in rupiah
    taxRate: number,
    discountType: 'flat' | 'percentage',
    discountValue: number // flat: in rupiah, percentage: 0-100
): CalculationResult {
    // Convert item prices to cents and calculate line totals
    const lineTotals = items.map((item) =>
        calculateLineTotal(item.quantity, rupiahToCents(item.unitPrice))
    );

    const subtotal = calculateSubtotal(lineTotals);

    // Convert flat discount to cents if needed
    const discountValueInCents =
        discountType === 'flat' ? rupiahToCents(discountValue) : discountValue;

    const discountAmount = calculateDiscount(subtotal, discountType, discountValueInCents);
    const amountAfterDiscount = subtotal - discountAmount;
    const taxAmount = calculateTax(amountAfterDiscount, taxRate);
    const grandTotal = calculateGrandTotal(subtotal, discountAmount, taxAmount);

    return {
        lineTotals,
        subtotal,
        discountAmount,
        amountAfterDiscount,
        taxAmount,
        grandTotal,
    };
}

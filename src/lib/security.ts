/**
 * Security utilities for VoucherForge
 * Handles input sanitization, validation, and XSS protection
 */

/**
 * Sanitize string input to prevent XSS attacks
 * Escapes HTML special characters
 */
export function sanitizeString(input: string): string {
    if (typeof input !== 'string') return '';

    const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;',
    };

    return input.replace(/[&<>"'`=/]/g, (char) => map[char] || char);
}

/**
 * Sanitize object recursively
 * Applies sanitization to all string values in an object
 */
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
    const sanitized = { ...obj };

    for (const key in sanitized) {
        const value = sanitized[key];

        if (typeof value === 'string') {
            (sanitized as Record<string, unknown>)[key] = sanitizeString(value);
        } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            (sanitized as Record<string, unknown>)[key] = sanitizeObject(value as Record<string, unknown>);
        } else if (Array.isArray(value)) {
            (sanitized as Record<string, unknown>)[key] = value.map((item) =>
                typeof item === 'object' && item !== null
                    ? sanitizeObject(item as Record<string, unknown>)
                    : typeof item === 'string'
                        ? sanitizeString(item)
                        : item
            );
        }
    }

    return sanitized;
}

/**
 * Validate invoice number format
 * Expected format: INV-YYYY-NNN
 */
export function isValidInvoiceNumber(invoiceNumber: string): boolean {
    const pattern = /^INV-\d{4}-\d{3}$/;
    return pattern.test(invoiceNumber);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
    if (!email) return true; // Optional field
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

/**
 * Validate phone number (Indonesian format)
 */
export function isValidPhone(phone: string): boolean {
    if (!phone) return true; // Optional field
    // Accepts: 021-1234567, 08123456789, +62812345678
    const pattern = /^(\+62|62|0)?[\s-]?\d{2,4}[\s-]?\d{4,8}$/;
    return pattern.test(phone.replace(/\s/g, ''));
}

/**
 * Validate monetary amount
 * Must be non-negative and within reasonable bounds
 */
export function isValidAmount(amount: number): boolean {
    return typeof amount === 'number' &&
        !isNaN(amount) &&
        amount >= 0 &&
        amount <= 999999999999; // Max ~10 billion
}

/**
 * Validate quantity
 */
export function isValidQuantity(qty: number): boolean {
    return typeof qty === 'number' &&
        !isNaN(qty) &&
        Number.isInteger(qty) &&
        qty >= 1 &&
        qty <= 9999;
}

/**
 * Validate percentage (0-100)
 */
export function isValidPercentage(value: number): boolean {
    return typeof value === 'number' &&
        !isNaN(value) &&
        value >= 0 &&
        value <= 100;
}

/**
 * Validate date string (YYYY-MM-DD format)
 */
export function isValidDate(dateStr: string): boolean {
    if (!dateStr) return false;
    const pattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!pattern.test(dateStr)) return false;

    const date = new Date(dateStr);
    return !isNaN(date.getTime());
}

/**
 * Check if due date is after created date
 */
export function isValidDueDateRange(createdDate: string, dueDate: string): boolean {
    if (!createdDate || !dueDate) return true;
    return new Date(dueDate) >= new Date(createdDate);
}

/**
 * Rate limiting helper for preventing spam clicks
 */
export function createRateLimiter(maxCalls: number, windowMs: number) {
    const calls: number[] = [];

    return function isAllowed(): boolean {
        const now = Date.now();

        // Remove expired timestamps
        while (calls.length > 0 && calls[0] < now - windowMs) {
            calls.shift();
        }

        if (calls.length >= maxCalls) {
            return false;
        }

        calls.push(now);
        return true;
    };
}

/**
 * Content Security Policy headers (for deployment)
 */
export const securityHeaders = {
    'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Required for PDF generation
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: blob:",
        "connect-src 'self'",
        "frame-src 'self' blob:", // Required for PDF preview
    ].join('; '),
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

/**
 * Privacy notice - data stays client-side
 */
export const PRIVACY_NOTICE = `
Data Anda aman! VoucherForge adalah aplikasi client-side.
- Semua data invoice disimpan dan diproses di browser Anda
- Tidak ada data yang dikirim ke server eksternal
- PDF dihasilkan langsung di browser Anda
- Anda memiliki kontrol penuh atas data Anda
`;

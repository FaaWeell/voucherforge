# Keamanan VoucherForge

## Prinsip Keamanan

VoucherForge dibangun dengan prinsip **"Privacy by Design"** - semua data diproses secara lokal di browser pengguna.

## Arsitektur Keamanan

```
┌─────────────────────────────────────────────────────────────┐
│                      USER BROWSER                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                VoucherForge App                     │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────────────────┐  │   │
│  │  │  Form   │→ │ Zustand │→ │ @react-pdf/renderer │  │   │
│  │  │  Input  │  │  Store  │  │   (PDF Generation)  │  │   │
│  │  └────┬────┘  └─────────┘  └──────────┬──────────┘  │   │
│  │       │                               │              │   │
│  │       ▼                               ▼              │   │
│  │  ┌─────────────────────┐    ┌─────────────────────┐  │   │
│  │  │ Input Sanitization  │    │   PDF Download      │  │   │
│  │  │ (XSS Protection)    │    │   (Local File)      │  │   │
│  │  └─────────────────────┘    └─────────────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ❌ Tidak ada data yang dikirim ke server eksternal         │
│  ✅ Semua proses terjadi di browser                         │
└─────────────────────────────────────────────────────────────┘
```

## Fitur Keamanan

### 1. Input Sanitization (XSS Protection)

Semua input pengguna di-sanitize untuk mencegah serangan XSS:

```typescript
// src/lib/security.ts
export function sanitizeString(input: string): string {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  return input.replace(/[&<>"'/]/g, (char) => map[char]);
}
```

### 2. Input Validation (Zod)

Validasi ketat menggunakan Zod schema:

```typescript
// src/lib/validators.ts
const invoiceItemSchema = z.object({
  description: z.string().min(1),
  quantity: z.number().min(1).max(9999),
  unitPrice: z.number().min(0).max(999999999999),
});
```

### 3. Security Headers

Diimplementasi di `next.config.ts`:

| Header | Value | Fungsi |
|--------|-------|--------|
| X-XSS-Protection | 1; mode=block | Blokir XSS |
| X-Frame-Options | SAMEORIGIN | Cegah clickjacking |
| X-Content-Type-Options | nosniff | Cegah MIME sniffing |
| Referrer-Policy | strict-origin-when-cross-origin | Batasi referrer |
| Permissions-Policy | camera=(), microphone=() | Blokir akses sensor |

### 4. Integer-based Calculations

Menghindari floating point errors dalam kalkulasi keuangan:

```typescript
// Semua harga disimpan dalam cents (integer)
const priceInCents = Math.round(priceInRupiah * 100);
const total = quantity * priceInCents; // No floating point errors
```

## Praktik Terbaik

1. **Tidak menyimpan data sensitif** di localStorage tanpa enkripsi
2. **Tidak mengirim data** ke server eksternal
3. **Validasi semua input** sebelum diproses
4. **Escape HTML** dalam output PDF
5. **Gunakan HTTPS** saat deployment

## Audit Keamanan

- [ ] Input sanitization tested
- [ ] Zod validation working
- [ ] Security headers configured
- [ ] No external API calls
- [ ] CSP policy reviewed

## Pelaporan Kerentanan

Jika menemukan kerentanan keamanan, silakan laporkan melalui:
- Email: security@example.com
- Jangan publikasikan sebelum diperbaiki

# VoucherForge - PDF Invoice Generator

<div align="center">

![VoucherForge Logo](https://img.shields.io/badge/VoucherForge-PDF%20Invoice%20Generator-2563eb?style=for-the-badge&logo=files&logoColor=white)

**Aplikasi PDF Invoice Generator profesional dengan live preview. Gratis, cepat, dan aman.**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React PDF](https://img.shields.io/badge/React%20PDF-4-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react-pdf.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

</div>

---

## 📋 Deskripsi

VoucherForge adalah aplikasi web untuk membuat invoice PDF profesional dengan fitur **live preview**. Semua proses dilakukan di browser (client-side), sehingga data Anda tetap **private dan aman**.

### ✨ Fitur Utama

- **🔄 Live Preview** - Lihat perubahan invoice secara real-time
- **📥 Download PDF** - Export invoice langsung ke file PDF
- **🎨 Desain Profesional** - Template invoice clean dan modern
- **🔢 Kalkulasi Otomatis** - Subtotal, pajak, diskon dihitung otomatis
- **💰 Format Rupiah** - Mendukung format mata uang Indonesia
- **📱 Responsive** - Berjalan di desktop dan mobile
- **🔒 Privacy-First** - Data tidak pernah meninggalkan browser Anda

---

## 🔒 Keamanan & Privasi

<div align="center">

### 🆓 100% GRATIS | 🔐 100% AMAN | 🚫 TIDAK MENYIMPAN DATA ANDA

</div>

> **⚠️ PENTING:** VoucherForge adalah aplikasi **GRATIS** dan **TIDAK MENYIMPAN** data pribadi Anda. Semua data invoice yang Anda masukkan hanya diproses di browser Anda sendiri dan **TIDAK PERNAH** dikirim ke server manapun.

### ✅ Jaminan Privasi Kami

| Jaminan | Penjelasan |
|---------|------------|
| **🆓 Gratis Selamanya** | Tidak ada biaya tersembunyi, tidak ada langganan |
| **🚫 Tidak Ada Registrasi** | Tidak perlu buat akun, tidak perlu login |
| **🔒 Data Tetap di Browser** | Semua proses terjadi di komputer Anda |
| **📡 Tidak Ada Server** | Tidak ada data yang dikirim ke internet |
| **🗑️ Data Hilang Saat Refresh** | Data tidak disimpan permanen |
| **👁️ Tidak Ada Tracking** | Tidak ada analytics atau pelacakan |

### 🛡️ Bagaimana Data Anda Aman?

```
┌─────────────────────────────────────────────────────────────┐
│                    BROWSER ANDA                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              VoucherForge App                        │   │
│  │                                                      │   │
│  │   [Input Data] → [Generate PDF] → [Download]         │   │
│  │                                                      │   │
│  │   ✅ Semua proses terjadi di sini                    │   │
│  │   ✅ Data tidak keluar dari browser                  │   │
│  │   ✅ PDF dibuat langsung di komputer Anda            │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│   ❌ TIDAK ADA koneksi ke server eksternal                  │
│   ❌ TIDAK ADA penyimpanan data di cloud                    │
│   ❌ TIDAK ADA pengiriman data ke pihak ketiga              │
└─────────────────────────────────────────────────────────────┘
```

### 🔐 Fitur Keamanan Teknis

| Fitur | Deskripsi |
|-------|-----------|
| **XSS Protection** | Input di-sanitasi untuk mencegah serangan |
| **Input Validation** | Validasi ketat dengan Zod schema |
| **Security Headers** | CSP, X-Frame-Options, X-XSS-Protection |
| **No External APIs** | Tidak ada API call ke server luar |

---

## 🚀 Instalasi

### Prerequisites

- Node.js 18+ 
- npm atau yarn

### Quick Start

```bash
# Clone repository
git clone https://github.com/yourusername/voucherforge.git
cd voucherforge

# Install dependencies
npm install

# Jalankan development server
npm run dev

# Buka browser
open http://localhost:3000
```

### Build Production

```bash
# Build untuk production
npm run build

# Jalankan production server
npm start
```

---

## 📁 Struktur Project

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx             # Halaman utama
│   └── globals.css          # Global styles
│
├── components/
│   ├── editor/              # Form components
│   │   ├── CompanyForm.tsx
│   │   ├── ClientForm.tsx
│   │   ├── InvoiceMetaForm.tsx
│   │   ├── ItemsTable.tsx
│   │   ├── FinancialsForm.tsx
│   │   └── NotesForm.tsx
│   │
│   ├── pdf/                 # PDF components
│   │   ├── InvoiceDocument.tsx
│   │   ├── PDFPreview.tsx
│   │   ├── downloadPDF.tsx
│   │   └── styles.ts
│   │
│   └── ui/                  # UI components
│       └── Header.tsx
│
├── lib/
│   ├── calculations.ts      # Fungsi kalkulasi
│   ├── formatters.ts        # Format mata uang & tanggal
│   ├── validators.ts        # Validasi Zod
│   └── security.ts          # Keamanan & sanitasi
│
├── stores/
│   └── invoiceStore.ts      # State management (Zustand)
│
└── types/
    └── invoice.ts           # TypeScript interfaces
```

---

## 🛠️ Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| PDF Engine | @react-pdf/renderer |
| Form | React Hook Form + Zod |
| State | Zustand |
| Styling | CSS Modules + CSS Variables |
| Icons | Lucide React |

---

## 📖 Penggunaan

### 1. Isi Data Invoice

Lengkapi form di panel kiri:
- **Detail Invoice** - Nomor invoice, tanggal
- **Info Perusahaan** - Nama, alamat, kontak
- **Info Klien** - Nama, alamat klien
- **Items** - Daftar barang/jasa
- **Kalkulasi** - Pajak dan diskon

### 2. Preview Real-time

Panel kanan menampilkan preview PDF yang update otomatis saat Anda mengetik.

### 3. Download PDF

Klik tombol **"Download PDF"** untuk mengunduh invoice.

### 4. Demo Data

Klik **"Demo Data"** untuk mengisi form dengan data contoh.

---

## ⚠️ Validasi Input

Aplikasi memvalidasi input untuk memastikan data yang benar:

| Field | Validasi |
|-------|----------|
| Nomor Invoice | Format: `INV-YYYY-NNN` |
| Email | Format email valid |
| Kuantitas | 1 - 9,999 |
| Harga | 0 - 999,999,999,999 |
| Pajak | 0% - 100% |
| Diskon | 0% - 100% (percentage) |

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel deploy
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🔧 Environment Variables

Tidak ada environment variables yang diperlukan. Aplikasi berjalan sepenuhnya client-side.

---

## 📄 License

MIT License - Bebas digunakan untuk keperluan personal maupun komersial.

---

## 🤝 Contributing

Kontribusi sangat diterima! Silakan buat issue atau pull request.

```bash
# Fork repository
# Buat branch baru
git checkout -b feature/amazing-feature

# Commit changes
git commit -m 'Add amazing feature'

# Push ke branch
git push origin feature/amazing-feature

# Buat Pull Request
```

---

## 📞 Support

Jika ada pertanyaan atau masalah:
- Buat [Issue](https://github.com/yourusername/voucherforge/issues)
- Email: support@example.com

---

<div align="center">

**Made with ❤️ by VoucherForge Team**

</div>

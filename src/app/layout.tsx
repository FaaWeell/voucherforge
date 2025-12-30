import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VoucherForge - PDF Invoice Generator",
  description: "Generate professional PDF invoices with live preview. Free, fast, and privacy-focused.",
  keywords: ["invoice", "pdf", "generator", "free", "indonesia", "faktur"],
  authors: [{ name: "VoucherForge" }],
  openGraph: {
    title: "VoucherForge - PDF Invoice Generator",
    description: "Generate professional PDF invoices with live preview",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

'use client';

import { Shield, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function PrivacyNotice() {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        // Show notice after a short delay
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    if (isDismissed || !isVisible) return null;

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '1rem',
                left: '1rem',
                right: '1rem',
                maxWidth: '400px',
                backgroundColor: '#1a1a1a',
                color: 'white',
                borderRadius: '0.75rem',
                padding: '1rem',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                zIndex: 1000,
                animation: 'slideUp 0.3s ease',
            }}
        >
            <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div
                    style={{
                        backgroundColor: '#10b981',
                        borderRadius: '50%',
                        padding: '0.5rem',
                        flexShrink: 0,
                    }}
                >
                    <Shield size={20} color="white" />
                </div>

                <div style={{ flex: 1 }}>
                    <h4 style={{
                        fontWeight: 600,
                        marginBottom: '0.25rem',
                        fontSize: '0.875rem',
                    }}>
                        🔒 Data Anda 100% Aman
                    </h4>
                    <p style={{
                        fontSize: '0.75rem',
                        color: '#9ca3af',
                        lineHeight: 1.5,
                    }}>
                        Aplikasi ini <strong style={{ color: '#10b981' }}>GRATIS</strong> dan{' '}
                        <strong style={{ color: '#10b981' }}>TIDAK MENYIMPAN</strong> data Anda.
                        Semua proses dilakukan di browser Anda. Data tidak dikirim ke server manapun.
                    </p>
                </div>

                <button
                    onClick={() => setIsDismissed(true)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#6b7280',
                        cursor: 'pointer',
                        padding: '0.25rem',
                        flexShrink: 0,
                    }}
                    aria-label="Tutup"
                >
                    <X size={18} />
                </button>
            </div>
        </div>
    );
}

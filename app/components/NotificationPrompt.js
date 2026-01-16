'use client';
import { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';

const STORAGE_KEY = 'push_prompt_state';

export default function PushModal() {
    const [visible, setVisible] = useState(false);
    const [denied, setDenied] = useState(false);

    // Show once (unless already handled)
    useEffect(() => {
        if (typeof window === 'undefined') return;

        if (
            localStorage.getItem(STORAGE_KEY) === 'subscribed' ||
            localStorage.getItem(STORAGE_KEY) === 'dismissed'
        ) {
            return;
        }

        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
    }, []);

    // Listen for browser decision
    useEffect(() => {
        if (!visible) return;

        const interval = setInterval(() => {
            if (Notification.permission === 'granted') {
                localStorage.setItem(STORAGE_KEY, 'subscribed');
                setVisible(false);
                clearInterval(interval);
            }

            if (Notification.permission === 'denied') {
                setDenied(true);
                clearInterval(interval);
            }
        }, 400);

        return () => clearInterval(interval);
    }, [visible]);

    const subscribe = () => {
        window.rollerads_push = window.rollerads_push || [];
        window.rollerads_push.push({ subscribe: true });
    };

    const closeForever = () => {
        localStorage.setItem(STORAGE_KEY, 'dismissed');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div style={styles.backdrop}>
            <div style={styles.card}>
                <button onClick={closeForever} style={styles.close}>
                    <X size={20} />
                </button>

                <div style={styles.icon}>
                    <Bell size={28} color="#fff" />
                </div>

                <h2 style={styles.title}>
                    {denied ? 'Todo bien 😄' : 'Mantente al día 🔔'}
                </h2>

                <p style={styles.text}>
                    {denied
                        ? 'Bloqueaste las notificaciones. Puedes activarlas más tarde en la configuración del navegador.'
                        : 'Recibe alertas cuando haya nuevos videos. Sin spam.'}
                </p>

                {!denied ? (
                    <>
                        <button onClick={subscribe} style={styles.mainBtn}>
                            Activar notificaciones
                        </button>
                        <p style={styles.helper}>
                            Toca <b>Permitir</b> en la siguiente ventana 👆
                        </p>
                    </>
                ) : (
                    <button onClick={closeForever} style={styles.secondaryBtn}>
                        Entendido 👍
                    </button>
                )}

            </div>
        </div>
    );
}

/* ================= STYLES ================= */

const styles = {
    backdrop: {
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: 16,
    },

    card: {
        width: '100%',
        maxWidth: 320,
        background: '#161616',
        borderRadius: 20,
        padding: '28px 22px 24px',
        textAlign: 'center',
        position: 'relative',
        boxShadow: '0 20px 60px rgba(0,0,0,.6)',
    },

    close: {
        position: 'absolute',
        top: 12,
        right: 12,
        background: 'transparent',
        border: 'none',
        color: '#aaa',
        cursor: 'pointer',
    },

    icon: {
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: 'linear-gradient(135deg,#ff3d3d,#ff6b6b)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 14px',
    },

    title: {
        fontSize: 20,
        fontWeight: 800,
        marginBottom: 8,
    },

    text: {
        fontSize: 14,
        lineHeight: 1.5,
        opacity: 0.85,
        marginBottom: 18,
    },

    mainBtn: {
        width: '100%',
        padding: '14px 16px',
        borderRadius: 14,
        border: 'none',
        background: 'linear-gradient(135deg,#ff3d3d,#ff6b6b)',
        color: '#fff',
        fontSize: 16,
        fontWeight: 700,
        cursor: 'pointer',
    },

    helper: {
        fontSize: 12,
        marginTop: 8,
        opacity: 0.65,
    },

    secondaryBtn: {
        width: '100%',
        padding: '12px',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,.2)',
        background: 'transparent',
        color: '#fff',
        cursor: 'pointer',
        fontWeight: 600,
    },
};

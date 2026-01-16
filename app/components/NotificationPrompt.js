'use client';
import { useState, useEffect } from 'react';
import { Bell, X, Gift, Zap, Crown, Lock } from 'lucide-react';

export default function ContentGatePushModal() {
    const [visible, setVisible] = useState(false);
    const [step, setStep] = useState('gate'); // 'gate' or 'permission'
    const [denied, setDenied] = useState(false);

    // Show modal immediately when SDK is ready - NO CLOSE BUTTON
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Check if already subscribed
        const subscribed = sessionStorage.getItem('push_subscribed');
        
        if (subscribed === 'true') {
            return; // Already subscribed, don't show
        }

        const handleSDKReady = () => {
            console.log('🎯 SDK ready, showing content gate');
            // Show immediately - no delay
            setVisible(true);
        };

        if (window.rollerads_sdk_ready) {
            handleSDKReady();
        }

        window.addEventListener('rollerads_ready', handleSDKReady);

        // Fallback: show after 10 seconds even if SDK not ready
        const fallback = setTimeout(() => {
            if (!visible && sessionStorage.getItem('push_subscribed') !== 'true') {
                setVisible(true);
            }
        }, 10000);

        return () => {
            window.removeEventListener('rollerads_ready', handleSDKReady);
            clearTimeout(fallback);
        };
    }, [visible]);

    // Monitor permission state
    useEffect(() => {
        if (!visible || step !== 'permission') return;

        const interval = setInterval(() => {
            if (typeof Notification === 'undefined') return;

            if (Notification.permission === 'granted') {
                sessionStorage.setItem('push_subscribed', 'true');
                setVisible(false);
                clearInterval(interval);
                // Reload to show content
                window.location.reload();
            }

            if (Notification.permission === 'denied') {
                setDenied(true);
                clearInterval(interval);
            }
        }, 400);

        return () => clearInterval(interval);
    }, [visible, step]);

    const handleContinue = () => {
        setStep('permission');
        
        setTimeout(() => {
            if (!window.rollerads_push) {
                console.error('❌ RollerAds push object not found');
                return;
            }
            
            try {
                window.rollerads_push.push({ subscribe: true });
                console.log('📤 Subscription request sent');
            } catch (error) {
                console.error('❌ Error triggering subscription:', error);
            }
        }, 500);
    };

    const handleDismiss = () => {
        // Allow one-time dismiss but show again on next visit
        setVisible(false);
        console.log('⚠️ User dismissed gate - will show on next visit');
    };

    if (!visible) return null;

    return (
        <div style={styles.backdrop}>
            <div style={styles.overlay}></div>
            <div style={styles.card}>
                {/* Only show close button if denied */}
                {denied && (
                    <button onClick={handleDismiss} style={styles.close} aria-label="Cerrar">
                        <X size={20} />
                    </button>
                )}

                {step === 'gate' && !denied && (
                    <>
                        <div style={styles.lockIcon}>
                            <Lock size={40} color="#fff" />
                        </div>

                        <h2 style={styles.title}>
                            🔒 Contenido Bloqueado
                        </h2>

                        <p style={styles.subtitle}>
                            Activa las notificaciones para acceder a todo el contenido gratis
                        </p>

                        <div style={styles.iconGrid}>
                            <div style={{...styles.iconBadge, background: 'linear-gradient(135deg,#ff3d3d,#ff6b6b)'}}>
                                <Zap size={24} color="#fff" />
                            </div>
                            <div style={{...styles.iconBadge, background: 'linear-gradient(135deg,#ffd700,#ffed4e)'}}>
                                <Crown size={24} color="#fff" />
                            </div>
                            <div style={{...styles.iconBadge, background: 'linear-gradient(135deg,#00d4ff,#0099ff)'}}>
                                <Gift size={24} color="#fff" />
                            </div>
                        </div>

                        <ul style={styles.benefits}>
                            <li>✅ Acceso ilimitado y gratuito</li>
                            <li>🔥 Videos nuevos cada hora</li>
                            <li>⚡ Contenido exclusivo premium</li>
                            <li>🎁 Sin anuncios molestos</li>
                        </ul>

                        <button onClick={handleContinue} style={styles.mainBtn}>
                            🔓 Desbloquear Contenido Ahora
                        </button>

                        <p style={styles.disclaimer}>
                            Toma solo 1 clic • 100% gratis • Cancela cuando quieras
                        </p>
                    </>
                )}

                {step === 'permission' && !denied && (
                    <>
                        <div style={styles.icon}>
                            <Bell size={36} color="#fff" />
                        </div>

                        <h2 style={styles.title}>
                            👆 Último Paso
                        </h2>

                        <p style={styles.text}>
                            Tu navegador te pedirá permiso para enviar notificaciones.
                        </p>

                        <div style={styles.instructionBox}>
                            <p style={{margin: 0, fontSize: '15px', lineHeight: 1.6}}>
                                <strong>Toca "PERMITIR" para continuar</strong><br/>
                                <span style={{fontSize: '13px', opacity: 0.7}}>
                                    (Si no ves la ventana, busca en la barra de direcciones)
                                </span>
                            </p>
                        </div>

                        <div style={styles.arrowBox}>
                            <div style={styles.arrow}>☝️</div>
                            <p style={styles.arrowText}>Busca aquí arriba</p>
                        </div>

                        <p style={styles.waiting}>
                            Esperando tu confirmación...
                        </p>
                    </>
                )}

                {denied && (
                    <>
                        <div style={{...styles.icon, background: 'linear-gradient(135deg,#ff6b6b,#ff3d3d)'}}>
                            <X size={36} color="#fff" />
                        </div>

                        <h2 style={styles.title}>
                            Notificaciones Bloqueadas
                        </h2>

                        <p style={styles.text}>
                            Has bloqueado las notificaciones. Para acceder al contenido, necesitas permitirlas manualmente:
                        </p>

                        <ol style={styles.steps}>
                            <li>Busca el ícono 🔒 en tu navegador (arriba a la izquierda)</li>
                            <li>Haz clic en "Notificaciones"</li>
                            <li>Cambia a "Permitir"</li>
                            <li>Recarga la página</li>
                        </ol>

                        <button onClick={handleDismiss} style={styles.secondaryBtn}>
                            Entendido
                        </button>

                        <p style={styles.smallText}>
                            El contenido permanecerá bloqueado hasta que permitas las notificaciones
                        </p>
                    </>
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
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },

    overlay: {
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.97)',
        backdropFilter: 'blur(10px)',
    },

    card: {
        width: '100%',
        maxWidth: 420,
        background: 'linear-gradient(145deg, #1e1e1e 0%, #161616 100%)',
        borderRadius: 24,
        padding: '40px 28px 32px',
        textAlign: 'center',
        position: 'relative',
        boxShadow: '0 30px 100px rgba(0,0,0,.9), 0 0 0 1px rgba(255,61,61,0.3)',
        animation: 'scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        zIndex: 10000,
    },

    close: {
        position: 'absolute',
        top: 16,
        right: 16,
        background: 'rgba(255,255,255,0.1)',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        width: 36,
        height: 36,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s',
        opacity: 0.7,
    },

    lockIcon: {
        width: 80,
        height: 80,
        borderRadius: '50%',
        background: 'linear-gradient(135deg,#ff3d3d,#ff6b6b)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px',
        boxShadow: '0 12px 40px rgba(255,61,61,0.5)',
        animation: 'pulse 2s infinite',
    },

    iconGrid: {
        display: 'flex',
        gap: 16,
        justifyContent: 'center',
        marginBottom: 24,
    },

    iconBadge: {
        width: 56,
        height: 56,
        borderRadius: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(255,61,61,0.3)',
    },

    icon: {
        width: 72,
        height: 72,
        borderRadius: '50%',
        background: 'linear-gradient(135deg,#ff3d3d,#ff6b6b)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px',
        boxShadow: '0 12px 32px rgba(255,61,61,0.5)',
    },

    title: {
        fontSize: 26,
        fontWeight: 900,
        marginBottom: 12,
        lineHeight: 1.2,
        color: '#fff',
    },

    subtitle: {
        fontSize: 16,
        lineHeight: 1.5,
        opacity: 0.9,
        marginBottom: 24,
        color: '#e0e0e0',
    },

    text: {
        fontSize: 15,
        lineHeight: 1.6,
        opacity: 0.85,
        marginBottom: 20,
    },

    benefits: {
        textAlign: 'left',
        listStyle: 'none',
        padding: 0,
        margin: '0 0 24px 0',
        background: 'rgba(255,255,255,0.04)',
        borderRadius: 14,
        padding: '20px 24px',
        border: '1px solid rgba(255,255,255,0.06)',
    },

    mainBtn: {
        width: '100%',
        padding: '18px 24px',
        borderRadius: 16,
        border: 'none',
        background: 'linear-gradient(135deg,#ff3d3d,#ff6b6b)',
        color: '#fff',
        fontSize: 18,
        fontWeight: 800,
        cursor: 'pointer',
        boxShadow: '0 10px 30px rgba(255,61,61,0.5)',
        transition: 'all 0.3s',
        marginBottom: 12,
    },

    disclaimer: {
        fontSize: 12,
        opacity: 0.6,
        marginTop: 12,
        lineHeight: 1.4,
    },

    instructionBox: {
        background: 'rgba(255,255,255,0.06)',
        border: '2px solid rgba(255,61,61,0.3)',
        borderRadius: 14,
        padding: 20,
        marginBottom: 20,
    },

    arrowBox: {
        marginBottom: 20,
    },

    arrow: {
        fontSize: 40,
        animation: 'bounce 2s infinite',
    },

    arrowText: {
        fontSize: 13,
        opacity: 0.7,
        marginTop: 8,
    },

    waiting: {
        fontSize: 14,
        opacity: 0.7,
        fontStyle: 'italic',
        animation: 'pulse 2s infinite',
    },

    steps: {
        textAlign: 'left',
        fontSize: 14,
        lineHeight: 1.9,
        opacity: 0.85,
        marginBottom: 24,
        paddingLeft: 20,
        color: '#e0e0e0',
    },

    secondaryBtn: {
        width: '100%',
        padding: '16px',
        borderRadius: 14,
        border: '1px solid rgba(255,255,255,.25)',
        background: 'transparent',
        color: '#fff',
        cursor: 'pointer',
        fontWeight: 600,
        fontSize: 16,
        marginBottom: 12,
    },

    smallText: {
        fontSize: 11,
        opacity: 0.5,
        marginTop: 8,
    },
};

// Add CSS animations
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes scaleIn {
            from { 
                opacity: 0;
                transform: scale(0.8);
            }
            to { 
                opacity: 1;
                transform: scale(1);
            }
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);
}
'use client';
import { useState, useEffect } from 'react';
import { Bell, X, Gift, Sparkles } from 'lucide-react';

export default function ModalNotificationPrompt() {
  const [isVisible, setIsVisible] = useState(false);
  const [sdkReady, setSdkReady] = useState(true);
const STORAGE_KEY = 'push_prompt_state';

 useEffect(() => {
  if (typeof window === 'undefined') return;

  // Don't show if user already acted
  const state = localStorage.getItem(STORAGE_KEY);
  if (state === 'subscribed' || state === 'dismissed') {
    return;
  }

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
      window.removeEventListener('scroll', handleScroll);
    }
  };

  const timer = setTimeout(() => {
    setIsVisible(true);
  }, 1000);

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
    clearTimeout(timer);
  };
}, []);


const handleSubscribe = () => {
  try {
    window.rollerads_push = window.rollerads_push || [];
    window.rollerads_push.push({ subscribe: true });

    localStorage.setItem(STORAGE_KEY, 'subscribed');
  } catch (e) {
    console.error(e);
  }

  setIsVisible(false);
};


  const handleMaybeLater = () => {
    setIsVisible(false);
    // Show again after 2 minutes
    setTimeout(() => setIsVisible(true), 120000);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          animation: 'fadeIn 0.3s ease-out',
        }}
        onClick={() => setIsVisible(false)}
      >
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleIn {
            from {
              transform: scale(0.9);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(255, 61, 61, 0.5); }
            50% { box-shadow: 0 0 40px rgba(255, 61, 61, 0.8); }
          }
        `}</style>

        {/* Modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'linear-gradient(145deg, #1e1e1e 0%, #161616 100%)',
            borderRadius: '24px',
            padding: '48px 40px',
            maxWidth: '500px',
            width: '100%',
            position: 'relative',
            border: '2px solid rgba(255, 61, 61, 0.3)',
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.7)',
            animation: 'scaleIn 0.3s ease-out',
            textAlign: 'center',
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setIsVisible(false)}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.7)',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 61, 61, 0.2)';
              e.currentTarget.style.color = '#ff3d3d';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
            }}
          >
            <X size={24} />
          </button>

          {/* Floating bell icon */}
          <div
            style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #ff3d3d 0%, #ff6b6b 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              animation: 'float 3s ease-in-out infinite, glow 2s ease-in-out infinite',
              position: 'relative',
            }}
          >
            <Bell size={40} color="#fff" />
            <div
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '24px',
                height: '24px',
                background: '#ffd700',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Sparkles size={14} color="#000" />
            </div>
          </div>

          {/* Headline */}
          <h2
            style={{
              fontSize: '28px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #ff3d3d 0%, #ff6b6b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '12px',
              lineHeight: '1.2',
            }}
          >
            Don't Miss Out! 🚀
          </h2>

          {/* Subheadline */}
          <p
            style={{
              fontSize: '18px',
              color: '#fff',
              marginBottom: '24px',
              fontWeight: '600',
            }}
          >
            Join 50,000+ users getting instant updates
          </p>

          {/* Description */}
          <p
            style={{
              fontSize: '15px',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '32px',
              lineHeight: '1.6',
            }}
          >
            Enable notifications and be the first to watch exclusive new videos as soon as they're uploaded. Never miss trending content again!
          </p>

          {/* Benefits grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
              marginBottom: '32px',
            }}
          >
            {[
              { icon: '🎬', text: 'Fresh content alerts' },
              { icon: '⚡', text: 'Instant updates' },
              { icon: '🔥', text: 'Trending videos first' },
              { icon: '🎁', text: 'Exclusive previews' },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(255, 61, 61, 0.1)',
                  border: '1px solid rgba(255, 61, 61, 0.2)',
                  borderRadius: '12px',
                  padding: '16px 12px',
                  fontSize: '14px',
                  color: '#fff',
                  fontWeight: '500',
                }}
              >
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{item.icon}</div>
                {item.text}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              onClick={handleSubscribe}
              disabled={!sdkReady}
              style={{
                width: '100%',
                padding: '16px 32px',
                background: sdkReady 
                  ? 'linear-gradient(135deg, #ff3d3d 0%, #ff6b6b 100%)'
                  : 'rgba(100, 100, 100, 0.5)',
                border: 'none',
                borderRadius: '14px',
                color: '#fff',
                fontSize: '18px',
                fontWeight: '700',
                cursor: sdkReady ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease',
                boxShadow: sdkReady ? '0 8px 24px rgba(255, 61, 61, 0.4)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                opacity: sdkReady ? 1 : 0.6,
              }}
              onMouseEnter={(e) => {
                if (sdkReady) {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(255, 61, 61, 0.6)';
                }
              }}
              onMouseLeave={(e) => {
                if (sdkReady) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 61, 61, 0.4)';
                }
              }}
            >
              <Gift size={22} />
              {sdkReady ? 'Yes, I Want Updates!' : 'Loading...'}
            </button>

            <button
              onClick={handleMaybeLater}
              style={{
                width: '100%',
                padding: '12px 24px',
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
              }}
            >
              Maybe Later
            </button>
          </div>

          {/* Trust badge */}
          <p
            style={{
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.5)',
              marginTop: '20px',
            }}
          >
            🔒 Secure & spam-free • Unsubscribe anytime
          </p>
        </div>
      </div>
    </>
  );
}
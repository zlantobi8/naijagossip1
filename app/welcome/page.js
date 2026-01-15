'use client'
import { useEffect, useState } from "react";

export default function Welcome() {
  const [subscribed, setSubscribed] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
  }, []);

  const handleSubscribe = () => {
    if (typeof rollarads !== "undefined") {
      rollarads.push(() => {
        rollarads.subscribe();
      });
    }
    setSubscribed(true);
  };

  return (
    <div style={{ position: "relative", height: "100vh", fontFamily: "Arial, sans-serif", overflow: "hidden" }}>
      
      {/* Blurred image background */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: 'url("https://pbs.twimg.com/media/G8N8hWTWoAIFjnS.jpg:large")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(2px) brightness(0.6)", // subtle blur
          zIndex: -1,
        }}
      />

      {/* Pre-prompt modal */}
      {!subscribed && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(30,30,30,0.5)", // semi-transparent
            color: "#fff",
            maxWidth: "320px",
            width: "85%",
            padding: "25px 20px",
            borderRadius: "15px",
            textAlign: "center",
            boxShadow: "0 8px 25px rgba(0,0,0,0.6)",
          }}
        >
          <div style={{ fontSize: "50px", marginBottom: "12px" }}>🔞</div>
          <h1 style={{ fontSize: "22px", marginBottom: "12px" }}>Contenido Adulto Exclusivo 🔥</h1>
          <p style={{ fontSize: "16px", marginBottom: "18px", color: "#f7f0f0", lineHeight: "1.4" }}>
            Solo mayores de 18 años.<br/>
            Toca "PERMITIR" en la próxima ventana para desbloquear el contenido privado.<br/>
            ¡Rápido! Contenido limitado solo para los que permiten notificaciones.
          </p>

          {/* Progress bar */}
          <div style={{ width: "100%", background: "rgba(255,255,255,0.2)", borderRadius: "8px", overflow: "hidden", height: "12px", marginBottom: "10px" }}>
            <div style={{ width: `${progress}%`, height: "100%", background: "#e50914", transition: "width 0.2s" }} />
          </div>

          <button
            onClick={handleSubscribe}
            style={{
              fontSize: "18px",
              padding: "14px 25px",
              background: "#e50914",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "transform 0.3s ease-in-out",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03) translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1) translateY(0)"}
          >
            PERMITIR Y VER AHORA ▶️
          </button>
        </div>
      )}
<iframe src="//a.magsrv.com/iframe.php?idzone=5829820&size=300x250" width="300" height="250" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>
      {/* Thank you message */}
      {subscribed && (
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "#fff", textAlign: "center", fontSize: "18px" }}>
          ¡Gracias! Tu suscripción ha sido registrada. Disfruta del contenido 🔥
        </div>
      )}
    </div>
  );
}

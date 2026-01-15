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

   
        
      <iframe
        data-aa="2424319"
        src="//acceptable.a-ads.com/2424319/?size=Adaptive"
        style={{
          border: 0,
          padding: 0,
          width: "70%",
          height: "auto",
          overflow: "hidden",
          display: "block",
          margin: "auto",
        }}
      ></iframe>


   
    </div>
  );
}

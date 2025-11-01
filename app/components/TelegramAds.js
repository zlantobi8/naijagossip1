'use client';
import { useEffect } from 'react';

export default function TelegramAds() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://richinfo.co/richpartners/telegram/js/tg-ob.js';
    script.async = true;
    script.onload = () => {
      if (window.TelegramAdsController) {
        const ctrl = new window.TelegramAdsController();
        ctrl.initialize({
          pubId: '991655',
          appId: '4323',
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  return null; // No visible UI
}

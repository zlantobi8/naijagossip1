'use client'
import { useEffect, useState } from "react";

import HomePage from "../page";

export default function Welcome() {


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
    <>
      <HomePage/>
    </>

  );
}

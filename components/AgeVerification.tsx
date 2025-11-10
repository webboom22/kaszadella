"use client";
import { useState, useEffect } from "react";

export default function AgeVerification() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const isVerified = localStorage.getItem("isAdult");
    if (!isVerified) setIsOpen(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("isAdult", "true");
    setIsOpen(false);
  };

  const handleDecline = () => {
    window.location.href = "https://google.com";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm z-[9999]">
      {/* itt jön a modal tartalma */}
    </div>
  );
}


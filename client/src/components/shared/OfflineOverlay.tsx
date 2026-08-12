"use client";

import { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OfflineOverlay() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    // Set initial state
    setIsOffline(!navigator.onLine);

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white px-4 text-center">
      <div className="flex max-w-md flex-col items-center space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
          <WifiOff className="h-12 w-12 text-red-600" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-[#063325] font-serif">
            No Internet Connection
          </h1>
          <p className="text-muted-foreground text-lg">
            It looks like you're offline. Please check your network connection to continue collaborating.
          </p>
        </div>

        <Button 
          onClick={() => window.location.reload()}
          className="bg-[#063325] hover:bg-[#052b1f] text-white px-8 h-12 rounded-full font-medium shadow-md transition-transform hover:scale-105 active:scale-95"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}

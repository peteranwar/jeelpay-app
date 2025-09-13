"use client";

import { Loader2 } from "lucide-react";

export function LoaderOverlay({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 h-[100vh] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3 rounded-lg bg-white/15 px-6 py-4 shadow-lg">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="text-sm font-medium text-gray-700">Loading...</span>
      </div>
    </div>
  );
}

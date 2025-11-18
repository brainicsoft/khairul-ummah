"use client";

import { Suspense } from "react";

export default function SSRWrapper({ children }: any) {
  return (
    <Suspense fallback={<p className="text-center py-10 text-gray-600">Loading...</p>}>
      {children}
    </Suspense>
  );
}

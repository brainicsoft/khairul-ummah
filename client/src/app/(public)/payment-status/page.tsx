"use client"

import { Suspense, lazy } from "react"

const PaymentStatusPage = lazy(() => import("./PaymentPage"))

export default function PaymentStatusWrapper() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
          <p className="animate-pulse">Loading Payment Status...</p>
        </div>
      }
    >
      <PaymentStatusPage />
    </Suspense>
  )
}

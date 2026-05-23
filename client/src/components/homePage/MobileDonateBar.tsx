"use client"

import Link from "next/link"
import { Heart } from "lucide-react"

export function MobileDonateBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-white p-3 shadow-lg lg:hidden">
      <Link
        href="/donate"
        className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-primary text-lg font-bold text-primary-foreground"
      >
        <Heart className="h-5 w-5 fill-current" />
        দান করুন
      </Link>
    </div>
  )
}

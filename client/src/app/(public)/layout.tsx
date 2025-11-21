import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from "react-hot-toast"

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="public-layout min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
      <Toaster position="top-right" reverseOrder={false} />
        {children}
      </main>
      <Footer />
    </div>
  )
}
"use client"
import { AboutContent } from "@/components/about-content"

export default function AboutPage() {
  return (
    <>
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">আমাদের সম্পর্কে</h1>
        </div>
      </div>
      <AboutContent />

    </>
  )
}

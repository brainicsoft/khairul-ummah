import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProgramsGrid } from "@/components/programs-grid"

export default function ProgramsPage() {
  return (
    <>
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">আমাদের প্রোগ্রাম</h1>
        </div>
      </div>
      <ProgramsGrid />
    </>
  )
}

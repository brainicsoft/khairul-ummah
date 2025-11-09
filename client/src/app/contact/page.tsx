import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactContent } from "@/components/contact-content"

export default function ContactPage() {
  return (
    <>
     
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">যোগাযোগ করুন</h1>
        </div>
      </div>
      <ContactContent />
    </>
  )
}

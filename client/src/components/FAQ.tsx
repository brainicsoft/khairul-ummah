import { ChevronDown } from "lucide-react"
import { useState } from "react"

const faqItems = [
    { q: "আমার দান কোথায় ব্যয় হয়?", a: "আপনার দান সরাসরি আমাদের শিক্ষা, স্বাস্থ্য এবং দক্ষতা উন্নয়ন কর্মসূচিতে ব্যয় করা হয়।" },
    { q: "আমি নিয়মিত দান করতে পারি কি?", a: "হ্যাঁ, আপনি মাসিক বা বার্ষিক ভিত্তিতে নিয়মিত দান করতে পারেন।" },
    { q: "আমার ব্যক্তিগত তথ্য কি সুরক্ষিত থাকবে?", a: "সম্পূর্ণভাবে সুরক্ষিত। আমরা আন্তর্জাতিক নিরাপত্তা মান অনুসরণ করি।" },
  ]
const FAQ = () => {
      const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
    return (
        <div className="mt-16">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">প্রায়শ জিজ্ঞাসিত প্রশ্ন</h2>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {faqItems.map((item, idx) => (
                    <div key={idx} className="border border-border rounded-xl overflow-hidden shadow-sm">
                        <button
                            onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                            className="w-full flex items-center justify-between p-4 hover:bg-muted transition text-left"
                        >
                            <span className="font-semibold text-foreground">{item.q}</span>
                            <ChevronDown className={`w-5 h-5 text-primary transition-transform ${expandedFaq === idx ? "rotate-180" : ""}`} />
                        </button>
                        {expandedFaq === idx && <div className="px-4 py-3 bg-muted border-t border-border text-foreground/80">{item.a}</div>}
                    </div>
                ))}
            </div>
        </div>
    )
}   

export default FAQ
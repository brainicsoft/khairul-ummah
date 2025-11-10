import { TeamCard } from "@/components/TeamCard"
import { advisorsData } from "@/data/AdvisorData" 

export default function AdvisorsPage() {
  return (
    <div>
      <main className="min-h-screen ">
        {/* Header Section */}
        <section className="border-b py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">উপদেষ্টা মন্ডলী</h1>
              <p className="mt-4 text-lg text-slate-600">
                আমাদের অভিজ্ঞ এবং নিবেদিত উপদেষ্টারা সংস্থার দিকনির্দেশনা এবং কৌশলগত পরামর্শ প্রদান করে থাকেন। তাদের বিভিন্ন ক্ষেত্রের
                দক্ষতা আমাদের মিশন বাস্তবায়নে গুরুত্বপূর্ণ ভূমিকা রাখে।
              </p>
            </div>
          </div>
        </section>

        {/* Team Grid Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-3 lg:grid-cols-3">
              {advisorsData.map((advisor) => (
                <TeamCard key={advisor.id} member={advisor} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

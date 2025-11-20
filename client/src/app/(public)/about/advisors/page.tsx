import SSRLoadMoreData from "@/components/SSRLoadMoreData";
import { TeamCard } from "@/components/TeamCard"
import { apiUrl } from "@/config/constants";
import { advisorsData } from "@/data/advisorData"
import Image from "next/image";

interface TeamMember {
  id: string
  title: string
  name: string
  occupation?: string
  image: string 
  description?: string
}
interface AboutPageProps {
  searchParams?: Promise<{ limit?: string }>;
}
export default function AdvisorsPage({ searchParams }: AboutPageProps) {
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


        <SSRLoadMoreData<TeamMember>
          apiUrl={`${apiUrl}/commitee`}
          searchParams={searchParams}
          defaultLimit={8}
        >
          {(images) => {
            if (!images || images.length === 0) {
              return (
                <div className="text-center py-10 text-gray-500">
                  No data available
                </div>
              );
            }

            return (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.map((item, idx) => (
                  <div
                    key={item._id || idx}
                    className="relative h-64 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer group"
                  >
                    <Image
                      src={item.image}
                      alt={item.alt || `Gallery ${idx + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-300"
                    />
                  </div>
                ))}
              </div>
            );
          }}
        </SSRLoadMoreData>
      </main>
    </div>
  )
}

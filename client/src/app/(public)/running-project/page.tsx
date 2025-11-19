import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Image, { StaticImageData } from "next/image"
import SSRLoadMoreData from "@/components/SSRLoadMoreData"
import { apiUrl } from "@/config/constants"
type DonationStatus = "active" | "pending" | "completed"
type DonationType = {
  _id: number
  slug: string
  title: string
  desc: string
  benefits: string[]
  videoUrl: string
  image: string | StaticImageData
  color: string
  category: "regular" | "special" | "donor-type"
  status: DonationStatus,
}

interface donationTypePageProps {
  searchParams?: Promise<{ limit?: string }>;
}
export default function ProjectsPage({ searchParams }: donationTypePageProps) {
  return (
    <>
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-primary text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-balance mb-4">চলমান প্রকল্পসমূহ</h1>
            <p className="text-lg md:text-xl text-green-100 max-w-2xl">
              আমাদের চলমান প্রকল্পগুলিতে অংশগ্রহণ করুন এবং সমাজের উন্নয়নে অবদান রাখুন।
            </p>
          </div>
        </section>
        <SSRLoadMoreData<DonationType>
          apiUrl={`${apiUrl}/donation`}
          searchParams={searchParams}
          defaultLimit={8}
        >
          {(Projects) => {
            if (!Projects || Projects.length === 0) {
              return (
                <div className="text-center py-10 text-gray-500">
                  No data available
                </div>
              );
            }
            const runningProjects = Projects.filter(
              (type) => type.status === "active"
            )
            return (
              <div className="container mx-auto max-w-6xl grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
                {runningProjects.map((type) => (
                  <Link key={type._id} href={`/donate/${type.slug}`} className="group">
                    <div
                      className={`rounded-xl  h-full transform transition  hover:shadow-sm cursor-pointer border flex flex-col`}
                    >
                      {/* Top content */}
                      <div className="flex items-start justify-between mb-6">
                        <Image
                          className="w-full h-[250px] rounded-t-sm"
                          src={type.image} alt={type.title} width={500} height={300}
                        />
                        {/* <div className="text-5xl">{type.icon}</div> */}
                        <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition transform group-hover:translate-x-1 text-black" />
                      </div>

                      <div className="px-6 pb-6 flex flex-col flex-1 justify-between">
                        <div>
                          <h3 className="text-2xl font-bold mb-3">{type.title}</h3>
                          <p className=" leading-relaxed flex-grow">{type.desc}</p>
                        </div>

                        {/* Button always at bottom */}
                        <div className="flex flex-col justify-end">
                          <button className="mt-6 text-xl bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition w-full">
                            দান করুন
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            );
          }}
        </SSRLoadMoreData>
      </main>
    </>
  )
}

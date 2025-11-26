import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Image, { StaticImageData } from "next/image"
import DonationType from "@/assets/donateTypeImg/donate.jpg"
import SSRLoadMoreData from "@/components/SSRLoadMoreData"
import { apiUrl } from "@/config/constants"
import { InfoSection } from "@/components/donationType/InfoSection"
import regulardonateImg from "@/assets/donate-section/jakat.jpg"
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
}
interface GalleryPageProps {
  searchParams?: Promise<{ limit?: string }>;
}
export default function DonationTypesPage({ searchParams }: GalleryPageProps) {
  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16 md:py-24">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2760%27 height=%2760%27 viewBox=%270 0 60 60%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fillRule=%27evenodd%27%3E%3Cg fill=%27%23ffffff%27 fillOpacity=%270.1%27%3E%3Cpath d=%27M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-balance">অনুদান করুন</h1>
          <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
            আপনার পছন্দের তহবিলে অবদান রাখুন এবং সমাজ সেবায় অংশীদার হন
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">অনুদানের তহবিল নির্বাচন করুন</h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              আপনার প্রয়োজন এবং সামর্থ্য অনুযায়ী সঠিক তহবিলে অবদান রাখুন এবং সমাজের উন্নয়নে সাহায্য করুন
            </p>
          </div>
          <SSRLoadMoreData<DonationType>
            apiUrl={`${apiUrl}/donation`}
            searchParams={searchParams}
            defaultLimit={8}
          >
            {(donationTypes) => {
              if (!donationTypes || donationTypes.length === 0) {
                return (
                  <div className="text-center py-10 text-gray-500">
                    No data available
                  </div>
                );
              }

              return (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  <div
                    className={`rounded-xl  h-full transform transition  hover:shadow-sm cursor-pointer border flex flex-col`}
                  >
                    {/* Top content */}
                    <div className="flex items-start justify-between mb-6">
                      <Image
                        className="w-full h-[250px] rounded-t-sm"
                        src={regulardonateImg} alt="নিয়মিত অনুদান" width={500} height={300}
                      />
                      {/* <div className="text-5xl">{type.icon}</div> */}
                      <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition transform group-hover:translate-x-1 text-black" />
                    </div>

                    <div className="px-6 pb-6 flex flex-col flex-1 justify-between">
                      <div>
                        <h3 className="text-2xl font-bold mb-3">নিয়মিত অনুদান</h3>
                        <p className=" leading-relaxed flex-grow">নিয়মিত অনুদান ফাউন্ডেশনকে টিকিয়ে রাখতে সবচেয়ে বেশি সাহায্য করে।</p>

                      </div>
                      {/* Button always at bottom */}
                      <Link href="/donate/regular">
                        <button className="mt-6 text-xl bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition w-full">
                          দান করুন
                        </button>
                      </Link>
                    </div>
                  </div>

                  {donationTypes.map((type) => (
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
                          <button className="mt-6 text-xl bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition w-full">
                            দান করুন
                          </button>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              );
            }}
          </SSRLoadMoreData>
          {/* Info Section */}
          <InfoSection />
        </div>
      </main>
    </>
  )
}

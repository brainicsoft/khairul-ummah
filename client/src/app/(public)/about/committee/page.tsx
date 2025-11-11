import { TeamCard } from "@/components/TeamCard"
import jobaerimg from "@/assets/commiteeimg/jobaerimg.png"
import { committeeData } from "@/data/CommiteeData"
import Image from "next/image"

export default function CommitteePage() {
  return (
    <div>
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Header Section */}
        <section className="border-b border-slate-200 bg-white py-12 md:py-16">
          <div className="container mx-auto flex flex-col-reverse md:flex-row justify-between gap-5 px-4 sm:px-6 lg:px-8">
            <div className="md:max-w-2xl space-y-4 md:w-1/2 p-x-2 text-center md:text-left">
              <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">তত্ত্বাবধায়ক</h1>
              <h3 className="text-xl lg:text-4xl font-bold text-slate-900">মুফতি যুবায়ের আহমদ হাফি.</h3>
              {/* <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">উপদেষ্টা</p> */}
              <p className="text-md font-medium text-black">পরিচালক, ইসলামি দাওয়াহ ইনস্টিটিউট, ঢাকা <br />প্রিন্সিপাল, ইসলামিক অনলাইন মাদরাসা (IOM)</p>
              <p className="mt-4 text-lg text-slate-600 hidden md:flex">
                আমাদের নিবেদিত পরিচালনা পরিষদ, সংস্থার দৈনন্দিন কার্যক্রম তত্ত্বাবধান করে এবং সংগঠনের সুষ্ঠু পরিচালনা নিশ্চিত করে। তারা বিভিন্ন
                বিভাগে দক্ষতা এবং অভিজ্ঞতা নিয়ে কাজ করেন।
              </p>
            </div>

            {/* Image Container */}
            <div className="flex justify-center items-center overflow-hidden rounded-t-xl">
              <Image
                src={jobaerimg}
                alt="jobaerimg"
                className="object-cover border-8 border-[#6EC1E4] rounded-md w-full max-w-md "
              />
            </div>

          </div>

        </section>

        {/* Team Grid Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">


            <p className="text-4xl font-bold mb-5">পরিচালনা পরিষদ</p>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {committeeData.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

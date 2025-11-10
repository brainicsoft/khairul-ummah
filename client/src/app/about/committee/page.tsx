import { Header } from "@/components/header"
import { TeamCard } from "@/components/TeamCard"


const committeeMembers = [
  {
    id: "1",
    name: "আবদুল করিম",
    title: "চেয়ারম্যান",
    occupation: "ব্যবসায়ী এবং উদ্যোক্তা",
    image: "/professional-man-chairman-businessman-entrepreneur.jpg",
    description: "দাতব্য খাতে ২০ বছরের নেতৃত্ব এবং সংগঠন পরিচালনায় অভিজ্ঞ।",
  },
  {
    id: "2",
    name: "নাজমা সুলতানা",
    title: "সদস্য - প্রোগ্রাম পরিচালনা",
    occupation: "প্রোগ্রাম ম্যানেজার এবং গবেষকা",
    image: "/professional-woman-program-manager-researcher.jpg",
    description: "কমিউনিটি উন্নয়ন প্রকল্পের পরিকল্পনা এবং বাস্তবায়নে নেতৃত্ব দেন।",
  },
  {
    id: "3",
    name: "রহিম সাহেব",
    title: "সদস্য - অর্থ ও প্রশাসন",
    occupation: "আর্থিক উপদেষ্টা এবং অডিটর",
    image: "/professional-man-finance-advisor-auditor-accountan.jpg",
    description: "সংস্থার আর্থিক স্বচ্ছতা এবং জবাবদিহিতা নিশ্চিত করেন।",
  },
  {
    id: "4",
    name: "লায়লা আক্তার",
    title: "সদস্য - মনিটরিং এবং মূল্যায়ন",
    occupation: "গবেষকা এবং মূল্যায়ন বিশেষজ্ঞ",
    image: "/professional-woman-researcher-evaluation-specialis.jpg",
    description: "প্রকল্পের প্রভাব মূল্যায়ন এবং উন্নতি সুপারিশ প্রদান করেন।",
  },
  {
    id: "5",
    name: "ইব্রাহিম খান",
    title: "সদস্য - সম্প্রসারণ এবং অংশীদারিত্ব",
    occupation: "নেটওয়ার্ক ডেভেলপার এবং সম্পর্ক ব্যবস্থাপক",
    image: "/professional-man-network-developer-partnership-man.jpg",
    description: "অংশীদার সংস্থা এবং স্টেকহোল্ডারদের সাথে সম্পর্ক গড়ে তোলেন।",
  },
  {
    id: "6",
    name: "আয়শা খাতুন",
    title: "সদস্য - কার্যক্রম সমন্বয়",
    occupation: "প্রকল্প সমন্বয়কারী এবং ক্ষেত্র প্রশিক্ষক",
    image: "/professional-woman-project-coordinator-field-train.jpg",
    description: "বাস্তবভিত্তিক কার্যক্রম বাস্তবায়ন এবং দলের সমন্বয় করেন।",
  },
]

export default function CommitteePage() {
  return (
    <div>
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Header Section */}
        <section className="border-b border-slate-200 bg-white py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">পরিচালনা পরিষদ</h1>
              <p className="mt-4 text-lg text-slate-600">
                আমাদের নিবেদিত পরিচালনা পরিষদ সংস্থার দৈনন্দিন কার্যক্রম তত্ত্বাবধান করে এবং সংগঠনের সুষ্ঠু পরিচালনা নিশ্চিত করে। তারা বিভিন্ন
                বিভাগে দক্ষতা এবং অভিজ্ঞতা নিয়ে কাজ করেন।
              </p>
            </div>
          </div>
        </section>

        {/* Team Grid Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {committeeMembers.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

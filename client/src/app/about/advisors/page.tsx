import { Header } from "@/components/header"
import { TeamCard } from "@/components/TeamCard"

const advisors = [
  {
    id: "1",
    name: "ড. আহমেদ সাহেব",
    title: "প্রধান উপদেষ্টা",
    occupation: "অর্থনীতিবিদ এবং শিক্ষক",
    image: "/professional-man-advisor-economist-teacher.jpg",
    description: "বিশ্ববিদ্যালয়ে অর্থনীতির অধ্যাপক এবং উন্নয়ন কর্মসূচির নেতৃত্ব প্রদান করেন।",
  },
  {
    id: "2",
    name: "ফাতিমা বেগম",
    title: "সামাজিক উন্নয়ন উপদেষ্টা",
    occupation: "সামাজিক কর্মী এবং এনজিও পরিচালক",
    image: "/professional-woman-social-worker-director-ngo.jpg",
    description: "সম্প্রদায় উন্নয়ন এবং দাতব্য কার্যক্রমে ২৫ বছরের অভিজ্ঞতা রয়েছে।",
  },
  {
    id: "3",
    name: "করিম খান",
    title: "আর্থিক উপদেষ্টা",
    occupation: "সনদপ্রাপ্ত অ্যাকাউন্ট্যান্ট",
    image: "/professional-man-accountant-finance-advisor.jpg",
    description: "আর্থিক পরিকল্পনা এবং নিরীক্ষায় বিশেষজ্ঞ এবং অভিজ্ঞ পরামর্শদাতা।",
  },
  {
    id: "4",
    name: "সালমা রানা",
    title: "শিক্ষা উপদেষ্টা",
    occupation: "শিক্ষা প্রকল্প ব্যবস্থাপক",
    image: "/professional-woman-education-manager-teacher.jpg",
    description: "শিক্ষা কর্মসূচি উন্নয়ন এবং বাস্তবায়নে অগ্রণী ভূমিকা রাখছেন।",
  },
  {
    id: "5",
    name: "হাসান মোহাম্মদ",
    title: "প্রযুক্তি উপদেষ্টা",
    occupation: "সিনিয়র সফটওয়্যার ইঞ্জিনিয়ার",
    image: "/professional-man-technology-engineer-software-deve.jpg",
    description: "ডিজিটাল রূপান্তর এবং প্রযুক্তি সমাধান বাস্তবায়নে দক্ষ।",
  },
  {
    id: "6",
    name: "মেহর আফরোজ",
    title: "স্বাস্থ্য ও সুস্থতা উপদেষ্টা",
    occupation: "পাবলিক হেলথ স্পেশালিস্ট",
    image: "/professional-woman-doctor-health-specialist-medica.jpg",
    description: "স্বাস্থ্য সচেতনতা এবং সম্প্রদায় কল্যাণ কর্মসূচিতে নিয়োজিত।",
  },
]
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
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {advisors.map((advisor) => (
                <TeamCard key={advisor.id} member={advisor} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

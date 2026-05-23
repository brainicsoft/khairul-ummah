import { TeamMember } from "@/@types/TeamMemberProps"
import AdvisorHeader from "@/components/aboutPage/AdvisorHeader"
import { AdvisorCard } from "@/components/aboutPage/AdvisorCard"
import SSRLoadMoreData from "@/components/SSRLoadMoreData"
import { apiUrl } from "@/config/constants"
import Link from "next/link"
import { Users } from "lucide-react"

interface AboutPageProps {
  searchParams?: Promise<{ limit?: string }>
}

export default function AdvisorsPage({ searchParams }: AboutPageProps) {
  return (
    <main className="min-h-screen bg-background">
      <AdvisorHeader />

      <section className="py-14 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              আমাদের উপদেষ্টাবৃন্দ
            </h2>
            <p className="mt-3 text-muted-foreground">
              বিভিন্ন ক্ষেত্রের অভিজ্ঞ ব্যক্তিত্ব যারা খাইরুল উম্মাহ ফাউন্ডেশনের মিশনকে
              এগিয়ে নিতে পরামর্শ ও সহায়তা করেন।
            </p>
          </div>

          <SSRLoadMoreData<TeamMember>
            apiUrl={`${apiUrl}/commitee`}
            searchParams={searchParams}
            defaultLimit={20}
            roleType="উপদেষ্টা"
          >
            {(advisors) => {
              if (!advisors || advisors.length === 0) {
                return (
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white py-16 text-center">
                    <Users className="mb-4 h-12 w-12 text-muted-foreground/50" />
                    <p className="text-lg font-medium text-muted-foreground">
                      এখনও কোনো উপদেষ্টার তথ্য যোগ করা হয়নি
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      শীঘ্রই এখানে উপদেষ্টা মন্ডলীর তালিকা দেখা যাবে
                    </p>
                  </div>
                )
              }

              return (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                  {advisors.map((advisor) => (
                    <AdvisorCard key={advisor.id} member={advisor} />
                  ))}
                </div>
              )
            }}
          </SSRLoadMoreData>

          <div className="mt-16 rounded-xl border border-border bg-white p-8 text-center md:p-10">
            <h3 className="text-xl font-bold text-foreground md:text-2xl">
              পরিচালনা পরিষদের সাথে পরিচিত হন
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
              যারা ফাউন্ডেশনের দৈনন্দিন কার্যক্রম তত্ত্বাবধান ও পরিচালনায় নিয়োজিত।
            </p>
            <Link
              href="/about/committee"
              className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-primary px-8 font-semibold text-primary-foreground transition hover:bg-accent"
            >
              পরিচালনা পরিষদ দেখুন
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

import Image from "next/image"
import { Briefcase, ClipboardList, Users } from "lucide-react"
import jobaerimg from "@/assets/commiteeimg/jobaerimg.png"

const highlights = [
  {
    icon: ClipboardList,
    title: "দৈনন্দিন তত্ত্বাবধান",
    desc: "ফাউন্ডেশনের কার্যক্রম নিয়মিত মনিটর ও পরিচালনা",
  },
  {
    icon: Briefcase,
    title: "সুষ্ঠু পরিচালনা",
    desc: "সংগঠনের নীতি ও লক্ষ্য অনুযায়ী সিদ্ধান্ত গ্রহণ",
  },
  {
    icon: Users,
    title: "দক্ষতা ও অভিজ্ঞতা",
    desc: "বিভিন্ন বিভাগে অভিজ্ঞ সদস্যদের সমন্বিত কাজ",
  },
]

const CommiteeHeader = () => {
  return (
    <section className="border-b border-border bg-linear-to-b from-primary/[0.04] via-slate-50/80 to-white">
      <div className="container mx-auto px-4 py-10 md:py-14">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            পরিচালনা পরিষদ
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            আমাদের নিবেদিত পরিচালনা পরিষদ সংস্থার দৈনন্দিন কার্যক্রম তত্ত্বাবধান করে এবং
            সংগঠনের সুষ্ঠু পরিচালনা নিশ্চিত করে।
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-5xl flex-col items-center gap-6 rounded-xl border border-border/80 bg-white/90 p-5 shadow-sm sm:gap-8 sm:p-6 md:flex-row md:items-center md:p-8">
          <div className="relative aspect-[3/4] w-full max-w-[300px] shrink-0 overflow-hidden rounded-xl border border-border bg-muted sm:max-w-[340px] md:max-w-[380px] lg:max-w-[420px]">
            <Image
              src={jobaerimg}
              alt="মুফতি যুবায়ের আহমদ হাফি."
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 300px, 420px"
              priority
            />
          </div>

          <div className="min-w-0 flex-1 text-center md:text-left">
            <p className="text-sm font-semibold text-primary">তত্ত্বাবধায়ক</p>
            <h2 className="mt-1 text-xl font-bold text-foreground sm:text-2xl md:text-3xl">
              মুফতি যুবায়ের আহমদ হাফি.
            </h2>
            <p className="mt-2 text-sm font-medium leading-snug text-foreground">
              পরিচালক, ইসলামি দাওয়াহ ইনস্টিটিউট, ঢাকা
              <br />
              প্রিন্সিপাল, ইসলামিক অনলাইন মাদরাসা (IOM)
            </p>
            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              ফাউন্ডেশনের শিক্ষা, সেবা ও দাওয়ায় সর্বত্র কার্যক্রমের সার্বিক দিকনির্দেশনায়
              নিয়োজিত।
            </p>
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border/80 bg-white/90 p-5 text-center shadow-sm"
            >
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-foreground">{item.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CommiteeHeader

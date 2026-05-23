import { Lightbulb, Shield, Users } from "lucide-react"

const highlights = [
  {
    icon: Lightbulb,
    title: "কৌশলগত পরামর্শ",
    desc: "সংস্থার দীর্ঘমেয়াদি লক্ষ্য নির্ধারণে দিকনির্দেশনা",
  },
  {
    icon: Shield,
    title: "অভিজ্ঞতা ও বিশ্বাস",
    desc: "বিভিন্ন ক্ষেত্রের বিশেষজ্ঞদের সম্মিলিত অভিজ্ঞতা",
  },
  {
    icon: Users,
    title: "মিশন বাস্তবায়ন",
    desc: "শিক্ষা, সেবা ও দাওয়ায় সহায়ক ভূমিকা",
  },
]

const AdvisorHeader = () => {
  return (
    <section className="border-b border-border bg-linear-to-b from-primary/[0.04] via-slate-50/80 to-white">
      <div className="container mx-auto px-4 py-10 md:py-14">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            উপদেষ্টা মন্ডলী
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            আমাদের অভিজ্ঞ ও নিবেদিত উপদেষ্টারা সংস্থার কৌশলগত সিদ্ধান্ত, শিক্ষার অগ্রাধিকার,
            সেবামূলক কার্যক্রম ও দাওয়ায় সর্বত্র কাজে দিকনির্দেশনা দিয়ে থাকেন।
          </p>
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
              <h2 className="font-bold text-foreground">{item.title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AdvisorHeader

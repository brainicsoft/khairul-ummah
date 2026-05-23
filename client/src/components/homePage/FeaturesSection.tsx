import { Heart, Users, Home } from "lucide-react"

const features = [
  {
    icon: Heart,
    title: "দাতব্য কাজ",
    description: "দরিদ্র ও অসহায় মানুষের জন্য নিয়মিত দাতব্য ও সহায়তা।",
  },
  {
    icon: Users,
    title: "শিক্ষা কর্মসূচি",
    description: "শিশু ও যুবকদের জন্য বিনামূল্যে শিক্ষা ও প্রশিক্ষণ।",
  },
  {
    icon: Home,
    title: "সামাজিক সেবা",
    description: "গ্রাম ও শহরে মানবিক সেবা ও সামাজিক উন্নয়ন।",
  },
]

export function FeaturesSection() {
  return (
    <section className="bg-muted/40 py-14 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-bold text-primary md:text-3xl">
          আমাদের উদ্দেশ্য
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-muted-foreground">
          সমাজের কল্যাণে আমরা যে কাজগুলো করি
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-border bg-white p-8 text-center shadow-sm"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-primary">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

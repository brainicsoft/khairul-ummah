import { Heart, Users, Home } from "lucide-react"

const features = [
  {
    icon: Heart,
    title: "দাতব্য কাজ",
    description: "আমরা দরিদ্র ও অসহায় মানুষের জন্য বিভিন্ন দাতব্য কর্মসূচি পরিচালনা করি।",
  },
  {
    icon: Users,
    title: "শিক্ষা কর্মসূচি",
    description: "শিক্ষার্থীদের জন্য বিনামূল্যে শিক্ষা এবং প্রশিক্ষণ কর্মসূচি।",
  },
  {
    icon: Home,
    title: "সামাজিক সেবা",
    description: "সমাজের উন্নয়নে বিভিন্ন মানবিক এবং সামাজিক উদ্যোগ।",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary">উদ্দেশ্য ও লক্ষ্য</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          আমাদের মূল উদ্দেশ্য হল সমাজের সকল স্তরের মানুষের উন্নয়ন এবং কল্যাণ নিশ্চিত করা।
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div key={idx} className="bg-card p-8 rounded-lg border border-border hover:shadow-lg transition">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-primary">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

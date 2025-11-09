import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import floodrelief from "../../assets/activities/flood-relief.jpg"
import helthActivityimg from "../../assets/activities/helthmeet.jpg"
import primarymeetimg from "../../assets/opinion-meetimg/meet2.jpg"
const activities = [
  {
    id: 1,
    category: "শিক্ষা কর্যক্রম",
    title: "প্রাথমিক শিক্ষা কর্মসূচি",
    description: "গ্রামীণ এলাকার অসচেতন শিশুদের জন্য বিনামূল্যে প্রাথমিক শিক্ষা প্রদান করা হয়।",
    image: primarymeetimg,
  },
  {
    id: 2,
    category: "স্বাস্থ্য কর্যক্রম",
    title: "স্বাস্থ্য সচেতনতা",
    description: "সাধারণ মানুষের মধ্যে স্বাস্থ্য সচেতনতা বৃদ্ধির জন্য বিভিন্ন কর্মসূচি।",
    image: helthActivityimg,
  },
  {
    id: 3,
    category: "শিক্ষা কর্যক্রম",
    title: "বৃত্তি কর্মসূচি",
    description: "মেধাবী কিন্তু দরিদ্র শিক্ষার্থীদের জন্য শিক্ষা বৃত্তি প্রদান।",
    image: "/scholarship-program.jpg",
  },
  {
    id: 4,
    category: "দক্ষতা উন্নয়ন",
    title: "দক্ষতা উন্নয়ন",
    description: "বেকার যুবকদের বিভিন্ন দক্ষতা প্রশিক্ষণ প্রদান করা হয়।",
    image: "/skill-training.jpg",
  },
  {
    id: 5,
    category: "নারী ক্ষমতায়ন",
    title: "নারী ক্ষমতায়ন",
    description: "নারীদের অর্থনৈতিক এবং সামাজিক ক্ষমতায়ন কর্মসূচি।",
    image: "/women-empowerment.png",
  },
  {
    id: 6,
    category: "দুর্যোগ ত্রাণ",
    title: "দুর্যোগ ত্রাণ",
    description: "প্রাকৃতিক দুর্যোগে ক্ষতিগ্রস্ত মানুষদের জন্য ত্রাণ কর্মসূচি।",
    image: floodrelief,
  },
  {
    id: 7,
    category: "পরিবেশ সংরক্ষণ",
    title: "পরিবেশ সংরক্ষণ",
    description: "পরিবেশ রক্ষা এবং বৃক্ষরোপণ কর্মসূচি।",
    image: "/environment-conservation.jpg",
  },
  {
    id: 8,
    category: "কৃষি উন্নয়ন",
    title: "কৃষি উন্নয়ন",
    description: "আধুনিক কৃষি পদ্ধতি প্রচার এবং কৃষকদের প্রশিক্ষণ।",
    image: "/agricultural-development.jpg",
  },
  {
    id: 9,
    category: "সামাজিক কর্যক্রম",
    title: "যুব সমাজ সেবা",
    description: "যুবকদের দেশপ্রেম এবং সামাজিক দায়বদ্ধতা বৃদ্ধির কর্মসূচি।",
    image: "/youth-service.jpg",
  },
  {
    id: 10,
    category: "সামাজিক কর্যক্রম",
    title: "পরিবার পরিকল্পনা",
    description: "পরিবার পরিকল্পনা এবং পরিবার সুরক্ষা কর্মসূচি।",
    image: floodrelief,
  },
  {
    id: 11,
    category: "অন্যান্য",
    title: "দাতব্য কর্মসূচি",
    description: "বিভিন্ন দাতব্য কর্মসূচি এবং সামাজিক দায়বদ্ধতা প্রকল্প।",
    image: primarymeetimg,
  },
]

export default function ActivitiesPage() {
  return (
    <>

      {/* Page Header */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">আমাদের কার্যক্রম</h1>
          <p className="mt-4 text-lg opacity-90">খাইরুল উম্মাহ ফাউন্ডেশনের সমস্ত কার্যক্রম এবং প্রকল্প</p>
        </div>
      </div>

      {/* Activities Grid */}
      <main className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition group"
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden bg-muted">
                  <Image
                    src={activity.image || "/placeholder.svg?height=192&width=384&query=activity"}
                    alt={activity.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    {activity.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 text-primary line-clamp-2">{activity.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{activity.description}</p>
                  <button className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition group/btn">
                    <span>বিস্তারিত দেখুন</span>
                    <span className="ml-2 group-hover/btn:translate-x-1 transition">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

 
    </>
  )
}

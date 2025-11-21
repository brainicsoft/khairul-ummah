import Image from "next/image"
import Link from "next/link"
import SSRLoadMoreData from "@/components/SSRLoadMoreData"
import { apiUrl } from "@/config/constants"

// const activities = [
//   {
//     id: 1,
//     category: "শিক্ষা কর্যক্রম",
//     title: "প্রাথমিক শিক্ষা কর্মসূচি",
//     description:
//       "গ্রামীণ এলাকার অসচেতন ও সুবিধাবঞ্চিত শিশুদের জন্য বিনামূল্যে প্রাথমিক শিক্ষা প্রদান করা হয়। আমরা শিক্ষকদের প্রশিক্ষণ, বইপত্র, এবং শিক্ষার্থীদের জন্য পুষ্টিকর খাবার সরবরাহ করে থাকি, যাতে তারা আগ্রহের সঙ্গে স্কুলে আসতে পারে এবং ভবিষ্যৎ গড়তে সক্ষম হয়।",
//     image: primarymeetimg,
//   },
//   {
//     id: 2,
//     category: "স্বাস্থ্য কর্যক্রম",
//     title: "স্বাস্থ্য সচেতনতা",
//     description:
//       "সাধারণ মানুষের মধ্যে স্বাস্থ্য সচেতনতা বৃদ্ধির জন্য বিনামূল্যে স্বাস্থ্য ক্যাম্প, রক্তদান কর্মসূচি এবং নিয়মিত স্বাস্থ্য পরামর্শ প্রদান করা হয়। আমরা স্থানীয় চিকিৎসক ও স্বেচ্ছাসেবকদের সহযোগিতায় প্রতিদিন সমাজে একটি সুস্থ পরিবেশ গড়ে তোলার জন্য কাজ করছি।",
//     image: helthActivityimg,
//   },
//   {
//     id: 3,
//     category: "শিক্ষা কর্যক্রম",
//     title: "বৃত্তি কর্মসূচি",
//     description:
//       "মেধাবী কিন্তু আর্থিকভাবে অক্ষম শিক্ষার্থীদের জন্য আমরা বার্ষিক শিক্ষা বৃত্তি প্রদান করে থাকি। এর মাধ্যমে তারা তাদের শিক্ষা কার্যক্রম অব্যাহত রাখতে পারে এবং ভবিষ্যতে দেশের সম্পদ হিসেবে গড়ে উঠতে সক্ষম হয়।",
//     image: "/scholarship-program.jpg",
//   },
//   {
//     id: 4,
//     category: "দক্ষতা উন্নয়ন",
//     title: "দক্ষতা উন্নয়ন প্রশিক্ষণ",
//     description:
//       "বেকার যুবকদের কর্মসংস্থানের সুযোগ তৈরি করতে বিভিন্ন ধরনের প্রশিক্ষণ দেওয়া হয়, যেমন কম্পিউটার, সেলাই, ইলেকট্রিক্যাল কাজ, ও উদ্যোক্তা প্রশিক্ষণ। এর মাধ্যমে তারা আত্মনির্ভর হতে পারে।",
//     image: "/skill-training.jpg",
//   },
//   {
//     id: 5,
//     category: "নারী ক্ষমতায়ন",
//     title: "নারী ক্ষমতায়ন উদ্যোগ",
//     description:
//       "নারীদের অর্থনৈতিক ও সামাজিক অবস্থান উন্নয়নের জন্য আমরা বিভিন্ন উদ্যোগ গ্রহণ করেছি, যেমন সেলাই প্রশিক্ষণ, ক্ষুদ্র উদ্যোক্তা সহায়তা, এবং আইনি সহায়তা কর্মসূচি।",
//     image: "/women-empowerment.png",
//   },
//   {
//     id: 6,
//     category: "দুর্যোগ ত্রাণ",
//     title: "দুর্যোগ ত্রাণ কর্মসূচি",
//     description:
//       "প্রাকৃতিক দুর্যোগে ক্ষতিগ্রস্ত পরিবারগুলোর পাশে দাঁড়ানো আমাদের অন্যতম দায়িত্ব। আমরা খাদ্য, ওষুধ, পোশাক এবং আশ্রয় সহায়তা দিয়ে তাদের পুনর্বাসনে সহায়তা করি।",
//     image: floodrelief,
//   },
//   {
//     id: 7,
//     category: "পরিবেশ সংরক্ষণ",
//     title: "পরিবেশ সংরক্ষণ ও বৃক্ষরোপণ",
//     description:
//       "পরিবেশ রক্ষা এবং জলবায়ু পরিবর্তনের প্রভাব কমাতে নিয়মিত বৃক্ষরোপণ, পরিচ্ছন্নতা অভিযান, এবং সচেতনতা প্রচারণা পরিচালনা করা হয়।",
//     image: "/environment-conservation.jpg",
//   },
// ]

interface IActivity {
  _id: string
  category: string
  title: string
  description: string
  image: string
  content?: string
  slug: string
}

interface ActivitiesPageProps {
  searchParams?: Promise<{ limit?: string }>;
}
export default function ActivitiesPage({ searchParams }: ActivitiesPageProps) {
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

          <SSRLoadMoreData<IActivity>
            apiUrl={`${apiUrl}/activities`}
            searchParams={searchParams}
            defaultLimit={12}
          >
            {(activitiesData) => {
              if (!activitiesData || activitiesData.length === 0) {
                return (
                  <div className="text-center py-10 text-gray-500">
                    No data available
                  </div>
                );
              }

              return (
                <>

                  <div className="grid md:grid-cols-3 gap-8">
                    {activitiesData.map((activity) => (
                      <div
                        key={activity._id}
                        className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition group"
                      >
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden bg-muted">
                          <Image
                            src={activity.image || "/placeholder.svg"}
                            alt={activity.title}
                            fill
                            className="object-cover group-hover:scale-105 transition duration-300"
                          />
                          <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
                            {activity.category}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <h3 className="text-lg font-semibold mb-2 text-primary">{activity.title}</h3>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{activity.description}</p>
                          <Link
                            href={`/activities/${activity.slug}`}
                            className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition group/btn"
                          >
                            <span>বিস্তারিত দেখুন</span>
                            <span className="ml-2 group-hover/btn:translate-x-1 transition">→</span>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>

                </>
              );

            }}
          </SSRLoadMoreData>

        </div>
      </main>
    </>
  )
}

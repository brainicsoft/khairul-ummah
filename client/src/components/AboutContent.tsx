"use client"

import Image from "next/image"
import { CheckCircle } from "lucide-react"
import aboutimg from "../assets/opinion-meetimg/meet1.jpg"

export function AboutContent() {
  const missionPoints = [
    "সমাজের সকল স্তরের মানুষের উন্নয়ন এবং কল্যাণ নিশ্চিত করা",
    "শিক্ষা, স্বাস্থ্য এবং দক্ষতা উন্নয়নে সহায়তা প্রদান করা",
    "দুর্বল এবং অসচেতন মানুষের অধিকার রক্ষা করা",
    "সামাজিক ন্যায়বিচার এবং সমতা প্রতিষ্ঠা করা",
    "সম্প্রদায়ের সাথে কাজ করে টেকসই উন্নয়ন লক্ষ্য অর্জন করা",
    "নৈতিক এবং স্বচ্ছ কাজের মাধ্যমে সমাজে বিশ্বাস অর্জন করা",
  ]

  const visionPoints = [
    "একটি ন্যায়বহাল এবং সমৃদ্ধ সমাজ গড়ে তোলা",
    "প্রতিটি মানুষের সর্বোচ্চ সম্ভাবনা বিকাশে সহায়তা করা",
    "বৈশ্বিক মানের সামাজিক সেবা প্রদান নিশ্চিত করা",
  ]

  const goalPoints = [
    "হাজার হাজার শিশুকে গুণমানসম্পন্ন শিক্ষা প্রদান করা",
    "গ্রামীণ এলাকায় স্বাস্থ্যসেবা সুবিধা সম্প্রসারণ করা",
    "তরুণদের চাকরিযোগ্য দক্ষতা প্রশিক্ষণ প্রদান করা",
    "নারী ক্ষমতায়ন এবং আর্থিক স্বাধীনতা নিশ্চিত করা",
    "দুর্যোগ ত্রাণ এবং জরুরি সহায়তা প্রদান করা",
    "পরিবেশ সংরক্ষণ ও সবুজ উদ্যোগ গ্রহণ করা",
  ]

  return (
    <div className="bg-white">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative h-80 rounded-lg overflow-hidden">
              <Image src={aboutimg} alt="আমাদের সম্পর্কে" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">খাইরুল উম্মাহ ফাউন্ডেশনের পরিচয়</h2>
              <p className="text-muted-foreground mb-6">
                খাইরুল উম্মাহ ফাউন্ডেশন হল একটি অলাভজনক সামাজিক সংস্থা যা সমাজের উন্নয়ন এবং মানুষের কল্যাণে নিয়োজিত। আমরা বিশ্বাস করি যে
                সমাজের প্রতিটি স্তরের মানুষের উন্নয়ন এবং সেবা করা আমাদের দায়িত্ব।
              </p>
              <p className="text-muted-foreground">
                গত অনেক বছর ধরে আমরা শিক্ষা, স্বাস্থ্য, দক্ষতা উন্নয়ন এবং অন্যান্য সামাজিক কাজে অসংখ্য মানুষের সেবা করেছি।
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-primary">নীতি ও আদর্শ</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-6 text-primary">আমাদের মিশন</h3>
              <ul className="space-y-3">
                {missionPoints.map((point, idx) => (
                  <li key={idx} className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6 text-primary">আমাদের ভিশন</h3>
              <ul className="space-y-3">
                {visionPoints.map((point, idx) => (
                  <li key={idx} className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-primary text-center">লক্ষ্য-উদ্দেশ্য</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {goalPoints.map((goal, idx) => (
              <div key={idx} className="bg-muted p-6 rounded-lg border-l-4 border-primary">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                    {idx + 1}
                  </div>
                  <p className="text-muted-foreground">{goal}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

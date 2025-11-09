"use client"

import Link from "next/link"
import Image from "next/image"
import meeting1 from "../assets/opinion-meetimg/meet1.jpg"
import meeting2 from "../assets/opinion-meetimg/meet2.jpg"

export function ProgramsPreview() {
  const programs = [
    {
      id: 1,
      title: "শিক্ষা কর্মসূচি",
      desc: "অসচেতন শিশুদের জন্য মানসম্মত শিক্ষা প্রদান করা হয়।",
      image: meeting1,
    },
    {
      id: 2,
      title: "স্বাস্থ্য সেবা",
      desc: "গ্রামীণ এলাকায় বিনামূল্যে চিকিৎসা সেবা প্রদান।",
      image: meeting2,
    },
    {
      id: 3,
      title: "দক্ষতা উন্নয়ন",
      desc: "তরুণদের বিভিন্ন দক্ষতা উন্নয়ন প্রশিক্ষণ।",
      image: meeting1,
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">আমাদের কার্যক্রম সমূহ</h2>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {programs.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={program.image || "/placeholder.svg"}
                  alt={program.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-primary">
                    {program.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{program.desc}</p>
                </div>

                <button className="text-primary font-semibold hover:text-primary/80 transition mt-auto">
                  আরও জানুন →
                </button>
              </div>
            </div>
          ))}
        </div>


        <div className="text-center">
          <Link href="/activities">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition">
              সকল কার্যক্রম দেখুন
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

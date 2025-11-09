"use client"

import Image from "next/image"
import Link from "next/link"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import nomuslem1 from "../assets/donate-section/social-meeting.jpg"
import korbani from "../assets/donate-section/korbani.jpg"
import jakat from "../assets/donate-section/jakat.jpg"
import nomuslem2 from "../assets/donate-section/noumoslim.jpg"

const fundTypes = [
  {
    id: "nomuslem",
    title: "নৌমুসলিম তহবিল",
    desc: "অমুসলিম পরিবার এবং সংখ্যালঘু সম্প্রদায়ের কল্যাণে ব্যয় করা হয়।",
    image: nomuslem2,
  },
  {
    id: "qurbani",
    title: "কোরবানি তহবিল",
    desc: "কোরবানির গোশত দরিদ্র পরিবারের মধ্যে বিতরণ এবং সাহায্য কর্মসূচি।",
    image: korbani,
  },
  {
    id: "emergency-flood",
    title: "জরুরি বন্যা তহবিল",
    desc: "বন্যা ও প্রাকৃতিক দুর্যোগে ত্রাণ ও পুনর্বাসন কার্যক্রম।",
    image: "/flood-relief-disaster.jpg",
  },
  {
    id: "zakat",
    title: "জাকাত তহবিল",
    desc: "ইসলামিক নীতি অনুযায়ী দরিদ্র ও অসহায় মানুষের সেবায় ব্যয়।",
    image: jakat,
  },
]

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
  },
}

export function DonationFundsCarousel() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary">
          অনুদান তহবিলসমূহ
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          আপনার পছন্দের তহবিলে অবদান রাখুন এবং সমাজের উন্নয়নে সহায়তা করুন
        </p>

        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000} // প্রতি 3 সেকেন্ডে slide হবে
          keyBoardControl={true}
          // showDots={true}
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {fundTypes.map((fund) => (
            <div
              key={fund.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col mx-2"
            >
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={fund.image || "/placeholder.svg"}
                  alt={fund.title}
                  fill
                  className="object-cover "
                />
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">{fund.title}</h3>
                  <p className="text-muted-foreground mb-4">{fund.desc}</p>
                </div>

                <Link href={`/donate/${fund.id}`}>
                  <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition w-full">
                    দান করুন
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </Carousel>

        <div className="mt-12 text-center">
          <Link href="/donate">
            <button className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/5 transition">
              সকল তহবিল দেখুন →
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

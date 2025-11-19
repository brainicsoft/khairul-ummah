
import { apiUrl } from "@/config/constants"
import Image from "next/image"
import Link from "next/link"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
// import nomuslem1 from "@/assets/donate-section/social-meeting.jpg"

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

const loadDataLimit = 10 // for home section carousel
const res = await fetch(`${apiUrl}/donation?page=1&limit=${loadDataLimit}`, { cache: "no-store" });
const json = await res.json();
 const items = json?.data || [];
console.log(items)
export function Donation() {
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
          {items.map((fund) => (
            <div
              key={fund.id}
              className="bg-white shadow-md mb-3 rounded-xl overflow-hidden flex flex-col mx-2"
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

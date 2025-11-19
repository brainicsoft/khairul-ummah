import Image from "next/image"
import Link from "next/link"
import { apiUrl } from "@/config/constants"

const res = await fetch(`${apiUrl}/gallery?page=1&limit=6`, { cache: "no-store" });
const json = await res.json();
const items = json?.data || [];
console.log(items)

export function Gallery() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">গ্যালারি</h2>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {items.map((image:any, idx:number) => (
            <div
              key={idx}
              className="relative h-64 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer"
            >
              <Image
                src={image.image || "/placeholder.svg"}
                alt={`Gallery ${idx + 1}`}
                fill
                className="object-cover hover:scale-110 transition duration-300"
              />
            </div>
          ))}
        </div>

        <Link href="/gellery">
          <div className="text-center">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition">
              আরও দেখুন
            </button>
          </div>
        </Link>
      </div>
    </section>
  )
}

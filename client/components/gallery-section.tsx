import Image from "next/image"
import gellery1 from "../assets/gellery/gellery1.jpg"
import gellery2 from "../assets/gellery/gellery2.jpg"
import gellery3 from "../assets/gellery/gellery3.jpg"
import gellery4 from "../assets/gellery/gellery4.jpg"
import gellery5 from "../assets/gellery/gellery5.jpg"
import gellery7 from "../assets/gellery//gellery7.jpg"


const galleries = [
  { title: "সাফল্যের গল্প", id: "success" },
  { title: "ইভেন্ট", id: "events" },
]

const images = [
  gellery1,
  gellery2,
  gellery3,
  gellery4,
  gellery5,
  gellery7

]

export function GallerySection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">গ্যালারি</h2>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {images.map((image, idx) => (
            <div
              key={idx}
              className="relative h-64 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer"
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Gallery ${idx + 1}`}
                fill
                className="object-cover hover:scale-110 transition duration-300"
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition">
            আরও দেখুন
          </button>
        </div>
      </div>
    </section>
  )
}

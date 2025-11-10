// app/gellery/page.tsx
import Image from "next/image"
import gellery1 from "@/assets/gellery/gellery1.jpg"
import gellery2 from "@/assets/gellery/gellery2.jpg"
import gellery3 from "@/assets/gellery/gellery3.jpg"
import gellery4 from "@/assets/gellery/gellery4.jpg"
import gellery5 from "@/assets/gellery/gellery5.jpg"
import gellery6 from "@/assets/gellery/gellery6.jpg"
import gellery7 from "@/assets/gellery/gellery7.jpg"
import gellery8 from "@/assets/gellery/gellery4.jpg"
import gellery9 from "@/assets/gellery/gellery7.jpg"

const images = [
  gellery1, gellery2, gellery3, gellery4, gellery5, gellery6, gellery7, gellery8, gellery9,gellery1,gellery2,gellery4
]

export default function GalleryPage() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
       

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image, idx) => (
            <div
              key={idx}
              className="relative h-64 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer group"
            >
              <Image
                src={image}
                alt={`Gallery ${idx + 1}`}
                fill
                className="object-cover group-hover:scale-110 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

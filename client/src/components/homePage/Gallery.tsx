import Image from "next/image"
import Link from "next/link"
import { apiUrl } from "@/config/constants"

let items: any[] = [];

try {
  const res = await fetch(`${apiUrl}/gallery?page=1&limit=6`, { cache: "no-store" });
  if (res.ok) {
    const json = await res.json();
    items = json?.data || [];
  }
} catch (error) {
  console.error("Gallery fetch failed:", error);
  items = []; // server off → empty array, no crash
}
export function Gallery() {
  return (
    <section className="bg-muted/40 py-14 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-10 text-center text-2xl font-bold text-primary md:text-3xl">গ্যালারি</h2>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {items.map((image:any, idx:number) => (
            <div
              key={idx}
              className="relative h-64 overflow-hidden rounded-2xl border border-border shadow-sm transition hover:shadow-md"
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

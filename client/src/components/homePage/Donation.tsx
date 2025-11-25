import { apiUrl } from "@/config/constants"
import dynamic from "next/dynamic";
import Image from "next/image"
import Link from "next/link"
import Carosel from "./Carosel";

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

// Safe fetch for donations
let items: any[] = [];
const loadDataLimit = 10;

try {
  const res = await fetch(`${apiUrl}/donation?page=1&limit=${loadDataLimit}`, {
    cache: "no-store"
  });

  if (res.ok) {
    const json = await res.json();
    items = json?.data || [];
  }

} catch (error) {
  console.error("Donation fetch failed:", error);
  items = []; // server off → no crash
}

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

      <Carosel responsive={responsive} items={items} />

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

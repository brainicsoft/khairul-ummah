import Link from "next/link"
import { apiUrl } from "@/config/constants"
import { FundCard } from "./FundCard"

let funds: {
  _id: string
  slug: string
  title: string
  desc?: string
  image?: string
}[] = []

try {
  const res = await fetch(`${apiUrl}/donation?page=1&limit=6`, { cache: "no-store" })
  if (res.ok) {
    const json = await res.json()
    funds = json?.data || []
  }
} catch {
  funds = []
}

export function QuickFunds() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              দানের তহবিল
            </p>
            <h2 className="mt-1 text-2xl font-bold text-foreground md:text-3xl">
              আপনার পছন্দের খাতে দান করুন
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              নিচ থেকে তহবিল বেছে নিন — প্রতিটি কার্ডে ক্লিক করলেই সরাসরি দান পেজে যাবেন
            </p>
          </div>
          <Link
            href="/donate"
            className="shrink-0 rounded-xl border-2 border-primary px-6 py-2.5 font-bold text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            সব তহবিল দেখুন
          </Link>
        </div>

        {funds.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-brand-light py-16 text-center text-muted-foreground">
            তহবিল শীঘ্রই যোগ করা হবে।
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {funds.map((fund) => (
              <FundCard
                key={fund._id}
                slug={fund.slug}
                title={fund.title}
                desc={fund.desc}
                image={fund.image}
              />
            ))}
          </div>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link
            href="/donate/regular"
            className="flex items-center justify-center rounded-2xl border-2 border-brand-light bg-primary/5 px-6 py-4 font-bold text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            নিয়মিত অনুদান →
          </Link>
          <Link
            href="/lifetime-donor"
            className="flex items-center justify-center rounded-2xl border-2 border-secondary/50 bg-secondary/10 px-6 py-4 font-bold text-secondary-foreground transition hover:bg-secondary"
          >
            আজীবন দাতা সদস্য →
          </Link>
        </div>
      </div>
    </section>
  )
}

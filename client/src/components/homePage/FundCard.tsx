import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

type FundCardProps = {
  slug: string
  title: string
  desc?: string
  image?: string
  href?: string
}

export function FundCard({ slug, title, desc, image, href }: FundCardProps) {
  const link = href ?? `/donate/${slug}`

  return (
    <Link href={link} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:border-brand-light hover:shadow-lg">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <Image
            src={image || "/charitable-work-background.jpg"}
            alt={title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        <div className="flex flex-1 flex-col p-5 md:p-6">
          <h3 className="text-lg font-bold text-primary md:text-xl">{title}</h3>
          {desc && (
            <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              {desc}
            </p>
          )}
          <span className="mt-4 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold text-primary-foreground transition group-hover:bg-accent">
            দান করুন
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </span>
        </div>
      </article>
    </Link>
  )
}

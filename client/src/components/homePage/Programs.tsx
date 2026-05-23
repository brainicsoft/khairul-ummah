"use client"

import Link from "next/link"
import Image from "next/image"
import { useGetAllActivitiesQuery } from "@/redux/features/activites/activitesApi"

export function Programs() {
  const { data, isLoading } = useGetAllActivitiesQuery({ page: 1, limit: "3" })
  const programs = data?.data ?? []

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            কার্যক্রম
          </p>
          <h2 className="mt-1 text-2xl font-bold md:text-3xl">আমাদের কার্যক্রম</h2>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-72 animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        ) : programs.length === 0 ? (
          <p className="text-center text-muted-foreground">কার্যক্রম শীঘ্রই যোগ করা হবে।</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {programs.map((program) => (
              <article
                key={program._id}
                className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={program.image || "/placeholder.svg"}
                    alt={program.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-primary">{program.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                    {program.description}
                  </p>
                  <Link
                    href={`/activities/${program.slug}`}
                    className="mt-3 inline-block text-sm font-bold text-primary hover:underline"
                  >
                    বিস্তারিত →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/activities"
            className="inline-flex rounded-xl bg-primary px-8 py-3 font-bold text-primary-foreground hover:bg-accent"
          >
            সকল কার্যক্রম
          </Link>
        </div>
      </div>
    </section>
  )
}

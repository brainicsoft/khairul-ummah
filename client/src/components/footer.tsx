"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Mail, MapPin, Phone } from "lucide-react"
import { FaYoutube } from "react-icons/fa"
import logo from "@/assets/logo/footerlogo.png"
import paymentimg from "../assets/sslpayment.png"
import {
  siteContact,
  siteMission,
  sitePillars,
  siteSocial,
  footerQuickLinks,
  footerAboutLinks,
} from "@/config/site"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-primary/20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/">
              <Image
                className="h-28 w-auto max-w-[180px]"
                src={logo}
                alt="খাইরুল উম্মাহ ফাউন্ডেশন"
                width={300}
                height={100}
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed opacity-90">{siteMission}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {sitePillars.map((pillar) => (
                <li
                  key={pillar}
                  className="rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-3 py-1 text-xs font-medium"
                >
                  {pillar}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex gap-3">
              <Link
                href={siteSocial.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/10 transition hover:bg-primary-foreground/20"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href={siteSocial.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/10 transition hover:bg-primary-foreground/20"
              >
                <FaYoutube className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wide opacity-90">
              দ্রুত লিংক
            </h4>
            <ul className="space-y-2.5 text-sm">
              {footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="opacity-85 transition hover:opacity-100">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div className="lg:col-span-2">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wide opacity-90">
              সংস্থা সম্পর্কে
            </h4>
            <ul className="space-y-2.5 text-sm">
              {footerAboutLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="opacity-85 transition hover:opacity-100">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wide opacity-90">
              যোগাযোগ
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 opacity-90" />
                <a href={`tel:${siteContact.phone}`} className="opacity-90 hover:underline">
                  {siteContact.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 opacity-90" />
                <a
                  href={`mailto:${siteContact.email}`}
                  className="break-all opacity-90 hover:underline"
                >
                  {siteContact.email}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 opacity-90" />
                <span className="opacity-90 leading-relaxed">{siteContact.address}</span>
              </li>
            </ul>

            <Link
              href="/donate"
              className="mt-5 inline-flex min-h-[42px] items-center justify-center rounded-lg bg-secondary px-6 text-sm font-bold text-secondary-foreground transition hover:bg-secondary/90"
            >
              এখনই দান করুন
            </Link>

            <div className="mt-6 rounded-lg bg-primary-foreground/10 p-3">
              <p className="mb-2 text-xs font-medium opacity-80">নিরাপদ পেমেন্ট</p>
              <Image
                className="h-auto w-full max-w-[220px] rounded bg-white/95 p-2"
                src={paymentimg}
                alt="bKash, SSLCommerz"
                width={220}
                height={40}
              />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-primary-foreground/20 pt-6 text-center text-xs opacity-80 md:flex-row md:text-left">
          <p>
            &copy; {year} খাইরুল উম্মাহ ফাউন্ডেশন। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <p className="max-w-md">{siteContact.tagline}</p>
        </div>
      </div>
    </footer>
  )
}

"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, Phone, Mail, MapPin } from "lucide-react"
import Image from "next/image"
import logo from "../assets/logo/logo.png"
import { LanguageSwitcher } from "@/app/components/LanguageSwitcher"
import { DonatesTypesMenue } from "./DonatesTypesMenue"
import { siteContact } from "@/config/site"
import {
  aboutSubMenu,
  mainNavLinks,
  regularDonationNavItem,
} from "@/config/navigation"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoverDropdown, setHoverDropdown] = useState<string | null>(null)
  const [clickDropdown, setClickDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const [donationTypes, setDonationTypes] = useState<any[]>([])

  useEffect(() => {
    DonatesTypesMenue().then(setDonationTypes)
  }, [])

  useEffect(() => {
    setHoverDropdown(null)
    setClickDropdown(null)
    setIsMenuOpen(false)
  }, [pathname])

  const fundSubMenu = [
    regularDonationNavItem,
    ...donationTypes.map((type: any) => ({
      id: type._id,
      href: `/donate/${type.slug}`,
      label: type.title || type.slug,
    })),
  ]

  const navLinks = mainNavLinks

  const donateHref = pathname === "/" ? "#donate" : "/donate"

  return (
    <>
      {/* Top bar — scrolls away */}
      <div className="border-b border-primary/20 bg-primary text-primary-foreground">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-2 px-3 py-2 md:gap-4 md:px-4 md:py-2.5">
          <a
            href={`tel:${siteContact.phone}`}
            className="flex items-center gap-1.5 text-xs font-medium hover:underline md:text-sm"
          >
            <Phone className="h-3.5 w-3.5 shrink-0 md:h-4 md:w-4" />
            <span>{siteContact.phoneDisplay}</span>
          </a>

          <div className="hidden min-w-0 flex-1 flex-col items-center text-center text-xs md:flex md:text-sm">
            <a
              href={`mailto:${siteContact.email}`}
              className="flex items-center gap-1.5 font-medium hover:underline"
            >
              <Mail className="h-3.5 w-3.5 shrink-0" />
              {siteContact.email}
            </a>
            <span className="mt-0.5 flex items-center gap-1 opacity-95">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="line-clamp-1">{siteContact.address}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${siteContact.email}`}
              className="flex items-center gap-1 text-xs hover:underline md:hidden"
            >
              <Mail className="h-3.5 w-3.5" />
              <span className="max-w-[140px] truncate">ইমেইল</span>
            </a>
            <LanguageSwitcher tone="light" />
          </div>
        </div>
      </div>

      {/* Navbar — sticky at top while scrolling */}
      <header className="sticky top-0 z-50 w-full shrink-0 overflow-visible bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between border-b border-border px-2 py-2 sm:py-3">
        <Link href="/">
          <Image
            className="h-12 w-auto sm:h-14 lg:h-16"
            src={logo}
            alt="খাইরুল উম্মাহ ফাউন্ডেশন"
            width={250}
            height={70}
            priority
          />
        </Link>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
          <nav className="relative hidden min-w-0 flex-1 items-center justify-end gap-0.5 overflow-visible lg:flex">
            {navLinks.map((link) => {
              const hasDropdown = !!link.dropdown
              const isOpen =
                hoverDropdown === link.dropdown || clickDropdown === link.dropdown

              return hasDropdown ? (
                <div
                  key={link.href}
                  className="group relative shrink-0"
                  onMouseEnter={() => {
                    if (clickDropdown !== link.dropdown) setHoverDropdown(link.dropdown!)
                  }}
                  onMouseLeave={() => {
                    if (clickDropdown !== link.dropdown) setHoverDropdown(null)
                  }}
                >
                  <div className="flex items-center">
                    <Link
                      href={link.href}
                      className={`shrink-0 whitespace-nowrap px-2 py-1 text-[15px] font-semibold transition hover:text-primary ${
                        pathname === link.href ? "text-primary" : ""
                      }`}
                    >
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      className="p-1"
                      onClick={(e) => {
                        e.preventDefault()
                        setClickDropdown(
                          clickDropdown === link.dropdown ? null : link.dropdown!
                        )
                        setHoverDropdown(
                          clickDropdown === link.dropdown ? null : link.dropdown!
                        )
                      }}
                      aria-label="মেনু খুলুন"
                      aria-expanded={isOpen}
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>

                  <div
                    className={`absolute left-0 top-full z-[60] pt-1 transition ${
                      isOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-1 opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="w-56 rounded-xl border border-border bg-white py-1 shadow-lg">
                      {(link.dropdown === "fund" ? fundSubMenu : aboutSubMenu).map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2.5 text-sm text-foreground hover:bg-primary hover:text-primary-foreground"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`shrink-0 whitespace-nowrap px-2 py-1 text-[15px] font-semibold transition hover:text-primary ${
                    pathname === link.href ? "text-primary" : ""
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="ml-2 flex items-center gap-2">
            <Link href={donateHref}>
              <span className="inline-flex min-h-[40px] items-center rounded-lg bg-primary px-4 text-sm font-bold text-primary-foreground hover:bg-accent lg:px-5">
                দান করুন
              </span>
            </Link>
            <button
              type="button"
              className="p-1 lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="মেনু"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="max-h-[calc(100vh-140px)] overflow-y-auto border-t border-border bg-white p-4 lg:hidden">
          <div className="mb-4 space-y-2 rounded-lg bg-muted/50 p-3 text-sm">
            <a href={`tel:${siteContact.phone}`} className="flex items-center gap-2 text-primary">
              <Phone className="h-4 w-4" />
              {siteContact.phoneDisplay}
            </a>
            <a
              href={`mailto:${siteContact.email}`}
              className="flex items-center gap-2 break-all text-primary"
            >
              <Mail className="h-4 w-4 shrink-0" />
              {siteContact.email}
            </a>
            <p className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              {siteContact.address}
            </p>
          </div>

          {navLinks.map((link) => {
            const hasDropdown = !!link.dropdown
            const isOpen = clickDropdown === link.dropdown

            return hasDropdown ? (
              <div key={link.href} className="border-b border-border/50 py-2">
                <div className="flex items-center justify-between">
                  <Link href={link.href} className="font-semibold text-primary">
                    {link.label}
                  </Link>
                  <ChevronDown
                    className={`h-4 w-4 cursor-pointer ${isOpen ? "rotate-180" : ""}`}
                    onClick={() =>
                      setClickDropdown(isOpen ? null : link.dropdown!)
                    }
                  />
                </div>
                {isOpen && (
                  <div className="ml-3 mt-2 space-y-1">
                    {(link.dropdown === "fund" ? fundSubMenu : aboutSubMenu).map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block py-1.5 text-sm text-muted-foreground hover:text-primary"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`block border-b border-border/50 py-3 font-semibold ${
                  pathname === link.href ? "text-primary" : ""
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      )}
      </header>
    </>
  )
}

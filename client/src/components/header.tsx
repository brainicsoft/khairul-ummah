"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import Image from "next/image"
import logo from "../assets/logo/logo.png"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  const navLinks = [
    { href: "/", label: "হোম" },
    { href: "/donation-fund", label: "দানের তহবিল", dropdown: "fund" },
    { href: "/activities", label: "আমাদের কার্যক্রম" },
    { href: "/about", label: "আমাদের সম্পর্কে", dropdown: "about" },
    { href: "/running-project", label: "চলমান প্রজেক্ট" },
    { href: "/life-time-donator", label: "আজীবন দাতা সদস্য" },
    { href: "/contact", label: "যোগাযোগ" },
    {
      href: "https://docs.google.com/forms/d/e/1FAIpQLSdt1tAN1HTu2Gr3DJBqcWj6lv6XzZ5XJDxWkuA4YqoYWY3wqQ/viewform",
      label: "স্বেচ্ছাসেবক নিবন্ধন",
    },
    { href: "/gellery", label: "গ্যালারি" },
  ]

  const fundSubMenu = [
    { href: "/donation-fund/qurbani", label: "কুরবানী" },
    { href: "/donation-fund/dawah", label: "দাওয়া" },
    { href: "/donation-fund/education", label: "শিক্ষা" },
    { href: "/donation-fund/new-muslim", label: "নওমুসলিম" },
    { href: "/donation-fund/flood", label: "বন্যা" },
    { href: "/donation-fund/general", label: "সাধারণ" },
    { href: "/donation-fund/zakat", label: "জাকাত" },
    { href: "/donation-fund/lifetime-donor", label: "লাইফটাইম ডোনার" },
    { href: "/donation-fund/monthly-donor", label: "মাসিক ডোনার" },
    { href: "/donation-fund/mosjid-madrasa", label: "মসজিদ-মাদ্রাসা" },
  ]

  const aboutSubMenu = [
    { href: "/about/advisors", label: "উপদেষ্টা মন্ডলী" },
    { href: "/about/committee", label: "পরিচালনা পরিষদ" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="container mx-auto px-1 sm:px-2 py-2 sm:py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image
            className="h-14 sm:h-16 lg:h-[70px] w-auto"
            src={logo}
            alt="Logo"
            width={250}
            height={70}
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex gap-3 xl:gap-5 items-center relative">
          {navLinks.map((link) => {
            const hasDropdown = !!link.dropdown

            return hasDropdown ? (
              <div key={link.href} className="relative">
                <div className="flex items-center gap-1">
                  {/* Main link */}
                  <Link
                    href={link.href}
                    className="font-semibold text-[15px] px-2 py-1 hover:text-primary transition whitespace-nowrap"
                  >
                    {link.label}
                  </Link>

                  {/* Dropdown toggle */}
                  <button
                    onClick={(e) => {
                      e.preventDefault() // prevent default for link click
                      setOpenDropdown(openDropdown === link.dropdown ? null : link.dropdown!)
                    }}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition ${openDropdown === link.dropdown ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>

                {/* Dropdown menu */}
                <div
                  className={`absolute left-0 mt-2 w-52 bg-white border border-gray-200 shadow-lg rounded-lg transition-all duration-200 ease-in-out transform 
          ${openDropdown === link.dropdown ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}
                >
                  {(link.dropdown === "fund" ? fundSubMenu : aboutSubMenu).map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white transition whitespace-nowrap"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`font-semibold text-[15px] px-2 py-1 hover:text-primary transition whitespace-nowrap ${pathname === link.href ? "text-primary" : ""
                  }`}
              >
                {link.label}
              </Link>
            )
          })}


          <Link href="/donate">
            <button className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary/90 transition text-sm font-semibold ml-2">
              দান করুন
            </button>
          </Link>
        </nav>

        {/* Mobile Menu */}
        <div className="flex lg:hidden items-center gap-2">
          <Link href="/donate" className="hidden sm:block">
            <button className="bg-primary text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-primary/90 transition text-xs sm:text-sm font-semibold">
              দান করুন
            </button>
          </Link>

          <button
            className="lg:hidden p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <nav className="lg:hidden border-t border-border bg-white p-3 sm:p-4 flex flex-col gap-2 max-h-[calc(100vh-80px)] overflow-y-auto">
          {navLinks.map((link) => {
            const hasDropdown = !!link.dropdown

            return hasDropdown ? (
              <div key={link.href}>
                <div className="flex">
                  <Link
                    href={link.href}

                    className="flex justify-between items-center w-full font-semibold text-sm sm:text-base text-black hover:text-primary p-2 rounded transition"
                  >
                    {link.label}

                  </Link>
                  <ChevronDown
                    onClick={() =>
                      setOpenDropdown(openDropdown === link.dropdown ? null : link.dropdown!)
                    }
                    className={`w-4 h-4 transition ${openDropdown === link.dropdown ? "rotate-180" : ""
                      }`}
                  />
                </div>

                {openDropdown === link.dropdown && (
                  <div className="ml-4 mt-1 flex flex-col gap-2 bg-gray-50 rounded-lg p-2">
                    {(link.dropdown === "fund" ? fundSubMenu : aboutSubMenu).map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="text-sm text-gray-700 hover:text-primary transition py-1"
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
                className={`font-semibold text-sm sm:text-base text-black hover:text-primary p-2 rounded transition block ${pathname === link.href ? "bg-primary/10 text-primary" : ""
                  }`}
              >
                {link.label}
              </Link>
            )
          })}

          <Link href="/donate" className="sm:hidden pt-2 border-t">
            <button className="bg-primary text-white px-4 py-2 rounded-lg w-full hover:bg-primary/90 font-semibold text-sm">
              দান করুন
            </button>
          </Link>
        </nav>
      )}
    </header>
  )
}

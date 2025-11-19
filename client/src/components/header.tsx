"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import Image from "next/image"
import logo from "../assets/logo/logo.png"
import { LanguageSwitcher } from "@/app/components/LanguageSwitcher"
import { DonatesTypesMenue } from "./DonatesTypesMenue"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoverDropdown, setHoverDropdown] = useState<string | null>(null)
  const [clickDropdown, setClickDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const donationTypes = DonatesTypesMenue()

  const fundSubMenu = donationTypes
    .map((type : any) => ({
      id: type.id,
      href: `/donate/${type.slug}`, 
      label: type.title,
    }))

  const aboutSubMenu = [
    { href: "/about/advisors", label: "উপদেষ্টা মন্ডলী" },
    { href: "/about/committee", label: "পরিচালনা পরিষদ" },
  ]

  const navLinks = [
    { href: "/", label: "হোম" },
    { href: "/donate", label: "দানের তহবিল", dropdown: "fund" },
    { href: "/activities", label: "আমাদের কার্যক্রম" },
    { href: "/about", label: "আমাদের সম্পর্কে", dropdown: "about" },
    { href: "/running-project", label: "চলমান প্রজেক্ট" },
    { href: "/lifetime-donor", label: "আজীবন দাতা সদস্য" },
    { href: "/blog", label: "ব্লগ" },
    { href: "/contact", label: "যোগাযোগ" },
    { href: "/volunteer", label: "স্বেচ্ছাসেবক নিবন্ধন" },
    { href: "/gellery", label: "গ্যালারি" },
  ]

  // ✅ Auto close dropdown & menu on route change
  useEffect(() => {
    setHoverDropdown(null)
    setClickDropdown(null)
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="container mx-auto px-2 py-2 sm:py-3 flex justify-between items-center">
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
        <div className="flex justify-between items-center">
          <nav className="hidden lg:flex gap-1 xl:gap-2 items-center relative flex-wrap justify-center">
            {navLinks.map((link) => {
              const hasDropdown = !!link.dropdown
              const isOpen = hoverDropdown === link.dropdown || clickDropdown === link.dropdown

              return hasDropdown ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => {
                    if (clickDropdown !== link.dropdown) {
                      setHoverDropdown(link.dropdown)
                    }
                  }}
                  onMouseLeave={() => {
                    if (clickDropdown !== link.dropdown) {
                      setHoverDropdown(null)
                    }
                  }}
                >
                  <div className="flex items-center gap-1">
                    <Link
                      href={link.href}
                      className="font-semibold text-[15px] px-2 py-1 hover:text-primary transition whitespace-nowrap"
                    >
                      {link.label}
                    </Link>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        setClickDropdown(clickDropdown === link.dropdown ? null : link.dropdown!)
                      }}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>

                  {/* Dropdown menu */}
                  <div
                    className={`absolute left-0 mt-2 w-52 bg-white border border-gray-200 shadow-lg rounded-lg transition-all duration-200 ease-in-out transform 
                    ${isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}
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
          </nav>
           <LanguageSwitcher/>

          <Link href="/donate">
            <button className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary/90 transition text-sm font-semibold ml-2 whitespace-nowrap hidden lg:flex">
              দান করুন
            </button>
          </Link>
        </div>


        {/* Mobile Menu */}
        <div className="flex lg:hidden items-center gap-2">
          <Link href="/donate">
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
            const isOpen = clickDropdown === link.dropdown

            return hasDropdown ? (
              <div key={link.href}>
                <div className="flex justify-between items-center">
                  <Link
                    href={link.href}
                    className="font-semibold text-sm sm:text-base text-black hover:text-primary p-2 rounded transition"
                  >
                    {link.label}
                  </Link>
                  <ChevronDown
                    onClick={() =>
                      setClickDropdown(isOpen ? null : link.dropdown!)
                    }
                    className={`w-4 h-4 transition cursor-pointer ${isOpen ? "rotate-180" : ""}`}
                  />
                </div>

                {isOpen && (
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

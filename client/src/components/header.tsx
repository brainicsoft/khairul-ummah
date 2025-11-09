"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { LanguageSwitcher } from "./language-switcher"
import Image from "next/image"
import logo from "../assets/logo/logo.png"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname() // current route path

  const navLinks = [
    { href: "/", label: "হোম" },
    // { href: "/programs", label: "প্রোগ্রাম" },
    { href: "/activities", label: "আমাদের কার্যক্রম" },
    { href: "/about", label: "আমাদের সম্পর্কে" },
    { href: "/contact", label: "যোগাযোগ" },
    { href: "/volunteer", label: "স্বেচ্ছাসেবক হন" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-1 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image className="h-[70px] w-[250px]" src={logo} alt="Logo" width={100} height={100} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="relative font-semibold text-sm text-inherit hover:text-primary transition">
              {link.label}
              {/* Active indicator */}
              {pathname === link.href && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>
              )}
            </Link>
          ))}
          {/* <LanguageSwitcher /> */}
          <Link href="/donate">
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition">
              দান করুন
            </button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden border-t border-border bg-card p-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-semibold text-sm text-black hover:text-primary ${
                pathname === link.href ? "border-b-2 border-primary pb-1" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher />
          <Link href="/donate">
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg w-full hover:bg-primary/90">
              দান করুন
            </button>
          </Link>
        </nav>
      )}
    </header>
  )
}

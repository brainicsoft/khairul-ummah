"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { LanguageSwitcher } from "./language-switcher"
import logo from "../assets/logo/logo.png"
import logo2 from "../assets/logo/logo-2.png"
import Image from "next/image"
import logoround from "../assets/logo/Round Shape Logo.jpg"


export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="font-bold text-2xl text-primary">
          <Image className="h-[60px] w-[250px]" src={logo} alt="Logo" width={100} height={100} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          <Link href="/" className="text-foreground hover:text-primary transition">
            হোম
          </Link>
          {/* <Link href="/programs" className="text-foreground hover:text-primary transition">
            প্রোগ্রাম
          </Link> */}
          <Link href="/activities" className="text-foreground hover:text-primary transition">
            আমাদের কার্যক্রম
          </Link>
          <Link href="/about" className="text-foreground hover:text-primary transition">
            আমাদের সম্পর্কে
          </Link>
          <Link href="/contact" className="text-foreground hover:text-primary transition">
            যোগাযোগ
          </Link>
          <Link href="/volunteer" className="text-foreground hover:text-primary transition">
            স্বেচ্ছাসেবক হন
          </Link>
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
          <Link href="/" className="text-foreground hover:text-primary">
            হোম
          </Link>
          <Link href="/programs" className="text-foreground hover:text-primary">
            প্রোগ্রাম
          </Link>
          <Link href="/activities" className="text-foreground hover:text-primary">
            আমাদের কার্যক্রম
          </Link>
          <Link href="/about" className="text-foreground hover:text-primary">
            আমাদের সম্পর্কে
          </Link>
          <Link href="/contact" className="text-foreground hover:text-primary">
            যোগাযোগ
          </Link>
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

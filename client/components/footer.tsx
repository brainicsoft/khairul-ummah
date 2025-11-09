"use client"

import { Facebook, Instagram, Linkedin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import logo from "../assets/logo/logo.png"
import { FaYoutube } from "react-icons/fa"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            {/* <h3 className="font-bold text-lg mb-4">খাইরুল উম্মাহ ফাউন্ডেশন</h3> */}
            <Image className="h-[80px] w-[250px] bg-white" src={logo} alt="Logo" width={300} height={80} />
            <p className="opacity-80 text-sm mt-2">সমাজের উন্নয়ন এবং মানুষের সেবায় নিয়োজিত একটি দাতব্য সংস্থা।</p>
            <div className="flex gap-4 mt-4">
              <Link href="https://www.facebook.com/khairulummahfoundations?_rdc=1&_rdr#" target="_blank" rel="noopener noreferrer">
                <Facebook className="w-5 h-5 cursor-pointer hover:opacity-80" />
              </Link>
              <Link href="https://www.youtube.com/@KhairulUmmahFoundation" target="_blank" rel="noopener noreferrer">
                <FaYoutube className="w-5 h-5 cursor-pointer hover:opacity-80" />
              </Link>
              <Linkedin className="w-5 h-5 cursor-pointer hover:opacity-80" />
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">পেজ</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="/" className="hover:opacity-100">
                  হোম
                </a>
              </li>
              <li>
                <a href="/programs" className="hover:opacity-100">
                  প্রোগ্রাম
                </a>
              </li>
              <li>
                <a href="/about" className="hover:opacity-100">
                  আমাদের সম্পর্কে
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:opacity-100">
                  যোগাযোগ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">সেবা</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="#" className="hover:opacity-100">
                  শিক্ষা
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100">
                  স্বাস্থ্য
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100">
                  দক্ষতা উন্নয়ন
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100">
                  অন্যান্য
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">যোগাযোগ</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>📞 +8801811-448843</li>
              <li>📧 khairulummahfoundation.com</li>
              <li>📍 ময়মনসিংহ, বাংলাদেশ</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-80">
          <p>&copy; ২০২৫ খাইরুল উম্মাহ ফাউন্ডেশন। সর্বাধিকার সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  )
}

"use client"

import { Facebook, Linkedin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import logo from "@/assets/logo/footerlogo.png"
import { FaYoutube } from "react-icons/fa"
import paymentimg from "../assets/sslpayment.png"
import { siteContact } from "@/config/site"

export function Footer() {
  return (
    <footer className="bg-primary py-12 text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="mb-8 grid gap-8 md:grid-cols-4">
          <div>
            <Image className="h-32 w-[150px]" src={logo} alt="Logo" width={300} height={100} />
            <p className="mt-2 text-sm opacity-80">
              সমাজের উন্নয়ন এবং মানুষের সেবায় নিয়োজিত একটি দাতব্য সংস্থা।
            </p>
            <div className="mt-4 flex gap-4">
              <Link
                href="https://www.facebook.com/khairulummahfoundations?_rdc=1&_rdr#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5 cursor-pointer hover:opacity-80" />
              </Link>
              <Link
                href="https://www.youtube.com/@KhairulUmmahFoundation"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube className="h-5 w-5 cursor-pointer hover:opacity-80" />
              </Link>
              <Linkedin className="h-5 w-5 cursor-pointer hover:opacity-80" />
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">পেজ</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link href="/" className="hover:opacity-100">
                  হোম
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:opacity-100">
                  প্রোগ্রাম
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:opacity-100">
                  আমাদের সম্পর্কে
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:opacity-100">
                  যোগাযোগ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">সেবা</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link href="/activities" className="hover:opacity-100">
                  শিক্ষা
                </Link>
              </li>
              <li>
                <Link href="/activities" className="hover:opacity-100">
                  স্বাস্থ্য
                </Link>
              </li>
              <li>
                <Link href="/donate" className="hover:opacity-100">
                  দান করুন
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">যোগাযোগ</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <a href={`tel:${siteContact.phone}`} className="hover:underline">
                  📞 {siteContact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteContact.email}`}
                  className="break-all hover:underline"
                >
                  📧 {siteContact.email}
                </a>
              </li>
              <li>📍 {siteContact.address}</li>
            </ul>
            <Image className="mt-4 w-full" src={paymentimg} alt="পেমেন্ট পদ্ধতি" width={50} height={50} />
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-80">
          <p>&copy; ২০২৫ খাইরুল উম্মাহ ফাউন্ডেশন। সর্বাধিকার সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  )
}

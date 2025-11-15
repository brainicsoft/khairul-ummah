"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import Link from "next/link"
import workimg1 from "@/assets/social-work/মসজিদ-নির্মাণ.png"
import workimg2 from "@/assets/social-work/শিক্ষা-বিস্তার-তহবিল-1-1024x683.jpg"
import workimg3 from "@/assets/social-work/social-meeting.jpg"
import Image from "next/image"
import { Button } from "../ui/button"

const blogPosts = [
  {
    id: 1,
    title: "সমাজের উন্নয়নে আমাদের ভূমিকা",
    description: `খাইরুল উম্মাহ ফাউন্ডেশন সমাজের বিভিন্ন ক্ষেত্রে ইতিবাচক পরিবর্তন আনতে কাজ করে থাকে। আমরা বিশ্বাস করি, শিক্ষার প্রসার, মসজিদ ও কমিউনিটি সেন্টার নির্মাণ, স্বাস্থ্য সচেতনতা এবং দরিদ্র মানুষের পাশে দাঁড়ানো আমাদের মূল লক্ষ্য। এই প্রজেক্টের মাধ্যমে অসংখ্য মানুষ উপকৃত হচ্ছে, এবং আমরা চাই আপনার সাহায্যও যোগ হোক।`,
    date: "২০২৫-০১-১৫",
    author: "ফাউন্ডেশন টিম",
    category: "সমাজ সেবা",
    image: workimg3,
  },
  {
    id: 2,
    title: "মসজিদ মাদ্রাসা নির্মাণ",
    description: `সীমান্ত ও দুর্গম এলাকায় মসজিদ ও মাদ্রাসা নির্মাণ করে আমরা শিক্ষা ও ধর্মীয় কার্যক্রম সম্প্রসারণের চেষ্টা করছি। আমাদের লক্ষ্য, অসহায় এবং দরিদ্রদের জন্য মানসম্মত শিক্ষা ও ধর্মীয় প্রশিক্ষণ নিশ্চিত করা।`,
    date: "২০২৫-০১-১০",
    author: "শিক্ষা বিভাগ",
    category: "শিক্ষা",
    image: workimg1,
  },
  {
    id: 3,
    title: "শিক্ষা বিস্তার তহবিল",
    description: `ফাউন্ডেশন অসহায় শিক্ষার্থীদের জন্য শিক্ষা তহবিল গঠন করেছে। আমরা তাদের জন্য বই, শিক্ষা সামগ্রী এবং স্কলারশিপ সরবরাহ করি। এভাবে আমরা শিশুদের brighter future নিশ্চিত করি এবং সমাজে শিক্ষার মান বৃদ্ধি করি।`,
    date: "২০২৫-০১-০৫",
    author: "মানব সম্পদ",
    category: "নিয়োগ",
    image: workimg2,
  },
]

export function BlogSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">সাম্প্রতিক খবর</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            খাইরুল উম্মাহ ফাউন্ডেশনের সর্বশেষ কার্যক্রম এবং আপডেট সম্পর্কে জানুন
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {/* Post Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <Image src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>

              <CardHeader>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{post.category}</span>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
                <CardTitle className="line-clamp-2 text-lg">{post.title}</CardTitle>
                <CardDescription className="line-clamp-2">{post.author}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">{post.description}</p>
                <Link href={`/blog/${post.id}`}>
                  <Button variant="outline" className="w-full hover:bg-primary">
                    সম্পূর্ণ পড়ুন
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/blog">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              সকল ব্লগ পড়ুন
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import workimg1 from "@/assets/social-work/মসজিদ-নির্মাণ.png"
import workimg2 from "@/assets/social-work/শিক্ষা-বিস্তার-তহবিল-1-1024x683.jpg"
import workimg3 from "@/assets/social-work/social-meeting.jpg"

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

export default function BlogDetailPage() {
    const [selectedPost, setSelectedPost] = useState(blogPosts[0])

    return (
        <main className="min-h-screen bg-background py-16">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Left Side: Blog Detail */}
                    <div className="md:col-span-2 space-y-6">
                        <h1 className="text-3xl md:text-4xl font-bold text-primary">{selectedPost.title}</h1>
                        <div className="text-sm text-muted-foreground">
                            {selectedPost.date} | {selectedPost.author} | {selectedPost.category}
                        </div>
                        <Image
                            src={selectedPost.image}
                            alt={selectedPost.title}
                            className="w-full h-[400px] object-cover rounded-lg"
                        />
                        <div className="prose text-gray-700">
                            <p>{selectedPost.description}</p>
                        </div>
                        <div>
                            <p className=" text-primary font-bold mb-1">চলুন একসাথে পরিবর্তন আনি</p>
                            <Button className="bg-primary hover:bg-primary/90 text-white" onClick={() => alert("Donate Clicked")}>
                                দান করুন
                            </Button>
                        </div>
                    </div>

                    {/* Right Side: Other Blogs */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold mb-4 text-primary">অন্যান্য ব্লগ</h2>
                        <p className="text-muted-foreground mb-4 lg:mb-8">
                            আমাদের সাথে যুক্ত হতে পারেন এবং সমাজের উন্নয়নে অংশ নিন।
                        </p>
                        {blogPosts
                            .filter((post) => post.id !== selectedPost.id)
                            .map((post) => (
                                <div
                                    key={post.id}
                                    className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded transition"
                                    onClick={() => setSelectedPost(post)}
                                >
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        width={100}
                                        height={80}
                                        className="object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-sm font-semibold line-clamp-2">{post.title}</h3>
                                        <p className="text-xs text-muted-foreground">{post.date}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </main>
    )
}

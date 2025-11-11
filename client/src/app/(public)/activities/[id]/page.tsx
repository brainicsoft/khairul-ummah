"use client"
import Image from "next/image"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ActivityIcon, CheckCircle } from "lucide-react"
import { useParams } from "next/navigation"
import floodrelief from "@/assets/activities/flood-relief.jpg"
import helthActivityimg from "@/assets/activities/helthmeet.jpg"
import primarymeetimg from "@/assets/opinion-meetimg/meet2.jpg"
import { Activity } from "react"
import { FaRunning } from "react-icons/fa"

const activities = [
    {
        id: 1,
        category: "শিক্ষা কর্যক্রম",
        title: "প্রাথমিক শিক্ষা কর্মসূচি",
        description:
            "গ্রামীণ এলাকার অসচেতন ও সুবিধাবঞ্চিত শিশুদের জন্য বিনামূল্যে প্রাথমিক শিক্ষা প্রদান করা হয়। আমরা শিক্ষকদের প্রশিক্ষণ, বইপত্র, এবং শিক্ষার্থীদের জন্য পুষ্টিকর খাবার সরবরাহ করে থাকি, যাতে তারা আগ্রহের সঙ্গে স্কুলে আসতে পারে এবং ভবিষ্যৎ গড়তে সক্ষম হয়।",
        image: primarymeetimg,
    },
    {
        id: 2,
        category: "স্বাস্থ্য কর্যক্রম",
        title: "স্বাস্থ্য সচেতনতা",
        description:
            "সাধারণ মানুষের মধ্যে স্বাস্থ্য সচেতনতা বৃদ্ধির জন্য বিনামূল্যে স্বাস্থ্য ক্যাম্প, রক্তদান কর্মসূচি এবং নিয়মিত স্বাস্থ্য পরামর্শ প্রদান করা হয়। আমরা স্থানীয় চিকিৎসক ও স্বেচ্ছাসেবকদের সহযোগিতায় প্রতিদিন সমাজে একটি সুস্থ পরিবেশ গড়ে তোলার জন্য কাজ করছি।",
        image: helthActivityimg,
    },
    {
        id: 3,
        category: "শিক্ষা কর্যক্রম",
        title: "বৃত্তি কর্মসূচি",
        description:
            "মেধাবী কিন্তু আর্থিকভাবে অক্ষম শিক্ষার্থীদের জন্য আমরা বার্ষিক শিক্ষা বৃত্তি প্রদান করে থাকি। এর মাধ্যমে তারা তাদের শিক্ষা কার্যক্রম অব্যাহত রাখতে পারে এবং ভবিষ্যতে দেশের সম্পদ হিসেবে গড়ে উঠতে সক্ষম হয়।",
        image: "/scholarship-program.jpg",
    },
    {
        id: 4,
        category: "দক্ষতা উন্নয়ন",
        title: "দক্ষতা উন্নয়ন প্রশিক্ষণ",
        description:
            "বেকার যুবকদের কর্মসংস্থানের সুযোগ তৈরি করতে বিভিন্ন ধরনের প্রশিক্ষণ দেওয়া হয়, যেমন কম্পিউটার, সেলাই, ইলেকট্রিক্যাল কাজ, ও উদ্যোক্তা প্রশিক্ষণ। এর মাধ্যমে তারা আত্মনির্ভর হতে পারে।",
        image: "/skill-training.jpg",
    },
    {
        id: 5,
        category: "নারী ক্ষমতায়ন",
        title: "নারী ক্ষমতায়ন উদ্যোগ",
        description:
            "নারীদের অর্থনৈতিক ও সামাজিক অবস্থান উন্নয়নের জন্য আমরা বিভিন্ন উদ্যোগ গ্রহণ করেছি, যেমন সেলাই প্রশিক্ষণ, ক্ষুদ্র উদ্যোক্তা সহায়তা, এবং আইনি সহায়তা কর্মসূচি।",
        image: "/women-empowerment.png",
    },
    {
        id: 6,
        category: "দুর্যোগ ত্রাণ",
        title: "দুর্যোগ ত্রাণ কর্মসূচি",
        description:
            "প্রাকৃতিক দুর্যোগে ক্ষতিগ্রস্ত পরিবারগুলোর পাশে দাঁড়ানো আমাদের অন্যতম দায়িত্ব। আমরা খাদ্য, ওষুধ, পোশাক এবং আশ্রয় সহায়তা দিয়ে তাদের পুনর্বাসনে সহায়তা করি।",
        image: floodrelief,
    },
    {
        id: 7,
        category: "পরিবেশ সংরক্ষণ",
        title: "পরিবেশ সংরক্ষণ ও বৃক্ষরোপণ",
        description:
            "পরিবেশ রক্ষা এবং জলবায়ু পরিবর্তনের প্রভাব কমাতে নিয়মিত বৃক্ষরোপণ, পরিচ্ছন্নতা অভিযান, এবং সচেতনতা প্রচারণা পরিচালনা করা হয়।",
        image: "/environment-conservation.jpg",
    },
]

export default function ActivityDetailsPage() {
    const params = useParams()
    const activity = activities.find((a) => a.id === Number(params?.id))

    if (!activity) return notFound()

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">


            {/* Hero Image Section */}
            <div className="relative h-96 md:h-[550px] overflow-hidden">
                <Image src={activity.image || "/placeholder.svg"} alt={activity.title} fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>

                {/* Category badge over image */}
                <div className="absolute top-6 left-6">
                    <span className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold shadow-lg">
                        {activity.category}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-balance leading-tight">
                            {activity.title}
                        </h1>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 text-slate-600">
                                <CheckCircle size={18} className="text-blue-600" />
                                <span className="font-medium">সক্রিয় কর্মসূচি</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8 md:p-10 mb-12">
                        <p className="text-lg md:text-xl leading-relaxed text-slate-800 font-medium">{activity.description}</p>
                    </div>

                    {/* Impact statistics cards */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                        <div className="bg-white border border-slate-200 rounded-lg p-6 text-center hover:shadow-md transition">
                            <ActivityIcon className="mx-auto mb-2 text-blue-600" />
                            <p className="text-sm text-slate-600 font-medium">আরও প্রাণবন্ত হবে</p>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-lg p-6 text-center hover:shadow-md transition">
                            <div className="text-3xl font-bold text-blue-600 mb-2">১০০%</div>
                            <div className="w-full bg-blue-100 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full w-full"></div>
                            </div>
                            <p className="text-sm text-slate-600 font-medium mt-2">স্বচ্ছতা</p>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-lg p-6 text-center hover:shadow-md transition col-span-2 md:col-span-1">
                            <FaRunning size={32} className="mx-auto mb-2 text-blue-600" />
                            <p className="text-sm text-slate-600 font-medium">চলমান</p>
                        </div>
                    </div>

                    {/* Call-to-action buttons */}
                    <div className="flex flex-col md:flex-row gap-4 mb-12">
                        <button className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-8 rounded-lg transition shadow-md hover:shadow-lg">
                            এই কার্যক্রমে অবদান রাখুন
                        </button>
                        <button className="flex-1 border-2 border-primary text-primary hover:bg-blue-50 font-semibold py-4 px-8 rounded-lg transition">
                            আরও তথ্য পান
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer CTA Section */}
            <div className="py-12 mt-8">
                <div className="container mx-auto px-4 text-center text-black">
                    <h2 className="text-3xl font-bold mb-4">পরিবর্তন আনতে আমাদের সাথে যোগ দিন</h2>
                    <p className="text-lg  mb-6 max-w-2xl mx-auto">
                        আপনার অবদান সমাজে বাস্তব পরিবর্তন আনতে পারে এবং হাজার হাজার মানুষের জীবন উন্নত করতে পারে।
                    </p>
                    <Link href="/donate">
                        <button className="bg-primary text-white hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition shadow-md">
                            এখনই অবদান রাখুন
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    )
}

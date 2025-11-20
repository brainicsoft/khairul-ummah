import Image from "next/image"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ActivityIcon, CheckCircle } from "lucide-react"
import { FaRunning } from "react-icons/fa"
import { apiUrl } from "@/config/constants"



export default async function ActivityDetailsPage({ params }: { params: { slug: string } }) {
   
    const slug = params.slug; // <-- THIS IS ENOUGH
    console.log("Slug:", slug);

    const res = await fetch(`${apiUrl}/activities/${slug}`, { cache: "no-store" });

    const json = await res.json();
    const items = json?.data || [];
    console.log(items)
    const activity = items[0]

    // const activity = activities.find((a) => a.slug === Number(params?.slug))

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">


            {/* Hero Image Section */}
            <div className="relative h-96 md:h-[550px] overflow-hidden">
                {/* <Image src={activity.image || "/placeholder.svg"} alt={activity.title} fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div> */}

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

import Image from "next/image"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ActivityIcon, CheckCircle, Heart, Target, TrendingUp, Users } from "lucide-react"
import { FaRunning } from "react-icons/fa"
import { apiUrl } from "@/config/constants"

interface IActivity {
    _id: string
    category: string
    title: string
    description: string
    image: string
    content?: string
    slug: string
}

interface ActivityDetailsPageProps {
    params: Promise<{ slug: string }>
}

export default async function ActivityDetailsPage({ params }: ActivityDetailsPageProps) {
    const { slug } = await params
    // console.log("[v0] Raw slug from params:", slug)

    let activity: IActivity | null = null
    // console.log(activity)


    const fetchUrl = `${apiUrl}/activities/${slug}`
    // console.log("[v0] Fetching from URL:", fetchUrl)

    const res = await fetch(fetchUrl, {
        cache: "no-store",
    })

    console.log("[v0] API response status:", res.status)

    if (!res.ok) {
        console.error("[v0] API returned error status:", res.status)
        return notFound()
    }

    const json = await res.json()
    const items = json?.data || []
    // console.log("[v0] API response data:", items)

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            {/* Hero Image Section */}
            <div className="relative h-[500px] md:h-[400px] w-full overflow-hidden">

                {/* 🔥 Background Blur Layer */}
                <div className="absolute inset-0">
                    <Image
                        src={items.image || "/placeholder.svg"}
                        alt={items.title}
                        fill
                        className="object-cover blur-sm scale-110"
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                </div>

                {/* 🔥 Main Sharp Image Layer – always fully visible */}
                <div className="relative z-10 flex items-center justify-center h-full">
                    <Image
                        src={items.image || "/placeholder.svg"}
                        alt={items.title}
                        width={1000}
                        height={600}
                        className="object-contain max-h-full mx-auto"
                        priority
                    />
                </div>

                {/* Category badge */}
                <div className="absolute z-20 top-6 left-6">
                    <span className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold shadow-lg">
                        {items.category}
                    </span>
                </div>
            </div>


            {/* Content Section */}
            <div className="container mx-auto px-4 py-12 md:py-16">
                {/* title */}





                <div className="container mx-auto">

                    {/* Description highlight card */}
                    <div className="container mx-auto mb-20">
                        <div className="flex items-start gap-4 mb-6">
                            <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                            <span className="text-sm font-semibold text-accent uppercase tracking-wide">মূল বিবরণ</span>
                        </div>

                        <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-8">
                                <TrendingUp className="w-5 h-5 text-primary" />
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground">{items.title}</h2>
                            </div>

                            <p className="text-xl md:text-2xl leading-relaxed text-foreground font-light">{items.description}</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className="container mx-auto px-6 md:px-12 ">

                <div className="mb-20">
                    <div className="flex items-center gap-3 mb-8">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground">প্রভাব এবং পরিমাপ</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Impact Card 1 */}
                        <div className="group bg-card border border-border rounded-2xl p-8 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-start justify-between mb-4">
                                <Users className="w-8 h-8 text-primary" />
                                <span className="text-xs font-semibold text-muted-foreground uppercase">প্রভাবিত মানুষ</span>
                            </div>
                            <div className="text-4xl font-bold text-foreground mb-2">১০,০০০+</div>
                            <p className="text-sm text-muted-foreground">সম্প্রদায়ের সদস্যরা সরাসরি উপকৃত</p>
                        </div>
                        {/* Impact Card 2 */}
                        <div className="group bg-card border border-border rounded-2xl p-8 hover:border-accent/50 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-start justify-between mb-4">
                                <Target className="w-8 h-8 text-accent" />
                                <span className="text-xs font-semibold text-muted-foreground uppercase">সাফল্যের হার</span>
                            </div>
                            <div className="text-4xl font-bold text-foreground mb-2">৯৮%</div>
                            <p className="text-sm text-muted-foreground">প্রোগ্রাম সাফল্যের হার অর্জিত</p>
                        </div>

                        {/* Impact Card 3 */}
                        <div className="group bg-card border border-border rounded-2xl p-8 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-start justify-between mb-4">
                                <Heart className="w-8 h-8 text-primary" />
                                <span className="text-xs font-semibold text-muted-foreground uppercase">জীবন পরিবর্তন</span>
                            </div>
                            <div className="text-4xl font-bold text-foreground mb-2">৫,২০০</div>
                            <p className="text-sm text-muted-foreground">পরিবারের জীবনযাত্রার মান উন্নত</p>
                        </div>

                        {/* Impact Card 4 */}
                        <div className="group bg-card border border-border rounded-2xl p-8 hover:border-accent/50 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-start justify-between mb-4">
                                <CheckCircle className="w-8 h-8 text-accent" />
                                <span className="text-xs font-semibold text-muted-foreground uppercase">স্বচ্ছতা</span>
                            </div>
                            <div className="text-4xl font-bold text-foreground mb-2">১০০%</div>
                            <p className="text-sm text-muted-foreground">তহবিল ব্যবহারের স্বচ্ছতা নিশ্চিত</p>
                        </div>
                    </div>
                </div>


                <div className="max-w-3xl mx-auto mb-20">
                    <div className=" border border-primary/20 rounded-2xl p-12 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                            এই গুরুত্বপূর্ণ কার্যক্রমে যোগ দিন
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                            আপনার অবদান সরাসরি সম্প্রদায়ের জীবন পরিবর্তন করে এবং টেকসই উন্নয়নে অবদান রাখে।
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/donate">
                                <button className="px-8 py-3 md:py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                                    এখনই অবদান রাখুন
                                </button>
                            </Link>
                            <Link href="/donate">
                            <button className="px-8 py-3 md:py-4 border-2 border-primary text-primary hover:bg-primary/5 font-semibold rounded-lg transition-all duration-300">
                                আরও তথ্য পান
                            </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {items.content && (
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">বিস্তারিত তথ্য</h2>
                        <div className="prose prose-lg max-w-none text-foreground">
                            <p>{items.content}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-card border-t border-border py-16 md:py-20">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">আরও জানতে চান?</h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        আমাদের সাথে যোগাযোগ করুন এবং এই অর্থবহ যাত্রার অংশ হন।
                    </p>
                    <Link href="/contact">
                        <button className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all duration-300">
                            যোগাযোগ করুন
                        </button>
                    </Link>
                </div>
            </div>

        </main>
    )
}

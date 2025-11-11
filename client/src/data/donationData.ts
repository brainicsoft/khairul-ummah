
import korbaniImg from "@/assets/donateTypeImg/korbani.jpg"
import emergencyFloodImg from "@/assets/donateTypeImg/flood.jpg"
import zakatImg from "@/assets/donateTypeImg/jakat.jpg"
import mosqueEmdrasaImg from "@/assets/donateTypeImg/masjid.jpg"
import lifetimeDonorImg from "@/assets/donateTypeImg/donate.jpg"
import monthlyDonorImg from "@/assets/donateTypeImg/donate.jpg"
import nowmuslimImg from "@/assets/donateTypeImg/nowmoslim.jpg"
import generelWayImg from "@/assets/donateTypeImg/general.jpg"
import learnershipImg from "@/assets/donateTypeImg/learner.png"
import dawaImg from "@/assets/donateTypeImg/daowa.png"
import { StaticImageData } from "next/image"
export type DonationType = {
    id: number
    slug: string
    title: string
    desc: string
    benefits: string[]
    videoUrl: string
    image: string | StaticImageData
    color: string
    category: "regular" | "special" | "donor-type"
}
export const DONATION_TYPES: DonationType[] = [
    {
        id: 1,
        slug: "qurbani",
        title: "কোরবানি তহবিল",
        desc: "কোরবানির গোশত দরিদ্র পরিবারের মধ্যে বিতরণ এবং সাহায্য কর্মসূচি।",
        image: korbaniImg,
        color: "from-cyan-500 to-cyan-600",
        category: "special",
        benefits: [
            "কোরবানির গোশত সরাসরি বিতরণ",
            "দরিদ্র পরিবারের পুষ্টি নিশ্চিতকরণ",
            "ঈদের আনন্দ সবার সাথে ভাগ করা",
            "ঐতিহ্যবাহী সংস্কৃতি সংরক্ষণ",
        ],
        videoUrl: "https://www.youtube.com/embed/zxhiwFcf_8I?si=nGs8DdkdQesC8Wg-",
    },
    {
        id: 2,
        slug: "dawah",
        title: "দাওয়া তহবিল",
        desc: "ইসলামী শিক্ষা এবং প্রচার কার্যক্রমে ব্যয় করা হয়।",
        image: dawaImg,
        color: "from-emerald-500 to-emerald-600",
        category: "special",
        benefits: ["ইসলামী শিক্ষা প্রচার", "কমিউনিটি সচেতনতা বৃদ্ধি", "গবেষণা এবং প্রকাশনা", "বক্তৃতা ও সেমিনার আয়োজন"],
        videoUrl: "https://www.youtube.com/embed/zxhiwFcf_8I?si=nGs8DdkdQesC8Wg-",
    },
    {
        id: 3,
        slug: "education",
        title: "শিক্ষা তহবিল",
        desc: "দরিদ্র এবং প্রতিভাবান শিক্ষার্থীদের শিক্ষা সহায়তা কর্মসূচি।",
        image: learnershipImg,
        color: "from-blue-500 to-blue-600",
        category: "special",
        benefits: ["বৃত্তি এবং শিক্ষা সহায়তা", "শিক্ষার্থীদের ভবিষ্যৎ গড়া", "দক্ষতা উন্নয়ন প্রশিক্ষণ", "প্রযুক্তি শিক্ষা কর্মসূচি"],
        videoUrl: "https://www.youtube.com/embed/zxhiwFcf_8I?si=nGs8DdkdQesC8Wg-",
    },
    {
        id: 4,
        slug: "newmuslim",
        title: "নওমুসলিম তহবিল",
        desc: "নওমুসলিম এবং সংখ্যালঘু সম্প্রদায়ের কল্যাণ কর্মসূচি।",
        image: nowmuslimImg,
        color: "from-purple-500 to-purple-600",
        category: "special",
        benefits: ["নওমুসলিমদের সহায়তা", "সম্প্রদায় ইন্টিগ্রেশন প্রোগ্রাম", "মেন্টরশিপ এবং পরামর্শ", "মানসিক সমর্থন সেবা"],
        videoUrl: "https://www.youtube.com/embed/zxhiwFcf_8I?si=nGs8DdkdQesC8Wg-",
    },
    {
        id: 5,
        slug: "flood",
        title: "জরুরি বন্যা তহবিল",
        desc: "বন্যা ও প্রাকৃতিক দুর্যোগে ত্রাণ ও পুনর্বাসন কার্যক্রম।",
        image: emergencyFloodImg,
        color: "from-red-500 to-red-600",
        category: "special",
        benefits: ["জরুরি খাদ্য ও পানীয় সরবরাহ", "চিকিৎসা সেবা প্রদান", "দুর্যোগ ত্রাণ কার্যক্রম", "পুনর্বাসন সহায়তা"],
        videoUrl: "https://www.youtube.com/embed/zxhiwFcf_8I?si=nGs8DdkdQesC8Wg-",
    },
    {
        id: 6,
        slug: "general",
        title: "সাধারণ তহবিল",
        desc: "বিভিন্ন সামাজিক ও দাতব্য কর্মসূচিতে সর্বোচ্চ প্রয়োজন অনুযায়ী ব্যয়।",
        image: generelWayImg,
        color: "from-orange-500 to-orange-600",
        category: "special",
        benefits: ["সর্বোচ্চ প্রয়োজনের ক্ষেত্রে ব্যয়", "নমনীয় সহায়তা প্রোগ্রাম", "জরুরি পরিস্থিতিতে দ্রুত সাহায্য", "সম্প্রদায়ের বৃহত্তর উন্নয়ন"],
        videoUrl: "https://www.youtube.com/embed/zxhiwFcf_8I?si=nGs8DdkdQesC8Wg-",
    },
    {
        id: 7,
        slug: "zakat",
        title: "জাকাত তহবিল",
        desc: "ইসলামিক নীতি অনুযায়ী দরিদ্র ও অসহায় মানুষের সেবায় ব্যয়।",
        image: zakatImg,
        color: "from-amber-500 to-amber-600",
        category: "special",
        benefits: ["শরিয়া অনুযায়ী জাকাত বিতরণ", "দরিদ্রদের প্রত্যক্ষ সহায়তা", "অর্থনৈতিক উন্নয়ন কর্মসূচি", "মাইক্রো ফাইন্যান্স সেবা"],
        videoUrl: "https://www.youtube.com/embed/zxhiwFcf_8I?si=nGs8DdkdQesC8Wg-",
    },
    {
        id: 8,
        slug: "mosqueemadrasa",
        title: "মসজিদ-মাদ্রাসা ",
        desc: "গ্রামীণ এলাকায় মসজিদ ও মাদ্রাসা নির্মাণ এবং উন্নয়ন কাজ।",
        image: mosqueEmdrasaImg,
        color: "from-rose-500 to-rose-600",
        category: "special",
        benefits: ["মসজিদ নির্মাণ ও মেরামত", "মাদ্রাসা স্থাপনা", "ধর্মীয় শিক্ষা কেন্দ্র", "সামাজিক কল্যাণ কেন্দ্র"],
        videoUrl: "https://www.youtube.com/embed/zxhiwFcf_8I?si=nGs8DdkdQesC8Wg-",
    },
    {
        id: 9,
        slug: "lifetimedonor",
        title: "লাইফটাইম ডোনার",
        desc: "আজীবনের জন্য নিয়মিত সহায়তা এবং বিশেষ সুবিধা প্যাকেজ।",
        image: lifetimeDonorImg,
        color: "from-yellow-500 to-yellow-600",
        category: "donor-type",
        benefits: ["আজীবন বিশেষ স্বীকৃতি", "আর্যাব শংসাপত্র", "এক্সক্লুসিভ ডোনার সুবিধা", "পরিবারের জন্য দোয়া ও সহায়তা", "বার্ষিক বোনাস উৎসব"],
        videoUrl: "https://www.youtube.com/embed/zxhiwFcf_8I?si=nGs8DdkdQesC8Wg-",
    },
    {
        id: 10,
        slug: "monthlydonor",
        title: "মাসিক ডোনার",
        desc: "প্রতি মাসে নিয়মিত অবদান দিয়ে টেকসই প্রভাব তৈরি করুন।",
        image: monthlyDonorImg,
        color: "from-green-500 to-green-600",
        category: "donor-type",
        benefits: [
            "প্রতি মাসে স্বয়ংক্রিয় দান",
            "নিয়মিত আপডেট ও প্রতিবেদন",
            "বিশেষ মাসিক সুবিধা",
            "বছরব্যাপী সমর্থন নেটওয়ার্ক",
            "ট্যাক্স সুবিধা পান",
        ],
        videoUrl: "https://www.youtube.com/embed/zxhiwFcf_8I?si=nGs8DdkdQesC8Wg-",
    },
]

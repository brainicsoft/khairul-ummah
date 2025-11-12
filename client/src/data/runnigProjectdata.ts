// export type Project = {
//     id: number
//     title: string
//     description: string
//     shortDesc: string
//     image: string
//     progress: number
//     targetAmount: number
//     raisedAmount: number
//     category: string
//     benefits: string[]
//     videoUrl?: string
//   }
  
//   export const RUNNING_PROJECTS: Project[] = [
//     {
//       id: 1,
//       title: "শহরের দুর্বল শিশুদের জন্য পুষ্টি কেন্দ্র",
//       shortDesc: "দরিদ্র এলাকার শিশুদের জন্য দৈনিক পুষ্টি কর্মসূচি",
//       description:
//         "এই প্রকল্পের মাধ্যমে আমরা শহরের দুর্বল ও বঞ্চিত শিশুদের জন্য একটি পুষ্টি কেন্দ্র স্থাপন করছি। এখানে প্রতিদিন ৫০০ শিশু গুণমানের খাবার এবং পুষ্টি সরবরাহ পাবে।",
//       image: "/children-nutrition-center.jpg",
//       progress: 65,
//       targetAmount: 500000,
//       raisedAmount: 325000,
//       category: "শিক্ষা ও স্বাস্থ্য",
//       benefits: [
//         "প্রতিদিন ৫০০ শিশুকে পুষ্টিকর খাবার প্রদান",
//         "স্বাস্থ্য পরীক্ষা এবং পরামর্শ সেবা",
//         "মায়েদের জন্য পুষ্টি শিক্ষা কর্মসূচি",
//         "অপুষ্টিজনিত রোগ প্রতিরোধ",
//       ],
//       videoUrl: "https://www.youtube.com/embed/zxhiwFcf_8I?si=nGs8DdkdQesC8Wg-",
//     },
//     {
//       id: 2,
//       title: "গ্রামীণ বহু-উদ্দেশ্য প্রশিক্ষণ কেন্দ্র নির্মাণ",
//       shortDesc: "গ্রামের যুবকদের দক্ষতা উন্নয়ন ও কর্মসংস্থান সৃষ্টি",
//       description:
//         "প্রত্যন্ত গ্রামে একটি প্রশিক্ষণ কেন্দ্র স্থাপন করা হচ্ছে যেখানে যুবকরা বিভিন্ন দক্ষতা শিখতে পারবেন এবং নিজের ব্যবসা শুরু করতে পারবেন।",
//       image: "/rural-training-center-vocational.jpg",
//       progress: 45,
//       targetAmount: 1000000,
//       raisedAmount: 450000,
//       category: "দক্ষতা উন্নয়ন",
//       benefits: ["বিনামূল্যে বৃত্তিমূলক প্রশিক্ষণ", "ক্ষুদ্র ব্যবসা স্থাপনে সহায়তা", "মাইক্রো ফিনান্স ও ঋণের ব্যবস্থা", "শতাধিক যুবকের কর্মসংস্থান"],
//       videoUrl: "https://www.youtube.com/embed/zxhiwFcf_8I?si=nGs8DdkdQesC8Wg-",
//     },
//     {
//       id: 3,
//       title: "বৃত্তিহীন প্রতিভাবান শিক্ষার্থী সহায়তা",
//       shortDesc: "অসামর্থ্য কারণে অধ্যয়ন বন্ধকারী মেধাবী শিক্ষার্থী উদ্ধার",
//       description:
//         "আমরা ঢাকা ও আশেপাশের এলাকায় ১০০০ প্রতিভাবান কিন্তু বৃত্তিহীন শিক্ষার্থীকে বার্ষিক বৃত্তি প্রদান করছি। এতে তারা তাদের পড়াশোনা চালিয়ে যেতে পারবে।",
//       image: "/talented-students-scholarship-education.jpg",
//       progress: 80,
//       targetAmount: 750000,
//       raisedAmount: 600000,
//       category: "শিক্ষা",
//       benefits: ["১০০০ প্রতিভাবান শিক্ষার্থীর বৃত্তি", "একাডেমিক গাইডেন্স ও মেন্টরশিপ", "বিশ্ববিদ্যালয় ভর্তি সহায়তা", "ক্যারিয়ার পরামর্শ সেবা"],
//     },
//     {
//       id: 4,
//       title: "শিল্প ও কারুশিল্প শিক্ষা কর্মশালা",
//       shortDesc: "মহিলা উদ্যোক্তা তৈরিতে হাতের কাজ শিক্ষা",
//       description:
//         "মহিলাদের জন্য ঐতিহ্যবাহী ও আধুনিক কারুশিল্প শিক্ষার ব্যবস্থা করা হচ্ছে যাতে তারা স্বাবলম্বী হতে পারে এবং পরিবারের আয় বৃদ্ধি করতে পারে।",
//       image: "/women-handicraft-workshop-vocational-training.jpg",
//       progress: 55,
//       targetAmount: 400000,
//       raisedAmount: 220000,
//       category: "নারী ক্ষমতায়ন",
//       benefits: ["ঐতিহ্যবাহী কারুশিল্প শিক্ষা", "আধুনিক উৎপাদন কৌশল প্রশিক্ষণ", "পণ্য বিপণন ও ই-কমার্স সহায়তা", "ক্ষুদ্র ঋণ প্রাপ্তি সহজীকরণ"],
//     },
//   ]
  
//   export const getProjectById = (id: number): Project | undefined => {
//     return RUNNING_PROJECTS.find((project) => project.id === id)
//   }
  



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
export const RUNNING_PROJECTS: DonationType[] = [
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

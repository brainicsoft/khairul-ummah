import Image from "next/image"
import bannerimg from "../assets/banner.png"
import { FaHandsHelping, FaHeartbeat, FaSchool } from "react-icons/fa"
export function HeroSection() {
  const heroCards = [
    {
      id: 1,
      title: "সেবামূলক কার্যক্রম",
      desc: "দরিদ্র ও অসহায়দের সাহায্য করি",
      icon: <FaHandsHelping size={40} className="text-primary" />,
    },
    {
      id: 2,
      title: "স্বাস্থ্য ও কল্যাণ",
      desc: "চিকিৎসা ও স্বাস্থ্যসেবা প্রদান",
      icon: <FaHeartbeat size={40} className="text-primary" />,
    },
    {
      id: 3,
      title: "শিক্ষা ও উন্নয়ন",
      desc: "গ্রামীণ এলাকায় শিক্ষা কার্যক্রম পরিচালনা",
      icon: <FaSchool size={40} className="text-primary" />,
    },
  ]
  return (
    <section className="relative md:h-[500px] lg:h-[600px] bg-gradient-to-r from-primary to-primary/80 text-white py-20 md:py-32">
      <div className="absolute inset-0 opacity-20">
        <Image src={bannerimg} alt="Background" fill className="object-cover" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">খাইরুল উম্মাহ ফাউন্ডেশন</h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">আমরা সমাজের উন্নয়নে কাজ করি এবং দুর্বল মানুষের সেবা করি।</p>

          <div className="flex gap-4 justify-center">
            <button className="bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition">
              আরও জানুন
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
              যোগাযোগ করুন
            </button>
          </div>
          {/* Icon cards */}
          <div className="grid grid-cols-1 pt-8 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {heroCards.map((card) => (
              <div
                key={card.id}
                className="bg-white text-black rounded-xl shadow-lg p-6 flex flex-col items-center gap-4 transform hover:scale-105 transition"
              >
                <div>{card.icon}</div>
                <h3 className="font-bold text-lg">{card.title}</h3>
                <p className="text-sm text-center">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

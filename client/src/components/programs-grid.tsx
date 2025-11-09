import Image from "next/image"

const allPrograms = [
  {
    id: 1,
    title: "প্রাথমিক শিক্ষা কর্মসূচি",
    description: "গ্রামীণ এলাকার অসচেতন শিশুদের জন্য বিনামূল্যে প্রাথমিক শিক্ষা প্রদান করা হয়।",
    image: "/primary-education.jpg",
  },
  {
    id: 2,
    title: "স্বাস্থ্য সচেতনতা",
    description: "সাধারণ মানুষের মধ্যে স্বাস্থ্য সচেতনতা বৃদ্ধির জন্য বিভিন্ন কর্মসূচি।",
    image: "/health-awareness.jpg",
  },
  {
    id: 3,
    title: "বৃত্তি কর্মসূচি",
    description: "মেধাবী কিন্তু দরিদ্র শিক্ষার্থীদের জন্য শিক্ষা বৃত্তি প্রদান।",
    image: "/scholarship-program.jpg",
  },
  {
    id: 4,
    title: "দক্ষতা উন্নয়ন",
    description: "বেকার যুবকদের বিভিন্ন দক্ষতা প্রশিক্ষণ প্রদান করা হয়।",
    image: "/skill-training.jpg",
  },
  {
    id: 5,
    title: "নারী ক্ষমতায়ন",
    description: "নারীদের অর্থনৈতিক এবং সামাজিক ক্ষমতায়ন কর্মসূচি।",
    image: "/women-empowerment.png",
  },
  {
    id: 6,
    title: "দুর্যোগ ত্রাণ",
    description: "প্রাকৃতিক দুর্যোগে ক্ষতিগ্রস্ত মানুষদের জন্য ত্রাণ কর্মসূচি।",
    image: "/disaster-relief.jpg",
  },
  {
    id: 7,
    title: "পরিবেশ সংরক্ষণ",
    description: "পরিবেশ রক্ষা এবং বৃক্ষরোপণ কর্মসূচি।",
    image: "/environment-conservation.jpg",
  },
  {
    id: 8,
    title: "কৃষি উন্নয়ন",
    description: "আধুনিক কৃষি পদ্ধতি প্রচার এবং কৃষকদের প্রশিক্ষণ।",
    image: "/agricultural-development.jpg",
  },
  {
    id: 9,
    title: "যুব সমাজ সেবা",
    description: "যুবকদের দেশপ্রেম এবং সামাজিক দায়বদ্ধতা বৃদ্ধির কর্মসূচি।",
    image: "/youth-service.jpg",
  },
]

export function ProgramsGrid() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {allPrograms.map((program) => (
            <div key={program.id} className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={program.image || "/placeholder.svg"}
                  alt={program.title}
                  fill
                  className="object-cover hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-primary">{program.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">{program.description}</p>
                <button className="text-primary font-semibold hover:text-primary/80 transition">আরও জানুন →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

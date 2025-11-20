import { StaticImageData } from "next/image"

interface TeamMember {
  id: string
  title: string
  name: string
  occupation?: string
  image: string | StaticImageData
  description?: string
  roleType?: string
}

interface TeamCardProps {
  member: TeamMember
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white transition-all duration-300 shadow-lg hover:-translate-y-1 border-8 border-[#6EC1E4]">
      {/* Image Container */}
      <div className="flex justify-center items-center overflow-hidden  rounded-t-xl">
        <img
          src={typeof member.image === "string" ? member.image : (member.image as any).src}
          alt={member.name}
          className="max-h-80 min-h-80 w-auto object-cover rounded-md  p-t-2"
        />
      </div>

      {/* Content Container */}
      <div className="space-y-3 p-6 text-center">
        <h3 className="text-xl lg:text-2xl font-bold text-slate-900">{member.name}</h3>
        {
          // member.title && <p className="text-lg font-bold text-black">{member.roleType}</p>
        }
        {/* <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">উপদেষ্টা</p> */}
        <p className="text-sm font-medium text-slate-700">{member.occupation}</p>

        {member.description && (
          <p className="text-sm text-slate-500 pt-2 line-clamp-2">{member.description}</p>
        )}
      </div>
    </div>
  )
}

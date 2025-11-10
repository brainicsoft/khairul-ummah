interface TeamMember {
    id: string
    name: string
    title: string
    occupation: string
    image: string
    description?: string
  }
  
  interface TeamCardProps {
    member: TeamMember
  }
  
  export function TeamCard({ member }: TeamCardProps) {
    return (
      <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative h-80 overflow-hidden bg-gray-200">
          <img
            src={member.image || "/placeholder.svg"}
            alt={member.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
  
        {/* Content Container */}
        <div className="space-y-3 p-6">
          <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">{member.title}</p>
          <p className="text-sm text-slate-600">{member.occupation}</p>
  
          {member.description && <p className="text-sm text-slate-500 line-clamp-2 pt-2">{member.description}</p>}
        </div>
      </div>
    )
  }
  
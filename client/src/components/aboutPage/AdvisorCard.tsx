import Image from "next/image"
import { StaticImageData } from "next/image"
import { User } from "lucide-react"

interface AdvisorCardProps {
  member: {
    id: string
    name: string
    occupation?: string
    image: string | StaticImageData
    description?: string
    roleType?: string
  }
}

function getImageSrc(image: string | StaticImageData) {
  return typeof image === "string" ? image : image.src
}

export function AdvisorCard({ member }: AdvisorCardProps) {
  const imageSrc = getImageSrc(member.image)

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted">
            <User className="h-16 w-16 text-muted-foreground/40" />
          </div>
        )}
        {member.roleType && (
          <span className="absolute left-3 top-3 rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
            {member.roleType}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 text-center sm:p-6">
        <h3 className="text-lg font-bold text-foreground sm:text-xl">{member.name}</h3>
        {member.occupation && (
          <p className="mt-2 text-sm font-medium text-primary">{member.occupation}</p>
        )}
        {member.description && (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {member.description}
          </p>
        )}
      </div>
    </article>
  )
}

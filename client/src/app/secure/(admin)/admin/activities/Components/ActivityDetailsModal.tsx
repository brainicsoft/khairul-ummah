"use client"
import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tag, X } from "lucide-react"
import Image from "next/image"

interface IActivity {
  _id: string
  category: string
  title: string
  description: string
  image: string
  content?: string
}

interface ActivityDetailModalProps {
  activity: IActivity | null
  isOpen: boolean
  onClose: () => void
}

export default function ActivityDetailModal({ activity, isOpen, onClose }: ActivityDetailModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose])

  if (!activity || !isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 h-screen bg-black/50 transition-opacity" onClick={onClose} />

      {/* Modal Wrapper */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Modal Content Box */}
        <Card
          className="modal-scrollbar w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <style>{`
                        .modal-scrollbar::-webkit-scrollbar {
                            width: 6px;
                            height: 4px;
                        }
                        .modal-scrollbar::-webkit-scrollbar-track {
                            background: transparent;
                        }
                        .modal-scrollbar::-webkit-scrollbar-thumb {
                            background: #cbd5e1;
                            border-radius: 3px;
                        }
                        .modal-scrollbar::-webkit-scrollbar-thumb:hover {
                            background: #94a3b8;
                        }
                    `}</style>

          <CardHeader className="sticky top-0 z-10 flex flex-row items-start justify-between border-b bg-white dark:text-white dark:bg-gray-800">
            <div className="flex-1">
              <CardTitle className="text-2xl">{activity.title}</CardTitle>
            </div>
            <button onClick={onClose} className="rounded-md hover:bg-gray-100 p-1 cursor-pointer">
              <X className="h-5 w-5 dark:text-white dark:hover:text-gray-800" />
            </button>
          </CardHeader>

          <CardContent className="pt-6 space-y-6">
            {/* Featured Image */}
            {activity.image && (
              <div className="overflow-hidden border-0 bg-white dark:bg-gray-800">
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <Image
                    src={activity.image || "/placeholder.svg?height=200&width=400&query=activity"}
                    alt={activity.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-fill"
                  />
                </div>
              </div>
            )}

            {/* Meta Information */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Category</p>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{activity.category}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Description</h3>
              <p className="text-gray-700 leading-relaxed">{activity.description}</p>
            </div>

            {/* Content */}
            {activity.content && (
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Full Content</h3>
                <p className="text-gray-700 leading-relaxed">{activity.content}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

"use client"
import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, User, Tag, X } from 'lucide-react'
import Image from "next/image"

interface IBlog {
  id: number
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  image: string
  content?: string
}

interface BlogDetailModalProps {
  blog: IBlog | null
  isOpen: boolean
  onClose: () => void
}

export default function BlogDetailModal({ blog, isOpen, onClose }: BlogDetailModalProps) {
  if (!blog || !isOpen) return null

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose])

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 h-screen bg-black/50 transition-opacity"
        onClick={onClose}
      />

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
              <CardTitle className="text-2xl">{blog.title}</CardTitle>
            </div>
            <button
              onClick={onClose}
              className="rounded-md hover:bg-gray-100 p-1 cursor-pointer"
            >
              <X className="h-5 w-5 dark:text-white dark:hover:text-gray-800" />
            </button>
          </CardHeader>

          <CardContent className="pt-6 space-y-6">
            {/* Featured Image */}
            {blog.image && (
              <div className="overflow-hidden border-0 bg-white dark:bg-gray-800">
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <Image
                    src={blog.image || "/placeholder.svg?height=200&width=400&query=project"}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-fill"
                  />
                </div>
              </div>
            )}

            {/* Meta Information */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Author</p>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{blog.author}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Date</p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{blog.date}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Category</p>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{blog.category}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Description</h3>
              <p className="text-gray-700 leading-relaxed">{blog.description}</p>
            </div>

            {/* Content */}
            {blog.content && (
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Full Content</h3>
                <p className="text-gray-700 leading-relaxed">{blog.content}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

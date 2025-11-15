"use client"
import { useEffect } from "react"
import { BookOpen, Video, CheckCircle, X } from "lucide-react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProjectDetailModalProps {
    project: any
    isOpen: boolean
    onClose: () => void
}

export default function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
    if (!project || !isOpen) return null

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
                className="fixed inset-0 bg-black/60 z-50 h-screen"
                onClick={onClose}
            />

            {/* Modal Wrapper */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">

                {/* Modal Content Box */}
                <div
                    className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl modal-scrollbar relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Custom Scrollbar */}
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
            .dark .modal-scrollbar::-webkit-scrollbar-thumb {
              background: #475569;
            }
            .dark .modal-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #64748b;
            }
          `}</style>

                    {/* HEADER */}
                    <div className="flex items-start justify-between p-6 border-b border-gray-200 dark:border-gray-600 sticky top-0 bg-white dark:bg-gray-800 z-50">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{project.title}</h2>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mt-1">Category: {project.category}</p>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mt-1">Status: {project.status}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="ml-auto text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg"
                            aria-label="Close details"
                        >
                            <X className="w-6 h-6 cursor-pointer" />
                        </button>
                    </div>

                    {/* BODY */}
                    <main className="space-y-6 p-6">
                        {/* IMAGE CARD — FIXED RESPONSIVE & CORRECT ASPECT */}
                        <div className="overflow-hidden border-0 bg-white dark:bg-gray-800">
                            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                                <Image
                                    src={project.image || "/placeholder.svg?height=200&width=400&query=project"}
                                    alt={project.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-fill"
                                />
                            </div>
                        </div>

                        {/* DESCRIPTION */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BookOpen className="h-4 w-4" /> Description
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 dark:text-gray-300">{project.desc}</p>
                            </CardContent>
                        </Card>

                        {/* BENEFITS */}
                        {project.benefits?.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4" /> Benefits
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                                        {project.benefits.map((b: string, i: number) => (
                                            <li key={i}>{b}</li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}

                        {/* VIDEO */}
                        {project.videoUrl && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Video className="h-4 w-4" /> Video
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="aspect-video">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={project.videoUrl}
                                        title={project.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </CardContent>
                            </Card>
                        )}

                    </main>
                </div>
            </div>
        </>
    )
}

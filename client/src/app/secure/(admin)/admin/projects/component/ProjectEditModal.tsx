"use client"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import EditForm from "./EditFom"
import { useState } from "react"

interface ProjectEditModalProps {
  project: any | null
  isOpen: boolean
  onClose: () => void
  refetch: () => void
}

export default function ProjectEditModal({ project, isOpen, onClose, refetch, }: ProjectEditModalProps) {
  if (!isOpen) return null
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-50 h-screen"
        onClick={onClose}
      />

      {/* Modal Wrapper */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">

        {/* Modal Content */}
        <div
          className="bg-white dark:bg-gray-800 dark:text-white rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >

          {/* HEADER */}
          <div className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600 flex items-center justify-between p-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">প্রকল্প তথ্য সম্পাদনা</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                প্রয়োজনীয় তথ্য আপডেট করুন
              </p>
            </div>
            {/* Close Button */}
            <button
              onClick={onClose}
              className="text-black hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* FORM CONTENT */}
          <div className="p-6 flex-1 overflow-y-auto modal-scrollbar">
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
            <EditForm project={project} onClose={onClose} refetch={refetch} setIsLoading={setIsLoading} />
          </div>

          {/* FOOTER BUTTONS */}
          <div className="sticky bottom-0 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-600 p-4 flex justify-end gap-4">
            <Button variant="outline" onClick={onClose}>বাতিল করুন</Button>
            <Button type="submit" form="project-edit-form" disabled={isLoading}>{isLoading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}</Button>
          </div>
        </div>
      </div>
    </>
  )
}

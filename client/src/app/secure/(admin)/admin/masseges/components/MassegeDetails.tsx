"use client"
import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, User, X } from "lucide-react"

interface IMessage {
  _id: string
  email: string
  name: string
  phone: string
  subject: string
  message: string
}

interface MessageDetailModalProps {
  message: IMessage | null
  isOpen: boolean
  onClose: () => void
}

export default function MassegeDetailModal({ message, isOpen, onClose }: MessageDetailModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose])

  if (!message || !isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 h-screen bg-black/50 transition-opacity" onClick={onClose} />

      {/* Modal Wrapper */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Modal Content Box */}
        <Card
          className="modal-scrollbar w-full max-w-2xl max-h-[90vh] overflow-y-auto"
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
              <CardTitle className="text-2xl">{message.subject}</CardTitle>
            </div>
            <button onClick={onClose} className="rounded-md hover:bg-gray-100 p-1 cursor-pointer">
              <X className="h-5 w-5 dark:text-white dark:hover:text-gray-800" />
            </button>
          </CardHeader>

          <CardContent className="pt-6 space-y-6">
            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Name</p>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{message.name}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Email</p>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{message.email}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Phone</p>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{message.phone}</span>
                </div>
              </div>
            </div>

            {/* Message Content */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Message</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{message.message}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

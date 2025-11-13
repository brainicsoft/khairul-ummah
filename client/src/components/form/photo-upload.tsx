import { useRef } from "react"
import { Upload } from "lucide-react"
import { Button } from "../ui/button"

interface PhotoUploadProps {
  photoPreview: string
  onPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemovePhoto: () => void
  error?: string
}

export function PhotoUpload({
  photoPreview,
  onPhotoUpload,
  onRemovePhoto,
  error
}: PhotoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="mb-8">
      <label className="text-sm font-medium text-gray-700 mb-4 block">আপনার ছবি</label>
      
      {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
      
      {photoPreview && (
        <div className="mt-4 flex flex-col items-start">
          <div className="relative w-24 h-24">
            <img
              src={photoPreview}
              alt="ছবির প্রিভিউ"
              className="w-24 h-24 rounded-full border-2 border-primary object-cover shadow-sm"
            />
            <button
              type="button"
              onClick={onRemovePhoto}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">প্রোফাইল ছবি প্রিভিউ</p>
        </div>
      )}

      <label className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary/90">
        <Upload className="w-4 h-4" />
        <span>ছবি আপলোড করুন</span>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onPhotoUpload}
          className="hidden"
        />
      </label>
    </div>
  )
}
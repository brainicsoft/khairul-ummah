import { useRef, useState } from "react"
import { Upload } from "lucide-react"

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
  const [isDragging, setIsDragging] = useState(false)
  const dragCounter = useRef(0)

  const handleDropFile = (files: FileList | null) => {
    if (!files || files.length === 0) return

    const fakeEvent = {
      target: { files }
    } as unknown as React.ChangeEvent<HTMLInputElement>

    onPhotoUpload(fakeEvent)
  }

  return (
    <div className="mb-8">
      <label className="text-sm font-medium text-gray-700 mb-4 block">
        আপনার ছবি
      </label>

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
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">প্রোফাইল ছবি প্রিভিউ</p>
        </div>
      )}

      {/* Drag & Drop + Click Zone */}
      <div
        className={`
          mt-4 border-2 border-dashed rounded-lg p-5 flex flex-col items-center justify-center cursor-pointer transition
          ${isDragging ? "border-primary bg-primary/10" : "border-gray-300 hover:border-primary"}
        `}
        onClick={() => fileInputRef.current?.click()}
        onDragEnter={(e) => {
          e.preventDefault()
          dragCounter.current++
          setIsDragging(true)
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          dragCounter.current--
          if (dragCounter.current === 0) setIsDragging(false)
        }}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDrop={(e) => {
          e.preventDefault()
          dragCounter.current = 0
          setIsDragging(false)
          handleDropFile(e.dataTransfer.files)
        }}
      >
        <Upload className="w-5 h-5 text-gray-700 mb-2" />
        <p className="text-sm text-gray-700">ছবি ড্র্যাগ & ড্রপ করুন</p>
        <p className="text-xs text-gray-500">অথবা ক্লিক করে আপলোড করুন</p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onPhotoUpload}
        />
      </div>
    </div>
  )
}

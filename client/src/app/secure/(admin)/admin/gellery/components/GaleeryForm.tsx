import { FormInput, FormTextarea } from "@/components/form/FormInput";
import { PhotoUpload } from "@/components/form/photo-upload";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const GalleryForm = ({ handleSubmit, formData, setFormData, preview, setPreview, handleImageUpload, handleRemoveImage }) => {

    const PURPOSES = [
        { value: 'community', label: 'কমিউনিটি' },
        { value: 'flood', label: 'বন্যা ত্রাণ' },
        { value: 'meeting', label: 'সভা' },
        { value: 'gathering', label: 'সমাবেশ' },
        { value: 'relief', label: 'ত্রাণ' },
        { value: 'event', label: 'ইভেন্ট' },
        { value: 'water', label: 'জল ত্রাণ' },
        { value: 'other', label: 'অন্যান্য' },
    ];

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
            <PhotoUpload
                photoPreview={preview}
                onPhotoUpload={handleImageUpload}
                onRemovePhoto={handleRemoveImage}
                photoTitle="ছবি"
            />
            <FormInput
                label="শিরোনাম"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <FormInput
                label="বিকল্প পাঠ্য"
                required
                value={formData.alt}
                onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
            />
            <div className='dark:text-white'>
                <label className="text-sm font-medium mb-2 block">বিভাগ</label>
                <Select
                    value={formData.purpose}
                    onValueChange={(value) => setFormData({ ...formData, purpose: value })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-700">
                        {PURPOSES.map((p) => (
                            <SelectItem key={p.value} value={p.value}>
                                {p.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <FormInput
                label="তারিখ"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
        </form>
    )
}


export default GalleryForm;
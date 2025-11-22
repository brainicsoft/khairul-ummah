import { FormInput } from "@/components/form/FormInput";
import { PhotoUpload } from "@/components/form/photo-upload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CommiteeForm = ({ handleSubmit, formData, setFormData, preview, setPreview, handleImageUpload, handleRemoveImage }) => {

    const ROLE_TYPES = [
        { value: 'চেয়ারম্যান', label: 'চেয়ারম্যান' },
        { value: 'ভাইস-চেয়ারম্যান', label: 'ভাইস চেয়ারম্যান' },
        { value: 'সেক্রেটারি', label: 'সেক্রেটারি' },
        { value: 'কোষাধ্যক্ষ', label: 'কোষাধ্যক্ষ' },
        { value: 'সদস্য', label: 'সদস্য' },
        { value: 'উপদেষ্টা', label: 'উপদেষ্টা' },
        { value: 'পরিচালক', label: 'পরিচালক' },
    ];

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
            {/* Photo Upload */}
            <PhotoUpload
                photoPreview={preview}
                onPhotoUpload={handleImageUpload}
                onRemovePhoto={handleRemoveImage}
                photoTitle="সদস্যের ছবি"
            />
            {/* Inputs */}
            <FormInput
                label="নাম"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <FormInput
                label="ইমেইল (ঐচ্ছিক)"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <FormInput
                label="ফোন নম্বর"
                type="number"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            {/* Role Select */}
            <div className="dark:text-white">
                <label className="text-sm font-medium text-gray-700 dark:text-white mb-2 block">
                    ভূমিকা <span className="text-red-500">*</span>
                </label>
                <Select
                    value={formData.roleType}
                    onValueChange={(value) => setFormData({ ...formData, roleType: value })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="ভূমিকা নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-700">
                        {ROLE_TYPES.map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                                {role.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <FormInput
                label="পেশা"
                value={formData.occupation}
                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
            />
        </form>
    );
};

export default CommiteeForm;
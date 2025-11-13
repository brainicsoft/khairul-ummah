import { forwardRef } from "react"

interface FormSelectProps {
  label: string
  required?: boolean
  error?: string
  options: { value: string; label: string }[]
  className?: string
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, required = false, error, options, className, ...props }, ref) => {
    return (
      <div className={className}>
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <select
          ref={ref}
          className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
            error ? "border-red-500 focus:ring-red-500" : ""
          }`}
          {...props}
        >
          <option value="">নির্বাচন করুন</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    )
  }
)

FormSelect.displayName = "FormSelect"
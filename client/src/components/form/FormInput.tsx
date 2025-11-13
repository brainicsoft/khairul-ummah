import { forwardRef } from "react"
import { Input } from "../ui/input"

interface FormInputProps {
  label: string
  type?: string
  required?: boolean
  error?: string
  placeholder?: string
  className?: string
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, type = "text", required = false, error, placeholder, className, ...props }, ref) => {
    return (
      <div className={className}>
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <Input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`shadow-sm ${error ? "border-red-500" : ""}`}
          {...props}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    )
  }
)

FormInput.displayName = "FormInput"

interface FormTextareaProps {
  label: string
  required?: boolean
  error?: string
  placeholder?: string
  rows?: number
  className?: string
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, required = false, error, placeholder, rows = 4, className, ...props }, ref) => {
    return (
      <div className={className}>
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <textarea
          ref={ref}
          placeholder={placeholder}
          rows={rows}
          className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
            error ? "border-red-500 focus:ring-red-500" : ""
          }`}
          {...props}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    )
  }
)

FormTextarea.displayName = "FormTextarea"
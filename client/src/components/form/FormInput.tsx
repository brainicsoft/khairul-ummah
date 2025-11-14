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
        {/* Label */}
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          {label} {required && <span className="text-red-500">*</span>}
        </label>

        {/* Input */}
        <Input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`
            w-full
            h-12
            text-base
            border border-gray-400
            px-4
            rounded-sm
            focus:border-primary
            focus:ring-0
            ${error ? "border-red-500 focus:border-red-500" : ""}
          `}
          {...props}
        />

        {/* Error */}
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    )
  }
)

FormInput.displayName = "FormInput"

// ----------------------------------------------------------------------
// Textarea Component
// ----------------------------------------------------------------------

interface FormTextareaProps {
  label: string
  required?: boolean
  error?: string
  placeholder?: string
  rows?: number
  className?: string
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, required = false, error, placeholder, rows = 5, className, ...props }, ref) => {
    return (
      <div className={className}>
        {/* Label */}
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          {label} {required && <span className="text-red-500">*</span>}
        </label>

        {/* Textarea */}
        <textarea
          ref={ref}
          placeholder={placeholder}
          rows={rows}
          className={`
            w-full
            text-base
            border border-gray-400
            px-4 py-3
            rounded-sm
            focus:ring-0
            focus:border-primary
            ${error ? "border-red-500 focus:border-red-500" : ""}
          `}
          {...props}
        />

        {/* Error */}
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    )
  }
)

FormTextarea.displayName = "FormTextarea"

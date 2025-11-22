
import { forwardRef } from "react";
import { Input } from "../ui/input";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, required = false, error, className = "", ...props }, ref) => {
    return (
      <div className={className}>
        <label className="text-sm font-medium text-gray-700 dark:text-white mb-2 block">
          {label} {required && <span className="text-red-500">*</span>}
        </label>

        <Input
          ref={ref}
          className={`
            w-full h-12 text-base border border-gray-400 px-4 rounded-sm
            focus:border-primary focus:ring-0
            dark:bg-gray-700 dark:text-white
            ${error ? "border-red-500 focus:border-red-500" : ""}
          `}
          {...props} // এখানে সব standard props চলে যাবে, যেমন value, onChange, type, placeholder
        />

        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";


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
        <label className="text-sm font-medium text-gray-700 dark:text-white mb-2 block">
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

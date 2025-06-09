// frontend/src/components/common/InputField.tsx
import React from "react";
import type { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  className = "",
  ...rest
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={rest.id || label} className="text-sm font-medium mb-1">
        {label}
      </label>
      <input
        id={rest.id || label}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...rest}
      />
    </div>
  );
};

export default InputField;

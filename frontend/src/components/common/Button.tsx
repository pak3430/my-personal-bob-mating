// frontend/src/components/common/Button.tsx
import React, { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  ...rest
}) => {
  return (
    <button
      className={`px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

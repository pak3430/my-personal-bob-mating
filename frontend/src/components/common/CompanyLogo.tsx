// frontend/src/components/common/CompanyLogo.tsx
import React from "react";

interface CompanyLogoProps {
  className?: string;
}

const CompanyLogo: React.FC<CompanyLogoProps> = ({ className }) => {
  // public 폴더에 있는 로고를 직접 참조
  return (
    <img
      src="/company-logo2.svg" // public 폴더의 경로
      alt="Company Logo"
      className={`h-full w-100 ${className}`}
    />
  );
};

export default CompanyLogo;

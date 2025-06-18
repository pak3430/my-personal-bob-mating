// frontend/src/components/layout/Footer.tsx
import React from "react";
import CompanyLogo from "../common/CompanyLogo";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 px-4 md:px-20 bg-red-400 text-white text-center">
      <CompanyLogo className="h-10 mx-auto mb-4" />
      <p className="text-sm font-text-small-normal">
        &copy; {new Date().getFullYear()} YUMM. All rights reserved.
      </p>
      <div className="mt-4 flex justify-center space-x-6 text-sm font-text-small-link">
        <Link to="/privacy" className="hover:underline">
          개인정보처리방침
        </Link>
        <Link to="/terms" className="hover:underline">
          이용약관
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

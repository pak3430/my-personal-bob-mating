// frontend/src/components/layout/Header.tsx
import React from "react";
import CompanyLogo from "../common/CompanyLogo";
import { Link } from "react-router-dom";
import Button from "../common/Button";

interface HeaderProps {
  onToggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* 로고 */}
      <div className="h-9">
        <CompanyLogo className="h-full" />
      </div>

      {/* 데스크탑 네비게이션 */}
      <nav className="hidden md:flex space-x-6">
        <Link to="/" className="text-gray-700 hover:text-blue-600">
          Home
        </Link>
        {/* TODO: 다른 메뉴 항목 추가 */}
      </nav>

      {/* 로그인/회원가입 버튼 */}
      <div className="hidden md:flex space-x-4">
        <Link to="/login">
          <Button className="border border-gray-300 text-gray-700 hover:bg-gray-100">
            Login
          </Button>
        </Link>
        <Link to="/signup">
          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            Sign Up
          </Button>
        </Link>
      </div>

      {/* 모바일 햄버거 메뉴 아이콘 */}
      {onToggleSidebar && (
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 text-gray-700"
        >
          ☰
        </button>
      )}
    </header>
  );
};

export default Header;

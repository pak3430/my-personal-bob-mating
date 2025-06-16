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
      {/* 로고 - 왼쪽 상단 고정, 클릭 시 메인 이동 */}
      <Link to="/" className="h-9 flex items-center">
        <CompanyLogo className="h-full" />
      </Link>
      {/* 카테고리 네비게이션 */}
      <nav className="flex space-x-6">
        {/* 맛집추천 드롭다운 */}
        <div className="relative group">
          <button className="text-gray-700 hover:text-blue-600 font-semibold">
            맛집추천
          </button>
          <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50">
            <Link
              to="/today-restaurant"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              오늘의 맛집
            </Link>
            <Link
              to="/weekly-restaurant"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              금주의 맛집
            </Link>
            <Link
              to="/season-restaurant"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              제철 맛집
            </Link>
          </div>
        </div>
        {/* 커뮤니티 드롭다운 */}
        <div className="relative group">
          <button className="text-gray-700 hover:text-blue-600 font-semibold">
            커뮤니티
          </button>
          <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              인스타그램
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              YOUTUBE
            </a>
          </div>
        </div>
        {/* 얌스토리 드롭다운 */}
        <div className="relative group">
          <button className="text-gray-700 hover:text-blue-600 font-semibold">
            얌스토리
          </button>
          <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50">
            <Link to="/yamstory" className="block px-4 py-2 hover:bg-gray-100">
              얌스토리의 시작
            </Link>
          </div>
        </div>
        {/* 고객지원 드롭다운 */}
        <div className="relative group">
          <button className="text-gray-700 hover:text-blue-600 font-semibold">
            고객지원
          </button>
          <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50">
            <Link
              to="/support/inquiry"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              1:1문의
            </Link>
            <Link
              to="/support/qna"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Q&A
            </Link>
          </div>
        </div>
      </nav>
      {/* 햄버거 버튼 - 오른쪽 */}
      {onToggleSidebar && (
        <button
          onClick={onToggleSidebar}
          className="ml-4 p-2 rounded-full bg-gray-100 shadow hover:bg-gray-200 transition-colors flex items-center justify-center"
          aria-label="Open sidebar"
        >
          {/* SVG 햄버거 아이콘 */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-7 h-7 text-gray-700"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      )}
    </header>
  );
};

export default Header;

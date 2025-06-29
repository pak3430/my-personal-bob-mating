// frontend/src/components/layout/SideMenu.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const SideMenu: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthButton = () => {
    if (isAuthenticated) {
      logout();
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto p-4 flex flex-col items-center">
      <div className="flex flex-col items-center mb-8 pt-8">
        {" "}
        {/* 상단 패딩 추가 */}
        {/* 사용자 아바타 또는 프로필 사진 (MyPage의 이미지 사용 가능) */}
        <img
          src="/avatar-image.png"
          alt="User Avatar"
          className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-white"
        />
        <p className="text-xl font-semibold text-gray-800">유저이름</p>{" "}
        {/* 사용자 닉네임 */}
        <p className="text-sm text-gray-600">email@example.com</p>{" "}
        {/* 사용자 이메일 */}
      </div>

      <nav className="flex flex-col w-full space-y-2">
        <Link
          to="/"
          className="flex items-center px-4 py-3 rounded-lg text-gray-800 font-semibold shadow-sm bg-white hover:bg-blue-50 active:bg-blue-100 transition-colors border border-gray-200"
        >
          <img src="/house.png" alt="Home Icon" className="w-6 h-6 mr-3" />
          Home
        </Link>
        <Link
          to="/mypage"
          className="flex items-center px-4 py-3 rounded-lg text-gray-800 font-semibold shadow-sm bg-white hover:bg-blue-50 active:bg-blue-100 transition-colors border border-gray-200"
        >
          <img src="/avatar.png" alt="My Page Icon" className="w-6 h-6 mr-3" />
          My Page
        </Link>
        <Link
          to="/matching-schedule"
          className="flex items-center px-4 py-3 rounded-lg text-gray-800 font-semibold shadow-sm bg-white hover:bg-blue-50 active:bg-blue-100 transition-colors border border-gray-200"
        >
          <img
            src="/calendar.png"
            alt="Matching Schedule Icon"
            className="w-6 h-6 mr-3"
          />
          Matching Schedule
        </Link>
        <Link
          to="/matching-loading"
          className="flex items-center px-4 py-3 rounded-lg text-gray-800 font-semibold shadow-sm bg-white hover:bg-blue-50 active:bg-blue-100 transition-colors border border-gray-200"
        >
          <img
            src="/heart.png"
            alt="Matching Loading Icon"
            className="w-6 h-6 mr-3"
          />
          Matching Loading
        </Link>
        <Link
          to="/chat"
          className="flex items-center px-4 py-3 rounded-lg text-gray-800 font-semibold shadow-sm bg-white hover:bg-blue-50 active:bg-blue-100 transition-colors border border-gray-200"
        >
          <img src="/chat.png" alt="Chat Icon" className="w-6 h-6 mr-3" />
          Chat
        </Link>
        <Link
          to="/settings"
          className="flex items-center px-4 py-3 rounded-lg text-gray-800 font-semibold shadow-sm bg-white hover:bg-blue-50 active:bg-blue-100 transition-colors border border-gray-200"
        >
          <img src="/sun.png" alt="Settings Icon" className="w-6 h-6 mr-3" />
          Settings
        </Link>
      </nav>

      <div className="mt-auto w-full pt-4 border-t border-gray-300">
        <button
          className={`flex items-center w-full px-4 py-3 rounded-lg font-semibold shadow-sm bg-white transition-colors border
            ${
              isAuthenticated
                ? "text-red-600 hover:bg-red-50 active:bg-red-100 border-red-200"
                : "text-blue-600 hover:bg-blue-50 active:bg-blue-100 border-blue-200"
            }`}
          onClick={handleAuthButton}
        >
          <img
            src="/sign-out-alt.png"
            alt={isAuthenticated ? "Logout Icon" : "Login Icon"}
            className="w-6 h-6 mr-3"
          />
          {isAuthenticated ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default SideMenu;

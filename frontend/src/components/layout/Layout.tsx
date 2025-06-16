// frontend/src/components/layout/Layout.tsx
import React, { useState, useEffect } from "react";
import SideMenu from "./SideMenu";
import Header from "./Header";
import Footer from "./Footer"; // Footer 컴포넌트 임포트
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // 메인(Home) 페이지로 이동 시 사이드바 닫기
  useEffect(() => {
    if (location.pathname === "/") {
      setIsSidebarOpen(false);
    }
  }, [location]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header onToggleSidebar={toggleSidebar} />
      <div className="flex flex-1 pt-[64px]">
        {" "}
        {/* Header 높이만큼 paddingTop 추가 */}
        {/* 사이드바 영역 - 오른쪽 */}
        <aside
          className={`fixed top-0 right-0 h-full bg-color-schemes-color-scheme-1-background border-l border-solid border-black z-40
            ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
            w-[300px] flex-shrink-0 pt-[64px] transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]`}
        >
          <SideMenu />
        </aside>
        {/* 오버레이 */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-30"
            onClick={toggleSidebar}
          ></div>
        )}
        {/* 메인 콘텐츠 영역 */}
        <main
          className={`flex-1 transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "mr-[300px]" : "mr-0"}`}
        >
          {children}
        </main>
      </div>
      <Footer /> {/* Footer를 Layout에 포함 */}
    </div>
  );
};

export default Layout;

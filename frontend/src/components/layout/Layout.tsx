// frontend/src/components/layout/Layout.tsx
import React, { useState } from "react";
import SideMenu from "./SideMenu";
import Header from "./Header";
import Footer from "./Footer"; // Footer 컴포넌트 임포트

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header onToggleSidebar={toggleSidebar} />
      <div className="flex flex-1 pt-[64px]">
        {" "}
        {/* Header 높이만큼 paddingTop 추가 */}
        {/* 사이드바 영역 */}
        <aside
          className={`fixed top-0 left-0 h-full bg-color-schemes-color-scheme-1-background border-r border-solid border-black transition-transform duration-300 ease-in-out z-40
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            w-[300px] flex-shrink-0 lg:static lg:translate-x-0 lg:border-r lg:pt-[64px]`}
        >
          <SideMenu />
        </aside>
        {/* 오버레이 */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
            onClick={toggleSidebar}
          ></div>
        )}
        {/* 메인 콘텐츠 영역 */}
        <main
          className={`flex-1 transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "ml-[300px]" : "ml-0"}
          lg:ml-[300px]`}
        >
          {children}
        </main>
      </div>
      <Footer /> {/* Footer를 Layout에 포함 */}
    </div>
  );
};

export default Layout;

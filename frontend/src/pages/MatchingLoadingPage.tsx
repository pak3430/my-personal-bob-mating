// frontend/src/pages/MatchingLoadingPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CompanyLogo from "../components/common/CompanyLogo"; // 로고 컴포넌트 추가

const MatchingLoadingPage: React.FC = () => {
  const navigate = useNavigate();
  const [loadingText, setLoadingText] =
    useState("매칭 상대를 찾고 있습니다...");

  useEffect(() => {
    // TODO: 백엔드에서 매칭 결과를 폴링하거나, WebSocket을 통해 결과를 받습니다.
    // 임시로 5초 후 마이페이지로 리다이렉트 (실제 로직으로 교체 필요)
    const timer = setTimeout(() => {
      // 실제 매칭 결과에 따라 /matching-schedule 또는 /mypage 등으로 이동
      navigate("/mypage"); // 임시: 마이페이지로 이동
    }, 5000); // 5초 후 이동

    const interval = setInterval(() => {
      setLoadingText((prev) => {
        if (prev.endsWith("...")) return "매칭 상대를 찾고 있습니다.";
        return prev + ".";
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-color-schemes-color-scheme-1-background p-4">
      <div className="flex justify-center mb-8">
        <CompanyLogo className="h-16 w-auto" />
      </div>
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-blue-500 mb-6 mx-auto"></div>
        <h1 className="text-3xl font-heading-desktop-h2 text-gray-800 mb-4">
          {loadingText}
        </h1>
        <p className="text-lg text-gray-600 font-text-regular-normal">
          잠시만 기다려주세요. 최적의 밥메이트를 찾고 있습니다.
        </p>
      </div>
    </div>
  );
};

export default MatchingLoadingPage;

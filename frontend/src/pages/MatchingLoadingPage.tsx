import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CompanyLogo from "../components/common/CompanyLogo";

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
    <div className="flex flex-col items-center justify-center h-screen bg-color-schemes-color-scheme-1-background p-0">
      <div
        className="w-full flex justify-center items-center"
        style={{ height: "80px" }}
      >
        <CompanyLogo className="h-16 w-auto" />
      </div>
      <div className="flex-1 w-full flex items-center justify-center">
        <img
          src="/matching-loading.gif"
          alt="로딩 애니메이션"
          className="w-full h-full object-contain"
          style={{ maxHeight: "calc(100vh - 200px)" }}
        />
      </div>
      <div className="w-full text-center pb-8">
        <h1 className="text-3xl font-heading-desktop-h2 text-gray-800 mb-4">
          {loadingText}
        </h1>
        <p className="text-lg text-gray-600 font-text-regular-normal">
          잠시만 기다려주세요. 최적의 얌친구를 찾고 있습니다.
        </p>
      </div>
    </div>
  );
};

export default MatchingLoadingPage;

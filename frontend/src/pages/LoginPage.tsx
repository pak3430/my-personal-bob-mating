// frontend/src/pages/LoginPage.tsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import CompanyLogo from "../components/common/CompanyLogo";
import LoginForm from "../components/auth/LoginForm"; // LoginForm 컴포넌트 사용
import Toast from "../components/common/Toast";
import { useAuth } from "../hooks/useAuth"; // useAuth 훅 사용
import { useToast } from "../hooks/useToast";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, login, isLoading, error } = useAuth(); // user와 isAuthenticated 추가
  const { toasts, removeToast, showSuccess, showError } = useToast();

  const handleLoginSubmit = async (email: string, password: string) => {
    console.log("🔄 로그인 시도:", email);
    try {
      const result = await login(email, password);
      console.log("✅ 로그인 성공, 결과:", result);
      console.log("🔍 현재 인증 상태:", { user, isAuthenticated });

      showSuccess("로그인 성공! 잠시 후 마이페이지로 이동합니다.");

      // 사용자 상태가 업데이트될 시간을 주고 리다이렉트
      setTimeout(() => {
        console.log("🔍 리다이렉트 전 최종 상태:", { user, isAuthenticated });
        console.log("🚀 /mypage로 리다이렉트");
        navigate("/mypage");
      }, 2000);
    } catch (err: any) {
      console.error("❌ 로그인 실패:", err);
      console.log("🔍 에러 응답:", err.response);
      showError(error || "로그인에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-color-schemes-color-scheme-1-background p-4">
      <div className="bg-yellow-100 p-8 md:p-12 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-center mb-8">
          <CompanyLogo className="h-12 w-auto" />
        </div>
        <h2 className="text-center text-3xl font-heading-desktop-h2 mb-8">
          로 그 인
        </h2>
        <LoginForm
          onSubmit={handleLoginSubmit}
          isLoading={isLoading}
          error={error}
        />
        <p className="mt-6 text-center text-gray-700 font-text-regular-normal">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-700 hover:underline font-text-small-link"
          >
            회원가입
          </Link>
        </p>
      </div>

      {/* Toast 알림들 */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default LoginPage;

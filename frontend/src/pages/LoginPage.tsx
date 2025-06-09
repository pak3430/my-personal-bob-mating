// frontend/src/pages/LoginPage.tsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import CompanyLogo from "../components/common/CompanyLogo";
import LoginForm from "../components/auth/LoginForm"; // LoginForm 컴포넌트 사용
import { useAuth } from "../hooks/useAuth"; // useAuth 훅 사용

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth(); // useAuth 훅에서 로그인 함수와 상태 가져오기

  const handleLoginSubmit = async (email: string, password: string) => {
    try {
      await login(email, password);
      alert("로그인 성공!");
      navigate("/mypage");
    } catch (err) {
      // useAuth 훅에서 이미 에러를 설정하므로 여기서는 별도 처리 불필요
      console.error("로그인 실패:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-color-schemes-color-scheme-1-background p-4">
      <div className="bg-figma-yellow p-8 md:p-12 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-center mb-8">
          <CompanyLogo className="h-12 w-auto" />
        </div>
        <h2 className="text-center text-3xl font-heading-desktop-h2 mb-8">
          Log In
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
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

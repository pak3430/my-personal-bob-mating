// frontend/src/pages/SignUpPage.tsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import CompanyLogo from "../components/common/CompanyLogo";
import SignUpForm from "../components/auth/SignUpForm"; // SignUpForm 컴포넌트 사용
import Toast from "../components/common/Toast";
import { useAuth } from "../hooks/useAuth"; // useAuth 훅 사용
import { useToast } from "../hooks/useToast";

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup, login, isLoading, error } = useAuth(); // useAuth 훅에서 회원가입 함수와 상태 가져오기
  const { toasts, removeToast, showSuccess, showError } = useToast();

  const handleSignUpSubmit = async (userData: any) => {
    try {
      // 1. 회원가입 시도
      await signup(userData);
      showSuccess("회원가입 성공!");

      // 2. 자동 로그인 시도
      try {
        const loginResult = await login(userData.email, userData.password);
        console.log("✅ 자동 로그인 성공:", loginResult);
        showSuccess("로그인 성공! 마이페이지로 이동합니다.");

        // 3. 로그인 성공 시 마이페이지로 이동
        setTimeout(() => {
          navigate("/mypage");
        }, 1000);
      } catch (loginErr) {
        console.error("자동 로그인 실패:", loginErr);
        showError("자동 로그인에 실패했습니다. 로그인 페이지로 이동합니다.");
        navigate("/login");
      }
    } catch (err) {
      console.error("회원가입 실패:", err);
      showError(error || "회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-color-schemes-color-scheme-1-background p-4">
      <div className="bg-pink-100 p-8 md:p-12 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-center mb-8">
          <CompanyLogo className="h-12 w-auto" />
        </div>
        <h2 className="text-center text-3xl font-heading-desktop-h2 mb-8 text-black">
          회 원 가 입
        </h2>
        <SignUpForm
          onSubmit={handleSignUpSubmit}
          isLoading={isLoading}
          error={error}
        />
        <p className="mt-6 text-center text-black text-sm font-text-regular-normal">
          이미 회원이신가요?{" "}
          <Link
            to="/login"
            className="text-red-500 hover:underline font-text-small-link"
          >
            로그인
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

export default SignUpPage;

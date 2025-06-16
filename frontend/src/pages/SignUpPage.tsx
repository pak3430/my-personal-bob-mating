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
  const { signup, isLoading, error } = useAuth(); // useAuth 훅에서 회원가입 함수와 상태 가져오기
  const { toasts, removeToast, showSuccess, showError } = useToast();

  const handleSignUpSubmit = async (userData: any) => {
    try {
      await signup(userData);
      showSuccess("회원가입 성공!");
      navigate("/login");
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
        <p className="mt-6 text-center text-white text-sm font-text-regular-normal">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-200 hover:underline font-text-small-link"
          >
            Login
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

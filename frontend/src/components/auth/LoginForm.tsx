// frontend/src/components/auth/LoginForm.tsx
import React, { useState } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading,
  error,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <InputField
        label="E-mail"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일을 입력해주세요."
        required
      />
      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호를 입력해주세요."
        required
      />
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      <Button
        type="submit"
        className="w-full bg-black text-white py-3 rounded-md mt-6 hover:bg-gray-800"
        disabled={isLoading}
      >
        {isLoading ? "로그인 중..." : "로그인"}
      </Button>
    </form>
  );
};

export default LoginForm;

// frontend/src/components/auth/SignUpForm.tsx
import React, { useState } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";

interface SignUpFormProps {
  onSubmit: (userData: {
    email: string;
    password: string;
    nickname: string;
    phone_num: string;
  }) => void;
  isLoading?: boolean;
  error?: string | null;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  onSubmit,
  isLoading,
  error,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    onSubmit({ email, password, nickname, phone_num: phone });
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
      <InputField
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="비밀번호를 다시 입력해주세요."
        required
      />
      <InputField
        label="Nickname"
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="닉네임을 입력해주세요."
        required
      />
      <InputField
        label="Phone Number"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="전화번호를 입력해주세요."
        required
      />
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      <Button
        type="submit"
        className="w-full bg-black text-white py-3 rounded-md mt-6 hover:bg-gray-800"
        disabled={isLoading}
      >
        {isLoading ? "회원가입 중..." : "Sign Up"}
      </Button>
    </form>
  );
};

export default SignUpForm;

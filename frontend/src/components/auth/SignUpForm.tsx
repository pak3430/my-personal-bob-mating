// frontend/src/components/auth/SignUpForm.tsx
import React, { useState } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";
import type { SignupRequest } from "../../api/types";

interface SignUpFormProps {
  onSubmit: (userData: SignupRequest) => void;
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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState<"MALE" | "FEMALE" | "UNKNOWN">(
    "UNKNOWN"
  );
  const [age, setAge] = useState<number>(20);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (age < 1 || age > 150) {
      alert("올바른 나이를 입력해주세요.");
      return;
    }
    onSubmit({ email, password, nickname, phoneNumber, gender, age });
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
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="전화번호를 입력해주세요."
        required
      />
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-white">Gender</label>
        <select
          value={gender}
          onChange={(e) =>
            setGender(e.target.value as "MALE" | "FEMALE" | "UNKNOWN")
          }
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          required
        >
          <option value="UNKNOWN">선택 안함</option>
          <option value="MALE">남성</option>
          <option value="FEMALE">여성</option>
        </select>
      </div>
      <InputField
        label="Age"
        type="number"
        value={age.toString()}
        onChange={(e) => setAge(parseInt(e.target.value))}
        placeholder="나이를 입력해주세요."
        min="1"
        max="150"
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

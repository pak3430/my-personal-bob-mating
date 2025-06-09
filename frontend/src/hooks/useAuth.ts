// frontend/src/hooks/useAuth.ts
import { useState, useEffect } from "react";
import { loginUser, registerUser } from "../api/auth"; // API 함수 임포트

export const useAuth = () => {
  const [user, setUser] = useState<any | null>(null); // 실제 사용자 타입 정의 필요
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 로컬 스토리지 등에서 초기 사용자 정보 로드
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("accessToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      return data;
    } catch (err: any) {
      setError(err.message || "로그인 실패");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await registerUser(userData);
      return data;
    } catch (err: any) {
      setError(err.message || "회원가입 실패");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  return { user, login, signup, logout, isLoading, error };
};

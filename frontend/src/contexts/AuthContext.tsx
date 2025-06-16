// frontend/src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { loginUser, logoutUser, registerUser } from "../api";
import type {
  User,
  UserResponse,
  SignupRequest,
  AuthResponseDto,
} from "../api/types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<AuthResponseDto>;
  signup: (userData: SignupRequest) => Promise<any>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserFromLocalStorage = () => {
      try {
        console.log("🔄 localStorage에서 사용자 정보 로드 시도");
        const storedUser = localStorage.getItem("user");
        const accessToken = localStorage.getItem("accessToken");

        console.log("🔍 저장된 사용자 정보:", storedUser);
        console.log("🔍 저장된 액세스 토큰:", accessToken ? "있음" : "없음");

        if (storedUser && accessToken) {
          const parsedUser = JSON.parse(storedUser);
          console.log("🔍 파싱된 사용자 정보:", parsedUser);
          setUser(parsedUser);
          console.log("✅ 사용자 정보 로드 완료");
        } else {
          console.log("⚠️ 저장된 사용자 정보 또는 토큰이 없음");
        }
      } catch (e) {
        console.error("❌ localStorage 파싱 실패:", e);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      } finally {
        setIsLoading(false);
        console.log("✅ 초기 로딩 완료");
      }
    };
    loadUserFromLocalStorage();
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<AuthResponseDto> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await loginUser(email, password);
      console.log("🔍 로그인 응답 전체:", response);

      // 백엔드 응답: { message: string, data: { accessToken, refreshToken, user } }
      const authResponse = response.data;

      if (authResponse?.data) {
        const { accessToken, refreshToken, user } = authResponse.data;
        console.log("🔍 추출된 데이터:", {
          hasAccessToken: !!accessToken,
          hasRefreshToken: !!refreshToken,
          user: user,
        });

        if (accessToken && refreshToken && user) {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          console.log("✅ 로그인 성공, 토큰과 사용자 정보 저장 완료");
        } else {
          throw new Error("로그인 응답에 필수 데이터가 누락되었습니다.");
        }
      } else {
        throw new Error("로그인 응답 구조가 올바르지 않습니다.");
      }

      return authResponse.data;
    } catch (err: any) {
      console.error("❌ 로그인 에러:", err);
      const errorMessage =
        err.response?.data?.message || err.message || "로그인 실패";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: SignupRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("🔄 회원가입 시도:", userData.email);
      const response = await registerUser(userData);
      console.log("🔍 회원가입 응답:", response);

      // 회원가입 성공 확인
      if (response.data && response.data.message) {
        console.log("✅ 회원가입 성공:", response.data.message);
      }

      return response;
    } catch (err: any) {
      console.error("❌ 회원가입 에러:", err);
      const errorMessage =
        err.response?.data?.message || err.message || "회원가입 실패";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await logoutUser(refreshToken);
      }
    } catch (err) {
      console.error("Logout API call failed:", err);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      setUser(null);
      console.log("🚪 로그아웃 완료");
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    isLoading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

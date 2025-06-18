// frontend/src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { loginUser, logoutUser, registerUser } from "../api";
import type {
  UserResponse,
  SignupRequest,
  AuthResponseDto,
  UserInfoDetailsResponse,
  LoginRequest,
  ApiResponse,
} from "../api/types";
import { apiClient } from "../api/client";

interface AuthContextType {
  user: UserInfoDetailsResponse | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<AuthResponseDto>;
  signup: (userData: SignupRequest) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserInfoDetailsResponse | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 토큰이 있을 때 사용자 정보 가져오기
  const fetchUserInfo = async () => {
    try {
      const response = await apiClient.get<
        ApiResponse<UserInfoDetailsResponse>
      >("/api/user/me/details");
      const userInfo = response.data.data;
      setUser(userInfo);
      localStorage.setItem("user", JSON.stringify(userInfo));
    } catch (err) {
      console.error("Failed to fetch user info:", err);
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  // 토큰이 있을 때 자동으로 사용자 정보 가져오기
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      fetchUserInfo();
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const loginRequest: LoginRequest = { email, password };
      const response = await loginUser(loginRequest);
      const { accessToken, refreshToken } = response.data;

      // 토큰 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // 사용자 정보 가져오기
      await fetchUserInfo();

      return { accessToken, refreshToken };
    } catch (err: any) {
      console.error("Login error:", err);
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
      const response = await registerUser(userData);
      return response.data;
    } catch (err: any) {
      console.error("Signup error:", err);
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;

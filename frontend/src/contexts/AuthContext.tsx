// frontend/src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react"; // 이곳을 이렇게 수정합니다.
import { loginUser, registerUser } from "../api/auth";

interface AuthContextType {
  user: any | null; // 실제 사용자 타입 정의 필요
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<any>;
  signup: (userData: any) => Promise<any>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true); // 초기 로딩 상태
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserFromLocalStorage = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.error("Failed to parse user from local storage", e);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
      } finally {
        setIsLoading(false);
      }
    };
    loadUserFromLocalStorage();
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
      setError(err.response?.data?.message || "로그인 실패");
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
      setError(err.response?.data?.message || "회원가입 실패");
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

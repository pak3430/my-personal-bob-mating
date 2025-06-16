import React, { useState } from "react";
import { apiClient } from "../../api/index";

const ApiTest: React.FC = () => {
  const [testResult, setTestResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const testBackendConnection = async () => {
    setIsLoading(true);
    setTestResult("");

    try {
      console.log("🔄 백엔드 연결 테스트 시작");

      // fetch 대신 apiClient 사용 (CORS 프록시 활용)
      const response = await apiClient.get("/api/auth/test");

      console.log("🔍 응답 상태:", response.status);
      console.log("🔍 응답 데이터:", response.data);

      setTestResult(`✅ 백엔드 연결 성공: ${response.data}`);
    } catch (error: any) {
      console.error("❌ 연결 에러:", error);
      console.log("🔍 에러 응답:", error.response);

      let errorMessage = `❌ 백엔드 연결 실패`;

      if (error.response) {
        errorMessage += `\n상태 코드: ${error.response.status}`;
        errorMessage += `\n응답 메시지: ${
          error.response.data?.message || error.response.statusText
        }`;
      } else if (error.request) {
        errorMessage += `\n요청 실패: 서버에 도달할 수 없습니다`;
      } else {
        errorMessage += `\n오류: ${error.message}`;
      }

      setTestResult(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const testRegisterApi = async () => {
    setIsLoading(true);
    setTestResult("");

    const testUser = {
      email: "test@example.com",
      password: "testPassword123",
      nickname: "테스트유저",
      phone_num: "010-1234-5678",
      gender: "MALE" as const,
      age: 25,
    };

    try {
      console.log("🔄 회원가입 API 테스트");
      const response = await apiClient.post("/api/auth/register", testUser);
      console.log("🔍 회원가입 응답:", response);
      setTestResult(
        `✅ 회원가입 테스트 성공: ${JSON.stringify(response.data)}`
      );
    } catch (error: any) {
      console.error("❌ 회원가입 에러:", error);
      setTestResult(
        `❌ 회원가입 에러: ${error.response?.data?.message || error.message}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const testLoginApi = async () => {
    setIsLoading(true);
    setTestResult("");

    try {
      console.log("🔄 로그인 API 테스트");
      const response = await apiClient.post("/api/auth/login", {
        email: "test@example.com",
        password: "testPassword123",
      });

      console.log("🔍 로그인 응답 전체:", response);
      console.log("🔍 로그인 응답 데이터:", response.data);

      setTestResult(
        `✅ 로그인 테스트 성공: ${JSON.stringify(response.data, null, 2)}`
      );
    } catch (error: any) {
      console.error("❌ 로그인 에러:", error);
      setTestResult(
        `❌ 로그인 에러: ${error.response?.data?.message || error.message}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const checkLocalStorage = () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const user = localStorage.getItem("user");

    console.log("🔍 LocalStorage 내용:");
    console.log("- Access Token:", accessToken);
    console.log("- Refresh Token:", refreshToken);
    console.log("- User:", user);

    setTestResult(`
LocalStorage 내용:
- Access Token: ${accessToken ? "있음" : "없음"}
- Refresh Token: ${refreshToken ? "있음" : "없음"}
- User: ${user ? "있음" : "없음"}
${user ? `\nUser Data: ${user}` : ""}
    `);
  };

  const testHealthCheck = async () => {
    setIsLoading(true);
    setTestResult("");

    try {
      console.log("🔄 헬스 체크 테스트 시작");
      const response = await apiClient.get("/api/health");

      console.log("🔍 헬스 체크 응답:", response);
      setTestResult(`✅ 헬스 체크 성공: ${response.data}`);
    } catch (error: any) {
      console.error("❌ 헬스 체크 에러:", error);
      let errorMessage = `❌ 헬스 체크 실패`;

      if (error.response) {
        errorMessage += `\n상태 코드: ${error.response.status}`;
        errorMessage += `\n응답 메시지: ${
          error.response.data?.message || error.response.statusText
        }`;
      } else {
        errorMessage += `\n오류: ${error.message}`;
      }

      setTestResult(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">🔧 API 연결 테스트</h2>

      <div className="space-y-4">
        <button
          onClick={testHealthCheck}
          disabled={isLoading}
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50"
        >
          헬스 체크 테스트
        </button>

        <button
          onClick={testBackendConnection}
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          백엔드 연결 테스트
        </button>

        <button
          onClick={testRegisterApi}
          disabled={isLoading}
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50"
        >
          회원가입 API 테스트
        </button>

        <button
          onClick={testLoginApi}
          disabled={isLoading}
          className="w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 disabled:opacity-50"
        >
          로그인 API 테스트
        </button>

        <button
          onClick={checkLocalStorage}
          className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
        >
          LocalStorage 확인
        </button>
      </div>

      {isLoading && (
        <div className="mt-4 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p>테스트 중...</p>
        </div>
      )}

      {testResult && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-semibold mb-2">테스트 결과:</h3>
          <pre className="whitespace-pre-wrap text-sm">{testResult}</pre>
        </div>
      )}
    </div>
  );
};

export default ApiTest;

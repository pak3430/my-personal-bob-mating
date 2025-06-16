# API Layer Documentation

Spring Boot 백엔드와의 통신을 위한 TypeScript API 레이어입니다.

## 📁 파일 구조

```
frontend/src/api/
├── auth.controller.ts       # 인증 관련 API
├── user.controller.ts       # 사용자 관리 API
├── matching.controller.ts   # 매칭 관련 API
├── chat.controller.ts       # 채팅 관련 API
├── types.ts                # TypeScript 타입 정의
├── client.ts               # Axios 클라이언트 설정
├── index.ts                # 통합 export 파일
└── README.md               # 문서 (이 파일)
```

## 🚀 사용법

### 기본 사용법

```typescript
import { AuthController, UserController } from "@/api";
// 또는
import { login, getProfile } from "@/api";

// Controller 클래스 사용
const response = await AuthController.login({
  email: "test@example.com",
  password: "password",
});

// 함수 직접 사용
const profileResponse = await getProfile();
```

### 기존 함수 호환성

기존 코드와의 호환성을 위해 기존 함수명도 지원합니다:

```typescript
import { loginUser, registerUser } from "@/api";

// 기존 방식 (여전히 작동)
const loginResponse = await loginUser("test@example.com", "password");
const signupResponse = await registerUser(userData);
```

### Default Export 사용

```typescript
import api from "@/api";

// 네임스페이스 방식
const loginResponse = await api.auth.login({
  email: "test@example.com",
  password: "password",
});
const profileResponse = await api.user.getProfile();
const matchingResponse = await api.matching.getMyMatchingStatus();
```

## 📋 컨트롤러별 API

### 🔐 AuthController

| 메서드                | 엔드포인트               | 설명               |
| --------------------- | ------------------------ | ------------------ |
| `login(data)`         | `POST /api/auth/login`   | 사용자 로그인      |
| `logout(data)`        | `POST /api/auth/logout`  | 사용자 로그아웃    |
| `refreshToken(token)` | `POST /api/auth/refresh` | 액세스 토큰 재발급 |

### 👤 UserController

| 메서드                    | 엔드포인트                   | 설명                  |
| ------------------------- | ---------------------------- | --------------------- |
| `signup(data)`            | `POST /api/user/signup`      | 사용자 회원가입       |
| `getProfile()`            | `GET /api/user/profile`      | 회원 프로필 조회      |
| `updateProfile(data)`     | `PUT /api/user/profile`      | 회원 프로필 수정      |
| `getUserDetails()`        | `GET /api/user/me/details`   | 사용자 상세 정보 조회 |
| `updateEmail(data)`       | `PUT /api/user/email`        | 사용자 이메일 변경    |
| `updatePhoneNumber(data)` | `PUT /api/user/phone-number` | 사용자 전화번호 변경  |
| `changePassword(data)`    | `PUT /api/user/password`     | 사용자 비밀번호 변경  |
| `withdraw()`              | `DELETE /api/user/withdraw`  | 회원 탈퇴             |

### 💝 MatchingController

| 메서드                  | 엔드포인트                   | 설명              |
| ----------------------- | ---------------------------- | ----------------- |
| `requestMatching(data)` | `POST /api/matchings/wait`   | 매칭 요청 생성    |
| `getMyMatchingStatus()` | `GET /api/matchings/status`  | 내 매칭 상태 조회 |
| `cancelMatching(id)`    | `DELETE /api/matchings/{id}` | 매칭 요청 취소    |

### 💬 ChatController

| 메서드                            | 엔드포인트                            | 설명                           |
| --------------------------------- | ------------------------------------- | ------------------------------ |
| `getChatMessages(roomId)`         | `GET /api/chat/{roomId}/messages`     | 특정 채팅방의 메시지 목록 조회 |
| `sendMessage(roomId, data)`       | `POST /api/chat/{roomId}/messages`    | 채팅 메시지 전송               |
| `getChatRooms()`                  | `GET /api/chat/rooms`                 | 사용자의 채팅방 목록 조회      |
| `getChatRoom(roomId)`             | `GET /api/chat/rooms/{roomId}`        | 특정 채팅방 정보 조회          |
| `getChatRoomParticipants(roomId)` | `GET /api/chat/{roomId}/participants` | 채팅방 참가자 목록 조회        |

## 🔧 클라이언트 설정

### 환경 변수

```env
VITE_API_BASE_URL=http://localhost:8080
```

### 자동 토큰 관리

- 모든 요청에 자동으로 JWT 토큰 추가
- 401 에러 시 자동 토큰 갱신
- 토큰 만료 시 자동 로그아웃 및 리다이렉트

### 에러 처리

```typescript
try {
  const response = await AuthController.login(loginData);
  console.log("Login successful:", response.data);
} catch (error) {
  console.error("Login failed:", error);
}
```

## 📝 타입 정의

모든 API 요청/응답에 대한 TypeScript 타입이 `types.ts`에 정의되어 있습니다:

```typescript
import type { LoginRequest, AuthResponseDto, ApiResponse } from "@/api";

const loginData: LoginRequest = {
  email: "test@example.com",
  password: "password123",
};

const response: ApiResponse<AuthResponseDto> = await AuthController.login(
  loginData
);
```

## 🏗️ 마이그레이션 가이드

### 기존 코드에서 새 구조로 마이그레이션

1. **Import 구문 변경**:

```typescript
// 기존
import { loginUser } from "@/api/auth";
import { getProfile } from "@/api/users";

// 새로운 방식
import { AuthController, UserController } from "@/api";
// 또는 (기존 함수명 유지)
import { loginUser, getProfile } from "@/api";
```

2. **함수 호출 변경**:

```typescript
// 기존
const response = await loginUser(email, password);

// 새로운 방식 (권장)
const response = await AuthController.login({ email, password });

// 또는 (기존 호환성 유지)
const response = await loginUser(email, password); // 여전히 작동
```

## 🧪 헬스 체크

API 서버 상태 확인:

```typescript
import { checkApiHealth } from "@/api";

const isHealthy = await checkApiHealth();
console.log("API server healthy:", isHealthy);
```

---

이 API 레이어는 OpenAPI 3.0 사양을 기반으로 구축되었으며, Spring Boot 백엔드와 완전히 호환됩니다.

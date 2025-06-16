# My Personal Bob Mating - 프론트엔드 & 백엔드 연동 프로젝트

본 프로젝트는 Spring Boot 백엔드와 React TypeScript 프론트엔드로 구성된 웹 애플리케이션입니다.

## 🏗️ 프로젝트 구조

```
my-personal-bob-mating/
├── backend/           # Spring Boot 백엔드
│   ├── src/
│   ├── pom.xml
│   └── ...
├── frontend/          # React TypeScript 프론트엔드
│   ├── src/
│   ├── package.json
│   └── ...
└── README.md
```

## 🚀 실행 방법

### 사전 요구사항

- Java 17+
- Node.js 18+
- PostgreSQL (선택사항, H2 DB로도 가능)
- Redis (선택사항)

### 백엔드 실행

```bash
cd backend
./mvnw spring-boot:run
```

백엔드 서버는 `http://localhost:8080`에서 실행됩니다.

### 프론트엔드 실행

```bash
cd frontend
npm install
npm run dev
```

프론트엔드 개발 서버는 `http://localhost:5173`에서 실행됩니다.

## 📡 API 연동 현황

### ✅ 완료된 기능

- **인증 시스템**

  - 회원가입 (`POST /api/auth/register`)
  - 로그인 (`POST /api/auth/login`)
  - 로그아웃 (`POST /api/auth/logout`)
  - 토큰 재발급 (`POST /api/auth/refresh`)

- **CORS 설정**

  - 개발 환경 포트 허용 (3000, 5173, 5174)
  - 프로덕션 환경 대응

- **프론트엔드 기능**
  - JWT 토큰 자동 관리
  - 토큰 만료 시 자동 갱신
  - Private Route 보호
  - Toast 알림 시스템
  - TypeScript 타입 정의

### 🚧 개발 예정

- 사용자 프로필 관리
- 매칭 시스템
- 실시간 채팅 (WebSocket)
- 파일 업로드

## 🔧 주요 설정

### 환경 변수 (프론트엔드)

```env
VITE_API_BASE_URL=http://localhost:8080
NODE_ENV=development
```

### 백엔드 설정

- **포트**: 8080
- **데이터베이스**: PostgreSQL (또는 H2)
- **JWT**: Access Token + Refresh Token
- **Redis**: 토큰 관리 (선택사항)

## 📚 API 문서

백엔드 실행 후 Swagger UI에서 API 문서를 확인할 수 있습니다:
`http://localhost:8080/swagger-ui.html`

## 🧪 테스트

### 연동 테스트 순서

1. 백엔드 서버 실행
2. 프론트엔드 개발 서버 실행
3. 브라우저에서 `http://localhost:5173` 접속
4. 회원가입 테스트
5. 로그인 테스트
6. 보호된 페이지 접근 테스트

## 🛠️ 개발 도구

- **백엔드**: Spring Boot 3.4.5, Java 17, Maven
- **프론트엔드**: React 18, TypeScript, Vite, Tailwind CSS
- **인증**: JWT (Access Token + Refresh Token)
- **상태관리**: React Context API
- **HTTP 클라이언트**: Axios

## 📝 개발 참고사항

- 프론트엔드는 프록시 설정으로 `/api` 요청을 백엔드로 전달
- JWT 토큰은 localStorage에 저장
- 토큰 만료 시 자동 재발급 처리
- 모든 API 요청에 인터셉터로 토큰 자동 첨부

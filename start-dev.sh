#!/bin/bash

# 개발 환경 실행 스크립트

echo "🚀 개발 환경을 시작합니다..."

# 백엔드 실행 (백그라운드)
echo "📦 백엔드 서버를 시작합니다..."
cd backend
./mvnw spring-boot:run &
BACKEND_PID=$!

# 잠시 대기 (백엔드 서버가 시작될 시간)
sleep 10

# 프론트엔드 실행
echo "🎨 프론트엔드 개발 서버를 시작합니다..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo "✅ 개발 환경이 시작되었습니다!"
echo "📍 백엔드: http://localhost:8080"
echo "📍 프론트엔드: http://localhost:5173"
echo "📍 API 문서: http://localhost:8080/swagger-ui.html"
echo ""
echo "종료하려면 Ctrl+C를 누르세요."

# 종료 시그널 처리
trap 'echo "🛑 개발 환경을 종료합니다..."; kill $BACKEND_PID $FRONTEND_PID; exit' INT

# 프로세스가 종료될 때까지 대기
wait 
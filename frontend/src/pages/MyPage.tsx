// frontend/src/pages/MyPage.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MatchingResultCard from "../components/matching/MatchingResultCard";
import { useAuth } from "../hooks/useAuth";
import { useMatching } from "../hooks/useMatching";

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth(); // 인증 훅에서 사용자 정보 가져오기
  const { matchingResults, fetchMatchingStatus } = useMatching();

  useEffect(() => {
    console.log("🔍 MyPage - 현재 인증 상태:", {
      user,
      isAuthenticated,
      isLoading,
    });

    if (!isLoading) {
      if (!user || !isAuthenticated) {
        console.log("🚫 인증되지 않은 사용자, 로그인 페이지로 리다이렉트");
        navigate("/login");
      } else {
        console.log("✅ 인증된 사용자:", user);
        // 사용자 ID를 기반으로 매칭 결과 불러오기
        fetchMatchingStatus(); // 여기서 user.id를 넘길 필요 없음
      }
    }
  }, [user, isAuthenticated, isLoading, navigate, fetchMatchingStatus]);

  const handleViewChat = (matchId: string) => {
    navigate(`/chat/${matchId}`);
  };

  const handleViewSchedule = (matchId: string) => {
    // 스케줄 페이지로 이동 시 매칭 ID를 파라미터로 전달
    navigate(`/matching-schedule?matchId=${matchId}`);
  };

  // 로딩 중일 때
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  // 사용자 정보가 없을 때
  if (!user || !isAuthenticated) {
    return <div className="p-4 md:p-8">로그인 정보가 없습니다.</div>;
  }

  // 실제 사용자 데이터 사용
  const currentUser = {
    name: user.nickname, // 백엔드 응답에서 nickname을 name으로 사용
    email: user.email,
    nickname: user.nickname,
    gender:
      user.gender === "MALE"
        ? "남성"
        : user.gender === "FEMALE"
        ? "여성"
        : "미정",
    age: user.age,
    phoneNumber: user.phoneNumber,
    introduction: "자기소개를 입력해주세요.", // 추후 백엔드에 introduction 필드 추가 시 사용
    profileImage: user.profileImageUrl || "/avatar-image.png", // 프로필 이미지 경로
  };

  return (
    <div className="p-4 md:p-8 bg-color-schemes-color-scheme-1-background min-h-screen">
      {/* 디버깅 정보 (개발용) */}
      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-bold text-blue-800">🔍 디버깅 정보 (개발용)</h3>
        <pre className="text-sm text-blue-600 mt-2">
          {JSON.stringify({ user, isAuthenticated, isLoading }, null, 2)}
        </pre>
      </div>

      <h1 className="text-4xl font-heading-desktop-h2 mb-8">My Page</h1>

      {/* 사용자 정보 섹션 */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-heading-desktop-h5 mb-4">
          My Information
        </h2>
        <div className="flex items-center space-x-6 mb-6">
          <img
            src={currentUser.profileImage}
            alt="User Avatar"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
          />
          <div>
            <p className="text-xl font-semibold font-m3-title-medium">
              {currentUser.name}
            </p>
            <p className="text-gray-600 font-text-regular-normal">
              {currentUser.email}
            </p>
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-text-small-semi-bold">
              Edit Profile
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 font-text-regular-normal">
          <p>
            <strong>Nickname:</strong> {currentUser.nickname}
          </p>
          <p>
            <strong>Gender:</strong> {currentUser.gender}
          </p>
          <p>
            <strong>Age:</strong> {currentUser.age}
          </p>
          <p>
            <strong>Phone:</strong> {currentUser.phoneNumber}
          </p>
          <p className="md:col-span-2">
            <strong>Introduction:</strong> {currentUser.introduction}
          </p>
        </div>
      </section>

      {/* Approval 섹션 (Figma 디자인 기반) */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-heading-desktop-h5 mb-4">Approval</h2>
        <div className="bg-green-200 border border-green-500 text-green-800 p-4 rounded-md">
          <p>이곳은 매칭 승인 관련 상태나 알림이 표시될 공간입니다.</p>
          <p>매칭 대기 중인 요청이나 승인/거절 옵션을 제공할 수 있습니다.</p>
        </div>
      </section>

      {/* BAB History 섹션 */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-heading-desktop-h5 mb-4">BAB History</h2>
        {matchingResults.length > 0 ? (
          <div className="space-y-4">
            {matchingResults.map((match) => (
              <MatchingResultCard
                key={match.id}
                match={match} // 실제 match 객체의 필드에 따라 조정 필요
                onViewChat={handleViewChat}
                onViewSchedule={handleViewSchedule}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">아직 매칭 기록이 없습니다.</p>
        )}
      </section>
    </div>
  );
};

export default MyPage;

// frontend/src/pages/MyPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MatchingResultCard from "../components/matching/MatchingResultCard";
import { useAuth } from "../hooks/useAuth";
import { useMatching } from "../hooks/useMatching";
import type {
  UserInfoDetailsResponse,
  EmailUpdateRequest,
  PhoneNumberUpdateRequest,
  ChangePasswordRequest,
  ProfileUpdateRequest,
} from "../api/types";
import { UserController } from "../api";

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { matchingResults, fetchMatchingStatus } = useMatching();

  // 사용자 상세 정보 상태
  const [userDetails, setUserDetails] =
    useState<UserInfoDetailsResponse | null>(null);

  // 모달 상태들
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  // 각 모달의 폼 데이터
  const [editData, setEditData] = useState<ProfileUpdateRequest>({
    nickname: "",
    profileImageUrl: "",
  });

  // 닉네임 중복 확인 상태
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<
    boolean | null
  >(null);
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);

  // 파일 업로드를 위한 ref
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [emailData, setEmailData] = useState<EmailUpdateRequest>({
    newEmail: "",
    currentPassword: "",
  });

  const [phoneData, setPhoneData] = useState<PhoneNumberUpdateRequest>({
    newPhoneNumber: "",
    currentPassword: "",
  });

  const [passwordData, setPasswordData] = useState<ChangePasswordRequest>({
    oldPassword: "",
    newPassword: "",
  });

  // 사용자 상세 정보 조회
  const fetchUserDetails = async () => {
    try {
      const response = await UserController.getUserDetails();
      if (response.data) {
        setUserDetails(response.data);
        // 상세 정보로 editData 초기화
        setEditData({
          nickname: response.data.nickname,
          profileImageUrl: response.data.profileImageUrl || "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      fetchUserDetails();
      fetchMatchingStatus();
    } else if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isLoading, isAuthenticated, navigate, fetchMatchingStatus]);

  // 닉네임 중복 확인 핸들러 (백엔드 API 구현 필요)
  const handleCheckNickname = async () => {
    const nickname = editData.nickname || "";
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    setIsCheckingNickname(true);
    try {
      // TODO: 백엔드 API 구현 후 연동
      // const response = await UserController.checkNickname(editData.nickname);
      // setIsNicknameAvailable(response.data.available);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 임시 딜레이
      setIsNicknameAvailable(true);
      alert("사용 가능한 닉네임입니다.");
    } catch (error) {
      console.error("Failed to check nickname:", error);
      setIsNicknameAvailable(false);
      alert("닉네임 중복 확인에 실패했습니다.");
    } finally {
      setIsCheckingNickname(false);
    }
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData((prev) => ({
          ...prev,
          profileImageUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // 프로필 수정 핸들러
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const nickname = editData.nickname || "";
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    if (isNicknameAvailable !== true) {
      alert("닉네임 중복 확인을 해주세요.");
      return;
    }
    try {
      await UserController.updateProfile(editData);
      await fetchUserDetails();
      setIsEditOpen(false);
      alert("프로필이 성공적으로 수정되었습니다.");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("프로필 수정에 실패했습니다.");
    }
  };

  // 이메일 변경 핸들러
  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await UserController.updateEmail(emailData);
      await fetchUserDetails();
      setIsEmailModalOpen(false);
      alert("이메일이 성공적으로 변경되었습니다.");
    } catch (error) {
      console.error("Failed to update email:", error);
      alert("이메일 변경에 실패했습니다.");
    }
  };

  // 전화번호 변경 핸들러
  const handlePhoneUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await UserController.updatePhoneNumber(phoneData);
      await fetchUserDetails();
      setIsPhoneModalOpen(false);
      alert("전화번호가 성공적으로 변경되었습니다.");
    } catch (error) {
      console.error("Failed to update phone number:", error);
      alert("전화번호 변경에 실패했습니다.");
    }
  };

  // 비밀번호 변경 핸들러
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await UserController.changePassword(passwordData);
      setIsPasswordModalOpen(false);
      alert("비밀번호가 성공적으로 변경되었습니다.");
    } catch (error) {
      console.error("Failed to change password:", error);
      alert("비밀번호 변경에 실패했습니다.");
    }
  };

  // 회원 탈퇴 핸들러
  const handleWithdraw = async () => {
    if (
      window.confirm("정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.")
    ) {
      try {
        await UserController.withdraw();
        navigate("/login");
      } catch (error) {
        console.error("Failed to withdraw:", error);
        alert("회원 탈퇴에 실패했습니다.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  if (!userDetails || !isAuthenticated) {
    return <div className="p-4 md:p-8">로그인 정보가 없습니다.</div>;
  }

  return (
    <div className="p-4 md:p-8 bg-color-schemes-color-scheme-1-background min-h-screen">
      {/* 사용자 정보 섹션 */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-heading-desktop-h5 mb-4">내 정보</h2>
        <div className="flex items-center space-x-6 mb-6">
          <img
            src={userDetails.profileImageUrl || "/avatar-image.png"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
          />
          <div>
            <p className="text-xl font-semibold font-m3-title-medium">
              {userDetails.nickname}
            </p>
            <p className="text-gray-600 font-text-regular-normal">
              {userDetails.email}
            </p>
            <div className="flex gap-2 mt-2">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-text-small-semi-bold"
                onClick={() => setIsEditOpen(true)}
              >
                프로필 수정
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-text-small-semi-bold"
                onClick={() => setIsWithdrawModalOpen(true)}
              >
                회원 탈퇴
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 font-text-regular-normal">
          <div className="flex justify-between items-center">
            <p>
              <strong>이메일:</strong> {userDetails.email}
            </p>
            <button
              className="text-blue-600 hover:text-blue-800"
              onClick={() => setIsEmailModalOpen(true)}
            >
              변경
            </button>
          </div>
          <div className="flex justify-between items-center">
            <p>
              <strong>전화번호:</strong> {userDetails.phoneNumber}
            </p>
            <button
              className="text-blue-600 hover:text-blue-800"
              onClick={() => setIsPhoneModalOpen(true)}
            >
              변경
            </button>
          </div>
          <div className="flex justify-between items-center">
            <p>
              <strong>성별:</strong>{" "}
              {userDetails.gender === "MALE"
                ? "남성"
                : userDetails.gender === "FEMALE"
                ? "여성"
                : "미정"}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p>
              <strong>나이:</strong> {userDetails.age}세
            </p>
          </div>
          <div className="flex justify-between items-center md:col-span-2">
            <p>
              <strong>비밀번호</strong>
            </p>
            <button
              className="text-blue-600 hover:text-blue-800"
              onClick={() => setIsPasswordModalOpen(true)}
            >
              변경
            </button>
          </div>
        </div>
      </section>

      {/* BAB History 섹션 */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-heading-desktop-h5 mb-4">매칭 히스토리</h2>
        {matchingResults.length > 0 ? (
          <div className="space-y-4">
            {matchingResults.map((match) => (
              <MatchingResultCard
                key={match.id}
                match={match}
                onViewChat={() => navigate(`/chat/${match.id}`)}
                onViewSchedule={() =>
                  navigate(`/matching-schedule?matchId=${match.id}`)
                }
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">아직 매칭 기록이 없습니다.</p>
        )}
      </section>

      {/* 프로필 수정 모달 */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">프로필 수정</h2>
            <form
              onSubmit={handleProfileUpdate}
              className="flex flex-col gap-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  닉네임
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editData.nickname}
                    onChange={(e) => {
                      setEditData({ ...editData, nickname: e.target.value });
                      setIsNicknameAvailable(null);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleCheckNickname}
                    disabled={isCheckingNickname}
                    className={`mt-1 px-2 py-2 text-white text-xs w-20 text-center rounded-md ${
                      isCheckingNickname
                        ? "bg-gray-400"
                        : isNicknameAvailable === true
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {isCheckingNickname ? "확인 중..." : "중복 확인"}
                  </button>
                </div>
                {isNicknameAvailable === true && (
                  <p className="mt-1 text-sm text-green-600">
                    사용 가능한 닉네임입니다.
                  </p>
                )}
                {isNicknameAvailable === false && (
                  <p className="mt-1 text-sm text-red-600">
                    이미 사용 중인 닉네임입니다.
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  프로필 이미지
                </label>
                <div className="mt-2 flex items-center gap-4">
                  <img
                    src={editData.profileImageUrl || "/avatar-image.png"}
                    alt="Profile Preview"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="flex flex-col gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                      이미지 선택
                    </button>
                    {editData.profileImageUrl && (
                      <button
                        type="button"
                        onClick={() =>
                          setEditData((prev) => ({
                            ...prev,
                            profileImageUrl: "",
                          }))
                        }
                        className="px-4 py-2 text-sm text-red-600 bg-white border border-red-600 rounded-md hover:bg-red-50"
                      >
                        이미지 삭제
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={!isNicknameAvailable}
                  className={`px-4 py-2 text-white rounded-md ${
                    !isNicknameAvailable
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  수정 완료
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 이메일 변경 모달 */}
      {isEmailModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">이메일 변경</h2>
            <form onSubmit={handleEmailUpdate} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  새 이메일
                </label>
                <input
                  type="email"
                  value={emailData.newEmail}
                  onChange={(e) =>
                    setEmailData({ ...emailData, newEmail: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  현재 비밀번호
                </label>
                <input
                  type="password"
                  value={emailData.currentPassword}
                  onChange={(e) =>
                    setEmailData({
                      ...emailData,
                      currentPassword: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsEmailModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  변경
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 전화번호 변경 모달 */}
      {isPhoneModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">전화번호 변경</h2>
            <form onSubmit={handlePhoneUpdate} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  새 전화번호
                </label>
                <input
                  type="tel"
                  value={phoneData.newPhoneNumber}
                  onChange={(e) =>
                    setPhoneData({
                      ...phoneData,
                      newPhoneNumber: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  현재 비밀번호
                </label>
                <input
                  type="password"
                  value={phoneData.currentPassword}
                  onChange={(e) =>
                    setPhoneData({
                      ...phoneData,
                      currentPassword: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsPhoneModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  변경
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 비밀번호 변경 모달 */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">비밀번호 변경</h2>
            <form
              onSubmit={handlePasswordChange}
              className="flex flex-col gap-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  현재 비밀번호
                </label>
                <input
                  type="password"
                  value={passwordData.oldPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      oldPassword: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  새 비밀번호
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  변경
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 회원 탈퇴 모달 */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">회원 탈퇴</h2>
            <p className="text-gray-600 mb-6">
              정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없으며, 모든 데이터가
              삭제됩니다.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsWithdrawModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                취소
              </button>
              <button
                onClick={handleWithdraw}
                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                탈퇴하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;

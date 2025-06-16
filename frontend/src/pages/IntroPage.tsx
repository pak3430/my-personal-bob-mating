// frontend/src/pages/IntroPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import ApiTest from "../components/debug/ApiTest";

const IntroPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      {/* API 테스트 섹션 (개발용)
      <section className="w-full py-10 px-4 md:px-20 bg-yellow-50">
        <div className="max-w-2xl mx-auto">
          <ApiTest />
        </div>
      </section> */}

      {/* 첫 번째 섹션: 메인 비주얼 */}
      <section className="relative w-full h-[550px] flex items-center justify-center bg-gray-100">
        <img
          src="/yellow-tray.png"
          alt="Main Visual"
          className="object-cover w-full h-full"
        />
        <div className="absolute text-center text-white p-4 bg-black bg-opacity-50 rounded-lg">
          <h1 className="text-4xl font-bold font-heading-desktop-h2 mb-4">
            'YUMM'으로 <br /> '자밥추 시작하자!'
          </h1>
          <p className="text-xl font-text-regular-normal">바로 시작하기!</p>
          <Link to="/login">
            <button className="mt-8 px-6 py-3 bg-red-600 text-white rounded-md hover:bg-yellow-500 font-m3-title-medium">
              YUMM 시작하기
            </button>
          </Link>
        </div>
      </section>

      {/* 두 번째 섹션: 서비스 소개 */}
      <section className="w-full py-20 px-4 md:px-20 bg-white text-center">
        <h2 className="text-3xl font-bold font-heading-desktop-h2 mb-12">
          YUMM은 이런 서비스에요
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-12">
          <div className="flex flex-col items-center">
            <img
              src="/intro-illustration-1.png"
              alt="Illustration 1"
              className="w-[600px] h-auto mb-4"
            />
            <h3 className="text-xl font-semibold font-heading-desktop-h5 mb-2">
              랜덤 매칭
            </h3>
            <p className="text-gray-600 font-text-regular-normal">
              다양한 사람들과 밥친구 만들고 식사하자!
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="/intro-illustration-3.png"
              alt="Illustration 2"
              className="w-[300px] h-auto mb-4"
            />
            <h3 className="text-xl font-semibold font-heading-desktop-h5 mb-2">
              선호도 기반 매칭
            </h3>
            <p className="text-gray-600 font-text-regular-normal">
              취향에 맞는 밥친구 찾기
            </p>
          </div>
        </div>
      </section>

      {/* 세 번째 섹션: 밥메이팅 이용 방법 */}
      <section className="w-full py-20 px-4 md:px-20 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold font-heading-desktop-h2 mb-12">
          You Us Me Meal...YUMM!
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-12">
          <img
            src="/intro-illustration-2.png"
            alt="Figma Hand"
            className="w-[400px] h-auto"
          />{" "}
          {/* 실제 이미지로 교체 */}
          <div className="text-left max-w-lg">
            <h3 className="text-2xl font-semibold font-heading-desktop-h5 mb-4">
              즐거운 식사 경험을 만들어 보세요
            </h3>
            <p className="text-gray-700 font-text-regular-normal leading-relaxed">
              매칭 시스템을 통해 새로운 사람들과 식사를 하고, 다양한 취향을 가진
              사람들과의 교류를 경험하며 새로운 친구를 만들 수 있습니다.
            </p>
            <Link to="/about">
              {" "}
              {/* 적절한 About 페이지 링크 */}
              <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-m3-title-medium">
                더 알아보기
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IntroPage;

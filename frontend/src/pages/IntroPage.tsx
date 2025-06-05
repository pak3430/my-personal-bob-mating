import React from "react";
import "../App.css"; // App.css를 가져와서 사용하거나, 별도의 CSS 파일을 생성할 수 있습니다.

const IntroPage: React.FC = () => {
  return (
    <div className="intro-container">
      {/* 헤더 섹션 - 로고, 내비게이션 */}
      <header className="header">
        <div className="logo">Logo</div>
        <nav className="nav">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/signup">Sign Up</a>
            </li>
            {/* 추가 메뉴 아이템들 */}
          </ul>
        </nav>
        {/* 모바일 햄버거 메뉴 버튼 */}
        <button className="hamburger-menu">☰</button>
      </header>

      {/* Intro 섹션 - "밥메이킹으로 맘껏 만들자!" */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            밥메이킹으로 <br /> '밥친구' 만들자!
          </h1>
          <p>어쩌고 저쩌고 우리의 서비스에 대한 설명이 들어갑니다.</p>
          <button className="button-primary">Button D...</button>
        </div>
        <div className="hero-image">
          {/* 이미지 또는 아이콘 */}
          <img src="/Preview.png" alt="서비스 소개 이미지" />{" "}
          {/* public 폴더의 Preview.png 사용 예시 */}
        </div>
      </section>

      {/* 서비스 소개 섹션 */}
      <section className="service-features">
        <h2>어떤 기능이 있을까요?</h2>
        <div className="feature-grid">
          <div className="feature-item">
            <h3>편리한 계정 관리</h3>
            <p>설명...</p>
          </div>
          <div className="feature-item">
            <h3>다양한 식사 모임</h3>
            <p>설명...</p>
          </div>
          <div className="feature-item">
            <h3>실시간 채팅 기능</h3>
            <p>설명...</p>
          </div>
        </div>
      </section>

      {/* 또 다른 소개 섹션 - "밥메이킹과 함께라면..." */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>밥메이킹과 함께라면...</h2>
          <p>더 상세한 서비스 설명이 들어갑니다.</p>
        </div>
        <div className="cta-image">{/* 이미지 또는 아이콘 */}</div>
      </section>

      {/* 푸터 섹션 */}
      <footer className="footer">
        <div className="footer-logo">Logo</div>
        <div className="footer-links">
          <ul>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div className="footer-address">
          <p>Zogo</p>
          <p>서울특별시 강남구 테헤란로 123-456</p>
          <p>대표: 김밥</p>
          <p>전화: 02-1234-5678</p>
        </div>
        <div className="footer-copy">
          <p>&copy; 2024 Zogo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default IntroPage;

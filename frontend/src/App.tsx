import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MyPage from "./pages/MyPage";
import "./App.css"; // 전역 스타일 시트

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/mypage" element={<MyPage />} />
          {/* 햄버거 메뉴는 특정 경로에 종속되지 않으므로 필요하다면 레이아웃 컴포넌트에서 관리 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

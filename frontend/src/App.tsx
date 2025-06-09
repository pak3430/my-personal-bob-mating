// frontend/src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MyPage from "./pages/MyPage";
import ChatRoomPage from "./pages/ChatRoomPage";
import MatchingLoadingPage from "./pages/MatchingLoadingPage";
import MatchingSchedulePage from "./pages/MatchingSchedulePage";
import SettingsPage from "./pages/SettingsPage";
import Layout from "./components/layout/Layout";
import "./App.css"; // App.css (필요시)

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Layout 컴포넌트로 감싸는 페이지들 */}
          <Route
            path="/"
            element={
              <Layout>
                <IntroPage />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <LoginPage />
              </Layout>
            }
          />
          <Route
            path="/signup"
            element={
              <Layout>
                <SignUpPage />
              </Layout>
            }
          />
          <Route
            path="/mypage"
            element={
              <Layout>
                <MyPage />
              </Layout>
            }
          />
          <Route
            path="/chat/:roomId"
            element={
              <Layout>
                <ChatRoomPage />
              </Layout>
            }
          />
          <Route
            path="/matching-loading"
            element={
              <Layout>
                <MatchingLoadingPage />
              </Layout>
            }
          />
          <Route
            path="/matching-schedule"
            element={
              <Layout>
                <MatchingSchedulePage />
              </Layout>
            }
          />
          <Route
            path="/settings"
            element={
              <Layout>
                <SettingsPage />
              </Layout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

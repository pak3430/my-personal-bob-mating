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
import PrivateRoute from "./components/auth/PrivateRoute";
import "./App.css"; // App.css (필요시)

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* 공개 페이지들 */}
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

          {/* 보호된 페이지들 - 인증 필요 */}
          <Route
            path="/mypage"
            element={
              <PrivateRoute>
                <Layout>
                  <MyPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/chat/:roomId"
            element={
              <PrivateRoute>
                <Layout>
                  <ChatRoomPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/matching-loading"
            element={
              <PrivateRoute>
                <Layout>
                  <MatchingLoadingPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/matching-schedule"
            element={
              <PrivateRoute>
                <Layout>
                  <MatchingSchedulePage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Layout>
                  <SettingsPage />
                </Layout>
              </PrivateRoute>
            }
          />
          {/* TODO: 추가될 페이지 라우트 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

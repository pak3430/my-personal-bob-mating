// frontend/src/main.tsx (업데이트)
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext.tsx"; // AuthProvider 임포트

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      {" "}
      {/* AuthProvider로 App 컴포넌트 감싸기 */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);

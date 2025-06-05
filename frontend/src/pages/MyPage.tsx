import React from "react";
import "../App.css";

const MyPage: React.FC = () => {
  return (
    <div className="mypage-container">
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
            {/* My Page 관련 메뉴 */}
          </ul>
        </nav>
        <button className="hamburger-menu">☰</button>
      </header>

      <main className="mypage-content">
        <h2>Approval</h2>
        <form className="approval-form">
          <div className="form-group">
            <label htmlFor="admin-email">Email</label>
            <input
              type="email"
              id="admin-email"
              name="email"
              placeholder="admin@example.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Name</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="사용자 이름"
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select id="role" name="role">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {/* 추가 폼 필드 */}
          <button type="submit" className="submit-button">
            Submit
          </button>
          <button type="button" className="cancel-button">
            Cancel
          </button>
        </form>
      </main>

      {/* 푸터는 IntroPage와 동일하게 재사용할 수 있습니다. */}
    </div>
  );
};

export default MyPage;

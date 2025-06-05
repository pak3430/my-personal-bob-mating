import React from "react";
import "../App.css";

const LoginPage: React.FC = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Log In</h2>
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="email">EMAIL</label>
            <input type="email" id="email" name="email" placeholder="email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
            />
          </div>
          <button type="submit" className="login-button">
            login
          </button>
          <div className="login-links">
            <a href="#">Forgot Password?</a>
            <a href="/signup">Sign Up</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

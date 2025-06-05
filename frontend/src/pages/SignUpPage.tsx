import React from "react";
import "../App.css";

const SignUpPage: React.FC = () => {
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form className="signup-form">
          <div className="form-group">
            <label htmlFor="signup-email">EMAIL</label>
            <input
              type="email"
              id="signup-email"
              name="email"
              placeholder="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="signup-password">PASSWORD</label>
            <input
              type="password"
              id="signup-password"
              name="password"
              placeholder="password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">CONFIRM PASSWORD</label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              placeholder="confirm password"
            />
          </div>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;

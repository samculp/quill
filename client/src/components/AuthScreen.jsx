import React, { useEffect, useState } from 'react'
import './styles/AuthScreen.css'

export default function AuthScreen(props) {
  const { username, setUsername, password, setPassword, authenticate, isAuthenticating, errorMessage, setErrorMessage } = props

  const [isLogin, setIsLogin] = useState(true);
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const toggleAuthMode = () => {
    setIsLogin((prevMode) => !prevMode);
  };

  async function authCommand() {
    const extension = isLogin ? 'login' : 'register'
    if (!isLogin && password !== passwordConfirm) {
      setErrorMessage("Passwords do not match")
      return
    } else if (!username.includes('@')) {
      setErrorMessage("Invalid email")
      return
    } else if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters")
      return
    } else {
      await authenticate(extension)
    }
  }

  useEffect(() => {
    setErrorMessage("")
  }, [isLogin])

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "Log In" : "Register"}</h2>
        <p className="error-msg">{errorMessage ? '❌ ' + errorMessage : ""}</p>
        <div className="form">
          <input
            type="email"
            placeholder="Email"
            className="auth-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="auth-input"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          )}
          <button type="submit" className="auth-button" onClick={authCommand}>
          {isAuthenticating ? "Authenticating..." : (isLogin ? "Log In" : "Register")}
          </button>
        </div>
        <p className="auth-toggle">
          {isLogin
            ? "Don't have an account? "
            : "Already have an account? "}
          <span onClick={toggleAuthMode}>
            {isLogin ? "Register here" : "Log in here"}
          </span>
        </p>
      </div>
    </div>
  )
}

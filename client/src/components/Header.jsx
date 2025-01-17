import React from 'react'
import './styles/Header.css'

export default function Header(props) {
  const { isShowingDashboard, user, logout, showModal, setShowModal } = props

  return (
    <header className="header">
    <div className="header-title"><a href="https://github.com/samculp" target='_blank'>Quill</a></div>
    {isShowingDashboard && 
    <div className="header-menu">
      <div className="header-user">
        <span className="user-icon">Welcome, {user.nickname}!</span>
        <div className="dropdown">
          <ul>
            <li onClick={() => setShowModal(!showModal)}>Account Info</li>
            <li onClick={logout}>Logout</li>
          </ul>
        </div>
      </div>
    </div>}
  </header>
  )
}

import React, { useContext, useState } from 'react'
import './styles/Header.css'
import { AuthContext } from '../context/AuthContext'
import AccountModal from './AccountModal.jsx'

export default function Header(props) {
  const { isAuthenticated, globalUser, logout } = useContext(AuthContext)
  const [isShowingModal, setIsShowingModal] = useState(false)

  return (
    <>
      {isShowingModal && <AccountModal {...{ isShowingModal, setIsShowingModal }} />}
      <header className="header">
        <div className="header-title"><a href="https://github.com/samculp" target='_blank'>Quill</a></div>
        {isAuthenticated && 
        <div className="header-menu">
          <div className="header-user">
            <span className="user-icon">Welcome, {globalUser?.nickname}!</span>
            <div className="dropdown">
              <ul>
                <li onClick={() => setIsShowingModal(!isShowingModal)}>Account Info</li>
                <li onClick={logout}>Logout</li>
              </ul>
            </div>
          </div>
        </div>}
      </header>
    </>
  )
}

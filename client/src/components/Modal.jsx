import React, { useState } from 'react'
import './styles/Modal.css'

export default function Modal(props) {
  const { showModal, setShowModal, user, changeNickname, logout } = props

  const [newNickname, setNewNickname] = useState("")

  function handleChangeNickname() {
    if (newNickname.trim()) {
      changeNickname(newNickname.trim())
      setShowModal(false)
    } 
  }

  return (
    <div className="modal-container">
      <button className="modal-underlay" onClick={() => setShowModal(!showModal)} />
      <div className="modal-card">
        <h2>Account Information</h2>
        <hr />
        <div className="account-information">
          <p><span className="user-attribute">Username/Email:</span> {user.username}</p>
          <p><span className="user-attribute">Nickname:</span> {user.nickname}</p>
          <p><span className="user-attribute"># of Notes:</span> {user.notes.length}</p>
          <input type="text" placeholder="New nickname" 
            value={newNickname} onChange={(e) => setNewNickname(e.target.value)}/>
        </div>
        <div className="modal-buttons">
          <button onClick={handleChangeNickname}>Change Nickname</button>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  )
}

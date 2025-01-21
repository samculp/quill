import React, { useContext, useState } from 'react'
import './styles/Modal.css'
import { AuthContext } from '../context/AuthContext'

export default function Modal(props) {
  const { isShowingModal, setIsShowingModal } = props
  const { globalUser, logout, changeNickname } = useContext(AuthContext)

  const [newNickname, setNewNickname] = useState("")

  function handleChangeNickname() {
    if (newNickname.trim()) {
      changeNickname(newNickname.trim())
      setIsShowingModal(false)
    } 
  }

  return (
    <div className="modal-container">
      <button className="modal-underlay" onClick={() => setIsShowingModal(!isShowingModal)} />
      <div className="modal-card">
        <h2>Account Information</h2>
        <hr />
        <div className="account-information">
          <p><span className="user-attribute">Username/Email:</span> {globalUser?.username}</p>
          <p><span className="user-attribute">Nickname:</span> {globalUser?.nickname}</p>
          <p><span className="user-attribute"># of Notes:</span> {globalUser?.notes.length}</p>
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

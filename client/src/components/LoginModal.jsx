import React from 'react'
import './styles/Modal.css'

export default function LoadingModal() {
  return (
    <div className='modal-container'>
      <button className="modal-underlay"></button>
      <div className="modal-card">
        <h2>PLEASE WAIT</h2>
        <hr />
        <p>Fetching data from server...</p>
      </div>
    </div>
  )
}

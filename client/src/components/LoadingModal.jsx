import React, { useContext } from 'react'
import './styles/Modal.css'
import { AuthContext } from '../context/AuthContext'

export default function Loading() {
  const { isLoading } = useContext(AuthContext)

  return (
    <>
    {isLoading && <div className='modal-container'>
      <button className="modal-underlay" style={{opacity: 1, backgroundColor: '#f4f4f9'}}></button>
      <div className="modal-card"  style={{height: 200, width: 300}}>
        <h2>PLEASE WAIT</h2>
        <hr />
        <p>Fetching data from server...</p>
      </div>
    </div>}
    </>
  )
}

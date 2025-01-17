import React, { useState } from 'react'
import './styles/InputCard.css'

export default function InputCard(props) {
  const { createNote } = props

  const [inputValue, setInputValue] = useState("")

  function handleWrite() {
    if (inputValue.trim()) {
      createNote(inputValue.trim())
      setInputValue("")
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault() // prevent newline insertion
      handleWrite()
    }
  }

  return (
    <div className="input-card">
      <textarea className="input-textarea" placeholder="Write your note here..." 
        value={inputValue} onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}></textarea>
      <button className="write-button" onClick={handleWrite}>
        Write
      </button>
    </div>
  )
}

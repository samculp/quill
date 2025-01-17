import React from 'react'
import './styles/NoteCard.css'

export default function NoteCard(props) {
  const { note, deleteNote } = props
  return (
    <div className="note-card">
      <p className="note-text">{note.note}</p>
      <button className="delete-button" onClick={() => deleteNote(note.id)}>
        Delete
      </button>
    </div>
  )
}

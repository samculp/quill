import React from 'react'
import NoteCard from './NoteCard.jsx'
import InputCard from './InputCard.jsx'
import './styles/NotesList.css'

export default function NotesList(props) {
  const { notes, createNote, deleteNote } = props
  return (
    <div className='notes-container'>
      {notes?.map((note, noteIndex) => {
        return (
          <NoteCard note={note} deleteNote={deleteNote} key={noteIndex} />
        )
      })}
      <InputCard createNote={createNote} />
    </div>
  )
}

import React, { useContext, useEffect } from 'react'
import NoteCard from './NoteCard.jsx'
import InputCard from './InputCard.jsx'
import './styles/NotesList.css'
import { AuthContext } from '../context/AuthContext.jsx'

export default function NotesList(props) {
  const { globalNotes, createNote, deleteNote, getUserData } = useContext(AuthContext)

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <div className='notes-container'>
      {globalNotes?.map((note, noteIndex) => {
        return (
          <NoteCard note={note} deleteNote={deleteNote} key={noteIndex} />
        )
      })}
      <InputCard createNote={createNote} />
    </div>
  )
}

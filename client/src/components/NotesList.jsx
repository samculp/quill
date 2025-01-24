import React, { useContext, useEffect } from 'react'
import NoteCard from './NoteCard.jsx'
import InputCard from './InputCard.jsx'
import './styles/NotesList.css'
import { AuthContext } from '../context/AuthContext.jsx'
import { DndContext } from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'

export default function NotesList(props) {
  const { globalNotes, setGlobalNotes, createNote, deleteNote, getUserData } = useContext(AuthContext)

  function handleDragEnd(event) {
    const { active, over } = event
    console.log('Active:', active)
    console.log('Over:', over)
    if (over && active.id !== over.id) {
      setGlobalNotes((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        const updatedNotes = arrayMove(items, oldIndex, newIndex);
        return updatedNotes;
      });
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <div className='notes-container'>
      {globalNotes && 
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={globalNotes}>
          {globalNotes.map((note, noteIndex) => {
            return (
              <NoteCard note={note} deleteNote={deleteNote} key={noteIndex} id={note.id} />
            )
          })}
        </SortableContext>
      </DndContext>}
      <InputCard createNote={createNote} />
    </div>
  )
}
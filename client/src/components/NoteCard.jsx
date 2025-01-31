import React from 'react'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './styles/NoteCard.css'

export default function NoteCard(props) {
  const { note, deleteNote, id } = props

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({id});

  const noteStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 'auto',
    boxShadow: isDragging ? '0 4px 8px rgba(0, 0, 0, 0.3)' : 'none',
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div ref={setNodeRef} style={noteStyle} {...attributes} className='note-card'>
      <p className="note-text">{note.note}</p>
      <div  {...listeners} className="drag-handle">⠿</div>
      <button className="delete-button" onClick={() => deleteNote(note.id)}>
        Delete
      </button>
    </div>
  )
}

import express from 'express'
import db from '../db/connection.js'
import { ObjectId } from 'mongodb'

const router = express.Router()

// GET ALL NOTES FOR LOGGED-IN USER
router.get('/', async (req, res) => {
  try {
    // find the appropriate user
    const user = await db.collection('users').findOne({_id: new ObjectId(req.userId)})
    if (!user) { return res.status(404).send({error: 'User not found'}) }
    res.status(200).send(user.notes)
  } catch (error) {
    console.error('Error fetching notes: ', error.message)
    res.status(500).send({error: 'Internal server error'})
  }
})

// ADD A NEW NOTE FOR THE LOGGED-IN USER
router.post('/', async (req, res) => {
  const { note } = req.body
  if (!note) { return res.status(404).send({error: 'Note content is required'}) }

  try {
    // find the appropriate user
    const user = await db.collection('users').findOne({_id: new ObjectId(req.userId)})
    if (!user) { return res.status(404).send({error: 'User not found'}) }

    // create the new note
    const newNote = {
      id: new ObjectId(),
      note: note,
      completed: false
    }

    // add the new note to the user's notes array
    await db.collection('users').updateOne(
      { _id: new ObjectId(req.userId) },
      { $push: { notes: newNote } }
    )

    res.status(201).send({message: 'Note added successfully', note: newNote})  
  } catch (error) {
    console.error(`Error adding note: ${error.message}`)
    res.status(500).send({error: 'Internal server error'})
  }
})

// DELETE A NOTE FOR THE LOGGED-IN USER
router.delete('/:noteId', async (req, res) => {
  const { noteId } = req.params

  try {
    // find the appropriate user
    const user = await db.collection('users').findOne({_id: new ObjectId(req.userId)})
    if (!user) { return res.status(404).send({error: 'User not found'}) }

    // remove the note from the user's notes array
    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(req.userId) },
      { $pull: { notes: {id: new ObjectId(noteId)} } }
    )

    res.status(200).send({message: 'Note deleted successfully'})
  } catch (error) {
    console.error('Error deleting note: ', error.message)
    res.status(500).send({error: 'Internal server error'})
  }
})

// UPDATED "COMPLETED" STATUS OF A NOTE FOR A LOGGED-IN USER
router.put('/:noteId', async (req, res) => {
  const { noteId } = req.params

  try {
    // find the appropriate user
    const user = await db.collection('users').findOne({_id: new ObjectId(req.userId)})
    if (!user) { return res.status(404).send({error: 'User not found'}) }

    // update the note's "completed" status
    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(req.userId), 'notes.id': new ObjectId(noteId) },
      { $set: { 'notes.$.completed': true } }
    )

    res.status(200).send({message: 'Note status updated'})
  } catch (error) {
    console.error('Error updating note: ', error.message)
    res.status(500).send({error: 'Internal server error'})
  }
})

export default router
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'
import noteRoutes from './routes/noteRoutes.js'
import { ObjectId } from 'mongodb'
import db from './db/connection.js'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()
const serverRebootId = Date.now().toString()

// middleware
app.use(cors())
app.use(express.json())

// returns the server reboot id for current server session
app.get('/reboot-id', (req, res) => {
  res.status(200).send({rebootId: serverRebootId})
})

// returns the entire user objects
app.get('/user-full-info', authMiddleware, async (req, res) => {
  const user = await db.collection('users').findOne({_id: new ObjectId(req.userId)})
  if (!user) return res.status(400).send({error: 'No user with this username found'})
  res.status(200).send(user)
})

// updates the nickname of the user
app.post('/nickname', authMiddleware, async (req, res) => {
  const { newNickname } = req.body
  if (!newNickname) req.status(404).send({error: "Nickname content required"})
  try {
    const user = await db.collection('users').findOne({_id: new ObjectId(req.userId)})
    if (!user) res.status(404).send({error: "User not found"})
    await db.collection('users').updateOne(
      {_id: new ObjectId(req.userId)},
      {$set: {nickname: newNickname}}
    )
    res.status(200).send({message: "Nickname successfully updated"})
  } catch (error) {
    console.error(error.message)
    res.status(500).send({error: "Error updating nickname"})
  }
})

// routes
app.use('/auth', authRoutes)
app.use('/notes', authMiddleware, noteRoutes)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`)
})
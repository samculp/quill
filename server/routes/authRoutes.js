import express from 'express'
import db from '../db/connection.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'

const router = express.Router()

// REGISTER A NEW USER
router.post('/register', async (req, res) => {
  const { username, password } = req.body

  try {
    // check if the user exists
    const existingUser = await db.collection('users').findOne({username: username})
    if (existingUser) return res.status(400).send({error: 'Username already exists'})

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // create the user
    const result = await db.collection('users').insertOne({
      username: username,
      password: hashedPassword,
      nickname: username,
      notes: [{id: new ObjectId(), note: "Your first note! How exciting! Simply enter the content of your note in the text field and click 'Write' when you're ready to post it.", completed: false}] // initialize empty notes array
    })

    // create a token specific to this user's login session
    const token = jwt.sign({id: result.insertedId}, process.env.JWT_SECRET, {expiresIn: '1h'})

    res.status(201).send({message: 'User registered successfully', token: token})
  } catch (error) {
    console.error('Error during registration: ', error.message)
    res.status(500).send({error: 'Internal server error'})
  }
})

// LOGIN A USER
router.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    // find the user
    const user = await db.collection('users').findOne({username: username})
    if (!user) return res.status(400).send({error: 'No user with this username found'})

    // check the password
    const isPasswordValid = bcrypt.compareSync(password, user.password)
    if (!isPasswordValid) return res.status(400).send({error: 'Invalid password'})

    // create a token specific to this user's login session
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1hr'})

    res.status(200).send({message: 'Login successful', token: token})
  } catch (error) {
    console.error('Error during login: ', error.message)
    res.status(500).send({error: 'Internal server error'})
  }
})

export default router
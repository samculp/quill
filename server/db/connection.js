import { MongoClient, ServerApiVersion } from "mongodb"

const uri = process.env.MONGO_URI || ""

const client = new MongoClient(uri)

try {
  await client.connect()
  await client.db('users').command({ping: 1})
  console.log('MongoDB connection successful.')
} catch (error) {
  console.error(error)
}

let db = client.db('users')
export default db

/*
SCHEMA
{
  "_id": "64b64b7c8e3c1a6d3a123456", // Unique ObjectId for the user
  "username": "john_doe",
  "password": "hashed_password_here", // Password should be securely hashed
  "nickname": "John",
  "notes": [
    {
      "id": "64b64b7c8e3c1a6d3a654321", // Unique ObjectId for the note
      "note": "Buy groceries",
      "completed": false
    },
    {
      "id": "64b64b7c8e3c1a6d3a987654",
      "note": "Finish the project report",
      "completed": true
    },
    {
      "id": "64b64b7c8e3c1a6d3a111111",
      "note": "Call the electrician",
      "completed": false
    }
  ]
}
*/
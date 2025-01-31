import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export function AuthProvider(props) {
  const { children, apiBase } = props

  const [globalUser, setGlobalUser] = useState({})
  const [globalNotes, setGlobalNotes] = useState([])
  const [authToken, setAuthToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  // register/login a user
  async function authenticate(extension) {
    localStorage.removeItem('token')
    try {
      setIsAuthenticating(true)
      setErrorMessage("")
      const response = await fetch(apiBase + 'auth/' + extension, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username: username, password: password})
      })
      const data = await response.json()
      if (data.token) {
        setAuthToken(data.token)
        localStorage.setItem('token', data.token)
      } else {
        setErrorMessage(data.error)
        throw Error(data.error || 'Failed to authenticate')
      }
    } catch (error) {
      console.error(error.message)
    } finally {
      setIsAuthenticating(false)
    }
  }

  function logout() {
    setAuthToken(null)
    localStorage.removeItem('token')
    setGlobalUser(null)
    setIsLoading(false)
  }

  // primary function to fetch the user's data and display the dashboard
  async function getUserData() {
    try {
      const result = await fetch(apiBase + 'user-full-info', {
        method: 'GET',
        headers: {
          Authorization: authToken
        }
      })
      const data = await result.json()
      if (data.error) {
        throw Error(data.error)
      }
      setGlobalUser(data)
    } catch (error) {
      console.error(error.message)
      logout()
    } finally {
      setIsLoading(false)
    }
  }

  // CRUD OPERATIONS
  async function createNote(note) {
    if (!note) { return }
    await fetch(apiBase + 'notes', {
      method: 'POST',
      headers: {
        'Authorization': authToken,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({note})  
    })
    getUserData()
  }

  async function deleteNote(index) {
    await fetch(apiBase + 'notes/' + index, {
      method: 'DELETE',
      headers: {
        'Authorization': authToken
      }
    })
    getUserData()
  }

  async function changeNickname(newNickname) {
    try {
      const response = await fetch(apiBase + 'nickname', {
        method: 'POST',
        headers: {
          'Authorization': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({newNickname})
      })
      const data = await response.json()
      if (data.error) {
        throw Error(data.error)
      }
      getUserData()
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    async function checkRebootAndRun() {
      try {
        const response = await fetch(apiBase + 'reboot-id')
        const data = await response.json()
        const serverRebootId = data.rebootId
        const storedRebootId = localStorage.getItem('serverRebootId')
        const token = localStorage.getItem('token')
        if (token && serverRebootId == storedRebootId) {
          setAuthToken(token)
        } else {
          localStorage.setItem('serverRebootId', serverRebootId)
          logout()
        }
      } catch (error) {
        logout()
        console.log(error.message)
        setErrorMessage('Server is currently offline!')
      } finally {
        setIsLoading(false)
      }
    }
    checkRebootAndRun()
  }, [])

  useEffect(() => {
    setGlobalNotes(globalUser?.notes)
  }, [globalUser])

  const isAuthenticated = !!authToken

  const value = { apiBase, globalUser, globalNotes, setGlobalNotes, isLoading, isAuthenticated, isAuthenticating,
    errorMessage, setErrorMessage, username, setUsername, password, setPassword, authenticate, logout,
    createNote, deleteNote, changeNickname, getUserData }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
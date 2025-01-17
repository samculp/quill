import { useEffect, useState } from 'react'
import AuthScreen from './components/AuthScreen.jsx'
import Header from './components/Header.jsx'
import NotesList from './components/NotesList.jsx'
import Modal from './components/Modal.jsx'

const apiBase = 'https://quill-api-vvzr.onrender.com/'

function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [token, setToken] = useState("")
  const [notes, setNotes] = useState([])
  const [user, setUser] = useState({})
  const [isShowingDashboard, setIsShowingDashboard] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [showModal, setShowModal] = useState(false)

  // primary function to fetch the user's data and display the dashboard
  async function showDashboard() {
    try {
      const result = await fetch(apiBase + 'user-full-info', {
        method: 'GET',
        headers: {
          Authorization: token
        }
      })
      const data = await result.json()
      if (data.error) {
        throw Error(data.error)
      }
      setUser(data)
      setIsShowingDashboard(true)
    } catch (error) {
      console.error(error.message)
      logout()
    }
  }

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
        setToken(data.token)
        localStorage.setItem('token', data.token)
      } else {
        throw Error(data.error || 'Failed to authenticate')
      }
    } catch (error) {
      console.error(error.message)
      setErrorMessage(error.message)
    } finally {
      setIsAuthenticating(false)
    }
  }

  // logout a user, reset the states
  function logout() {
    localStorage.removeItem('token')
    setShowModal(false)
    setIsShowingDashboard(false)
    setUser({})
    setUsername("")
    setPassword("")
  }

  // CRUD OPERATIONS
  async function createNote(note) {
    if (!note) { return }
    await fetch(apiBase + 'notes', {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({note})  
    })
    showDashboard()
  }

  async function deleteNote(index) {
    await fetch(apiBase + 'notes/' + index, {
      method: 'DELETE',
      headers: {
        'Authorization': token
      }
    })
    showDashboard()
  }

  async function changeNickname(newNickname) {
    try {
      const response = await fetch(apiBase + 'nickname', {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({newNickname})
      })
      const data = await response.json()
      if (data.error) {
        throw Error(data.error)
      }
      showDashboard()
    } catch (error) {
      console.error(error.message)
    }
  }

  // runs upon refresh
  useEffect(() => {
    async function checkRebootandRun() {
      try {
        const response = await fetch(apiBase + 'reboot-id')
        const data = await response.json()
        const serverRebootId = data.rebootId
        const storedRebootId = localStorage.getItem('serverRebootId')
        const storedToken = localStorage.getItem('token')
        if (storedToken && storedRebootId === serverRebootId) {
          setToken(storedToken)
        } else {
          logout()
          localStorage.setItem('serverRebootId', serverRebootId)
        }
      } catch (error) {
        console.error(error)
        setErrorMessage('Server is currently offline!')
        logout()
      }
    }
    checkRebootandRun()
  }, [])

  // showDashboard() gets executed when token changes
  useEffect(() => {
    if (token) {
      showDashboard()
    }
  }, [token])

  // set user's notes when user changes
  useEffect(() => {
    setNotes(user?.notes)
  }, [user])
  
  
  return (
    <div>
      {showModal && <Modal {...{showModal, setShowModal, user, changeNickname, logout}} />}
      <Header {...{isShowingDashboard, user, logout, showModal, setShowModal} }/>
      <div className="content">
        {!isShowingDashboard && <AuthScreen {...{username, setUsername, password, setPassword, authenticate, isAuthenticating, errorMessage, setErrorMessage}} />}
        {isShowingDashboard && <NotesList {...{notes, createNote, deleteNote}} />}
      </div>
    </div>
  )
}

export default App

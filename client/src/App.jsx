import { useEffect, useState } from 'react'
import AuthScreen from './components/AuthScreen.jsx'
import Header from './components/Header.jsx'
import NotesList from './components/NotesList.jsx'
import AccountModal from './components/AccountModal.jsx'
import LoadingModal from './components/LoginModal.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {
  const apiBase = 'http://localhost:5000/'  

  return (
    <AuthProvider {...{ apiBase }}>
      <Router>
        <Header />
          <div className="content">
          <Routes>
            <Route path='*' element={<Navigate to='/dashboard' />} />
            <Route path='/login' element={<AuthScreen />} />
            <Route path='/dashboard' element={
              <ProtectedRoute>
                  <NotesList />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

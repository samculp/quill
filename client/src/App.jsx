import AuthScreen from './components/AuthScreen.jsx'
import Header from './components/Header.jsx'
import NotesList from './components/NotesList.jsx'
import LoadingModal from './components/LoadingModal.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const apiBase = 'https://quill-api-vvzr.onrender.com/'
  
  return (
    <AuthProvider {...{ apiBase }}>
      <Router>
        <LoadingModal />
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
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

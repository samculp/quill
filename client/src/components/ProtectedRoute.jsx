import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children}) {
  const { isAuthenticated, isLoading, getUserData } = useContext(AuthContext)

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  return isAuthenticated ? children : <Navigate to="/login" />
}

/* eslint-disable react-refresh/only-export-components */
import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next'
import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const AuthContext = createContext(undefined)
export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}
const authSessionKey = '_RIZZ_AUTH_KEY_'
export const authSessionToken = '_TOKEN_'
export function AuthProvider({ children }) {
  const userData = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()
  const getSession = () => {
    const fetchedCookie = getCookie(authSessionKey)?.toString()
    if (!fetchedCookie) return
    else return JSON.parse(fetchedCookie)
  }
  const [user, setUser] = useState(getSession())
  const saveSession = (user) => {
    setCookie(authSessionKey, JSON.stringify(user))
    setCookie(authSessionToken, user?.access_token)
    setUser(user)
  }
  const removeSession = () => {
    deleteCookie(authSessionKey)
    deleteCookie(authSessionToken)
    setUser(undefined)
    if (userData?.role != 'admin') {
      navigate('/agent/login')
    } else {
      navigate('/admin/login')
    }
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: hasCookie(authSessionKey),
        saveSession,
        removeSession,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

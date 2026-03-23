import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

async function hashPassword(password) {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('auth_user')
    return stored ? JSON.parse(stored) : null
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('auth_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('auth_user')
    }
  }, [user])

  async function signUp(username, email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '{}')
    if (users[email]) {
      return { error: 'An account with this email already exists.' }
    }
    const hash = await hashPassword(password)
    users[email] = { username, email, passwordHash: hash }
    localStorage.setItem('users', JSON.stringify(users))
    setUser({ username, email })
    return { error: null }
  }

  async function login(email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '{}')
    const record = users[email]
    if (!record) {
      return { error: 'No account found with that email.' }
    }
    const hash = await hashPassword(password)
    if (hash !== record.passwordHash) {
      return { error: 'Incorrect password.' }
    }
    setUser({ username: record.username, email })
    return { error: null }
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, signUp, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { auth, signInWithEmail, signUpWithEmail, signOutUser } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'

interface User {
  id: string
  email: string
  name: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  signIn: (email: string, password: string) => Promise<boolean>
  signUp: (email: string, password: string, name: string) => Promise<boolean>
  signOut: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || '',
          avatar: firebaseUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${firebaseUser.email}`
        })
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      const firebaseUser = await signInWithEmail(email, password)
      setUser({
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || '',
        avatar: firebaseUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${firebaseUser.email}`
      })
      return true
    } catch (error) {
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      const firebaseUser = await signUpWithEmail(email, password, name)
      setUser({
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        name: firebaseUser.displayName || name || firebaseUser.email?.split('@')[0] || '',
        avatar: firebaseUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${firebaseUser.email}`
      })
      return true
    } catch (error) {
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = () => {
    signOutUser()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      signUp,
      signOut,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 
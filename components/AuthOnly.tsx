"use client"

import { User, getAuth, onAuthStateChanged } from "firebase/auth"
import { ReactNode, useEffect, useState } from "react"

export function AuthOnly({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<null | User>(null)

  useEffect(() => {
    const auth = getAuth()
    return onAuthStateChanged(auth, (user) => {
      setIsLoading(false)
      setUser(user)
    })
  }, [])

  if (isLoading) return <p>Loading ...</p>
  if (!user) return <p>Unauthenticated</p>

  return <>{children}</>
}
import { useState, useEffect } from 'react'
import { onAuthStateChange } from '@/firebase/client'

export default function useUser () {
  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(onAuthStateChange(setUser))
  }, [])

  return user
}

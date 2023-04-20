import { Alert } from '@material-tailwind/react'
import React, { useState, useEffect } from 'react'

export default function ConnectionStatus () {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    function handleOnline () {
      setIsOnline(true)
    }

    function handleOffline () {
      setIsOnline(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <div className='m-2'>
      {!isOnline &&
      <Alert color='red'>Sin conexión a internet!!! 🥲</Alert>
      }
    </div>
  )
}

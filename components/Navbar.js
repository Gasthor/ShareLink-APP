import Link from 'next/link'
import { useState, useEffect } from 'react'
import { onAuthStateChange, logOut } from '@/firebase/client'
import Button from './Button'

export default function NavBar () {
  const [user, setUser] = useState(null)

  useEffect((user) => {
    setUser(onAuthStateChange(setUser))
  }, [])

  const handleSingOut = async () => {
    await logOut()
    setUser(null)
  }

  return (
    <nav className="flex justify-between bg-blue-600 py-2 px-4 mb-1 rounded-b-xl">
      <div className="max-w-5xl">
        <Link className="text-white" href="/">
          <h1 className=''>ShareLink</h1>
        </Link>
      </div>
      {
        user === null
          ? (
            <div className='bg-blue-500 p-2 rounded-xl border-[1px] shadow-lg'>
              <a className='text-white text-sm' href='/auth'>Iniciar sesión</a>
            </div>
            )
          : <Button onClick={handleSingOut}>
            {
              user !== undefined &&
              <img className='m-1 w-6 rounded-full' src={user.photoURL} />
            }

            Cerrar sesión
          </Button>

      }

    </nav>
  )
}

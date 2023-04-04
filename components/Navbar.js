import Link from 'next/link'
import { useState, useEffect } from 'react'
import { onAuthStateChange } from '@/firebase/client'
import Button from './Button'
import { useRouter } from 'next/router'

export default function NavBar () {
  const [user, setUser] = useState(null)
  const router = useRouter()
  useEffect((user) => {
    setUser(onAuthStateChange(setUser))
  }, [])

  return (
    <nav className="flex justify-between bg-blue-600 py-2 px-4 mb-1 rounded-b-xl">
      <div className="max-w-5xl flex">
        <Link className="text-white flex" href="/">
          <h1 className='m-auto text-lg font-semibold'>ShareLink</h1>
        </Link>
      </div>
      {
        user === null
          ? (
            <div className='bg-blue-500 p-2 rounded-xl border-[1px] shadow-lg'>
              <a className='text-white text-sm' href='/auth'>Iniciar sesión</a>
            </div>
            )
          : <Button onClick={() => router.push('/user')} colorBg="bg-slate-200">
            {
              user !== undefined &&
              <img className='m-1 w-6 rounded-full' src={user.photoURL} />
            }
            <h1 className='m-auto text-slate-600'>
            Perfil
            </h1>

          </Button>

      }

    </nav>
  )
}

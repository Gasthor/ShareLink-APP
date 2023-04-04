import { useEffect, useState } from 'react'
import { logOut, onAuthStateChange } from '@/firebase/client'
import Button from '@/components/Button'
import { useRouter } from 'next/router'

export default function User () {
  const [user, setUser] = useState()
  const router = useRouter()
  const handleLogOut = async () => {
    await logOut()
    setUser(undefined)
    router.push('/')
  }

  useEffect(() => {
    setUser(onAuthStateChange(setUser))
  }, [])

  return (
        <div className="flex justify-center">
            <div className="bg-white m-1 p-2 rounded-xl flex flex-col justify-center max-w-lg w-11/12">
                <h1 className="text-xl font-medium text-center">Perfil</h1>

                {
                    user !== undefined && (
                        <div>
                            <div className='flex justify-center m-4'>
                                <img className='rounded-full' src={user.photoURL} />
                            </div>

                            <h1>Nombre: {user.displayName}</h1>
                            <h1>Correo: {user.email}</h1>
                            <Button onClick={handleLogOut}>
                                Cerrar sesión
                                </Button>
                        </div>
                    )
                }

            </div>
        </div>
  )
}

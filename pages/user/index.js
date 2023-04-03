import { useEffect, useState } from 'react'
import { onAuthStateChange } from '@/firebase/client'

export default function User () {
  const [user, setUser] = useState()

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
                <h1>Nombre: {user.displayName}</h1>
                <h1>Correo: {user.email}</h1>
            </div>
                )
            }

            </div>
        </div>
  )
}

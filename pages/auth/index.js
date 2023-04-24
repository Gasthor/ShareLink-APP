import { useEffect } from 'react'
import Button from '@/components/Button'
import { loginWithGoogle } from '@/firebase/client'
import { useRouter } from 'next/router'
import useUser from '@/hooks/useUser'

export default function Auth () {
  const router = useRouter()

  const user = useUser()

  useEffect(() => {
    user && router.push('/')
  }, [user])

  const handleSingIn = () => {
    loginWithGoogle().then(res => {
      router.push('/user')
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div className="flex justify-center">
      <div className="bg-white dark:bg-gray-900 m-1 p-2 rounded-xl flex flex-col justify-center max-w-lg w-11/12">
        <h1 className="text-center text-lg font-semibold dark:text-white">Inicio de sesión</h1>
        <p className="mb-2 text-center text-sm dark:text-white">Desbloquea todos los limites registrandote en la APP <br></br> Pronto mas opciones para iniciar sesion</p>
        <div className="flex justify-center">
          <Button onClick={handleSingIn} colorBg="bg-gray-200 dark:bg-gray-800 m-4">
            <img src="/google-logo.png" className="w-5 mx-2" />
            <h1 className='dark:text-white'>Iniciar sesion con Google</h1>
          </Button>

        </div>

      </div>

    </div>

  )
}

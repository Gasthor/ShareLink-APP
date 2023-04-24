import { logOut } from '@/firebase/client'
import Button from '@/components/Button'
import { useRouter } from 'next/router'
import useUser from '@/hooks/useUser'
import { useEffect } from 'react'
import { Avatar } from '@material-tailwind/react'
import ListLinkUser from '@/components/ListLinkUser'

export default function User () {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    console.log(user)
    //! user && router.push('/')
  }, [user])

  const handleLogOut = async () => {
    await logOut()
    router.push('/')
  }

  return (
        <div className="flex justify-center">
            <div className="bg-white dark:bg-gray-900 m-1 p-2 rounded-xl flex flex-col justify-center max-w-lg w-11/12">
                <h1 className="text-2xl text-center dark:text-white">Perfil</h1>

                {
                    user && (
                        <div>
                            <div className='flex justify-center m-4'>
                            <Avatar src={user.photoURL} alt="avatar" variant="circular" size='xxl'/>
                            </div>

                            <h1 className='dark:text-white'>Nombre: {user.displayName}</h1>
                            <h1 className='dark:text-white'>Correo: {user.email}</h1>
                            <ListLinkUser uid={user.uid}/>
                            <div className='flex justify-center'>
                                <Button onClick={handleLogOut} colorBg="bg-red-600">
                                    <h1 className='text-white'>Cerrar sesión</h1>
                                </Button>
                            </div>

                        </div>
                    )
                }

            </div>
        </div>
  )
}

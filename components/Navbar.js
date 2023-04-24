import Link from 'next/link'
import Button from './Button'
import { useRouter } from 'next/router'
import useUser from '@/hooks/useUser'
import { Avatar } from '@material-tailwind/react'

export default function NavBar () {
  const user = useUser()
  const router = useRouter()

  return (
    <nav className="flex justify-between bg-blue-700 dark:bg-blue-900 py-1 px-4 mb-1 shadow-xl">
      <div className="max-w-5xl flex">
        <Link className="text-white flex" href="/">
          <h1 className='m-auto text-lg font-semibold'>ShareLink</h1>
        </Link>
      </div>
      {
        user === null
          ? (
            <div className='bg-blue-700 p-2 m-1 rounded-xl shadow-lg'>
              <a className='text-white text-sm font-semibold' href='/auth'>Iniciar sesión</a>
            </div>
            )
          : <Button onClick={() => router.push('/user')} colorBg="bg-blue-700 dark:bg-blue-800 shadow-lg">
            {
              user !== undefined &&
              <Avatar src={user.photoURL} alt="avatar" variant="circular" size='xs'/>

            }
            <h1 className='my-auto ml-2 text-white'>
            Perfil
            </h1>

          </Button>

      }

    </nav>
  )
}

import Link from 'next/link'
import Button from './Button'
import { useRouter } from 'next/router'
import useUser from '@/hooks/useUser'

export default function NavBar () {
  const user = useUser()
  const router = useRouter()

  return (
    <nav className="flex justify-between bg-blue-600 py-1 px-4 mb-1 shadow-xl">
      <div className="max-w-5xl flex">
        <Link className="text-white flex" href="/">
          <h1 className='m-auto text-lg font-semibold'>ShareLink</h1>
        </Link>
      </div>
      {
        user === null
          ? (
            <div className='bg-blue-700 p-2 m-1 rounded-xl border-[1px] shadow-lg'>
              <a className='text-white text-sm font-semibold' href='/auth'>Iniciar sesión</a>
            </div>
            )
          : <Button onClick={() => router.push('/user')} colorBg="bg-blue-700 border-[1px]">
            {
              user !== undefined &&
              <img className='mr-3 w-5 rounded-full border' src={user.photoURL} />
            }
            <h1 className='m-auto text-white'>
            Perfil
            </h1>

          </Button>

      }

    </nav>
  )
}

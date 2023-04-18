import Button from '@/components/Button'
import { getLink } from '@/firebase/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function ShareLink () {
  const router = useRouter()
  const { idLink } = router.query

  const [loading, setLoading] = useState(true)
  const [response, setResponse] = useState(null)

  useEffect(() => {
    const getL = async () => {
      const res = await getLink(idLink)
      setResponse(res)
      setLoading(false)
    }
    if (idLink !== undefined) {
      getL()
    }
  }, [idLink])

  return (
    <div className='flex justify-center max-w-3xl mx-auto'>
      <div className='m-1 p-2 bg-white rounded-xl'>
        <h1 className='text-xl font-semibold'>Te han compartido un link 🙀!!</h1>
        <h1 className='text-lg'>Detalle de este link</h1>
        <h1>{idLink}</h1>
        {
          loading
            ? <h1>Cargando...</h1>
            : <img src={response.pathFiles} />
        }

        <Button colorBg="bg-green-500">
          Descargar archivo
        </Button>

      </div>

    </div>
  )
}

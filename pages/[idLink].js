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
      <div className='m-1 p-2 bg-white rounded-xl flex justify-center flex-col'>
        <h1 className='text-xl font-semibold text-center'>Te han compartido un link 🙀!!</h1>
        <h1 className='text-lg'>Detalle de este link</h1>

        {
          loading
            ? <h1>Cargando...</h1>
            : (<div className='my-2 flex flex-col justi'>
              <h1 className='text-sm'>Comentario: {response.description}</h1>
              <img className='rounded-lg my-4 md:max-w-lg' src={response.pathFiles} />
            </div>

              )
        }
        <div className='flex justify-center m-4'>

          <Button colorBg="bg-green-500">
            Descargar archivo (NO HABILITADO)
          </Button>
        </div>

      </div>

    </div>
  )
}

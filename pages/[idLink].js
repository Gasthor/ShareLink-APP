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
    if (idLink !== undefined) {
      getLink(idLink).then((res) => {
        setResponse(res)
        setLoading(false)
      })
    }
  }, [idLink])

  const downloadFile = async () => {
    const res = await fetch(
      response.pathFiles
    )
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', response.description)
    document.body.appendChild(link)
    link.click()
    link.parentNode.removeChild(link)
  }

  return (
    <div className='flex justify-center max-w-3xl mx-auto'>
      <div className='m-1 p-2 bg-white rounded-xl flex justify-center flex-col'>
        <h1 className='text-xl font-semibold text-center'>Te han compartido un link 🙀!!</h1>
        <h1 className='text-lg'>Detalle de este link</h1>

        {
          loading
            ? <h1>Cargando...</h1>
            : (
              <>

                <div className='my-2 flex flex-col justi'>
                  <h1 className='text-sm'>Comentario: {response.description}</h1>
                  <img className='rounded-lg my-4 md:max-w-lg' src={response.pathFiles} />
                </div>

                <div className='flex justify-center m-4'>

                  <Button colorBg="bg-green-500" onClick={downloadFile}>
                    Descargar
                  </Button>
                </div>
              </>
              )
        }
      </div>

    </div>
  )
}

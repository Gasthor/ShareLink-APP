import Button from '@/components/Button'
import { getLink, updateDownload } from '@/firebase/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function ShareLink () {
  const router = useRouter()
  const { idLink } = router.query

  const [loading, setLoading] = useState(true)
  const [response, setResponse] = useState(null)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    if (idLink !== undefined) {
      getLink(idLink).then((res) => {
        setResponse(res)
        setLoading(false)
      })
    }
  }, [idLink])

  const downloadFile = async () => {
    setDownloading(true)
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
    const updateCount = updateDownload(idLink, response.downloadsCount + 1)
    console.log(updateCount)
    setDownloading(false)
  }

  return (
    <div className='flex justify-center max-w-3xl mx-auto'>
      <div className='m-1 p-2 w-11/12 bg-white dark:bg-gray-900 rounded-xl flex justify-center flex-col'>
        <h1 className='text-xl font-semibold text-center dark:text-white'>Te han compartido un link 🙀!!</h1>
        <h1 className='text-lg text-center dark:text-white'>Detalle de este link</h1>

        {
          loading
            ? <h1 className='text-center text-xl animate-pulse dark:text-white'>Cargando...</h1>
            : (
                response === undefined
                  ? <div>
                  <h1 className='text-center text-xl dark:text-white'>Error 404 :/</h1>
                  <h1 className='dark:text-white'>No se encontro el link compartido ☹️</h1>
                </div>
                  : <>
                  <div className='my-2 flex flex-col mx-auto'>
                    <h1 className='text-sm dark:text-white'>Comentario: {response.description}</h1>
                    <img className='rounded-lg object-cover h-3/5 my-4' src={response.pathFiles} />
                    <h1 className='dark:text-white text-xs text-center'>Vista previa</h1>
                    <div className='flex flex-col justify-center m-4'>
                      <div className='flex justify-center'>
                      <Button colorBg="bg-green-500" onClick={downloadFile} disabled={downloading}>
                        Descargar
                      </Button>
                      </div>
                      <Link className='m-2 text-xs text-red-500 text-center' href={'/report/' + idLink}>Reportar un problema</Link>
                    </div>
                  </div>

                </>
              )
        }
      </div>

    </div>
  )
}

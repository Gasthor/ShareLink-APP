import Button from '@/components/Button'
import { reportLink } from '@/firebase/client'
import { Alert, Typography } from '@material-tailwind/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Report () {
  const router = useRouter()
  const { idLink } = router.query

  const [message, setMessage] = useState('')
  const [statusR, setStatusR] = useState()

  const handleReport = async (e) => {
    e.preventDefault()
    const resp = await reportLink(idLink, message)
    console.log(resp)
    setStatusR(resp.status)
  }

  return (
    <div className='flex justify-center'>
      <div className="m-4 bg-white rounded-lg dark:bg-gray-900 p-2 w-11/12 md: max-w-3xl">
        <div className="flex justify-center">
          <Typography variant="h3" color="red">Reportar link</Typography>
        </div>
        <h1 className="dark:text-white">Nos preocupa tu integridad y la de todos, por favor completa todos los campos que te pedimos a continuacion :)</h1>
        <form className="my-4" onSubmit={handleReport}>
          <div>
            <label className="dark:text-white">Descripcion breve de lo que se reporta</label>
            <textarea className="bg-gray-200 w-full rounded-lg p-2 dark:bg-gray-800 shadow-lg dark:text-white" value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
          <div>
            <label className="dark:text-white">Correo electronico</label>
            <input className="bg-gray-200 w-full rounded-lg p-2 dark:bg-gray-800 shadow-lg dark:text-white" type="email" required />
          </div>
          <div className="flex justify-center my-4">
            <Button colorBg={'bg-green-500'}>
              Enviar
            </Button>
          </div>
        </form>
        <div>
          {
            statusR === 200 && <Alert color='green'>Reporte enviado con exito </Alert>
          }
          {
            statusR === 400 && <Alert color='red'>Problema al enviar el reporte :/</Alert>
          }
        </div>
      </div>
    </div>

  )
}

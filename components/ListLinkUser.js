import { deleteLinkUser, getLinksUser } from '@/firebase/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Button from './Button'

export default function ListLinkUser (props) {
  const router = useRouter()

  const [links, setLinks] = useState(null)

  useEffect(() => {
    const getLinks = async () => {
      const response = await getLinksUser(props.uid)
      console.log(response.length)
      return response
    }
    getLinks().then(resp => {
      setLinks(resp)
      console.log(resp)
    })
  }, [props.uid])

  const handleGo = (id) => {
    const param = '/' + id
    router.push(param)
  }

  const handleDelete = async (id) => {
    const del = deleteLinkUser(id)
    console.log(await del)
  }

  return (
        <div className="border-b-2 border-t-2 my-4">
            <h1 className="text-center font-semibold text-lg">Link compartidos</h1>
            {
                links !== null
                  ? (
                      links.map((doc) => (
                            <div key={doc.id}>
                                <h1>Descripcion: {doc.description}</h1>
                                <div className='flex flex-row'>
                                    <Button colorBg={'bg-blue-500'} onClick={() => handleGo(doc.id)}>
                                        Ingresar
                                    </Button>
                                    <Button colorBg={'bg-red-500'} onClick={() => handleDelete(doc.id)}>
                                        Eliminar
                                    </Button>
                                </div>

                            </div>
                      ))
                    )
                  : (
                        <div>Sorry, nada que mostrar</div>
                    )
            }

        </div>
  )
}

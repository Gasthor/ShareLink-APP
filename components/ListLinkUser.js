import { getLinksUser } from '@/firebase/client'
import { useEffect, useState } from 'react'
import LinkUser from './LinkUser'

export default function ListLinkUser (props) {
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

  return (
    <div className="border-b-2 border-t-2 my-4">
      <h1 className="text-center font-semibold text-lg">Link compartidos</h1>
      {
        links !== null
          ? (
              links.map((doc) => (
                <LinkUser key={doc.id} pathFiles={doc.pathFiles} description={doc.description} id={doc.id} createdAt={doc.createdAt}/>
              ))
            )
          : (
            <div>Sorry, nada que mostrar</div>
            )
      }

    </div>
  )
}

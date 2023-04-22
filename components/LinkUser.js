import { deleteLinkUser } from '@/firebase/client'
import { DateTime } from 'luxon'
import { useRouter } from 'next/router'
import Button from './Button'

export default function LinkUser (props) {
  const router = useRouter()
  let date = DateTime.fromJSDate(props.createdAt)
  date = date.toFormat('dd-MM-yyyy')

  const handleGo = (id) => {
    const param = '/' + id
    router.push(param)
  }

  const handleDelete = async (id) => {
    deleteLinkUser(id).then((response) => {
      const arr = []
      const links = props.links
      if (response === 200) {
        // eslint-disable-next-line array-callback-return
        links.map((obj) => {
          if (obj.id !== id) arr.push(obj)
        })
      }
      props.setLinks(arr)
    })
  }
  return (
        <div key={props.id} className="border-[1px]">
            <div className='flex flex-row'>
                <img src={props.pathFiles} className="m-2 w-28 rounded-xl" />
                <div className=' my-2 grid grid-cols-1 grid-rows-2 content-between'>
                    <div>
                        <h1>Descripcion: {props.description}</h1>
                        <h1>Creado el: {date}</h1>
                        <h1>{props.countDownload} descargas</h1>
                    </div>
                    <div className='grid grid-cols-2 items-end'>
                        <Button colorBg={'bg-blue-500'} onClick={() => handleGo(props.id)}>
                            Ingresar
                        </Button>
                        <Button colorBg={'bg-red-500'} onClick={() => handleDelete(props.id)}>
                            Eliminar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
  )
}

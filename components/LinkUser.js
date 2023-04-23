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

  const handleDelete = async (id, file) => {
    deleteLinkUser(id, file).then((response) => {
      console.log(response === 200)
      const arr = []
      const links = props.links
      if (response === 200) {
        // eslint-disable-next-line array-callback-return
        links.map((obj) => {
          console.log(obj)
          if (obj.id !== id) arr.push(obj)
        })
        props.setLinks(arr)
      } else {
        alert('Error al eliminar link')
      }
    })
  }

  return (
        <div key={props.id} className="border-[1px] rounded-lg my-2">
            <div className='flex flex-row'>
                <img src={props.pathFiles} className="m-2 w-28 rounded-xl shadow-lg" />
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
                        <Button colorBg={'bg-red-500'} onClick={() => handleDelete(props.id, props.pathFiles)}>
                            Eliminar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
  )
}

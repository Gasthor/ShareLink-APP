import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { loginWithGoogle, onAuthStateChange } from "@/firebase/client";
import { useRouter } from "next/router";

export default function Auth() {
    const router = useRouter()

    const [user, setUser] = useState(null)
    
    useEffect(()=> {
        onAuthStateChange(setUser)
    },[])

    const handleClick = async() =>{
        loginWithGoogle().then(res => {
            const {family_name, given_name, email} = res
            setUser(res)
            console.log(res)
            router.push("/")
            
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="flex justify-center">
            <div className="bg-white m-1 p-2 rounded-xl flex flex-col justify-center max-w-lg w-11/12">
                <h1 className="text-center text-lg font-semibold">Inicio de sesion</h1>
                <p className="mb-2 text-center text-sm">Desbloquea todos los limites registrandote en la APP <br></br> Pronto mas opciones para iniciar sesion</p>
                <div className="flex justify-center">
                    {
                        user === null &&
                         <Button onClick={handleClick}>
                        Iniciar sesion con Google
                        </Button> 
                    }
                    
                </div>

            </div>

        </div>

    )
}
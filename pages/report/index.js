export default function Report({codeError}){
    return(
        <>
        <h1 className="m-2 text-center text-xl">Pagina principal para reporta un problema.</h1>
        <h1>Codigo de error: {codeError}</h1>
        </>
    )
}

Report.getInitialProps = async() => {
    return fetch('http://localhost:3000/api/hello')
    .then(res =>res.json())
    .then(response =>{
        const {codeError} = response
        return {codeError}
    })
}

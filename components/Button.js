export default function Button({ children, onClick }) {
    return (
            <button className="m-1 p-2 text-sm rounded-xl w-fit bg-slate-200 shadow-lg flex font-semibold text-slate-600" onClick={onClick}>
                <img src="/google-logo.png" className="w-5 mx-2"/>
                {children}
            </button>
    )
}
export default function Button ({ children, onClick, colorBg, disabled }) {
  return (
            <button className={'m-1 p-3 text-sm rounded-xl w-fit shadow-lg flex font-semibold disabled:bg-green-300 ' + colorBg} onClick={onClick} disabled={disabled}>
                {children}
            </button>
  )
}

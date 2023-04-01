import Link from "next/link";

export default function NavBar() {

    return (
        <nav className="flex justify-center bg-blue-500 p-2 mb-1 rounded-b-xl">
            <div className="max-w-5xl flex justify-between">
                <Link className="text-white" href="/">ShareLink</Link>
            </div>

        </nav>
    )
}
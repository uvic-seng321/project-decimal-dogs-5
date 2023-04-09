import { Link } from "@remix-run/react"

export default function NavBar() {
    return (
        <div className= "flex items-center space-between bg-orange-500 w-full p-4 px-8 border-b-2 h-100 border-orange-600 box-border">
            <Link className="w-full content-center text-white font-semibold text-lg" to="/">TutorUp</Link>
            <Link className="px-4 content-center text-white font-semibold" to="/tutor/1">/tutor/1</Link>
            <div className="flex content-center">
                <form action="/logout" method="post">
                    <button type="submit" className="text-white font-semibold rounded hover:bg-orange-600">
                    Logout
                    </button>
                </form>
            </div >
        </div >
    )
}
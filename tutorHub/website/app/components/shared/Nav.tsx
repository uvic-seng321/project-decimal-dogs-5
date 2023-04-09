import { json, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react"
import { getUser } from "~/utils/session.server";

export const loader = async ({ request }: any) => {
    const user = await getUser(request);
    if (!user) return redirect("/login");
    return json({
        user
    })
};

export default function NavBar() {
    const { user } = useLoaderData();
    return (
        <div className= "flex items-center space-between bg-orange-500 w-full py-4 px-8 border-b-2 h-100 border-orange-600 box-border">
            <Link className="content-center text-white font-semibold text-lg" to="/">TutorUp</Link>
            <div className="w-full flex justify-end gap-x-2">

            <Link className="px-4 content-center text-white font-semibold" to="/tutors">Tutors</Link>
            {!user?.tutorInfo && <Link className="px-4 content-center text-white font-semibold w-100" to="/tutor/register">Register as a Tutor</Link>}
            <div className="flex content-center">
                <form action="/logout" method="post">
                    <button type="submit" className="text-white font-semibold rounded hover:bg-orange-600">
                    Logout
                    </button>
                </form>
            </div >
            </div>
        </div >
    )
}
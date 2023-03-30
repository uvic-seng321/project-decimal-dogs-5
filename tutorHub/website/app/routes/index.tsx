import { Link, useLoaderData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { getUser } from "~/utils/session.server";

export const loader = async ({ request }: any) => {
  const user = await getUser(request);
  if (!user) return redirect("/login");
  return json({
    user
  })
};

export default function Index() {
  const { user }= useLoaderData();
  return (
    <div>
      <nav className="bg-gradient-to-br from-purple-400 via-purple-500 to-purple-500 w-full fixed top-0 left-0 px-5">
        <div
          className="w-full max-w-screen-lg mx-auto flex justify-between content-center py-3 ">
          <div className="flex flex-row items-center justify-between gap-x-4 text-blue-50">
            {
              user ? (
                <>
                  <form action="/logout" method="post">
                    <button type="submit" className="button">
                      Logout
                    </button>
                  </form>
                  <p>{JSON.stringify(user)}</p>
                </>) : (
                <>
                  <Link to={"login"}>Login</Link>
                  <Link to={"login"}>Register</Link>
                  <p>{JSON.stringify(user)}</p>
                </>
              )
            }

          </div>
        </div >
      </nav >
      <div className="grid lg:grid-flow-row grid-cols-1 lg:grid-cols-3">
        ...
      </div>
    </div >
  )
}
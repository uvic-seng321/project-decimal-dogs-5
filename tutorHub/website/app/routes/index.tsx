import { Link, useLoaderData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { getUser } from "~/utils/session.server";
import { useState } from "react";
import NavBar from "~/components/shared/Nav";
import { subjects, years } from "~/constants";

export const loader = async ({ request }: any) => {
  const user = await getUser(request);
  if (!user) return redirect("/login");
  return json({
    user
  })
};

export default function Index() {
  const { user } = useLoaderData();
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState(0);
  const [price, setPrice] = useState(0);

  return (
    <div className="w-screen h-screen flex flex-col bg-gradient-to-br from-orange-100 via-neutral-100 to-orange-100">
      <NavBar />
      <div className="flex flex-col w-full h-full items-center justify-center font-bold">
        <div className="text-2xl font flex flex-col gap-y-4">
          <p className="">I need help with   
            <select className="w-48 bg-gray-200 font-normal text-lg ml-2" onChange={(e: any) => setSubject(e.target.value)}>
              {subjects.map((subject) => {
                return <option value={subject}>{subject}</option>
              })
            }
            </select>
          </p>
          <p className={`transition-all ease-in duration-500 ${subject ? "opacity-100 transalte-x-0" : "opacity-0 -translate-x-2"}`}>I am in my 
            <select className="w-48 bg-gray-200 font-normal text-lg ml-2" onChange={(e: any) => setYear(e.target.value)}>
              {years.map((year) => {
                return <option value={year}>{year}</option>
              })
            }
            </select>

            
          </p>
          <p className={`transition-all ease-in duration-500 ${year ? "opacity-100 transalte-x-0" : "opacity-0 -translate-x-2"}`}>My budget is $
            <input 
              type="text" 
              className="mx-1 w-8 bg-gray-200 font-normal text-lg p-1" 
              onChange={() => setPrice(40)}
            />/hr
          </p>
          <Link 
            to={`/tutors?subject=${subject}&price=${price}&year=${year}`} 
            className={`hover:skew-x-4 text-center shadow-lg hover:bg-blue-400 font-bold rounded-lg p-2 text-white text-md bg-blue-500 transition-opacity transition-translate ease-in duration-500 ${price ? "opacity-100" : "opacity-0"}`}
          >
            Search Tutors
          </Link>
        </div>
      </div>
    </div >
  )
}
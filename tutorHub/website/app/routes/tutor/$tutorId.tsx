import { useParams, useLoaderData } from "@remix-run/react";
import type { LoaderArgs, LoaderFunction } from "@remix-run/node";
import NavBar from "~/components/shared/Nav";
import { ErrorBoundaryComponent } from "@remix-run/node";
import Content from "~/components/shared/Content";

export let loader: LoaderFunction = async ({params}: LoaderArgs) => {
  let data = await fetch(`http://localhost:5000/getAvailability/${params.tutorId}`).then(res => res.json())
  return data
  };

  export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
    return <div>ERROR: {error.message}</div>;
  };

export default function TutorPage() {
  const data = useLoaderData();
  return (
    <Content>
      <div className="w-full h-full grid grid-cols-4">
        <div className="col-span-3 h-full bg-orange-500 p-8 border-r-2 border-orange-600">
          <div className="bg-neutral-100 h-full w-full rounded-2xl">
            {JSON.stringify(data)}
          </div>
        </div>
        <div className="h-full bg-gradient-to-br from-orange-100 via-neutral-100 to-orange-100 flex flex-col p-8 pt-16">
          <div className="flex space-between w-full items-center mb-12">
            <div className="h-16 w-24 rounded-2xl bg-green-600 text-center text-white"></div>
            <p className="text-lg w-full text-center font-semibold">Scott Kenning</p>
          </div>
            <label className="font-bold">Day:</label>
            <select className="mb-4 shadow">
              <option value="1">1</option>
              <option value="1">1</option>
            </select>
            <label className="font-bold">Start time:</label>
            <select className="mb-4 shadow">
              <option value="1">1</option>
              <option value="1">1</option>
            </select>
            <label className="font-bold">End time:</label>
            <select className="mb-4 shadow">
              <option value="1">1</option>
              <option value="1">1</option>
            </select>
            <label className="font-bold">Subject</label>
            <select className="mb-4 shadow">
              <option value="1">1</option>
              <option value="1">1</option>
            </select>
            <button className="shadow bg-blue-500 text-white font-bold rounded-lg p-2 mt-4 hover:scale-105 hover:bg-blue-400">Book</button>

        </div>
      </div>
    </Content>
    )
  

}
  

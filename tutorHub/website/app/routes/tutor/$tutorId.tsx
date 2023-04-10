import { useParams, useLoaderData } from "@remix-run/react";
import type { LoaderArgs, LoaderFunction } from "@remix-run/node";
import NavBar from "~/components/shared/Nav";
import { ErrorBoundaryComponent } from "@remix-run/node";
import Content from "~/components/shared/Content";
import TutorCalendar from "~/components/shared/Calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

type Event = {
  id: string;
  title: string;
  start: Date;
  end: Date;
};

export let loader: LoaderFunction = async ({params}: LoaderArgs) => {
  let data = await fetch(`http://127.0.0.1:5000/getAvailability/${params.tutorId}`)
  return data
  };

  export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
    return <div>ERROR: {error.message}</div>;
  };

export default function TutorPage() {
  const data = useLoaderData();
  const event1: Event = {
    id: "1",
    title: "Sample Event",
    start: new Date(),
    end: new Date(),
  };
  return (
    <Content>
      <div className="w-full h-full grid grid-cols-4">
        <div className="col-span-3 h-full bg-orange-500 p-8 border-r-2 border-orange-600">
          <div className="bg-neutral-100 h-full w-full rounded-2xl">
            <TutorCalendar events={[event1]}/>
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
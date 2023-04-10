import { useParams, useLoaderData } from "@remix-run/react";
import type { LoaderArgs, LoaderFunction } from "@remix-run/node";
import NavBar from "~/components/shared/Nav";
import { ErrorBoundaryComponent } from "@remix-run/node";
import Content from "~/components/shared/Content";
import TutorCalendar from "~/components/shared/Calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { startCase } from "cypress/types/lodash";
import { useState } from "react";


type data = any

type Event = {
  id: any;
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
  const [startTime, setStartTime] = useState("8:00");
  const [endTime, setEndTime] = useState("20:00");

  const [events, setEvents] = useState(data?.bookings?.map((booking: any, index: any) => {
    return {
      id: index,
      title: "Booked",
      start: new Date(booking.startTime),
      end: new Date(booking.endTime)
    }
  }));
  
  const handleClick = () => {
    setEvents([ ...events, {id: events.length(), title: "booking", start: new Date(startTime), end: new Date(endTime)}])
  }

  return (
    <Content>
      <div className="w-full h-full grid grid-cols-4">
        <div className="col-span-3 h-full bg-orange-500 p-8 border-r-2 border-orange-600">
          <div className="bg-neutral-100 h-full w-full rounded-2xl">
            <TutorCalendar events={events}/>
          </div>
        </div>
        <div className="h-full bg-gradient-to-br from-orange-100 via-neutral-100 to-orange-100 flex flex-col p-8 pt-16">
          <div className="flex space-between w-full items-center mb-auto">
            <div className="h-16 w-24 rounded-2xl bg-green-600 text-center text-white"></div>
            <p className="text-lg w-full text-center font-semibold">Scott Kenning</p>
          </div>
            <label className="font-bold">Start time:</label>
            <input type="datetime-local" className="mb-4 shadow" onChange={(e: any) => setStartTime(e.target.value)}></input>
            <label className="font-bold">End time:</label>
            <input type="datetime-local" className="mb-4 shadow" onChange={(e: any) => setEndTime(e.target.value)}></input>
            <button onClick={() => handleClick()} className="shadow bg-blue-500 text-white font-bold rounded-lg p-2 mt-4 hover:scale-105 hover:bg-blue-400">Book</button>
        </div>
      </div>
    </Content>
    )
  
}
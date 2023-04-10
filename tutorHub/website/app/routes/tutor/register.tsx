import { useParams, useLoaderData, Form } from "@remix-run/react";
import { ActionArgs, LoaderArgs, LoaderFunction, redirect } from "@remix-run/node";
import NavBar from "~/components/shared/Nav";
import { ErrorBoundaryComponent } from "@remix-run/node";
import Content from "~/components/shared/Content";
import TutorCalendar from "~/components/shared/Calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { startCase } from "cypress/types/lodash";
import { useState } from "react";
import { getUser, registerUserAsTutor } from "~/utils/session.server";
import { ActionFunction } from "@remix-run/node";


type data = any

type Event = {
  id: any;
  title: string;
  start: Date;
  end: Date;
};

export let loader: LoaderFunction = async ({ request }: any) => {
  const user = await getUser(request);
  return { user }
};

export const action: ActionFunction = async ({ request }: any)  => {
  const formData = await request.formData();

  const price = formData.get("price");
  const user = await getUser(request);

  const data = {price: price, name: "tutor name", email: user.email}

  const status = registerUserAsTutor(data);
  return redirect("http://localhost:3000");
};

// export const action: ActionFunction = async ({ request }) => {
//   const formData = await request.formData();

//   const title = formData.get("title");
//   const author = formData.get("author");

//   return redirect(`/new/`);
// }

  export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
    return <div>ERROR: {error.message}</div>;
  };
  
  export default function TutorPage() {
  const {user} = useLoaderData();
  const [price, setPrice] = useState(0);
  const [subject, setSubject] = useState<any>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [startTime, setStartTime] = useState("8:00");
  const [endTime, setEndTime] = useState("20:00");

  const [events, setEvents] = useState<any>();
  
  const handleAddEvent = () => {
    setEvents([ ...events, {id: events.length(), title: "Busy", start: new Date(startTime), end: new Date(endTime)}])
  }

  // const handleRegister = async () => {
    
  // }

  return (
    <Content>
      <div className="w-full h-full grid grid-cols-4">
        <div className="col-span-3 h-full bg-orange-500 p-8 border-r-2 border-orange-600">
          <div className="bg-neutral-100 h-full w-full rounded-2xl">
            <TutorCalendar events={events}/>
          </div>
        </div>
        <div className="h-full bg-gradient-to-br from-orange-100 via-neutral-100 to-orange-100 flex flex-col p-8 pt-2">
          <div className="flex space-between w-full items-center mb-auto">
            <div className="h-16 w-24 rounded-2xl bg-green-600 text-center text-white"></div>
            <p className="text-lg w-full text-center font-semibold">Scott Kenning</p>
          </div>
            <label className="font-bold">Start time:</label>
            <input type="datetime-local" className="mb-1 shadow" onChange={(e: any) => setStartTime(e.target.value)}></input>
            <label className="font-bold">End time:</label>
            <input type="datetime-local" className="mb-1 shadow" onChange={(e: any) => setEndTime(e.target.value)}></input>
            <button onClick={() => handleAddEvent()} className="shadow bg-blue-500 text-white font-bold rounded-lg p-2 my-1 hover:scale-105 hover:bg-blue-400">Add Unavailable Time</button>
            <div className="my-4 flex flex-col gap-y-1">
              <label className="font-bold w-full">Subject:</label>
              <input type="text" className="" onChange={(e: any) => {setSubject(e.target.value)}}></input>
              <button onClick={() => {
                setSubjects([...subjects, subject]);
                setSubject("");
              }} className="shadow bg-blue-500 text-white font-bold rounded-lg p-2 hover:bg-blue-400">Add subject</button>
            </div>
            <p>Current Subjects: {subjects.map(subject => {return subject + ", "})}</p>
            <Form method="post">
              <label className="font-bold">Price per hour:
                <input type="number" name="price" className="mb-1 shadow" onChange={(e: any) => setPrice(e.target.value)}></input>
              </label>
              <button type="submit" className="shadow bg-green-600 text-white font-bold rounded-lg p-2 mt-2 hover:scale-105 hover:bg-green-500">Register</button>
            </Form>
        </div>
      </div>
    </Content>
    )
}
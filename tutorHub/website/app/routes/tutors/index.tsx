import { SetStateAction, useState } from 'react';
import { Link, useLoaderData } from "@remix-run/react";
import NavBar from '~/components/shared/Nav';
import { getUser } from '~/utils/session.server';
import Content from '~/components/shared/Content';
import TutorPage from '../tutor/$tutorId';
import { ErrorBoundaryComponent } from "@remix-run/node";
import type { LoaderArgs, LoaderFunction } from "@remix-run/node";

let priceLoader: LoaderFunction = async ({params}: LoaderArgs) => {
    let price = await fetch(`http://localhost:5000/getTutorPrice/${params.tutorId}`)
    return price
  };
  
  export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
    return <div>ERROR: {error.message}</div>;
  };


const Index: React.FC = () => {
    return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-neutral-100 to-orange-100 flex flex-col bg-neutral-100">
        {/* <h1 className="w-100 text-4xl text-center text-bla font-extrabold mb-4">Tutors Available</h1> */}
        <div className="flex flex-wrap mx-auto">
            <div className="bg-white h-min p-4 flex-shrink-0 rounded p-4 mb-2 mt-2 mr-2 ml-2">
                <div className="bg-black rounded p-4 h-48 w-56 mr-2 ml-2 mt-2 mb-2"></div>
                <h1 className="text-left"><span className="font-extrabold">Name: </span>Joe McDonald</h1>
                <h1 className="text-left"><span className="font-extrabold">Price: </span> fuck this </h1>
                <h1 className="text-left max-w-[235px]"><span className="font-extrabold">Subjects: </span>Calculus 12, Physics 11, Physics 11, Physics 12</h1>
                <div className="flex justify-center pt-5">
                    <button className="bg-orange-500 flex justify-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Book Tutor</button>
                </div>
            </div>
            <div className="bg-white h-min p-4 flex-shrink-0 rounded p-4 mb-2 mt-2 mr-2 ml-2">
                <div className="bg-black rounded p-4 h-48 w-56 mr-2 ml-2 mt-2 mb-2"></div>
                <h1 className="text-left"><span className="font-extrabold">Name: </span>Joe McDonald</h1>
                <h1 className="text-left"><span className="font-extrabold">Price: </span>$40</h1>
                <h1 className="text-left max-w-[235px]"><span className="font-extrabold">Subjects: </span>Calculus 12, Physics 11, Physics 11, Physics 12, mmmmmmmmmmmm mmmmmmmmmmmm mmmmmmmmmmm mmmmmmmmmmmmm</h1>
                <div className="flex justify-center pt-5">
                    <button className="bg-orange-500 flex justify-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Book Tutor</button>
                </div>
            </div>
            <div className="bg-white h-min p-4 flex-shrink-0 rounded p-4 mb-2 mt-2 mr-2 ml-2">
                <div className="bg-black rounded p-4 h-48 w-56 mr-2 ml-2 mt-2 mb-2"></div>
                <h1 className="text-left"><span className="font-extrabold">Name: </span>Joe McDonald</h1>
                <h1 className="text-left"><span className="font-extrabold">Price: </span>$40</h1>
                <h1 className="text-left max-w-[235px]"><span className="font-extrabold">Subjects: </span>Calculus 12, Physics 11, Physics 11, Physics 12, mmmmmmmmmmmm mmmmmmmmmmmm mmmmmmmmmmm mmmmmmmmmmmmm</h1>
                <div className="flex justify-center pt-5">
                    <button className="bg-orange-500 flex justify-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Book Tutor</button>
                </div>
            </div>
            <div className="bg-white h-min p-4 flex-shrink-0 rounded p-4 mb-2 mt-2 mr-2 ml-2">
                <div className="bg-black rounded p-4 h-48 w-56 mr-2 ml-2 mt-2 mb-2"></div>
                <h1 className="text-left"><span className="font-extrabold">Name: </span>Joe McDonald</h1>
                <h1 className="text-left"><span className="font-extrabold">Price: </span>$40</h1>
                <h1 className="text-left max-w-[235px]"><span className="font-extrabold">Subjects: </span>Calculus 12, Physics 11, Physics 11, Physics 12, mmmmmmmmmmmm mmmmmmmmmmmm mmmmmmmmmmm mmmmmmmmmmmmm</h1>
                <div className="flex justify-center pt-5">
                    <button className="bg-orange-500 flex justify-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Book Tutor</button>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Index;
import { SetStateAction, useState } from 'react';
import { Link, useLoaderData } from "@remix-run/react";
import NavBar from '~/components/shared/Nav';
import { getUser } from '~/utils/session.server';
import Content from '~/components/shared/Content';
import TutorPage from '../tutor/$tutorId';
import { ErrorBoundaryComponent } from "@remix-run/node";
import type { LoaderArgs, LoaderFunction } from "@remix-run/node";
import TutorCard from '~/components/TutorCard';

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
        <NavBar />
        {/* <h1 className="w-100 text-4xl text-center text-bla font-extrabold mb-4">Tutors Available</h1> */}
        <div className="flex flex-wrap mx-auto">
            <TutorCard/>
            <TutorCard/>
            <TutorCard/>
            <TutorCard/>
        </div>
    </div>
    );
}

export default Index;
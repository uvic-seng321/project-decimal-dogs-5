import { SetStateAction, useState } from 'react';
import { Link, useLoaderData } from "@remix-run/react";
import NavBar from '~/components/shared/Nav';
import { getUser } from '~/utils/session.server';
import Content from '~/components/shared/Content';
import TutorPage from '../tutor/$tutorId';
import { ErrorBoundaryComponent, json, redirect } from "@remix-run/node";
import type { LoaderArgs, LoaderFunction } from "@remix-run/node";
import TutorCard from '~/components/TutorCard';

export const loader = async ({ request }: any) => {
  const user = await getUser(request);
  if (!user) return redirect("/login");
  const tutors = await fetch(`http://127.0.0.1:5000/getTutors`).then(res => res.json())
  return json({
    user, tutors
  })
};

type tutor = {
  email: string;
  name: string;
  tutorID: number;
  price: number;
};

export default function Index() {
  const { user, tutors } = useLoaderData();
    return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-neutral-100 to-orange-100 flex flex-col bg-neutral-100">
        <NavBar />
        <div className="flex items-center justify-center w-full px-1/6 pt-4">
          <div className="grid grid-cols-3 gap-2">
            {tutors.map((tutor: tutor) => {
              console.log("tutor:")
              console.log(tutor)
              return <TutorCard tutor={tutor}/>
            })}
          </div>
        </div>
    </div>
    );
}


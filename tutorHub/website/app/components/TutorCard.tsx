import { Link } from "@remix-run/react";

type tutor = {
    email: string;
    name: string;
    tutorID: number;
    price: number;
  };

export default function TutorCard(props: {tutor: tutor}) {
    const {name, price, tutorID} = props.tutor;
    return (
        <div className="bg-white h-min p-4 flex-shrink-0 rounded p-4 mb-2 mt-2 mr-2 ml-2">
                <div className="bg-black rounded p-4 h-48 w-56 mr-2 ml-2 mt-2 mb-2"></div>
                <h1 className="text-left"><span className="font-extrabold">Name: </span>{name}</h1>
                <h1 className="text-left"><span className="font-extrabold">Price: </span> {price} </h1>
                <h1 className="text-left max-w-[235px]"><span className="font-extrabold">Subjects: </span>Calculus 12, Physics 11, Physics 11, Physics 12</h1>
                <div className="flex justify-center pt-5">
                    <Link to={`/tutor/${tutorID}`} className="bg-orange-500 flex justify-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Book Tutor</Link>
                </div>
            </div>
    )
}
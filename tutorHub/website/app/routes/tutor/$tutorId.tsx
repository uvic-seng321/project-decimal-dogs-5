import { useParams } from "@remix-run/react";


export default function PostRoute() {
    const params = useParams();
    return <div>I am {params.tutorId}</div>
}
  

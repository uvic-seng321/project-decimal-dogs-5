// import { Children } from "react";
import React from "react";
import NavBar from "./Nav";
import { ErrorBoundaryComponent } from "@remix-run/node";

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
    return <div>ERROR: {error.message}</div>;
  };
export default function Content(props: {children: React.ReactNode}) {
    return (
        <div className="w-screen h-screen max-h-screen flex flex-col bg-gradient-to-br from-orange-100 via-neutral-100 to-orange-100">
            <NavBar/>
            {props.children}
        </div>
    )
}
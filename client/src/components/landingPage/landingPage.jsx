import React from "react";
import { Link } from "react-router-dom";

export default function Landing(){
    return (
        <Link to={'/home'}>
         <h1>FOOD</h1>
         <button type="button">Let`s Cook</button>
        </Link>
    )
}
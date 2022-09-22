import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRecipes } from "../../redux/actions";

export default function Landing(){

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchRecipes())
    }, [dispatch]) 

    return (
        <Link to={'/home'}>
         <h1>FOOD</h1>
         <button type="button">Let`s Cook</button>
        </Link>
    )
}
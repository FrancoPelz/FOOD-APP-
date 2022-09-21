import React from "react";
import Order from "../Filter/orderByHs";
import Recipes from "../recipes/recipes";
import SearchBar from "../searchBar/searchBar";
import {NavLink } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <SearchBar/>
          <nav>
            <NavLink to={'/create'}>Create Recipe</NavLink>
          </nav>
          <div>
            <br/>
            <Order/>


          </div>
            <Recipes/> 
        </div>
        
    )
}
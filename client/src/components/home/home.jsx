import React from "react";
import Order from "../order";
import Recipes from "../recipes/recipes";
import SearchBar from "../searchBar/searchBar";
import {NavLink } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <SearchBar/>
          <nav>
            <ul>
                <li>
                   <NavLink to={'/create'}>Create Recipe</NavLink>
                </li>
                <li>
                   <Order/>
                </li>
            </ul>
          </nav>
            <Recipes/> 
        </div>
        
    )
}
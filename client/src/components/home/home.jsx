import React from "react";
import Recipes from "../recipes/recipes";
import SearchBar from "../searchBar/searchBar";
import {NavLink } from "react-router-dom";
import OrderHs from "../flter&order/orderByHs";
import OrderABC from "../flter&order/orderbyABC";
import FilterDiet from "../flter&order/filterDiet";
import FilterType from "../flter&order/filterType";
import { useDispatch } from "react-redux";
import { fetchRecipes } from "../../redux/actions";

export default function Home() {
  const dispatch = useDispatch()

  function handleOnClick(e){
    e.preventDefault();
    dispatch(fetchRecipes())   
    }

    return (
        <div>
          <br/>
          <div>
            <SearchBar/>
            Filters:
            <OrderHs/>
            <OrderABC/>
            <FilterDiet/>
            <FilterType/>
            <button onClick = {e => handleOnClick(e)}> Refresh Recipes</button>
          </div>
          <br/>
          <nav>
            <NavLink to={'/create'}>Create Recipe</NavLink>
          </nav>
            <Recipes/>  
        </div>
        
    )
}
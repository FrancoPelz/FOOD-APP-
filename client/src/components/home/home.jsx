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
import styles from '../home/home.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRotateRight} from '@fortawesome/free-solid-svg-icons'


export default function Home() {
  const dispatch = useDispatch()

  function handleOnClick(e){
    e.preventDefault();
    dispatch(fetchRecipes())   
    }

    return (
        <div className={styles.bkg}>
          <ul className={styles.nav}>
            <li className={styles.title}>Food App</li> 
            <li><SearchBar/></li>
            <li ><NavLink to={'/create'}><button className={styles.createBTN}>Create Recipe</button></NavLink></li>           
          </ul>
          <br/>
          <div className={styles.filter}>
            <OrderHs/>
            <OrderABC/>
            <FilterDiet/>
            <FilterType/>
            <button onClick = {e => handleOnClick(e)} className={styles.RefBTN}></button>
          </div> 
          <br/> 
          <Recipes/>
          <br/>     
        </div>
    )
}
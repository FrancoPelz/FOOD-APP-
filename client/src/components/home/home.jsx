import React, { useEffect, useState } from "react";
import OrderHs from "../flter&order/orderByHs";
import OrderABC from "../flter&order/orderbyABC";
import FilterDiet from "../flter&order/filterDiet";
import FilterType from "../flter&order/filterType";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../../redux/actions";
import styles from '../home/home.module.css'
import SearchBar from "../searchBar/searchBar";
import Pagination from "../pagination/pagination";
import Recipe from "../recipe/recipe";


export default function Home() {
  const recipes = useSelector((state) => state.filteredRecipes) 
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(9)
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(fetchRecipes())
  }, [dispatch]) 
  const max = Math.ceil(recipes.length / perPage)

  function handleOnClick(e){
    e.preventDefault();
    dispatch(fetchRecipes())   
    }

  return (
    <div className={styles.bkg}>
      <ul className={styles.nav}>
        <li className={styles.title}><NavLink to={'/'}>FOOD APP</NavLink></li> 
        <li><SearchBar  setPage={setPage}/></li>
        <li ><NavLink to={'/create'}><button className={styles.createBTN}>Create Recipe</button></NavLink></li>           
      </ul>
      <div className={styles.filter}>
        <OrderHs/>
        <OrderABC/>
        <FilterDiet setPage={setPage}/>
        <FilterType setPage={setPage}/>
        <button onClick = {e => handleOnClick(e)} className={styles.RefBTN}></button>
      </div> 
    <br/> 
    <div className={styles.recipes}>
      {
        recipes.length ?
         recipes
        .slice((page-1) * perPage, (page-1) * perPage + perPage )
        .map(r => 
        <div>  
            <Recipe   
            key={r.id}                           
            id={r.id}
            name={r.name}
            image={r.image}
            diets={r.diets}
            dishTypes={r.dishTypes} 
            />  
        <br/>
        </div>):
        <div>Loading...</div>
      }    
    </div>
    <Pagination page={page} setPage={setPage} max={max}/>
    <br/>     
    </div>
  )
}
import React, { useEffect, useState } from "react";
import OrderHs from "../flter&order/orderByHs";
import OrderABC from "../flter&order/orderbyABC";
import FilterDiet from "../flter&order/filterDiet";
import FilterType from "../flter&order/filterType";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../../redux/actions";
import styles from '../home/home.module.css'
import SearchBar from "../searchBar/searchBar";
import Pagination from "../pagination/pagination";
import Recipe from "../recipe/recipe";
import Loading from "../loading/loading";
import Landing from "../landingPage/landingPage";
import NavBar from "../nav/nav";



export default function Home() {
  const recipes = useSelector((state) => state.filteredRecipes)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(9)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(fetchRecipes())
  }, [dispatch])
  const max = Math.ceil(recipes.length / perPage)


  function handleOnClick() {
    dispatch(fetchRecipes())
  }




  return (
    <React.Fragment>
      <div>
        <NavBar />
        <SearchBar setPage={setPage} />
      </div>
      <div className={styles.content}>
        <article class={styles.main}>
          <div className={styles.navInf}>
            <ul>
              <li><OrderHs /></li>
              <li><OrderABC /></li>
              <li><FilterDiet setPage={setPage} /></li>
              <li><FilterType setPage={setPage} /></li>
              <li><button onClick={() => handleOnClick()} className={styles.RefBTN}>refresh</button></li>
            </ul>
          </div>

          <div className={styles.recipes}>
            {
              recipes.length ?
                recipes
                  .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
                  .map((r, i) =>
                    <div key={i}>
                      <Recipe
                        key={r.id}
                        id={r.id}
                        name={r.name}
                        image={r.image}
                        diets={r.diets}
                        dishTypes={r.dishTypes}
                      />
                      <br />
                    </div>) :
                <Loading />
            }
          </div>
        </article>
        <footer className={styles.footer}>
          <Pagination page={page} setPage={setPage} max={max} />
        </footer>
      </div>
    </React.Fragment>
  )
}
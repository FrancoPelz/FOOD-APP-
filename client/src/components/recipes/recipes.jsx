import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchRecipes} from '../../redux/actions'
import Pagination from "../pagination/pagination";
import Recipe from "../recipe/recipe";
import styles from "../recipes/recipes.module.css"


export default function Recipes(){

    const recipes = useSelector((state) => state.filteredRecipes) 
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(9)

    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(fetchRecipes())
    }, [dispatch]) 

    const max = Math.ceil(recipes.length / perPage)

    return (
        <div>
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
        </div>
    )
}
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchRecipes} from '../../redux/actions'
import Pagination from "../pagination/pagination";
import Recipe from "../recipe/recipe";


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
            {
                recipes && recipes
                .slice((page-1) * perPage, (page-1) * perPage + perPage )
                .map(r => 
                <div key ={r.id}>  
                    <Recipe                              
                    id={r.id}
                    name={r.name}
                    image={r.image}
                    diets={r.diets}
                    dishTypes={r.dishTypes} 
                    />  
                <br/>
                </div>)
            } 
            <Pagination page={page} setPage={setPage} max={max}/>
        </div>
            
        
    )
}
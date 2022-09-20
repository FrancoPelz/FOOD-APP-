import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchRecipes} from '../../redux/actions'
import Recipe from "../recipe/recipe";

export default function Recipes(){

    let recipes = useSelector((state) => state.filteredRecipes) 
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchRecipes())
    }, []) 

    
    return (
        <div>
            {
                recipes && recipes.map(r => 
                <div>  
                    <Recipe              
                    id = {r.id}
                    name={r.name}
                    image={r.image}
                    diets={r.diets}
                    />  
                <br/>
                </div>) 
            }
        </div>
    )
}
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"

export default function Recipe() {

    const [recipe, setRecipe] = useState(null)
    let {id} = useParams()
    useEffect(()=> {
        axios.get(`http://localhost:3001/api/recipes/${id}`)
        .then((response) => {
            setRecipe(response.data)
        })
        return () => {
            setRecipe(null)
        } 
    }, []) 



    return <div>
        {
            recipe?
            <>

            <h3>{recipe.name}</h3>
            <img src={recipe.image} alt='imagen'/>
            <div>Health Score: {recipe.healthScore}</div>
            <div>
            <h5>Type of Diet</h5>
            { recipe.diets? 
            <p>{recipe.diets.map(d => <h5>{d}</h5>)}</p> : 
            <p>No type of diets specified</p>
            }
            <h5>Type of Dish</h5>
            { recipe.types? 
            <p>{recipe.types.map(t => <h5>{t}</h5>)}</p> : 
            <p>No dish type specified</p>
            }
            </div>
            <h5>Summary</h5>
            <p>{recipe.summary}</p>
            <h5>How to prepare:</h5>
            <p>{recipe.steps}</p>

            </> : 
            <div>loading...</div>
        }
    </div>
}
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
            </> : 
            <div>loading...</div>
        }
    </div>
}
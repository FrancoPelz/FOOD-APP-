import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import styles from '../recipeDetail/recipeDetail.module.css'

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
    }, [id]) 



    return (
        <div className={styles.bkg}>
        <div className={styles.backBTN1}>
        <Link to={'/home'}>
            <button className={styles.backBTN}></button>          
        </Link>
        </div>
        {
            recipe?
            <div>
              <h3 className={styles.title}>{recipe.name}</h3>
              
              <div className={styles.diseño} key={recipe.id}>
  
                <div className={styles.izq}>   
                  <img className={styles.img} src={recipe.image} alt='imagen'/>
                  <div>Health Score: {recipe.healthScore}</div>
                  <h5 className={styles.subtitle}>Type of Diet</h5>
                  { recipe.diets.length? 
                  <ul className={styles.dietsTypes}>{recipe.diets.map(d => <li>{d}</li>)}</ul> : 
                  <span>No type of diets specified</span>
                  }
                  <h5 className={styles.subtitle}>Type of Dish</h5>
                  { recipe.types.length? 
                  <ul className={styles.dietsTypes}>{recipe.types.map(t => <li>{t}</li>)}</ul> : 
                  <span>No dish type specified</span>
                  }
                </div>
    
                <div className={styles.der}>           
                  <h5 className={styles.subtitle}>Summary:</h5>
                  <p>{recipe.summary.replace(/<[^>]*>?/g, "")}</p>
                  <h5 className={styles.subtitle}>How to prepare:</h5>
                  <p>{recipe.steps}</p>
                </div>
                
              </div>
            </div> : 
            <div>loading...</div>
        }
    </div>)
}
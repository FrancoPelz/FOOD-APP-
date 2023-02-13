import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from "../loading/loading"
import NavBar from "../nav/nav"
import styles from '../recipeDetail/recipeDetail.module.css'

export default function Recipe() {

  const [recipe, setRecipe] = useState("")
  let { id } = useParams()
  useEffect(() => {
    axios.get(`http://localhost:3001/api/recipes/${id}`)
      .then((response) => {
        setRecipe(response.data)
      })
    return () => {
      setRecipe("")
    }
  }, [id])




  return (
    <React.Fragment>
      <div>
        <NavBar />
      </div>
      <div className={styles.bkg}>
        {
          recipe ?
            <div className={styles.container} key={recipe.id}>

              <h3 className={styles.title}>{recipe.name}</h3>

              <div className={styles.imgScore}>
                <img className={styles.img} src={recipe.image} alt='imagen' />
                <p>Health Score: <strong>{recipe.healthScore}</strong> </p>
              </div>

              <div className={styles.dietType}>
                <h5 className={styles.subtitle}>Type of Diet</h5>
                {recipe.diets.length ?
                  <ul className={styles.dietsTypes}>{recipe.diets.map(d => <li><strong>{d}</strong></li>)}</ul> :
                  <span>No type of diets specified</span>
                }
              </div>

              <div className={styles.dishType}>
                <h5 className={styles.subtitle}>Type of Dish</h5>
                {recipe.types.length ?
                  <ul className={styles.dietsTypes}>{recipe.types.map(t => <li><strong>{t}</strong></li>)}</ul> :
                  <span>No dish type specified</span>
                }
              </div>

              <div className={styles.summary}>
                <h5 className={styles.subtitle}>Summary:</h5>
                <p>{recipe.summary.replace(/<[^>]*>?/g, "")}</p>
              </div>

              <div className={styles.steps}>
                <h5 className={styles.subtitle}>How to prepare:</h5>
                {recipe.steps !== null ?
                  <p>{recipe.steps.replace(/<[^>]*>?/g, "")}</p> 
                  :<span>There aren´t steps to show</span>
                }
              </div>

            </div> :

            <div className={styles.loading}>
              <Loading />
            </div>
        }
      </div>
    </React.Fragment>)
}
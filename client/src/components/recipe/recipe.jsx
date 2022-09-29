import { Link } from "react-router-dom";
import styles from "../recipe/recipe.module.css"

export default function Recipe({id, name, image, diets} ) {
    return( 

      <Link to={`recipes/${id}`}>
      <div className={styles.container} key={id}>        
          <img className={styles.img} src={image} alt='imagen'/>  
          <h2 className={styles.title}>{name}</h2>        
          <div className={styles.diets}>{diets.map(d => <h5>{d}</h5>)}</div>
      </div>
      </Link>
      
      
      
      )
}
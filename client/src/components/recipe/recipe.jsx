import { Link } from "react-router-dom";

export default function Recipe({id, name, image, diets} ) {
    return( 
      <div>
          <Link to={`recipes/${id}`}>
            <h3>{name}</h3>
            <img src={image} alt='imagen'/>           
          </Link>
          <div>{diets.map(d => <h5>{d}</h5>)}</div>
      </div>)
}
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDiets, getDishTypes, postRecipes } from "../../redux/actions";
import styles from '../createRecipe/createRecipe.module.css'

function validate(input){
    let error = {};
    if(!input.name) error.name = 'Title is required!';
    if(!input.summary) error.summary = 'Please write a summary for your recipe!';
    if(input.diets.length === 0 ||input.dishTypes.length === 0) error.dietsTypes = 'Select at least one type and one diet!';
    if (!/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%+.~#()?&//=]*)/.test(input.image))
        error.image = "The image must be a valid url"
    return error
}



export default function AddRecipe() {

    const dispatch = useDispatch();
    let listDiets = useSelector((state) => state.diets)
    let listDishTypes = useSelector((state) => state.dishTypes)

    useEffect(() => {
        dispatch(getDiets());
        dispatch(getDishTypes());
    },[dispatch]) 

    
    
    const [error, setError] = useState('');
    
    const [checkedStateD, setCheckedStateD] = useState(
        new Array(10).fill(false)
    );
    const [checkedStateT, setCheckedStateT] = useState(
       new Array(23).fill(false)
       );

       
       
       
    const[input,setInput] = useState({
        name:'', 
        summary:'', 
        steps:'', 
        healthScore:'',
        steps:'',
        image:'',
        diets: [],
        dishTypes: []
    });

    let handleChange = (e) =>{
        e.preventDefault();
        setInput({
            ...input, 
            [e.target.name] : e.target.value
        });
        setError(
            validate({
              ...input,
              [e.target.name]: e.target.value,
            })
          );
    };

    let handleSelectDiet = (position) => {
        let updatedCheckedState = checkedStateD.map((item, index) =>
        index === position ? !item : item
        );

        setCheckedStateD(updatedCheckedState);
        let checkedDiets=[]
        for (let i = 0; i < updatedCheckedState.length; i++) {
            if(updatedCheckedState[i] === true) 
            checkedDiets.push(listDiets[i])  
        }    
        setInput({
            ...input,
            diets: checkedDiets,
        })
    }


    let handleSelectType = (position) => {
        let updatedCheckedState = checkedStateT.map((item, index) =>
        index === position ? !item : item
        );
        setCheckedStateT(updatedCheckedState);

        let checkedTypes=[]
        for (let i = 0; i < updatedCheckedState.length; i++) {
            if(updatedCheckedState[i] === true) 
            checkedTypes.push(listDishTypes[i])  
        }
        
        setInput({
            ...input,
            dishTypes: checkedTypes,
        })
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postRecipes(input));       
        setInput({
            name:'', 
            summary:'', 
            steps:'', 
            healthScore:'',
            steps:'',
            img:'',
            diets: [],
            dishTypes: []
        });
        setCheckedStateD(new Array(10).fill(false));
        setCheckedStateT(new Array(23).fill(false));
    }


    return (
        <div className={styles.bkg}>
        <div className={styles.bkg2}>   
          <div className={styles.backBTN1}> 
          <Link to={'/home'}>
          <button className={styles.backBTN}></button>          
          </Link>
          </div>
          <form onSubmit={(e) => {handleSubmit(e)}}>
              <div>
              <h2>Create your Recipe! </h2>
              </div>      
              <p>Complete the following form to add recipe</p>
              <div>
                <label>Title: </label>
                <input onChange={(e) => handleChange(e)} name='name' type="text" value={input.name}/>
                { error.name && (
                          <div className={styles.danger}>{error.name}</div>
                  )}
              </div>
              <p>Summary:<textarea onChange={(e) => handleChange(e)} name="summary" rows="5" cols="50"  placeholder="Wtite a short summary:" value={input.summary}/></p>
              { error.summary && (
                          <div className={styles.danger}>{error.summary}</div>
                  )}
              <p>Pleace, select one or more of each type:</p>
  
              <div className={styles.check}> 
  
              <div className={styles.diets1}>
              <p>Diets</p>
                  {listDiets.map((d,index) => {
                      return(
                      <div className={styles.diets}> 
                      <input 
                      onChange={() => handleSelectDiet(index)} 
                      checked={checkedStateD[index]}
                      type={"checkbox"} name={d} id={index} value={d} />
                      <label htmlFor={index}>{d}</label>
                      </div>
                      )
                  })}
          
              </div>
  
              <div className={styles.types1}>   
              <p>DishTypes</p>
                  {listDishTypes.map((t,index) => {
                          return(
                          <div className={styles.types}> 
                          <input 
                          onChange={() => handleSelectType(index)} 
                          checked={checkedStateT[index]}
                          type={"checkbox"} name={t} id={index + 100} value={t} />
                          <label htmlFor={index + 100 }>{t}</label>
                          </div>
                          )
                      })}
              </div>
              </div>
              { error.dietsTypes && (
                          <div className={styles.danger}>{error.dietsTypes}</div>
                  )} 
  
              <p>Health Score:<input onChange={(e) => handleChange(e)} type="range" min="0" max="100" step="10" name="healthScore"/></p>
              <p>Instructions:<textarea onChange={(e) => handleChange(e)} name="steps" rows="5" cols="50"  placeholder="Step by step" value={input.steps}/></p>
              <div>
              <label>Image url:</label>
              <input onChange={(e) => handleChange(e)} type="text" name="image" placeholder="https://example.com"  />
              </div>
              { error.image && (
                          <div className={styles.danger}>{error.image}</div>
                  )}
              <br/>
              {error.hasOwnProperty('name') || error.hasOwnProperty('summary') || error.hasOwnProperty('dietsTypes') || error.hasOwnProperty('image')?  <div className={styles.danger}> Please fill required inputs to create your recipe</div> :
              <input className={styles.createBTN} type="submit" value="Create!"/>}
          </form>
        </div>
        </div> 
   )

}
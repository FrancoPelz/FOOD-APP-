import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getDiets, getDishTypes, postRecipes } from "../../redux/actions";

function validate(input){
    let error = {};
    if(!input.name) error.name = 'Title is required';
    if(!input.summary) error.summary = 'Please put a summary of your recipe';
    if(!input.diets) error.diets = 'Select at least one type of diet';
    if(!input.dishTypes) error.dishTypes = 'Select at least one type of dish';
    return error
}


export default function AddRecipe() {
    const dispatch = useDispatch();
    let listDiets = useSelector((state) => state.diets)
    let listDishTypes = useSelector((state) => state.dishTypes)

    const [error, setError] = useState('');

    const [checkedStateD, setCheckedStateD] = useState(
        new Array(11).fill(false)
    );
    const [checkedStateT, setCheckedStateT] = useState(
        new Array(14).fill(false)
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

    


    useEffect(() => {
        dispatch(getDiets());
        dispatch(getDishTypes());
    },[]) 

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
        setCheckedStateD(new Array(11).fill(false));
        setCheckedStateT(new Array(14).fill(false));
    }


    return (
        <form onSubmit={(e) => {handleSubmit(e)}}>
            <h2>Create your Recipe!</h2>
            <p>Complete the following form to add recipe</p>
            <div>
              <label>Title: </label>
              <input onChange={(e) => handleChange(e)} name='name' type="text" value={input.name}/>
              { error.name && (
                        <p>{error.name}</p>
                )}
            </div>
            <p>Summary:<textarea onChange={(e) => handleChange(e)} name="summary" rows="5" cols="50"  placeholder="Wtite a short summary:" value={input.summary}/></p>
            { error.summary && (
                        <p>{error.summary}</p>
                )}
            <p>Pleace, select one or more of each type:</p>
            <p>Diets</p>
                {listDiets.map((d,index) => {
                    return(
                    <div> 
                    <input 
                    onChange={() => handleSelectDiet(index)} 
                    checked={checkedStateD[index]}
                    type={"checkbox"} name={d} id={index} value={d} />
                    <label htmlFor={index}>{d}</label>
                    </div>
                    )
                })}
                { error.diets && (
                        <p>{error.diets}</p>
                )}

            <p>DishTypes</p> 
                {listDishTypes.map((t,index) => {
                        return(
                        <div> 
                        <input 
                        onChange={() => handleSelectType(index)} 
                        checked={checkedStateT[index]}
                        type={"checkbox"} name={t} id={index + 11} value={t} />
                        <label htmlFor={index + 11 }>{t}</label>
                        </div>
                        )
                    })}
                    { error.dishTypes && (
                        <p>{error.dishTypes}</p>
                )}

            <p>Health Score:<input onChange={(e) => handleChange(e)} type="range" min="0" max="100" step="10" name="healthScore"/></p>
            <p>Instructions:<textarea onChange={(e) => handleChange(e)} name="steps" rows="5" cols="50"  placeholder="Step by step" value={input.steps}/></p>
            <div>
            <label>Image url:</label>
            <input onChange={(e) => handleChange(e)} type="text" name="image" placeholder="https://example.com"  />
            </div>
            <br/>
            {error.hasOwnProperty('name') || error.hasOwnProperty('summary') || error.hasOwnProperty('diets') || error.hasOwnProperty('dishTypes')?  <p> Please fill required inputs to create your recipe</p> :
            <input type="submit" value="Create!"/>}
        </form> 
   )

}
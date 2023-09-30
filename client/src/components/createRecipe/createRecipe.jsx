import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getDiets, getDishTypes, postRecipes } from "../../redux/actions";
import styles from '../createRecipe/createRecipe.module.css'
import NavBar from "../nav/nav";


function validate(input) {
    let error = {};
    if (!input.name) error.name = 'Title is required!';
    if (!input.summary) error.summary = 'Please write a summary for your recipe!';
    if (input.diets.length === 0 || input.dishTypes.length === 0) error.dietsTypes = 'Select at least one type and one diet!';
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
    }, [dispatch])



    const [error, setError] = useState('');

    const [checkedStateD, setCheckedStateD] = useState(
        new Array(11).fill(false)
    );
    const [checkedStateT, setCheckedStateT] = useState(
        new Array(23).fill(false)
    );




    const [input, setInput] = useState({
        name: '',
        summary: '',
        steps: '',
        healthScore: '',
        steps: '',
        image: '',
        diets: [],
        dishTypes: []
    });

    let handleChange = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
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
        let checkedDiets = []
        for (let i = 0; i < updatedCheckedState.length; i++) {
            if (updatedCheckedState[i] === true)
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

        let checkedTypes = []
        for (let i = 0; i < updatedCheckedState.length; i++) {
            if (updatedCheckedState[i] === true)
                checkedTypes.push(listDishTypes[i])
        }

        setInput({
            ...input,
            dishTypes: checkedTypes,
        })
    }

    let handleSubmit = (e) => {
        console.log ("si funciona")
        e.preventDefault();
        dispatch(postRecipes(input));
        setInput({
            name: '',
            summary: '',
            steps: '',
            healthScore: '',
            steps: '',
            image: '',
            diets: [],
            dishTypes: []
        });
        setCheckedStateD(new Array(10).fill(false));
        setCheckedStateT(new Array(23).fill(false));
    }


    return (
        <React.Fragment>
            <div>
                <NavBar />
            </div>
            <div className={styles.backgorund}>
                <div className={styles.container}>

                    <form className={styles.form}>

                        <div className={styles.titles}>
                            <h2>Create your Recipe! </h2>
                            <p>Complete the following form to add your recipe</p>
                        </div>


                        <div className={styles.title}>
                            <div>
                                <label for="read">Title: </label>
                                <input className={styles.form_input} onChange={(e) => handleChange(e)}
                                    name='name' type="text" value={input.name} />
                            </div>
                            {error.name && (
                                <div className={styles.danger}>{error.name}</div>
                            )}
                        </div>

                        <div className={styles.img}>
                            <div>
                                <label>Image url:</label>
                                <input onChange={(e) => handleChange(e)} type="url"
                                    name="image" placeholder="https://example.com"
                                    value={input.image}
                                    className={styles.form_input} />
                            </div>
                            {error.image && (
                                <div className={styles.danger}>{error.image}</div>
                            )}
                        </div>

                        <div className={styles.hs}>
                            <p>Health Score:</p>
                            <input onChange={(e) => handleChange(e)}
                                className={styles.form_input}
                                type="range" min="0" max="100" step="10" name="healthScore" />
                        </div>

                        <p>Pleace, select one or more of each type:</p>
                        <div className={styles.checks}>
                            <div className={styles.diets}>
                                <p>Diets</p>
                                <div className={styles.diets_check}>
                                    {listDiets.map((d, index) => {
                                        return (
                                            <div >
                                                <input
                                                    onChange={() => handleSelectDiet(index)}
                                                    checked={checkedStateD[index]}
                                                    type={"checkbox"} name={d} id={index} value={d} />
                                                <label htmlFor={index}>{d}</label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className={styles.types}>
                                <p>DishTypes</p>
                                <div className={styles.types_check}>
                                    {listDishTypes.map((t, index) => {
                                        return (
                                            <div>
                                                <input
                                                    onChange={() => handleSelectType(index)}
                                                    checked={checkedStateT[index]}
                                                    type={"checkbox"} name={t} id={index + 100} value={t} />
                                                <label htmlFor={index + 100}>{t}</label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className={styles.checksError}>
                            {error.dietsTypes && (
                                <div className={styles.danger}>{error.dietsTypes}</div>
                            )}
                        </div>


                        <div className={styles.summary}>
                            <div>
                                <p>Summary:</p>
                                <textarea onChange={(e) => handleChange(e)}
                                    name="summary" rows="5" cols="50" placeholder="Write a short summary:"
                                    value={input.summary}
                                    className={styles.form_input} />
                            </div>
                            {error.summary && (
                                <div className={styles.danger}>{error.summary}</div>
                            )}
                        </div>

                        <div className={styles.steps}>
                            <p>Instructions:</p>
                            <textarea onChange={(e) => handleChange(e)}
                                name="steps" rows="5" cols="50" placeholder="Step by step"
                                value={input.steps}
                                className={styles.form_input} />
                        </div>
                    </form>

                    <div className={styles.btn}  onClick={(e) => { handleSubmit(e) }}>
                        {error.hasOwnProperty('name') || error.hasOwnProperty('summary') || error.hasOwnProperty('dietsTypes') || error.hasOwnProperty('image') ?
                            <div className={styles.danger}> Please fill required inputs to create your recipe</div> :
                            <input className={styles.create} type="submit" value="Create" />}
                    </div>


                </div>
            </div>
        </React.Fragment >
    )

}
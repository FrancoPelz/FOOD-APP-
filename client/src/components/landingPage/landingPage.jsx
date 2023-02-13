import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchRecipes } from "../../redux/actions";
import styles from './landingPage.module.css'

export default function Landing() {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchRecipes())
    }, [dispatch])

    return (
        <div className={styles.bkg}>
            <div className={styles.title}>FOOD APP</div>
            <div className={styles.subtitle}>Create and search your favorite recipes!</div>
            <a href="#menu" >
                <button  className={styles.btn} type="button">Let`s Cook</button>
            </a>
        </div>
    )
}
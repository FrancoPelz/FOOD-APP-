import React from "react";
import styles from '../nav/navBar.module.css'


export default function NavBar() {
    return (
        <React.Fragment>

            <div className={styles.container}>
                <nav>
                    <a><h2 className={styles.title}>FOOD APP</h2></a>
                    <a href="/"><h4>Home</h4></a>
                    <a href="/create"><h4>Create</h4></a>
                </nav>
            </div>

        </React.Fragment>


    )


}
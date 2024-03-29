import React from "react";
import { useModal } from "../../hooks/useModal";
import styles from '../nav/navBar.module.css'
import { useHistory } from "react-router-dom";

export default function NavBar() {
    let history = useHistory();

    function HomeHandle() {
        history.push("/")
    }

    const [isOpenModalSearch, openModalSearch, closeModalSearch] = useModal(false);
    const [isOpenModalFilters, openModalFilters, closeModalfilters] = useModal(false);

    return (
        <React.Fragment>

            <div className={styles.container}>
                <nav>
                    <a>
                        <div className={styles.logo_container}>
                            <h2 className={styles.title}>FOOD</h2>
                            <div className={styles.logo}></div>
                            <h2 className={styles.title}>APP</h2>
                        </div>
                        <p>by Franco Pelaez</p>
                    </a>
                    <a>
                        <button className={styles.homeBTN} onClick={() => HomeHandle()}><h4>Home</h4></button>
                    </a>
                    <a href="/create"><h4>Create</h4></a>
                </nav>
            </div >

        </React.Fragment >


    )


}
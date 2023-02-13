import React from "react";
import { useModal } from "../../hooks/useModal";
import Modal from "../modal/Modal";
import styles from '../modals/modals.module.css'
import FilterModal from "./filterModal";
import SearchModal from "./searchModal";

export default function Modals() {

    const [isOpenModalSearch, openModalSearch, closeModalSearch] = useModal(false);
    const [isOpenModalFilters, openModalFilters, closeModalfilters] = useModal(false);

    return (
        <React.Fragment>
            <div className={styles.container}>
                <div className={styles.modals}>
                    <div className={styles.modalSearch}>
                        <button onClick={openModalSearch}>search</button>
                        <Modal isOpen={isOpenModalSearch} closeModal={closeModalSearch}>
                            <SearchModal closeModal={closeModalSearch}/>
                        </Modal>
                    </div>
                    <div className={styles.modalFilters}>
                        <button onClick={openModalFilters} >filters</button>
                        <Modal isOpen={isOpenModalFilters} closeModal={closeModalfilters}>
                            <FilterModal closeModal={closeModalfilters}/>
                        </Modal>
                    </div>
                </div>
            </div>
        </React.Fragment>


    )


}
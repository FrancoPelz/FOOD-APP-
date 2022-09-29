import React from "react";
import styles from '../pagination/pagination.module.css'


export default function Pagination({page, setPage, max}) {
    const nextPage = () => {
        setPage(parseInt(page) + 1);
    };

    const previusPage = () => {
        setPage(parseInt(page) - 1);
    };

    return (
        <div className={styles.pages}>
            <button className={styles.prevBTN} onClick={previusPage} disabled={page === 1}></button>
              <div className={styles.pageN}>{page} - {max}</div>
            <button  className={styles.nextBTN} onClick={nextPage} disabled={page === max}></button>
        </div>
    )
}
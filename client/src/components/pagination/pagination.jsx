import React from "react";


export default function Pagination({page, setPage, max}) {
    const nextPage = () => {
        setPage(parseInt(page) + 1);
    };

    const previusPage = () => {
        setPage(parseInt(page) - 1);
    };

    return (
        <div>
            <button onClick={previusPage} disabled={page===1 || page<1}>X</button>
            <p>{page}</p>
            <p>de {max}</p>
            <button onClick={nextPage} disabled={page === max}>X</button>
        </div>
    )
}
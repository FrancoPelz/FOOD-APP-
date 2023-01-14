import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchRecipes } from '../../redux/actions';
import styles from '../searchBar/searchBar.module.css'

export default function SearchBar({ setPage }) {
    const [search, setSearch] = useState('')

    let dispatch = useDispatch()

    function onSubmit(e) {
        e.preventDefault();
        dispatch(searchRecipes(search));
        setSearch('');
        setPage(1);
    }


    function onInputChange(e) {
        e.preventDefault();
        setSearch(e.target.value);
    }


    return (
        <div>
            <form  onSubmit={(e) => { onSubmit(e) }}>
                <div className={styles.search}>
                    <input className={styles.input} type='search' onChange={onInputChange} value={search} placeholder="What are you looking for?" />
                    <button className={styles.btn} type='submit'>search</button>
                </div>
            </form>
        </div>
    )
}
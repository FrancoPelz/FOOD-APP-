import {useState} from 'react';
import { useDispatch } from 'react-redux';
import { searchRecipes } from '../../redux/actions';
import styles from '../searchBar/searchBar.module.css'

export default function SearchBar() {
    const[search ,setSearch] = useState('')

    let dispatch = useDispatch()

    function onSubmit(e){
        e.preventDefault();
        dispatch(searchRecipes(search));
        setSearch('');
    }


    function onInputChange(e){
        e.preventDefault();
        setSearch(e.target.value);  
    }

    
    return (
        <div>
            <form className={styles.search} onSubmit={(e) => {onSubmit(e)}}>
              <input className={styles.input} type='text' onChange={onInputChange} value={search} placeholder="What are you looking for?"/> 
              <button  className={styles.btn}><input type='submit' hidden value=""/></button>
            </form>
        </div>
    )
}
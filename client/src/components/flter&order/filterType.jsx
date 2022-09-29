import React from "react";
import { useDispatch } from "react-redux"
import { filterByType} from "../../redux/actions"
import styles from '../flter&order/filter&order.module.css'

export default function FilterType(){

    const dispatch = useDispatch()
    
    function handleFilter(e) {
        dispatch(filterByType(e.target.value))
    }

    return (
        <select onChange={e => handleFilter(e)} className={styles.filters}>
            <option value="all">All Dishes</option>
            <option value="main course">Main Course</option>
            <option value="main dish">Main Dish</option>
            <option value="side dish">Side Dish</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="morning meal">Morning Meal</option>
            <option value="salad">Salad</option>
            <option value="brunch">Brunch</option>
            <option value="breakfast">Breakfast</option>
            <option value="soup">Soup</option>
            <option value="condiment">Condiment</option>
            <option value="sauce">Sauce</option>
            <option value="dip">Dip</option>
            <option value="spread">Spread</option>
            <option value="appetizer">Appetizer</option>
            <option value="drink">Drink</option>
            <option value="snack">Snack</option>
            <option value="fingerfood">Fingerfood</option>
            <option value="marinade">Marinade</option>
            <option value="beverage">Beverage</option>
            <option value="bread">Bread</option>
            <option value="dessert">Dessert</option>
        </select>
    )
} 
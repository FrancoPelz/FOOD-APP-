import React from "react";
import { useDispatch } from "react-redux"
import { orderByABC} from "../../redux/actions"
import styles from '../flter&order/filter&order.module.css'

export default function OrderABC(){

    const dispatch = useDispatch()
    
    function onSelectChange(e) {
        dispatch(orderByABC(e.target.value))
    }

    return (
        <select  onChange={onSelectChange} className={styles.filters}>
            <option hidden >A-Z</option>
            <option value={"atoz"}>A-Z</option>
            <option value={"ztoa"}>Z-A</option>
        </select>
    )
}
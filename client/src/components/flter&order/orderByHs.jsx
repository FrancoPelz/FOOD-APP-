import React from "react";
import { useDispatch } from "react-redux"
import { orderByHealthScore} from "../../redux/actions"
import styles from '../flter&order/filter&order.module.css'


export default function OrderHs(){

    const dispatch = useDispatch()
    
    function onSelectChange(e) {
        dispatch(orderByHealthScore(e.target.value))
    }

    return (
        
            <select  onChange={onSelectChange} className={styles.filters}>
                <option hidden>Max-Min</option>
                <option value={"ascendent"}>Max-Min</option>
                <option value={"descendet"}>Min-Max</option>
            </select>
            
        
    )
}
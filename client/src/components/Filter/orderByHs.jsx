import React from "react";
import { useDispatch } from "react-redux"
import { orderByHealthScore} from "../../redux/actions"


export default function Order(){

    const dispatch = useDispatch()
    
    function onSelectChange(e) {
        dispatch(orderByHealthScore(e.target.value))
    }

    return (
        <select  onChange={onSelectChange}>
            <option value={"ascendent"}>ascendete</option>
            <option value={"descendet"}>descedente</option>
        </select>
    )
}
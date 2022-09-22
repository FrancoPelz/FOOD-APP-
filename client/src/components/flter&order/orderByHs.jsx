import React from "react";
import { useDispatch } from "react-redux"
import { orderByHealthScore} from "../../redux/actions"


export default function OrderHs(){

    const dispatch = useDispatch()
    
    function onSelectChange(e) {
        dispatch(orderByHealthScore(e.target.value))
    }

    return (
        
            <select  onChange={onSelectChange}>
                <option value={"ascendent"}>Max-Min</option>
                <option value={"descendet"}>Min-Max</option>
            </select>
            
        
    )
}
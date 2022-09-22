import React from "react";
import { useDispatch } from "react-redux"
import { orderByABC} from "../../redux/actions"

export default function OrderABC(){

    const dispatch = useDispatch()
    
    function onSelectChange(e) {
        dispatch(orderByABC(e.target.value))
    }

    return (
        <select  onChange={onSelectChange}>
            <option value={"atoz"}>A-Z</option>
            <option value={"ztoa"}>Z-A</option>
        </select>
    )
}
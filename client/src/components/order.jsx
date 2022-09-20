import { useDispatch } from "react-redux"
import { ASCENDENT, DESCENDENT } from "../constants/sort"
import { sortByHealthScore} from "../redux/actions"


export default function Order(){

    const dispatch = useDispatch()
    function onSelectChange(e) {
        dispatch(sortByHealthScore(e.target.value))
    }

    return (
        <select name="select" onChange={onSelectChange}>
            <option value={ASCENDENT}>ascendete</option>
            <option value={DESCENDENT}>descedente</option>
        </select>
    )
}
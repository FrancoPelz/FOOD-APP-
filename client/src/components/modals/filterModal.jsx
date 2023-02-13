import React, { useEffect} from "react";
import OrderHs from "../flter&order/orderByHs";
import OrderABC from "../flter&order/orderbyABC";
import FilterDiet from "../flter&order/filterDiet";
import FilterType from "../flter&order/filterType";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../../redux/actions";
import styles from '../modals/filterModal.module.css'




export default function FilterModal({closeModal}) {
  const dispatch = useDispatch()
  const recipes = useSelector((state) => state.filteredRecipes)


  useEffect(() => {
    dispatch(fetchRecipes())
  }, [dispatch])


  function handleOnClick() {
    dispatch(fetchRecipes());
    closeModal();
  }


  return (
    <React.Fragment>
          <div className={styles.container}>
            <ul>
              <li><OrderHs closeModal={closeModal}/></li>
              <li><OrderABC closeModal={closeModal}/></li>
              <li><FilterDiet closeModal={closeModal}/></li>
              <li><FilterType closeModal={closeModal} /></li>
              <li><button onClick={() => handleOnClick()} className={styles.RefBTN}>refresh</button></li>
            </ul>
          </div>
    </React.Fragment>
  )
}
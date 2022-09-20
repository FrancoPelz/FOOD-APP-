import { ASCENDENT, DESCENDENT } from "../../constants/sort";
import { FETCH_RECIPES, SEARCH_RECIPES, SORT_BY_HEALTH_SCORE, POST_RECIPE, GET_TYPE_DIETS, GET_DISH_TYPES } from "../actions";

const initiaState = {
    recipes  : [],
    filteredRecipes: [],
    diets: [],
    dishTypes: []
};

export default function rootReducer(state = initiaState, action  ) {

    switch(action.type) {
        case FETCH_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                filteredRecipes: action.payload
            }

        case SEARCH_RECIPES:
            return {
                ...state,
                filteredRecipes: action.payload
            }   

        case SORT_BY_HEALTH_SCORE:// esta nos e que ordena
            let orderedRecipes = [...state.recipes]
            orderedRecipes = orderedRecipes.sort((a,b) => {
                if (a.name < b.name){
                    return action.payload === ASCENDENT ? -1  : 1;
                }
                if (a.name > b.name){
                    return action.payload === DESCENDENT ? 1 : -1 ;
                }
                return 0;
            })
            return {
                ...state,
                filteredRecipes: orderedRecipes
            } 

        case POST_RECIPE:
            return{
                ...state,
                recipes:[state.recipes]
            }



        case GET_TYPE_DIETS:
            return {
                ...state,
                diets : action.payload
            }
            
        case GET_DISH_TYPES:
            return {
                ...state,
                dishTypes : action.payload
            }       

        default:
            return state
    };
};
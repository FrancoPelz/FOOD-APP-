import { FETCH_RECIPES, SEARCH_RECIPES, ORDER_BY_HEALTH_SCORE, POST_RECIPE, GET_TYPE_DIETS, GET_DISH_TYPES } from "../actions";

const initiaState = {
    recipes  : [],
    filteredRecipes: [],
    diets: [],
    dishTypes: []
};


export default function rootReducer(state = initiaState, action  ) {

    switch(action.type) {
        case FETCH_RECIPES:
            console.log()
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


        case ORDER_BY_HEALTH_SCORE:
            let orderedRecipes = [...state.recipes]
            orderedRecipes = 
              action.payload === 'ascendent' ? 
              orderedRecipes.sort((a,b) => {
                  if (a.healthScore < b.healthScore) return -1; 
                  if (a.healthScore > b.healthScore) return 1;
                  return 0;
            }) :
              orderedRecipes.sort((a,b) => {
                  if (a.healthScore < b.healthScore) return 1; 
                  if (a.healthScore > b.healthScore) return -1;
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
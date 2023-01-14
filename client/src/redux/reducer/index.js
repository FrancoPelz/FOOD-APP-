import { FETCH_RECIPES, SEARCH_RECIPES, ORDER_BY_HEALTH_SCORE, POST_RECIPE, GET_TYPE_DIETS, GET_DISH_TYPES, ORDER_BY_ABC, FILTER_BY_DIET, FILTER_BY_TYPE } from "../actions";

const initiaState = {
    recipes: [],
    filteredRecipes: [],
    diets: [],
    dishTypes: []
};


export default function rootReducer(state = initiaState, action) {

    switch (action.type) {
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


        case ORDER_BY_HEALTH_SCORE:
            let orderedRecipes = [...state.filteredRecipes]
            orderedRecipes =
                action.payload === 'ascendent' ?
                    orderedRecipes.sort((a, b) => {
                        if (a.healthScore < b.healthScore) return -1;
                        if (a.healthScore > b.healthScore) return 1;
                        return 0;
                    }) :
                    orderedRecipes.sort((a, b) => {
                        if (a.healthScore < b.healthScore) return 1;
                        if (a.healthScore > b.healthScore) return -1;
                        return 0;
                    })
            return {
                ...state,
                filteredRecipes: orderedRecipes
            }

        case ORDER_BY_ABC:
            let orderedABC = [...state.filteredRecipes]
            orderedABC =
                action.payload === 'atoz' ?
                    orderedABC.sort((a, b) => {
                        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                        return 0;
                    }) :
                    orderedABC.sort((a, b) => {
                        if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                        if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                        return 0;
                    })
            return {
                ...state,
                filteredRecipes: orderedABC
            }

        case FILTER_BY_DIET:
            const allrecipes = state.recipes
            const dietFiltered = action.payload === 'all' ? allrecipes :
                allrecipes.filter(t => t.diets.find(e => e === action.payload));

            return {
                ...state,
                filteredRecipes: dietFiltered
            }

        case FILTER_BY_TYPE:
            const alltypes = state.recipes
            const typeFiltered = action.payload === 'all' ? alltypes :
                alltypes.filter(t => t.dishTypes.find(e => e === action.payload));

            return {
                ...state,
                filteredRecipes: typeFiltered
            }

        case POST_RECIPE:
            return {
                ...state,
                recipes: [state.recipes]
            }

        case GET_TYPE_DIETS:
            return {
                ...state,
                diets: action.payload
            }

        case GET_DISH_TYPES:
            return {
                ...state,
                dishTypes: action.payload
            }

        default:
            return state
    };
};
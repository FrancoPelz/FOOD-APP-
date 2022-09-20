import axios from 'axios';

export const FETCH_RECIPES = 'FETCH_RECIPES'
export const SEARCH_RECIPES = 'SEARCH_RECIPES'
export const SORT_BY_HEALTH_SCORE = 'SORT_BY_HEALTH_SCORE'
export const POST_RECIPE = 'POST_RECIPE'
export const GET_TYPE_DIETS = 'GET_TYPE_DIETS'
export const GET_DISH_TYPES = 'GET_DISH_TYPES'


export function fetchRecipes() {
    return function(dispatch) {
        axios.get('http://localhost:3001/api/recipes')
        .then((recipes) => {
            dispatch({
                type: FETCH_RECIPES,
                payload: recipes.data
            });
        })
        .catch((error) => {
            console.log(error)
        })
        
    };
};

export function searchRecipes(search) {
    return function(dispatch) {
        axios.get(`http://localhost:3001/api/recipes?name=${search}`)
        .then((recipes) => {
            dispatch({
                type: SEARCH_RECIPES,
                payload: recipes.data
            });
        })
        .catch((error) => {
            console.log(error)
        })
        
    };
}


export function sortByHealthScore(order){
    return {
        type: SORT_BY_HEALTH_SCORE,
        payload: order
    }
}

export function getDiets (){
    
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/api/diets`);
        return dispatch( {
            type : GET_TYPE_DIETS,
            payload: json.data
        })

    }
}

export function getDishTypes (){
    
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/api/dishTypes`);
        return dispatch( {
            type : GET_DISH_TYPES,
            payload: json.data
        })

    }
}





export function postRecipes (payload) {
    return async function(dispatch){
        var json = await axios.post('http://localhost:3001/api/recipes', payload);
        return json
    }
}
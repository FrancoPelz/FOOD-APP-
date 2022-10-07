import axios from 'axios';

export const FETCH_RECIPES = 'FETCH_RECIPES'
export const SEARCH_RECIPES = 'SEARCH_RECIPES'
export const ORDER_BY_HEALTH_SCORE = 'ORDER_BY_HEALTH_SCORE'
export const POST_RECIPE = 'POST_RECIPE'
export const GET_TYPE_DIETS = 'GET_TYPE_DIETS'
export const GET_DISH_TYPES = 'GET_DISH_TYPES'
export const ORDER_BY_ABC = 'ORDER_BY_ABC'
export const FILTER_BY_DIET ='FILTER_BY_DIET'
export const FILTER_BY_TYPE  = 'FILTER_BY_TYPE'


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
            console.log(error && alert(`⚠️ There are no recipes with ${search} ⚠️`))
        })
        
    };
};


export function orderByHealthScore(order){
    return {
        type: ORDER_BY_HEALTH_SCORE,
        payload : order
    };
};

export function orderByABC(order){
    return {
        type: ORDER_BY_ABC,
        payload : order
    };
};

export function filterByDiet(diet){
    return {
        type: FILTER_BY_DIET,
        payload : diet
    };
};

export function filterByType(type){
    return {
        type: FILTER_BY_TYPE,
        payload : type
    };
};

export function getDiets (){
    
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/api/diets`);
        return dispatch( {
            type : GET_TYPE_DIETS,
            payload: json.data
        })

    };
};

export function getDishTypes (){
    
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/api/dishTypes`);
        return dispatch( {
            type : GET_DISH_TYPES,
            payload: json.data
        })

    };
};



export function postRecipes (payload) {
    return async function(){
        try {
            var json = await axios.post('http://localhost:3001/api/recipes', payload);
            return console.log(json, alert("Recipe created succesfully ✅"))
            
        } catch (error) {
            console.log(error && alert("⛔ Pleace, complete the form ⛔"))                    
        }
    };
};
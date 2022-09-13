const axios = require('axios');
const {Recipe, Diet} = require('../db')
//const {apiKey} = process.env;
const {data} = require('../ApiExt.json');


const getApiRecipes = async () => {
    //const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=100`)
    const apiUrl = await data
    const apiRecipes = await apiUrl.results.map(r => {   //AGREGAR DATA.RESULTS CON AXIOS
        return {
            id: r.id,
            name: r.title,
            img : r.image
        }
    })
    return apiRecipes;
};

const getDbRecipes = async () => {
    return await Recipe.findAll({
        include:{
            model: Diet,
            attributes:['name'],
            through: {
                attributes: [],
            },
        }
    });
};

const getAllRecipes = async () => {
    const apiInfo = await getApiRecipes();
    const dbInfo = await getDbRecipes();
    const allInfo = apiInfo.concat(dbInfo);

    return allInfo;
}

const getApiRecipeInf = async () => {};

const getDbRecipeInf = async () => {};

const getAllRecipeInf = async () => {};








module.exports = {
    getApiRecipes,
    getDbRecipes,
    getAllRecipes
}
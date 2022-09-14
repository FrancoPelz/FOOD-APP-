const axios = require('axios');
const {Recipe, Diet} = require('../db')
//const {apiKey} = process.env;
const {data} = require('../ApiExt.json');
const {data1} = require('../recipe200Info.json')


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

const getApiRecipeInf = async () => {
    //const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`)
    const apiUrl = await data1
    //(id, {include: diet})
    const apiInfo = await apiUrl
    return apiInfo;

};




const getDbRecipeInf = async () => {};


const addDietsToDb = async () => {
    const diets = ["Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian","Ovo-Vegetarian", "Vegan", "Pescetarian", "Paleo", "Primal", "Low FODMAP", "Whole30"]
    const promises = diets.map(d => Diet.findOrCreate({
    where: {name : d}}))
    await Promise.all(promises)
};






module.exports = {
      getAllRecipes,
      getApiRecipeInf,
      getDbRecipeInf,
      addDietsToDb
}
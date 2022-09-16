const axios = require('axios');
const {Recipe, Diet, DishType} = require('../db')
//const {apiKey} = process.env;
const {data} = require('../ApiExt.json');
const {data1} = require('../recipe200Info.json')


const getApiRecipes = async () => {
    //const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=100`)
    const apiUrl = await axios.get('https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5')
    //const apiRecipes = await apiUrl.data.results.map(r => { 
    const apiRecipes = await apiUrl.data.results.map(r => {   
        return {
            name: r.title,
            img : r.image,
            diets : r.diets.map (el => el), 
            healthScore: r.healthScore  
        }
    

    })
    return apiRecipes; 
};

const getDbRecipes = async () => { 
    const recipes =  await Recipe.findAll({
        include:{
            model: Diet,
            attributes:['name'],
            through: {
                attributes: [],
            },
        }
    });

    const dbRecipes = await recipes.map(r => {   
        return {
            name: r.name,
            img : r.img,
            diets : r.diets.map (el => el.name), 
            healthScore: r.healthScore  
        }

    });

    return dbRecipes
};

const getAllRecipes = async () => {
    const apiInfo = await getApiRecipes();
    const dbInfo = await getDbRecipes();
    const allInfo = apiInfo.concat(dbInfo);

    return allInfo;
}

const getApiRecipeInf = async (/* id */) => {
    //const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`)
    //const apiInf = apiUrl.data
    const apiInf = await data1
      const infoRecipeDb = {
        id : apiInf.id,
        name: apiInf.title,
        summary: apiInf.summary ,
        healthScore: apiInf.healthScore,
        img: apiInf.image ,
        steps: apiInf.instructions,
        diets: apiInf.diets.map(el => el), 
        types: apiInf.dishTypes?.map(el => el)
        } 

    return infoRecipeDb;

};

const getDbRecipeInf = async (id) => {
    const recipeDbInfo = await Recipe.findByPk(id,{
        include: [
            {
            model: Diet,
            atributes: ["name"],
            through: {
                attributes: [],
                },
            },
            {
            model: DishType,
            atributes: ["name"],
            through: {
                attributes: [],
                },
            }
        ]
    });
    return recipeDbInfo;
};

const addDietsToDb = async () => {
    const diets = ["gluten free", "ketogenic", "vegetarian", "lacto-vegetarian","ovo-vegetarian", "vegan", "pescetarian", "paleo", "primal", "low fodmap", "whole30"]
    const dishTypes = ["main course","side dish","dessert","appetizer"," salad","bread","breakfast","soup","beverage","sauce","marinade","fingerfood","snack","drink"]

    const promise1 = diets.map(d => Diet.findOrCreate({
    where: {name : d}}))
    const promise2 = dishTypes .map(d => DishType.findOrCreate({
        where: {name : d}}))

    const promises = promise1.concat(promise2)


     await Promise.all(promises)
};






module.exports = {
      getAllRecipes,
      getApiRecipeInf,
      getDbRecipeInf,
      addDietsToDb,
}
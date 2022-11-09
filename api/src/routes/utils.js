const axios = require('axios');
const { Recipe, Diet, DishType } = require('../db')


const getApiRecipes = async () => {
    //const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=100&addRecipeInformation=true`)
    //Se utiliza la api de mocky para cono tener problemas con el numero de llamados limitados:
    const apiUrl = await axios.get('https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5')
    const apiRecipes = await apiUrl.data.results.map(r => {
        return {
            id: r.id,
            name: r.title,
            image: r.image,
            diets: r.diets.map(el => el),
            healthScore: r.healthScore,
            dishTypes: r.dishTypes.map(el => el)
        }


    })
    return apiRecipes;
};

const getDbRecipes = async () => {
    const recipes = await Recipe.findAll({
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

    const dbRecipes = await recipes.map(r => {
        return {
            id: r.id,
            name: r.name,
            image: r.image,
            diets: r.diets.map(el => el.name),
            dishTypes: r.dishTypes.map(el => el.name),
            healthScore: r.healthScore,
        }

    });

    return dbRecipes
};

const getAllRecipes = async () => {
    const apiInfo = await getApiRecipes();
    const dbInfo = await getDbRecipes();
    const allInfo = dbInfo.concat(apiInfo);

    return allInfo;
}

const getApiRecipeInf = async (id) => {
    //const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`)
    const apiUrl = await axios.get('https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5')

    const apiInf = apiUrl.data.results.find(el => el.id == id)

    const infoRecipe = {
        id: apiInf.id,
        name: apiInf.title,
        summary: apiInf.summary,
        healthScore: apiInf.healthScore,
        image: apiInf.image,
        steps: apiInf.analyzedInstructions.length ? apiInf.analyzedInstructions[0].steps.map(el => el.step).join(" \n") : null,
        diets: apiInf.diets?.map(el => el),
        types: apiInf.dishTypes?.map(el => el)
    }

    return infoRecipe;

};

const getDbRecipeInf = async (id) => {
    const recipeDbInfo = await Recipe.findByPk(id, {
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

    const RecipeDb = {
        id: recipeDbInfo.id,
        name: recipeDbInfo.title,
        summary: recipeDbInfo.summary,
        healthScore: recipeDbInfo.healthScore,
        image: recipeDbInfo.image,
        steps: recipeDbInfo.steps,
        diets: recipeDbInfo.diets.map(el => el.name),
        types: recipeDbInfo.dishTypes?.map(el => el.name)
    }

    return RecipeDb;
};

const addDietsTypesToDb = async () => {
    apiTypes = ["main course", "side dish", "dessert", "appetizer", " salad", "bread", "breakfast", "soup", "beverage", "sauce", "marinade", "fingerfood", "snack", "drink"]

    const apiRecipes = await getApiRecipes()
    const promise1 = apiRecipes.map(r => r.diets.map(d => Diet.findOrCreate({
        where: { name: d }
    })))
    const promise2 = apiRecipes.map(r => r.dishTypes.map(d => DishType.findOrCreate({
        where: { name: d }
    })))
    const promise3 = apiTypes.map(d => DishType.findOrCreate({
        where: { name: d }
    }))

    const promises = promise1.concat(promise2, promise3)


    await Promise.all(promises)
};






module.exports = {
    getAllRecipes,
    getApiRecipeInf,
    getDbRecipeInf,
    addDietsTypesToDb,
    getDbRecipes
}
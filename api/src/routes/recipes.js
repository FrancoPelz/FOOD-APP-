const { Router } = require('express');
const {Recipe} = require('../db');
const { getAllRecipes, getApiRecipeInf,addDietsToDb } = require('./utils');
const router = Router();

router.get("/", async (req, res, next) => {
    const {name} = req.query;

    try {
        let totalRecipes = await getAllRecipes();
        if(name){
            let recipes = await totalRecipes.filter(r => r.name.toLowerCase().includes(name.toLowerCase()));
            if (recipes.length) return res.send(recipes); 
            else return res.status(404).send(`There is no recipes with ${name}`);
        } 
        res.json(totalRecipes);  
    } catch (error) {
        next(error);   
    } 
});

router.get("/:id", async (req, res, next) => {
    const {id} = req.params;
    await addDietsToDb();

    const ValidateId = (id) => {
        for (let i =0;i < id.length ; i++){
            if (isNaN(id[i]))
            return true;
        }
    } 

    try {
        if(ValidateId(id)){
            return res.status(404).send("errorr")
        }
        const infoApi = await getApiRecipeInf()
        return res.send(infoApi)
        
        //const infoDb = asd;
        //return res.send()

    } catch (error) {
        next(error);
    }
})


/* const {code} = req.params;
const character = await Character.findByPk(code, {
    include: Role
}) */


//ver que onda con agregar 2 comidas iguales
router.post("/", async (req, res, next) => {
    const {name, summary} = req.body;
    try {
        if(!name || !summary)
           return res.status(404).send("data is missing");

        const newRecipe = await Recipe.create(req.body);
        res.status(201).json(newRecipe);

    } catch (error) {
            next(error);   
    }
});







module.exports = router;

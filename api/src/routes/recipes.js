const { Router } = require('express');
const {Recipe, Diet, DishType} = require('../db');
const { getAllRecipes, getApiRecipeInf,addDietsToDb, getDbRecipeInf } = require('./utils');
const router = Router();

router.get("", async (req, res, next) => {
    const {name} = req.query;

    try {
        let totalRecipes = await getAllRecipes();
        if(name){
            let recipesList = await totalRecipes.filter(r => r.name.toLowerCase().includes(name.toLowerCase()));
            if (recipesList.length) return res.send(recipesList); 
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

    try {
        if(id.length>12){
            console.log(id)
            const infoDb = await getDbRecipeInf(id)
            if(!infoDb) return res.status(404).send("Recipe doesn`t exist")
            return res.send(infoDb)
        }
       
        const apiUrl = await getApiRecipeInf(id)
        if(!apiUrl) return res.status(404).send("Recipe doesn`t exist")
        return res.send(apiUrl)

    } catch (error) {
        next(error);
    }
})


router.post("", async (req, res, next) => {
    const {name, summary,healthScore, img, steps, diets, dishTypes} = req.body;
    await addDietsToDb();
    try {
        if(!name)
           return res.status(400).send("You must put a Name");
        if(!summary)
           return res.status(400).send("You must put a Summary");
        if(!steps)
        return res.status(400).send("You must put instructions to prepare this recipe");
        


        let newRecipe = await Recipe.create({
            name, summary, healthScore, img, steps, diets
        });

        if(diets){
          const dietDb = await Diet.findAll({
              where : {name: diets}
          })
          await newRecipe.addDiet(dietDb)
        }
        else return res.status(400).send("You must select a type of diet");

        if(dishTypes){
            const dishTypeDb = await DishType.findAll({
                where : {name: dishTypes}
            })
            await newRecipe.addDishType(dishTypeDb)
          }
        else return res.status(400).send("You must select a type");

        res.status(201).send("Succes")
        
          


    } catch (error) {
           res.status(400).send("This recipe already exists")
    }
});







module.exports = router;

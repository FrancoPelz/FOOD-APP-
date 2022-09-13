const { Router } = require('express');
const { getAllRecipes } = require('./utils');
const router = Router();

router.get("/", async (req, res) => {
    const {name} = req.query;

    let totalRecipes = await getAllRecipes();
    if(name){
        let recipes = await totalRecipes.filter(r => r.name.toLowerCase().includes(name.toLowerCase()));
        if (recipes.length) return res.send(recipes); 
        else return res.status(404).send(`There is no recipes with ${name}`);
    } 
    res.json(totalRecipes);  
});







module.exports = router;

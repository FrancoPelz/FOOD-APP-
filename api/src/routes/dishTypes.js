const { Router } = require('express');
const {DishType} = require('../db');
const {addDietsToDb} = require('./utils')
const router = Router();

router.get("", async (req,res, next) => {
    try {
        await addDietsToDb();                 
        const allDishTypes = await DishType.findAll()
        res.send(allDishTypes.map((e) => e.name))

    } catch (error) {
        next(error)
    }
});




module.exports = router;
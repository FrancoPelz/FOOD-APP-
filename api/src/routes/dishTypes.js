const { Router } = require('express');
const {DishType} = require('../db');
const router = Router();

router.get("", async (req,res, next) => {
    try {                
        const allDishTypes = await DishType.findAll()
        res.send(allDishTypes.map((e) => e.name))

    } catch (error) {
        next(error)
    }
});




module.exports = router;
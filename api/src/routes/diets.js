const { Router } = require('express');
const {Diet} = require('../db');
const {addDietsToDb} = require('./utils')
const router = Router();

router.get("", async (req,res, next) => {
    try {
        await addDietsToDb();                 
        const allDiets = await Diet.findAll()
        res.send(allDiets.map((e) => e.name))

    } catch (error) {
        next(error)
    }
});




module.exports = router;

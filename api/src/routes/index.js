const { Router } = require('express');
const recipesRoute = require('./recipes')
const dietsRoute = require('./diets')
const typesRoute = require('./dishTypes')


const router = Router();

router.use('/recipes', recipesRoute);
router.use('/diets', dietsRoute);
router.use('/dishTypes', typesRoute);


module.exports = router;

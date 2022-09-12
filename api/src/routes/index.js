const { Router } = require('express');
const recipesRoute = require('./Middlewares/recipes')
const dietsRoute = require('./Middlewares/diets')


const router = Router();

router.use('/recipes', recipesRoute);
router.use('/diets', dietsRoute);


module.exports = router;

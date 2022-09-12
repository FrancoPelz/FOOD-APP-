const { Router } = require('express');
const router = Router();

router.get("/", (req,res, next) => {
    res.send('soy get /diets')
});

router.post("/", (req,res, next) => {
    res.send('soy post /diets')
});

router.put("/", (req,res, next) => {
    res.send('soy put /diets')
});

router.delete("/", (req,res, next) => {
    res.send('soy delete /diets')
});



module.exports = router;

const { Router } = require('express');
const router = Router();

router.get("/", (req,res, next) => {
    res.send('soy get /recipes')
});

router.post("/", (req,res, next) => {
    res.send('soy post /recipes')
});

router.put("/", (req,res, next) => {
    res.send('soy put /recipes')
});

router.delete("/", (req,res, next) => {
    res.send('soy delete /recipes')
});



module.exports = router;

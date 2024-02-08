const express = require('express');
const {
    getCocktails,
    getSingleCocktail,
    addCocktail,
    updateCocktail,
    deleteCocktails,
} = require('../../controllers/cocktails');

//Include other resource routers
const spiritDataRouter = require('../public/sp_public'); 

const router = express.Router();

//Reroute into other resource routers
router.use('/:cocktailid/spirits', spiritDataRouter);

router.route('/')
.get(getCocktails)
.post(addCocktail);

router.route('/:id')
.get(getSingleCocktail)
.put(updateCocktail)
.delete(deleteCocktails);

module.exports = router;

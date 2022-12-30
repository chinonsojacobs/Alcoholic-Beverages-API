const express = require('express');
const {
    getCocktails,
    getSingleCocktail,
    addCocktail,
    updateCocktail,
    deleteCocktails,
} = require('../../controllers/cocktails');
const router = express.Router();

router.route('/')
.get(getCocktails)
.post(addCocktail);

router.route('/:id')
.get(getSingleCocktail)
.put(updateCocktail)
.delete(deleteCocktails);

module.exports = router;

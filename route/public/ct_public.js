const express = require('express');
const {
    getCocktails,
    getSingleCocktail
} = require('../../controllers/cocktails');
const router = express.Router();

router.route('/')
.get(getCocktails)

router.route('/:id')
.get(getSingleCocktail)

module.exports = router;

const express = require('express');
const {
    getAllSpirits,
    getSingleSpirit,
    addSpirit,
    updateSpirit,
    deleteSpirit
} = require('../../controllers/spirits');
const router = express.Router({ mergeParams: true });

router.route('/')
.get(getAllSpirits) 
.post(addSpirit);

router
.route('/:id')
.get(getSingleSpirit)
.put(updateSpirit)
.delete(deleteSpirit);

module.exports = router;
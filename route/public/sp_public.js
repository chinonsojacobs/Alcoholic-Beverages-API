const express = require('express');
const {
    getAllSpirits
} = require('../../controllers/spirits');
const router = express.Router({ mergeParams: true });

router.route('/').get(getAllSpirits);

module.exports = router;
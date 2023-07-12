const express = require('express');
const router = express.Router();

const reviewCtrl = require('../controllers/reviews');

//POST aidb/:id/review
router.post('/:id/review', reviewCtrl.createReview);

//DELETE /aidb/:id/review
// router.delete('/review/:id', aidbCtrl.deleteReview)
router.delete('/reviews/:id', reviewCtrl.deleteReview);

module.exports = router;
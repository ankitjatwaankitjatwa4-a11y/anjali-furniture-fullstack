const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createReview, getReviews, updateReview } = require('../controllers/reviewController');

router.post('/', createReview);
router.get('/', auth, getReviews);
router.put('/:id', auth, updateReview);

module.exports = router;

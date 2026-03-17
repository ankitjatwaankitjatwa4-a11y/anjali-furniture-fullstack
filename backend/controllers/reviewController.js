const Review = require('../models/Review');
const Product = require('../models/Product');

// POST /api/review - public
exports.createReview = async (req, res) => {
  try {
    const { productId, productName, name, rating, review } = req.body;
    if (!productId || !name || !rating || !review) {
      return res.status(400).json({ success: false, message: 'All fields required' });
    }

    const newReview = await Review.create({ productId, productName, name, rating, review });
    res.status(201).json({ success: true, review: newReview });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET /api/review - protected
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json({ success: true, reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// PUT /api/review/:id - protected (approve/reject)
exports.updateReview = async (req, res) => {
  try {
    const updated = await Review.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Review not found' });

    // If approved, update product rating
    if (req.body.status === 'approved') {
      const reviews = await Review.find({ productId: updated.productId, status: 'approved' });
      const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      await Product.findByIdAndUpdate(updated.productId, {
        rating: Math.round(avgRating * 10) / 10,
        reviewCount: reviews.length
      });
    }

    res.json({ success: true, review: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

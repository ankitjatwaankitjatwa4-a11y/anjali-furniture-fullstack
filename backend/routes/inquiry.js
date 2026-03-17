const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createInquiry, getInquiries, updateInquiry, deleteInquiry
} = require('../controllers/inquiryController');

router.post('/', createInquiry);
router.get('/', auth, getInquiries);
router.put('/:id', auth, updateInquiry);
router.delete('/:id', auth, deleteInquiry);

module.exports = router;

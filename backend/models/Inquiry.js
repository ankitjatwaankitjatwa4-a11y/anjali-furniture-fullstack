const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, trim: true, default: '' },
  message: { type: String, required: true },
  productId: { type: String, default: '' },
  productName: { type: String, default: '' },
  type: { type: String, enum: ['inquiry', 'contact'], default: 'inquiry' },
  status: {
    type: String,
    enum: ['new', 'contacted', 'converted', 'closed'],
    default: 'new'
  }
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', InquirySchema);

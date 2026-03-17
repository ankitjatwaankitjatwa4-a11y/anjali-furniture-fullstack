const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number, default: 0 },
  category: {
    type: String,
    required: true,
    enum: ['beds', 'sofa', 'tables', 'chairs', 'wardrobes', 'doors', 'custom']
  },
  wood: {
    type: String,
    required: true,
    enum: ['sheesham', 'teak', 'sagwan', 'engineered']
  },
  description: { type: String, required: true },
  shortDesc: { type: String, required: true },
  dimensions: { type: String, default: '' },
  stock: { type: Number, default: 0 },
  images: [{ type: String }], // base64 strings or cloudinary URLs
  colors: [{ type: String }],
  featured: { type: Boolean, default: false },
  newArrival: { type: Boolean, default: false },
  bestSeller: { type: Boolean, default: false },
  customOrder: { type: Boolean, default: false },
  rating: { type: Number, default: 4.5, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);

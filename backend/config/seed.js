require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./db');

const Product = require('../models/Product');
const Admin = require('../models/Admin');

const seedProducts = [
  {
    name: 'Royal Maharaja Bed',
    price: 85000,
    originalPrice: 95000,
    category: 'beds',
    wood: 'sheesham',
    description: 'Handcrafted royal bed with intricate carvings, featuring traditional Rajasthani design elements. Perfect centerpiece for your master bedroom.',
    shortDesc: 'Handcrafted Sheesham wood bed with royal carvings',
    dimensions: '6.5ft x 6ft x 4ft',
    stock: 5,
    customOrder: true,
    featured: true,
    newArrival: false,
    bestSeller: true,
    rating: 4.8,
    reviewCount: 24,
    images: [],
    colors: ['Natural', 'Walnut', 'Honey']
  },
  {
    name: 'Chester Premium Sofa Set',
    price: 125000,
    originalPrice: 140000,
    category: 'sofa',
    wood: 'teak',
    description: 'Luxurious 7-seater Chesterfield sofa set crafted from premium Teak wood with genuine leather upholstery. Timeless elegance for your living room.',
    shortDesc: '7-seater Teak wood Chesterfield with leather upholstery',
    dimensions: '3+2+2 Configuration',
    stock: 3,
    customOrder: true,
    featured: true,
    newArrival: true,
    bestSeller: true,
    rating: 4.9,
    reviewCount: 18,
    images: [],
    colors: ['Brown', 'Black', 'Tan']
  },
  {
    name: 'Executive Dining Table',
    price: 65000,
    originalPrice: 72000,
    category: 'tables',
    wood: 'sagwan',
    description: '8-seater dining table with elegant design. Crafted from seasoned Sagwan wood with natural finish. Includes matching chairs.',
    shortDesc: '8-seater Sagwan wood dining set with chairs',
    dimensions: '7ft x 3.5ft x 2.5ft',
    stock: 8,
    customOrder: true,
    featured: false,
    newArrival: true,
    bestSeller: false,
    rating: 4.7,
    reviewCount: 31,
    images: [],
    colors: ['Natural', 'Dark Walnut']
  },
  {
    name: 'Heritage Carved Chair',
    price: 18500,
    originalPrice: 22000,
    category: 'chairs',
    wood: 'sheesham',
    description: 'Traditional hand-carved armchair with comfortable cushioning. Each piece is unique with artisan craftsmanship.',
    shortDesc: 'Hand-carved Sheesham armchair with cushion',
    dimensions: '2ft x 2ft x 3.5ft',
    stock: 15,
    customOrder: false,
    featured: false,
    newArrival: false,
    bestSeller: true,
    rating: 4.6,
    reviewCount: 42,
    images: [],
    colors: ['Natural', 'Walnut', 'Mahogany']
  },
  {
    name: 'Imperial Wardrobe',
    price: 95000,
    originalPrice: 110000,
    category: 'wardrobes',
    wood: 'teak',
    description: '4-door wardrobe with full-length mirror, internal drawers, and hanging space. Premium Teak construction with soft-close hinges.',
    shortDesc: '4-door Teak wardrobe with mirror and drawers',
    dimensions: '8ft x 2ft x 7ft',
    stock: 4,
    customOrder: true,
    featured: true,
    newArrival: false,
    bestSeller: false,
    rating: 4.8,
    reviewCount: 15,
    images: [],
    colors: ['Natural', 'Walnut']
  },
  {
    name: 'Carved Main Door',
    price: 45000,
    originalPrice: 52000,
    category: 'doors',
    wood: 'sagwan',
    description: 'Stunning main entrance door with traditional carvings. Weather-resistant finish with premium hardware included.',
    shortDesc: 'Traditional carved Sagwan main door',
    dimensions: '7ft x 3.5ft x 2inch',
    stock: 10,
    customOrder: true,
    featured: false,
    newArrival: true,
    bestSeller: false,
    rating: 4.7,
    reviewCount: 28,
    images: [],
    colors: ['Natural', 'Dark Brown', 'Mahogany']
  },
  {
    name: 'Modern TV Unit',
    price: 35000,
    originalPrice: 40000,
    category: 'custom',
    wood: 'engineered',
    description: 'Contemporary TV unit with storage compartments. Engineered wood with laminate finish. Perfect for modern homes.',
    shortDesc: 'Contemporary TV unit with storage',
    dimensions: '6ft x 1.5ft x 1.5ft',
    stock: 12,
    customOrder: false,
    featured: false,
    newArrival: true,
    bestSeller: true,
    rating: 4.5,
    reviewCount: 56,
    images: [],
    colors: ['White', 'Walnut', 'Grey']
  },
  {
    name: 'Vintage Coffee Table',
    price: 28000,
    originalPrice: 32000,
    category: 'tables',
    wood: 'sheesham',
    description: 'Elegant coffee table with brass inlay work. Solid Sheesham wood with antique finish. A statement piece for your living room.',
    shortDesc: 'Sheesham coffee table with brass inlay',
    dimensions: '4ft x 2.5ft x 1.5ft',
    stock: 7,
    customOrder: false,
    featured: true,
    newArrival: false,
    bestSeller: false,
    rating: 4.6,
    reviewCount: 33,
    images: [],
    colors: ['Antique', 'Natural']
  },
  {
    name: 'Kids Bunk Bed',
    price: 55000,
    originalPrice: 62000,
    category: 'beds',
    wood: 'teak',
    description: 'Safe and sturdy bunk bed for kids. Premium Teak construction with rounded edges. Includes ladder and safety rails.',
    shortDesc: 'Safe Teak bunk bed for children',
    dimensions: '6ft x 3ft x 5.5ft',
    stock: 6,
    customOrder: true,
    featured: false,
    newArrival: true,
    bestSeller: false,
    rating: 4.9,
    reviewCount: 12,
    images: [],
    colors: ['Natural', 'White', 'Blue']
  },
  {
    name: 'L-Shape Sofa',
    price: 78000,
    originalPrice: 88000,
    category: 'sofa',
    wood: 'sagwan',
    description: 'Modern L-shaped sofa with Sagwan frame and premium fabric upholstery. Perfect for large living spaces.',
    shortDesc: 'Modern L-shape sofa with Sagwan frame',
    dimensions: '9ft x 6ft x 2.5ft',
    stock: 4,
    customOrder: true,
    featured: false,
    newArrival: false,
    bestSeller: true,
    rating: 4.7,
    reviewCount: 21,
    images: [],
    colors: ['Grey', 'Beige', 'Blue']
  },
  {
    name: 'Study Table Set',
    price: 32000,
    originalPrice: 38000,
    category: 'tables',
    wood: 'sheesham',
    description: 'Ergonomic study table with matching chair. Multiple storage compartments and cable management. Perfect for home office.',
    shortDesc: 'Sheesham study table with ergonomic chair',
    dimensions: '4ft x 2ft x 2.5ft',
    stock: 9,
    customOrder: false,
    featured: false,
    newArrival: false,
    bestSeller: false,
    rating: 4.5,
    reviewCount: 27,
    images: [],
    colors: ['Natural', 'Walnut']
  },
  {
    name: 'Temple Cabinet',
    price: 42000,
    originalPrice: 48000,
    category: 'custom',
    wood: 'teak',
    description: 'Beautiful Pooja mandir with intricate carvings and LED lighting. Premium Teak with gold accents.',
    shortDesc: 'Carved Teak Pooja mandir with LED',
    dimensions: '3ft x 1.5ft x 4ft',
    stock: 8,
    customOrder: true,
    featured: true,
    newArrival: false,
    bestSeller: true,
    rating: 4.9,
    reviewCount: 45,
    images: [],
    colors: ['Natural', 'Gold Accent']
  }
];

async function seed() {
  await connectDB();

  // Clear existing data
  await Product.deleteMany({});
  await Admin.deleteMany({});

  // Insert products
  await Product.insertMany(seedProducts);
  console.log(`✅ Seeded ${seedProducts.length} products`);

  // Create admin
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'anjali2024', 10);
  await Admin.create({
    username: process.env.ADMIN_USERNAME || 'admin',
    password: hashedPassword
  });
  console.log('✅ Admin user created');
  console.log(`   Username: ${process.env.ADMIN_USERNAME || 'admin'}`);
  console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'anjali2024'}`);

  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});

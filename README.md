# Anjali Furniture Works — Full Stack Production System

## Folder Structure
```
anjali-furniture/
├── backend/
│   ├── config/
│   │   ├── db.js           # MongoDB connection
│   │   └── seed.js         # Seed initial products + admin
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── productController.js
│   │   ├── inquiryController.js
│   │   ├── reviewController.js
│   │   └── uploadController.js
│   ├── middleware/
│   │   └── auth.js         # JWT middleware
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Product.js
│   │   ├── Inquiry.js
│   │   └── Review.js
│   ├── routes/
│   │   ├── admin.js
│   │   ├── products.js
│   │   ├── inquiry.js
│   │   ├── review.js
│   │   └── upload.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── index.html          # Complete single-file frontend
    └── vercel.json
```

---

## STEP 1 — MongoDB Atlas Setup

1. Go to https://cloud.mongodb.com → Create free account
2. Create a new **Cluster** (free M0 tier)
3. Under **Database Access** → Add a user with password
4. Under **Network Access** → Add IP `0.0.0.0/0` (allow all)
5. Click **Connect** → **Connect your application** → Copy the connection string
6. Replace `<password>` in the string with your DB user password
7. Your MONGO_URI looks like:
   `mongodb+srv://USERNAME:PASSWORD@cluster0.abcde.mongodb.net/anjali_furniture?retryWrites=true&w=majority`

---

## STEP 2 — GitHub Push

```bash
cd anjali-furniture
git init
git add .
git commit -m "Initial commit - Anjali Furniture Works full stack"
git remote add origin https://github.com/YOUR_USERNAME/anjali-furniture.git
git push -u origin main
```

---

## STEP 3 — Deploy Backend on Render

1. Go to https://render.com → Sign up / Log in
2. Click **New** → **Web Service**
3. Connect your GitHub repo
4. Set **Root Directory** to `backend`
5. Set **Build Command**: `npm install`
6. Set **Start Command**: `npm start`
7. Set **Environment Variables**:
   ```
   PORT=5000
   MONGO_URI=mongodb+srv://...your uri...
   JWT_SECRET=some_random_long_string_here
   WHATSAPP_NUMBER=918386076109
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=anjali2024
   NODE_ENV=production
   ```
8. Click **Deploy**
9. Wait ~2 min. Your backend URL will be something like:
   `https://anjali-furniture-api.onrender.com`

---

## STEP 4 — Seed the Database

After backend is deployed, run locally:

```bash
cd backend
cp .env.example .env
# Edit .env with your real values
npm install
node config/seed.js
```

This creates 12 default products + admin user.

---

## STEP 5 — Update Frontend with Backend URL

Open `frontend/index.html` and find line:
```js
const BASE_URL = 'https://YOUR_RENDER_BACKEND_URL';
```
Change it to your actual Render URL:
```js
const BASE_URL = 'https://anjali-furniture-api.onrender.com';
```

---

## STEP 6 — Deploy Frontend on Vercel

1. Go to https://vercel.com → Sign up / Log in
2. Click **Add New Project** → Import from GitHub
3. Set **Root Directory** to `frontend`
4. Click **Deploy**
5. Your site is live at: `https://anjali-furniture.vercel.app`

---

## STEP 7 — Test Everything

### Test API health:
```
GET https://anjali-furniture-api.onrender.com/api/health
```
Expected: `{ "success": true, "status": "ok" }`

### Test products:
```
GET https://anjali-furniture-api.onrender.com/api/products
```
Expected: `{ "success": true, "products": [...] }`

### Test admin login:
```
POST https://anjali-furniture-api.onrender.com/api/admin/login
Body: { "username": "admin", "password": "anjali2024" }
```
Expected: `{ "success": true, "token": "eyJ..." }`

### Test inquiry (contact form):
```
POST https://anjali-furniture-api.onrender.com/api/inquiry
Body: { "name": "Test User", "phone": "9999999999", "message": "Test inquiry" }
```
Expected: `{ "success": true, "inquiry": {...}, "whatsappLink": "https://wa.me/..." }`

### Test frontend:
- Open your Vercel URL
- Products should load from MongoDB
- Contact form → saves to DB + opens WhatsApp for admin
- Inquiry form → saves to DB + opens WhatsApp for admin
- Admin login → JWT protected
- Add/Edit/Delete products in admin panel
- Upload images (stored as base64 in MongoDB)

---

## API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/admin/login | No | Admin login → returns JWT |
| GET | /api/products | No | Get all products (filterable) |
| GET | /api/products/:id | No | Get single product |
| POST | /api/products | JWT | Create product |
| PUT | /api/products/:id | JWT | Update product |
| DELETE | /api/products/:id | JWT | Delete product |
| POST | /api/inquiry | No | Submit inquiry/contact |
| GET | /api/inquiry | JWT | Get all inquiries |
| PUT | /api/inquiry/:id | JWT | Update inquiry status |
| DELETE | /api/inquiry/:id | JWT | Delete inquiry |
| POST | /api/review | No | Submit review |
| GET | /api/review | JWT | Get all reviews |
| PUT | /api/review/:id | JWT | Update review status |
| POST | /api/upload | JWT | Upload image (base64) |

---

## Optional: Cloudinary Image Upload

For better image hosting add to `.env`:
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
Get free account at https://cloudinary.com (10GB free).
When these are set, images are stored on Cloudinary instead of MongoDB.

---

## WhatsApp Notification Flow

When a customer submits an inquiry or contact form:
1. Data is saved to MongoDB
2. Backend returns a `whatsappLink` 
3. Frontend automatically opens WhatsApp with a pre-filled message
4. Admin receives the customer details directly in WhatsApp

Change the WhatsApp number in `.env`:
```
WHATSAPP_NUMBER=919876543210   # 91 = India country code
```

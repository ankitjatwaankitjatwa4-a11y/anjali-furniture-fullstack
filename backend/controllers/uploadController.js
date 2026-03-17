// Upload controller
// Supports base64 storage (default) or Cloudinary (if configured)

exports.uploadImage = async (req, res) => {
  try {
    const { image } = req.body; // base64 string from frontend

    if (!image) {
      return res.status(400).json({ success: false, message: 'No image provided' });
    }

    // If Cloudinary is configured, upload there
    if (
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    ) {
      const cloudinary = require('cloudinary').v2;
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
      });

      const result = await cloudinary.uploader.upload(image, {
        folder: 'anjali-furniture',
        transformation: [{ width: 800, height: 800, crop: 'limit', quality: 'auto' }]
      });

      return res.json({ success: true, url: result.secure_url });
    }

    // Default: return base64 as-is (stored in MongoDB)
    // Warn if image is too large (>500KB base64 ~ 375KB actual)
    const sizeKB = Buffer.byteLength(image, 'base64') / 1024;
    if (sizeKB > 600) {
      return res.status(400).json({ success: false, message: 'Image too large. Max 500KB.' });
    }

    res.json({ success: true, url: image });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

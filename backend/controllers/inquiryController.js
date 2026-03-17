const Inquiry = require('../models/Inquiry');

// Build WhatsApp deep-link message for admin
function buildWhatsAppLink(inquiry) {
  const phone = (process.env.WHATSAPP_NUMBER || '').replace(/\D/g, '');
  const msg = [
    `🔔 *New ${inquiry.type === 'contact' ? 'Contact' : 'Inquiry'} - Anjali Furniture Works*`,
    ``,
    `👤 *Name:* ${inquiry.name}`,
    `📱 *Phone:* ${inquiry.phone}`,
    inquiry.email ? `📧 *Email:* ${inquiry.email}` : null,
    inquiry.productName ? `📦 *Product:* ${inquiry.productName}` : null,
    `💬 *Message:* ${inquiry.message}`,
    ``,
    `📅 *Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`
  ].filter(Boolean).join('\n');

  return phone ? `https://wa.me/${phone}?text=${encodeURIComponent(msg)}` : null;
}

// POST /api/inquiry - public
exports.createInquiry = async (req, res) => {
  try {
    const { name, phone, email, message, productId, productName, type } = req.body;
    if (!name || !phone || !message) {
      return res.status(400).json({ success: false, message: 'Name, phone, and message are required' });
    }

    const inquiry = await Inquiry.create({ name, phone, email, message, productId, productName, type: type || 'inquiry' });
    const whatsappLink = buildWhatsAppLink(inquiry);

    res.status(201).json({ success: true, inquiry, whatsappLink });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET /api/inquiry - protected
exports.getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, inquiries });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// PUT /api/inquiry/:id - protected
exports.updateInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!inquiry) return res.status(404).json({ success: false, message: 'Inquiry not found' });
    res.json({ success: true, inquiry });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// DELETE /api/inquiry/:id - protected
exports.deleteInquiry = async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Inquiry deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const express = require('express');
const QRCode = require('qrcode');
const router = express.Router();

router.post('/generate-qr', (req, res) => {
  const { data } = req.body;

  QRCode.toDataURL(data, (err, url) => {
    if (err) return res.status(500).json({ error: 'Failed to generate QR Code' });
    res.json({ qrCodeUrl: url });
  });
});

module.exports = router;
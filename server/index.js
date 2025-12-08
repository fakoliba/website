const express = require('express');
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

/* Debugging pointer:
   To enable request-level debug logging for collaboration or deployment troubleshooting,
   set the environment variable DEBUG=true before starting the server. Example:
     DEBUG=true npm start
   When enabled, basic request logs will be printed to the console.
*/
if (process.env.DEBUG === 'true' || process.env.DEBUG === '1') {
  app.use((req, res, next) => {
    console.log(`[DEBUG] ${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
    next();
  });
}

app.use(cors());
app.use(express.json());

// Serve static files from the website directory
app.use(express.static(path.join(__dirname, '../website')));

// Handle API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Contact form endpoint - sends email using Nodemailer
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Basic validation for email format (simple regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Small helper to escape HTML for the message body
    const escapeHtml = (str = '') => String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    // Determine recipient from environment (CONTACT_TO) with a safe default
    const recipient = process.env.CONTACT_TO || 'truesecai@gmail.com';

    // If SMTP env vars are provided, use them (production). Otherwise fallback to Ethereal for dev/testing.
    let transporter;
    let usingEthereal = false;
    if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT ? Number(process.env.EMAIL_PORT) : 587,
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    } else {
      // Create Ethereal test account for development (no real credentials required)
      const testAccount = await nodemailer.createTestAccount();
      usingEthereal = true;
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    // For production SMTP, set the 'from' as configured EMAIL_FROM or the SMTP user; use replyTo for sender's address
    const fromAddress = process.env.EMAIL_FROM || process.env.EMAIL_USER || undefined;

    const safeName = escapeHtml(name);
    const safeSubject = escapeHtml(subject || `Website contact from ${name}`);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

    const mailOptions = {
      from: fromAddress ? `${fromAddress}` : `${safeName} <no-reply@${req.hostname || 'truesec.ai'}>`,
      to: recipient,
      replyTo: email,
      subject: safeSubject,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p><p><strong>Message:</strong></p><p>${safeMessage}</p>`,
    };

    const info = await transporter.sendMail(mailOptions);

    if (usingEthereal) {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log(`Test email sent successfully! Preview URL: ${previewUrl}`);
      return res.json({ ok: true, message: 'Test email sent (ethereal). Check server logs for preview URL.', previewUrl });
    }

    console.log('Email sent successfully (production SMTP)');
    return res.json({ ok: true, message: 'Email sent successfully.' });
  } catch (err) {
    console.error('Error sending contact email:', err);
    return res.status(500).json({ error: 'Failed to send email: ' + err.message });
  }
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../website/index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Test email endpoint ready at http://localhost:${PORT}/api/contact`);
});
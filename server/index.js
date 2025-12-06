const express = require('express');
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

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
    // Create a test account with Ethereal Email (no credentials needed for testing)
    let testAccount = await nodemailer.createTestAccount();

    // Create transporter using Ethereal test account
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const mailOptions = {
      from: `${name} <${testAccount.user}>`,
      to: 'TrueSecai@gmail.com', // Test recipient
      subject: subject || `Website contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>`,
    };

    const info = await transporter.sendMail(mailOptions);

    // Generate preview URL for the test email
    const previewUrl = nodemailer.getTestMessageUrl(info);

    console.log(`Test email sent successfully!`);
    console.log(`Preview URL: ${previewUrl}`);

    return res.json({ 
      ok: true, 
      message: 'Test email sent! Check the preview URL in the server logs.',
      previewUrl: previewUrl
    });
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
const express = require('express');
const path = require('path');
// ...existing code...

// Serve static files from the website directory
app.use(express.static(path.join(__dirname, '../website')));

// Handle all other routes by serving index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../website/index.html'));
});

// ...existing code...
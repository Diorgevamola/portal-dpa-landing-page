const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 6000;

// =============================================
// MIME Type Configuration
// =============================================
app.use(express.static(path.join(__dirname), {
  setHeaders: (res, filepath) => {
    // Set correct MIME types
    if (filepath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css; charset=utf-8');
    } else if (filepath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    } else if (filepath.endsWith('.svg')) {
      res.setHeader('Content-Type', 'image/svg+xml');
    } else if (filepath.endsWith('.png')) {
      res.setHeader('Content-Type', 'image/png');
    } else if (filepath.endsWith('.jpg') || filepath.endsWith('.jpeg')) {
      res.setHeader('Content-Type', 'image/jpeg');
    } else if (filepath.endsWith('.webp')) {
      res.setHeader('Content-Type', 'image/webp');
    } else if (filepath.endsWith('.gif')) {
      res.setHeader('Content-Type', 'image/gif');
    } else if (filepath.endsWith('.woff2')) {
      res.setHeader('Content-Type', 'font/woff2');
    } else if (filepath.endsWith('.woff')) {
      res.setHeader('Content-Type', 'font/woff');
    } else if (filepath.endsWith('.ttf')) {
      res.setHeader('Content-Type', 'font/ttf');
    }

    // Security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
  }
}));

// =============================================
// Routes
// =============================================
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Catch-all 404
app.use((req, res) => {
  res.status(404).setHeader('Content-Type', 'text/html').send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>404 - Not Found</title>
        <style>
          body { font-family: Arial, sans-serif; background: #000; color: #fff; padding: 40px; }
          h1 { color: #FFD700; }
        </style>
      </head>
      <body>
        <h1>404 - Página não encontrada</h1>
        <p><a href="/">Voltar ao início</a></p>
      </body>
    </html>
  `);
});

// =============================================
// Server Start
// =============================================
app.listen(PORT, () => {
  console.log(`Portal DPA landing page running at http://localhost:${PORT}`);
});

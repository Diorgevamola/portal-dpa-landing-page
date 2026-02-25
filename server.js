const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 6000;

// =============================================
// MIME Type Configuration & Static Files
// =============================================
const publicDir = path.join(__dirname, 'public');
const rootDir = __dirname;

// Serve from public/ if it exists, otherwise serve from root
// This handles both Vercel deployment and local development
const staticDir = fs.existsSync(publicDir) ? publicDir : rootDir;

app.use(express.static(staticDir, {
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

    // Cache headers for static assets
    if (filepath.endsWith('.css') || filepath.endsWith('.js') ||
        filepath.endsWith('.png') || filepath.endsWith('.jpg') ||
        filepath.endsWith('.woff2') || filepath.endsWith('.woff')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
}));

// =============================================
// Routes
// =============================================
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  const indexPath = fs.existsSync(path.join(publicDir, 'index.html'))
    ? path.join(publicDir, 'index.html')
    : path.join(rootDir, 'index.html');
  res.sendFile(indexPath);
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

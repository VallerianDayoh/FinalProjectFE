import jsonServer from 'json-server';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startIntegratedServer() {
  const app = express();

  // Middleware untuk JSON Server - TEMPATKAN INI PERTAMA
  const router = jsonServer.router(path.join(__dirname, 'db.json'));
  const middlewares = jsonServer.defaults();

  app.use(middlewares);
  app.use(jsonServer.bodyParser);

  // Endpoint API untuk /products dan endpoint lainnya - TEMPATKAN INI PERTAMA
  app.use('/api', router);
  app.use('/products', router); // Ini secara spesifik menangani rute /products

  // Dalam mode development, gunakan Vite - TAPI HANYA UNTUK RUTE SELAIN API
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });

    // Gunakan Vite middleware SETELAH middleware API
    app.use(vite.middlewares);
  } else {
    // Di produksi, gunakan file build
    app.use(express.static(path.join(__dirname, 'dist')));
  }

  // Untuk semua rute HTML, kirimkan index.html (untuk React Router)
  app.get('*', (req, res) => {
    if (process.env.NODE_ENV === 'production') {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    } else {
      // Dalam mode development, kita harus membaca file index.html secara langsung
      const fs = require('fs');
      const indexPath = path.join(__dirname, 'index.html');
      const html = fs.readFileSync(indexPath, 'utf8');
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    }
  });

  const port = 3001;
  app.listen(port, () => {
    console.log(`Integrated server is running on port ${port}`);
    console.log(`Access your application at http://localhost:${port}`);
    console.log(`API endpoints available at http://localhost:${port}/products`);
  });
}

// Pastikan kita tidak dalam mode produksi untuk pengembangan
process.env.NODE_ENV = 'development';

startIntegratedServer().catch(err => {
  console.error('Error starting integrated server:', err);
});
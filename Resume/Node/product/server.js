import { createServer } from 'http';
import { readFile } from 'fs/promises';

const server = createServer(async (req, res) => {
  if (req.url === '/') {
    const html = await readFile('index.html', 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } else if (req.url === '/products') {
    const products = await readFile('products.json', 'utf8');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(products);
  } else {
    res.writeHead(404);
    res.end('404 Not Found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const method = req.method;
  let filePath = './pages';

  if (method === 'GET') {
    switch (req.url) {
      case '/':
        filePath += '/index.html';
        break;
      case '/about':
        filePath += '/about.html';
        break;
      case '/contact':
        filePath += '/contact.html';
        break;
      case '/books':
        filePath += '/books.html';
        break;
      default:
        filePath += '/404.html';
        res.statusCode = 404;
    }

    const resolvedPath = path.resolve(__dirname, filePath);

    fs.readFile(resolvedPath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Error');
      } else {
        res.writeHead(res.statusCode || 200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (method === 'POST') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('POST request received');
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

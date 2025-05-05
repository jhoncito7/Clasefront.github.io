// index.js
const http = require('http'); // Módulo HTTP
const fs = require('fs'); // Módulo para leer archivos
const path = require('path'); // Módulo para manejar rutas
const url = require('url'); // Módulo para analizar URLs

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true); // Analizamos la URL de la solicitud
  const pathname = parsedUrl.pathname;

  // Si el cliente solicita el archivo CSS
  if (pathname === '/styles.css') {
    fs.readFile(path.join(__dirname, 'public', 'styles.css'), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error al cargar el CSS');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(data);
      }
    });
  } else {
    // Si el cliente solicita la página principal
    res.writeHead(200, { 'Content-Type': 'text/html' });

    // Contenido HTML que se envía al navegador
    res.end(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mensaje Elegante</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <div class="message-container">
          <h1>¡Hola, este es tu mensaje elegante!</h1>
          <p>Estamos trabajando para que esta experiencia sea aún mejor que la anterior.</p>
          <button class="button">Descubre más</button>
        </div>
      </body>
      </html>
    `);
  }
});

const port = 3000; // Puerto donde estará escuchando el servidor

server.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

const express = require('express');
const path = require('path');
const app = express();

// Servește fișierele statice din `build`
app.use(express.static(path.join(__dirname, 'build')));

// Servește fișierele statice din `public/lessons` pentru lecții specifice
app.use('/lessons', express.static(path.join(__dirname, 'public', 'lessons')));

// Servire fișiere statice: `/static`, `/manifest.json`, și alte rute specifice
app.use('/static', express.static(path.join(__dirname, 'build', 'static')));
app.use('/manifest.json', express.static(path.join(__dirname, 'build', 'manifest.json')));
app.use('/favicon.ico', express.static(path.join(__dirname, 'build', 'favicon.ico')));

// Orice altă cerere care nu începe cu `/static`, `/lessons`, `/manifest.json`, sau `/favicon.ico` 
// este redirecționată către `index.html` pentru suport React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Setează portul
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

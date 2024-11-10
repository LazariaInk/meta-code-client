const express = require('express');
const path = require('path');
const app = express();

// Servește fișierele din `public/lessons`
app.use('/lessons', express.static(path.join(__dirname, '../public/lessons')));

// Configurează rutele de API aici (dacă ai rute personalizate)

// Exportă ca funcție serverless pentru Vercel
module.exports = app;

const express = require('express');
const path = require('path');
const app = express();

// Servește fișierele statice din `build` și `public`
app.use(express.static(path.join(__dirname, 'build')));
app.use('/lessons', express.static(path.join(__dirname, 'public', 'lessons')));
app.use('/static', express.static(path.join(__dirname, 'build', 'static')));
app.use('/manifest.json', express.static(path.join(__dirname, 'build', 'manifest.json')));

// Orice altă cerere este redirecționată către `index.html` pentru suport React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

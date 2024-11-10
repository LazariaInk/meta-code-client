const express = require('express');
const path = require('path');
const app = express();

// Servește fișierele statice din `build`
app.use(express.static(path.join(__dirname, 'build')));

// Servește fișierele statice din `public/lessons`
app.use('/lessons', express.static(path.join(__dirname, 'public', 'lessons')));

// Redirecționează toate celelalte cereri către `index.html` pentru suport React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Setează portul
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

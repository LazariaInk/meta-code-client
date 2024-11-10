const express = require('express');
const path = require('path');
const app = express();

// Servește fișierele statice din `build` (fișierele React) și `public`
app.use(express.static(path.join(__dirname, 'build')));
app.use('/lessons', express.static(path.join(__dirname, 'public', 'lessons')));

// Dacă cererea nu este pentru un fișier static, redirecționează către `index.html` pentru React Router
app.get('*', (req, res) => {
  if (!req.path.startsWith('/lessons')) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  } else {
    res.status(404).send('File not found');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

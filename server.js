const express = require("express");

const app = express();

// Mostrar archivos de la carpeta actual
app.use(express.static(__dirname));

// Puerto
const PORT = 3000;

// Iniciar servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor funcionando en:
  http://localhost:${PORT}`);
});
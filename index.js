// Importar Express
const express = require('express');

// Crear una instancia de Express
const app = express();

// Definir el puerto y el callback de inicialización
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor inicializado en el puerto ${PORT}`);
});
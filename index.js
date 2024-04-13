// Importar Express
const express = require('express');
const axios = require('axios'); // Importar Axios

// Express
const app = express();

// Middleware JSON
app.use(express.json());

// Ruta para el Registro de usuarios
app.post('/registro', async (req, res) => {
  try {
    // Solicitud a la API Random User
    const response = await axios.get('https://randomuser.me/api/');
    
    // Extraer los datos del usuario de la respuesta
    const usuario = response.data.results[0];
    
    // Datos del Usuario
    console.log(usuario);
    
    // Enviar una respuesta al cliente
    res.status(201).json({ mensaje: 'Registrado exitosamente', usuario });
  } catch (error) {
    console.error('Error al Registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Definir Puerto 
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor inicializado en el puerto ${PORT}`);
});

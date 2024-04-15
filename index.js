const axios = require('axios');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');
const moment = require('moment');
const chalk = require('chalk');

// Express
const app = express();

const dataUser = [];

const instanceAxios = axios.create({
    baseURL: 'https://randomuser.me/api/',
});

// Obtener Usuario
const getUser = async () => {
    const { data } = await instanceAxios.get();
    const user = {
        id: uuidv4(),
        name: data.results[0].name.first,
        last_name: data.results[0].name.last,
        gender: data.results[0].gender,
        registered: moment(data.results[0].registered.date).format('MMMM Do YYYY, h:mm:ss a')
    };
    return user;
};

// Middleware para Solicitudes JSON
app.use(express.json());

// Registro de Usuario
app.post('/add-user', async (req, res) => {
    try {
        const user = await getUser();
        dataUser.push(user);
        console.log(chalk.green(`Usuario ${user.name} agregado correctamente`));
        res.status(201).json({ message: `Usuario ${user.name} agregado correctamente`, user });
    } catch (error) {
        console.error(chalk.red('Error al agregar usuario:'), error.message);
        res.status(500).json({ error: 'Error al agregar usuario' });
    }
});

// Obtener lista de usuarios
app.get('/usuarios', (req, res) => {
    try {
        const groupedUsers = _.groupBy(dataUser, 'gender');
        const mujeres = groupedUsers.female || [];
        const hombres = groupedUsers.male || [];
        console.log(chalk.bgWhite.blue('Mujeres:'));
        mujeres.forEach((user, index) => {
            console.log(chalk.blue(`${index + 1}. Nombre: ${user.name}, Apellido: ${user.last_name}, ID: ${user.id}, Timestamp: ${user.registered}`));
        });
        console.log(chalk.bgWhite.blue('Hombres:'));
        hombres.forEach((user, index) => {
            console.log(chalk.blue(`${index + 1}. Nombre: ${user.name}, Apellido: ${user.last_name}, ID: ${user.id}, Timestamp: ${user.registered}`));
        });
        res.status(200).json({ mujeres, hombres });
    } catch (error) {
        console.error(chalk.red('Error al obtener usuarios:'), error.message);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

// Ruta para la página principal
app.get('/', (req, res) => {
    res.send('Hola Bienvenido al Desafío Citas Médicas DENDE Spa.');
});

// Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(chalk.blue(`Servidor levantado por http://localhost:${PORT}`));
});

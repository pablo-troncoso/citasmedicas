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
        registered: moment(data.results[0].registered.date).format('LLLL')
    };
    return user;
};

// Usuario
app.get('/add-user', async (req, res) => {
    try {
        const user = await getUser();
        console.log(user);
        dataUser.push(user);
        res.send(`Usuario ${user.name} Agregado Correctamente`);
        console.log(`Usuario ${user.name} Agregado Correctamente`);
    } catch (error) {
        console.error('Error al agregar usuario:', error.message);
        res.status(500).send('Error al agregar usuario');
    }
});

//Obtener Usuario
app.get('/get-user', async (req, res) => {
    try {
        let data = '';
        _.forEach(dataUser, (user, i) => {
            data += `${i + 1}. Nombre: ${user.name} - Apellido: ${user.last_name} - ID: ${user.id} - TimeStamp: ${user.registered}<br>`;
            console.log(chalk.blue.bgWhite(`${i + 1}. Nombre: ${user.name} - Apellido: ${user.last_name} - ID: ${user.id} - TimeStamp: ${user.registered}`));
        });
        res.send(data);
    } catch (error) {
        console.error('Error al obtener usuarios:', error.message);
        res.status(500).send('Error al obtener usuarios');
    }
});

// Servidor 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

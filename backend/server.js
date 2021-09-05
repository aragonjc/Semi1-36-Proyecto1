require('dotenv').config();
const express = require('express');
const config = require('./config/config')
const routes = require('./network/routes');
const sequelize = require('./db/db')
const chalk = require('chalk');

const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.use(routes)
app.listen(config.app.port,async ()=> {
    console.log(`App Runnig on http://localhost:${config.app.port}`);

    try {
        await sequelize.authenticate();
        console.log(chalk.black.bgGreen('Connection has been established successfully.'));
      } catch (error) {
        console.error(chalk.black.bgRed('Unable to connect to the database:', error));
    }
})
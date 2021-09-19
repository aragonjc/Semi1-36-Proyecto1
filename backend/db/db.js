const config = require('../config/config')
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(config.db.database,config.db.username,config.db.password, {
    host: config.db.host,
    dialect: config.db.type
});

module.exports = sequelize;
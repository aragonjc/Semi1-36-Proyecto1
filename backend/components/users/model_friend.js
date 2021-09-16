const DataTypes = require('sequelize');
const sequelize = require('../../db/db');

const Friend = sequelize.define('Amigo', {
    usuario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amigo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'Amigo'
  });

module.exports = Friend;
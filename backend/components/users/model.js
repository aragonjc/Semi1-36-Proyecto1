const DataTypes = require('sequelize');
const sequelize = require('../../db/db');


const User = sequelize.define('Usuario', {
    nickname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
      },
    photo: {
        type: DataTypes.STRING,
        allowNull: false
    },
  }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'Usuario'
  });



module.exports = User;
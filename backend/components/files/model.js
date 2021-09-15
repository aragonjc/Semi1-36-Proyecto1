const DataTypes = require('sequelize');
const sequelize = require('../../db/db');

const File = sequelize.define('Archivo', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    extension: {
        type: DataTypes.STRING,
        allowNull: false
    },
    private: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    disable: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
  }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'Archivo'
  });

module.exports = File;
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class usuarios extends Model {
    static associate(models) {
      usuarios.hasMany(models.favoritos, {
        foreignKey: 'id_usuario',
        as: 'favoritos'
      });

      usuarios.hasMany(models.reservas, {
        foreignKey: 'id_usuario',
        as: 'reservas'
      });
    }
  }

  usuarios.init({
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    rol: {
      type: DataTypes.ENUM('admin', 'cliente'),
      defaultValue: 'cliente'
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'usuarios', 
    tableName: 'usuarios',
    timestamps: false
  });

  return usuarios;
};
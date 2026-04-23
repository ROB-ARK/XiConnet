'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class contactos extends Model {}

  contactos.init({
    id_contacto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    mensaje: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'contactos', 
    tableName: 'contactos',
    timestamps: false
  });

  return contactos;
};
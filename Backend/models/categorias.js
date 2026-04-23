'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class categorias extends Model {
    static associate(models) {
      categorias.hasMany(models.negocios, {
        foreignKey: 'id_categoria',
        as: 'negocios'
      });
    }
  }

  categorias.init({
    id_categoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'categorias', 
    tableName: 'categorias',
    timestamps: false
  });

  return categorias;
};
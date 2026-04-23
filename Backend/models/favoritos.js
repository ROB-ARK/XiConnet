'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class favoritos extends Model {
    static associate(models) {
      favoritos.belongsTo(models.usuarios, {
        foreignKey: 'id_usuario',
        as: 'usuario'
      });

      favoritos.belongsTo(models.negocios, {
        foreignKey: 'id_negocio',
        as: 'negocio'
      });
    }
  }

  favoritos.init({
    id_favorito: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_negocio: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'favoritos', 
    tableName: 'favoritos',
    timestamps: false
  });

  return favoritos;
};
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class negocios extends Model {
    static associate(models) {
      negocios.belongsTo(models.categorias, {
        foreignKey: 'id_categoria',
        as: 'categoria'
      });

      negocios.hasMany(models.favoritos, {
        foreignKey: 'id_negocio',
        as: 'favoritos'
      });

      negocios.hasMany(models.reservas, {
        foreignKey: 'id_negocio',
        as: 'reservas'
      });
    }
  }

  negocios.init({
    id_negocio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    descripcion: DataTypes.TEXT,
    imagen: DataTypes.STRING(255),
    direccion: DataTypes.STRING(255),
    telefono: DataTypes.STRING(20),

    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    lat: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true
    },
    lng: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true
    },

    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }

  }, {
    sequelize,
    modelName: 'negocios',
    tableName: 'negocios',
    timestamps: false
  });

  return negocios;
};
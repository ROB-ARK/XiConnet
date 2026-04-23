'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class reservas extends Model {
    static associate(models) {
      reservas.belongsTo(models.usuarios, {
        foreignKey: 'id_usuario',
        as: 'usuario'
      });

      reservas.belongsTo(models.negocios, {
        foreignKey: 'id_negocio',
        as: 'negocio'
      });
    }
  }

  reservas.init({
    id_reserva: {
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
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    estado: {
      type: DataTypes.ENUM('pendiente', 'confirmada', 'cancelada'),
      defaultValue: 'pendiente'
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'reservas',
    tableName: 'reservas',
    timestamps: false
  });

  return reservas;
};
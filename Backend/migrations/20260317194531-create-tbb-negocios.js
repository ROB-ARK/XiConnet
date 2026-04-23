'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('negocios', {
      id_negocio: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: Sequelize.STRING(150),
      descripcion: Sequelize.TEXT,
      imagen: Sequelize.STRING(255),
      direccion: Sequelize.STRING(255),
      telefono: Sequelize.STRING(20),
      id_categoria: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categorias',
          key: 'id_categoria'
        },
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('negocios');
  }
};
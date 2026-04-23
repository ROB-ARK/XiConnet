'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('favoritos', {
      id_favorito: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios',
          key: 'id_usuario'
        },
        onDelete: 'CASCADE'
      },
      id_negocio: {
        type: Sequelize.INTEGER,
        references: {
          model: 'negocios',
          key: 'id_negocio'
        },
        onDelete: 'CASCADE'
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

    await queryInterface.addConstraint('favoritos', {
      fields: ['id_usuario', 'id_negocio'],
      type: 'unique',
      name: 'unique_favorito'
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('favoritos');
  }
};
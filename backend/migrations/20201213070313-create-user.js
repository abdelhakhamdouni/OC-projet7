'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
        required: true
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
               
                type: Sequelize.DATE,
    defaultValue: Date.now()
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Date.now()
        }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
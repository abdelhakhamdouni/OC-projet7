'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(queryInterface.createTable('Posts', {
              id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
              },
              title: {
                allowNull: false,
                type: Sequelize.STRING
              },
              content: {
                type: Sequelize.TEXT
              },
              imageURL: {
                allowNull: false,
                type: Sequelize.INTEGER
              },
              userId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                  model: "Users",
                  key: "id"
                },
                onDelete: "CASCADE"
              },
              createdAt: {
                allowNull: false,
                type: Sequelize.DATE
              },
              updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
              }
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  down: function down(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function down$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(queryInterface.dropTable('Posts'));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};
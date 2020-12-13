'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(queryInterface.createTable('Comments', {
              id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
              },
              content: {
                allowNull: false,
                type: Sequelize.TEXT
              },
              postId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                  model: "Posts",
                  key: "id"
                },
                onDelete: "CASCADE"
              },
              usertId: {
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
            return regeneratorRuntime.awrap(queryInterface.dropTable('Comments'));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};
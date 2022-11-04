'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Turmas', 'deletedAt', {
      allowNull: false,
      type: Sequelize.INTEGER
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Turmas', 'deletedAt');
  }
};
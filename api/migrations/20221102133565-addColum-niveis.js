'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Niveis', 'deletedAt', {
      allowNull: false,
      type: Sequelize.INTEGER
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Pessoas', 'deletedAt');
  }
};
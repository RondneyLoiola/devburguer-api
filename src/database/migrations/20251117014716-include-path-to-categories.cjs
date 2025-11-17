'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('categories', 'path', { 
      type: Sequelize.STRING, //allownull já vem como true(padrão)
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.removeColumn('categories', 'path');
  },
};

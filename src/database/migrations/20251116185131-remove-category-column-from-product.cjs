'use strict';

//pra remover uma coluna da tabela, precisa criar outra migration

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    //pega a tabela de products e remove a coluna category
    await queryInterface.removeColumn('products', 'category');
  },

  async down(queryInterface) {
    await queryInterface.addColumn('products', 'category', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },
};

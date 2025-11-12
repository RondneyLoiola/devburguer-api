/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        primaryKey: true, //como se fosse o id
        allowNull: false, // impede que um conta seja criada sem um id
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false, // impede que um conta seja criada sem um name
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false, // impede que um conta seja criada sem um email
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false, // impede que um conta seja criada sem um password_hash
      },
      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
  },
};

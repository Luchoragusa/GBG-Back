'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Seed de la tabla Usuario
    await queryInterface.bulkInsert('User', [{
      nombre: 'test',
      apellido: 'test',
      password: bcrypt.hashSync('test123', 10),
      email: 'test@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

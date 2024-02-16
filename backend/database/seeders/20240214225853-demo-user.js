'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          dni: '01212120384',
          firstName: 'Admin',
          lastName: 'Admin',
          email: 'admin@example.com',
          password: 'admin', // hay que encriptar la contraseña
          miles: 0,
          role: 'ADMIN'
        }
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
